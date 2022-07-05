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
import { getList } from "../Redux/actions/listAction";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 550,
  },
});

const ExpandableTableRow = ({
  children,
  expandComponent,
  newExpanded,
  index,
  ...otherProps
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRowExpand = () => {
    setIsExpanded(false);

    setTimeout(() => {
      setIsExpanded(!isExpanded);
    }, 100);
  };

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={handleRowExpand}>
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
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.list);
  useEffect(() => {
    dispatch(getList("dashboard_service/api/getInProgressProcessList"));
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
          {data &&
            data.map((item, i) => (
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
