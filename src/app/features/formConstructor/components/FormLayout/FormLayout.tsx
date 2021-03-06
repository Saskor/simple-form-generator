import React from "react";
import { observer } from "mobx-react";
import ReactDOMServer from "react-dom/server";
import {
  FormConstructorServiceType,
  FormItem,
  SettingValue
} from "../../services/FormConstructorModel";
import {
  FORM_ITEMS_RENDER_COMPONENT_BY_ITEM_TYPE,
  VALUE,
  CHECKED
} from "../../constants/FormConstructor";
import { FormStyles } from "../../constants/FormStyles";

export const FormLayout = observer((
  {
    formConstructorModel,
    exportMode
  }: {
    formConstructorModel: FormConstructorServiceType,
    exportMode?: boolean
  }
) => {
  const {
    fields,
    buttons,
    getFormStylesString
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
      // reset values of inputs and checkboxes during exporting form
      if (exportMode && [ VALUE, CHECKED ].includes(settingsKeys[i])) {
        continue;
      }

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

  const Form = () => (
    <form>
      <style
        dangerouslySetInnerHTML={{ __html: getFormStylesString(FormStyles) }}
      />
      <div className="form-1f0ad824-cbcf83aba5ac-form-items-container">
        <div className="form-1f0ad824-cbcf83aba5ac-fields">
          {fields.map(mapCallback)}
        </div>
        <div className="form-1f0ad824-cbcf83aba5ac-buttons">
          {buttons.map(mapCallback)}
        </div>
      </div>
    </form>
  );

  return (
    <form>
      <style
      dangerouslySetInnerHTML={{ __html: getFormStylesString(FormStyles) }}
    />
      <div className="form-1f0ad824-cbcf83aba5ac-form-items-container">
        <div className="form-1f0ad824-cbcf83aba5ac-fields">
          {fields.map(mapCallback)}
        </div>
        <div className="form-1f0ad824-cbcf83aba5ac-buttons">
          {buttons.map(mapCallback)}
        </div>
      </div>
    </form>
  );
});
