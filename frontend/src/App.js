import "./App.css";

import { Route, Routes } from "react-router-dom";

import PaintStock from "./pages/PaintStock";
import Login from "./pages/Login";
import { UserContextProvider } from "./componenent/UserContext";
import EditPaints from "./pages/EditPaints";
import Admin from "./pages/Admin";
import React from "react";
import Layout from "./componenent/Layout";
import Error from "./pages/Error";
import Register from "./pages/Register";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/paint-stock" element={<PaintStock />} />
          <Route path="/edit-paints" element={<EditPaints />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
