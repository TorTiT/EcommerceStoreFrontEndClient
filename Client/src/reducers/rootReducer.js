// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "../../src/reducers/autoReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
