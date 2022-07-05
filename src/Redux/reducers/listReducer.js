
import { LIST_TYPE } from "../actions/listAction";

const initialState = {
  data: [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TYPE.GET_LIST:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
