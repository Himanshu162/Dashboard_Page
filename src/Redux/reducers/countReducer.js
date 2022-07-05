import { COUNT_TYPE } from "../actions/countAction";

const initialState = {
  count: null,
};

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_TYPE.GET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default countReducer;
