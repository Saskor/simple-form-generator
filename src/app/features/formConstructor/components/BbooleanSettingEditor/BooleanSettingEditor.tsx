import React from "react";
import { FieldSettingChange, SettingKey } from "../../services/FormConstructorModel";
import { Checkbox } from "app/shared/components/Checkbox";

export type BooleanSettingEditorProps = {
  fieldId: string;
  fieldSettingChange: FieldSettingChange;
  settingKey: string;
  value: boolean;
  order: number;
};


export const BooleanSettingEditor = (
  {
    fieldId,
    fieldSettingChange,
    settingKey,
    value,
    order
  }: BooleanSettingEditorProps
) => {
  const onChange = React.useCallback(
    event => {
      const newValue = event.target.checked;
      fieldSettingChange({
        fieldId,
        settingKey: settingKey as SettingKey,
        settingValue: newValue
      });
    },
    [ fieldId, order ]
  );

  return (<Checkbox
    name={settingKey}
    label={settingKey}
    checked={value}
    onChange={onChange}
  />);
};
