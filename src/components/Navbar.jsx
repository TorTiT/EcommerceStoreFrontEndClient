import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LogoutButton from "./LogoutButton";

const navbarVariants = {
  hidden: { opacity: 0, y: -100 },
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

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <motion.div
      className="bg-gray-800 text-white shadow-md"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <nav className="container mx-auto flex items-center justify-between p-4">
        <motion.div
          className="flex space-x-4 pl-6"
          initial="hidden"
          animate="visible"
          variants={navbarVariants}
        >
          <motion.div custom={0} variants={linkVariants}>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </motion.div>
          <motion.div custom={1} variants={linkVariants}>
            <Link to="/cart" className="hover:underline">
              Cart Page
            </Link>
          </motion.div>
          <motion.div custom={2} variants={linkVariants}>
            <Link to="/catalog" className="hover:underline">
              Products Catalog
            </Link>
          </motion.div>
          {user?.user?.role === "admin" && (
            <>
              <motion.div custom={3} variants={linkVariants}>
                <Link to="/category" className="hover:underline">
                  Categories Page
                </Link>
              </motion.div>
              <motion.div custom={4} variants={linkVariants}>
                <Link to="/customers" className="hover:underline">
                  Customers Page
                </Link>
              </motion.div>
              <motion.div custom={5} variants={linkVariants}>
                <Link to="/statistics" className="hover:underline">
                  Statistics Page
                </Link>
              </motion.div>
              <motion.div custom={6} variants={linkVariants}>
                <Link to="/adminproduct" className="hover:underline">
                  Admin Products Catalog
                </Link>
              </motion.div>
              <motion.div custom={7} variants={linkVariants}>
                <Link to="/deals" className="hover:underline">
                  Admin Deals Page
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
        <motion.div
          className="ml-auto flex items-center space-x-4"
          initial="hidden"
          animate="visible"
          variants={navbarVariants}
        >
          {user ? (
            <>
              <span>Welcome, {user.userName}</span>
              <LogoutButton />
            </>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </motion.div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
