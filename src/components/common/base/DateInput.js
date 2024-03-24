import React, { forwardRef } from "react";
import TextField from '@mui/material/TextField';

const FormInput = forwardRef(({
  onChange,
  disabled,
  placeholder,
  value,
  error,
  type,
  defaultValue,
  ...rest
}, ref) => {
  return (
    <>
      <TextField
        style={{ width: "100%" }}
        type="date"
        value={value}
        ref={ref}
        label={placeholder}
        onChange={onChange}
        disabled={disabled}
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <p className="text-red-600 font-Roboto text-[12px] mt-2">{error}</p>}
    </>
  );
});

export default FormInput;