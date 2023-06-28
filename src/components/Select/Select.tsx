import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

interface IPropsSelectSmall {
  label: string;
  field: string;
  classNameError?: string;
  errorMassage?: string;
  value?: { [key: string]: string };
}
const SelectSmall: FC<IPropsSelectSmall> = ({
  label,
  field = "",
  classNameError,
  errorMassage,
  value,
}) => {
  const [age, setAge] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const { register } = useFormContext() || {};
  return (
    <FormControl sx={{ minWidth: "100%" }} size="small">
      <InputLabel
        sx={{ color: "#949292", fontSize: 16 }}
        id="demo-select-small-label"
      >
        {label}
      </InputLabel>
      <Select
        {...register?.(field)}
        sx={{ background: "#fff" }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label={label}
        onChange={handleChange}
      >
        {value &&
          Object.values(value).map((el, index) => (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          ))}
      </Select>
      {errorMassage && <span className={classNameError}>{errorMassage}</span>}
    </FormControl>
  );
};
export default SelectSmall;
