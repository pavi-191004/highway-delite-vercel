// src/models/Booking.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  quantity: number;
  name: string;
  email: string;
  promoCode?: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  experienceId: { type: Schema.Types.ObjectId, ref: "Experience", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  promoCode: { type: String },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

// Prevent the exact same user booking same experience/date/time multiple times
BookingSchema.index({ experienceId: 1, date: 1, time: 1, email: 1 }, { unique: true });

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
