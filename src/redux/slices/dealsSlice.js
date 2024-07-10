import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deals: [],
  loading: false,
  error: null,
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    fetchDealsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDealsSuccess(state, action) {
      state.loading = false;
      state.deals = action.payload;
    },
    fetchDealsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addDealRequest(state) {
      state.loading = true;
    },
    addDealSuccess(state, action) {
      state.loading = false;
      state.deals.push(action.payload);
    },
    addDealFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateDealRequest(state) {
      state.loading = true;
    },
    updateDealSuccess(state, action) {
      state.loading = false;
      const index = state.deals.findIndex(
        (deal) => deal.id === action.payload.id,
      );
      if (index !== -1) {
        state.deals[index] = action.payload;
      }
    },
    updateDealFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeDealRequest(state) {
      state.loading = true;
    },
    removeDealSuccess(state, action) {
      state.loading = false;
      state.deals = state.deals.filter((deal) => deal.id !== action.payload);
    },
    removeDealFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDealsRequest,
  fetchDealsSuccess,
  fetchDealsFailure,
  addDealRequest,
  addDealSuccess,
  addDealFailure,
  updateDealRequest,
  updateDealSuccess,
  updateDealFailure,
  removeDealRequest,
  removeDealSuccess,
  removeDealFailure,
} = dealsSlice.actions;

export default dealsSlice.reducer;
