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
    { name: "Traditional Wear", icon: FaTshirt, id: "traditional-wear" },
    { name: "Western Wear", icon: FaTshirt, id: "western-wear" },
    { name: "Swim & Beachwear", icon: FaSwimmer, id: "swim-beachwear" },
    {
      name: "Winter & Seasonal Wear",
      icon: FaSkiing,
      id: "winter-seasonal-wear",
    },
    { name: "Beauty & Grooming", icon: FaMobileAlt, id: "beauty-grooming" },
    { name: "Jewellery", icon: FaGem, id: "jewellery" },
    {
      name: "Personal Care Appliances",
      icon: FaMobileAlt,
      id: "personal-care-appliances",
    },
    { name: "International Brands", icon: FaTags, id: "international-brands" },
    { name: "Foot Wear", icon: FaShoePrints, id: "foot-wear" },
    { name: "Watches", icon: FaClock, id: "watches" },
    { name: "Accessories", icon: FaTags, id: "accessories" },
    { name: "Shirts", icon: FaTshirt, id: "Shirts" },
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
