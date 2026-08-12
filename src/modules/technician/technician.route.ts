import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { technicianController } from "./technician.controller";

const router = Router()

router.post("/", auth(Role.TECHNICIAN), technicianController.createTechnicianProfile);

export const technicianRoutes = router;