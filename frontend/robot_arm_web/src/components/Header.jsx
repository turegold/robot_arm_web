import React from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <div>
      <header>
        <h1>헤더</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
