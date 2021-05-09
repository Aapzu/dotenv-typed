import { DotenvParseOutput } from 'dotenv'
import { forOwn } from 'lodash'
import {
  ConfigItemDefaultValue,
  ConfigItemType,
  NormalizedConfigSchema,
} from './types'
import { getItemTypeModule } from './utils'

const isMissingValue = (
  key: string,
  schema: NormalizedConfigSchema,
  config: DotenvParseOutput
): boolean => {
  const schemaObject = schema[key]
  const configObject = config[key]
  if (
    schemaObject &&
    (schemaObject['optional'] || schemaObject['default'] !== undefined)
  ) {
    return false
  }
  return configObject === undefined
}

const getNotValidErrorMessage = (
  key: string,
  value: string,
  typeName: string
) => `Value ${value} of key ${key} is not a valid ${typeName}`

const getNotValidDefaultErrorMessage = <
  T extends ConfigItemDefaultValue<ConfigItemType>
>(
  key: string,
  value: T,
  typeName: string
) =>
  `Default value ${value.toString()} of key ${key} is not a valid ${typeName}`

const validate = <S extends NormalizedConfigSchema>(
  schema: S,
  config: DotenvParseOutput
): void => {
  forOwn(schema, (schemaObject, key) => {
    if (isMissingValue(key, schema, config)) {
      throw new Error(`Value for ${key} missing from config`)
    }

    const configValue = config[key]

    const { validateStringValue, validateValue, typeName } = getItemTypeModule(
      schemaObject
    )

    const type = typeof typeName === 'string' ? typeName : typeName(schema[key])

    // If configValue === undefined, we know there must be a default value or optional === true
    if (configValue !== undefined) {
      if (!validateStringValue(configValue, schemaObject)) {
        throw new Error(getNotValidErrorMessage(key, configValue, type))
      }
    }

    if (
      schemaObject?.default &&
      !validateValue(schemaObject.default, schemaObject)
    ) {
      throw new Error(
        getNotValidDefaultErrorMessage(key, schemaObject.default, type)
      )
    }
  })
}

export default validate
