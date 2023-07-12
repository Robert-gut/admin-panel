import * as yup from "yup";

export const schemaValidationAddUser = yup.object({
  name: yup
    .string()
    .required("The field is required")
    .min(2, "Minimum 2 characters!")
    .max(30, "Maximum 2 characters"),
  surname: yup
    .string()
    .required("The field is required")
    .min(2, "Minimum 2 characters!")
    .max(30, "Maximum 2 characters"),
  role: yup.string().required("The field is required"),
  email: yup
    .string()
    .email("Incorrect email")
    .required("The field is required"),
  password: yup
    .string()
    .required("The field is required")
    .min(6, "Minimum 6 characters"),
  confirmPassword: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("The field is required")
    .oneOf([yup.ref("password")], () => "Passwords must be the same"),
});
