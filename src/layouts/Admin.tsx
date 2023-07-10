import {  Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { routes } from "../routes";
// import { AddNewUser } from "../pages/AddNewUser/AddNewUser.tsx";

export default function Admin() {       

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        direction="row"
        wrap="nowrap"
        sx={{ height: "100%", maxHeight: "100vh" }}
      >
        <Grid item xs="auto">
          <Sidebar routes={routes} />
        </Grid>
        <Grid item xs container direction="column">
          <Grid item xs="auto">
            <Navbar />
          </Grid>
          <Grid item xs container direction="column" wrap="nowrap" style={{ overflowY: 'scroll' }}>
            <Outlet />
          </Grid>
          <Grid item xs="auto">
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
