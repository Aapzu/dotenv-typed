import fs from 'fs'
import tmp from 'tmp'
import { TEST_CONFIG, TEST_SCHEMA } from './fixtures'
import { parse } from '..'

describe('full test', () => {
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
    const config = parse(fileName, TEST_SCHEMA)
    expect(config).toEqual({
      STRING: 'foo',
      NUMBER_INT: 1234,
      NUMBER_FLOAT: 41.1337,
      NUMBER_SCIENTIFIC: 6.0221409e23,
      BOOLEAN_TRUE: true,
      BOOLEAN_FALSE: false,
    })
  })
})
