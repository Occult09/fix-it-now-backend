import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createTechnicianProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user.id;

    const result = await technicianService.createTechnicianProfileIntoDB(payload, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician Profile updated successfully!",
        data: {
            result
        }
    })
})


export const technicianController = {
    createTechnicianProfile
}