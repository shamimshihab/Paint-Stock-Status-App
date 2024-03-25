import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/apiService";
import { UserContext } from "../componenent/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { userInfo } = useContext(UserContext);
  //Form data for registering a new use
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: "painter",
    editPermission: "read-only",
  });
  const navigate = useNavigate();
  const token = userInfo.token;

  //Updating form data of new user
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //Sending new user form data to backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(token, formData);

      toast("User registered successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.error("Registration failed");
    }
  };

  return (
    <Paper elevation={3} className="home-page-container">
      <Container>
        <Box className="register-page-main-box">
          <Paper elevation={3} className="register-paper ">
            <Box className="login-box">
              <Typography variant="h5" gutterBottom>
                Register User
              </Typography>
              <form onSubmit={handleSubmit} className="form-register">
                <Box className="register-inside-form-box ">
                  <TextField
                    label="Username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <FormControl margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                      label="Role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <MenuItem value="painter">Painter</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl margin="normal">
                    <InputLabel>Edit Permission</InputLabel>
                    <Select
                      label="Edit Permission"
                      name="editPermission"
                      value={formData.editPermission}
                      onChange={handleChange}
                    >
                      <MenuItem value="read-only">Read-Only</MenuItem>
                      <MenuItem value="read-write">Read-Write</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="register-btn-text"
                >
                  Register
                </Button>
              </form>
            </Box>
          </Paper>
        </Box>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    </Paper>
  );
};

export default Register;
