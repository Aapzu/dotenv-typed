# tsdotenv

Tsdotenv is a package which generates a validated and strongly typed config object from `.env` file (or `process.env` variables).

[![Travis (.com)](https://img.shields.io/travis/com/aapzu/tsdotenv?logo=travis&style=flat-square)](https://www.travis-ci.com/github/Aapzu/tsdotenv) [![GitHub](https://img.shields.io/github/license/aapzu/tsdotenv?style=flat-square)](https://github.com/Aapzu/tsdotenv/blob/master/LICENSE)

## Installation

```bash
# using npm
npm install @aapzu/tsdotenv

# using yarn
yarn add @aapzu/tsdotenv
```

## Usage

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:

```
DB_HOST=localhost
DB_PORT=5432
DEBUG=true
```

Create a config file as a single place of truth for the environment variables

```typescript
import { parse } from '@aapzu/tsdotenv'

const SCHEMA = {
  DB_HOST: String,
  DB_PORT: { type: Number, default: 3000 },
  DEBUG: { type: Boolean, optional: true },
  CUSTOM_ENV: { type: ['test', 'prod'] },
  // enums and optionals only get typed properly if the
  // schema is a readonly object
} as const

const config = parse(SCHEMA, {
  path: 'path_to_dotenv_file',
})

/*
  typeof config = {
    DB_HOST: string,
    DB_PORT: number,
    DEBUG: boolean | undefined
    CUSTOM_ENV: 'test' | 'prod'
  }
 */
export default config
```

Use that config file in other files

```typescript
import config from '../path/to/config'

console.log(DB_HOST, typeof DB_HOST)
// localhost string

console.log(DB_PORT, typeof DB_PORT)
// 5432 number

console.log(DEBUG, typeof DEBUG)
// true boolean
```

### Schema

Schema is the heart of the library. The parsing and validation of the values is done according to the schema. Possible schema value types are:

| name          | syntax               |
| ------------- | -------------------- |
| string        | String               |
| number        | Number               |
| boolean       | Boolean              |
| enum          | ['value1', 'value2'] |
| string array  | Array(String)        |
| number array  | Array(Number)        |
| boolean array | Array(Boolean)       |

A schema item has type and possibly a default value. If the item has `optional: true` without a default value, it's possible that the value ends up being undefined.

An example schema is as follows:

```typescript
const schema = {
  BOOLEAN_ARRAY: Array(Boolean),
  BOOLEAN: {
    type: Boolean,
    optional: true,
  },
  ENUM: {
    type: ['foo', 'bar'],
    default: 'foo',
  },
  NUMBER_ARRAY: Array(Number),
  NUMBER: {
    type: Number,
    default: 42,
  },
  STRING: String,
  STRING_ARRAY: Array(String),
}
```

### Options

#### path

Default: `path.resolve(process.cwd(), '.env')`

You may specify a custom path if your file containing environment variables is located elsewhere.

```js
parse(schema, { path: '/custom/path/to/.env' })
```

#### camelCaseKeys

Default: `false`

Maps the keys of the config object into camelCase. Example:

```
import { parse } from '@aapzu/tsdotenv'

const config = parse({
  DB_HOST: String,
  DB_PORT: { type: Number, default: 3000 },
}, {
  path: 'path_to_dotenv_file',
  camelCaseKeys: true
})

/*
  typeof config = {
    dbHost: string,
    dbPort: number,
  }
 */
export default config
```

#### encoding

Default: `utf8`

You may specify the encoding of your file containing environment variables.

```js
parse(schema, { encoding: 'latin1' })
```

#### debug

Default: `false`

You may turn on logging to help debug why certain keys or values are not being set as you expect.

```js
parse(schema, { debug: process.env.DEBUG })
```
