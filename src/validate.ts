import { DotenvParseOutput } from 'dotenv'
import { forOwn } from 'lodash'
import {
  ConfigItemType,
  ConfigItemValue,
  NormalizedConfigSchema,
} from './types'
import { getItemTypeModule } from './utils'

const findMissingKeys = (
  schema: NormalizedConfigSchema,
  config: DotenvParseOutput
) => {
  const missingFromConfig = Object.keys(schema).filter(
    (key) => !(key in config)
  )
  const missingFromSchema = Object.keys(config).filter(
    (key) => !(key in schema)
  )

  if (missingFromConfig.length) {
    const keys = missingFromConfig.join(', ')
    const possiblePluralS = missingFromConfig.length > 1 ? 's' : ''
    throw new Error(`Value${possiblePluralS} for ${keys} missing from config`)
  }

  if (missingFromSchema.length) {
    const keys = missingFromSchema.join(', ')
    const possiblePluralS = missingFromSchema.length > 1 ? 's' : ''
    throw new Error(`Key${possiblePluralS} ${keys} missing from schema`)
  }
}

const isMissingValue = (
  key: string,
  schema: NormalizedConfigSchema,
  config: DotenvParseOutput
): boolean => {
  return !schema['optional'] && !config[key]
}

const getNotValidErrorMessage = (
  key: string,
  value: string,
  typeName: string
) => `Value ${value} of key ${key} is not a valid ${typeName}`

const getNotValidDefaultErrorMessage = <
  T extends ConfigItemValue<ConfigItemType>
>(
  key: string,
  value: T,
  typeName: string
) =>
  `Default value ${value.toString()} of key ${key} is not a valid ${typeName}`

const validate = <S extends NormalizedConfigSchema>(
  schema: S,
  config: DotenvParseOutput
) => {
  findMissingKeys(schema, config)

  forOwn(config, (configValue, key) => {
    const schemaObject = schema[key]

    if (isMissingValue(key, schema, config)) {
      throw new Error(`Missing value for key ${key}`)
    }

    if (!schemaObject) {
      throw new Error(
        `Missing key: ${key} (if this happens, something is seriously wrong)`
      )
    }

    const { validateStringValue, validateValue, typeName } = getItemTypeModule(
      schemaObject
    )

    if (!validateStringValue(configValue, schemaObject)) {
      throw new Error(getNotValidErrorMessage(key, configValue, typeName))
    }

    if (
      schemaObject?.default &&
      !validateValue(schemaObject.default, schemaObject)
    ) {
      throw new Error(
        getNotValidDefaultErrorMessage(key, schemaObject.default, typeName)
      )
    }
  })
}

export default validate
