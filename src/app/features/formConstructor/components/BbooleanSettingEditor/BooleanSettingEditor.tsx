import React from "react";
import {
  FormItemsType,
  FormItemSettingChange,
  SettingKey
} from "../../services/FormConstructorModel";
import { Checkbox } from "app/shared/components/Checkbox";

export type BooleanSettingEditorProps = {
  formItemId: string;
  formItemsType: FormItemsType;
  formItemSettingChange: FormItemSettingChange;
  settingKey: string;
  value: boolean;
  order: number;
};


export const BooleanSettingEditor = (
  {
    formItemId,
    formItemsType,
    formItemSettingChange,
    settingKey,
    value,
    order
  }: BooleanSettingEditorProps
) => {
  const onChange = React.useCallback(
    event => {
      const newValue = event.target.checked;
      formItemSettingChange({
        formItemId,
        formItemsType,
        settingKey: settingKey as SettingKey,
        settingValue: newValue
      });
    },
    [ settingKey ]
  );

  return (<Checkbox
    name={settingKey}
    label={settingKey}
    checked={value}
    onChange={onChange}
  />);
};
