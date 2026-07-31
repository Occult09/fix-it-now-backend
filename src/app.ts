import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors({
    origin: '',
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("")

export default app;