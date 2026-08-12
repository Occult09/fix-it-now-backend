import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/service/service.route";

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
app.use("/api/services", serviceRoutes);

export default app;