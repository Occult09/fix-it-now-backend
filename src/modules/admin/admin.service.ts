import { ActiveStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { IUpdateUsersActiveStatus } from "./admin.interface";

const getAllUsersFromDB = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true
        }
    })

    if (!users) {
        throw new Error("No users found")
    }

    return users;
};

const updateUsersActiveStatusIntoDB = async (payload: IUpdateUsersActiveStatus, userId: string) => {
    const { activeStatus } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    if (activeStatus === ActiveStatus.ACTIVE && user.activeStatus === ActiveStatus.ACTIVE) {
        throw new Error("User's active status is already ACTIVE")
    }

    if (activeStatus === ActiveStatus.BLOCKED && user.activeStatus === ActiveStatus.BLOCKED) {
        throw new Error("User's active status is already BLOCKED")
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            activeStatus
        },
        omit: {
            password: true
        }
    })

    return updatedUser;
}

const getAllBookingsFromDB = async() => {
    const bookings = await prisma.booking.findMany();

    if(!bookings){
        throw new Error("No bookings found")
    }

    return bookings;
}

export const adminService = {
    getAllUsersFromDB,
    updateUsersActiveStatusIntoDB,
    getAllBookingsFromDB
}