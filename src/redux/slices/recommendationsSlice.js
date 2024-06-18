import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendations: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    fetchRecommendations(state) {
      state.status = "loading";
      state.error = null; // Clear any existing errors when starting to fetch
    },
    fetchRecommendationsSuccess(state, action) {
      state.status = "succeeded";
      state.recommendations = action.payload;
      state.error = null; // Clear any existing errors on success
    },
    fetchRecommendationsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchRecommendations,
  fetchRecommendationsSuccess,
  fetchRecommendationsFailure,
} = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
