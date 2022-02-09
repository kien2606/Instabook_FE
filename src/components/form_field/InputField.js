import React from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

function InputField({ control, name, label, id, ...inputProps }) {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  return (
    <TextField
      {...inputProps}
      id={id}
      label={label}
      variant="standard"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={error?.message}
      error={invalid}
      inputRef={ref}
    />
  );
}
export default InputField;
