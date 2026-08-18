import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { ICreateBooking, IUpdateBookingStatus } from "./booking.interface"

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

    if (!technicianBookings) {
        throw new Error("No bookings found!")
    }

    return technicianBookings;
}

const updateBookingStatusIntoDB = async (payload: IUpdateBookingStatus, bookingId: string, userId: string) => {
    const { status } = payload;

    const technician = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            userId
        }
    })

    const booking = await prisma.booking.findUniqueOrThrow({
        where: {
            id: bookingId,
            technicianId: technician.id
        }
    })

    if(booking.status === BookingStatus.REQUESTED){
        if(status !== BookingStatus.ACCEPTED && status !== BookingStatus.DECLINED){
            throw new Error("Request booking can only be accepted or declined")
        }
    }

    else if(booking.status === BookingStatus.ACCEPTED){
        if(status !== BookingStatus.IN_PROGRESS){
            throw new Error("Accepted booking status can only be in progress")
        }
    }

    else if(booking.status === BookingStatus.IN_PROGRESS){
        if(status !== BookingStatus.COMPLETED){
            throw new Error("In progress booking can only be completed")
        }
    }

    else{
        throw new Error(`Booking can not be changed from ${status} status`)
    }

    const updatedBookingStatus = await prisma.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status
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

    return updatedBookingStatus;
}

export const bookingService = {
    createBookingIntoDB,
    getCustomerBookingFromDB,
    getSingleCustomerBookingFromDB,
    getTechnicianBookingFromDB,
    updateBookingStatusIntoDB
}