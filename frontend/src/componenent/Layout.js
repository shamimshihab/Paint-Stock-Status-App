import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Paper } from "@mui/material";

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
