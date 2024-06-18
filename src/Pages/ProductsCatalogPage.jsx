import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productsSlice";
import { fetchAllCategories } from "../redux/slices/categorySlice";
import ProductCard from "../Components/ProductCard";
import Recommendations from "../Components/Recommendations";

const ProductsCatalog = () => {
  const dispatch = useDispatch();
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

  const [filter, setFilter] = useState({ title: "", category: "", price: "" });
  const [triggerUpdate, setTriggerUpdate] = useState(0); // State to trigger re-fetch

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handlePurchase = () => {
    // Handle the purchase logic here
    // After successful purchase, trigger the update
    setTriggerUpdate(triggerUpdate + 1);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(filter.title.toLowerCase()) &&
      (filter.category === "" || product.category === filter.category) &&
      (filter.price === "" || product.price <= parseFloat(filter.price))
    );
  });

  const userId = "663e13bbb780463036c2cc60"; // Hardcoded user ID for testing

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
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onPurchase={handlePurchase}
                  />
                ))
              )}
            </div>
          )}
        </div>
        <div className="pt-4 lg:w-1/4 lg:pl-4 lg:pt-0">
          <Recommendations userId={userId} triggerUpdate={triggerUpdate} />{" "}
          {/* Include the Recommendations component */}
        </div>
      </div>
    </div>
  );
};

export default ProductsCatalog;
