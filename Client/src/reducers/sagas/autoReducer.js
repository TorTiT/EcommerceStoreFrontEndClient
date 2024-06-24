import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../../Redux/actions/authActions";

const initialState = {
  user: null,
  loading: false,
  error: null,
  registrationSuccess: false,
  registrationError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("Handling LOGIN_REQUEST");
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      console.log("Handling LOGIN_SUCCESS");
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      console.log("Handling LOGIN_FAILURE with error");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REGISTER_REQUEST:
      console.log("Handling REGISTER_REQUEST");
      return {
        ...state,
        loading: true,
        registrationSuccess: false,
        registrationError: null,
      };
    case REGISTER_SUCCESS:
      console.log("Handling REGISTER_SUCCESS");
      return {
        ...state,
        loading: false,
        registrationSuccess: true,
      };
    case REGISTER_FAILURE:
      console.log("Handling REGISTER_FAILURE with error");
      return {
        ...state,
        loading: false,
        registrationError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
