import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchAllProducts,
  fetchAllProductsSuccess,
  fetchAllProductsFailure,
  fetchProductById,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  uploadProduct,
  uploadProductSuccess,
  uploadProductFailure,
  uploadMultipleProducts,
  uploadMultipleProductsSuccess,
  uploadMultipleProductsFailure,
} from "../slices/productsSlice";

const BASE_URL = process.env.REACT_APP_API_URL + "/products";

function* fetchAllProductsSaga() {
  try {
    const response = yield call(axios.get, `${BASE_URL}/`);
    yield put(fetchAllProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchAllProductsFailure(error.response.data));
  }
}

function* fetchProductByIdSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(axios.get, `${BASE_URL}/${id}`);
    yield put(fetchProductByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchProductByIdFailure(error.response.data));
  }
}

function* updateProductSaga(action) {
  try {
    const { id, updateData } = action.payload;
    const response = yield call(axios.put, `${BASE_URL}/${id}`, updateData);
    yield put(updateProductSuccess(response.data));
  } catch (error) {
    yield put(updateProductFailure(error.response.data));
  }
}

function* deleteProductSaga(action) {
  try {
    const { productId } = action.payload;
    yield call(axios.delete, `${BASE_URL}/${productId}`);
    yield put(deleteProductSuccess(productId));
  } catch (error) {
    yield put(deleteProductFailure(error.response.data));
  }
}

function* uploadProductSaga(action) {
  try {
    const productData = action.payload; // Payload is a plain object
    const response = yield call(axios.post, `${BASE_URL}/`, productData);
    yield put(uploadProductSuccess(response.data));
  } catch (error) {
    yield put(uploadProductFailure(error.response.data));
  }
}

function* uploadMultipleProductsSaga(action) {
  try {
    const productsData = action.payload;
    const response = yield call(axios.post, `${BASE_URL}/bulk`, productsData);
    yield put(uploadMultipleProductsSuccess(response.data));
  } catch (error) {
    yield put(uploadMultipleProductsFailure(error.response.data));
  }
}

export default function* productSagas() {
  yield takeEvery(fetchAllProducts.type, fetchAllProductsSaga);
  yield takeEvery(fetchProductById.type, fetchProductByIdSaga);
  yield takeEvery(updateProduct.type, updateProductSaga);
  yield takeEvery(deleteProduct.type, deleteProductSaga);
  yield takeEvery(uploadProduct.type, uploadProductSaga);
  yield takeEvery(uploadMultipleProducts.type, uploadMultipleProductsSaga);
}
