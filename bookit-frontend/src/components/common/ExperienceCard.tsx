import React from "react";
import { Link } from "react-router-dom";
import { Experience } from "../../types";

interface ExperienceCardProps {
  experience: Experience; // ✅ single prop
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const { _id, title, location, price, image } = experience;

  return (
    <div className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white">
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{location}</span>
        </div>
        <p className="text-sm text-gray-500">Curated small-group experience. Certified guide.</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">From ₹{price}</p>
          <Link
            to={`/details/${_id}`}
            className="bg-yellow-400 text-black text-sm font-medium px-3 py-1.5 rounded hover:bg-yellow-500 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
