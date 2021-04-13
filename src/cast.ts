import { mapValues } from 'lodash'
import { isBooleanItem, isNumberItem, isStringItem } from './utils'
import { DotenvOutput, EnvType, NormalizedConfigSchema } from './types'

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

    if (isStringItem(schemaValue) && configValue) {
      return configValue
    }

    if (isNumberItem(schemaValue) && configValue) {
      return parseFloat(configValue)
    }

    if (isBooleanItem(schemaValue)) {
      return !!configValue && configValue.toLowerCase() === 'true'
    }

    return configValue
  }) as EnvType<S>

export default cast
