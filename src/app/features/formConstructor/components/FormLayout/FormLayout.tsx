import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import {
  FormConstructorServiceType,
  FormItem,
  SettingValue
} from "../../services/FormConstructorModel";
import { FORM_ITEMS_RENDER_COMPONENT_BY_ITEM_TYPE, VALUE } from "../../constants/FormConstructor";
import styles from "./FormLayout.scss";

export const FormLayout = observer((
  {
    formConstructorModel
  }: {
    formConstructorModel: FormConstructorServiceType
  }
) => {
  const {
    fields,
    buttons
  } = formConstructorModel;

  const mapCallback = (field: FormItem) => {
    const {
      id,
      fieldType,
      settings
    } = field;
    const Component = FORM_ITEMS_RENDER_COMPONENT_BY_ITEM_TYPE[fieldType];
    const props: { [key: string]: SettingValue } = {};

    const settingsKeys = Object.keys(settings);
    for (let i = 0; i < settingsKeys.length; i++) {
      const key = settingsKeys[i];
      props[key] = settings[key][VALUE];
    }

    return (
      <Component key={id} {...props} />
    );
  };


  return (
    <div className={cn(styles.formItemsContainer)}>
      <div className={cn(styles.fields)}>
        {fields.map(mapCallback)}
      </div>
      <div className={cn(styles.buttons)}>
        {buttons.map(mapCallback)}
      </div>
    </div>
  );
});
