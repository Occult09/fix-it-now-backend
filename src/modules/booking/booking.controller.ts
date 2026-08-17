import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const customerId = req.user.id;

    const result = await bookingService.createBookingIntoDB(payload, customerId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Booking created successfully",
        data: {
            result
        }
    })
})

const getCustomerBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

export const bookingController = {
    createBooking,
    getCustomerBookings
}