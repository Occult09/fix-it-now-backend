import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { verifyToken } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith('Bearer') ? req.headers.authorization.split(" ")[1] : req.headers.authorization;

        if (!token) {
            throw new Error("You are not authorized to access this route! Please Login First");
        }

        const verifiedToken = verifyToken(token, config.jwt_refresh_secret as string);

        if (!verifiedToken) {
            throw new Error("Invalid Token!")
        }

        const { id, name, email, role } = verifiedToken as JwtPayload;

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("You are not authorized to access this route!")
        }

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id,
                email,
                name
            }
        })

        if (!user) {
            throw new Error("User not found!")
        };

        if (user.activeStatus === "BLOCKED") {
            throw new Error("Your account has been blocked! Please contact support")
        }

        req.user = {
            id,
            name,
            email,
            role
        }

        next();
    })
}