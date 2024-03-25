import axios from "axios";
const API_BASE_URL = "https://paint-stock-status-app.onrender.com";
// const API_BASE_URL = "http://localhost:4000";

// Logs in a user
export const loginUser = async (userName, password) => {
  return await axios.post(`${API_BASE_URL}/user/login`, { userName, password });
};
// Fetches the list of users
export const fetchUsers = async (token) => {
  return await axios.get(`${API_BASE_URL}/user/userList`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Registers a new user
export const registerUser = async (token, formData) => {
  return await axios.post(`${API_BASE_URL}/user/register`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Updates the permission of a user
export const updateUserPermission = async (token, userId, newPermission) => {
  return await axios.put(
    `${API_BASE_URL}/user/${userId}`,
    { editPermission: newPermission },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// Deletes a user
export const deleteUser = async (token, userId) => {
  return await axios.delete(`${API_BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Fetches the stock status of all paints
export const fetchPaintStockStatus = async (token) => {
  return await axios.get(`${API_BASE_URL}/paints/paintStockStatus`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Updates the stock status of paints
export const updatePaintStockStatus = async (
  token,
  updatedPaintStockStatus
) => {
  return await axios.put(
    `${API_BASE_URL}/paints/paintStockStatus`,
    updatedPaintStockStatus,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
