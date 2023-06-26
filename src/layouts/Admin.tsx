import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Userslist from "../pages/UsersList/UsersList";
import Profile from "../pages/Profile/proflle";

import { routes } from "../routes";

export default function Admin() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid item xs={3.5}>
          <Sidebar routes={routes} />
        </Grid>
        <Grid item xs={10}>
          <Navbar />
          <Userslist />
          <Profile />
        </Grid>
      </Grid>
    </Box>
  );
}
