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
  preloadedState: { auth: preloadedState?.auth }, // Ensure only auth state is preloaded
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveState({ auth: store.getState().auth });
});

export default store;
