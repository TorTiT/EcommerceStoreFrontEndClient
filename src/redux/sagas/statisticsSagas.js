import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSoldProducts,
  fetchSoldProductsSuccess,
  fetchSoldProductsFailure,
  fetchProductsInStock,
  fetchProductsInStockSuccess,
  fetchProductsInStockFailure,
} from "../slices/statisticsSlice";

const BASE_URL = "http://localhost:8000/statistics";

function* fetchSoldProductsSaga() {
  try {
    const response = yield call(axios.get, `${BASE_URL}/sold-products`);
    yield put(fetchSoldProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchSoldProductsFailure(error.message));
  }
}

function* fetchProductsInStockSaga() {
  try {
    const response = yield call(axios.get, `${BASE_URL}/products-in-stock`);
    yield put(fetchProductsInStockSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsInStockFailure(error.message));
  }
}

export default function* statisticsSagas() {
  yield takeEvery(fetchSoldProducts.type, fetchSoldProductsSaga);
  yield takeEvery(fetchProductsInStock.type, fetchProductsInStockSaga);
}
