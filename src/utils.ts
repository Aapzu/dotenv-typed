import { normalizeConfigItem } from './normalize'
import {
  ConfigItem,
  ConfigItemObjectType,
  NormalizedConfigItem,
} from './types/configItemTypes'
import { TypeModule } from './types/typeModuleTypes'

import typeModules from './typeModules'

export const isConfigItemObject = (
  item: ConfigItem
): item is ConfigItemObjectType => 'type' in item

export const getItemTypeModule = <T extends ConfigItem>(
  item: T | undefined
): TypeModule<NormalizedConfigItem<T>['type']> => {
  const normalizedItem = item && normalizeConfigItem(item)

  for (const typeModule of typeModules) {
    if (typeModule.isOfType(normalizedItem)) {
      return typeModule as TypeModule<NormalizedConfigItem<T>['type']>
    }
  }

  throw new Error('Unknown config item type')
}
