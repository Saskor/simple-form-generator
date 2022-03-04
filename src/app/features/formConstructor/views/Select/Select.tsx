import React from "react";
import { SelectOption } from "../../services/FormConstructorModel";

export const Select = ({
  name,
  label: labelText,
  required = false,
  options
}: {
  name: string,
  label: string,
  required?: boolean,
  options: Array<SelectOption>
}) => (
  <label>
    {labelText}
    <select name={name} required={required}>
      {options.map(({ id, settings: { label, value } }) => (
        <option key={id} value={value}>
          {label}
        </option>
      ))}
    </select>
  </label>
);
