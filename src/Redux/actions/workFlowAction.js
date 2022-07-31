import { getDataApi } from "../../utils/fetchData";
import { GLOBAL_TYPE } from "./globalType";

export const WORKFLOW_TYPE = {
    GET_WORKFLOWDATA: "GET_WORKFLOWDATA",
};


export const getWorkflowData = (url) => async (dispatch) => {
    try {
      dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: true } });
      const {data}= await getDataApi(url);
      dispatch({ type: WORKFLOW_TYPE.GET_WORKFLOWDATA, payload: data.dtoList });
      dispatch({ type: GLOBAL_TYPE.ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: GLOBAL_TYPE.ALERT, payload: {error: error.response} });
    }
  };