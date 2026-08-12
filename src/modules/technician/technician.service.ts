import { prisma } from "../../lib/prisma"
import { ICreateTechnicianProfile } from "./technician.interface";

const createTechnicianProfileIntoDB = async (payload: ICreateTechnicianProfile, userId: string) => {
    const { bio, experience, isAvailable, hourlyRate } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    if (user.activeStatus === "BLOCKED") {
        throw new Error("Your account is blocked! Please contact an admin")
    }

    const isProfileExists = await prisma.technicianProfile.findUnique({
        where: {
            userId
        }
    })

    if (isProfileExists) {
        throw new Error("Your technician profile already exists")
    }

    const profile = await prisma.technicianProfile.create({
        data: {
            userId,
            bio,
            experience,
            isAvailable,
            hourlyRate
        },
        include: {
            user: {
                select: {
                    name: true,
                    email : true,
                    role: true
                }
            }
        }
    })
    return profile;
}

export const technicianService = {
    createTechnicianProfileIntoDB
}