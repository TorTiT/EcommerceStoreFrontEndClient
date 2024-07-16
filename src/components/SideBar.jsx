import React from "react";
import { useSelector } from "react-redux";
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
import { motion } from "framer-motion";

const iconMap = {
  "Traditional Wear": FaTshirt,
  "Western Wear": FaTshirt,
  "Swim & Beachwear": FaSwimmer,
  "Winter & Seasonal Wear": FaSkiing,
  "Beauty & Grooming": FaMobileAlt,
  Jewellery: FaGem,
  "Personal Care Appliances": FaMobileAlt,
  "International Brands": FaTags,
  "Foot Wear": FaShoePrints,
  Watches: FaClock,
  Accessories: FaTags,
  Shirts: FaTshirt,
};

const Sidebar = () => {
  const categories = useSelector((state) => state.categories.categories);

  const sidebarVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
      },
    }),
  };

  return (
    <motion.div
      className="min-h-screen w-64 bg-gray-800 p-4 text-white"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <h2 className="mb-4 text-xl font-bold text-white">Categories</h2>
      <ul>
        {categories.map((category, index) => {
          const Icon = iconMap[category.name] || FaTags;
          return (
            <motion.li
              key={category._id}
              className="mb-2"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
            >
              <Link
                to={`/catalog?category=${category._id}`}
                className="flex items-center rounded px-3 py-2 hover:bg-gray-700"
              >
                <Icon className="mr-2 inline" /> {category.name}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
