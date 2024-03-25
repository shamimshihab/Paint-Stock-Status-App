import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Typography, Box, Paper, Button } from "@mui/material";

export default function Layout({ toggleTheme }) {
  return (
    <Paper>
      <main>
        <Header />
        <Outlet />
      </main>
    </Paper>
  );
}
