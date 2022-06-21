// import {
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import React, { useState } from "react";
// import "./Assets/CSS/List.css";
// import data from "././data.json";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// // import ProgressPage from "./ProgressPage";

// const List = () => {
//   let navigate = useNavigate();
//   const goToProgressPage = (data) => {
//     Cookies.set("id", data.id);
//     let path = "/progress/";
//     navigate(path);
//   };

//   const [isExpand, setExpand] = useState(false);

//   return (
//     <div className="list_container">
//       <h1 className="heading_list">Running Process List</h1>
//       <TableContainer
//         style={{ maxWidth: "100%", justifyContent: "space-around" }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell className="tableCell">Personal Id</TableCell>
//               <TableCell className="tableCell">Time</TableCell>
//               <TableCell className="tableCell">Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((data, id) => {
//               return (
//                 <TableRow onClick={() => setExpand(!isExpand)}>

//                   <TableCell
//                     className="tableCell_"
//                     // onClick={() => goToProgressPage(data)}
//                     style={{ cursor: "pointer" }}

//                   >
//                     {id + 1}
//                   </TableCell>
//                   <TableCell className="tableCell_">{data.time}</TableCell>
//                   <TableCell className="tableCell_">{data.status}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default List;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import data from "./data.json";
import ProgressPage from "./ProgressPage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
  const [isExpanded, setIsExpanded] = React.useState(false);

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
  let navigate = useNavigate();
  const goToProgressPage = (data) => {
    Cookies.set("id", data.id);
    let path = "/progress/";
    navigate(path);
  };
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <h1 className="heading_list">Candidate Status</h1>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data, id) => (
            <ExpandableTableRow
              expandComponent={
                <TableCell colSpan="5" onClick={() => goToProgressPage(data)}>
                  <ProgressPage />
                </TableCell>
              }
            >
              <TableCell align="center">{id + 1}</TableCell>
              <TableCell align="center">{data.time}</TableCell>
              <TableCell align="center">{data.status}</TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
export default List;