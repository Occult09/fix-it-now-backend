import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { verifyToken } from "../../utils/jwt";
import config from "../../config";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await authService.registerUserIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Registered Successfully!",
        data: {
            result
        }
    })
});

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login Successful!",
        data: {
            accessToken,
            refreshToken
        }
    })
});

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    const verifiedToken = verifyToken(accessToken, config.jwt_access_secret as string);

    if(typeof verifiedToken === "string"){
        throw new Error("Invalid Token")
    }

    const result = await authService.getMyProfile(verifiedToken.id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My Profile Retrieved Successfully!",
        data: {
            result
        }
    })
})

export const authController = {
    registerUser,
    loginUser,
    getMyProfile
}