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
import { Link } from "react-router-dom";

const Sidebar = () => {
  const categories = [
    {
      name: "Traditional Wear",
      icon: FaTshirt,
      id: "66929a5aad47e2002b1ef7aa",
    },
    { name: "Western Wear", icon: FaTshirt, id: "66929a66ad47e2002b1ef7ac" },
    {
      name: "Swim & Beachwear",
      icon: FaSwimmer,
      id: "66929a7ead47e2002b1ef7ae",
    },
    {
      name: "Winter & Seasonal Wear",
      icon: FaSkiing,
      id: "66929a93ad47e2002b1ef7b0",
    },
    {
      name: "Beauty & Grooming",
      icon: FaMobileAlt,
      id: "66929aaead47e2002b1ef7b2",
    },
    { name: "Jewellery", icon: FaGem, id: "66929abbad47e2002b1ef7b4" },
    {
      name: "Personal Care Appliances",
      icon: FaMobileAlt,
      id: "66929ad3ad47e2002b1ef7b6",
    },
    {
      name: "International Brands",
      icon: FaTags,
      id: "668e7a8710e2b9c70e4f3926",
    },
    { name: "Foot Wear", icon: FaShoePrints, id: "66929b22ad47e2002b1ef7c8" },
    { name: "Watches", icon: FaClock, id: "66929b2bad47e2002b1ef7ca" },
    { name: "Accessories", icon: FaTags, id: "66929b3aad47e2002b1ef7cc" },
    { name: "Shirts", icon: FaTshirt, id: "66409ac6e35e273e6ce82632" },
  ];

  return (
    <div className="min-h-screen w-64 bg-gray-200 p-4">
      <h2 className="mb-4 text-xl font-bold">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <Link
              to={`/catalog?category=${category.id}`}
              className="flex items-center"
            >
              <category.icon className="mr-2 inline" /> {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
