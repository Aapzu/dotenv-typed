import fs from 'fs'
import dotenv from 'dotenv'
import cast from '../src/cast'
import parse from '../src/parse'
import normalize from '../src/normalize'
import validate from '../src/validate'
import { ConfigSchema } from '../src/types'

jest.mock('../src/validate')
jest.mock('../src/normalize', () =>
  jest.fn((input: ConfigSchema) => ({
    ...input,
    normalized: true,
  }))
)
jest.mock('../src/cast')

const TEST_SCHEMA = {
  FOO: String,
}

describe('parse', () => {
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

  it('calls dotenv.parse with the config file and debug option', () => {
    parse(TEST_SCHEMA, {
      debug: true,
      path: 'foobar',
    })
    expect(dotenv.parse).toBeCalledTimes(1)
    expect(dotenv.parse).toBeCalledWith('foobar readFileSync', { debug: true })
  })

  it('normalized the schema', () => {
    parse(TEST_SCHEMA)
    expect(normalize).toBeCalledTimes(1)
    expect(normalize).toBeCalledWith(TEST_SCHEMA)
  })

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
