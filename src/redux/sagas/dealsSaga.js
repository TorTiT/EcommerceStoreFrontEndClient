import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchDealsRequest,
  fetchDealsSuccess,
  fetchDealsFailure,
  addDealRequest,
  addDealSuccess,
  addDealFailure,
  removeDealRequest,
  removeDealSuccess,
  removeDealFailure,
} from "../slices/dealsSlice";

const BASE_URL = import.meta.env.VITE_API_URL + "/deals";

function* fetchDeals() {
  try {
    const response = yield call(axios.get, `${BASE_URL}`);
    yield put(fetchDealsSuccess(response.data));
  } catch (error) {
    console.error("Fetch Deals Error:", error);
    yield put(fetchDealsFailure(error.message));
  }
}

function* addDeal(action) {
  try {
    const response = yield call(axios.post, `${BASE_URL}`, action.payload);
    yield put(addDealSuccess(response.data));
  } catch (error) {
    console.error("Add Deal Error:", error);
    yield put(addDealFailure(error.message));
  }
}

function* removeDeal(action) {
  try {
    yield call(axios.delete, `${BASE_URL}/${action.payload}`);
    yield put(removeDealSuccess(action.payload));
  } catch (error) {
    console.error("Remove Deal Error:", error);
    yield put(removeDealFailure(error.message));
  }
}

function* dealsSaga() {
  yield takeEvery(fetchDealsRequest.type, fetchDeals);
  yield takeEvery(addDealRequest.type, addDeal);
  yield takeEvery(removeDealRequest.type, removeDeal);
}

export default dealsSaga;
