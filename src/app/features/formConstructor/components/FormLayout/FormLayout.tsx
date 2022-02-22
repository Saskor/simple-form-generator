import React from "react";
import { observer } from "mobx-react";
import { FormConstructorServiceType } from "../../services/FormConstructorModel";
import { styles } from "./FormLayout.scss";

export const FormLayout = observer((
  {
    formConstructorModel
  }: {
    formConstructorModel: FormConstructorServiceType
  }
) => (
  <div>234</div>
));
