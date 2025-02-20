import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1543996469-600fbadfc1e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover", // Adjust as needed
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
