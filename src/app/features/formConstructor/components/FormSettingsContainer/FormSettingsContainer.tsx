import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import ReactDOMServer from "react-dom/server";
import {
  FormConstructorService,
  FormConstructorServiceType
} from "../../services/FormConstructorModel";
import { FormItemEditor } from "../FormItemEditor";
import {
  FIELD_TYPE_SELECTOR_OPTIONS,
  BUTTON_TYPE_SELECTOR_OPTIONS
} from "../../constants/FormConstructor";
import { FormLayout } from "../FormLayout";
import styles from "./FormSettingsContainer.scss";
import { Button } from "app/shared/components/Button";

export const FormSettingsContainer = observer((
  { formConstructorModel }: { formConstructorModel: FormConstructorServiceType }
) => {
  const {
    fields,
    buttons,
    fieldAdd,
    buttonAdd,
    formLayout
  } = formConstructorModel;

  const saveFormToFile = React.useCallback(
    () => {
      const formLayoutString = ReactDOMServer.renderToStaticMarkup(
        <FormLayout
          formConstructorModel={formConstructorModel}
          exportMode
        />
      );
      // create blob
      const myBlob = new Blob(
        [ formLayoutString ],
        { type: "text/plain" }
      );

      // create download link
      const url = window.URL.createObjectURL(myBlob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "form.html";

      // force download
      anchor.click();
      window.URL.revokeObjectURL(url);
      document.removeChild(anchor);
    },
    [ formLayout ]
  );

  return (
    <div className={cn(styles.container)}>
      {fields.length > 0 && (
        <React.Fragment>
          <div className={cn(styles.title)}>Form fields</div>
          <div className={cn(styles.containerFieldsSettings)}>
            {fields.map(field => (
              <FormItemEditor
                key={field.id}
                formItem={field}
                formItems={fields}
                formItemsType="fields"
                formConstructorModel={FormConstructorService}
                formItemTypeSelectorOptions={FIELD_TYPE_SELECTOR_OPTIONS}
              />
            ))}
          </div>
        </React.Fragment>
        )}
      {buttons.length > 0 && (
        <React.Fragment>
          <div className={cn(styles.title)}>Form buttons</div>
          <div className={cn(styles.containerFieldsSettings)}>
            {buttons.map(button => (
              <FormItemEditor
                key={button.id}
                formItem={button}
                formItems={buttons}
                formItemsType="buttons"
                formConstructorModel={FormConstructorService}
                formItemTypeSelectorOptions={BUTTON_TYPE_SELECTOR_OPTIONS}
              />
            ))}
          </div>
        </React.Fragment>
        )}
      <div className={cn(styles.containerAddButtons)}>
        <Button
          type={"button"}
          text="Add field"
          classNames={cn(styles.addButton)}
          onClick={fieldAdd}
        />
        <Button
          type={"button"}
          text="Add button"
          classNames={cn(styles.addButton)}
          onClick={buttonAdd}
        />

        <Button
          type={"button"}
          text="Export form"
          classNames={cn(styles.addButton)}
          onClick={saveFormToFile}
        />
      </ div>
    </ div>
  );
});
