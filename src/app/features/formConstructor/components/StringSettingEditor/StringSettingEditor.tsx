import React from "react";
import {
  SettingKey,
  FieldSettingChange
} from "../../services/FormConstructorModel";
import { Input } from "app/shared/components/Input";

export type StringSettingEditorProps = {
  fieldId: string;
  fieldSettingChange: FieldSettingChange;
  settingKey: string;
  value: string;
  order: number;
};

export const StringSettingEditor = (
  {
    fieldId,
    fieldSettingChange,
    settingKey,
    value,
    order
  }: StringSettingEditorProps
) => {
  const onChange = React.useCallback(
    event => {
      const newValue = event.target.value;
      fieldSettingChange({
        fieldId,
        settingKey: settingKey as SettingKey,
        settingValue: newValue
      });
    },
    [ fieldId, order ]
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
