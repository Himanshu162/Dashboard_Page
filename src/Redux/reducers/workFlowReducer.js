import { WORKFLOW_TYPE } from "../actions/workFlowAction";

const initialState = {
  workflow:[],
};

const workflowReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKFLOW_TYPE.GET_WORKFLOWDATA:
      return {
        ...state,
        workflow: action.payload,
      };
    default:
      return state;
  }
};

export default workflowReducer;