import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../slices/cartSlice";

const BASE_URL = "http://localhost:8000";

function* fetchCart(action) {
  try {
    const response = yield call(
      axios.get,
      `${BASE_URL}/cart/${action.payload}`,
    );
    yield put(fetchCartSuccess(response.data));
  } catch (error) {
    yield put(fetchCartFailure(error.message));
  }
}

function* addItemToCartSaga(action) {
  try {
    console.log(
      "Sending add item to cart request to server with:",
      action.payload,
    );
    const response = yield call(
      axios.post,
      `http://localhost:8000/cart/${action.payload.userId}/item`,
      action.payload.itemDetails,
    );
    console.log(
      "Add item to cart request successful. Response:",
      response.data,
    );
    yield put(addItemToCartSuccess(response.data));
  } catch (error) {
    console.error(
      "Add item to cart request failed. Error:",
      error.response?.data?.message || error.message,
    );
    yield put(
      addItemToCartFailure(
        error.response?.data?.message || "Add to cart failed",
      ),
    );
  }
}

function* updateCartItemSaga(action) {
  try {
    const response = yield call(
      axios.put,
      `${BASE_URL}/cart/${action.payload.userId}/item/${action.payload.itemId}`,
      action.payload.updateDetails,
    );
    yield put(updateCartItemSuccess(response.data));
  } catch (error) {
    yield put(updateCartItemFailure(error.message));
  }
}

function* deleteCartItemSaga(action) {
  try {
    yield call(
      axios.delete,
      `${BASE_URL}/cart/${action.payload.userId}/item/${action.payload.itemId}`,
    );
    yield put(deleteCartItemSuccess(action.payload.itemId));
  } catch (error) {
    yield put(deleteCartItemFailure(error.message));
  }
}

function* cartSaga() {
  yield takeEvery(fetchCartRequest.type, fetchCart);
  yield takeEvery(addItemToCartRequest.type, addItemToCartSaga);
  yield takeEvery(updateCartItemRequest.type, updateCartItemSaga);
  yield takeEvery(deleteCartItemRequest.type, deleteCartItemSaga);
}

export default cartSaga;
