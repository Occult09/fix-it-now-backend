import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post("/", auth(Role.ADMIN), categoryController.createCategory);
router.get("/", auth(Role.ADMIN), categoryController.getCategory);
router.get("/:categoryId", auth(Role.ADMIN), categoryController.getSingleCategory);

export const categoryRoutes = router;