import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-stone-700 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/category" className="hover:underline">
            Categories Page
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
