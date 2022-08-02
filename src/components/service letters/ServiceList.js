import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  IconButton,
  Typography,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import "../../Assets/CSS/List.css";
import data from "../../data.json";
import TreeGraphStatus from "./TreeGraphStatus";

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

const ServiceList = () => {
  const classes = useStyles();
  return (
    <Paper
      className="filter_list"
      style={{ marginTop: "6rem", boxShadow: "none" }}
    >
      <Typography variant="h4" className="heading_list">
        Service Letter Status
      </Typography>
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
            <TableCell align="center" className="table_row">
              Action
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
                    <TreeGraphStatus  />
                  </TableCell>
                }
              >
                <TableCell align="center" className="table_col">
                  {item.id}
                </TableCell>
                <TableCell align="center" className="table_col">
                  {item.time}
                </TableCell>
                <TableCell align="center" className="table_col">
                  {item.status === 1 ? "In progress" : "completed"}
                </TableCell>
                <TableCell align="center" className="table_col">
                  {item.value === 0 ? (
                    <ThumbUpIcon style={{ color: "#009900" }} />
                  ) : (
                    <ThumbDownIcon style={{ color: "rgb(230, 81, 71)" }} />
                  )}
                </TableCell>
              </ExpandableTableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ServiceList;
