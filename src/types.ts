export enum ConfigItemTypeName {
  String,
  Number,
  Boolean,
  Enum,
  StringArray,
  NumberArray,
  BooleanArray,
}

type ArrayType<T> = Array<T> | Readonly<Array<T>>

export type ConfigItemType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ArrayType<string>
  | ArrayType<NumberConstructor>
  | ArrayType<StringConstructor>
  | ArrayType<BooleanConstructor>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReturnTypeArg = (...args: any) => any

export type ConfigItemValue<
  Item extends ConfigItem,
  Type extends ConfigItemType = Item extends ConfigItemObjectType
    ? Item['type']
    : Item
> = Type extends ReturnTypeArg
  ? ReturnType<Type> // StringConstructor -> string, BooleanConstructor -> boolean etc
  : Type extends ArrayType<infer U> // If any array
  ? U extends ReturnTypeArg
    ? Array<ReturnType<U>> // Array<StringConstructor> -> string[] etc
    : U // ['foo', 'bar', 'baz'] -> 'foo' | 'bar' | 'baz'
  : never

export type ConfigItemDefaultValue<T extends ConfigItemType> =
  | ConfigItemValue<T>
  | Readonly<ConfigItemValue<T>>

export type ConfigItemObjectType<T extends ConfigItemType = ConfigItemType> = {
  type: T
  optional?: boolean
  default?: ConfigItemDefaultValue<ConfigItemType>
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

export type ConfigItemValueWithOptionals<T extends ConfigItem> = T extends {
  optional: true
  default?: undefined | never
}
  ? ConfigItemValue<T> | undefined
  : ConfigItemValue<T>

export type EnvType<S extends ConfigSchema> = {
  [K in keyof S]: ConfigItemValueWithOptionals<S[K]>
}

export type DotenvOutput<S extends NormalizedConfigSchema> = {
  [K in keyof S]: string
}

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
