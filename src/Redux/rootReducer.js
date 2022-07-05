import { combineReducers } from "redux";
import count from "./reducers/countReducer";
import list from "./reducers/listReducer";
import alert from "./reducers/alertReducer";
import progressPage from "./reducers/progressPageReducer";

export default combineReducers({
  alert,
  count,
  list,
  progressPage,
});
