import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import {
  FormConstructorService,
  FormConstructorServiceType
} from "../../services/FormConstructorModel";
import { FormField } from "../FormField";
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
      <div className={cn(styles.title)}>Form fields</div>
      <div className={cn(styles.containerFieldsSettings)}>
        {fields.map(field => (
          <FormField
            key={field.id}
            field={field}
            formConstructorModel={FormConstructorService}
          />
        ))}
      </div>
      <div className={cn(styles.title)}>Form buttons</div>
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
