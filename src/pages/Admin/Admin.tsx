
import Sidebar from "../../components/Sidebar/Sidebar"
import UpdateUserEdit from "../../components/pages/UpdateUserEdit/UpdateUserEdit"
import Navbar from "../../components/Navbar/Navbar"
import Userslist from "../UsersList/UsersList";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Profile from "../Profile/proflle";



export default function Admin() {

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container direction="row" wrap="nowrap" sx={{ height: '100%', maxHeight: '100vh' }}>
        <Grid item xs="auto">
          <Sidebar />
        </Grid>
        <Grid item xs container direction="column" >
          <Grid item xs="auto">
            <Navbar/>
          </Grid>
          <Grid item xs container direction="column" wrap="nowrap" style={{ overflowY: 'scroll' }}>
            {/*<Userslist />*/}
            <Profile/>
            {/*<UpdateUserEdit/>*/}
            {/* <h1>Admin</h1> */}
          </Grid>
          <Grid item xs="auto">
            <div>footer</div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
