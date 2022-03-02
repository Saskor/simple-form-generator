import React from "react";
import cn from "classnames";
import {
  FieldOption
} from "../FieldOption";
import {
  SelectOption,
  FormConstructorService
} from "../../services/FormConstructorModel";
import { Button } from "../../../../shared/components/Button";
import styles from "./ArraySettingEditor.scss";


type ArraySettingEditorProps = {
  fieldId: string
  listItems: Array<SelectOption>;
  // show delete button on the right of row controls
  showDeleteButton?: boolean;
  title?: string;
};

export const ArraySettingEditor = (
  {
    fieldId,
    listItems,
    showDeleteButton,
    title
  }: ArraySettingEditorProps
) => {
  const onAddItem = React.useCallback(
    (
      event: React.MouseEvent<HTMLElement>
    ): void => FormConstructorService.optionAdd(fieldId),
    [ fieldId ]
  );


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
