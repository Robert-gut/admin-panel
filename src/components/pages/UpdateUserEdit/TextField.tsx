// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldSizes() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 3, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Name"
          id="standard-size-small"
          defaultValue={'id контакта'}
          size="small"
          variant="standard"
        />
        <TextField
          label="Country"
          id="standard-size-normal"
          defaultValue="Normal"
          variant="standard"
        />
      </div>
      <div>
        <TextField
          label="City"
          id="standard-size-normal"
          defaultValue="Normal"
          variant="standard"
        />
        <TextField
          label="Salary"
          id="standard-size-normal"
          defaultValue="Normal"
          variant="standard"
        />
      </div>
    </Box>
  );
}