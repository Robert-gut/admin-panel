import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



export default function Admin() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
        <Sidebar/>
        </Grid>
        <Grid item xs={9}>
          <Navbar/>
            <h1>Admin</h1>
        </Grid>
      </Grid>
    </Box>
  );
}