import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} className="home-page-container">
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="90dvh"
        >
          <Typography variant="h4" gutterBottom align="center">
            Page Not Found
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            This Page does not Exist.
          </Typography>
          {/* Navigate to login page */}
          <Button variant="contained" onClick={() => navigate("/")}>
            Go to Login Page
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default Error;
