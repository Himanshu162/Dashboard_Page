import React, { useEffect } from "react";
import {
  Typography,
  Paper,
} from "@material-ui/core";
import "../../Assets/CSS/List.css";
import { useDispatch, useSelector } from "react-redux";
import { getWorkflowData } from "../../Redux/actions/workFlowAction";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Filter,
  Inject,
  Sort,
  Resize,
  Page,
} from "@syncfusion/ej2-react-grids";

const WorkflowList = () => {
  const { workflow } = useSelector((state) => state.workflow);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkflowData("/workflowPA/getWorkflowData"));
  }, []);
  console.log("this is work flow data", workflow);

  const editTamplate = (arg) => {
    console.log(arg);
    return (
      <>
        <p>{arg.wf_state===3?"stuck":"User Inbox"}</p>
      </>
    );
  };
  return (
    <Paper
      className="filter_list"
      style={{ marginTop: "6rem", boxShadow: "none" }}
    >
      <Typography
        variant="h4"
        style={{
          marginTop: "1rem",
          textAlign: "center",
          justifyContent: "space-around",
          marginBottom: "2rem",
        }}
      >
        Work Flow List Table
      </Typography>
      <GridComponent
        dataSource={workflow}
        height="700"
        allowResizing={true}
        allowSorting={true}
        allowPaging={true}
        pageSettings={{ pageCount: 5, pageSizes: true }}
        allowFiltering={true}
        filterSettings={{ type: "Menu" }}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="wf_id"
            headerText="Work Flow Id"
            width="4rem"
          />
          <ColumnDirective
            field="act_name"
            headerText="Action Name"
            width="3rem"
          />
          <ColumnDirective
            field="performer"
            headerText="Performer"
            width="3rem"
          />
          <ColumnDirective
            field="proc_name"
            headerText="Process Name"
            width="4rem"
          />
          <ColumnDirective
            field="date"
            headerText="Date"
            width="3rem"
          />
          <ColumnDirective
            field="wf_state"
            headerText=" Workflow State"
            width="3rem"
            template={editTamplate}
          />
        </ColumnsDirective>
          <Inject services={[Resize, Sort, Filter, Page]} />
      </GridComponent>
    </Paper>
  );
};

export default WorkflowList;
