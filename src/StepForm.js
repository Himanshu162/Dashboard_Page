import React from "react";
import "./Assets/CSS/StepForm.css";
import { Card, Grid, Divider } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Mockdata from "./data.json";

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

const data = {
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
  console.log("this is data", Mockdata.length)
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/list";
    navigate(path);
  };
  

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
              <div>{Mockdata.length}</div>
              <Doughnut
                data={data}
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
