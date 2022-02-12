import React from "react";

export const Button = (
  {
    type,
    text
  }: {
  type?: "button" | "submit",
  text: string
}
) => (
  <button {...type && { type }}>
    <span>{text}</span>
  </button>
);
