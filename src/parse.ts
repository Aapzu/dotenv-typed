import dotenv from 'dotenv'
import fs from 'fs'
// import camelCaseKeys from './casing'
import cast from './cast'
import normalize from './normalize'
import {
  ConfigSchema,
  DotenvOutput,
  EnvType,
  NormalizedConfigSchema,
} from './types'
import { resolve } from 'path'
import validate from './validate'
import { pick } from 'lodash'

interface ParseOptions {
  /**
   * You may specify a custom path if your file containing environment variables is located elsewhere.
   */
  path?: string
  /**
   * You may specify the encoding of your file containing environment variables.
   */
  encoding?: BufferEncoding

  /**
   * You may turn on logging to help debug why certain keys or values are not being set as you expect.
   */
  debug?: boolean

  /**
   * Validate that config items can be casted properly according to given schema
   */
  validate?: boolean

  /**
   * Variable definitions in .env file override process.env definitions
   */
  overrideProcessEnvVariables?: boolean
  /**
   * Use .env file also if NODE_ENV=production. `false` by default.
   */
  useDotenvInProduction?: boolean
  /**
   * Change the casing of the config object keys from snake_case or
   * SCREAMING_SNAKE_CASE to camelCase
   */
  camelCaseKeys?: boolean
}

const parse = <
  S extends ConfigSchema,
  CamelCaseKeys extends boolean | undefined
>(
  /**
   * .env file schema
   */
  schema: S,
  _camelCaseKeys?: CamelCaseKeys,
  {
    path = resolve(process.cwd(), '.env'),
    encoding = 'utf8',
    debug = false,
    validate: validateOpt = true,
    useDotenvInProduction = false,
    overrideProcessEnvVariables = false,
  }: // camelCaseKeys: camelCaseKeysOpt = false,
  Readonly<ParseOptions> = {}
): EnvType<
  NormalizedConfigSchema<S>,
  CamelCaseKeys extends true ? true : false
> => {
  let envFile = ''
  try {
    envFile = fs.readFileSync(path, { encoding })
  } catch (e) {
    /* File not found, defaulting to process.env variables */
  }
  const normalizedSchema = normalize(schema)

  const processEnvVariables = pick(process.env, Object.keys(schema)) as {
    [K in keyof S]: string
  }
  const parsedOutput =
    process.env['NODE_ENV'] !== 'production' || useDotenvInProduction
      ? dotenv.parse(envFile, { debug })
      : {}

  const config = overrideProcessEnvVariables
    ? { ...parsedOutput, ...processEnvVariables }
    : { ...processEnvVariables, ...parsedOutput }

  if (validateOpt) {
    validate(normalizedSchema, config)
  }

  const casted = cast(
    normalizedSchema,
    config as DotenvOutput<typeof normalizedSchema>
  )

  // const reCased = camelCaseKeysOpt ? camelCaseKeys(casted) : casted
  const reCased = casted

  return reCased
}

export default parse
