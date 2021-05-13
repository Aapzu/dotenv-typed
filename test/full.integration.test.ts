import fs from 'fs'
import tmp from 'tmp'
import { DotenvOutput } from '../src/types'
import {
  TEST_CONFIG,
  NORMALIZED_TEST_SCHEMA,
  EMPTY_TEST_CONFIG,
} from './fixtures'
import { parse } from '..'
import { forOwn, pick } from 'lodash'

const writeConfigIntoFile = (config: DotenvOutput) => {
  const tmpFile = tmp.fileSync()
  const fileName = tmpFile.name
  fs.writeFileSync(
    fileName,
    Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')
  )
  return fileName
}

const removeFile = fs.unlinkSync

describe('full test', () => {
  describe('dev mode with a .env file', () => {
    let fileName: string

    beforeAll(() => {
      fileName = writeConfigIntoFile(TEST_CONFIG)
    })

    afterAll(() => removeFile(fileName))

    it('parses the config from .env file to correct format', () => {
      const config = parse(NORMALIZED_TEST_SCHEMA, { path: fileName })
      expect(config).toEqual({
        STRING: 'foo',
        NUMBER_INT: 1234,
        NUMBER_FLOAT: 41.1337,
        NUMBER_SCIENTIFIC: 6.0221409e23,
        BOOLEAN_TRUE: true,
        BOOLEAN_FALSE: false,
        BOOLEAN_ARRAY: [true, false],
        ENUM: 'foo',
        NUMBER_ARRAY: [1, 2, 3, 4],
        STRING_ARRAY: ['foo', 'bar', 'baz'],
      })
    })

    it('parses the config from .env file to correct format with camelCase keys', () => {
      const config = parse(NORMALIZED_TEST_SCHEMA, {
        path: fileName,
        camelCaseKeys: true,
      })
      expect(config).toEqual({
        string: 'foo',
        numberInt: 1234,
        numberFloat: 41.1337,
        numberScientific: 6.0221409e23,
        booleanTrue: true,
        booleanFalse: false,
        booleanArray: [true, false],
        enum: 'foo',
        numberArray: [1, 2, 3, 4],
        stringArray: ['foo', 'bar', 'baz'],
      })
    })

    it("doesn't return keys missing from schema", () => {
      const val = parse(
        {
          STRING: String,
        },
        { path: fileName }
      )
      expect(val).toEqual({
        STRING: 'foo',
      })
    })
  })

  describe('prod mode with variables coming from process.env', () => {
    const originalProcessEnv: { [key: string]: string | undefined } = {}
    beforeAll(() => {
      originalProcessEnv['NODE_ENV'] = process.env['NODE_ENV']
      process.env['NODE_ENV'] = 'production'
      forOwn(TEST_CONFIG, (value, key) => {
        originalProcessEnv[key] = process.env[key]
        process.env[key] = value
      })
    })

    afterAll(() => {
      process.env['NODE_ENV'] = originalProcessEnv['NODE_ENV']
      forOwn(TEST_CONFIG, (_value, key) => {
        process.env[key] = originalProcessEnv[key]
      })
    })

    it('parses the config from .env file to correct format', () => {
      const config = parse(NORMALIZED_TEST_SCHEMA)
      expect(config).toEqual({
        STRING: 'foo',
        NUMBER_INT: 1234,
        NUMBER_FLOAT: 41.1337,
        NUMBER_SCIENTIFIC: 6.0221409e23,
        BOOLEAN_TRUE: true,
        BOOLEAN_FALSE: false,
        BOOLEAN_ARRAY: [true, false],
        ENUM: 'foo',
        NUMBER_ARRAY: [1, 2, 3, 4],
        STRING_ARRAY: ['foo', 'bar', 'baz'],
      })
    })

    it('parses the config from .env file to correct format with camelCase keys', () => {
      const config = parse(NORMALIZED_TEST_SCHEMA, { camelCaseKeys: true })
      expect(config).toEqual({
        string: 'foo',
        numberInt: 1234,
        numberFloat: 41.1337,
        numberScientific: 6.0221409e23,
        booleanTrue: true,
        booleanFalse: false,
        booleanArray: [true, false],
        enum: 'foo',
        numberArray: [1, 2, 3, 4],
        stringArray: ['foo', 'bar', 'baz'],
      })
    })
  })

  describe('with empty config', () => {
    let fileName: string

    beforeAll(() => {
      fileName = writeConfigIntoFile(EMPTY_TEST_CONFIG)
    })

    afterAll(() => removeFile(fileName))

    it('parses empty values properly', () => {
      const config = parse(
        pick(NORMALIZED_TEST_SCHEMA, [
          'STRING',
          'BOOLEAN_ARRAY',
          'NUMBER_ARRAY',
          'STRING_ARRAY',
        ]),
        { path: fileName }
      )
      expect(config).toEqual({
        STRING: '',
        BOOLEAN_ARRAY: [],
        NUMBER_ARRAY: [],
        STRING_ARRAY: [],
      })
    })
  })
})
