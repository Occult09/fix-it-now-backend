import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { serviceService } from "./service.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const technicianId = req.user.id;

    const result = await serviceService.createServiceIntoDB(payload,technicianId);

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Service created successfully!",
        data: {
            result
        }
    })
})

export const serviceController = {
    createService
}