import { BookingStatus } from "../../../generated/prisma/enums";

export interface ICreateBooking {
    serviceId: string;
    bookingDate: string;
}

export interface IUpdateBookingStatus {
    status: BookingStatus;
}