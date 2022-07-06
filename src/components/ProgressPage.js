import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import "../Assets/CSS/ProgressPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { getProgressData } from "../Redux/actions/progressPageAction";

const ProgressPage = ({ id, stepper }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProgressData(`dashboard_service/api/getData/${id}}`, id));
  }, []);

  return (
    <Grid container className="progressPage_container">
      <Grid className="grid" xs={12} item>
        <h3 className="personal">Personal id: {id}</h3>

        <div className="progressbar">
          {stepper && stepper.map((item, i) => (
            <div className="Progress-step">
              <p className="progressText">{item.message}</p>
              <div className="Progress_div">
                <p className={`progressCount ${""}`}>{i + 1}</p>

                {(i + 1) % 5 !== 0 && i + 1 !== stepper.length && (
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
