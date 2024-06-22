import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from "../../redux/actions/authActions";

function* loginSaga(action) {
  try {
    console.log("Sending login request to server with:", action.payload);
    const response = yield call(axios.post, "http://localhost:27017/login", {
      userName: action.payload.username,
      password: action.payload.password,
    });
    console.log("Login request successful. Response:", response.data);
    yield put(loginSuccess(response.data));
  } catch (error) {
    console.error(
      "Login request failed. Error:",
      error.response?.data?.message || error.message
    );
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* registerSaga(action) {
  try {
    console.log("Sending register request to server with:", action.payload);
    const response = yield call(axios.post, "http://localhost:27017/register", {
      userName: action.payload.username,
      email: action.payload.email,
      password: action.payload.password,
    });
    console.log("Register request successful. Response:", response.data);
    yield put(registerSuccess(response.data));
  } catch (error) {
    console.error(
      "Register request failed. Error:",
      error.response?.data?.message || error.message
    );
    yield put(
      registerFailure(error.response?.data?.message || "Registration failed")
    );
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}
