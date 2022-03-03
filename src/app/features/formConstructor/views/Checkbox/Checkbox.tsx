import React from "react";

export const Checkbox = (
  {
    name,
    label,
    required = false,
    checked
  }
: {
  name: string,
  label: string,
  required?: boolean,
  checked: boolean
}
) => (
  <label>
    {label}
    <input
      checked={checked}
      name={name}
      required={required}
      type="checkbox"
    />
  </label>
);
