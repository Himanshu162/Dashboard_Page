import { Grid } from "@mui/material";
import React from "react";
import "./Assets/CSS/ProgressPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const steps = [
  "created",
  "sent",
  "approved",
  "pending",
  "reject",
  "process",
  "signing",
  "approved",
  "created",
  "sent",
  "approved",
  "pending",
  "reject",
  "process",
  "signing",
  "approved",
  "created",
  "sent",
  "approved",
  "pending",
  "reject",
  "process",
  "signing",
  "approved",
  "reject",
  "sent",
  "approved",
  "pending",
  "reject",
  "process",
];

const ProgressPage = ({ id }) => {
  return (
    <Grid container className="progressPage_container">
      <Grid className="grid" xs={12} item>
        <h3 className="personal">Personal id: {id}</h3>

        <div className="progressbar">
          {steps.map((label, i) => (
            <div className="Progress-step">
              <div className="Progress_div">
                <p className="progressCount">{i + 1}</p>
                {(i + 1) % 10 !== 0 && (i + 1) !== steps.length && <div></div>}
              </div>
              <p className="progressText">{label}</p>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgressPage;
