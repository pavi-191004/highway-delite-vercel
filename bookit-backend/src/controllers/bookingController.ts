// src/controllers/bookingController.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking";
import Experience from "../models/Experience";
import { getPromoDetails } from "../utils/validatePromo";

export const createBooking = async (req: Request, res: Response) => {
  /**
   * Expected payload:
   * {
   *   experienceId, date, time, quantity, name, email, promoCode (optional)
   * }
   */
  const { experienceId, date, time, quantity, name, email, promoCode } = req.body;

  if (!experienceId || !date || !time || !quantity || !name || !email) {
    return res.status(400).json({ message: "Missing required booking fields" });
  }

  // 1) Calculate amount (fetch experience price)
  const experience = await Experience.findById(experienceId);
  if (!experience) return res.status(404).json({ message: "Experience not found" });

  const pricePer = experience.price || 0;
  let total = pricePer * quantity;

  // 2) Apply promo if valid
  let appliedPromo: any = null;
  if (promoCode) {
    const promo = await getPromoDetails(promoCode);
    if (promo) {
      appliedPromo = promo;
      if (promo.type === "percent") {
        total = Math.max(0, total - Math.round((total * promo.value) / 100));
      } else {
        total = Math.max(0, total - promo.value);
      }
    }
  }

  // 3) Prevent duplicate booking for same email + experience + date + time
  const existing = await Booking.findOne({ experienceId, date, time, email });
  if (existing) {
    return res.status(409).json({ message: "You already have a booking for this slot" });
  }

  // 4) Atomically decrement seatsLeft for the selected date/time if enough seats exist
  // Use arrayFilters update to decrement the correct nested element if seatsLeft >= quantity
  const updateResult = await Experience.updateOne(
    {
      _id: experienceId,
      "slots.date": date,
      "slots.times.time": time,
      // The following condition does not directly check seatsLeft because it's nested; we'll use arrayFilters and additional condition below.
    },
    {
      $inc: { "slots.$[s].times.$[t].seatsLeft": -quantity },
    },
    {
      arrayFilters: [{ "s.date": date }, { "t.time": time, "t.seatsLeft": { $gte: quantity } }],
    }
  );

  // updateResult.nModified (mongoose v5) / modifiedCount (v6+) -- check modifiedCount
  const modifiedCount = (updateResult as any).modifiedCount ?? (updateResult as any).nModified ?? 0;

  if (modifiedCount === 0) {
    // either slot doesn't exist or not enough seats
    return res.status(400).json({ message: "Not enough seats available or slot not found" });
  }

  // 5) Create booking document
  const booking = await Booking.create({
    experienceId,
    date,
    time,
    quantity,
    name,
    email,
    promoCode: appliedPromo ? appliedPromo.code : undefined,
    totalAmount: total,
  });

  return res.status(201).json({
    bookingId: booking._id,
    message: "Booking confirmed",
    booking,
  });
};
