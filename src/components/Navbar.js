import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../Assets/CSS/Navbar.css";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Tooltip } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

const Navbar = () => {
  let navigate = useNavigate();
  const WorkflowList = () => {
    let path = "/workflowList";
    navigate(path);
  };

  const HomePageNavigation = () => {
    let path = "/";
    navigate(path);
  };
  const { keycloak } = useKeycloak();
  // const navigate = useNavigate();
  React.useEffect(() => {
    if (keycloak.authenticated) {
      keycloak
        .loadUserInfo()
        .then((resp) => {
          sessionStorage.setItem("jwt_token", keycloak.token);
          sessionStorage.setItem("userInfo", JSON.stringify(resp));
          sessionStorage.setItem("username", resp.username);
          console.log("userLoginInfo", resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  setTimeout(() => {
    keycloak
      .updateToken(10000)
      .success((refreshed) => {
        if (refreshed) {
          console.debug("Token refreshed" + refreshed);
        } else {
          console.warn(
            "Token not refreshed, valid for " +
              Math.round(
                keycloak.tokenParsed.exp +
                  keycloak.timeSkew -
                  new Date().getTime() / 1000
              ) +
              " seconds"
          );
        }
      })
      .error(() => {
        console.error("Failed to refresh token");
      });
  }, 80000);

  return (
    <AppBar>
      <Toolbar
        className="navbar"
        variant="dense"
        style={{
          position: "fixed",
          backgroundColor: "#3f51b5",
          width: "100%",
          left: 0,
          marginTop: 0,
          marginBottom: "5rem",
        }}
      >
        {keycloak.authenticated && (
          <IconButton
            variant="outlined"
            color="secondary"
            position="fixed"
            style={{
              color: "#ffbc42",
              borderColor: "gray",
              justifyContent: "space-around",
            }}
            onClick={() => keycloak.logout()}
          >
            <ExitToAppIcon />
          </IconButton>
        )}
        <Tooltip title="Work FLow List">
        <Button
          style={{
            color: "#ffbc42",
            position: "fixed",
            marginLeft: "5rem",
            textTransform: "capitalize",
          }}
         onClick={WorkflowList}
        >
           <ListAltIcon />
        </Button>
        </Tooltip>

        <Tooltip title="Home">
        <Button
          style={{
            color: "#ffbc42",
            position: "fixed",
            marginLeft: "2rem",
            textTransform: "capitalize",
          }}
         onClick={HomePageNavigation}
        >
           <HomeOutlinedIcon />
        </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
