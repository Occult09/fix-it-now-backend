import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingController } from "./booking.controller";

const router = Router()

router.get("/", auth(Role.TECHNICIAN),bookingController.getTechnicianBookings);
router.patch("/:bookingId", auth(Role.TECHNICIAN), bookingController.updateBookingStatus);

export const bookingTechnicianRoutes = router;