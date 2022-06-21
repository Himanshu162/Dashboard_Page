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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import "./Assets/CSS/List.css";

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});

function createData(name, calories, fat, carbs, protein, detail) {
  return { name, calories, fat, carbs, protein, detail };
}

const rows = [
  createData(
    'Frozen yoghurt',
    159,
    6.0,
    24,
    4.0,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  ),
  createData(
    'Ice cream sandwich',
    237,
    9.0,
    37,
    4.3,
    'Maecenas rutrum urna vel lacus viverra, id ultrices dui rutrum'
  ),
  createData(
    'Eclair',
    262,
    16.0,
    24,
    6.0,
    'Morbi congue gravida nunc, eu cursus felis vulputate id'
  ),
  createData(
    'Cupcake',
    305,
    3.7,
    67,
    4.3,
    'Vestibulum efficitur, ipsum consectetur finibus maximus, ligula dolor vehicula ex, sed viverra nulla mauris id purus'
  ),
  createData(
    'Gingerbread',
    356,
    16.0,
    49,
    3.9,
    ' Suspendisse vehicula eu libero eget viverra'
  )
];

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {/* {isExpanded ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} */}
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

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <ExpandableTableRow
              key={row.name}
              expandComponent={<TableCell colSpan="5">{row.detail}</TableCell>}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
