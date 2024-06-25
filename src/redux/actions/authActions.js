export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

// Action creators for login
export const loginRequest = (username, password) => {
  console.log("Login request action dispatched with:", { username, password });
  return {
    type: LOGIN_REQUEST,
    payload: { username, password },
  };
};

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action creators for registration
export const registerRequest = (username, email, password) => {
  console.log("Register request action dispatched with:", {
    username,
    email,
    password,
  });
  return {
    type: REGISTER_REQUEST,
    payload: { username, email, password },
  };
};

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});
