import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import { FormConstructorServiceType } from "../../services/FormConstructorModel";
import { Button } from "../../views/button/Button";
import { FormSettingsField } from "../FormSettingsField";
import styles from "./FormSettings.scss";

export const FormSettings = observer((
  { formConstructorModel }: { formConstructorModel: FormConstructorServiceType }
) => {
  const {
    fields,
    fieldAdd,
    fieldSettingChange,
    fieldDelete,
    itemShiftBackward,
    itemShiftForward
  } = formConstructorModel;

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.containerFieldsSettings)}>
        {fields.map(field => (
          <FormSettingsField
            key={field.id}
            field={field}
            fieldSettingChange={fieldSettingChange}
            fieldDelete={fieldDelete}
            fieldMoveUp={itemShiftBackward}
            fieldMoveDown={itemShiftForward}
          />
        ))}
      </div>
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
          onClick={fieldAdd}
        />
      </ div>
    </ div>
  );
});
