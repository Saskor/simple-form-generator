import React from "react";

export const Input = ({
  name,
  label,
  required = false,
  type,
  placeholder
}: {
  name: string,
  label: string,
  required?: boolean,
  type: "text" | "email" | "phone" | "number",
  placeholder: string
}) => (
  <label>
    {label}
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      required={required}
    />
  </label>
);
