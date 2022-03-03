import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import { FormConstructorServiceType, FormItem } from "../../services/FormConstructorModel";
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
    const props = {};

    for (const key in settings) {
      if (settings[key]) {
        props[key] = settings[key][VALUE];
      }
    }

    return (
      <Component key={id} {...props} />
    );
  };


  return (
    <div>
      {fields.map(mapCallback)}
      {buttons.map(mapCallback)}
    </div>
  );
});
