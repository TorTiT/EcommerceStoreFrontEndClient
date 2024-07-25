import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchAllProducts } from "../redux/slices/productsSlice";
import { toast } from "react-toastify";

const AddProductsAdmin = () => {
  const [productsJson, setProductsJson] = useState("");
  const dispatch = useDispatch();

  const handleAddProducts = async () => {
    try {
      const products = JSON.parse(productsJson);
      const response = await axios.post("/api/products/batch", { products });

      if (response.status === 200) {
        toast.success("Products added successfully");
        dispatch(fetchAllProducts());
        setProductsJson("");
      } else {
        toast.error("Failed to add products");
      }
    } catch (error) {
      toast.error("Invalid JSON or Server Error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">Add Products</h2>
      <textarea
        className="w-full rounded border border-gray-300 p-2"
        rows="10"
        value={productsJson}
        onChange={(e) => setProductsJson(e.target.value)}
        placeholder="Paste product JSON here"
      ></textarea>
      <button
        onClick={handleAddProducts}
        className="mt-4 rounded bg-blue-500 p-2 text-white"
      >
        Add Products
      </button>
    </div>
  );
};

export default AddProductsAdmin;
