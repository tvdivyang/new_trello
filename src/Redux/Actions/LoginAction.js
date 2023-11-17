import axios from "axios";
import { USER_REGISTER,USER_LOGIN, FETCH_LANES } from "../Type";
const data = require("../../Data.json");
export const registerApi = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
        'https://reqres.in/api/register',
        data
      );
      if (res?.status === 200) {
        localStorage.setItem("token", res.data.token);
      }
    await dispatch({ type: USER_REGISTER, payload: res });
  } catch (error) {
    console.log("error", error);
  }
};

export const loginApi = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
        'https://reqres.in/api/login',
        data
      );
    if (res?.status === 200) {
      localStorage.setItem("token", res.data.token);
    }
    await dispatch({ type: USER_LOGIN, payload: res });
  } catch (error) {
    console.log("error", error);
  }
};

export const getalllanesdata = () => async (dispatch) => {
  try {
    const res = data
    await dispatch({ type: FETCH_LANES, payload: res });
  } catch (error) {
    console.log("error", error);
  }
};
