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

const updateTechnicianProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user.id;

    const result = await technicianService.updateTechnicianProfileIntoDB(payload, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician Profile Updated Successfully!",
        data: {
            result
        }
    })
})

const updateTechnicianAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const isAvailable = req.body;
    const userId = req.user.id;

    const result = await technicianService.updateTechnicianAvailabilityIntoDB(isAvailable, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician availability updated successfully!",
        data: {
            result
        }
    })
})

const getAllTechnicians = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await technicianService.getAllTechniciansFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All technicians retrieved successfully!",
        data: {
            result
        }
    })
})

const getSingleTechnician = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { technicianId } = req.params;

    const result = await technicianService.getSingleTechnicianFromDB(technicianId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician Profile retrived successfully",
        data: {
            result
        }
    })
})


export const technicianController = {
    createTechnicianProfile,
    updateTechnicianProfile,
    updateTechnicianAvailability,
    getAllTechnicians,
    getSingleTechnician
}