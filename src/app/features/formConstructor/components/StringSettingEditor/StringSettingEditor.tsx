import React from "react";
import {
  SettingKey,
  FormItemSettingChange,
  FormItemsType
} from "../../services/FormConstructorModel";
import { Input } from "app/shared/components/Input";

export type StringSettingEditorProps = {
  formItemId: string;
  formItemsType: FormItemsType;
  formItemSettingChange: FormItemSettingChange;
  settingKey: string;
  value: string;
  order: number;
};

export const StringSettingEditor = (
  {
    formItemId,
    formItemsType,
    formItemSettingChange,
    settingKey,
    value,
    order
  }: StringSettingEditorProps
) => {
  const onChange = React.useCallback(
    event => {
      const newValue = event.target.value;
      formItemSettingChange({
        formItemId,
        formItemsType,
        settingKey: settingKey as SettingKey,
        settingValue: newValue
      });
    },
    [ formItemId, order ]
  );

  return (<Input
    name={settingKey}
    label={settingKey}
    type="text"
    placeholder={`please type the ${settingKey}`}
    value={value}
    onChange={onChange}
  />);
};
