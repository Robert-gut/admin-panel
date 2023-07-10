import s from "./addNewUser.module.scss";
import InputGroup from "../../components/InputGroup/InnputGroup";
import { Button } from "@mui/joy";
import { FormProvider, useForm } from "react-hook-form";
import { IRegister } from "./types.ts";
import SelectSmall from "../../components/Select/Select.tsx";
import { schemaValidationAddUser } from "./schemaValidation.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "../../services/api-user-service/api-user-service.ts";

enum ESelectRole {
  Administrators = "Administrators",
  Users = "Users",
}
const defaultValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
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
  const onSubmit = async (data: IRegister) => {
    try {
      const { response } = await register(data);
      if (!response.isSuccess) {
        formAddUser.setError("confirmPassword", {
          type: "manual",
          message: response.errors[0],
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
            name={"name"}
            id={"name"}
            classNameInput={"name"}
            placeholder={"Name"}
            type={"text"}
            field={"name"}
            errorMassage={errors?.name?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
          />
          <InputGroup
            name={"surname"}
            id={"surname"}
            classNameInput={"surname"}
            placeholder={"Surname"}
            type={"text"}
            field={"surname"}
            errorMassage={errors?.surname?.message}
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
