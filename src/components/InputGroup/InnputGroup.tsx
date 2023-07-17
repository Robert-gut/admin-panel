import { FC, ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Input from "@mui/joy/Input";

interface IPropsInputGroup {
  labelTitle?: ReactNode;
  type?: "text" | "number" | "email" | "password" | "checkbox";
  name?: string;
  id?: string;
  classNameInput?: string;
  classNameError?: string;
  classNameInputGroupWrapper?: string;
  errorMassage?: string;
  onClick?: () => void;
  onChange?: () => void;
  field: string; // for useForm
  error?: boolean;
  placeholder?: string;
  autoComplete: string; // для збереження полів логін і пароль в вході
}

const InputGroup: FC<IPropsInputGroup> = ({
  id,
  labelTitle,
  classNameInput,
  name,
  onChange,
  placeholder,
  onClick,
  type,
  error,
  errorMassage,
  field = "",
  classNameError,
  classNameInputGroupWrapper,
  autoComplete,
}) => {
  const { control } = useFormContext() || {}; // control це для того, аби коли в нас при виході і новому вході користувача, логін і пароль було видно для React і не потрібно було нажимати пару кліків

  return (
    <div className={classNameInputGroupWrapper}>
      <label htmlFor={id}>
        {labelTitle}
        <Controller
          control={control}
          name={field}
          render={({ field: { onChange, value } }) => (
            <Input
              type={type}
              id={id}
              className={classNameInput}
              name={name}
              placeholder={placeholder}
              onClick={onClick}
              onChange={onChange}
              value={value}
              error={error}
              autoComplete={autoComplete}
            />
          )}
        />
        {errorMassage && <p className={classNameError}>{errorMassage}</p>}
      </label>
    </div>
  );
};

export default InputGroup;