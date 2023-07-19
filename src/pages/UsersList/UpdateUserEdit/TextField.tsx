import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Container, Grid, TextField } from '@mui/material';
import { useState, useEffect } from "react";

import {
  updateUser
} from "../../../services/api-user-service/api-user-service";


export default function FormComponent(user: any) {
  const { handleSubmit, register } = useForm();
  // const [foundUser, setFoundUser] = useState([]);

  const onSubmit = (data: any) => {
    console.log(data);
    
  };

  let userId = user;
  let userValue = userId.user.row;
  console.log("FormComponent  userValue:", userValue)
  console.log("userId.user:", userValue.name)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getAllUsers(0, 0, true);
  //       setFoundUser(result.response.payload);
  //       const userEdit = foundUser.filter((u) => u.id === userId?.user?.row);
  //       console.log("foundUser:", userEdit);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
                defaultValue={userValue.name}
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
                defaultValue={userValue.surname}
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
                defaultValue={userValue.email}
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
                defaultValue={userValue.phoneNumber}
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
                defaultValue={userValue.role}
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
