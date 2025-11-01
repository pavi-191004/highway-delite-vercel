// src/data/seedData.ts
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { connectDB } from "../config/db";
import Experience from "../models/Experience";
import Promo from "../models/Promo";

const run = async () => {
  await connectDB();

  // remove old data
  await Experience.deleteMany({});
  await Promo.deleteMany({});

  const experiences = [
    {
      title: "Sunset Beach Walk",
      description: "Relaxing guided walk and bonfire by the sea.",
      location: "Goa",
      price: 1200,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      slots: [
        {
          date: "2025-11-10",
          times: [
            { time: "05:00 PM", seatsLeft: 10 },
            { time: "06:30 PM", seatsLeft: 8 },
          ],
        },
        {
          date: "2025-11-11",
          times: [
            { time: "05:00 PM", seatsLeft: 12 },
            { time: "06:30 PM", seatsLeft: 12 },
          ],
        },
      ],
    },
    {
      title: "Mountain Sunrise Trek",
      description: "Early morning trek with spectacular sunrise views.",
      location: "Coimbatore",
      price: 2000,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      slots: [
        { date: "2025-11-12", times: [{ time: "04:00 AM", seatsLeft: 6 }] },
        { date: "2025-11-13", times: [{ time: "04:00 AM", seatsLeft: 6 }] },
      ],
    },
  ];

  await Experience.insertMany(experiences);
  console.log("✅ Seeded experiences");

  await Promo.insertMany([
    { code: "SAVE10", type: "percent", value: 10, active: true },
    { code: "FLAT100", type: "flat", value: 100, active: true },
  ]);
  console.log("✅ Seeded promos");

  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Error seeding data:", err);
  process.exit(1);
});
