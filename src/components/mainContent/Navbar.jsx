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
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      className="w-full bg-gray-800 p-4 text-white"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <nav className="mx-auto flex max-w-7xl flex-col items-center justify-between md:flex-row">
        <div className="flex flex-wrap items-center justify-center space-x-4">
          <SidebarButton />
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart Page
          </Link>
          <Link to="/catalog" className="hover:underline">
            Products Catalog
          </Link>
          {user?.user?.role === "admin" && (
            <>
              <Link to="/category" className="hover:underline">
                Categories Page
              </Link>
              <Link to="/customers" className="hover:underline">
                Customers Page
              </Link>
              <Link to="/statistics" className="hover:underline">
                Statistics Page
              </Link>
              <Link to="/adminproduct" className="hover:underline">
                Admin Products Catalog
              </Link>
              <Link to="/deals" className="hover:underline">
                Admin Deals Page
              </Link>
            </>
          )}
        </div>
        <div className="mt-2 flex items-center space-x-4 md:mt-0">
          {user ? (
            <LogoutButton />
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </nav>
      <div className="mt-2 flex justify-center">
        <SearchBar />
      </div>
    </motion.div>
  );
};

export default Navbar;
