import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



export default function Admin() {
  return (

    <Box sx={{ height: '100vh' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid item xs={2} >
          <Sidebar/>
        </Grid>
        <Grid item xs={10}>
          <Navbar/>
          <h1>Admin</h1>
        </Grid>
      </Grid>
    </Box>
  );
}