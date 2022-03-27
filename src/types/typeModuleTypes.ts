import {
  ConfigItemObjectType,
  ConfigItemType,
  ConfigValueByItemType,
} from './configItemTypes'

export type TypeModule<T extends ConfigItemType> = {
  isOfType: (
    item: ConfigItemObjectType | undefined
  ) => item is ConfigItemObjectType<T>
  parse: (value: string) => ConfigValueByItemType<T>
  validateStringValue: (value: string, type: T) => boolean
  validateValue: (value: unknown, type: T) => boolean
  typeName: string | ((schemaObject?: ConfigItemObjectType<T>) => string)
}
