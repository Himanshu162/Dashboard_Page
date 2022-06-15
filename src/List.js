import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import "./Assets/CSS/List.css";
import data from "././data.json";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const List = () => {
  let navigate = useNavigate();
  const goToProgressPage = (data) => {
    Cookies.set("id", data.id);
    let path = "/progress/";
    navigate(path);
  };
  return (
    <div className="list_container">
      <h1 className="heading_list">Running Process List</h1>
      <TableContainer
        style={{ maxWidth: "100%", justifyContent: "space-around" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Personal Id</TableCell>
              <TableCell className="tableCell">Time</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data, id) => {
              return (
                <TableRow>
                  <TableCell
                    className="tableCell_"
                    onClick={() => goToProgressPage(data)}
                    style={{ cursor: "pointer" }}
                  >
                    {id + 1}
                  </TableCell>
                  <TableCell className="tableCell_">{data.time}</TableCell>
                  <TableCell className="tableCell_">{data.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
