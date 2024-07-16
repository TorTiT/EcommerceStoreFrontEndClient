import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "./redux/WS/websocket";
import { fetchAllProducts } from "./redux/slices/productsSlice";
import { fetchAllCategories } from "./redux/slices/categorySlice";
import { fetchDealsRequest } from "./redux/slices/dealsSlice";
import { useDispatch } from "react-redux";
import { loadState } from "./redux/localStorageHelpers";
import { loginSuccess } from "./redux/actions/authActions";

// Pages
import CategoriesPage from "./pages/CategoriesPage";
import ProductsCatalogPage from "./pages/ProductsCatalogPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminDealsPage from "./pages/AdminDealsPage";
import CartPage from "./pages/CartPage";
import StatisticsPage from "./pages/StatisticsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomersPage from "./pages/CustomersPage";
import ProductPage from "./pages/ProductPage";

// Components
import CartComponent from "./components/CartComponent";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // WebSocket connection is already established in the websocket.js file
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    const persistedAuthState = loadState();
    if (persistedAuthState?.auth?.user) {
      dispatch(loginSuccess(persistedAuthState.auth.user));
    }
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
    dispatch(fetchDealsRequest());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <CartComponent />
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="category" element={<CategoriesPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="catalog" element={<ProductsCatalogPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="adminproduct" element={<AdminProductsPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="deals" element={<AdminDealsPage />} />
            </Routes>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
