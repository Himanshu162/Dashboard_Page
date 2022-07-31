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

const StepForm = () => {
  // Donought Chart
  const personal = {
    labels: ["completed", "inProgress"],
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["#FAD02C", "#6666ff"],
        hoverOffset: 4,
      },
    ],
  };
  const Letters = {
    labels: ["completed", "inProgress"],
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["#FAD02C", "#6666ff"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    rotation: -28.5 * Math.PI - (25 / 180) * Math.PI,
    onClick: function (evt, element) {
      if (element.length > 0) {
        console.log(element, element[0].index);
        if (element[0].index === 0) {
          routeChange("inProgress")
        }else if(element[0].index === 1){
          routeChange("completed")
        }
      }
    },
  };

  // Redux
  const { count } = useSelector((state) => state.count);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCount("dashboard_service/api/getProcessCount"));
  }, []);
  console.log("this is count data", count);
  let navigate = useNavigate();

  const routeChange = (val) => {
    let path = "/list";
    Cookies.set("status", val);
    navigate(path);
  };

  const serviceRoute = (val) => {
    let path = "/serviceList";
    navigate(path);
  };

  useEffect(() => {
    Cookies.remove("status");
  });
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
                data={personal}
                options={options}
                style={{
                  height: "250px",
                  width: "250px",
                  cursor: "pointer",
                }}
              />
              <h3 className="text_content">Personal Application</h3>
            </div>
            <div className="main_div">
              <Doughnut
                data={Letters}
                options={options}
                style={{ height: "250px", width: "250px", cursor: "pointer" }}
                onClick={() => serviceRoute("/serviceList")}
              />
              <h3 className="text_content">Service Letters</h3>
            </div>
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default StepForm;
