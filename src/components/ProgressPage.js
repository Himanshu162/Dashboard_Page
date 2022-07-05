import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import "../Assets/CSS/ProgressPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getProgressData } from "../Redux/actions/progressPageAction";

const ProgressPage = ({ id }) => {
  const dispatch = useDispatch();
  const { stepper } = useSelector((state) => state.progressPage);
  useEffect(() => {
    dispatch(getProgressData(`dashboard_service/api/getData/${id}}`));
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
                <p className="progressCount">{i + 1}</p>

                {(i + 1) % 10 !== 0 && i + 1 !== stepper.length && (
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
