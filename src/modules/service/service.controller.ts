import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { serviceService } from "./service.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user.id;

    const result = await serviceService.createServiceIntoDB(payload, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Service created successfully!",
        data: {
            result
        }
    })
})

const getAllService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await serviceService.getAllServiceFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All services retrieved succesfully!",
        data: {
            result
        }
    })
})

const getSingleService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { serviceId } = req.params;

    const result = await serviceService.getSingleServiceFromDB(serviceId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Service retrived successfully!",
        data: {
            result
        }
    })
})

export const serviceController = {
    createService,
    getAllService,
    getSingleService
}