import React, { useState } from "react";
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
import data from "./data.json";
import ProgressPage from "./ProgressPage";
import "./Assets/CSS/List.css";

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

  return (
    <Paper className={classes.root} style={{marginTop:"50px", boxShadow:"none"}}>
      <h1 className="heading_list">Candidate Status</h1>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center" className= "table_row" >Id</TableCell>
            <TableCell align="center" className= "table_row" >Time</TableCell>
            <TableCell align="center" className= "table_row" >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data, index) => (
            <ExpandableTableRow
              key={index}
              expandComponent={
                <TableCell colSpan="5">
                  <ProgressPage id={index + 1} />
                </TableCell>
              }
            >
              <TableCell align="center"className= "table_col">{index + 1}</TableCell>
              <TableCell align="center"className= "table_col">{data.time}</TableCell>
              <TableCell align="center"className= "table_col">{data.status}</TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default List;
