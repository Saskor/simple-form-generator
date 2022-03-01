import React from "react";

export type CheckboxProps = {
  name: string;
  label: string;
  required?: boolean;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (
  {
    name,
    label,
    required = false,
    checked = false,
    onChange
  }: CheckboxProps
) => (
  <label>
    {label}
    <input
      name={name}
      required={required}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  </label>
);
