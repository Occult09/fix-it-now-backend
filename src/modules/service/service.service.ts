import { prisma } from "../../lib/prisma";
import { ICreateService } from "./service.interface"

const createServiceIntoDB = async (payload: ICreateService, technicianId: string) => {
    const { categoryId, title, description, price } = payload;

    await prisma.user.findUniqueOrThrow({
        where: {
            id: technicianId
        }
    })

    await prisma.category.findUniqueOrThrow({
        where: {
            id: categoryId
        }
    })

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
            user:{
                omit: {
                    password: true
                }
            }
        }
    })

    return service;
}


export const serviceService = {
    createServiceIntoDB
}