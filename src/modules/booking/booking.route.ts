import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingController } from "./booking.controller";

const router = Router()

router.post("/", auth(Role.CUSTOMER), bookingController.createBooking);
router.get("/", auth(Role.CUSTOMER), bookingController.getCustomerBookings);
router.get("/:bookingId", auth(Role.CUSTOMER), bookingController.getSingleCustomerBooking);

export const bookingRoutes = router;