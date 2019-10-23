import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DISMISS_ERRORS
} from "./actionTypes";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/users/user/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = (username, password) => dispatch => {
  axios
    .post("/api/users/login/", {
      username: username,
      password: password
    })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: LOGIN_FAIL,
        payload: Object.values(error.response.data)
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/users/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const register = ({ email, username, password }) => dispatch => {
  axios
    .post("/api/users/register/", {
      email: email,
      username: username,
      password: password
    })
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      /**
       * In the case of the backend being unavailable, the response
       * may not contain the expected structure. Show the error string
       * or a general error message to avoid unexpected behavior such
       * as a string instead of error list.
       *
       * [See issue 104](https://github.com/danielgrijalva/overworld/issues/104)
       */
      console.log(JSON.stringify(Object.values(error.response.data)));
      const data = error && error.response && error.response.data;
      const type = typeof data

      const payload = []
      if (Array.isArray(data)) {
        payload.push(...data);
      } else if (type === 'function' || type === 'object' && !!data) {
        payload.push(...Object.values(data).reduce((p, c) => [...p, ...c], []))
      } else if (type === "string") {
        payload.push(data);
      } else {
        payload.push("Sorry, an unexpected error occurred")
      }

      dispatch({
        type: REGISTER_FAIL,
        payload
      });
    });
};

export const dismissErrors = () => dispatch => {
  dispatch({ type: DISMISS_ERRORS });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
