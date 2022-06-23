import { Grid } from "@mui/material";
import React from "react";
import "./Assets/CSS/ProgressPage.css";
import Cookies from "js-cookie";
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
  "signing",
  "approved",
];

const ProgressPage = () => {
  let id = Cookies.get("id");

  return (
    <Grid container className="progressPage_container">
      <Grid className="grid" xs={12} item>
        <h3 className="personal">Personal id: {id}</h3>

        {steps.map((label, i) => (
          <div className="progressbar">
            <div className="Progress-step">
              <p className="progressCount">{i + 1}</p>
              <p className="progressText">{label}</p>
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default ProgressPage;
