import React from "react";
import clsx from "clsx";

interface TagProps {
  label: string;
  color?: "gray" | "yellow" | "green" | "blue";
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  color = "gray",
  className,
}) => {
  const colorMap = {
    gray: "bg-gray-200 text-gray-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={clsx(
        "text-xs font-medium px-2 py-1 rounded-full",
        colorMap[color],
        className
      )}
    >
      {label}
    </span>
  );
};

export default Tag;
