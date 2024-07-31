import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <FaSpinner className="animate-spin text-5xl text-white" />
    </div>
  );
};

export default Loader;
