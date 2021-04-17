import { /*DotenvParseOptions, */ DotenvParseOutput } from 'dotenv'
import { BaseEncodingOptions, PathLike } from 'fs'

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn(
    (
      path: PathLike | number,
      options?:
        | (BaseEncodingOptions & { flag?: string })
        | BufferEncoding
        | null
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
      src: string | Buffer /*, options?: DotenvParseOptions*/
    ): DotenvParseOutput => {
      return {
        PARSED: src.toString(),
      }
    }
  ),
}))
