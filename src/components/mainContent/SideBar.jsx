import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
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
};

const SidebarButton = () => {
  const categories = useSelector((state) => state.categories.categories);
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleCategories = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleCategories}
        className="z-50 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-lg"
        style={{ width: "40px", height: "40px" }}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute left-0 top-16 z-40 overflow-hidden rounded-lg bg-white shadow-lg"
          >
            {categories.map((category, index) => {
              const Icon = iconMap[category.name] || FaTags;
              return (
                <motion.li
                  key={category._id}
                  className="mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/catalog?category=${category._id}`}
                    className="flex items-center rounded px-3 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setIsExpanded(false)}
                  >
                    <Icon className="mr-2 inline" /> {category.name}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarButton;
