// src/controllers/promoController.ts
import { Request, Response } from "express";
import Promo from "../models/Promo";

export const validatePromo = async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ valid: false, message: "Missing code" });

  const promo = await Promo.findOne({ code: code.toUpperCase(), active: true }).lean();
  if (!promo) return res.json({ valid: false });

  // optional expiry check
  if (promo.expiresAt && promo.expiresAt < new Date()) {
    return res.json({ valid: false });
  }

  return res.json({
    valid: true,
    type: promo.type,
    discount: promo.value,
    code: promo.code,
  });
};
