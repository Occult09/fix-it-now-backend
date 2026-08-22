import { NextFunction, Request, Response } from "express";

export const notFound = async (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "Route not found!",
        path: req.originalUrl,
        date: Date()
    })
}