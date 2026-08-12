import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await categoryService.createCategoryIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category created successfully!",
        data: {
            result
        }
    })
})

const getCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryService.getCategoryFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All categories retrieved successfully!",
        data: {
            result
        }
    })
})

const getSingleCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;

    const result = await categoryService.getSingleCategoryFromDB(categoryId as string);

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Category retrieved successfully!",
        data: {
            result
        }
    })
})


export const categoryController = {
    createCategory,
    getCategory,
    getSingleCategory
}