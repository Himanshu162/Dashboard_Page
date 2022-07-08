import React, { useEffect } from "react";
import "../Assets/CSS/StepForm.css";
import { Card, Grid, Divider } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Chart,
  PieController,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import { getCount } from "../Redux/actions/countAction";
import Cookies from "js-cookie";

Chart.register(PieController, ArcElement, Title, Legend, Tooltip);
const options = {
  rotation: -28.5 * Math.PI - (25 / 180) * Math.PI,
};

const data_1 = {
  datasets: [
    {
      data: [100],
      backgroundColor: ["#6666ff"],
      hoverOffset: 4,
    },
  ],
};

const data_2 = {
  datasets: [
    {
      data: [100],
      backgroundColor: ["#009900"],
      hoverOffset: 4,
    },
  ],
};

const StepForm = () => {
  const { count } = useSelector((state) => state.count);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCount("dashboard_service/api/getProcessCount"));
  }, []);

  let navigate = useNavigate();

  const routeChange = (val) => {
    let path = "/list";
    
    Cookies.set("status", val)
    navigate(path);
  };

  useEffect(()=>{
    Cookies.remove("status")
  })
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
              <div>{count && count.inProgress}</div>

              <Doughnut
                data={data_1}
                options={options}
                style={{
                  height: "230px",
                  width: "230px",
                  cursor: "pointer",
                }}
                onClick={() => routeChange("inProgress")}
              />
              <h3 className="text_content">In Process</h3>
            </div>
            <div className="main_div">
              <div>{count && count.completed}</div>
              <Doughnut
                data={data_2}
                options={options}
                style={{ height: "230px", width: "230px", cursor: "pointer" }}
                onClick={() => routeChange("completed")}
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
