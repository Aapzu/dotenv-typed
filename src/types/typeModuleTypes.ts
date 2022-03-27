import {
  ConfigItemObjectType,
  ConfigItemType,
  ConfigItemValue,
} from './configItemTypes'

export type TypeModule<T extends ConfigItemType> = {
  isOfType: (
    item: ConfigItemObjectType | undefined
  ) => item is ConfigItemObjectType<T>
  parse: (value: string) => ConfigItemValue<T>
  validateStringValue: (
    value: string,
    schemaObject: ConfigItemObjectType<T>
  ) => boolean
  validateValue: (
    value: unknown,
    schemaObject: ConfigItemObjectType<T>
  ) => boolean
  typeName: string | ((schemaObject?: ConfigItemObjectType<T>) => string)
}
