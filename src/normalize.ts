import { mapValues } from 'lodash'
import { ConfigSchema, NormalizedConfigSchema } from './types'
import { isConfigItemObject } from './utils'

const normalize = <S extends ConfigSchema>(
  schema: S
): NormalizedConfigSchema<S> => {
  return mapValues(schema, (type) => {
    if (isConfigItemObject(type)) {
      return type
    } else {
      return { type }
    }
  }) as NormalizedConfigSchema<S>
}

export default normalize
