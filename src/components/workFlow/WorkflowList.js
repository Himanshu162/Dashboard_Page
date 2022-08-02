import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@material-ui/core";
import "../../Assets/CSS/List.css";
import { useDispatch, useSelector } from "react-redux";
import { getWorkflowData } from "../../Redux/actions/workFlowAction";

const WorkflowList = () => {
  const { workflow } = useSelector((state) => state.workflow);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkflowData("/workflowPA/getWorkflowData"));
  }, []);
  console.log("this is work flow data", workflow);


  return (
    <Paper
    className="filter_list"
    style={{ marginTop: "6rem", boxShadow: "none" }}>
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
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" className="table_row">
              Workflow Id
            </TableCell>
            <TableCell align="center" className="table_row">
              Action Name
            </TableCell>
            <TableCell align="center" className="table_row">
              Performer
            </TableCell>
            <TableCell align="center" className="table_row">
              Proess Name
            </TableCell>
            <TableCell align="center" className="table_row">
              Date
            </TableCell>
            <TableCell align="center" className="table_row">
              Workflow State
            </TableCell>
          </TableRow>
        </TableHead>
        {workflow &&
          workflow.map((item, i) => (
            <TableBody key={i}>
              <TableCell align="center" className="table_col">
                {item.wf_id}
              </TableCell>
              <TableCell align="center" className="table_col">
                {item.act_name}
              </TableCell>
              <TableCell align="center" className="table_col">
                {item.performer}
              </TableCell>
              <TableCell align="center" className="table_col">
                {item.proc_name}
              </TableCell>
              <TableCell align="center" className="table_col">
                {item.date}
              </TableCell>
              <TableCell align="center" className="table_col">
                {item.wf_state === 3 ? "Stuck" : "Users Inbox"}
              </TableCell>
            </TableBody>
          ))}
      </Table>
    </Paper>
  );
};

export default WorkflowList;
