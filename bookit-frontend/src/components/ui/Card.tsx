import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
