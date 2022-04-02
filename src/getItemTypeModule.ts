import { normalizeConfigItem } from './normalize'
import typeModules from './typeModules'
import { ConfigItem, NormalizedConfigItem } from './types/configItemTypes'
import { TypeModule } from './types/typeModuleTypes'

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
