import { ReactElement } from "react";
import { makeAutoObservable } from "mobx";
import { v4 as uuidV4 } from "uuid";
import {
  OPTIONS,
  SETTINGS,
  DEFAULT_SELECT_OPTION_SETTINGS,
  DEFAULT_BUTTON_SETTINGS,
  DEFAULT_INPUT_SETTINGS,
  DEFAULT_FIELDS_SETTINGS_BY_FIELD_TYPE,
  VALUE, FIELD_TYPE
} from "../constants/FormConstructor";

type ButtonType = "button" | "submit";
export type FieldType = "text" | "email" | "phone" | "number" | "checkbox" | "select";

export type FieldTypeSelectorOption = {
  label: string;
  value: FieldType;
}
export type SelectOptionSettings = {
  label: string;
  value: string;
}
export type SelectOption = {
  id: string;
  fieldId: string;
  settings: SelectOptionSettings
};
type SelectOptions = Array<SelectOption>;

export type SettingKey = "name" | "label" | "checked" | "required" | "text" | "placeholder" | "options";
type SettingValue = string | boolean | SelectOptions;
type Setting<T extends string | boolean | SelectOptions> = {
  // You can define component for edit setting explicitly
  editingComponent?: () => ReactElement,
  // Order of rendering settings of field in constructor
  order: number;
  value: T;
}

export type SelectOptionSettingKey = "label" | "value";
type SelectOptionSettingValue = string;

export type InputSettings = {
  name: Setting<string>;
  label: Setting<string>;
  placeholder: Setting<string>;
  required: Setting<boolean>;
};

export type CheckBoxSettings = {
  name: Setting<string>;
  label: Setting<string>;
  checked: Setting<boolean>;
  required: Setting<boolean>;
};

export type SelectSettings = {
  name: Setting<string>;
  label: Setting<string>;
  options: Setting<SelectOptions>;
  required: Setting<boolean>;
};

export type ButtonSettings = {
  text: Setting<string>;
};

type FieldOrButtonSettings = {
  [key: string]: { order: number, value: SettingValue };
};

type FieldOrButtonSetting = { order: number, value: SettingValue };

export type Field = {
  id: string;
  fieldType: FieldType;
  settings: FieldOrButtonSettings;
}
export type Fields = Array<Field>

export type Button = {
  id: string;
  fieldType: ButtonType;
  settings: FieldOrButtonSettings;
}

export type Buttons = Array<Button>;

export type FieldCallback = (id: string) => void;

export type FieldSettingChange = (
  {
    fieldId,
    settingKey,
    settingValue
  }: {
  fieldId: string;
  settingKey: SettingKey;
  settingValue: SettingValue | SelectOptionSettingValue;
}) => void;

export type FieldTypeChange = (
  fieldId: string,
  newFieldType: FieldTypeSelectorOption
) => void;

export type OptionSettingChangeArgs = {
  fieldId: string;
  optionId: string;
  optionSettingKey: "label" | "value";
  optionSettingValue: string;
};

export type FormFieldOptionChangeArgs = Omit<
  OptionSettingChangeArgs,
  "optionSettingValue"
>

export type OptionSettingChange = ({
  fieldId,
  optionId,
  optionSettingKey,
  optionSettingValue
}: OptionSettingChangeArgs) => void

export type OptionAdd = (fieldId: string) => void;

export type OptionCallback = (fieldId: string, optionId: string) => void;


export type SortSettingsNamesByOrder = (
  settings: FieldOrButtonSettings
) => Array<string>;

class FormConstructorModel {
  public fields: Fields = []

  public buttons: Buttons = []

  constructor() {
    makeAutoObservable(this);
  }

  private itemShiftForward = <FieldOrSelectOption extends {id: string}>(
    itemId: string,
    itemsList: Array<FieldOrSelectOption>
  ): Array<FieldOrSelectOption> => {
    const fieldsLength = itemsList.length;
    const fieldIndex: number = itemsList.findIndex(
      (item: FieldOrSelectOption) => (item.id === itemId)
    );
    const fieldLast = fieldIndex === fieldsLength - 1;

    if (fieldLast || fieldsLength === 1) {
      return itemsList;
    }

    const currentField = { ...itemsList[fieldIndex] };
    const nextFieldIndex = fieldIndex + 1;
    const nextField = { ...itemsList[nextFieldIndex] };
    const begin = itemsList.slice(0, fieldIndex);
    const tail = itemsList.slice(nextFieldIndex + 1);

    return [
      ...begin,
      nextField,
      currentField,
      ...tail
    ];
  }

  private itemShiftBackward = <FieldOrSelectOption extends {id: string}>(
    itemId: string,
    itemsList: Array<FieldOrSelectOption>
  ): Array<FieldOrSelectOption> => {
    const fieldsLength = itemsList.length;
    const fieldIndex: number = itemsList.findIndex(
      (item: FieldOrSelectOption) => (item.id === itemId)
    );
    const fieldFirst = fieldIndex === 0;

    if (fieldFirst || fieldsLength === 1) {
      return itemsList;
    }

    const currentField = { ...itemsList[fieldIndex] };
    const prevFieldIndex = fieldIndex - 1;
    const prevField = { ...itemsList[prevFieldIndex] };
    const begin = itemsList.slice(0, prevFieldIndex);
    const tail = itemsList.slice(fieldIndex + 1);

    return [
      ...begin,
      currentField,
      prevField,
      ...tail
    ];
  }

  private getItemAndItemIndexById = <FieldOrSelectOption extends {id: string}>(
    itemId: string,
    itemsList: Array<FieldOrSelectOption>
  ): {
    index: number;
    item: FieldOrSelectOption;
  } => {
    const index = itemsList.findIndex(({ id }: {id: string}) => id === itemId);
    const item = itemsList[index];

    return {
      index,
      item
    };
  }

  private itemDelete = <FieldOrSelectOption extends {id: string}>(
    id: string,
    itemsList: Array<FieldOrSelectOption>
  ): Array<FieldOrSelectOption> => (
    itemsList.filter(({ id: itemId }) => (itemId !== id))
  )

  public fieldAdd = () => {
    const newField: Field = {
      id: uuidV4(),
      fieldType: "text",
      settings: DEFAULT_INPUT_SETTINGS
    };
    this.fields.push(newField);
  }

  public fieldSettingChange = (
    {
      fieldId,
      settingKey,
      settingValue
    }: {
      fieldId: string;
      settingKey: SettingKey;
      settingValue: SettingValue | SelectOptionSettingValue;
    }
  ): void => {
    const {
      item: field
    }: {
      item: Field
    } = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][settingKey][VALUE] = settingValue;
  }

  public fieldMoveDown: FieldCallback = id => {
    this.fields = this.itemShiftForward<Field>(id, this.fields);
  }

  public fieldMoveUp: FieldCallback = id => {
    this.fields = this.itemShiftBackward<Field>(id, this.fields);
  }

  public fieldDelete: FieldCallback = id => {
    this.fields = this.itemDelete<Field>(id, this.fields);
  }

  // -------------- Select options in Field ---------------------

  public optionAdd: OptionAdd = fieldId => {
    const { item: field }: { item: Field }
      = this.getItemAndItemIndexById(fieldId, this.fields);

    const options = field[SETTINGS][OPTIONS][VALUE] as SelectOptions;
    const newOption = {
      id: uuidV4(),
      fieldId: field.id,
      settings: DEFAULT_SELECT_OPTION_SETTINGS
    };
    field[SETTINGS][OPTIONS][VALUE] = [ ...options, newOption ];
  }

  public optionSettingChange: OptionSettingChange = (
    {
      fieldId,
      optionId,
      optionSettingKey,
      optionSettingValue
    }
  ) => {
    const { item: field }: { item: Field }
      = this.getItemAndItemIndexById(fieldId, this.fields);
    const { item: option } = this.getItemAndItemIndexById<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS][VALUE] as SelectOptions
    );

    option[SETTINGS][optionSettingKey] = optionSettingValue;
    // immutable hack for rerender component
    field[SETTINGS][OPTIONS][VALUE]
      = [ ...field[SETTINGS][OPTIONS][VALUE] as SelectOptions ];
  }

  public optionMoveDown: OptionCallback = (fieldId, optionId) => {
    const { item: field }: { item: Field }
    = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS][VALUE] = this.itemShiftForward<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS][VALUE] as SelectOptions
    );
  }

  public optionMoveUp: OptionCallback = (fieldId, optionId) => {
    const { item: field }: { item: Field }
    = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS][VALUE] = this.itemShiftBackward<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS][VALUE] as SelectOptions
    );
  }

  public optionDelete: OptionCallback = (fieldId, optionId) => {
    const { item: field }: { item: Field }
      = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS][VALUE] = this.itemDelete<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS][VALUE] as SelectOptions
    );
  }

  // -------------- Buttons Fields ---------------------

  public buttonAdd = () => {
    const newButton: Button = {
      id: uuidV4(),
      fieldType: "button",
      settings: DEFAULT_BUTTON_SETTINGS
    };
    this.buttons.push(newButton);
  }

  public buttonSettingChange = (
    {
      buttonId,
      settingKey,
      settingValue
    }: {
      buttonId: string;
      settingKey: string;
      settingValue: string;
    }
  ) => {
    const {
      item: button
    }: {
      item: Button
    } = this.getItemAndItemIndexById(buttonId, this.buttons);

    button[SETTINGS][settingKey][VALUE] = settingValue;
  }

  public buttonMoveDown: FieldCallback = id => {
    this.buttons = this.itemShiftForward<Button>(id, this.buttons);
  }

  public buttonMoveUp: FieldCallback = id => {
    this.buttons = this.itemShiftBackward<Button>(id, this.buttons);
  }

  public buttonDelete: FieldCallback = id => {
    this.buttons = this.itemDelete<Button>(id, this.buttons);
  }

  // -------------- Field type selector ---------------------

  public fieldTypeChange: FieldTypeChange = (
    fieldId,
    newFieldType
  ) => {
    const { value: newFieldTypeValue } = newFieldType;
    const { index } = this.getItemAndItemIndexById(fieldId, this.fields);

    const newField = {
      id: fieldId,
      [FIELD_TYPE]: newFieldTypeValue,
      [SETTINGS]: DEFAULT_FIELDS_SETTINGS_BY_FIELD_TYPE[newFieldTypeValue]
    };

    this.fields[index] = newField;
  }

  // -------------- Prepare field settings to render in constructor ---------------------

  public sortSettingsNamesByOrder: SortSettingsNamesByOrder = settings => (
    Object.keys(settings).sort(
      (
        settingA,
        settingB
      ) => (
        settings[settingA].order - settings[settingB].order
      )
    )
  )
}

export const FormConstructorService = new FormConstructorModel();
export type FormConstructorServiceType = typeof FormConstructorService;
