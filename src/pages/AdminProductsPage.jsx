// src/pages/AdminProductsPage.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  uploadProduct,
  updateProduct,
  deleteProduct,
  uploadMultipleProducts,
} from "../redux/slices/productsSlice";
import { fetchAllCategories } from "../redux/slices/categorySlice";
import ProductForm from "../components/ProductForm";
import CustomModal from "../components/CustomModal";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bulkProductsData, setBulkProductsData] = useState("");

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleAddNewProduct = () => {
    const emptyProduct = {
      name: "",
      description: "",
      price: 0,
      category: "",
      size: [],
      color: "",
      stock: 0,
      images: [""], // Initialize with an empty image URL
      tags: [],
    };
    setEditingProduct(emptyProduct);
  };

  const saveProduct = (productData) => {
    if (productData._id) {
      dispatch(updateProduct({ id: productData._id, updateData: productData }));
    } else {
      dispatch(uploadProduct(productData));
    }
    setEditingProduct(null);
  };

  const deleteProductHandler = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleBulkProductsChange = (e) => {
    setBulkProductsData(e.target.value);
  };

  const handleBulkUpload = () => {
    try {
      const productsArray = JSON.parse(bulkProductsData);
      dispatch(uploadMultipleProducts(productsArray));
      alert("Products added successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add products:", error);
      alert("Failed to add products. Make sure the input is valid JSON.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4">
        <button
          onClick={handleAddNewProduct}
          className="mb-4 rounded bg-green-500 px-4 py-2 text-white"
        >
          Add New
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 ml-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Bulk Upload
        </button>
        {editingProduct && (
          <ProductForm
            initialProduct={editingProduct}
            onSave={saveProduct}
            isNew={!editingProduct._id}
          />
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductForm
              key={product._id}
              initialProduct={product}
              onSave={saveProduct}
              onDelete={deleteProductHandler}
              isNew={false}
            />
          ))}
        </div>

        <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <h2 className="mb-4 text-xl font-bold">Bulk Upload Products</h2>
          <textarea
            value={bulkProductsData}
            onChange={handleBulkProductsChange}
            rows="10"
            className="w-full rounded border p-2"
            placeholder='[{"name": "Product1", "description": "Description1", ...}, ...]'
          />
          <button
            onClick={handleBulkUpload}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Upload Products
          </button>
        </CustomModal>
      </div>
    </div>
  );
};

export default AdminProductsPage;
