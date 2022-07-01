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
import { useDispatch } from "react-redux";
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
  // const userList = useSelector((state) => state.listData.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData(data));
  }, [dispatch]);

  const [listData, setListData] = useState(null);

  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFUFU5M09fbk1VOEZzUERoVFV5RWJyVUtXMm5GLWVxX3FyLU00V1U0LWRrIn0.eyJleHAiOjE2NTY2ODM0NDUsImlhdCI6MTY1NjY0NzU0MSwiYXV0aF90aW1lIjoxNjU2NjQ3NDQ1LCJqdGkiOiJjMTc4M2FmNy01ODRkLTQ2Y2UtOWFlZC0xNDgxMjU1NDZkZjkiLCJpc3MiOiJodHRwOi8vMTEuMC4wLjExODo4MTgwL2F1dGgvcmVhbG1zL3NhbXBsZSIsImF1ZCI6WyJjb3N0YV9jbG91ZF8xMDkiLCJjb3N0YV9taW5pbyIsImNvc3RhX2Nsb3VkX2dhdGV3YXkiLCJjb3N0YV9jbG91ZF8xMTgiLCJjb3N0YV9taW5pb18xNTkiLCJhY2NvdW50Il0sInN1YiI6ImE0MmE5OTliLWI2NzEtNDQ3ZS1iMmM3LWZiNjdkODA1YzZiYiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNvc3RhX2Nsb3VkIiwibm9uY2UiOiJkMWU2OGJjMy1iYzM3LTRjNzUtYmRhNi05Y2M3ZTAyNTNjNTQiLCJzZXNzaW9uX3N0YXRlIjoiZDNlZDAwMmYtM2VlOC00ZDUxLWJkNmUtYTYzZmQxODFiMWQyIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiY29zdGFfY2xvdWRfMTA5Ijp7InJvbGVzIjpbIjl3Zy5jYWQudXNlcjEiXX0sImNvc3RhX2Nsb3VkIjp7InJvbGVzIjpbIjl3Zy5jYWQudXNlcjEiXX0sImNvc3RhX21pbmlvIjp7InJvbGVzIjpbIjl3Zy5jYWQudXNlcjEiXX0sImNvc3RhX2Nsb3VkX2dhdGV3YXkiOnsicm9sZXMiOlsiOXdnLmNhZC51c2VyMSJdfSwiY29zdGFfY2xvdWRfMTE4Ijp7InJvbGVzIjpbIjl3Zy5jYWQudXNlcjEiXX0sImNvc3RhX21pbmlvXzE1OSI6eyJyb2xlcyI6WyI5d2cuY2FkLnVzZXIxIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUgb3BlbmlkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJyb2xlIjpbIjl3Zy5jYWQudXNlcjEiXSwiZ3JwIjpbIjl3Z2NhZCJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuZXc0IiwidXNlcm5hbWUiOiJuZXc0IiwicG9saWN5IjoicmVhZHdyaXRlLCBkaWFnbm9zdGljcywgY29uc29sZUFkbWluIn0.u5TuYKX_-vXg6tD9OZdsi9kJWNGWWRV6Rq_5aF6YZbbl84zGfvu6YeWmpFIKaDjQ-910w12wAA5eMwXJQiE41g_21yMwpUaY8SudI3c1oiVrS6EvhgToog0GkXywUyVGlsonkfcwdjsjKjY3HOt--5SKRLTdNcLTv6ROps2WZ1-Gj6WxWDkN_USv1J67KStlPCAZ-9-xO4262ZZsITTQ5BXyvLEx5pRK_20mZOxnIGKVwlE9OmXXPottvmHojwreoijTMfTLJWerUU8xS_HbYhTnDmKGTcgYZcWnVf6aGtiTVlzK-nboDrJJ6Eq4Witvqp9FWP7_LRykwQMYuGOy0g",
    },
  };

  useEffect(() => {
    axios
      .get("/dashboard_service/api/getInProgressProcessList",config)
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
                    <ProgressPage id={item.id} />
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
                  In progress
                </TableCell>
              </ExpandableTableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default List;
