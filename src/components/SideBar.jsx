import React from "react";
import {
  FaTshirt,
  FaSwimmer,
  FaSkiing,
  FaMobileAlt,
  FaGem,
  FaShoePrints,
  FaClock,
  FaTags,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-gray-200 p-4">
      <h2 className="mb-4 text-xl font-bold">Categories</h2>
      <ul>
        <li className="mb-2">
          <FaTshirt className="mr-2 inline" /> Shirts
        </li>
        <li className="mb-2">
          <FaTshirt className="mr-2 inline" /> Western Wear
        </li>
        <li className="mb-2">
          <FaSwimmer className="mr-2 inline" /> Swim & Beachwear
        </li>
        <li className="mb-2">
          <FaSkiing className="mr-2 inline" /> Winter & Seasonal Wear
        </li>
        <li className="mb-2">
          <FaMobileAlt className="mr-2 inline" /> Beauty & Grooming
        </li>
        <li className="mb-2">
          <FaGem className="mr-2 inline" /> Jewellery
        </li>
        <li className="mb-2">
          <FaMobileAlt className="mr-2 inline" /> Personal Care Appliances
        </li>
        <li className="mb-2">
          <FaTags className="mr-2 inline" /> International Brands
        </li>
        <li className="mb-2">
          <FaShoePrints className="mr-2 inline" /> Foot Wear
        </li>
        <li className="mb-2">
          <FaClock className="mr-2 inline" /> Watches
        </li>
        <li className="mb-2">
          <FaTags className="mr-2 inline" /> Accessories
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
