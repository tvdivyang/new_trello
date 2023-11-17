import { combineReducers } from "redux";
import register from "./LoginReducers";

const rootReducer = combineReducers({
  register,
});

export default rootReducer;