import { ServiceWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ICreateService, IServicesQuery } from "./service.interface"

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

const getAllServiceFromDB = async (query: IServicesQuery) => {
    const take = query.take ? Number(query.take) : 1;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * take;

    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";

    const andConditions: ServiceWhereInput[] = [];

    if (query.searchTerm) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                }
            ]
        })
    }

    if (query.title) {
        andConditions.push({
            title: query.title
        })
    }

    if (query.description) {
        andConditions.push({
            description: query.description
        })
    }

    const services = await prisma.service.findMany({
        where: {
            AND: andConditions
        },
        take: take,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder
        },
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