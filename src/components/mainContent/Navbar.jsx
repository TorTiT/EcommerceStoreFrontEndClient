import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import SidebarButton from "./SideBar";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="bg-gray-800 p-4 text-white"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <nav className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarButton />
          <Link
            to="/"
            className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
          >
            Cart Page
          </Link>
          <Link
            to="/catalog"
            className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
          >
            Products Catalog
          </Link>
          {user?.user?.role === "admin" && (
            <>
              <Link
                to="/category"
                className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
              >
                Categories Page
              </Link>
              <Link
                to="/customers"
                className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
              >
                Customers Page
              </Link>
              <Link
                to="/statistics"
                className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
              >
                Statistics Page
              </Link>
              <Link
                to="/adminproduct"
                className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
              >
                Admin Products Catalog
              </Link>
              <Link
                to="/deals"
                className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
              >
                Admin Deals Page
              </Link>
            </>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <SearchBar />
          {user ? (
            <>
              <span>Welcome, </span>
              <LogoutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="transition duration-300 ease-in-out hover:text-gray-400 hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
