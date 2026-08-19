import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUsersFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All users retrieved successfully",
        data: {
            result
        }
    })
});

const updateUsersActiveStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { userId } = req.params;

    const result = await adminService.updateUsersActiveStatusIntoDB(payload, userId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User's active status updated successfully",
        data: {
            result
        }
    })
});

const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllBookingsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All bookings retrieved successfully!",
        data: {
            result
        }
    })
})


export const adminController = {
    getAllUsers,
    updateUsersActiveStatus,
    getAllBookings
}