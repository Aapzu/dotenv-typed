import {
  ConfigSchema,
  DotenvOutput,
  NormalizedConfigSchema,
} from '../src/types/configTypes'

const nonNormalizedTestSchema = {
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
} as const

export const NON_NORMALIZED_TEST_SCHEMA: ConfigSchema<
  typeof nonNormalizedTestSchema
> = nonNormalizedTestSchema

const normalizedTestSchema = {
  BOOLEAN_ARRAY: { type: Array(Boolean), default: [true, false] },
  BOOLEAN_FALSE: { type: Boolean, default: false },
  BOOLEAN_TRUE: { type: Boolean, default: true },
  ENUM: { type: ['foo', 'bar'], default: 'bar' },
  NUMBER_ARRAY: { type: Array(Number), default: [1, 2, 3] },
  NUMBER_FLOAT: { type: Number, default: 0.2 },
  NUMBER_INT: { type: Number, default: 9 },
  NUMBER_SCIENTIFIC: { type: Number, default: 9e4 },
  STRING: { type: String, default: 'foo' },
  STRING_ARRAY: { type: Array(String), default: ['foo', 'bar', 'baz'] },
} as const

export const NORMALIZED_TEST_SCHEMA: NormalizedConfigSchema<
  typeof normalizedTestSchema
> = normalizedTestSchema

const normalizedTestSchemaWithOptionals = {
  BOOLEAN_ARRAY: { type: Array(Boolean), optional: true },
  BOOLEAN_FALSE: { type: Boolean, optional: true },
  BOOLEAN_TRUE: { type: Boolean, optional: true },
  ENUM: { type: ['foo', 'bar'], optional: true },
  NUMBER_ARRAY: { type: Array(Number), optional: true },
  NUMBER_FLOAT: { type: Number, optional: true },
  NUMBER_INT: { type: Number, optional: true },
  NUMBER_SCIENTIFIC: { type: Number, optional: true },
  STRING: { type: String, optional: true },
  STRING_ARRAY: { type: Array(String), optional: true },
} as const
export const NORMALIZED_TEST_SCHEMA_WITH_OPTIONALS: NormalizedConfigSchema<
  typeof normalizedTestSchemaWithOptionals
> = normalizedTestSchemaWithOptionals

export const TEST_CONFIG: DotenvOutput<typeof NORMALIZED_TEST_SCHEMA> = {
  BOOLEAN_ARRAY: 'true,false',
  BOOLEAN_FALSE: 'false',
  BOOLEAN_TRUE: 'true',
  ENUM: 'foo',
  NUMBER_ARRAY: '1,2,3,4',
  NUMBER_FLOAT: '41.1337',
  NUMBER_INT: '1234',
  NUMBER_SCIENTIFIC: '6.0221409e23',
  STRING: 'foo',
  STRING_ARRAY: 'foo,bar,baz',
}

export const EMPTY_TEST_CONFIG: DotenvOutput<
  Pick<
    typeof NORMALIZED_TEST_SCHEMA,
    'BOOLEAN_ARRAY' | 'STRING_ARRAY' | 'NUMBER_ARRAY' | 'STRING'
  >
> = {
  BOOLEAN_ARRAY: '',
  NUMBER_ARRAY: '',
  STRING: '',
  STRING_ARRAY: '',
}

export const INVALID_TEST_CONFIG: DotenvOutput<
  typeof NORMALIZED_TEST_SCHEMA
> = {
  BOOLEAN_ARRAY: 'foo,bar',
  BOOLEAN_FALSE: 'asdf',
  BOOLEAN_TRUE: 'asdf',
  ENUM: 'baz',
  NUMBER_ARRAY: '1,2,foo,4',
  NUMBER_FLOAT: 'asdf',
  NUMBER_INT: 'asdf',
  NUMBER_SCIENTIFIC: 'asdf',
  STRING: 'cannot be invalid',
  STRING_ARRAY: 'cannot be invalid',
}
