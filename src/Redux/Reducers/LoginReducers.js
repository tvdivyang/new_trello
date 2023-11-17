import { FETCH_LANES, USER_LOGIN, USER_REGISTER } from "../Type";

const initialState = {
  registerData: {},
  loginData:{},
  fetchalllanes:{},
};
const register = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return { registerData: action.payload };
      case USER_LOGIN:
      return { loginData: action.payload };
      case FETCH_LANES:
      return { fetchalllanes: action.payload };
    default:
      return state;
  }
};

export default register;
