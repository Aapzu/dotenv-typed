import { mapValues } from 'lodash'
import { ConfigSchema, NormalizedConfigSchema } from './types/configTypes'
import { ConfigItem, ConfigItemObjectType } from './types/configItemTypes'
import { isConfigItemObject } from './utils/configUtils'

export const normalizeConfigItem = (item: ConfigItem): ConfigItemObjectType => {
  if (isConfigItemObject(item)) {
    return item
  } else {
    return { type: item }
  }
}

const normalizeSchema = <S extends ConfigSchema>(
  schema: S
): NormalizedConfigSchema<S> => {
  return mapValues(schema, normalizeConfigItem) as NormalizedConfigSchema<S>
}

export default normalizeSchema
