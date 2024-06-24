import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "../slices/productsSlice";
import categoriesReducer from "../slices/categorySlice";
import cartReducer from "../slices/cartSlice";
import statisticsReducer from "../slices/statisticsSlice";
import recommendationsReducer from "./recommendationsSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  statistics: statisticsReducer,
  recommendations: recommendationsReducer,
});

export default rootReducer;
