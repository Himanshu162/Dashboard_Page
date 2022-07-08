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
    dispatch(getProgressData(`dashboard_service/api/getData/${id}`, id));
    console.log(id, "this is id");
  }, []);

  return (
    <Grid container className="progressPage_container">
      <Grid className="grid" xs={12} item>
        <h3 className="personal">Personal id: {id}</h3>

        <div className="progressbar">
          {stepper &&
            stepper.map((item, i) => (
              <div className="Progress-step">
                <p className="progressText">{item.message}</p>

                <div className="Progress_div">
                  <p
                    className="progressCount"
                    style={{
                      backgroundColor: item.message.includes("signed")
                        ? "#6666ff"
                        : item.message.includes("created")
                        ? "#6666ff"
                        : item.message.includes("sent")
                        ? "#6666ff"
                        : item.message.includes("Approved")
                        ? "#009900"
                        : item.message.includes("forwered")
                        ? "#6666ff"
                        : item.message.includes("Rejected")
                        ? "rgb(230, 81, 71"
                        : "#fff",
                      color: "#fff",
                    }}
                  >
                    {i + 1}
                  </p>

                  {(i + 1) % 5 !== 0 && i + 1 !== stepper.length && (
                    <div
                      style={{
                        backgroundColor: item.message.includes("signed")
                          ? "#6666ff"
                          : item.message.includes("signed")
                          ? "#6666ff"
                          : item.message.includes("sent")
                          ? "#6666ff"
                          : item.message.includes("Approved")
                          ? "#009900"
                          : item.message.includes("created")
                          ? "#6666ff"
                          : item.message.includes("forwered")
                          ? "#6666ff"
                          : item.message.includes("Rejected")
                          ? "rgb(230, 81, 71)"
                          : "#fff",
                      }}
                    ></div>
                  )}
                </div>
                <p className="progressTime">{item.date}</p>
              </div>
            ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgressPage;
