import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

export default function FormComponent() {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            defaultValue={'id Name'}
            size="small"
            variant="standard"
          />
          <TextField
            label="Country"
            id="standard-size-normal"
            defaultValue={'id Country'}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            label="City"
            id="standard-size-normal"
            defaultValue={'id City'}
            variant="standard"
          />
          <TextField
            label="Salary"
            id="standard-size-normal"
            defaultValue={'id Salary'}
            variant="standard"
          />
        </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      </Box>
    </form>
  );
}

