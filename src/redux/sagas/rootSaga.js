import { all } from "redux-saga/effects";
import productSagas from "./productsSagas";
import categorySagas from "./categorySagas";
import cartSagas from "./cartSagas";
import watchSaveState from "./saveStateSaga";
import statisticsSagas from "./statisticsSagas";
import recommendationsSagas from "./recommendationsSagas";

export default function* rootSaga() {
  yield all([
    productSagas(),
    categorySagas(),
    cartSagas(),
    statisticsSagas(),
    watchSaveState(),
    recommendationsSagas(),
  ]);
}
