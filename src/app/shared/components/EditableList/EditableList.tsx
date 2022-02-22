import React from "react";
import cn from "classnames";
import { Button } from "../../../features/formConstructor/views/button/Button";
import {
  EditableListItem,
  ListItemCallback,
  ListItemData,
  ListItemChildren
} from "../EditableListItem";
import styles from "./EditableList.scss";

type EditableListProps = {
  listItems: Array<ListItemData>;
  // add item to some model
  onAddListItem: () => void;
  // delete row to some model
  onDeleteListItem: ListItemCallback;
  // callback that processed changes in the ListItem
  onChangeListItem: ListItemCallback;
  // data which can be used in any row
  sharedData: any;
  // show delete button on the right of row controls
  showDeleteButton: boolean;

  /*
   * component that will be rendered in every ListItem
   * ListItem => React.Element (function that receives row and return react element)
   */
  listItemChildren: ListItemChildren;
  title: string;
};

export const EditableList = ({
  listItems,
  onAddListItem,
  onDeleteListItem,
  onChangeListItem,
  sharedData,
  showDeleteButton = true,
  listItemChildren,
  title
}: EditableListProps) => (
  <div className={cn(styles.container)}>
    <div className={cn(styles.title)}>{title}</div>
    {
      listItems.map(listItemData => (
        <EditableListItem
          key={listItemData.id}
          listItemData={listItemData}
          onDeleteListItem={onDeleteListItem}
          listItemChildren={listItemChildren}
          onChangeListItem={onChangeListItem}
          sharedData={sharedData}
          showDeleteButton={showDeleteButton}
        />
      ))
    }
    <Button
      type={"button"}
      text="Delete"
      classNames={cn(styles.deleteButton)}
      onClick={onAddListItem}
    />
  </div>
);
