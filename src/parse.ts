import dotenv from 'dotenv'
import fs from 'fs'
import cast from './cast'
import normalize from './normalize'
import { ConfigSchema, DotenvOutput } from './types'
import { resolve } from 'path'
import validate from './validate'

interface ParseOptions {
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
}

const parse = <S extends ConfigSchema>(
  /**
   * You may specify a custom path if your file containing environment variables is located elsewhere.
   */
  path: string = resolve(process.cwd(), '.env'),
  /**
   * .env file schema
   */
  schema: S,
  {
    encoding = 'utf8',
    debug = false,
    validate: validateOpt = true,
  }: ParseOptions = {}
) => {
  const envFile = fs.readFileSync(path, { encoding })
  const normalizedSchema = normalize(schema)
  const parsedOutput = dotenv.parse(envFile, { debug })

  if (validateOpt) {
    validate(normalizedSchema, parsedOutput)
  }

  return cast(
    normalizedSchema,
    parsedOutput as DotenvOutput<typeof normalizedSchema>
  )
}

export default parse
