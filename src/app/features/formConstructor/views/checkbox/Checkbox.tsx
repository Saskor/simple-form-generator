import React from "react";

export const Checkbox = (
  {
    name,
    label,
    required
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
