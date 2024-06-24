<<<<<<< HEAD
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "../reducers/sagas/autoReducer";
import watchAuthSaga from "../reducers/sagas/authSaga";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);

sagaMiddleware.run(watchAuthSaga);
=======
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./slices/rootReducer";
import rootSaga from "./sagas/rootSaga";
import { loadState, saveState } from "./localStorageHelpers";

const sagaMiddleware = createSagaMiddleware();
const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  preloadedState,
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveState(store.getState());
});
>>>>>>> 15862e2f899c7c90a3ad7a71a06d7339964d6831

export default store;
