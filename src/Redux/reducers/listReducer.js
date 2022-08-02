import { LIST_TYPE } from "../actions/listAction";
import { PROGRESS_TYPE } from "../actions/progressPageAction";

const initialState = {
  data: [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TYPE.GET_LIST:
      return {
        ...state,
        data: action.payload.map((item) => {
          return { ...item, steps: [] };
        }),
      };
    case PROGRESS_TYPE.GET_PROGRESSDATA:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              steps: action.payload.data.sort((a, b) => {
                return a.step - b.step;
              }),
            };
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};

export default listReducer;
