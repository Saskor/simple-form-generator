import React, { ReactElement } from "react";
import cn from "classnames";
import styles from "./EditableListItem.scss";
import { Button } from "app/features/formConstructor/views/button/Button";

export type ListItemCallback = (id: string) => void;
export type ListItemData = {id: string};
export type ListItemChildren = (
  {
    listItemData,
    onChangeListItem,
    sharedData
  }: {
    listItemData: ListItemData,
    onChangeListItem: ListItemCallback,
    sharedData: any
  }
) => ReactElement;


type EditableListItemProps = {
  listItemData: ListItemData,
  onDeleteListItem: ListItemCallback,
  listItemChildren: ListItemChildren
  onChangeListItem: ListItemCallback,
  sharedData: any,
  showDeleteButton: boolean
}

export const EditableListItem = (
  {
    listItemData,
    onDeleteListItem,
    listItemChildren,
    onChangeListItem,
    sharedData,
    showDeleteButton
  }: EditableListItemProps
) => {
  const onDelete = React.useCallback(
    () => onDeleteListItem(listItemData.id), [ listItemData.id ]
  );

  return (
    <div className={cn(styles.container)}>
      {listItemChildren({ listItemData, onChangeListItem, sharedData })}
      {showDeleteButton
      && <Button
        type={"button"}
        text="Delete"
        classNames={cn(styles.deleteButton)}
        onClick={onDelete}
      />}
    </div>
  );
};
