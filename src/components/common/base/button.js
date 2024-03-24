import React from "react";
import { RiseLoader } from 'react-spinners';

const getColor = (variant, disabled) => {
  if (disabled) {
    return "#eaeaea";
  }
  if (variant === "primary") {
    return "#668968";
  }
  if (variant === "outline") {
    return "#FFFFFF";
  }
  if (variant === "warning") {
    return "#E61E4D";
  }
  if (variant === "success") {
    return "#3C6996";
  }
  if (variant === "delete") {
    return "#FA3940";
  }
  if (variant === "secondary") {
    return "#cc9441";
  }
  if (variant === "dim") {
    return "#eaeaea";
  }
  if (variant === "black") {
    return "#000000";
  }
  return "#000000";
};

export function Button({
  value,
  icon,
  show,
  disabled,
  loader,
  variant,
  width,
  height,
  font,
  type,
  onClick,
  ...rest
}) {
  return (
    <button
      {...rest}
      className={`inline-flex justify-center ${
        variant === "outline" ? "text-primary" : "text-white"
      } font-Roboto items-center rounded-lg font-[600]	text-lg  w-full  hover:bg-['#05484F'] hover:font-bold hover:shadow-btn`}
      style={{
        background: getColor(variant || "primary", disabled || false),
        width: `${width}px`,
        height: `${height}px`,
        fontFamily: font,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {!loader ? value : <RiseLoader color="#668968" size={14} />}
    </button>
  );
}
