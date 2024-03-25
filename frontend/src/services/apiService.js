import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const loginUser = async (userName, password) => {
  return await axios.post(`${API_BASE_URL}/login`, { userName, password });
};

export const fetchPaintStockStatus = async (token) => {
  return await axios.get(`${API_BASE_URL}/paints`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePaintStockStatus = async (
  token,
  updatedPaintStockStatus
) => {
  return await axios.put(`${API_BASE_URL}/paints`, updatedPaintStockStatus, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUsers = async (token) => {
  return await axios.get(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserPermission = async (token, userId, newPermission) => {
  return await axios.put(
    `${API_BASE_URL}/users/${userId}`,
    { editPermission: newPermission },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteUser = async (token, userId) => {
  return await axios.delete(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = async (token, formData) => {
  return await axios.post(`${API_BASE_URL}/register`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
