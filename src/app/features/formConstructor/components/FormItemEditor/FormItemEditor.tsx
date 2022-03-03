import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import {
  FormItem,
  FormItems,
  FormItemType,
  FormConstructorServiceType,
  FormItemTypeSelectorOption, FormItemsType
} from "../../services/FormConstructorModel";
import {
  DEFAULT_FORM_ITEMS_SETTINGS_BY_ITEM_TYPE,
  SETTINGS
} from "../../constants/FormConstructor";
import { ManageButtons } from "../ManageButtons";
import { StringSettingEditor } from "../StringSettingEditor";
import { BooleanSettingEditor } from "../BbooleanSettingEditor";
import { ArraySettingEditor } from "../ArraySettingEditor";
import styles from "./FormItemEditor.scss";
import { Selector } from "app/shared/components/Selector";

export const FormItemEditor = observer((
  {
    formItem,
    formItemsType,
    formConstructorModel,
    formItemTypeSelectorOptions
  }: {
    formItem: FormItem,
    formItemsType: FormItemsType,
    formItems: FormItems,
    formConstructorModel: FormConstructorServiceType,
    formItemTypeSelectorOptions: Array<FormItemTypeSelectorOption>
  }
) => {

  const {
    formItemSettingChange,
    formItemTypeChange,
    formItemDelete,
    formItemMoveUp,
    formItemMoveDown,
    sortSettingsNamesByOrder
  } = formConstructorModel;

  const [
    editFormShow,
    setEditFormShow
  ] = React.useState<boolean>(false);
  const [
    fieldType,
    setFieldType
  ] = React.useState(formItemTypeSelectorOptions[0]);
  const [
    sortedSettingsNames,
    setSortedSettingsNames
  ] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    setSortedSettingsNames(
      sortSettingsNamesByOrder(formItem.settings)
    );
  }, [ formItem.id ]);

  const moveUp = React.useCallback(
    () => formItemMoveUp(formItem.id, formItemsType), [ formItem.id ]
  );
  const moveDown = React.useCallback(
    () => formItemMoveDown(formItem.id, formItemsType), [ formItem.id ]
  );
  const toggleEdit = React.useCallback(
    () => {
      setEditFormShow(prevEditFormShow => !prevEditFormShow);
    }, [ formItem.id ]
  );
  const onDelete = React.useCallback(
    () => formItemDelete(formItem.id, formItemsType), [ formItem.id ]
  );
  const onFormItemTypeChange = React.useCallback(
    newValue => {
      setFieldType(newValue);
      const newFieldType: FormItemType = newValue.value;
      const newSettings = DEFAULT_FORM_ITEMS_SETTINGS_BY_ITEM_TYPE[newFieldType];
      setSortedSettingsNames(
        sortSettingsNamesByOrder(newSettings)
      );
      formItemTypeChange(
        {
          formItemId: formItem.id,
          newFormItemType: newValue,
          type: formItemsType
        }
      );
    }, [ formItem.id ]
  );

  return (
    <div className={cn(styles.field)} key={formItem.id}>
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
          <Selector<FormItemTypeSelectorOption>
            label="Field type"
            value={fieldType}
            options={formItemTypeSelectorOptions}
            onChange={onFormItemTypeChange}
          />
          <div className={cn(styles.settings)}>
            {sortedSettingsNames.map(
              settingName => {
                const setting = formItem[SETTINGS][settingName];
                const { order, value } = setting;

                if (typeof value === "string") {
                  return (
                    <StringSettingEditor
                      key={order}
                      formItemsType={formItemsType}
                      formItemId={formItem.id}
                      formItemSettingChange={formItemSettingChange}
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
                      formItemsType={formItemsType}
                      formItemId={formItem.id}
                      formItemSettingChange={formItemSettingChange}
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
                      fieldId={formItem.id}
                      listItems={value}
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
