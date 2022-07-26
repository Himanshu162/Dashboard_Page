import { getDataApi } from "../../utils/fetchData";
import { GLOBAL_TYPE } from "./globalType";

export const LIST_TYPE = {
  GET_LIST: "GET_LIST",
};

export const getList = (
  url,state
) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: true } });
    const { data } = await getDataApi(url, state);
    dispatch({ type: LIST_TYPE.GET_LIST, payload: data.data });
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: GLOBAL_TYPE.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
