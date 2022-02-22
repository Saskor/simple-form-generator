import React from "react";
import cn from "classnames";
import {
  FormConstructorService
} from "../../services/FormConstructorModel";
import { FormSettings } from "../FormSettings";
import { FormLayout } from "../FormLayout";
import styles from "./FormConstructor.scss";

export const FormConstructor = () => (
  <div className={cn(styles.container)} >
    <div className={cn(styles.settings)}>
      <FormSettings formConstructorModel={FormConstructorService} />
    </div>
    <div className={cn(styles.layout)}>
      <FormLayout formConstructorModel={FormConstructorService} />
    </div>
  </div>
);
