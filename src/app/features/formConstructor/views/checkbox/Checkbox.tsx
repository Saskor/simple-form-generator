import React from "react";

export const Checkbox = (
  {
    name,
    label,
    required = false
  }
: {
  name: string,
  label: string,
  required?: boolean
}
) => (
  <label>
    {label}
    <input name={name} required={required} type="checkbox" />
  </label>
);
