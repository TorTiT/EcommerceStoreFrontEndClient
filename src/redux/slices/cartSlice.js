import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartRequest(state) {
      state.status = "loading";
      state.error = null; // Clear any existing errors when starting to fetch
    },
    fetchCartSuccess(state, action) {
      console.log("fetchCartSuccess payload:", action.payload);
      state.status = "succeeded";
      state.items = action.payload.items || []; // Ensure this is correct
      state.error = null; // Clear any existing errors on success
    },
    fetchCartFailure(state, action) {
      state.status = "failed";
      state.error = action.payload.message;
    },
    addItemToCartRequest(state) {
      state.status = "loading";
    },
    addItemToCartSuccess(state, action) {
      state.status = "succeeded";
      state.items.push(action.payload);
    },
    addItemToCartFailure(state, action) {
      state.status = "failed";
      state.error = action.payload.message;
    },
    updateCartItemRequest(state) {
      state.status = "idle"; // Do not change status to avoid re-renders
    },
    updateCartItemSuccess(state, action) {
      const updatedItem = action.payload;
      const index = state.items.findIndex(
        (item) => item._id === updatedItem._id,
      );
      if (index !== -1) {
        state.items[index] = updatedItem;
      }
    },
    updateCartItemFailure(state, action) {
      state.status = "failed";
      state.error = action.payload.message;
    },
    deleteCartItemRequest(state) {
      state.status = "loading";
    },
    deleteCartItemSuccess(state, action) {
      state.status = "succeeded";
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    deleteCartItemFailure(state, action) {
      state.status = "failed";
      state.error = action.payload.message;
    },
    buyItemsInCartRequest(state) {
      state.status = "loading";
    },
    buyItemsInCartSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
    },
    buyItemsInCartFailure(state, action) {
      state.status = "failed";
      state.error = action.payload.message;
    },
    clearCart(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addItemToCartRequest,
  addItemToCartSuccess,
  addItemToCartFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
  updateCartItemFailure,
  deleteCartItemRequest,
  deleteCartItemSuccess,
  deleteCartItemFailure,
  buyItemsInCartRequest,
  buyItemsInCartSuccess,
  buyItemsInCartFailure,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
