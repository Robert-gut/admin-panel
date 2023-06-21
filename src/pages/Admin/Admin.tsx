
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import Userslist from "../UsersList/UsersList";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Profile from "../Profile/proflle";

import './adm.css'
export default function Admin() {
  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container direction="row" wrap="nowrap" sx={{ height: '100%', maxHeight: '100vh'}}>
        <Grid item xs="auto">
          <div style={{border: '1px solid red'}}>
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs container direction="column" >
          <Grid item xs={1}>
            <Navbar/>
          </Grid>
          <Grid item xs="auto">
            <Userslist />
            <Userslist />
            {/* <Profile/> */}
            {/* <h1>Admin</h1> */}
          </Grid>
          <Grid item xs={1}>
            <div>footer</div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
