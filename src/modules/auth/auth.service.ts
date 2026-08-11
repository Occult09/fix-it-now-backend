import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILogin, IRegisterUser } from "./auth.interface"
import config from "../../config";
import { createToken } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

const registerUserIntoDB = async (payload: IRegisterUser) => {
    const { name, email, password, role } = payload;

    const isUserExists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (isUserExists) {
        throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        }
    })

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        },
        omit: {
            password: true
        }
    })

    return user;
}

const loginUser = async (payload: ILogin) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    });

    const isPasswordMatched = bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid Credentials!");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as SignOptions);

    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as SignOptions);

    return { accessToken, refreshToken }
};

const getMyProfile = async (id: string) => {
    const profile = await prisma.user.findUniqueOrThrow({
        where: {
            id: id
        },
        omit: {
            password: true
        }
    });

    return profile;
}


export const authService = {
    registerUserIntoDB,
    loginUser,
    getMyProfile
}