import { Router } from "express";
import { technicianController } from "./technician.controller";

const router = Router()

router.get("/", technicianController.getAllTechnicians);
router.get("/:technicianId", technicianController.getSingleTechnician);

export const technicianPublicRoutes = router;