import React from "react";
import { FormItems, FormItemSettingChange, SettingKey } from "../../services/FormConstructorModel";
import { Checkbox } from "app/shared/components/Checkbox";

export type BooleanSettingEditorProps = {
  formItemId: string;
  formItems: FormItems;
  formItemSettingChange: FormItemSettingChange;
  settingKey: string;
  value: boolean;
  order: number;
};


export const BooleanSettingEditor = (
  {
    formItemId,
    formItems,
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
        items: formItems,
        settingKey: settingKey as SettingKey,
        settingValue: newValue
      });
    },
    [ formItemId, order ]
  );

  return (<Checkbox
    name={settingKey}
    label={settingKey}
    checked={value}
    onChange={onChange}
  />);
};
