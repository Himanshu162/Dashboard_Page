import React, { useEffect } from "react";
import "../Assets/CSS/StepForm.css";
import { Card, Grid, Divider } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/actions/action";
import data from "../data.json";

import {
  Chart,
  PieController,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";

Chart.register(PieController, ArcElement, Title, Legend, Tooltip);
const options = {
  rotation: -28.5 * Math.PI - (25 / 180) * Math.PI,
};

const data_1 = {
  datasets: [
    {
      data: [100],
      backgroundColor: ["rgb(54, 162, 235)"],
      hoverOffset: 4,
    },
  ],
};

const data1 = {
  datasets: [
    {
      data: [100],
      backgroundColor: ["green"],
      hoverOffset: 4,
    },
  ],
};

const StepForm = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/list";
    navigate(path);
  };

  const stepformdata = useSelector((state) => state.listData.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData(data));
  }, [dispatch]);

  return (
    <div className="stepform_container">
      <Grid xs={6} item>
        <Card className="card">
          <div className="heading">
            <h1>Current Status</h1>
          </div>
          <Divider style={{ marginBottom: "20px" }} />
          <div className="icons">
            <div className="main_div">
              <div>{stepformdata.length}</div>
              <Doughnut
                data={data_1}
                options={options}
                style={{ height: "230px", width: "230px", cursor: "pointer" }}
                onClick={routeChange}
              />

              <h3 className="text_content">Runnig Process</h3>
            </div>
            <div className="main_div">
              <div>1</div>
              <Doughnut
                data={data1}
                options={options}
                style={{ height: "230px", width: "230px" }}
              />
              <h3 className="text_content">Completed Process</h3>
            </div>
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default StepForm;
