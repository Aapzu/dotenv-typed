import dotenv from 'dotenv'
import fs from 'node:fs'

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn(
    (
      path: Parameters<typeof fs.readFileSync>[0],
      options?: Parameters<typeof fs.readFileSync>[1]
    ): string | Buffer => {
      const encoding = typeof options === 'string' ? options : options?.encoding
      const string = encoding
        ? path.toString()
        : Buffer.from(path.toString(), 'utf8')
      return `${string} readFileSync`
    }
  ),
}))

jest.mock('dotenv', () => ({
  ...jest.requireActual('dotenv'),
  parse: jest.fn(
    (
      src: Parameters<typeof dotenv.parse>[0]
    ): ReturnType<typeof dotenv.parse> => {
      return {
        PARSED: src.toString(),
      }
    }
  ),
}))
