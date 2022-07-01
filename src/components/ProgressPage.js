import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Assets/CSS/ProgressPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";



const ProgressPage = ({ id }) => {
  const [progressData, setProgressData] = useState();

  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFUFU5M09fbk1VOEZzUERoVFV5RWJyVUtXMm5GLWVxX3FyLU00V1U0LWRrIn0.eyJleHAiOjE2NTY2ODM0NDUsImlhdCI6MTY1NjY0NzU0MSwiYXV0aF90aW1lIjoxNjU2NjQ3NDQ1LCJqdGkiOiJjMTc4M2FmNy01ODRkLTQ2Y2UtOWFlZC0xNDgxMjU1NDZkZjkiLCJpc3MiOiJodHRwOi8vMTEuMC4wLjExODo4MTgwL2F1dGgvcmVhbG1zL3NhbXBsZSIsImF1ZCI6WyJjb3N0YV9jbG91ZF8xMDkiLCJjb3N0YV9taW5pbyIsImNvc3RhX2Nsb3VkX2dhdGV3YXkiLCJjb3N0YV9jbG91ZF8xMTgiLCJjb3N0YV9taW5pb18xNTkiLCJhY2NvdW50Il0sInN1YiI6ImE0MmE5OTliLWI2NzEtNDQ3ZS1iMmM3LWZiNjdkODA1YzZiYiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNvc3RhX2Nsb3VkIiwibm9uY2UiOiJkMWU2OGJjMy1iYzM3LTRjNzUtYmRhNi05Y2M3ZTAyNTNjNTQiLCJzZXNzaW9uX3N0YXRlIjoiZDNlZDAwMmYtM2VlOC00ZDUxLWJkNmUtYTYzZmQxODFiMWQyIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiY29zdGFfY2xvdWRfMTA5Ijp7InJvbGVzIjpbIjl3Zy5jYWQudXNlcjEiXX0sImNvc3RhX2Nsb3VkIjp7InJvbGVzIjpbIjl3Zy5jYWQudXNlcjEiXX0sImNvc3RhX21pbmlvIjp7InJvbGVzIjpbIjl3Zy5jYWQudXNlcjEiXX0sImNvc3RhX2Nsb3VkX2dhdGV3YXkiOnsicm9sZXMiOlsiOXdnLmNhZC51c2VyMSJdfSwiY29zdGFfY2xvdWRfMTE4Ijp7InJvbGVzIjpbIjl3Zy5jYWQudXNlcjEiXX0sImNvc3RhX21pbmlvXzE1OSI6eyJyb2xlcyI6WyI5d2cuY2FkLnVzZXIxIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUgb3BlbmlkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJyb2xlIjpbIjl3Zy5jYWQudXNlcjEiXSwiZ3JwIjpbIjl3Z2NhZCJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuZXc0IiwidXNlcm5hbWUiOiJuZXc0IiwicG9saWN5IjoicmVhZHdyaXRlLCBkaWFnbm9zdGljcywgY29uc29sZUFkbWluIn0.u5TuYKX_-vXg6tD9OZdsi9kJWNGWWRV6Rq_5aF6YZbbl84zGfvu6YeWmpFIKaDjQ-910w12wAA5eMwXJQiE41g_21yMwpUaY8SudI3c1oiVrS6EvhgToog0GkXywUyVGlsonkfcwdjsjKjY3HOt--5SKRLTdNcLTv6ROps2WZ1-Gj6WxWDkN_USv1J67KStlPCAZ-9-xO4262ZZsITTQ5BXyvLEx5pRK_20mZOxnIGKVwlE9OmXXPottvmHojwreoijTMfTLJWerUU8xS_HbYhTnDmKGTcgYZcWnVf6aGtiTVlzK-nboDrJJ6Eq4Witvqp9FWP7_LRykwQMYuGOy0g",
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
              
                  <p className="progressCount" >{i + 1}</p>
                  
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
