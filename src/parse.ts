import dotenv from 'dotenv'
import fs from 'fs'
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
}

const parse = <S extends ConfigSchema>(
  /**
   * .env file schema
   */
  schema: S,
  {
    path = resolve(process.cwd(), '.env'),
    encoding = 'utf8',
    debug = false,
    validate: validateOpt = true,
    overrideProcessEnvVariables = false,
  }: ParseOptions = {}
): EnvType<NormalizedConfigSchema<S>> => {
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
    process.env['NODE_ENV'] === 'production'
      ? {}
      : dotenv.parse(envFile, { debug })

  const config = overrideProcessEnvVariables
    ? Object.assign(parsedOutput, processEnvVariables)
    : Object.assign(processEnvVariables, parsedOutput)

  if (validateOpt) {
    validate(normalizedSchema, config)
  }

  return cast(normalizedSchema, config as DotenvOutput<typeof normalizedSchema>)
}

export default parse
