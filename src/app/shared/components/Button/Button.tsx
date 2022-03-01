import React from "react";
import cn from "classnames";
import styles from "./Button.scss";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  text: string;
  classNames: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Button = (
  {
    type,
    text,
    classNames,
    onClick
  }: ButtonProps
) => (
  <button
    className={cn(styles.button, classNames)}
    type={type}
    onClick={onClick}
  >
    <span>{text}</span>
  </button>
);
