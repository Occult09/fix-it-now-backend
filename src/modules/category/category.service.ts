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

const getCategoryFromDB = async () => {
    const categories = await prisma.category.findMany()

    if(!categories){
        throw new Error("No category found!")
    }

    return categories;
}

const getSingleCategoryFromDB = async(categoryId: string) => {
    const category = await prisma.category.findUniqueOrThrow({
        where: {
            id: categoryId
        }
    })

    return category;
}


export const categoryService = {
    createCategoryIntoDB,
    getCategoryFromDB,
    getSingleCategoryFromDB
}