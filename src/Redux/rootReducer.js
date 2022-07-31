import { combineReducers } from "redux";
import count from "./reducers/countReducer";
import list from "./reducers/listReducer";
import alert from "./reducers/alertReducer";
import workflow from "./reducers/workFlowReducer";

export default combineReducers({
  alert,
  count,
  list,
  workflow,
});
