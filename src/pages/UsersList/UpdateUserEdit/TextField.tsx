import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Container, Grid, TextField } from '@mui/material';

export default function FormComponent() {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
            sx={{
              '& .MuiTextField-root': { m: 3 },
            }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                id="standard-size-small"
                defaultValue={'id Name'}
                size="small"
                variant="standard"
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Surname"
                id="standard-size-normal"
                defaultValue={'id Surname'}
                variant="standard"
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                id="standard-size-normal"
                defaultValue={'id Email'}
                variant="standard"
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                id="standard-size-normal"
                defaultValue={'id Phone Number'}
                variant="standard"
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Role"
                id="standard-size-normal"
                defaultValue={'id Role'}
                variant="standard"
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}
