// src/routes/experienceRoutes.ts
import { Router } from "express";
import { getExperiences, getExperienceById } from "../controllers/experienceController";

const router = Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);

export default router;
