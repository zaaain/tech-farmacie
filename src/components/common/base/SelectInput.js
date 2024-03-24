import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";


const CustomSelect = ({ onChange, value, options, placeholder, disabled, error }) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-label">{placeholder}</InputLabel>
        <Select
          labelId="select-label"
          value={value}
          onChange={onChange}
          label={placeholder}
          disabled={disabled}
        >
          {options && options.length > 0 && options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <p className="text-red-600 font-Roboto text-[12px] mt-2">{error}</p>}
      </>
  );
};

export default CustomSelect;
