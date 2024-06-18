import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  uploadProduct,
  updateProduct,
  deleteProduct,
} from "../redux/slices/productsSlice";
import { fetchAllCategories } from "../redux/slices/categorySlice";
import ProductForm from "../Components/ProductForm";
import Navbar from "../Components/Navbar";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [editingProduct, setEditingProduct] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4">
        <button
          onClick={handleAddNewProduct}
          className="mb-4 rounded bg-green-500 px-4 py-2 text-white"
        >
          Add New
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
      </div>
    </div>
  );
};

export default AdminProductsPage;
