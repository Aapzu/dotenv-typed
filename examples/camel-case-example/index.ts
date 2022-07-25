import { parse } from '../../index'

const SCHEMA = {
  BOOLEAN_ARRAY: Array(Boolean),
  BOOLEAN_FALSE: Boolean,
  BOOLEAN_TRUE: Boolean,
  ENUM: ['foo', 'bar'],
  NUMBER_ARRAY: Array(Number),
  NUMBER_FLOAT: Number,
  NUMBER_INT: Number,
  NUMBER_SCIENTIFIC: Number,
  STRING: String,
  STRING_ARRAY: Array(String),
  OPTIONAL_NUMBER: { type: Number, optional: true },
} as const

// These would usually be set somewhere else
process.env['BOOLEAN_FALSE'] = 'false'
process.env['NUMBER_ARRAY'] = '1,2,3,4'
process.env['NUMBER_SCIENTIFIC'] = '6.0221409e23'

const config = parse(SCHEMA, {
  camelCaseKeys: true,
})

type ExpectedSchemaType = {
  booleanArray: boolean[]
  booleanFalse: boolean
  booleanTrue: boolean
  enum: 'foo' | 'bar'
  numberArray: number[]
  numberFloat: number
  numberInt: number
  numberScientific: number
  string: string
  stringArray: string[]
  optionalNumber?: number
}
const testType = (c: ExpectedSchemaType) => c
testType(config)

console.log(JSON.stringify(config, null, '  '))
