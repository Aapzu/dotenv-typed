export enum ConfigItemTypeName {
  String,
  Number,
  Boolean,
  Enum,
}

export type ConfigItemType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | Array<string>
  | Array<NumberConstructor>
  | Array<StringConstructor>

export type ConfigItemValue<T extends ConfigItemType> = T extends (
  ...args: any[]
) => any
  ? ReturnType<T>
  : T extends Array<infer U>
  ? U extends (...args: any[]) => any
    ? ReturnType<U>
    : U
  : T

export type ConfigItemObjectType<T extends ConfigItemType = ConfigItemType> = {
  type: T
  optional?: boolean
  default?: ConfigItemValue<T>
}

export type ConfigItem = ConfigItemType | ConfigItemObjectType

export interface ConfigSchema {
  [key: string]: ConfigItem
}

export type NormalizedConfigItem<
  T extends ConfigItem = ConfigItemType
> = T extends ConfigItemType ? ConfigItemObjectType<T> : T

export type NormalizedConfigSchema<S extends ConfigSchema = ConfigSchema> = {
  [K in keyof S]: NormalizedConfigItem<S[K]>
}

export type EnvType<S extends NormalizedConfigSchema> = {
  [K in keyof S]: ConfigItemValue<S[K]['type']>
}

export type DotenvOutput<S extends NormalizedConfigSchema> = {
  [K in keyof S]: string
}
