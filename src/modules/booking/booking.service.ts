import { prisma } from "../../lib/prisma"
import { ICreateBooking } from "./booking.interface"

const createBookingIntoDB = async (payload: ICreateBooking, customerId: string) => {
    const transactionResult = await prisma.$transaction(
        async (tx) => {
            const { serviceId, bookingDate } = payload;

            const service = await tx.service.findUniqueOrThrow({
                where: {
                    id: serviceId
                }
            })

            const customer = await tx.user.findUniqueOrThrow({
                where: {
                    id: customerId
                }
            })

            if (customer.activeStatus === 'BLOCKED') {
                throw new Error("Your account is blocked! Please contact an admin")
            }

            // payment to be implemented

            const booking = await tx.booking.create({
                data: {
                    serviceId,
                    bookingDate,
                    customerId: customer.id,
                    technicianId: service.technicianId,
                    totalPrice: service.price
                },
                include: {
                    service: true,
                    technician: true
                }
            })
            return booking;
        }
    )
    return transactionResult;
}

const getCustomerBookingFromDB = async (customerId: string) => {

}

export const bookingService = {
    createBookingIntoDB,
    getCustomerBookingFromDB
}