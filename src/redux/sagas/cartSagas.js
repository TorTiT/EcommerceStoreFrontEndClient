import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCart,
  fetchCartSuccess,
  fetchCartFailure,
  addItemToCart,
  addItemToCartSuccess,
  addItemToCartFailure,
  updateCartItem,
  updateCartItemSuccess,
  updateCartItemFailure,
  deleteCartItem,
  deleteCartItemSuccess,
  deleteCartItemFailure,
  buyItemsInCart,
  buyItemsInCartSuccess,
  buyItemsInCartFailure,
} from "../slices/cartSlice";
import {
  fetchProductById,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} from "../slices/productsSlice";

const BASE_URL = "http://localhost:8000/cart";

function* fetchCartSaga(action) {
  try {
    const userId = action.payload;
    const response = yield call(axios.get, `${BASE_URL}/${userId}`);
    yield put(fetchCartSuccess(response.data));
  } catch (error) {
    yield put(fetchCartFailure(error.response.data));
  }
}

function* addItemToCartSaga(action) {
  try {
    const { userId, itemDetails } = action.payload;
    const response = yield call(
      axios.post,
      `${BASE_URL}/${userId}/item`,
      itemDetails,
    );
    const newItem = response.data;

    // Add logging
    console.log("Response from server:", newItem);

    if (newItem.product) {
      const productDetailsResponse = yield call(
        axios.get,
        `http://localhost:8000/products/${newItem.product}`,
      );
      yield put(addItemToCartSuccess(newItem));
      yield put(fetchProductByIdSuccess(productDetailsResponse.data)); // Add product details to state
    } else {
      throw new Error("Product ID is undefined in the response");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put(addItemToCartFailure({ message }));
  }
}

function* updateCartItemSaga(action) {
  try {
    const { userId, itemId, updateDetails } = action.payload;
    yield call(
      axios.put,
      `${BASE_URL}/${userId}/item/${itemId}`,
      updateDetails,
    );
    // No need to update Redux state here, handled locally in component
  } catch (error) {
    yield put(updateCartItemFailure({ message: error.message }));
  }
}

function* deleteCartItemSaga(action) {
  try {
    const { userId, itemId } = action.payload;
    yield call(axios.delete, `${BASE_URL}/${userId}/item/${itemId}`);
    yield put(deleteCartItemSuccess(itemId)); // Dispatch itemId directly
  } catch (error) {
    yield put(deleteCartItemFailure({ message: error.message }));
  }
}

function* buyItemsInCartSaga(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(axios.post, `${BASE_URL}/${userId}/buy`);
    yield put(buyItemsInCartSuccess(response.data));
  } catch (error) {
    yield put(buyItemsInCartFailure({ message: error.message }));
  }
}

export default function* cartSagas() {
  yield takeEvery(fetchCart.type, fetchCartSaga);
  yield takeEvery(addItemToCart.type, addItemToCartSaga);
  yield takeEvery(updateCartItem.type, updateCartItemSaga);
  yield takeEvery(deleteCartItem.type, deleteCartItemSaga);
  yield takeEvery(buyItemsInCart.type, buyItemsInCartSaga);
}
