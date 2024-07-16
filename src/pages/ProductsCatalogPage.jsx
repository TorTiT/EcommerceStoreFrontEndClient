import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productsSlice";
import { fetchAllCategories } from "../redux/slices/categorySlice";
import { fetchDealsRequest } from "../redux/slices/dealsSlice";
import {
  addItemToCartRequest,
  fetchCartRequest,
  updateCartItemRequest,
} from "../redux/slices/cartSlice";
import ProductCard from "../components/ProductCard";
import Recommendations from "../components/Recommendations";
import { useTransition, animated } from "@react-spring/web";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const ProductsCatalogPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const {
    products,
    status: productsStatus,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useSelector((state) => state.categories);
  const { deals } = useSelector((state) => state.deals);
  const userId = useSelector((state) => state.auth.user?.user?._id);
  const cartItems = useSelector((state) => state.cart.items);

  const initialCategory = searchParams.get("category") || "";
  const [filter, setFilter] = useState({
    title: "",
    category: initialCategory,
    price: "",
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
    dispatch(fetchDealsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartRequest(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const categoryFromParams = searchParams.get("category");
    if (categoryFromParams) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        category: categoryFromParams,
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handlePurchase = (product) => {
    if (!userId) {
      toast.error("Please log in to purchase items");
      return;
    }
    const existingCartItem = cartItems.find(
      (item) => item.product._id === product._id,
    );
    if (existingCartItem) {
      dispatch(
        updateCartItemRequest({
          userId,
          itemId: existingCartItem._id,
          updateDetails: { quantity: existingCartItem.quantity + 1 },
        }),
      );
    } else {
      const itemDetails = {
        product: product._id,
        quantity: 1,
        size: product.size[0],
        color: product.color,
        price: product.dealPrice || product.price,
      };
      dispatch(addItemToCartRequest({ userId, itemDetails }));
    }
  };

  const filteredProducts = products
    .map((product) => {
      const deal = deals.find((deal) => deal.product._id === product._id);
      return deal
        ? { ...product, dealPrice: deal.dealPrice }
        : { ...product, dealPrice: null };
    })
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(filter.title.toLowerCase()) &&
        (filter.category === "" || product.category === filter.category) &&
        (filter.price === "" || product.price <= parseFloat(filter.price))
      );
    });

  const transitions = useTransition(filteredProducts, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    keys: filteredProducts.map((product) => product._id),
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto flex flex-col-reverse p-4 lg:flex-row">
        <div className="lg:w-3/4">
          <h3 className="mb-6 text-3xl font-bold text-blue-600">
            Products Catalog
          </h3>
          <div className="mb-6 flex flex-col items-center md:flex-row">
            <input
              className="mb-2 w-full rounded-md border border-blue-300 p-2 md:mb-0 md:mr-2 md:w-1/3"
              name="title"
              placeholder="Search by title"
              value={filter.title}
              onChange={handleFilterChange}
            />
            <select
              className="mb-2 w-full rounded-md border border-blue-300 p-2 md:mb-0 md:mr-2 md:w-1/3"
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="mb-2 w-1/4 rounded-md border border-blue-300 p-2 md:mb-0"
              name="price"
              placeholder="Max price"
              value={filter.price}
              onChange={handleFilterChange}
            />
          </div>
          {productsStatus === "loading" ? (
            <p className="text-yellow-600">Loading...</p>
          ) : productsStatus === "failed" ? (
            <p className="text-red-600">Error: {productsError}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.length === 0 ? (
                <p className="text-red-600">No products found</p>
              ) : (
                transitions((style, product) => (
                  <animated.div style={style} key={product._id}>
                    <ProductCard
                      product={product}
                      onPurchase={() => handlePurchase(product)}
                      dealPrice={product.dealPrice}
                    />
                  </animated.div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="pt-4 lg:w-1/4 lg:pl-4 lg:pt-0">
          <Recommendations userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default ProductsCatalogPage;
