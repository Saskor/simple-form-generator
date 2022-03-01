import React from "react";
import cn from "classnames";
import {
  FormFieldOptionChangeArgs,
  SelectOption
} from "../../services/FormConstructorModel";
import { LABEL, VALUE } from "../../constants/FormConstructor";
import { ManageButtons } from "../ManageButtons";
import styles from "./FieldOption.scss";
import { Input } from "app/shared/components/Input";

export type ListItemCallback = (fieldId: string, optionId: string) => (
  event: React.MouseEvent<HTMLElement>
) => void;

type FieldOptionProps = {
  selectOption: SelectOption;
  onListItemMoveDown: ListItemCallback;
  onListItemMoveUp: ListItemCallback;
  // delete row to some model
  onListItemDelete: ListItemCallback;
  // callback that processed changes in the ListItem
  onListItemChange: (
    {
      fieldId,
      optionId,
      optionSettingKey
    }: FormFieldOptionChangeArgs
  ) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  // show delete button on the right of row controls
  showDeleteButton?: boolean;
};

export const FieldOption = (
  {
    selectOption,
    onListItemMoveDown,
    onListItemMoveUp,
    onListItemDelete,
    onListItemChange
  }: FieldOptionProps
) => {
  const {
    id: optionId,
    fieldId,
    settings: {
      label,
      value
    }
  } = selectOption;

  const onItemMoveDown = React.useCallback(
    onListItemMoveDown(fieldId, optionId),
    [ optionId ]
  );
  const onItemMoveUp = React.useCallback(
    onListItemMoveUp(fieldId, optionId),
    [ optionId ]
  );
  const onItemDelete = React.useCallback(
    onListItemDelete(fieldId, optionId),
    [ optionId ]
  );
  const onLabelChange = React.useCallback(
    onListItemChange({
      fieldId,
      optionId,
      optionSettingKey: LABEL
    }),
    [ optionId ]
  );
  const onValueChange = React.useCallback(
    onListItemChange({
      fieldId,
      optionId,
      optionSettingKey: VALUE
    }),
    [ optionId ]
  );

  return (
    <div className={cn(styles.container)}>
      <ManageButtons
        moveUp={onItemMoveUp}
        moveDown={onItemMoveDown}
        onDelete={onItemDelete}
      />
      <div className={cn(styles.inputs)}>
        <Input
          name={"label"}
          label={"Displayed value"}
          type="text"
          placeholder={"Please type the displayed value of the select option"}
          value={label}
          onChange={onLabelChange}
        />
        <Input
          name={"value"}
          label={"Value for sending to the server"}
          type="text"
          placeholder={"Please type the value for sending to the server"}
          value={value}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
};
