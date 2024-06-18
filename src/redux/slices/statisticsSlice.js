import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  soldProducts: [],
  productsInStock: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    fetchSoldProducts(state) {
      state.status = "loading";
    },
    fetchSoldProductsSuccess(state, action) {
      state.status = "succeeded";
      state.soldProducts = action.payload;
    },
    fetchSoldProductsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchProductsInStock(state) {
      state.status = "loading";
    },
    fetchProductsInStockSuccess(state, action) {
      state.status = "succeeded";
      state.productsInStock = action.payload;
    },
    fetchProductsInStockFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchSoldProducts,
  fetchSoldProductsSuccess,
  fetchSoldProductsFailure,
  fetchProductsInStock,
  fetchProductsInStockSuccess,
  fetchProductsInStockFailure,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
