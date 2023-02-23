import axios from "axios";
import { setToast } from "../../components/Other/CheckProperty";
import { saveLocalData } from "../../utils/localStorage";
import * as types from "./actionType";

const BackendServer = process.env.REACT_APP_BACKEND_SERVER;
const register = (payload, toast) => (dispatch) => {
  dispatch({ type: types.REGISTER_R });
  return axios
    .post(`${BackendServer}signup`, payload)
    .then((r) => {
      return r;
      // setToast(toast, "Registered Successful", "success");
      // dispatch({ type: types.REGISTER_S, payload: r.data });
    })
    .catch((e) => {
      return e;
      // setToast(toast, e.response.data.message, "error");
      // dispatch({ type: types.REGISTER_F, payload: e });
    });
};

const login = (payload, toast) => (dispatch) => {
  saveLocalData("userInfo", payload.email,)
  dispatch({ type: types.LOGIN_R });
  return axios
    .post(`${BackendServer}login`, payload)
    .then((r) => {
      // saveLocalData("userName", r.data.name);


      // setToast(toast, "Login Successful", "success");
      return(r);
      // return dispatch({ type: types.LOGIN_S, payload: r.data.token, description: r.data.description });
    })
    .catch((e) => {
      // setToast(toast, e.response.data.message, "error");
      // dispatch({ type: types.LOGIN_F, payload: e });
      return(e);
    });
};

const profile = (payload) => (dispatch) => {
  dispatch({ type: types.PROFILE_R });
  const options = {
    method: "GET",
    url: `https://naresh-auth-user.onrender.com/auth/${payload.email}`,
    headers: { Authorization: `Bearer ${payload.token}` },
  };
  return axios(options)
    .then((r) => {
      dispatch({
        type: types.PROFILE_S,
        payload: r.data,
      });
    })
    .catch((e) => dispatch({ type: types.PROFILE_F, payload: e }));
};

export { login, register, profile };

