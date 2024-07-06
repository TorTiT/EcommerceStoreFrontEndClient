import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCustomersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCustomersSuccess(state, action) {
      state.loading = false;
      state.customers = action.payload;
    },
    fetchCustomersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCustomersRequest,
  fetchCustomersSuccess,
  fetchCustomersFailure,
} = customersSlice.actions;

export default customersSlice.reducer;
