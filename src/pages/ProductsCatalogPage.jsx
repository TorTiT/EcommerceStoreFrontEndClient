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
import CatalogRecommendations from "../components/mainContent/CatalogRecommendations";
import { useTransition, animated } from "@react-spring/web";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
    categories: new Set(initialCategory ? [initialCategory] : []),
    price: [0, 1000],
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
        categories: new Set([categoryFromParams]),
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFilter((prevFilter) => {
        const newCategories = new Set(prevFilter.categories);
        if (newCategories.has(value)) {
          newCategories.delete(value);
        } else {
          newCategories.add(value);
        }
        return { ...prevFilter, categories: newCategories };
      });
    } else {
      setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    }
  };

  const handlePriceChange = (price) => {
    setFilter((prevFilter) => ({ ...prevFilter, price }));
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

  const renderCategoryTree = (categories) => {
    return (
      <ul className="pl-4">
        {categories.map((category) => (
          <li key={category._id}>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="category"
                value={category._id}
                checked={filter.categories.has(category._id)}
                onChange={handleFilterChange}
                className="mr-2"
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    );
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
        (filter.categories.size === 0 ||
          filter.categories.has(product.category)) &&
        product.price >= filter.price[0] &&
        product.price <= filter.price[1]
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
      <div className="container mx-auto flex flex-col p-4 lg:flex-row">
        <div className="mb-6 lg:mb-0 lg:mr-4 lg:w-1/4">
          <h3 className="mb-4 text-2xl font-bold text-blue-600">Filters</h3>
          <div className="flex flex-col space-y-4">
            <input
              className="w-full rounded-md border border-blue-300 p-2"
              name="title"
              placeholder="Search by title"
              value={filter.title}
              onChange={handleFilterChange}
            />
            <div>
              <h4 className="mb-2 font-semibold">Categories</h4>
              {renderCategoryTree(categories)}
            </div>
            <div className="w-full">
              <p className="mb-2 text-center text-sm font-semibold text-gray-700">
                Price Range
              </p>
              <Slider
                range
                min={0}
                max={1000}
                defaultValue={[0, 1000]}
                value={filter.price}
                onChange={handlePriceChange}
                className="mx-2"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>${filter.price[0]}</span>
                <span>${filter.price[1]}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-3/4">
          <h3 className="mb-6 text-3xl font-bold text-blue-600">
            Products Catalog
          </h3>
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
                      showDescription={false}
                    />
                  </animated.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto pt-6">
        <CatalogRecommendations userId={userId} />
      </div>
    </div>
  );
};

export default ProductsCatalogPage;
