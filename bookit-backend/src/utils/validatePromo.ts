// src/utils/validatePromo.ts
import Promo from "../models/Promo";

export const getPromoDetails = async (code: string) => {
  const promo = await Promo.findOne({ code: code.toUpperCase(), active: true }).lean();
  if (!promo) return null;
  if (promo.expiresAt && promo.expiresAt < new Date()) return null;
  return { code: promo.code, type: promo.type, value: promo.value };
};
