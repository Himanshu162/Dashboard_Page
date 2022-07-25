import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
// import { useNavigate } from 'react-router-dom';



const Navbar = () => {
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
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense" style={{position:"fixed", backgroundColor: "#21201E",width:"100%",left:0, marginTop:"-.5rem"}}>
          {keycloak.authenticated && (
            <Button
              variant="outlined"
              style={{
                color: "white",
                borderColor: "gray",
                justifyContent: "space-around",
                left:0
              }}
              onClick={() => keycloak.logout()}
             
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
