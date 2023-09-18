import s from "../login.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidationForgotPassword } from "../schemaValidation";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";
import InputGroup from "../../../components/InputGroup/InnputGroup";
import { IForgotPassword } from "../types.ts";
import { forgotPassword } from "../../../services/api-user-service/api-user-service";

const defaultValues = {
  email: "",
};
const ForgotPassword = () => {
  const formForgotPassword = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schemaValidationForgotPassword),
  });
  const {
    formState: { errors },
  } = formForgotPassword;
  const onSubmit = (data: IForgotPassword) => {
    console.log(data);
    forgotPassword(data)
  };
  return (
    <div className={s.loginPageWrapper}>
      <span className={s.circle}></span>
      <FormProvider {...formForgotPassword}>
        <form
          className={s.forgotPasswordForm}
          onSubmit={formForgotPassword.handleSubmit(onSubmit)}>
          <h3 className={s.titleForm}>Recover password</h3>
          <InputGroup
            name={"email"}
            id={"email"}
            classNameInput={"email"}
            placeholder={"Email"}
            type={"email"}
            field={"email"}
            errorMassage={errors?.email?.message}
            classNameError={s.errorLogin}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <Button type={"submit"}>Recover password</Button>
          <Link className={s.link} to={"/login"}>
            Login
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgotPassword;
