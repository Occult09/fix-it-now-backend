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
    const customerBookings = await prisma.booking.findMany({
        where: {
            customerId
        },
        include: {
            service: true,
            technician: true
        }
    })

    if (!customerBookings) {
        throw new Error("No booking found!")
    }

    return customerBookings;
}

const getSingleCustomerBookingFromDB = async (bookingId: string) => {
    const booking = await prisma.booking.findUniqueOrThrow({
        where: {
            id: bookingId
        },
        include: {
            service: true,
            technician: true
        }
    })

    return booking;
}

const getTechnicianBookingFromDB = async (userId: string) => {
    const technician = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            userId
        }
    })

    const technicianBookings = await prisma.booking.findMany({
        where: {
            technicianId: technician.id
        },
        include: {
            service: true,
            customer: {
                omit: {
                    password: true
                }
            }
        }
    })

    if(!technicianBookings){
        throw new Error("No bookings found!")
    }

    return technicianBookings;
}

export const bookingService = {
    createBookingIntoDB,
    getCustomerBookingFromDB,
    getSingleCustomerBookingFromDB,
    getTechnicianBookingFromDB
}