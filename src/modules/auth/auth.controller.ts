import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await authService.registerUserIntoDB(payload);
})

export const authController = {
    registerUser
}