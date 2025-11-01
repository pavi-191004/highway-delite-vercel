import React from "react";
import { ExperienceCard } from "../common/ExperienceCard";
import { Experience } from "../../types";

interface ExperienceListProps {
  experiences: Experience[];
}

export const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences,
}) => {
  if (!experiences || experiences.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-8">
        No experiences available right now.
      </p>
    );
  }

  return (
    <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
      {experiences.map((exp) => (
        <ExperienceCard key={exp._id} experience={exp} />
      ))}
    </div>
  );
};
