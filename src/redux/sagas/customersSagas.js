import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCustomersRequest,
  fetchCustomersSuccess,
  fetchCustomersFailure,
} from "../slices/customersSlice";

const BASE_URL = import.meta.env.VITE_API_URL + "/customers";

function* fetchCustomersSaga() {
  try {
    const response = yield call(axios.get, `${BASE_URL}`);
    yield put(fetchCustomersSuccess(response.data));
  } catch (error) {
    yield put(fetchCustomersFailure(error.message));
  }
}

export default function* customersSagas() {
  yield takeEvery(fetchCustomersRequest.type, fetchCustomersSaga);
}
