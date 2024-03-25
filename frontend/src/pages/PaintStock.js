import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../componenent/UserContext";
import { fetchPaintStockStatus } from "../services/apiService";
const PaintStock = () => {
  //Store list of paints and stock status
  const [paints, setPaints] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const token = userInfo.token;

  useEffect(() => {
    const fetchPaintData = async () => {
      try {
        const response = await fetchPaintStockStatus(token);
        setPaints(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPaintData();
  }, []);

  //Navigate handle edit paint status page
  const handleEdit = () => {
    navigate("/edit-paints");
  };

  return (
    <Paper elevation={3} className="home-page-container">
      <Container>
        <Box className="dashed-box">
          <Typography variant="h6">Paint Stock Status Page</Typography>
        </Box>
        <Box className="table-box">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Color</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>About to Finish</TableCell>
                  <TableCell>Stock Out</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paints.map((paint) => (
                  <TableRow key={paint._id}>
                    <TableCell>{paint.color}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={paint.status === "available"}
                        color="success"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={paint.status === "about to finish"}
                        color="warning"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={paint.status === "stock out"}
                        color="error"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Render button if the user have read-write permission to update the paint stock status */}
        {userInfo.editPermission === "read-write" && (
          <Box
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              className="btn-text"
              variant="contained"
              color="primary"
              onClick={handleEdit}
            >
              Edit Paint Stock
            </Button>
          </Box>
        )}
      </Container>
    </Paper>
  );
};

export default PaintStock;
