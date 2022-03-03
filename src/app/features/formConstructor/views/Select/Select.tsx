import React from "react";

type Option = {
  label: string,
  value: string
};

export const Select = ({
  name,
  label: labelText,
  required = false,
  options
}: {
  name: string,
  label: string,
  required?: boolean,
  options: Array<Option>
}) => (
  <label>
    {labelText}
    <select name={name} required={required}>
      {options.map(({ label, value }) => (
        <option value={value}>
          {label}
        </option>
      ))}
    </select>
  </label>
);
