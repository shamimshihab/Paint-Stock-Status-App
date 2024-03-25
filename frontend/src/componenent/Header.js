import { useContext } from "react";
import { Typography, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const location = useLocation();
  function logout() {
    setUserInfo({
      token: "",
      userName: "",
      editPermission: "",
    });
    navigate("/");
  }

  return (
    <Box className="header-container">
      <Paper className="header-container ">
        <Button style={{ textTransform: "none", fontWeight: "bold" }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Stock Status App
          </Typography>
        </Button>

        {userInfo.userName !== "" && location.pathname !== "/" && (
          <Button className="logout-button" variant="outlined" onClick={logout}>
            Logout ({userInfo.userName})
          </Button>
        )}
      </Paper>
    </Box>
  );
}
