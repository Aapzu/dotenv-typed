import fs from 'fs'
import tmp from 'tmp'
import { TEST_CONFIG, NORMALIZED_TEST_SCHEMA } from './fixtures'
import { parse } from '..'
import { forOwn } from 'lodash'

describe('full test', () => {
  describe('dev mode with a .env file', () => {
    let fileName: string

    beforeAll(() => {
      const tmpFile = tmp.fileSync()
      fileName = tmpFile.name
      fs.writeFileSync(
        fileName,
        Object.entries(TEST_CONFIG).reduce(
          (acc, [key, value]) => acc.concat(`${key}=${value}\n`),
          ''
        )
      )
    })

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
  })
})
