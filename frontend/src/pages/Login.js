import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../componenent/UserContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiService";
import {
  Container,
  TextField,
  Button,
  Paper,
  Box,
  FormHelperText,
  Typography,
} from "@mui/material";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // Use UserContext to access and update user information globally
  const { setUserInfo } = useContext(UserContext);
  // For showing error message if credentials doesnot  match with the database.
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(userName, password);
      const data = response.data;

      if (data) {
        setUserInfo({
          token: data.token,
          userName: userName,
          editPermission: data.editPermission,
        });
        //Navigate to right page
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/paint-stock");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setErrorMessage("Please check your credentials");
    }
  };

  return (
    <Paper elevation={3} className="home-page-container">
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="70dvh"
        >
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Login
              </Typography>
              <form
                onSubmit={handleLogin}
                style={{
                  flexDirection: "column",
                  display: "flex",
                  border: "1px solid red",
                  width: "100%",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid red",
                    width: "100%",
                  }}
                >
                  <TextField
                    label="userName"
                    value={userName}
                    margin="normal"
                    onChange={(e) => setUserName(e.target.value)}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errorMessage && (
                    <FormHelperText error>{errorMessage}</FormHelperText>
                  )}
                </Box>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="btn-text"
                    style={{ marginTop: "1rem" }}
                  >
                    Login
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Paper>
  );
};

export default Login;