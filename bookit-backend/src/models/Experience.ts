// src/models/Experience.ts
import mongoose, { Schema, Document } from "mongoose";

export interface SlotTime {
  time: string;
  seatsLeft: number;
}

export interface Slot {
  date: string; // ISO date string
  times: SlotTime[];
}

export interface IExperience extends Document {
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  slots: Slot[];
  createdAt: Date;
  updatedAt: Date;
}

const SlotTimeSchema = new Schema<SlotTime>({
  time: { type: String, required: true },
  seatsLeft: { type: Number, required: true, min: 0 },
});

const SlotSchema = new Schema<Slot>({
  date: { type: String, required: true },
  times: { type: [SlotTimeSchema], default: [] },
});

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  price: { type: Number, default: 0 },
  image: { type: String },
  slots: { type: [SlotSchema], default: [] },
}, { timestamps: true });

const Experience = mongoose.model<IExperience>("Experience", ExperienceSchema);
export default Experience;
