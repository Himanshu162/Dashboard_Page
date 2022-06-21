import { Grid } from "@mui/material";
import React from "react";
import "./Assets/CSS/ProgressPage.css";
import Cookies from "js-cookie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
];

const ProgressPage = () => {
  let id = Cookies.get("id");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Grid container className="progressPage_container">
      <Grid className="grid" xs={6} item>
        <h1 className="candidate_heading">Candidate Status</h1>
        <h3 className="personal">Personal id: {id}</h3>

        <Slider {...settings}>
          {steps.map((label, i) => (
            <div className="progressbar">
              <div className="Progress-step">
                <p className="progressCount">{i + 1}</p>
                <p className="progressText">{label}</p>
              </div>
            </div>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
};

export default ProgressPage;
