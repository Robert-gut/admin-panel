import { FC, ReactNode } from "react";
import Input from "@mui/joy/Input";
import { useFormContext } from "react-hook-form";

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
  field: string; //for useForm
  error?: boolean;
  placeholder?: string;
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
}) => {
  const { register } = useFormContext() || {};
  return (
    <div className={classNameInputGroupWrapper}>
      <label htmlFor={id}>
        {labelTitle}
        <Input
          {...register?.(field)}
          type={type}
          id={id}
          className={classNameInput}
          name={name}
          placeholder={placeholder}
          onClick={onClick}
          onChange={onChange}
          error={error}
        />
        {errorMassage && <span className={classNameError}>{errorMassage}</span>}
      </label>
    </div>
  );
};

export default InputGroup;
