import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

import axios from "axios";
import { UserContext } from "../componenent/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchPaintStockStatus,
  updatePaintStockStatus,
} from "../services/apiService";
const EditPaintStockStatus = () => {
  //Store list of paints and stock status
  const [paints, setPaints] = useState([]);
  const [valueChanged, setValueChange] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const token = userInfo.token;
  //fetching paint status data from the server
  useEffect(() => {
    const fetchPaintkStatus = async () => {
      try {
        const response = await fetchPaintStockStatus(token);
        setPaints(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPaintkStatus();
  }, []);
  //Update paint stock status change
  const handleStatusChange = (index, newStatus) => {
    const updatedPaintStockStatus = [...paints];
    updatedPaintStockStatus[index].status = newStatus;
    setPaints(updatedPaintStockStatus);
  };

  //Send updated paint stock staus to backend
  const handleUpdateStatus = async () => {
    const confirmSave = window.confirm(
      "Do you want to change the Paint Stock Status?"
    );
    if (confirmSave) {
      try {
        const updatedPaintStockStatus = paints.map((paint) => ({
          color: paint.color,
          status: paint.status,
        }));
        await updatePaintStockStatus(token, updatedPaintStockStatus);
        // await axios.put(
        //   "http://localhost:4000/paints",
        //   updatedPaintStockStatus,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        toast("Statuses updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => navigate("/paint-stock"), 2000);
      } catch (error) {
        console.error("Error updating paints:", error);

        toast("Failed to update statuses", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  //Navigate to previous (paint stock) page with a confirmation prommpt
  const handleBackButton = async () => {
    if (valueChanged === true) {
      const confirmAnswer = window.confirm(
        "Do you want to go back to previous page? Your unsaved value will be lost."
      );
      if (confirmAnswer) {
        setValueChange(false);
        navigate("/paint-stock");
      }
    }
    navigate("/paint-stock");
  };
  return (
    <Paper elevation={3} className="home-page-container">
      <Container>
        <Box
          style={{
            height: "5dvh",
            borderBottom: "1px dashed",
            margin: "1rem 0rem",
          }}
        >
          <Typography variant="h6">Edit Stock Status Page</Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            border: "1px solid red",
            margin: "1rem 0rem",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <Box
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "5dvh",
                      padding: "4px",
                    }}
                  >
                    <div>
                      {" "}
                      <Typography variant="h6">Color</Typography>
                    </div>
                    <div>
                      <Typography variant="h6"> Status</Typography>
                    </div>
                  </Box>
                </TableRow>
              </TableHead>
              <TableBody>
                {paints.map((paint, index) => (
                  <TableRow key={paint._id}>
                    <Paper
                      elevation={4}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "4px",
                        margin: "4px",
                      }}
                    >
                      <div>{paint.color}</div>
                      <div>
                        <Select
                          style={{ width: "10rem" }}
                          value={paint.status}
                          onChange={(event) => {
                            handleStatusChange(index, event.target.value);
                            setValueChange(true);
                          }}
                        >
                          <MenuItem value="available">Available</MenuItem>
                          <MenuItem value="about to finish">
                            About to Finish
                          </MenuItem>
                          <MenuItem value="stock out">Stock Out</MenuItem>
                        </Select>
                      </div>
                    </Paper>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "4px",
            margin: "4px",
          }}
        >
          <Button
            variant="contained"
            className="btn-text"
            color="primary"
            onClick={handleBackButton}
            style={{ marginTop: "20px" }}
          >
            Previous Page
          </Button>

          <Button
            variant="contained"
            className="btn-text"
            color="primary"
            onClick={handleUpdateStatus}
            style={{ marginTop: "20px" }}
          >
            Update Status
          </Button>
        </Box>
      </Container>

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
    </Paper>
  );
};

export default EditPaintStockStatus;