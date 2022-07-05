import { PROGRESS_TYPE } from "../actions/progressPageAction";

const initialState = {
  stepper:null,
};

const progressPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROGRESS_TYPE.GET_PROGRESSDATA:
      return {
        ...state,
        stepper: action.payload,
      };
    default:
      return state;
  }
};

export default progressPageReducer;
