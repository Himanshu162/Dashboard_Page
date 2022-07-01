import { Grid } from "@mui/material";
import React,{useEffect, useState} from "react";
import "../Assets/CSS/ProgressPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios"

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

  const [progressData, setProgressData] = useState();

  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFUFU5M09fbk1VOEZzUERoVFV5RWJyVUtXMm5GLWVxX3FyLU00V1U0LWRrIn0.eyJleHAiOjE2NTY2MjIwMzUsImlhdCI6MTY1NjU4NjY2NywiYXV0aF90aW1lIjoxNjU2NTg2MDM1LCJqdGkiOiI0ZTEzZjdkNy1iYjY1LTRkOTQtODY0OC02ZDczZjI2ZmFhOTYiLCJpc3MiOiJodHRwOi8vMTEuMC4wLjExODo4MTgwL2F1dGgvcmVhbG1zL3NhbXBsZSIsImF1ZCI6WyJjb3N0YV9jbG91ZF8xMDkiLCJyZWFsbS1tYW5hZ2VtZW50IiwiY29zdGFfbWluaW8iLCJjb3N0YV9jbG91ZF9kaXNjb3ZlcnkiLCJjb3N0YV9jbG91ZF8xMTgiLCJjb3N0YV9jbG91ZF9nYXRld2F5IiwiY29zdGFfY2xvdWRfY29uZmlnIiwiY29zdGFfbWluaW9fMTU5IiwiYWNjb3VudCJdLCJzdWIiOiIyMTMzMDJiOC04ZTI3LTQ0MTAtYWI4My02N2NhNDVhNDc3ZmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjb3N0YV9jbG91ZCIsIm5vbmNlIjoiMDc2MDYxYjQtNTIyOC00ZjA3LWI3NzgtMmY5MDRmM2ZmNTRmIiwic2Vzc2lvbl9zdGF0ZSI6Ijg2MjE5NGMyLWZiMWYtNGIyOS1iZTVhLTkwNWM3OWU4ZWVmOSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImNvc3RhX2Nsb3VkXzEwOSI6eyJyb2xlcyI6WyJyb2xlMiJdfSwicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJjb3N0YV9taW5pbyI6eyJyb2xlcyI6WyJyb2xlMiJdfSwiY29zdGFfY2xvdWQiOnsicm9sZXMiOlsicm9sZTIiXX0sImNvc3RhX2Nsb3VkX2Rpc2NvdmVyeSI6eyJyb2xlcyI6WyJyb2xlMiJdfSwiY29zdGFfY2xvdWRfMTE4Ijp7InJvbGVzIjpbInJvbGUyIl19LCJjb3N0YV9jbG91ZF9nYXRld2F5Ijp7InJvbGVzIjpbInJvbGUyIl19LCJjb3N0YV9jbG91ZF9jb25maWciOnsicm9sZXMiOlsicm9sZTIiXX0sImNvc3RhX21pbmlvXzE1OSI6eyJyb2xlcyI6WyJyb2xlMiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIG9wZW5pZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZSI6WyJyb2xlMiJdLCJncnAiOlsiN3dnaHJjIl0sInByZWZlcnJlZF91c2VybmFtZSI6Im5ldzIiLCJ1c2VybmFtZSI6Im5ldzIiLCJwb2xpY3kiOiJyZWFkd3JpdGUsIGRpYWdub3N0aWNzLCBjb25zb2xlQWRtaW4ifQ.Mcrz-hFEbedeb9GSlkY5_m-lkQTJg6fkOEXYjyHKd0WEaJYz_Qrfa9g9xQc4wMr2YVUr4EhMuapZf345CVRIbV97iv71m4lrEB0fVWvt_kkBbhMmzH0Uvg7kAT4PZlZL-T9DKD0hTNUhrOu-Arh1TVMLk4jMwfBCSeRDyJr5tjZ16-7-1eYNGJw46rJMGSKpxdIOZaCtGF-14-6dHlCwb2wCJ5TaOxPy5ILG5y7bfmtZNCvjqAj5YDU97r_qnP84XuESB7euUfo3Cn_AT4FuvnshPEffn0TRXvH_sH2lZMhua8urJKXxn5sHG117Ia0tdmAv09zlQH4k3BQgqdqJAg",
    },
  };

  useEffect(() => {
    axios
      .get(`/dashboard_service/api/getData/PA-IAF-new2-1-3}`, config)
      .then((response) => {
        setProgressData(response.data.data);
        console.log("this is Progress data", response.data.data);
      });
  }, []);


  return (
    <Grid container className="progressPage_container">
      <Grid className="grid" xs={12} item>
        <h3 className="personal">Personal id: {id}</h3>

        <div className="progressbar">
          {steps.map((data, i) => (
            <div className="Progress-step">
              <div className="Progress_div">
                <p className="progressCount">{i + 1}</p>
                {(i + 1) % 10 !== 0 && (i + 1) !== steps.length && <div></div>}
              </div>
              <p className="progressText">{data}</p>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgressPage;
