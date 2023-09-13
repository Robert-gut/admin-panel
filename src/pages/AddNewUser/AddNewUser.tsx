import s from "./addNewUser.module.scss";
import InputGroup from "../../components/InputGroup/InnputGroup";
import { Button } from "@mui/joy";
import { FormProvider, useForm } from "react-hook-form";
import SelectSmall from "../../components/Select/Select.tsx";
import { schemaValidationAddUser } from "./schemaValidation.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "../../services/api-user-service/api-user-service.ts";
import {IRegisterUser} from "../../common/interfaces/api-user-type.ts";

export enum ESelectRole {
  Administrators = "ADMINISTRATOR",
  Users = "USER",
}

export enum ESelectSex {
  Man = "Man",
  Woman = "Woman",
}
const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  sex: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "Users"
};
export const AddNewUser = () => {
  const formAddUser = useForm({
    mode: "onTouched",
    defaultValues,
    resolver: yupResolver(schemaValidationAddUser),
  });

  const {
    formState: { errors },
  } = formAddUser;
  const onSubmit = async (data: IRegisterUser) => {
    console.log(data);

    try {
      const { response } = await register(data);
      console.log(response)
      if (!response.isSuccess) {
        formAddUser.setError("confirmPassword", {
          type: "manual",
          message: response.errors ? response?.errors[0] : ""
        });
      }
      if (response.isSuccess) {
        formAddUser.reset();
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.addUserWrapper}>
      <FormProvider {...formAddUser}>
        <form onSubmit={formAddUser.handleSubmit(onSubmit)}>
          <h3 className={s.titleForm}>Add new user</h3>
          <InputGroup
            name={"firstName"}
            id={"firstName"}
            classNameInput={"firstName"}
            placeholder={"firstName"}
            type={"text"}
            field={"firstName"}
            errorMassage={errors?.firstName?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <InputGroup
            name={"lastName"}
            id={"lastName"}
            classNameInput={"lastName"}
            placeholder={"lastName"}
            type={"text"}
            field={"lastName"}
            errorMassage={errors?.lastName?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <InputGroup
            name={"email"}
            id={"email"}
            classNameInput={"email"}
            placeholder={"Email"}
            type={"email"}
            field={"email"}
            errorMassage={errors?.email?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <InputGroup
            name={"phone"}
            id={"phone"}
            classNameInput={"phone"}
            placeholder={"phone"}
            type={"text"}
            field={"phone"}
            errorMassage={errors?.email?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <SelectSmall
            label={"sex"}
            field={"sex"}
            errorMassage={errors?.sex?.message}
            classNameError={s.error}
            value={ESelectSex}
          />
          <SelectSmall
            label={"Role"}
            field={"role"}
            errorMassage={errors?.role?.message}
            classNameError={s.error}
            value={ESelectRole}
          />
          <InputGroup
            name={"password"}
            id={"password"}
            classNameInput={"password"}
            placeholder={"Password"}
            type={"password"}
            field={"password"}
            errorMassage={errors?.password?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <InputGroup
            name={"confirmPassword"}
            id={"confirmPassword"}
            classNameInput={"confirmPassword"}
            placeholder={"Confirm password"}
            type={"password"}
            field={"confirmPassword"}
            errorMassage={errors?.confirmPassword?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <Button type={"submit"}>Add user</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddNewUser;
