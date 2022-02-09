import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

import React from "react";
import { useController } from "react-hook-form";

function SelectField({ control, name, lable, disabled, options , sx }) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      variant="outlined"
      fullWidth={true}
      disabled={disabled}
      error={invalid}
      
    >
      <InputLabel id={`${name}_lable`}>{lable}</InputLabel>
      <Select
        labelId={`${name}_lable`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={lable}
        sx = {sx}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem value={option.value} key={option.value}>
              {option.lable}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{ error?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectField;