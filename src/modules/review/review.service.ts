import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface";

const createReviewIntoDB = async (payload: ICreateReview, userId: string) => {
    const { bookingId, rating, comment } = payload;

    const booking = await prisma.booking.findUniqueOrThrow({
        where: {
            id: bookingId
        }
    })

    if (booking.customerId !== userId) {
        throw new Error("This is not your booking. You can not leave a review")
    }

    if (booking.status !== "COMPLETED") {
        throw new Error("This booking is not completed yet. Please wait until it is completed to give a review")
    }

    const isReviewExists = await prisma.review.findFirst({
        where: {
            bookingId
        }
    })

    if (isReviewExists) {
        throw new Error("You have already given review to this booking")
    }

    const review = await prisma.review.create({
        data: {
            bookingId,
            customerId: booking.customerId,
            technicianId: booking.technicianId,
            rating,
            comment
        }
    })

    return review;
}

export const reviewService = {
    createReviewIntoDB
}