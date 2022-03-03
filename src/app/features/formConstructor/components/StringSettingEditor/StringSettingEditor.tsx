import React from "react";
import {
  SettingKey,
  FormItemSettingChange,
  FormItems
} from "../../services/FormConstructorModel";
import { Input } from "app/shared/components/Input";

export type StringSettingEditorProps = {
  formItemId: string;
  formItems: FormItems;
  formItemSettingChange: FormItemSettingChange;
  settingKey: string;
  value: string;
  order: number;
};

export const StringSettingEditor = (
  {
    formItemId,
    formItems,
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
        items: formItems,
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
