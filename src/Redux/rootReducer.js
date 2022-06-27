import { combineReducers } from "redux";
import userDataReducer from "./reducers/reducer";

export default combineReducers({
  listData:userDataReducer,
});
