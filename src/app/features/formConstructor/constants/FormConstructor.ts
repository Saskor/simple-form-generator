import type {
  InputSettings,
  CheckBoxSettings,
  SelectSettings,
  SelectOptionSettings,
  ButtonSettings
} from "../services/FormConstructorModel";

export const SETTINGS = "settings";
export const OPTIONS = "options";
export const FIELD_TYPE = "fieldType";
export const LABEL = "label";
export const VALUE = "value";

export const DEFAULT_INPUT_SETTINGS: InputSettings = {
  name: { order: 0, value: "" },
  label: { order: 1, value: "" },
  placeholder: { order: 2, value: "" },
  required: { order: 3, value: false }
};

export const DEFAULT_CHECKBOX_SETTINGS: CheckBoxSettings = {
  name: { order: 0, value: "" },
  label: { order: 1, value: "" },
  checked: { order: 2, value: false },
  required: { order: 3, value: false }
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

export const FIELD_TYPE_SELECTOR_OPTIONS = [
  { label: "Text", value: "text" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Number", value: "number" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Select", value: "select" }
];

export const DEFAULT_FIELDS_SETTINGS_BY_FIELD_TYPE = {
  text: DEFAULT_INPUT_SETTINGS,
  email: DEFAULT_INPUT_SETTINGS,
  phone: DEFAULT_INPUT_SETTINGS,
  number: DEFAULT_INPUT_SETTINGS,

  checkbox: DEFAULT_CHECKBOX_SETTINGS,
  select: DEFAULT_SELECT_SETTINGS
};

