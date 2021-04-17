import { normalizeConfigItem } from './normalize'
import {
  ConfigItem,
  ConfigItemObjectType,
  NormalizedConfigItem,
  TypeModule,
} from './types'

import booleanModule from './types/boolean'
import booleanArrayModule from './types/booleanArray'
import enumModule from './types/enum'
import numberModule from './types/number'
import numberArrayModule from './types/numberArray'
import stringModule from './types/string'
import stringArrayModule from './types/stringArray'

export const isConfigItemObject = (
  item: ConfigItem
): item is ConfigItemObjectType => 'type' in item

export const getItemTypeModule = <T extends ConfigItem>(
  item: T | undefined
): TypeModule<NormalizedConfigItem<T>['type']> => {
  const normalizedItem = item && normalizeConfigItem(item)

  for (let typeModule of [
    booleanModule,
    booleanArrayModule,
    enumModule,
    numberModule,
    numberArrayModule,
    stringModule,
    stringArrayModule,
  ]) {
    if (typeModule.isOfType(normalizedItem)) {
      return typeModule as TypeModule<NormalizedConfigItem<T>['type']>
    }
  }

  throw new Error('Unknown config item type')
}
