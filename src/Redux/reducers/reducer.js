import { GET_USER_DATA } from "../../constant";
const initialState = {
  userData: [],
};

export default function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}
