import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchRecommendations,
  fetchRecommendationsSuccess,
  fetchRecommendationsFailure,
} from "../slices/recommendationsSlice";

const BASE_URL = import.meta.env.VITE_API_URL + "/recommendations";

function* fetchRecommendationsSaga(action) {
  try {
    const userId = action.payload;
    const response = yield call(axios.get, `${BASE_URL}/${userId}`);
    yield put(fetchRecommendationsSuccess(response.data));
  } catch (error) {
    yield put(fetchRecommendationsFailure(error.response.data));
  }
}

export default function* recommendationsSagas() {
  yield takeEvery(fetchRecommendations.type, fetchRecommendationsSaga);
}
