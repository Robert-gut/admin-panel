import "./EditProfile.scss";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { changePassword, updateProfile } from "../../services/api-user-service/api-user-service";
import { logicSelectedUser, Schema, SchemaPassword } from "./typeProfiles.ts";
import {
  getSelectedUser,
  setSelectedUser,
} from "../../common/utils/localStorageLogic.ts";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const EditProfile = () => {
  const user = getSelectedUser();

  const navigate = useNavigate();
  const form = useForm<Schema>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });
  const { register, handleSubmit, reset, formState } = form;
  const { errors } = formState;

  const formPasswords = useForm<SchemaPassword>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const {
    register: registerPasswords,
    handleSubmit: handleSubmitPasswords,
    reset: resetPasswords,
    formState: formStatePasswords,
    watch: watchPasswords,
  } = formPasswords;
  const { errors: errorsPasswords } = formStatePasswords;

  const { isSubmitting } = formState;
  const [isSubmittingPasswords, setSubmittingPasswords] = React.useState(false);

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
    const updatedData = {
      ...user,
      firstName: data.firstName || user.firstName,
      lastName: data.lastName || user.lastName,
      email: data.email || user.email,
      phone: data.phone || user.phone,
    };

    handleSuccess();
    reset();
    setSelectedUser(updatedData);
    console.log(updatedData);
    
    updateProfile(updatedData)
  };

  const onSubmitPasswords = async (data: SchemaPassword) => {
    
    const selectedUser = localStorage.getItem("selectedUser");
    const user = selectedUser !== null ? JSON.parse(selectedUser) : null;
    
    const userLocal: SchemaPassword = {
      userId: user.id,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };
    await changePassword(userLocal);

    setSubmittingPasswords(true);
    handleSuccess();
    resetPasswords();
  };
  return (
    <div className="editProfile">
      <div className="head">
        <div className="text">
          <h3>Complete your profile</h3>
        </div>
        <Button onClick={() => navigate("/admin/profile")} variant="contained">
          Go to your personal profile
        </Button>
      </div>

      <form
        className='form'
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <div className='form-control'>
        <TextField
          id='name-basic'
          className='f2'
          label='firstName'
          variant='standard'

          {...form.register("firstName", {
            required: "firstName is required",
          })}
        />
          <p className="errorM">{errors.firstName?.message}</p>
        </div>

        <div className="form-control">
          <TextField
            id='surname-basic'
            className='f2'
            label='lastName'
            variant='standard'
            {...form.register("lastName", {
              required: "lastName is required",
            })}
          />
          <p className="errorM">{errors.lastName?.message}</p>
        </div>

        <div className="form-control">
          <TextField
            id='email-basic'
            className='f3'
            label='Email'
            type='email'
            variant='standard'
            {...form.register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
            })}
          />
          <p className="errorM">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <TextField
            id='phone-basic'
            className='f4'
            label='Phone'
            type='number'
            variant='standard'
            {...form.register("phone", {
              required: "Phone is required",
              valueAsNumber: true,
              min: { value: 1, message: "Phone number must be at least 18" },
              max: {
                value: 999999999999,
                message: "Phone number must be at most 999999999999",
              },
            })}
          />
          <p className="errorM">{errors.phone?.message}</p>
        </div>

        <Button
          className="btnSumbit"
          type="submit"
          variant="outlined"
          size="large"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>

      <hr />
      <div className="head">
        <h3>Change password</h3>
      </div>
      <form
        className="form-passwords"
        onSubmit={formPasswords.handleSubmit(onSubmitPasswords)}
        autoComplete="off"
      >
        <div className="inputs-passwords">
          <div className="form-control">
            <TextField
              id='filled-old-password-input'
              className='f5'
              label='Old password'
              type='password'
              autoComplete='current-password'
              variant='filled'
              {...formPasswords.register("currentPassword", {
                required: "Password is required",
              })}
            />
            <p className="errorM">{errorsPasswords.currentPassword?.message}</p>
          </div>
          <div className="form-control">
            <TextField
              id='filled-new-password-input'
              label='New password'
              type='password'
              autoComplete='current-password'
              variant='filled'
              {...formPasswords.register("newPassword", {
                required: "New password is required",
                min: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            <p className="errorM">{errorsPasswords.newPassword?.message}</p>
          </div>
          <div className="form-control">
            <TextField
              id='filled-password-input'
              label='Confirm new password'
              type='password'
              autoComplete='current-password'
              variant='filled'
              {...formPasswords.register("confirmNewPassword", {
                required: "Confirm password is required",
                validate: (val: string) => {
                  if (watchPasswords("confirmNewPassword") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            <p className="errorM">{errorsPasswords.confirmNewPassword?.message}</p>
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
        <div className="btns-submits-passwords">
          <Button
            className="btnSumbit"
            type="submit"
            variant="outlined"
            disabled={isSubmittingPasswords}
          >
            Update password
          </Button>
          <Link to={"/login/forgotPassword"}>Forgot password</Link>
        </div>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Edited successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
