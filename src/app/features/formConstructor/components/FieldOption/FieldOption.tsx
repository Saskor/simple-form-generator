import React from "react";
import cn from "classnames";
import {
  FormFieldOptionChangeArgs,
  SelectOption,
  FormConstructorService
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
  // show delete button on the right of row controls
  showDeleteButton?: boolean;
};

export const FieldOption = (
  { selectOption }: FieldOptionProps
) => {
  const {
    optionMoveDown,
    optionMoveUp,
    optionDelete,
    optionSettingChange
  } = FormConstructorService;

  const {
    id: optionId,
    fieldId,
    settings: {
      label,
      value
    }
  } = selectOption;

  const onItemMoveDown = React.useCallback(
    (
      event: React.MouseEvent<HTMLElement>
    ) => optionMoveDown(fieldId, optionId),
    [ optionId ]
  );
  const onItemMoveUp = React.useCallback(
    (
      event: React.MouseEvent<HTMLElement>
    ) => optionMoveUp(fieldId, optionId),
    [ optionId ]
  );
  const onItemDelete = React.useCallback(
    (
      event: React.MouseEvent<HTMLElement>
    ) => optionDelete(fieldId, optionId),
    [ optionId ]
  );
  const onLabelChange = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) => optionSettingChange({
      fieldId,
      optionId,
      optionSettingKey: LABEL,
      optionSettingValue: event.target.value
    }),
    [ optionId ]
  );
  const onValueChange = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) => optionSettingChange({
      fieldId,
      optionId,
      optionSettingKey: VALUE,
      optionSettingValue: event.target.value
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
