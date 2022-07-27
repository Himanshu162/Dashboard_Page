import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import "../Assets/CSS/ProgressPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { getProgressData } from "../Redux/actions/progressPageAction";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

const ProgressPage = ({ id, stepper }) => {
  let j = 0;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProgressData(`dashboard_service/api/getData/${id}`, id));
    setInterval(() => {
      dispatch(getProgressData(`dashboard_service/api/getData/${id}`, id));
    }, 10000);
  }, []);
  return (
    <Grid container className="progressPage_container">
      <Grid className="grid" xs={12} item>
        <h3 className="personal">Personal id: {id}</h3>

        <div className="progressbar">
          {stepper &&
            stepper.map((item, i) => (
              <div className="Progress-step" key={i}>
                <p className="progressText" >{item.message}</p>
                <div className="Progress_div">
                  <p
                    className="progressCount"
                    
                    style={{
                      backgroundColor:
                        item.status === 0
                          ? "rgb(230, 81, 71)"
                          : item.status === 1
                          ? "#009900"
                          : "#fff",
                      color: "#fff",
                    }}
                  >
                    {item.status === 0 ? (
                      <ErrorOutlineOutlinedIcon
                        style={{ height: "19px", paddingRight: "1.1px" }}
                      />
                    ) : item.status === 1 ? (
                      ++j
                    ) : (
                      ""
                    )}
                  </p>

                  {(i + 1) % 5 !== 0 && i + 1 !== stepper.length && (
                    <div
                      style={{
                        backgroundColor:
                          item.status === 0
                            ? "rgb(230, 81, 71)"
                            : item.status === 1
                            ? "#009900"
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
