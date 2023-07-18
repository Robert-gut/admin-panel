import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Container, Grid, TextField } from '@mui/material';
import { useState, useEffect } from "react";

import {
  getAllUsers,
  updateUser
} from "../../../services/api-user-service/api-user-service";


export default function FormComponent(user: any) {
  const { handleSubmit, register } = useForm();
  const [foundUser, setFoundUser] = useState([]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const userId = user;
  console.log("userId.user:", userId.user.row)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUsers(0, 0, true);
        setFoundUser(result.response.payload);
        const userEdit = foundUser.filter((u) => u.id === userId?.user?.row);
        console.log("foundUser:", userEdit);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
                defaultValue={''}
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
                defaultValue={''}
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
                defaultValue={''}
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
                defaultValue={''}
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
                defaultValue={''}
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
