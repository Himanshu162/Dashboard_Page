import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";

const Navbar = () => {
  const { keycloak } = useKeycloak();

  React.useEffect(() => {
    if (keycloak.authenticated) {
      keycloak
        .loadUserInfo()
        .then((resp) => {
          sessionStorage.setItem("jwt_token", keycloak.token);
          sessionStorage.setItem("userInfo", JSON.stringify(resp));
          sessionStorage.setItem("username", resp.username);
          console.log("this is user response", resp);
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#21201E" }}>
        <Toolbar variant="dense">
          {keycloak.authenticated && (
            <Button
              variant="outlined"
              style={{
                color: "white",
                borderColor: "gray",
                justifyContent: "space-around",
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
