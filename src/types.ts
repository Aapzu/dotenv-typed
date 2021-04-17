export enum ConfigItemTypeName {
  String,
  Number,
  Boolean,
  Enum,
  StringArray,
  NumberArray,
  BooleanArray,
}

export type ConfigItemType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | Array<string>
  | Array<NumberConstructor>
  | Array<StringConstructor>
  | Array<BooleanConstructor>

export type ConfigItemValue<
  Item extends ConfigItem,
  Type extends ConfigItemType = Item extends ConfigItemObjectType
    ? Item['type']
    : Item
> = Type extends (...args: any[]) => any
  ? ReturnType<Type>
  : Type extends Array<infer U>
  ? U extends (...args: any[]) => any
    ? Array<ReturnType<U>>
    : U
  : Type

export type ConfigItemObjectType<T extends ConfigItemType = ConfigItemType> = {
  type: T
  optional?: boolean
  default?: ConfigItemValue<T>
}

export type ConfigItem = ConfigItemType | ConfigItemObjectType

export type ConfigSchema<
  S extends Record<string, ConfigItem> = Record<string, ConfigItem>
> = {
  [K in keyof S]: S[K]
}

export type NormalizedConfigItem<
  S extends ConfigItem
> = S extends ConfigItemType ? ConfigItemObjectType<S> : S

export type NormalizedConfigSchema<S extends ConfigSchema = ConfigSchema> = {
  [K in keyof S]: NormalizedConfigItem<S[K]>
}

export type EnvType<S extends ConfigSchema> = {
  [K in keyof S]: ConfigItemValue<S[K]>
}

export type DotenvOutput<S extends NormalizedConfigSchema> = {
  [K in keyof S]: string
}

export interface TypeModule<T extends ConfigItemType> {
  isOfType: (item: ConfigItemObjectType | undefined) => boolean
  parse: (value: string) => ConfigItemValue<T>
  validateStringValue: (
    value: string,
    schemaObject: ConfigItemObjectType<T>
  ) => boolean
  validateValue: (value: any, schemaObject: ConfigItemObjectType<T>) => boolean
  typeName: string
}
