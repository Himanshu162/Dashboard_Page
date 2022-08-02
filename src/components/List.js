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
  Chip,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FilterListIcon from "@material-ui/icons/FilterList";
import ProgressPage from "./ProgressPage";
import "../Assets/CSS/List.css";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../Redux/actions/listAction";
import Cookies from "js-cookie";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@mui/material";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.list);
  let status = Cookies.get("status");
  const [value, setValue] = useState("subject");

  const [state, setState] = useState({
    subject: "",
    dateFrom: "20-jul-2022 10:00",
    dateTo: "02-aug-2022 10:00",
    fileNo: "",
    sendFrom: "",
    sendTo: "",
  });

  const [chip, setChip] = useState(["subject"]);
  const handleDelete = (chipToDelete) => {
    setChip((chip) => chip.filter((chips) => chips !== chipToDelete));
  };

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
        {filterType.map((option) => (
          <div className="chip">
            {chip.map((chips) =>
              value === "subject" ? (
                <Chip
                  key={chips}
                  label={option.value}
                  onDelete={() => handleDelete(chips)}
                  onChange={handleInputChange}
                  size="small"
                  name="subject"
                  value={subject}
                  style={{
                    marginLeft: ".5rem",
                    marginTop: ".5rem",
                    boxShadow: "none",
                    position: "relative",
                  }}
                />
              ) : value === "fileNO" ? (
                <Chip
                  key={chips}
                  label={option.value}
                  onDelete={() => handleDelete(chips)}
                  onChange={handleInputChange}
                  size="small"
                  name="fileNO"
                  value={fileNo}
                  style={{
                    marginLeft: ".5rem",
                    marginTop: ".5rem",
                    boxShadow: "none",
                    position: "relative",
                  }}
                />
              ) : value==="dateFrom" (
                <Chip
                  key={chips}
                  label={option.value}
                  onDelete={() => handleDelete(chips)}
                  onChange={handleInputChange}
                  size="small"
                  name="dateFrom"
                  value={dateFrom}
                  style={{
                    marginLeft: ".5rem",
                    marginTop: ".5rem",
                    boxShadow: "none",
                    position: "relative",
                  }}
                />
              )
            )}
          </div>
        ))}
        <Dialog
          open={filtertopen}
          onClose={handleClose}
          width="fillwidth"
          style={{ display: "flex", left: "-1.5rem", top: "-2rem" }}
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
              startIcon={<AddCircleOutlineIcon />}
              type="submit"
            >
              Add Filter
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
                  {item.status === 2 ? (
                    <ThumbDownIcon style={{ color: "rgb(230, 81, 71)" }} />
                  ) : (
                    <ThumbUpIcon style={{ color: "#009900" }} />
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
