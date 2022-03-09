import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import ReactDOMServer from "react-dom/server";
import {
  FormConstructorServiceType,
  FormItem,
  SettingValue
} from "../../services/FormConstructorModel";
import {
  FORM_ITEMS_RENDER_COMPONENT_BY_ITEM_TYPE,
  VALUE
} from "../../constants/FormConstructor";
import { FormStyles } from "../../constants/FormStyles";
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
    buttons,
    getFormStylesString,
    updateFormLayout
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
      [ "button", "submit" ].includes(fieldType)
        ? (
          <React.Fragment>
            {/*
              // @ts-ignore */}
            <Component key={id} {...props} />
          </React.Fragment>
        )
        : (
          <div key={id} className="form-1f0ad824-cbcf83aba5ac-field">
            {/*
            // @ts-ignore */}
            <Component {...props} />
          </div>
        )
    );
  };

  const form = (
    <form>
      <style
        dangerouslySetInnerHTML={{ __html: getFormStylesString(FormStyles) }}
      />
      <div className={cn(styles.formItemsContainer)}>
        <div className={cn(styles.fields)}>
          {fields.map(mapCallback)}
        </div>
        <div className={cn(styles.buttons)}>
          {buttons.map(mapCallback)}
        </div>
      </div>
    </form>
  );

  React.useEffect(() => {
    const formString = ReactDOMServer.renderToStaticMarkup(form);
    updateFormLayout(formString);
  }, [ fields.length, buttons.length ]);

  return form;
});
