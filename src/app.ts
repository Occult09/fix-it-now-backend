import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/service/service.route";
import { categoryRoutes } from "./modules/category/category.route";
import { technicianRoutes } from "./modules/technician/technician.route";
import { technicianPublicRoutes } from "./modules/technician/technician.public.route";
import { categoryPublicRoutes } from "./modules/category/category.public.route";
import { bookingRoutes } from "./modules/booking/booking.route";
import { bookingTechnicianRoutes } from "./modules/booking/booking.technician.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { reviewRoutes } from "./modules/review/review.route";
import { notFound } from "./middlewares/notFound";

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
app.use("/api/categories", categoryPublicRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/technicians", technicianPublicRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/technician/bookings", bookingTechnicianRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(notFound);

export default app;