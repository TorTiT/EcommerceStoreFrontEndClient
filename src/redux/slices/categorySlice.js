import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Category slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchAllCategories(state) {
      state.status = "loading";
    },
    fetchAllCategoriesSuccess(state, action) {
      state.status = "succeeded";
      state.categories = action.payload;
    },
    fetchAllCategoriesFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    addCategory(state) {
      state.status = "loading";
    },
    addCategorySuccess(state, action) {
      state.status = "succeeded";
      state.categories.push(action.payload);
    },
    addCategoryFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    updateCategory(state) {
      state.status = "loading";
    },
    updateCategorySuccess(state, action) {
      state.status = "succeeded";
      const index = state.categories.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    updateCategoryFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteCategory(state) {
      state.status = "loading";
    },
    deleteCategorySuccess(state, action) {
      state.status = "succeeded";
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    },
    deleteCategoryFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllCategories,
  fetchAllCategoriesSuccess,
  fetchAllCategoriesFailure,
  addCategory,
  addCategorySuccess,
  addCategoryFailure,
  updateCategory,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
