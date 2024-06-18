import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../slices/categorySlice";

const BASE_URL = "http://localhost:8000/categories";

function* fetchAllCategoriesSaga() {
  try {
    const response = yield call(axios.get, `${BASE_URL}/`);
    yield put(fetchAllCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchAllCategoriesFailure(error.response.data));
  }
}

function* addCategorySaga(action) {
  try {
    const categoryData = action.payload;
    const response = yield call(axios.post, `${BASE_URL}/`, categoryData);
    yield put(addCategorySuccess(response.data));
  } catch (error) {
    yield put(addCategoryFailure(error.response.data));
  }
}

function* updateCategorySaga(action) {
  try {
    const { id, updateData } = action.payload;
    const response = yield call(axios.put, `${BASE_URL}/${id}`, updateData);
    yield put(updateCategorySuccess(response.data));
  } catch (error) {
    yield put(updateCategoryFailure(error.response.data));
  }
}

function* deleteCategorySaga(action) {
  try {
    const id = action.payload;
    yield call(axios.delete, `${BASE_URL}/${id}`);
    yield put(deleteCategorySuccess(id));
  } catch (error) {
    yield put(deleteCategoryFailure(error.response.data));
  }
}

export default function* categorySagas() {
  yield takeEvery(fetchAllCategories.type, fetchAllCategoriesSaga);
  yield takeEvery(addCategory.type, addCategorySaga);
  yield takeEvery(updateCategory.type, updateCategorySaga);
  yield takeEvery(deleteCategory.type, deleteCategorySaga);
}
