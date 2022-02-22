import React from "react";
import cn from "classnames";
import { Button } from "../../views/button/Button";
import { Field, FieldCallback, FieldSettingChange } from "../../services/FormConstructorModel";
import styles from "./FormSettingsField.scss";
import { Selector } from "app/shared/components/Selector";

export const FormSettingsField = (
  {
    field,
    fieldSettingChange,
    fieldDelete,
    fieldMoveUp,
    fieldMoveDown
  }: {
    field: Field,
    fieldSettingChange: FieldSettingChange,
    fieldDelete: FieldCallback,
    fieldMoveUp: FieldCallback,
    fieldMoveDown: FieldCallback
  }
) => {

  const [
    editFormShow,
    setEditFormShow
  ] = React.useState<boolean>(false);

  const moveUp = React.useCallback(
    () => fieldMoveUp(field.id), [ field.id ]
  );
  const moveDown = React.useCallback(
    () => fieldMoveDown(field.id), [ field.id ]
  );
  const toggleEdit = React.useCallback(
    () => setEditFormShow(!editFormShow), [ field.id ]
  );
  const onDelete = React.useCallback(
    () => fieldDelete(field.id), [ field.id ]
  );

  return (
    <div className={cn(styles.field)} key={field.id}>
      <div className={cn(styles.fieldManageButtons)}>
        <Button
          type={"button"}
          text="Up"
          classNames={cn(styles.fieldButton)}
          onClick={moveUp}
        />

        <Button
          type={"button"}
          text="Down"
          classNames={cn(styles.fieldButton)}
          onClick={moveDown}
        />

        <Button
          type={"button"}
          text="Edit"
          classNames={cn(styles.fieldButton)}
          onClick={toggleEdit}
        />

        <Button
          type={"button"}
          text="Delete"
          classNames={cn(styles.fieldButton)}
          onClick={onDelete}
        />
      </div>
      <Selector
        label="Field type"
        value={}
        options={}
        onChange={}
      />
    </div>
  );
};
