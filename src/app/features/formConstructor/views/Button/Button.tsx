import React from "react";
import cn from "classnames";
import styles from "./Button.scss";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  text: string;
  classNames: string;
};

export const Button = (
  {
    type,
    text,
    classNames
  }: ButtonProps
) => (
  <button
    className={cn(styles.button, classNames)}
    type={type}
  >
    <span>{text}</span>
  </button>
);
