import { normalizeConfigItem } from './normalize'
import {
  ConfigItem,
  ConfigItemObjectType,
  NormalizedConfigItem,
} from './types/configItemTypes'
import { TypeModule } from './types/typeModuleTypes'

import booleanModule from './typeModules/boolean'
import booleanArrayModule from './typeModules/booleanArray'
import enumModule from './typeModules/enum'
import numberModule from './typeModules/number'
import numberArrayModule from './typeModules/numberArray'
import stringModule from './typeModules/string'
import stringArrayModule from './typeModules/stringArray'

export const isConfigItemObject = (
  item: ConfigItem
): item is ConfigItemObjectType => 'type' in item

export const getItemTypeModule = <T extends ConfigItem>(
  item: T | undefined
): TypeModule<NormalizedConfigItem<T>['type']> => {
  const normalizedItem = item && normalizeConfigItem(item)

  for (const typeModule of [
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
