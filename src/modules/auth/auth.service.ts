import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IRegisterUser } from "./auth.interface"
import config from "../../config";

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


export const authService = {
    registerUserIntoDB
}