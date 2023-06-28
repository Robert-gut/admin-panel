
import Sidebar from "../components/Sidebar/Sidebar"
// import UpdateUserEdit from "../components/pages/UpdateUserEdit/UpdateUserEdit"
import Navbar from "../components/Navbar/Navbar"
import Userslist from "../pages/UsersList/UsersList";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Profile from "../pages/Profile/proflle";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams, useHref } from "react-router-dom";


import { routes } from "../routes";

export default function Admin() {

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container direction="row" wrap="nowrap" sx={{ height: '100%', maxHeight: '100vh' }}>
        <Grid item xs="auto">
        <Sidebar routes={routes} />
        </Grid>
        <Grid item xs container direction="column" >
          <Grid item xs="auto">
            <Navbar/>
          </Grid>
          <Grid item xs container direction="column" wrap="nowrap" style={{ overflowY: 'scroll' }}>
            <Outlet />
          </Grid>
          <Grid item xs="auto">
            <div>footer</div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
