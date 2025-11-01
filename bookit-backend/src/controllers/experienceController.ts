// src/controllers/experienceController.ts
import { Request, Response } from "express";
import Experience from "../models/Experience";

export const getExperiences = async (req: Request, res: Response) => {
  const experiences = await Experience.find().lean();
  res.json(experiences);
};

export const getExperienceById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const exp = await Experience.findById(id).lean();
  if (!exp) return res.status(404).json({ message: "Experience not found" });
  res.json(exp);
};
