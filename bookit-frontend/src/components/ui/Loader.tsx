import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
