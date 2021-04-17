import { mapValues } from 'lodash'
import {
  ConfigItem,
  ConfigItemObjectType,
  ConfigSchema,
  NormalizedConfigSchema,
} from './types'
import { isConfigItemObject } from './utils'

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
