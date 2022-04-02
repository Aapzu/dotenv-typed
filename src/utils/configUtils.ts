import { ConfigItem, ConfigItemObjectType } from '../types/configItemTypes'

export const isConfigItemObject = (
  item: ConfigItem
): item is ConfigItemObjectType => 'type' in item
