import { getDataApi } from "../../utils/fetchData";
import { GLOBAL_TYPE } from "./globalType";

export const COUNT_TYPE = {
  GET_COUNT: "GET_COUNT",
};

export const getCount = (url) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: true } });
    const { data } = await getDataApi(url);
    dispatch({ type: COUNT_TYPE.GET_COUNT, payload: data });
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: false } });
  } catch (error) {
    console.log(error)
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: {error: error.response.data.msg} });
  }
};
