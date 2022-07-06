import { getDataApi } from "../../utils/fetchData";
import { GLOBAL_TYPE } from "./globalType";

export const PROGRESS_TYPE = {
    GET_PROGRESSDATA: "GET_PROGRESSDATA",
};

export const getProgressData = (url, id) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: true } });
    const {data} = await getDataApi(url);
    dispatch({ type: PROGRESS_TYPE.GET_PROGRESSDATA, payload: {data: data.data, id } });
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: GLOBAL_TYPE.ALERT, payload: {error: error.response} });
  }
};
