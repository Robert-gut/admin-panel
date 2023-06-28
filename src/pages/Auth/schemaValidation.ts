import * as yup from "yup";

export const schemaValidationLogin = yup.object({
  email: yup
    .string()
    .email("Incorrect email")
    .required("The field is required"),
  password: yup
    .string()
    .required("The field is required")
    .min(6, "Minimum 6 characters"),
  rememberMe: yup.boolean(),
});
export const schemaValidationForgotPassword = yup.object({
  email: yup
    .string()
    .email("Incorrect email")
    .required("The field is required"),
});
