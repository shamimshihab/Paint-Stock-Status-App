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
  Button,
  Select,
  MenuItem,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  fetchUsers,
  updateUserPermission,
  deleteUser,
} from "../services/apiService";
import { UserContext } from "../componenent/UserContext";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Admin = () => {
  //Storing list of users and details
  const [users, setUsers] = useState([]);
  const { userInfo } = useContext(UserContext);
  const token = userInfo.token;
  const navigate = useNavigate();
  //Fetching List of Users
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUsers(token);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserData();
  }, []);
  //Update edit permission change of a user
  const handleEditPermissionChange = (userId, newPermission) => {
    const updatedUserPermission = users.map((user) => {
      if (user._id === userId) {
        return { ...user, editPermission: newPermission };
      }
      return user;
    });
    setUsers(updatedUserPermission);
  };
  //Sending updated user permission to the backend
  const handleSave = async (userId) => {
    const confirmSave = window.confirm(
      "Do you want to change the permission of the user?"
    );
    if (confirmSave) {
      try {
        const user = users.find((user) => user._id === userId);
        await updateUserPermission(token, userId, user.editPermission);

        setUsers(
          users.map((user) =>
            user._id === userId
              ? { ...user, editPermission: user.editPermission }
              : user
          )
        );
        toast("Edit Permission updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error("Error updating Edit Permission:", error);
        toast.error("Error updating Edit Permission.");
      }
    }
  };
  // Delete user from the database
  const handleDelete = async (userId) => {
    if (window.confirm("Do you want to delete this user?")) {
      try {
        await deleteUser(token, userId);
        setUsers(users.filter((user) => user._id !== userId));
        toast("User deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <Paper elevation={3} className="home-page-container">
      <Container>
        <Box className="dashed-box-admin ">
          <Typography variant="h6">User Management Page</Typography>
          {/* Navigate to new page to register new user */}
          <Button
            variant="contained"
            className="dashed-box-btn"
            size="small"
            startIcon={<AddIcon />}
            onClick={(event) => {
              event.preventDefault();
              navigate("/register");
            }}
          >
            Add New User
          </Button>
        </Box>
        <Box className="table-box">
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Edit Permission</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Select
                        value={user.editPermission}
                        onChange={(e) =>
                          handleEditPermissionChange(user._id, e.target.value)
                        }
                      >
                        <MenuItem value="read-only">Read-Only</MenuItem>
                        <MenuItem value="read-write">Read-Write</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Stack direction={"row"} spacing={1}>
                        <Button
                          className="btn-text"
                          size="small"
                          variant="contained"
                          onClick={() => handleSave(user._id)}
                        >
                          Save
                        </Button>

                        <Tooltip title="Delete User">
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              handleDelete(user._id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default Admin;
