import "./EditProfile.scss";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const EditProfile = () => 
{
  type Schema = {  //* /api/User/UpdateProfile
    id: string
    name: string
    surname: string
    email: string
    phone: number
  }
  
  type SchemaPassword = {
    userId: string
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }

  const navigate = useNavigate()
  const form = useForm<Schema>();
  const { register, handleSubmit, reset, formState } = form;
  const { errors } = formState

  const formPasswords = useForm<SchemaPassword>()
  const {
    register: registerPasswords,
    handleSubmit: handleSubmitPasswords,
    reset: resetPasswords,
    formState: formStatePasswords,
    watch: watchPasswords
  } = formPasswords
  const { errors: errorsPasswords } = formStatePasswords

  const { isSubmitting } = formState;
  const [ isSubmittingPasswords, setSubmittingPasswords ] = React.useState(false)

  // for snackbar
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  ////////////

  const onSubmit = (data: Schema) => {
    console.log("summitted", data);

    handleSuccess();
    reset();
  };

  const onSubmitPasswords = (data: SchemaPassword) => {
    console.log("summitted passwords", data);

    setSubmittingPasswords(true);
    handleSuccess()
    resetPasswords()
  }

  return (
    <div className='editProfile'>
      <div className='head'>
        <div className='text'>
          <h3>Edit Profile</h3>
          <h4>Complete your profile</h4>
        </div>
        <Button onClick={() => navigate("/admin/profile")} variant='contained'>
          Go to your personal profile
        </Button>
      </div>

      <form
        className='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete='off'
      >
        <div className='form-control'>
          <TextField
            id='standard-basic'
            className='f2'
            label='Name'
            variant='standard'
            // value={value}
            {...register("name", {
              required: "Name is required",
            })}
          />
          <p className='errorM'>{errors.name?.message}</p>
        </div>

        <div className='form-control'>
          <TextField
            id='standard-basic'
            className='f2'
            label='Surname'
            variant='standard'
            {...register("surname", {
              required: "Surname is required",
            })}
          />
          <p className='errorM'>{errors.surname?.message}</p>
        </div>

        <div className='form-control'>
          <TextField
            id='standard-basic'
            className='f3'
            label='Email'
            type='email'
            variant='standard'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
            })}
          />
          <p className='errorM'>{errors.email?.message}</p>
        </div>

        <div className='form-control'>
          <TextField
            id='standard-basic'
            className='f4'
            label='Phone'
            type='number'
            variant='standard'
            {...register("phone", {
              required: "Phone is required",
              valueAsNumber: true,
              min: { value: 1, message: "Phone number must be at least 18" },
              max: { value: 99, message: "Phone number must be at most 99" },
            })}
          />
          <p className='errorM'>{errors.phone?.message}</p>
        </div>

        <Button
          className='btnSumbit'
          type='submit'
          variant='outlined'
          size='large'
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>

      <hr />
      <div className='head'>
        <h3>Change password</h3>
      </div>
      <form
        className='form-passwords'
        onSubmit={handleSubmitPasswords(onSubmitPasswords)}
        autoComplete='off'
      >
        <div className='inputs-passwords'>
          <div className='form-control'>
            <TextField
              id='filled-password-input'
              className='f5'
              label='Old password'
              type='password'
              autoComplete='current-password'
              variant='filled'
              {...registerPasswords("oldPassword", {
                required: "Password is required",
              })}
            />
            <p className='errorM'>{errorsPasswords.oldPassword?.message}</p>
          </div>
          <div className='form-control'>
            <TextField
              id='filled-password-input'
              label='New password'
              type='password'
              autoComplete='current-password'
              variant='filled'
              {...registerPasswords("newPassword", {
                required: "New password is required",
                min: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            <p className='errorM'>{errorsPasswords.newPassword?.message}</p>
          </div>
          <div className='form-control'>
            <TextField
              id='filled-password-input'
              label='Confirm new password'
              type='password'
              autoComplete='current-password'
              variant='filled'
              {...registerPasswords("confirmPassword", {
                required: "Confirm password is required",
                validate: (val: string) => {
                  if (watchPasswords("newPassword") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            <p className='errorM'>{errorsPasswords.confirmPassword?.message}</p>
          </div>
        </div>

        <span>
          Make sure it's at least 15 characters OR at least 8 characters
          including a number and a lowercase letter.
          <Link
            to={
              "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-strong-password"
            }
          >
            Learn more.
          </Link>
        </span>
        <div className='btns-submits-passwords'>
          <Button
            className='btnSumbit'
            type='submit'
            variant='outlined'
            disabled={isSubmittingPasswords}
          >
            Update password
          </Button>
          <Link to={"/login/forgotPassword"}>Forgot password</Link>
        </div>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Edited successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
