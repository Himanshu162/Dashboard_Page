import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ProgressPage from "./ProgressPage";
import "../Assets/CSS/List.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/actions/action";
import data from "../data.json";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 550,
  },
});

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

const List = () => {
  const classes = useStyles();
  const userList = useSelector((state) => state.listData.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData(data));
  }, [dispatch]);

  const [listData, setListData] = useState(null);

  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFUFU5M09fbk1VOEZzUERoVFV5RWJyVUtXMm5GLWVxX3FyLU00V1U0LWRrIn0.eyJleHAiOjE2NTY2MjIwMzUsImlhdCI6MTY1NjU4NjY2NywiYXV0aF90aW1lIjoxNjU2NTg2MDM1LCJqdGkiOiI0ZTEzZjdkNy1iYjY1LTRkOTQtODY0OC02ZDczZjI2ZmFhOTYiLCJpc3MiOiJodHRwOi8vMTEuMC4wLjExODo4MTgwL2F1dGgvcmVhbG1zL3NhbXBsZSIsImF1ZCI6WyJjb3N0YV9jbG91ZF8xMDkiLCJyZWFsbS1tYW5hZ2VtZW50IiwiY29zdGFfbWluaW8iLCJjb3N0YV9jbG91ZF9kaXNjb3ZlcnkiLCJjb3N0YV9jbG91ZF8xMTgiLCJjb3N0YV9jbG91ZF9nYXRld2F5IiwiY29zdGFfY2xvdWRfY29uZmlnIiwiY29zdGFfbWluaW9fMTU5IiwiYWNjb3VudCJdLCJzdWIiOiIyMTMzMDJiOC04ZTI3LTQ0MTAtYWI4My02N2NhNDVhNDc3ZmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjb3N0YV9jbG91ZCIsIm5vbmNlIjoiMDc2MDYxYjQtNTIyOC00ZjA3LWI3NzgtMmY5MDRmM2ZmNTRmIiwic2Vzc2lvbl9zdGF0ZSI6Ijg2MjE5NGMyLWZiMWYtNGIyOS1iZTVhLTkwNWM3OWU4ZWVmOSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImNvc3RhX2Nsb3VkXzEwOSI6eyJyb2xlcyI6WyJyb2xlMiJdfSwicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJjb3N0YV9taW5pbyI6eyJyb2xlcyI6WyJyb2xlMiJdfSwiY29zdGFfY2xvdWQiOnsicm9sZXMiOlsicm9sZTIiXX0sImNvc3RhX2Nsb3VkX2Rpc2NvdmVyeSI6eyJyb2xlcyI6WyJyb2xlMiJdfSwiY29zdGFfY2xvdWRfMTE4Ijp7InJvbGVzIjpbInJvbGUyIl19LCJjb3N0YV9jbG91ZF9nYXRld2F5Ijp7InJvbGVzIjpbInJvbGUyIl19LCJjb3N0YV9jbG91ZF9jb25maWciOnsicm9sZXMiOlsicm9sZTIiXX0sImNvc3RhX21pbmlvXzE1OSI6eyJyb2xlcyI6WyJyb2xlMiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIG9wZW5pZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZSI6WyJyb2xlMiJdLCJncnAiOlsiN3dnaHJjIl0sInByZWZlcnJlZF91c2VybmFtZSI6Im5ldzIiLCJ1c2VybmFtZSI6Im5ldzIiLCJwb2xpY3kiOiJyZWFkd3JpdGUsIGRpYWdub3N0aWNzLCBjb25zb2xlQWRtaW4ifQ.Mcrz-hFEbedeb9GSlkY5_m-lkQTJg6fkOEXYjyHKd0WEaJYz_Qrfa9g9xQc4wMr2YVUr4EhMuapZf345CVRIbV97iv71m4lrEB0fVWvt_kkBbhMmzH0Uvg7kAT4PZlZL-T9DKD0hTNUhrOu-Arh1TVMLk4jMwfBCSeRDyJr5tjZ16-7-1eYNGJw46rJMGSKpxdIOZaCtGF-14-6dHlCwb2wCJ5TaOxPy5ILG5y7bfmtZNCvjqAj5YDU97r_qnP84XuESB7euUfo3Cn_AT4FuvnshPEffn0TRXvH_sH2lZMhua8urJKXxn5sHG117Ia0tdmAv09zlQH4k3BQgqdqJAg",
    },
  };

  useEffect(() => {
    axios
      .get("/dashboard_service/api/getInProgressProcessList", config)
      .then((response) => {
        setListData(response.data.data);
        console.log("this is List data", response.data);
      });
  }, []);


  return (
    <Paper
      className={classes.root}
      style={{ marginTop: "50px", boxShadow: "none" }}
    >
      <h1 className="heading_list">Candidate Status</h1>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center" className="table_row">
              Id
            </TableCell>
            <TableCell align="center" className="table_row">
              Time
            </TableCell>
            <TableCell align="center" className="table_row">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listData &&
            listData.map((item, i) => (
              <ExpandableTableRow
                key={i}
                expandComponent={
                  <TableCell colSpan="5">
                    <ProgressPage id={i + 1} />
                  </TableCell>
                }
              >
                <TableCell align="center" className="table_col">
                  {item.id}
                </TableCell>
                <TableCell align="center" className="table_col">
                  {item.date}
                </TableCell>
                <TableCell align="center" className="table_col">
                  {item.status}
                </TableCell>
              </ExpandableTableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default List;
