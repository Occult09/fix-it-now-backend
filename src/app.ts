import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/service/service.route";
import { categoryRoutes } from "./modules/category/category.route";
import { technicianRoutes } from "./modules/technician/technician.route";

const app: Application = express()

app.use(cors({
    origin: "",
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/services", serviceRoutes);

export default app;