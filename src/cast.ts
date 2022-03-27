import { mapValues } from 'lodash'
import {
  DotenvOutput,
  EnvType,
  NormalizedConfigSchema,
} from './types/configTypes'

import { getItemTypeModule } from './utils'

const cast = <S extends NormalizedConfigSchema>(
  schema: S,
  config: DotenvOutput<S>
): EnvType<S> =>
  mapValues(schema, (schemaValue, key) => {
    const configValue = config[key]

    if (configValue === undefined) {
      if (schemaValue.default !== undefined) {
        return schemaValue.default
      }
      if (schemaValue.optional) {
        return undefined
      }
      throw new Error(
        `Config value for ${key} missing, even though 'optional' is not true`
      )
    }

    const { parse } = getItemTypeModule(schemaValue)

    return parse(configValue)
  }) as EnvType<S>

export default cast
