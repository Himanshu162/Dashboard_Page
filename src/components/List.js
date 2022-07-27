import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
  TextField,
  Grid,
  Dialog,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import ProgressPage from "./ProgressPage";
import "../Assets/CSS/List.css";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../Redux/actions/listAction";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

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
  const [filtertopen, setFilteropen] = useState(false);
  let navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.list);
  let status = Cookies.get("status");
  const [value, setValue] = useState("subject");

  const [state, setState] = useState({
    subject: "",
    dateFrom: "",
    dateTo: "",
    fileNo: "",
    sendFrom: "",
    sendTo: "",
  });
  const filterType = [
    {
      value: "subject",
      label: "Subject",
    },
    {
      value: "fileNO",
      label: "File Number",
    },
    {
      value: "date",
      label: "Date Range",
    },
    {
      value: "sendFrom",
      label: "Send From",
    },
    {
      value: "sendTo",
      label: "Send To",
    },
  ];

  useEffect(() => {
    loadTableData();
  }, []);

  const loadTableData = () => {
    if (status === "completed") {
      dispatch(getList("dashboard_service/api/getCompletedProcessList", state));
    } else if (status === "inProgress") {
      dispatch(
        getList("dashboard_service/api/getInProgressProcessList", state)
      );
    }
  };

  const HomePageNavigation = () => {
    let path = "/";
    navigate(path);
  };

  const handleClick = (event) => {
    setFilteropen(event.currentTarget);
  };

  const handleClose = () => {
    setFilteropen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadTableData();
  };

  const { subject, dateFrom, dateTo, fileNo, sendFrom, sendTo } = state;

  return (
    <Paper
      className="filter_list"
      style={{ marginTop: "6rem", boxShadow: "none" }}
    >
      <HomeOutlinedIcon
        style={{
          cursor: "pointer",
          marginLeft: "20px",
          top: "8rem",
          color: "gray",
        }}
        onClick={HomePageNavigation}
        className="homeIcon"
      />
      <Typography variant="h4" className="heading_list">
        Personal Application Status
      </Typography>
      <div className="filter_list">
        <Button
          style={{ float: "left", textTransform: "capitalize" }}
          color="primary"
          variant="contained"
          onClick={handleClick}
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
        <Dialog
          open={filtertopen}
          onClose={handleClose}
          width="fillwidth"
          style={{ display: "flex", left: "-1.5rem", top: ".8rem" }}
        >
          <TextField
            select
            label="Select Filter"
            variant="outlined"
            fullWidth
            value={value}
            onChange={handleChange}
            size="small"
            style={{ marginTop: "10px" }}
          >
            {filterType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "1rem" }}>
              {value === "subject" ? (
                <TextField
                  label="Enter Subject"
                  variant="outlined"
                  size="small"
                  name="subject"
                  value={subject}
                  fullWidth
                  onChange={handleInputChange}
                />
              ) : value === "fileNO" ? (
                <TextField
                  label="Enter File Number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="fileNo"
                  value={fileNo}
                  onChange={handleInputChange}
                />
              ) : value === "date" ? (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Date From"
                      type="date"
                      defaultValue={new Date()}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      variant="outlined"
                      size="small"
                      name="dateFrom"
                      value={dateFrom}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Date To"
                      type="date"
                      defaultValue={new Date()}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      variant="outlined"
                      size="small"
                      name="dateTo"
                      value={dateTo}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              ) : value === "sendFrom" ? (
                <TextField
                  label="By Username"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleInputChange}
                  name="sendFrom"
                  value={sendFrom}
                />
              ) : value === "sendTo" ? (
                <TextField
                  label="By Username"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="sendTo"
                  value={sendTo}
                  onChange={handleInputChange}
                />
              ) : (
                <></>
              )}
            </div>
            <Button
              color="primary"
              variant="contained"
              style={{
                float: "right",
                margin: "1rem 0",
                textTransform: "capitalize",
              }}
              startIcon={<SearchIcon />}
              type="submit"
            >
              Serach
            </Button>
          </form>
        </Dialog>
      </div>
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
                    <ProgressPage id={item.id} stepper={item.steps} />
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
                  {item.status === 0 ? "In progress" : "completed"}
                </TableCell>
                <TableCell align="center" className="table_col">
                  {item.status === 0 ? (
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
export default List;
