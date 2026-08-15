import { prisma } from "../../lib/prisma";
import { ICreateService } from "./service.interface"

const createServiceIntoDB = async (payload: ICreateService, userId: string) => {
    const { categoryId, title, description, price } = payload;

    const technician = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            userId
        }
    })

    await prisma.category.findUniqueOrThrow({
        where: {
            id: categoryId
        }
    })

    const technicianId = technician.id;

    const service = await prisma.service.create({
        data: {
            technicianId,
            categoryId,
            title,
            description,
            price
        },
        include: {
            category: true,
            technician: {
                include: {
                    user: {
                        omit: {
                            password: true
                        }
                    }
                }
            }
        }
    })

    return service;
}

const getAllServiceFromDB = async () => {
    const services = await prisma.service.findMany({
        include: {
            technician: true
        }
    })

    if (!services) {
        throw new Error("No services found")
    }

    return services
}

const getSingleServiceFromDB = async (serviceId: string) => {
    const service = await prisma.service.findUniqueOrThrow({
        where: {
            id: serviceId
        },
        include: {
            technician: {
                include: {
                    user: {
                        omit: {
                            password: true
                        }
                    }
                }
            }
        }
    })

    return service
}


export const serviceService = {
    createServiceIntoDB,
    getAllServiceFromDB,
    getSingleServiceFromDB
}