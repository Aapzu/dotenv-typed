import validate from '../src/validate'
import {
  INVALID_TEST_CONFIG,
  TEST_CONFIG,
  NORMALIZED_TEST_SCHEMA,
} from './fixtures'
import { omit } from 'lodash'

describe('validate', () => {
  it("doesn't throw if called with valid schema and config", () => {
    expect(() => {
      validate(NORMALIZED_TEST_SCHEMA, TEST_CONFIG)
    }).not.toThrow()
  })

  it('throws if one key is missing from config', () => {
    expect(() => {
      validate(
        {
          STRING: { ...NORMALIZED_TEST_SCHEMA.STRING, default: undefined },
          NUMBER_INT: NORMALIZED_TEST_SCHEMA.NUMBER_INT,
        },
        { NUMBER_INT: TEST_CONFIG.NUMBER_INT }
      )
    }).toThrow('Value for STRING missing from config')
  })

  it('throws if multiple keys are missing from config', () => {
    expect(() => {
      validate(
        {
          STRING: { ...NORMALIZED_TEST_SCHEMA.STRING, default: undefined },
          NUMBER_INT: {
            ...NORMALIZED_TEST_SCHEMA.NUMBER_INT,
            default: undefined,
          },
          BOOLEAN_TRUE: {
            ...NORMALIZED_TEST_SCHEMA.BOOLEAN_TRUE,
            default: undefined,
          },
        },
        { STRING: TEST_CONFIG.NUMBER_INT }
      )
    }).toThrow('Values for NUMBER_INT, BOOLEAN_TRUE missing from config')
  })

  it("doesn't throw if a key is missing but it's optional", () => {
    expect(() => {
      validate(
        {
          STRING: { ...NORMALIZED_TEST_SCHEMA.STRING, optional: true },
        },
        {}
      )
    }).not.toThrow()
  })

  it("doesn't throw if a key is missing but it has a default value", () => {
    expect(() => {
      validate(
        {
          STRING: { ...NORMALIZED_TEST_SCHEMA.STRING, default: 'foobar' },
        },
        {}
      )
    }).not.toThrow()
  })

  it.each(
    Object.keys(
      omit(NORMALIZED_TEST_SCHEMA, 'STRING', 'STRING_ARRAY')
    ) as (keyof typeof NORMALIZED_TEST_SCHEMA)[]
  )('throws if the config contains an invalid %s', (key) => {
    const value = INVALID_TEST_CONFIG[key]
    expect(() => {
      validate(
        { [key]: NORMALIZED_TEST_SCHEMA[key] },
        {
          [key]: INVALID_TEST_CONFIG[key],
        }
      )
    }).toThrow(`Value ${value} of key ${key} is not a valid`)
  })

  it.each(
    Object.keys(
      omit(NORMALIZED_TEST_SCHEMA, 'STRING', 'STRING_ARRAY')
    ) as (keyof typeof NORMALIZED_TEST_SCHEMA)[]
  )('throws if the config contains an invalid %s', (key) => {
    const value = INVALID_TEST_CONFIG[key]
    expect(() => {
      validate(
        { [key]: NORMALIZED_TEST_SCHEMA[key] },
        {
          [key]: INVALID_TEST_CONFIG[key],
        }
      )
    }).toThrow(`Value ${value} of key ${key} is not a valid`)
  })
})
