import { v4 as uuidV4 } from "uuid";

export const SETTINGS = "settings";
export const OPTIONS = "options";

export const DEFAULT_FIELD = {
  id: uuidV4(),
  settings: {
    fieldType: "input",
    name: "",
    label: "",
    required: false,
    type: "text",
    placeholder: ""
  }
};

export const DEFAULT_OPTION = {
  id: uuidV4(),
  settings: {
    label: "",
    value: ""
  }
};

export const DEFAULT_BUTTON = {
  id: uuidV4(),
  settings: {
    fieldType: "button",
    type: "button",
    text: ""
  }
};


