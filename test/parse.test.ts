import fs from 'fs'
import { resolve } from 'path'
import dotenv from 'dotenv'
import cast from '../src/cast'
import parse from '../src/parse'
import normalize from '../src/normalize'
import validate from '../src/validate'
import * as casing from '../src/casing'
import { ConfigSchema, EnvType, NormalizedConfigSchema } from '../src/types'

jest.mock('../src/validate')
jest.mock('../src/normalize', () =>
  jest.fn((input: ConfigSchema) => ({
    ...input,
    normalized: true,
  }))
)
jest.mock('../src/cast', () =>
  jest.fn(
    (
      _schema: NormalizedConfigSchema,
      config: EnvType<NormalizedConfigSchema>
    ) => ({
      ...config,
      casted: true,
    })
  )
)
jest.spyOn(casing, 'camelCaseKeys')

const TEST_SCHEMA = {
  FOO: String,
}

describe('parse', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('file reading', () => {
    it('reads the correct file with correct encoding', () => {
      parse(TEST_SCHEMA, {
        encoding: 'ascii',
        path: 'foobar',
      })
      expect(fs.readFileSync).toBeCalledTimes(1)
      expect(fs.readFileSync).toBeCalledWith('foobar', {
        encoding: 'ascii',
      })
    })

    it('defaults to .env in project root', () => {
      parse(TEST_SCHEMA)
      expect(fs.readFileSync).toBeCalledTimes(1)
      expect(fs.readFileSync).toBeCalledWith(resolve(process.cwd(), '.env'), {
        encoding: 'utf8',
      })
    })
  })

  describe('parsing .env file to strings', () => {
    it('calls dotenv.parse with the config file', () => {
      parse(TEST_SCHEMA, {
        path: 'foobar',
      })
      expect(dotenv.parse).toBeCalledTimes(1)
      expect(dotenv.parse).toBeCalledWith('foobar readFileSync')
    })

    it('passed debug option to dotenv.parse', () => {
      parse(TEST_SCHEMA, {
        debug: true,
        path: 'foobar',
      })
      expect(dotenv.parse).toBeCalledTimes(1)
      expect(dotenv.parse).toBeCalledWith('foobar readFileSync', {
        debug: true,
      })
    })

    it('calls dotenv.parse even if NODE_ENV=production if useDotenvInProduction=true', () => {
      const oldNodeEnv = process.env['NODE_ENV']
      process.env['NODE_ENV'] = 'production'
      parse(TEST_SCHEMA, {
        path: 'foobar',
        useDotenvInProduction: true,
      })
      expect(dotenv.parse).toBeCalledTimes(1)
      expect(dotenv.parse).toBeCalledWith('foobar readFileSync')
      process.env['NODE_ENV'] = oldNodeEnv
    })

    it("doesn't call dotenv.parse if NODE_ENV=production", () => {
      const oldNodeEnv = process.env['NODE_ENV']
      process.env['NODE_ENV'] = 'production'
      parse(TEST_SCHEMA, {
        path: 'foobar',
      })
      expect(dotenv.parse).not.toBeCalled()
      process.env['NODE_ENV'] = oldNodeEnv
    })
  })

  describe('prioritization', () => {
    it('prioritizes process.env variables if overrideProcessEnvVariables by default', () => {
      const oldVal = process.env['FOO']
      process.env['FOO'] = 'bar'
      jest.spyOn(dotenv, 'parse').mockReturnValueOnce({
        FOO: 'baz',
      })
      parse({
        FOO: String,
      })
      expect(cast).toBeCalledWith(expect.objectContaining({ FOO: String }), {
        FOO: 'bar',
      })
      process.env['FOO'] = oldVal
    })

    it('prioritizes process.env variables if overrideProcessEnvVariables is false', () => {
      const oldVal = process.env['FOO']
      process.env['FOO'] = 'bar'
      jest.spyOn(dotenv, 'parse').mockReturnValueOnce({
        FOO: 'baz',
      })
      parse(
        {
          FOO: String,
        },
        {
          overrideProcessEnvVariables: false,
        }
      )
      expect(cast).toBeCalledWith(expect.objectContaining({ FOO: String }), {
        FOO: 'bar',
      })
      process.env['FOO'] = oldVal
    })

    it('prioritizes .env variables if overrideProcessEnvVariables is true', () => {
      const oldVal = process.env['FOO']
      process.env['FOO'] = 'bar'
      jest.spyOn(dotenv, 'parse').mockReturnValueOnce({
        FOO: 'baz',
      })
      parse(
        {
          FOO: String,
        },
        {
          overrideProcessEnvVariables: true,
        }
      )
      expect(cast).toBeCalledWith(expect.objectContaining({ FOO: String }), {
        FOO: 'baz',
      })
      process.env['FOO'] = oldVal
    })
  })

  describe('normalize', () => {
    it('normalized the schema', () => {
      parse(TEST_SCHEMA)
      expect(normalize).toBeCalledTimes(1)
      expect(normalize).toBeCalledWith(TEST_SCHEMA)
    })
  })

  describe('validate', () => {
    it('calls validate with the normalized schema and config', () => {
      parse(TEST_SCHEMA, { path: 'foobar' })
      expect(validate).toBeCalledTimes(1)
      expect(validate).toBeCalledWith(
        { ...TEST_SCHEMA, normalized: true },
        {
          PARSED: 'foobar readFileSync',
        }
      )
    })

    it("doesn't call validate if validate=false given", () => {
      parse(TEST_SCHEMA, {
        validate: false,
      })
      expect(validate).not.toBeCalled()
    })

    it('throws if validate throws', () => {
      ;(validate as jest.Mock<typeof validate>).mockImplementationOnce(() => {
        throw new Error('foobar')
      })
      expect(() => {
        parse(TEST_SCHEMA)
      }).toThrow('foobar')
    })
  })

  describe('casting', () => {
    it('calls cast with the parsed object', () => {
      parse(TEST_SCHEMA, {
        path: 'foobar',
      })
      expect(cast).toBeCalledTimes(1)
      expect(cast).toBeCalledWith(
        { ...TEST_SCHEMA, normalized: true },
        {
          PARSED: 'foobar readFileSync',
        }
      )
    })
  })

  describe('casing', () => {
    it('does not call camelCaseKeys by default', () => {
      parse(TEST_SCHEMA, {
        path: 'foobar',
      })
      expect(casing.camelCaseKeys).not.toBeCalled()
    })

    it('does not call camelCaseKeys if options.camelCaseKeys = false', () => {
      parse(TEST_SCHEMA, {
        path: 'foobar',
        camelCaseKeys: false,
      })
      expect(casing.camelCaseKeys).not.toBeCalled()
    })

    it('calls camelCaseKeys if options.camelCaseKeys = true', () => {
      parse(TEST_SCHEMA, {
        path: 'foobar',
        camelCaseKeys: true,
      })
      expect(casing.camelCaseKeys).toBeCalledTimes(1)
      expect(casing.camelCaseKeys).toBeCalledWith({
        PARSED: 'foobar readFileSync',
        casted: true,
      })
    })
  })
})
