// src/models/Promo.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPromo extends Document {
  code: string;
  type: "percent" | "flat";
  value: number;
  active: boolean;
  expiresAt?: Date;
}

const PromoSchema = new Schema<IPromo>({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ["percent", "flat"], required: true },
  value: { type: Number, required: true },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date },
});

const Promo = mongoose.model<IPromo>("Promo", PromoSchema);
export default Promo;
