import React from "react";
import cn from "classnames";
import styles from "./Input.scss";

export type InputProps = {
  name: string;
  label: string;
  required?: boolean;
  type: "text" | "email" | "phone" | "number";
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (
  {
    name,
    label,
    required = false,
    type,
    placeholder,
    value,
    onChange
  }: InputProps
) => (
  <label>
    {label}
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
    />
  </label>
);
