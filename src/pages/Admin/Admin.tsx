import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Admin() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <h1>Admin</h1>
        </Grid>
      </Grid>
    </Box>
  );
}
