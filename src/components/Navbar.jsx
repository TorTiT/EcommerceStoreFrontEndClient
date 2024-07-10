import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSpring, animated } from "@react-spring/web";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const slideIn = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
  });

  return (
    <animated.div style={fade} className="bg-stone-700 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <animated.div style={slideIn} className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/category" className="hover:underline">
            Categories Page
          </Link>
          <Link to="/customers" className="hover:underline">
            Customers Page
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart Page
          </Link>
          <Link to="/catalog" className="hover:underline">
            Products Catalog
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
        </animated.div>
        <div className="flex items-center space-x-4">
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
        </div>
      </nav>
    </animated.div>
  );
};

export default Navbar;
