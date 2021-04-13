import validate from '../src/validate'
import { INVALID_TEST_CONFIG, TEST_CONFIG, TEST_SCHEMA } from './fixtures'

describe('validate', () => {
  it("doesn't throw if called with valid schema and config", () => {
    expect(() => {
      validate(TEST_SCHEMA, TEST_CONFIG)
    }).not.toThrow()
  })

  it('throws if one key is missing from config', () => {
    expect(() => {
      validate(
        {
          STRING: TEST_SCHEMA.STRING,
          NUMBER_INT: TEST_SCHEMA.NUMBER_INT,
        },
        // @ts-ignore
        { NUMBER_INT: TEST_CONFIG.NUMBER_INT }
      )
    }).toThrow('Value for STRING missing from config')
  })

  it('throws if multiple keys are missing from config', () => {
    expect(() => {
      validate(
        {
          STRING: TEST_SCHEMA.STRING,
          NUMBER_INT: TEST_SCHEMA.NUMBER_INT,
          BOOLEAN_TRUE: TEST_SCHEMA.BOOLEAN_TRUE,
        },
        // @ts-ignore
        { STRING: TEST_CONFIG.NUMBER_INT }
      )
    }).toThrow('Values for NUMBER_INT, BOOLEAN_TRUE missing from config')
  })

  it('throws if one key is missing from schema', () => {
    expect(() => {
      validate(
        { NUMBER_INT: TEST_SCHEMA.NUMBER_INT },
        {
          NUMBER_INT: TEST_CONFIG.NUMBER_INT,
          // @ts-ignore
          NUMBER_INT_FLOAT: TEST_CONFIG.NUMBER_INT_FLOAT,
        }
      )
    }).toThrow('Key NUMBER_INT_FLOAT missing from schema')
  })

  it('throws if multiple keys are missing from schema', () => {
    expect(() => {
      validate(
        { STRING: TEST_SCHEMA.STRING },
        {
          STRING: TEST_CONFIG.STRING,
          // @ts-ignore
          NUMBER_INT: TEST_CONFIG.NUMBER_INT,
          BOOLEAN_TRUE: TEST_CONFIG.BOOLEAN_TRUE,
        }
      )
    }).toThrow('Keys NUMBER_INT, BOOLEAN_TRUE missing from schema')
  })

  it('throws if the config contains and invalid NUMBER_INT', () => {
    expect(() => {
      validate(
        { NUMBER_INT: TEST_SCHEMA.NUMBER_INT },
        {
          NUMBER_INT: INVALID_TEST_CONFIG.NUMBER_INT,
        }
      )
    }).toThrow('Value asdf of key NUMBER_INT is not a valid Number')
  })

  it('throws if the config contains and invalid BOOLEAN_TRUE', () => {
    expect(() => {
      validate(
        { BOOLEAN_TRUE: TEST_SCHEMA.BOOLEAN_TRUE },
        {
          BOOLEAN_TRUE: INVALID_TEST_CONFIG.BOOLEAN_TRUE,
        }
      )
    }).toThrow('Value asdf of key BOOLEAN_TRUE is not a valid Boolean')
  })
})
