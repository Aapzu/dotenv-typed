import {
  ConfigItem,
  ConfigItemObjectType,
  ConfigItemType,
  ConfigItemTypeName,
  ConfigItemValue,
} from './types'

export const isStringItem = (
  item: ConfigItemObjectType | undefined
): item is ConfigItemObjectType<StringConstructor> =>
  !!item && item.type === String

export const isNumberItem = (
  item: ConfigItemObjectType | undefined
): item is ConfigItemObjectType<NumberConstructor> =>
  !!item && item.type === Number

export const isBooleanItem = (
  item: ConfigItemObjectType | undefined
): item is ConfigItemObjectType<BooleanConstructor> =>
  !!item && item.type === Boolean

// export const isEnumItem = (
//   item: ConfigItemObjectType | undefined
// ): item is ConfigItemObjectType<string[]> =>
//   !!item &&
//   Array.isArray(item.type) &&
//   !!item.type.length &&
//   typeof item.type[0] === 'string'

export const isValidStringDefaultValue = (value: string) => {
  return typeof value === 'string'
}

export const isValidNumberItemValue = (value: string) => {
  return value === 'NaN' || !Number.isNaN(parseFloat(value))
}

export const isValidNumberDefaultValue = (value: number) => {
  return typeof value === 'number'
}

export const isValidBooleanItemValue = (value: string) =>
  value.toLowerCase() === 'true' || value.toLowerCase() === 'false'

export const isValidBooleanDefaultValue = (value: boolean) => {
  return typeof value === 'boolean'
}

export const isConfigItemObject = (
  item: ConfigItem
): item is ConfigItemObjectType => 'type' in item

export const getValidators = <T extends ConfigItemType>(
  item: ConfigItemObjectType<T>
): {
  validateItem: (value: string) => boolean
  validateDefaultValue: (value: ConfigItemValue<any>) => boolean
  typeName: ConfigItemTypeName
} => {
  if (isStringItem(item)) {
    return {
      validateItem: () => true,
      validateDefaultValue: isValidStringDefaultValue,
      typeName: ConfigItemTypeName.String,
    }
  }
  if (isNumberItem(item)) {
    return {
      validateItem: isValidNumberItemValue,
      validateDefaultValue: isValidNumberDefaultValue,
      typeName: ConfigItemTypeName.Number,
    }
  }
  if (isBooleanItem(item)) {
    return {
      validateItem: isValidBooleanItemValue,
      validateDefaultValue: isValidBooleanDefaultValue,
      typeName: ConfigItemTypeName.Boolean,
    }
  }
  // if (isEnumItem(item)) {
  //   return {
  //     validateItem: (value: string) => boolean
  //     validateDefaultValue: (value: ConfigItemValue<T>) => boolean
  //   }
  // }
  throw new Error('Unknown config item type')
}
