import { normalizeConfigItem } from '../normalize'
import {
  BaseConfigItemType,
  ConfigItemObjectType,
  ConfigValueByItemType,
} from '../types/configItemTypes'
import { TypeModule } from '../types/typeModuleTypes'

const arrayModule = <
  T extends BaseConfigItemType,
  A extends Array<T> = Array<T>
>(
  itemType: TypeModule<T>
): TypeModule<A> => {
  return {
    isOfType: (item): item is ConfigItemObjectType<A> =>
      !!item &&
      Array.isArray(item.type) &&
      item.type.length === 1 &&
      // TODO: support enum string
      typeof item.type[0] !== 'string' &&
      typeof item.type[0] !== 'undefined' &&
      itemType.isOfType(normalizeConfigItem(item.type[0])),

    parse: (value) => {
      if (value === '') {
        return [] as ConfigValueByItemType<A>
      }
      return (
        value
          .split(',')
          .map((part) => part.trim())
          // TODO: get rid of casting
          .map(itemType.parse) as ConfigValueByItemType<A>
      )
    },

    validateStringValue: (value, type) => {
      if (value === '') {
        return true
      }
      return (
        !!value &&
        value
          .split(',')
          .every(
            (item) =>
              type[0] && itemType.validateStringValue(item.trim(), type[0])
          )
      )
    },

    validateValue: (value, type) =>
      Array.isArray(value) &&
      value.every((item) => type[0] && itemType.validateValue(item, type[0])),

    typeName: `${itemType.typeName} array`,
  }
}
export default arrayModule
