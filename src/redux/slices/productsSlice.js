// src/redux/slices/productsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchQuery: "",
};

// Products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchAllProducts(state) {
      state.status = "loading";
    },
    fetchAllProductsSuccess(state, action) {
      state.status = "succeeded";
      state.products = action.payload;
    },
    fetchAllProductsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchProductById(state) {
      state.status = "loading";
    },
    fetchProductByIdSuccess(state, action) {
      state.status = "succeeded";
      const index = state.products.findIndex(
        (p) => p._id === action.payload._id,
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
    },
    fetchProductByIdFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    updateProduct(state) {
      state.status = "loading";
    },
    updateProductSuccess(state, action) {
      state.status = "succeeded";
      const index = state.products.findIndex(
        (p) => p._id === action.payload._id,
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    updateProductFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteProduct(state) {
      state.status = "loading";
    },
    deleteProductSuccess(state, action) {
      state.status = "succeeded";
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
    deleteProductFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    uploadProduct(state) {
      state.status = "loading";
    },
    uploadProductSuccess(state, action) {
      state.status = "succeeded";
      state.products.push(action.payload);
    },
    uploadProductFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    uploadMultipleProducts(state) {
      state.status = "loading";
    },
    uploadMultipleProductsSuccess(state, action) {
      state.status = "succeeded";
      state.products = [...state.products, ...action.payload];
    },
    uploadMultipleProductsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  fetchAllProducts,
  fetchAllProductsSuccess,
  fetchAllProductsFailure,
  fetchProductById,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  uploadProduct,
  uploadProductSuccess,
  uploadProductFailure,
  uploadMultipleProducts,
  uploadMultipleProductsSuccess,
  uploadMultipleProductsFailure,
  setSearchQuery,
} = productsSlice.actions;

export default productsSlice.reducer;
