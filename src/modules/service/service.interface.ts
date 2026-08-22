import { ServiceWhereInput } from "../../../generated/prisma/models";

export interface ICreateService {
    categoryId: string;
    title: string;
    description?: string
    price: number;
}

export interface IServicesQuery extends ServiceWhereInput {
    page?: string;
    take?: string;
    sortOrder?: string;
    sortBy?: string;
    searchTerm?: string;
}