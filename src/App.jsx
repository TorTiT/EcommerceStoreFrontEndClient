import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsCatalogPage from "./pages/ProductsCatalogPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import StatisticsPage from "./pages/StatisticsPage";
import CartComponent from "./components/CartComponent";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "./redux/ws/websocket";

const App = () => {
  useEffect(() => {
    // WebSocket connection is already established in the websocket.js file
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <CartComponent />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="category" element={<CategoriesPage />} />
              <Route path="catalog" element={<ProductsCatalogPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="adminproduct" element={<AdminProductsPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
