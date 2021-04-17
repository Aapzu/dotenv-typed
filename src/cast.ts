import { mapValues } from 'lodash'
import { DotenvOutput, EnvType, NormalizedConfigSchema } from './types'

import { getItemTypeModule } from './utils'

const cast = <S extends NormalizedConfigSchema>(
  schema: S,
  config: DotenvOutput<S>
): EnvType<S> =>
  mapValues(schema, (schemaValue, key) => {
    const configValue = config[key]

    if (configValue === undefined || configValue === '') {
      if (schemaValue.default !== undefined) {
        return schemaValue.default
      }
      if (schemaValue.optional) {
        return undefined
      }
    }

    const { parse } = getItemTypeModule(schemaValue)

    return parse(configValue!)
  }) as EnvType<S>

export default cast
