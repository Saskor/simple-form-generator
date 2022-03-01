import React from "react";
import cn from "classnames";
import styles from "./ManageButtons.scss";
import { Button } from "app/shared/components/Button";

type Callback = (event: React.MouseEvent<HTMLElement>) => void;
type ManageButtonsProps = {
  moveUp: Callback;
  moveDown: Callback;
  toggleEdit?: Callback;
  showToggleEditButton?: boolean;
  onDelete: Callback;
};

export const ManageButtons = (
  {
    moveUp,
    moveDown,
    toggleEdit,
    showToggleEditButton,
    onDelete
  }: ManageButtonsProps
) => (
  <div className={cn(styles.manageButtons)}>
    <Button
      type={"button"}
      text="Up"
      classNames={cn(styles.button)}
      onClick={moveUp}
    />

    <Button
      type={"button"}
      text="Down"
      classNames={cn(styles.button)}
      onClick={moveDown}
    />

    {showToggleEditButton && toggleEdit && (
      <Button
        type={"button"}
        text="Edit"
        classNames={cn(styles.button)}
        onClick={toggleEdit}
      />
    )}

    <Button
      type={"button"}
      text="Delete"
      classNames={cn(styles.button)}
      onClick={onDelete}
    />
  </div>
);
