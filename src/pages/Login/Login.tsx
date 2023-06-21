import s from "./login.module.css";
import InputGroup from "../../components/InputGroup/InnputGroup";
import { Button, Checkbox } from "@mui/joy";
import { FormProvider, useForm } from "react-hook-form";
import { ILoginUser, ITokenRequest, IUser } from "../../common/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidationLogin } from "./schemaValidation";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogin } from "../../common/api/services/users";
import setAuthToken from "../../common/utils/setAuthToken";
import jwtDecode from "jwt-decode";

const defaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};
const Login = () => {
  const navigate = useNavigate();

  const formLogin = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(schemaValidationLogin),
  });

  const {
    formState: { errors },
    register,
  } = formLogin;
  const onSubmit = (data: ILoginUser) => {
    fetchLogin(data).then((user) => {
      if (user.isSuccess) {
        const tokens: ITokenRequest = {
          token: user.accessToken,
          refreshToken: user.refreshToken,
        };
        setAuthToken(tokens);
        const activeUser = jwtDecode<IUser>(user.accessToken);
        localStorage.activeUser = JSON.stringify(activeUser);
        navigate("/test");
        formLogin.reset();
      } else {
        formLogin.setError("password", {
          type: "manual",
          message: user.message,
        });
      }
    });
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
            color="primary"
            variant="soft"
            {...register("rememberMe")}
            label={"Remember me"}
          />
          <Button type={"submit"}>Login</Button>
          <Link className={s.link} to={"forgotPassword"}>
            Forgot password
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
