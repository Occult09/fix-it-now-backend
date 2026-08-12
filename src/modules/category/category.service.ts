import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "./category.interface";

const createCategoryIntoDB = async (payload: ICreateCategory) => {
    const { name, description } = payload;

    const isCategoryExists = await prisma.category.findFirst({
        where: {
            name
        }
    })
    if (isCategoryExists) {
        throw new Error("Category already exists")
    };

    const createdCategory = await prisma.category.create({
        data: {
            name,
            description
        }
    })

    return createdCategory;
}


export const categoryService = {
    createCategoryIntoDB
}