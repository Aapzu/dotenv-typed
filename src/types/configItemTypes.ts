export enum ConfigItemTypeName {
  String,
  Number,
  Boolean,
  Enum,
  StringArray,
  NumberArray,
  BooleanArray,
}

export type ArrayType<T> = Array<T> | Readonly<Array<T>>

export type EnumType = ArrayType<string>

export type BaseConfigItemType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor

export type ConfigItemType =
  | BaseConfigItemType
  | ArrayType<BaseConfigItemType>
  | EnumType

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReturnTypeArg = (...args: any) => any

export type ConfigValueByItemType<Type extends ConfigItemType> =
  Type extends ReturnTypeArg
    ? ReturnType<Type> // StringConstructor -> string, BooleanConstructor -> boolean etc
    : Type extends ArrayType<infer U> // If any array
    ? U extends ReturnTypeArg
      ? Array<ReturnType<U>> // Array<StringConstructor> -> string[] etc
      : U // ['foo', 'bar', 'baz'] -> 'foo' | 'bar' | 'baz'
    : never

export type ConfigItemValue<
  Item extends ConfigItem,
  Type extends ConfigItemType = Item extends ConfigItemObjectType
    ? Item['type']
    : Item
> = ConfigValueByItemType<Type>

export type ConfigItemDefaultValue<T extends ConfigItemType> =
  | ConfigItemValue<T>
  | Readonly<ConfigItemValue<T>>

export type ConfigItemObjectType<T extends ConfigItemType = ConfigItemType> = {
  type: T
  optional?: boolean
  default?: ConfigItemDefaultValue<ConfigItemType>
}

export type ConfigItem = ConfigItemType | ConfigItemObjectType

export type NormalizedConfigItem<S extends ConfigItem> =
  S extends ConfigItemType ? ConfigItemObjectType<S> : S

export type ConfigItemValueWithOptionals<T extends ConfigItem> = T extends {
  optional: true
  default?: undefined | never
}
  ? ConfigItemValue<T> | undefined
  : ConfigItemValue<T>
