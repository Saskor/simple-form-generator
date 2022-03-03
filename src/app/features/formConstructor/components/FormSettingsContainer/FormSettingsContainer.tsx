import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import {
  FormConstructorService,
  FormConstructorServiceType
} from "../../services/FormConstructorModel";
import { FormItemEditor } from "../FormItemEditor";
import {
  FIELD_TYPE_SELECTOR_OPTIONS,
  BUTTON_TYPE_SELECTOR_OPTIONS
} from "../../constants/FormConstructor";
import styles from "./FormSettingsContainer.scss";
import { Button } from "app/shared/components/Button";

export const FormSettingsContainer = observer((
  { formConstructorModel }: { formConstructorModel: FormConstructorServiceType }
) => {
  const {
    fields,
    buttons,
    fieldAdd,
    buttonAdd
  } = formConstructorModel;

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
      </ div>
    </ div>
  );
});
