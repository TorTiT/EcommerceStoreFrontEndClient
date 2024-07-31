import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "./redux/slices/productsSlice";
import { fetchAllCategories } from "./redux/slices/categorySlice";
import { fetchDealsRequest } from "./redux/slices/dealsSlice";
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
import CartComponent from "./components/mainContent/CartComponent";
import Navbar from "./components/mainContent/Navbar";
import Footer from "./components/mainContent/Footer";
import MainContent from "./components/mainContent/MainContent";
import Loader from "./components/mainContent/Loader";

const App = () => {
  const dispatch = useDispatch();
  const { productsStatus } = useSelector((state) => state.products);
  const { categoriesStatus } = useSelector((state) => state.categories);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: cartLoading } = useSelector((state) => state.cart);
  const { loading: dealsLoading } = useSelector((state) => state.deals);

  useEffect(() => {
    const persistedAuthState = loadState();
    if (persistedAuthState?.auth?.user) {
      dispatch(loginSuccess(persistedAuthState.auth.user));
    }
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
    dispatch(fetchDealsRequest());
  }, [dispatch]);

  const isLoading =
    productsStatus === "loading" ||
    categoriesStatus === "loading" ||
    authLoading ||
    cartLoading ||
    dealsLoading;

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <CartComponent />
        <Navbar />
        {isLoading && <Loader />}
        <div className="flex flex-grow">
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
