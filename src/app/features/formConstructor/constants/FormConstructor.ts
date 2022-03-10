import type {
  InputSettings,
  CheckBoxSettings,
  SelectSettings,
  SelectOptionSettings,
  ButtonSettings, FormItemTypeSelectorOption
} from "../services/FormConstructorModel";

import { Input } from "../views/Input";
import { Select } from "../views/Select";
import { Checkbox } from "../views/Checkbox";
import { Button } from "../views/Button";

export const SETTINGS = "settings";
export const OPTIONS = "options";
export const FIELD_TYPE = "fieldType";
export const LABEL = "label";
export const VALUE = "value";
export const CHECKED = "checked";

export const DEFAULT_INPUT_SETTINGS: InputSettings = {
  name: { order: 0, value: "" },
  label: { order: 1, value: "" },
  placeholder: { order: 2, value: "" },
  required: { order: 3, value: false },
  value: { order: 4, value: "" }
};

export const DEFAULT_CHECKBOX_SETTINGS: CheckBoxSettings = {
  name: { order: 0, value: "" },
  label: { order: 1, value: "" },
  required: { order: 2, value: false },
  checked: { order: 3, value: false }
};

export const DEFAULT_SELECT_SETTINGS: SelectSettings = {
  name: { order: 0, value: "" },
  label: { order: 1, value: "" },
  options: {
    order: 2,
    value: []
  },
  required: { order: 3, value: false }
};

export const DEFAULT_SELECT_OPTION_SETTINGS: SelectOptionSettings = {
  label: "",
  value: ""
};

export const DEFAULT_BUTTON_SETTINGS: ButtonSettings = {
  text: { order: 0, value: "" }
};

export const FIELD_TYPE_SELECTOR_OPTIONS: Array<FormItemTypeSelectorOption> = [
  { label: "Text", value: "text" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Number", value: "number" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Select", value: "select" }
];

export const BUTTON_TYPE_SELECTOR_OPTIONS: Array<FormItemTypeSelectorOption> = [
  { label: "Submit", value: "submit" },
  { label: "Button", value: "button" }
];

export const DEFAULT_FORM_ITEMS_SETTINGS_BY_ITEM_TYPE = {
  text: DEFAULT_INPUT_SETTINGS,
  email: DEFAULT_INPUT_SETTINGS,
  phone: DEFAULT_INPUT_SETTINGS,
  number: DEFAULT_INPUT_SETTINGS,
  checkbox: DEFAULT_CHECKBOX_SETTINGS,
  select: DEFAULT_SELECT_SETTINGS,

  button: DEFAULT_BUTTON_SETTINGS,
  submit: DEFAULT_BUTTON_SETTINGS
};

export const FORM_ITEMS_RENDER_COMPONENT_BY_ITEM_TYPE = {
  text: Input,
  email: Input,
  phone: Input,
  number: Input,

  checkbox: Checkbox,

  select: Select,

  button: Button,
  submit: Button
};


