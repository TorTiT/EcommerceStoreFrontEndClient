import { takeEvery, select } from "redux-saga/effects";
import { saveState } from "../localStorageHelpers";
import {
  fetchCartRequest,
  addItemToCartRequest,
  updateCartItemRequest,
  deleteCartItemRequest,
} from "../slices/cartSlice";
import {
  fetchAllProducts,
  updateProduct,
  deleteProduct,
  uploadProduct,
} from "../slices/productsSlice";
import {
  fetchAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../slices/categorySlice";

const selectState = (state) => state;

function* saveStateSaga() {
  const state = yield select(selectState);
  saveState(state);
}

export default function* watchSaveState() {
  yield takeEvery(
    [
      fetchCartRequest.type,
      addItemToCartRequest.type,
      updateCartItemRequest.type,
      deleteCartItemRequest.type,
      fetchAllProducts.type,
      updateProduct.type,
      deleteProduct.type,
      uploadProduct.type,
      fetchAllCategories.type,
      addCategory.type,
      updateCategory.type,
      deleteCategory.type,
    ],
    saveStateSaga,
  );
}
