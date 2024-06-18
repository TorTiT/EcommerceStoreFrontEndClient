import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./Pages/CategoriesPage";
import ProductsCatalogPage from "./Pages/ProductsCatalogPage";
import AdminProductsPage from "./Pages/AdminProductsPage";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import StatisticsPage from "./Pages/StatisticsPage";
import CartComponent from "./Components/CartComponent";
import Layout from "./Components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "./redux/WS/websocket";

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
      <div>
        <CartComponent />
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
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
