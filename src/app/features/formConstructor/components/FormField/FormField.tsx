import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import {
  Field,
  FieldType,
  FormConstructorServiceType,
  FormFieldOptionChangeArgs
} from "../../services/FormConstructorModel";
import {
  DEFAULT_FIELDS_SETTINGS_BY_FIELD_TYPE, FIELD_TYPE,
  FIELD_TYPE_SELECTOR_OPTIONS,
  SETTINGS
} from "../../constants/FormConstructor";
import { ManageButtons } from "../ManageButtons";
import { StringSettingEditor } from "../StringSettingEditor";
import { BooleanSettingEditor } from "../BbooleanSettingEditor";
import { ArraySettingEditor } from "../ArraySettingEditor";
import styles from "./FormField.scss";
import { Selector } from "app/shared/components/Selector";

export const FormField = observer((
  {
    field,
    formConstructorModel
  }: {
    field: Field,
    formConstructorModel: FormConstructorServiceType
  }
) => {

  const {
    fieldSettingChange,
    fieldTypeChange,
    fieldDelete,
    fieldMoveUp,
    fieldMoveDown,
    sortSettingsNamesByOrder,
    optionAdd,
    optionMoveDown,
    optionMoveUp,
    optionDelete,
    optionSettingChange
  } = formConstructorModel;

  const [
    editFormShow,
    setEditFormShow
  ] = React.useState<boolean>(false);

  const moveUp = React.useCallback(
    () => fieldMoveUp(field.id), [ field.id ]
  );
  const moveDown = React.useCallback(
    () => fieldMoveDown(field.id), [ field.id ]
  );
  const toggleEdit = React.useCallback(
    () => {
      setEditFormShow(prevEditFormShow => !prevEditFormShow);
    }, [ field.id ]
  );
  const onDelete = React.useCallback(
    () => fieldDelete(field.id), [ field.id ]
  );

  const onListItemAdd = React.useCallback(
    (fieldId: string) => (
      event: React.MouseEvent<HTMLElement>
    ) => optionAdd(fieldId),
    [ field.id ]
  );
  const onListItemMoveDown = React.useCallback(
    (fieldId: string, optionId: string) => (
      event: React.MouseEvent<HTMLElement>
    ): void => optionMoveDown(fieldId, optionId),
    [ field.id ]
  );
  const onListItemMoveUp = React.useCallback(
    (fieldId: string, optionId: string) => (
      event: React.MouseEvent<HTMLElement>
    ): void => optionMoveUp(fieldId, optionId),
    [ field.id ]
  );
  const onListItemDelete = React.useCallback(
    (fieldId: string, optionId: string) => (
      event: React.MouseEvent<HTMLElement>
    ): void => optionDelete(fieldId, optionId),
    [ field.id ]
  );

  const onListItemChange = React.useCallback(
    ({
      fieldId,
      optionId,
      optionSettingKey
    }: FormFieldOptionChangeArgs) => (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => optionSettingChange({
      fieldId,
      optionId,
      optionSettingKey,
      optionSettingValue: event.target.value
    }),
    [ field.id ]
  );

  const [ fieldType, setFieldType ] = React.useState(FIELD_TYPE_SELECTOR_OPTIONS[0]);

  const [ sortedSettingsNames, setSortedSettingsNames ] = React.useState<
    Array<string>
    >([]);

  const onFieldTypeChange = React.useCallback(
    newValue => {
      setFieldType(newValue);
      const newFieldType: FieldType = newValue.value;
      const newSettings = DEFAULT_FIELDS_SETTINGS_BY_FIELD_TYPE[newFieldType];
      setSortedSettingsNames(
        sortSettingsNamesByOrder(newSettings)
      );
      fieldTypeChange(field.id, newValue);
    }, [ field.id ]
  );

  React.useEffect(() => {
    setSortedSettingsNames(
      sortSettingsNamesByOrder(field.settings)
    );
  }, [ field ]);

  return (
    <div className={cn(styles.field)} key={field.id}>
      <ManageButtons
        moveUp={moveUp}
        moveDown={moveDown}
        toggleEdit={toggleEdit}
        showToggleEditButton
        onDelete={onDelete}
      />
      {editFormShow
      && (
        <React.Fragment>
          <Selector
            label="Field type"
            value={fieldType}
            options={FIELD_TYPE_SELECTOR_OPTIONS}
            onChange={onFieldTypeChange}
          />
          <div className={cn(styles.settings)}>
            {sortedSettingsNames.map(
              settingName => {
                const setting = field[SETTINGS][settingName];
                const { order, value } = setting;

                if (typeof value === "string") {
                  return (
                    <StringSettingEditor
                      key={order}
                      fieldId={field.id}
                      fieldSettingChange={fieldSettingChange}
                      settingKey={settingName}
                      value={value}
                      order={order}
                    />
                  );
                }

                if (typeof value === "boolean") {
                  return (
                    <BooleanSettingEditor
                      key={order}
                      fieldId={field.id}
                      fieldSettingChange={fieldSettingChange}
                      settingKey={settingName}
                      value={value}
                      order={order}
                    />
                  );
                }

                if (Array.isArray(value)) {
                  return (
                    <ArraySettingEditor
                      key={order}
                      fieldId={field.id}
                      listItems={value}
                      onListItemAdd={onListItemAdd}
                      onListItemMoveDown={onListItemMoveDown}
                      onListItemMoveUp={onListItemMoveUp}
                      onListItemDelete={onListItemDelete}
                      onListItemChange={onListItemChange}
                    />
                  );
                }

                return null;
              }
            )}
          </div>
        </React.Fragment>
      )}

    </div>
  );
});
