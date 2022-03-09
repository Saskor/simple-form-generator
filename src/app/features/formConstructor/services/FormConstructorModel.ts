import { ReactElement } from "react";
import { makeAutoObservable } from "mobx";
import { v4 as uuidV4 } from "uuid";
import {
  OPTIONS,
  SETTINGS,
  DEFAULT_SELECT_OPTION_SETTINGS,
  DEFAULT_BUTTON_SETTINGS,
  DEFAULT_INPUT_SETTINGS,
  DEFAULT_FORM_ITEMS_SETTINGS_BY_ITEM_TYPE,
  VALUE,
  FIELD_TYPE
} from "../constants/FormConstructor";

import { FormStyles } from "../constants/FormStyles";

type ButtonType = "button" | "submit";
export type FieldType = "text" | "email" | "phone" | "number" | "checkbox" | "select";

export type FormItemType = FieldType | ButtonType;

export type FormItemsType = "fields" | "buttons";

export type FormItemTypeSelectorOption = {
  label: string;
  value: FieldType | ButtonType;
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
export type SettingValue = string | boolean | SelectOptions;
type Setting<T extends string | boolean | SelectOptions> = {
  // You can define component for edit setting explicitly
  editingComponent?: () => ReactElement,
  // Order of rendering settings of field in constructor
  order: number;
  value: T;
}

type SelectOptionSettingValue = string;

export type InputSettings = {
  name: Setting<string>;
  label: Setting<string>;
  placeholder: Setting<string>;
  required: Setting<boolean>;
  value: Setting<string>;
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

type FormItemSettings = {
  [key: string]: { order: number, value: SettingValue };
};

export type FormItem = {
  id: string;
  fieldType: FieldType | ButtonType;
  settings: FormItemSettings;
}
export type FormItems = Array<FormItem>;

export type FormItemCallback = (id: string, type: FormItemsType) => void;

export type FormItemSettingChange = (
  {
    formItemId,
    settingKey,
    settingValue,
    formItemsType
  }: {
    formItemId: string;
    settingKey: SettingKey;
    settingValue: SettingValue | SelectOptionSettingValue;
    formItemsType: FormItemsType
  }
) => void;

export type FormItemTypeChange = ({
  formItemId,
  newFormItemType,
  type
}: {
  formItemId: string,
  newFormItemType: FormItemTypeSelectorOption,
  type: FormItemsType
}) => void;

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
  settings: FormItemSettings
) => Array<string>;

class FormConstructorModel {
  public fields: FormItems = []

  public buttons: FormItems = []

  public formLayout = ""

  constructor() {
    makeAutoObservable(this);
  }

  // -------------- Abstract methods ---------------------

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

  // -------------- Form items methods ---------------------

  public formItemSettingChange = (
    {
      formItemId,
      settingKey,
      settingValue,
      formItemsType
    }: {
      formItemId: string;
      settingKey: SettingKey;
      settingValue: SettingValue | SelectOptionSettingValue;
      formItemsType: FormItemsType
    }
  ): void => {
    const {
      item: formItem
    }: {
      item: FormItem
    } = this.getItemAndItemIndexById(formItemId, this[formItemsType]);

    formItem[SETTINGS][settingKey][VALUE] = settingValue;
  }

  public formItemMoveDown: FormItemCallback = (id, type) => {
    this[type] = this.itemShiftForward<FormItem>(id, this[type]);
  }

  public formItemMoveUp: FormItemCallback = (id, type) => {
    this[type] = this.itemShiftBackward<FormItem>(id, this[type]);
  }

  public formItemDelete: FormItemCallback = (id, type) => {
    this[type] = this.itemDelete<FormItem>(id, this[type]);
  }

  // -------------- Select options in Field methods ---------------------

  public optionAdd: OptionAdd = fieldId => {
    const { item: field }: { item: FormItem }
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
    const { item: field }: { item: FormItem }
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
    const { item: field }: { item: FormItem }
    = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS][VALUE] = this.itemShiftForward<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS][VALUE] as SelectOptions
    );
  }

  public optionMoveUp: OptionCallback = (fieldId, optionId) => {
    const { item: field }: { item: FormItem }
    = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS][VALUE] = this.itemShiftBackward<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS][VALUE] as SelectOptions
    );
  }

  public optionDelete: OptionCallback = (fieldId, optionId) => {
    const { item: field }: { item: FormItem }
      = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS][VALUE] = this.itemDelete<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS][VALUE] as SelectOptions
    );
  }

  // -------------- Fields methods ---------------------

  public fieldAdd = () => {
    const newField: FormItem = {
      id: uuidV4(),
      fieldType: "text",
      settings: DEFAULT_INPUT_SETTINGS
    };
    this.fields.push(newField);
  }

  // -------------- Buttons methods ---------------------

  public buttonAdd = () => {
    const newButton: FormItem = {
      id: uuidV4(),
      fieldType: "button",
      settings: DEFAULT_BUTTON_SETTINGS
    };
    this.buttons.push(newButton);
  }
  // -------------- Form item type selector ---------------------

  public formItemTypeChange: FormItemTypeChange = (
    {
      formItemId,
      newFormItemType,
      type
    }
  ) => {
    const { value: newFieldTypeValue } = newFormItemType;
    const { index } = this.getItemAndItemIndexById(formItemId, this[type]);

    const newFormItem = {
      id: formItemId,
      [FIELD_TYPE]: newFieldTypeValue,
      [SETTINGS]: DEFAULT_FORM_ITEMS_SETTINGS_BY_ITEM_TYPE[newFieldTypeValue]
    };

    this[type][index] = newFormItem;
  }

  // -------------- Prepare form item settings to render in constructor ---------------------

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

  // -------------- Save form in a separate file utils ---------------------

  private getSelectors = (styles: FormStyles): Array<string> => (
    Object.keys(styles).sort(
      (aKey, bKey) => (
        styles[aKey].order - styles[bKey].order
      )
    ));

  public getFormStylesString = (
    styles: FormStyles
  ): string => this.getSelectors(styles).reduce(
    (acc, selector) => {
      const selectorStyles = styles[selector][VALUE];
      let stylesString = "";

      for (const styleKey in selectorStyles) {
        if (styleKey in selectorStyles) {
          const styleValue = selectorStyles[styleKey];
          stylesString += `${styleKey}:${styleValue};`;
        }
      }

      return `${acc}${selector}{${stylesString}}`;
    },
    ""
  );

  public updateFormLayout = (value: string): void => {
    this.formLayout = value;
  }
}

export const FormConstructorService = new FormConstructorModel();
export type FormConstructorServiceType = typeof FormConstructorService;
