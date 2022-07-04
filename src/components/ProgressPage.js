import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Assets/CSS/ProgressPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const ProgressPage = ({ id }) => {
  const [progressData, setProgressData] = useState();
  let data = sessionStorage.getItem("jwt_token");
  const config = {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  };
  useEffect(() => {
    axios
      .get(`/dashboard_service/api/getData/${id}}`, config)
      .then((response) => {
        setProgressData(response.data.data);
      });
  }, []);
  console.log("this is progressData", progressData);

  return (
    <Grid container className="progressPage_container">
      <Grid className="grid" xs={12} item>
        <h3 className="personal">Personal id: {id}</h3>

        <div className="progressbar">
          {progressData &&
            progressData.map((item, i) => (
              <div className="Progress-step" key={i}>
                <p className="progressText">{item.message}</p>
                <div className="Progress_div">
                  <p className="progressCount">{i + 1}</p>

                  {(i + 1) % 10 !== 0 && i + 1 !== progressData.length && (
                    <div></div>
                  )}
                </div>
                <p className="progressText">{item.date}</p>
              </div>
            ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgressPage;
