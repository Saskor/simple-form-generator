import { makeAutoObservable } from "mobx";
import {
  OPTIONS,
  SETTINGS,
  DEFAULT_FIELD,
  DEFAULT_OPTION,
  DEFAULT_BUTTON
} from "../constants/FormConstructorModel";

type ButtonType = "button" | "submit";
type InputType = "text" | "email" | "phone" | "number";
type FieldType = "input" | "checkBox" | "select" | "button";
type SelectOption = {
  id: string;
  settings: {
    label: string;
    value: string;
  }
};
type SelectOptions = Array<SelectOption>;

export type InputSettings = {
  fieldType: FieldType;
  name: string;
  label: string;
  required: boolean;
  type: InputType;
  placeholder: string;
};

export type CheckBoxSettings = {
  fieldType: FieldType;
  name: string;
  label: string;
  required: boolean;
};

export type SelectSettings = {
  fieldType: FieldType;
  name: string;
  label: string;
  required: boolean;
  options: SelectOptions;
};

export type ButtonSettings = {
  fieldType: "button";
  type: ButtonType;
  text: string;
};

type SettingKey = "fieldType" | "type" | "text" | "name" | "label" | "required"
  | "placeholder" | "options";
type SettingValue = string | boolean | InputType | ButtonType | SelectOptions;

type SelectOptionSettingKey = "label" | "value";
type SelectOptionSettingValue = string;

export type Field = {
  id: string;
  settings: { [key: string]: SettingValue };
}
export type Fields = Array<Field>

export type Button = {
  id: string;
  settings: { [key: string]: string };
}

export type Buttons = Array<Button>;

export type FieldCallback = (id: string) => void;

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

  private getItemAndItemIndexById = (
    itemId: string,
    itemsList: Fields | SelectOptions
  ): {
    index: number;
    item: Field | SelectOption;
  } => {
    const index = itemsList.findIndex(({ id }) => id === itemId);
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
    this.fields.push(DEFAULT_FIELD);
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

    field[SETTINGS][settingKey] = settingValue;
  }

  public fieldMoveDown: FieldCallback = id => {
    this.fields = this.itemShiftBackward(id, this.fields);
  }

  public fieldMoveUp: FieldCallback = id => {
    this.fields = this.itemShiftForward(id, this.fields);
  }

  public fieldDelete: FieldCallback = id => {
    this.fields = this.itemDelete<Field>(id, this.fields);
  }

  // -------------- Select options in Field ---------------------

  public selectOptionAdd = (fieldId: string): void => {
    const { item: field }: { item: Field }
      = this.getItemAndItemIndexById(fieldId, this.fields);

    const options = field[SETTINGS][OPTIONS] as Array<SelectOption>;
    options.push(DEFAULT_OPTION);
  }

  public optionSettingChange = (
    {
      fieldId,
      optionId,
      optionSettingKey,
      optionSettingValue
    }: {
      fieldId: string;
      optionId: string;
      optionSettingKey: "label" | "value";
      optionSettingValue: string;
    }
  ): void => {
    const { item: field }: { item: Field }
      = this.getItemAndItemIndexById(fieldId, this.fields);
    const {
      item: option
    } = this.getItemAndItemIndexById(
      optionId,
      field[SETTINGS][OPTIONS] as SelectOptions
    );

    option[SETTINGS][optionSettingKey] = optionSettingValue;
  }

  public optionMoveDown = (fieldId: string, optionId: string): void => {
    const { item: field }: { item: Field }
    = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS] = this.itemShiftForward<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS] as SelectOptions
    );
  }

  public optionMoveUp = (fieldId: string, optionId: string): void => {
    const { item: field }: { item: Field }
    = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS] = this.itemShiftBackward<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS] as SelectOptions
    );
  }

  public optionDelete = (fieldId: string, optionId: string): void => {
    const { item: field }: { item: Field }
      = this.getItemAndItemIndexById(fieldId, this.fields);

    field[SETTINGS][OPTIONS] = this.itemDelete<SelectOption>(
      optionId,
      field[SETTINGS][OPTIONS] as SelectOptions
    );
  }

  // -------------- Buttons Fields ---------------------

  public buttonAdd = () => {
    this.fields.push(DEFAULT_BUTTON);
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
      item: Field
    } = this.getItemAndItemIndexById(buttonId, this.buttons);

    button[SETTINGS][settingKey] = settingValue;
  }

  public buttonMoveDown: FieldCallback = id => {
    this.buttons = this.itemShiftBackward(id, this.buttons);
  }

  public buttonMoveUp: FieldCallback = id => {
    this.buttons = this.itemShiftForward(id, this.buttons);
  }

  public buttonDelete: FieldCallback = id => {
    this.buttons = this.itemDelete<Button>(id, this.buttons);
  }

}

export const FormConstructorService = new FormConstructorModel();
export type FormConstructorServiceType = typeof FormConstructorService;
