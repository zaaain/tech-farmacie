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
  label,
  id,
  ...rest
}, ref) => {



  const handleKeyDown = (event) => {
    if(!id || id !== "percentage") return
    const value = event.target.value;
    const keyCode = event.keyCode;
    const regex = /^(?:100|\d{0,2})$/; // Updated regex to allow empty string or 1-2 digits
    const allowedKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 37, 39, 46, 13];

    if (!allowedKeys.includes(keyCode)) {
        event.preventDefault();
    }

    // Allow backspace (keyCode 8)
    if (keyCode === 8) {
        return;
    }

    if (!regex.test(value + String.fromCharCode(keyCode))) {
        event.preventDefault();
    }
}



  return (
    <>
      <TextField
        style={{ width: "100%"}}
        type={type}
        value={value}
        ref={ref}
        label={placeholder}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      {error && <p className="text-red-600 font-Roboto text-[12px] mt-2">{error}</p>}
    </>
  );
});

export default FormInput;
