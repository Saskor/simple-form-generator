import React from "react";
import cn from "classnames";
import Select, { ActionMeta, OnChangeValue } from "react-select";

import styles from "./Selector.scss";

type Option = {id: string, value: string, label: string};
type SelectProps = {
  label: string;
  value: Option;
  options: Array<Option> | undefined;
  disabled: boolean;
  onChange: (
    value: OnChangeValue<Option, false>,
    actionMeta: ActionMeta<Option>
  ) => void;
}

export const Selector = (
  {
    label,
    value,
    options,
    disabled,
    onChange
  }: SelectProps
) => (
  <div className={cn(styles.container)}>
    <label>
      {label}
      <Select
        value={value}
        onChange={onChange}
        options={options}
        isDisabled={disabled}
        menuPortalTarget={document.getElementById("portal-root")}
        menuPlacement="bottom"
        menuPosition="fixed"
      />
    </label>
  </div>
);
