import React from "react";

export const Input = ({
  name,
  label,
  required = false,
  type,
  placeholder,
  value
}: {
  name: string,
  label: string,
  required?: boolean,
  type: "text" | "email" | "phone" | "number",
  placeholder: string
  value: string
}) => (
  <label>
    {label}
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      required={required}
      value={value}
    />
  </label>
);
