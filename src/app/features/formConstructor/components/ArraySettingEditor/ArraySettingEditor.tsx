import React from "react";
import cn from "classnames";
import {
  FieldOption,
  ListItemCallback
} from "../FieldOption";
import {
  FormFieldOptionChangeArgs,
  SelectOption
} from "../../services/FormConstructorModel";
import { Button } from "../../../../shared/components/Button";
import styles from "./ArraySettingEditor.scss";


type ArraySettingEditorProps = {
  fieldId: string
  listItems: Array<SelectOption>;
  // add item to some model
  onListItemAdd: (fieldId: string) => (
    event: React.MouseEvent<HTMLElement>
  ) => void;
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
  title?: string;
};

export const ArraySettingEditor = (
  {
    fieldId,
    listItems,
    onListItemAdd,
    onListItemMoveDown,
    onListItemMoveUp,
    onListItemDelete,
    onListItemChange,
    showDeleteButton,
    title
  }: ArraySettingEditorProps
) => {
  const onAddItem = React.useCallback(onListItemAdd(fieldId), [ fieldId ]);


  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.title)}>
        {"Select options" || title}
      </div>
      {
        listItems.map(selectOption => {
          const { id: optionId } = selectOption;

          return (
            <FieldOption
              key={optionId}
              selectOption={selectOption}
              onListItemMoveDown={onListItemMoveDown}
              onListItemMoveUp={onListItemMoveUp}
              onListItemDelete={onListItemDelete}
              onListItemChange={onListItemChange}
              showDeleteButton={showDeleteButton}
            />
          );
        })
      }
      <Button
        type={"button"}
        text="Add option"
        classNames={cn(styles.deleteButton)}
        onClick={onAddItem}
      />
    </div>
  );
};
