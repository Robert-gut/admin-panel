import s from "./login.module.css";
import InputGroup from "../../components/InputGroup/InnputGroup";
import { Button, Checkbox } from "@mui/joy";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidationLogin } from "./schemaValidation";
import {Link} from "react-router-dom";
import { ILogin } from "./types.ts";
import { login } from "../../services/api-user-service/api-user-service.ts";
import {
  setAccessToken,
  setRefreshToken,
  setSelectedUser,
} from "../../common/utils/localStorageLogic.ts";
import jwtDecode from "jwt-decode";
import { Dispatch, SetStateAction } from "react";

const defaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const Login = ({
  setAuth
}: {
  setAuth?: Dispatch<SetStateAction<boolean>>
}) => {

  const formLogin = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schemaValidationLogin),
  });

  const {
    formState: { errors },
    register,
  } = formLogin;

  const onSubmit = async (data: ILogin) => {

    const {response= null}  = await login(data);

    if (response?.isSuccess) {
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      const activeUser = jwtDecode(response.accessToken);
      setSelectedUser(activeUser);
      setAuth && setAuth(true);

    } else {
      formLogin.setError("password", {
        type: "manual",
        message: response?.message,
      });
    }
  };
  return (
    <div className={s.loginPageWrapper}>
      <span className={s.circle}></span>
      <FormProvider {...formLogin}>
        <form
          className={s.formLogin}
          onSubmit={formLogin.handleSubmit(onSubmit)}
        >
          <h3 className={s.titleForm}>Login</h3>
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
          <InputGroup
            name={"password"}
            id={"password"}
            classNameInput={"password"}
            placeholder={"Password"}
            type={"password"}
            field={"password"}
            errorMassage={errors?.password?.message}
            classNameError={s.errorLogin}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <Checkbox
            className={s.checkbox}
            color='primary'
            variant='soft'
            {...register("rememberMe")}
            label={"Remember me"}
          />
          <Button type={"submit"}>
            Login
          </Button>
          <Link className={s.link} to={"forgotPassword"}>
            Forgot password
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
