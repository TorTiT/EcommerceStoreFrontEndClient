import React from "react";
import { Link } from "react-router-dom";
import Recommendations from "../components/Recommendations";

const HomePage = () => {
  const userId = "663e13bbb780463036c2cc60";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center text-center">
      <h3 className="mb-6 text-3xl font-bold text-white">
        Welcome To The Store
      </h3>
      <nav className="space-y-4">
        <Link
          to="/cart"
          className="block text-lg text-blue-300 hover:underline"
        >
          Cart Page
        </Link>
        <Link
          to="/statistics"
          className="block text-lg text-blue-300 hover:underline"
        >
          Statistics Page
        </Link>
        <Link
          to="/customers"
          className="block text-lg text-blue-300 hover:underline"
        >
          Customers Page
        </Link>
        <Link
          to="/category"
          className="block text-lg text-blue-300 hover:underline"
        >
          Categories Page
        </Link>
        <Link
          to="/catalog"
          className="block text-lg text-blue-300 hover:underline"
        >
          Products Catalog
        </Link>
        <Link
          to="/adminproduct"
          className="block text-lg text-blue-300 hover:underline"
        >
          Admin Products Catalog
        </Link>
        <Link
          to="/login"
          className="block text-lg text-blue-300 hover:underline"
        >
          Login
        </Link>
        <Link
          to="/registration"
          className="block text-lg text-blue-300 hover:underline"
        >
          New User Registration Page
        </Link>
      </nav>
      <div className="mt-8">
        <Recommendations userId={userId} />{" "}
      </div>
    </div>
  );
};

export default HomePage;
