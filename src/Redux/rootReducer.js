import { combineReducers } from "redux";
import count from "./reducers/countReducer";
import list from "./reducers/listReducer";
import alert from "./reducers/alertReducer";

export default combineReducers({
  alert,
  count,
  list,
});
