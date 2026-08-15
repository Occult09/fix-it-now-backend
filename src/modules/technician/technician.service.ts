import { prisma } from "../../lib/prisma"
import { ICreateTechnicianProfile, IUpdateTechnicianAvailability, IUpdateTechnicianProfile } from "./technician.interface";

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
                    email: true,
                    role: true
                }
            }
        }
    })
    return profile;
}

const updateTechnicianProfileIntoDB = async (payload: IUpdateTechnicianProfile, userId: string) => {
    const { bio, experience, hourlyRate } = payload;
    const technician = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            userId
        }
    })

    const updatedTechnician = await prisma.technicianProfile.update({
        where: {
            userId
        },
        data: {
            bio,
            experience,
            hourlyRate
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    })

    return updatedTechnician;
}

const updateTechnicianAvailabilityIntoDB = async (payload: IUpdateTechnicianAvailability, userId: string) => {
    const { isAvailable } = payload

    const technician = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            userId
        }
    })

    const updatedTechnician = await prisma.technicianProfile.update({
        where: {
            userId
        },
        data: {
            isAvailable
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    })

    return updatedTechnician;
}

const getAllTechniciansFromDB = async () => {
    const technicians = await prisma.technicianProfile.findMany({
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    });

    if (!technicians) {
        throw new Error("No technicians found");
    }

    return technicians;
}

const getSingleTechnicianFromDB = async (technicianId: string) => {
    const technician = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            id: technicianId
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    })

    return technician;
}

export const technicianService = {
    createTechnicianProfileIntoDB,
    updateTechnicianProfileIntoDB,
    updateTechnicianAvailabilityIntoDB,
    getAllTechniciansFromDB,
    getSingleTechnicianFromDB
}