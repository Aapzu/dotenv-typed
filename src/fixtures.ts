import {
  ConfigSchema,
  DotenvOutput,
  NormalizedConfigSchema,
} from '../src/types'

const nonNormalizedTestSchema = {
  BOOLEAN_TRUE: Boolean,
  BOOLEAN_FALSE: Boolean,
  NUMBER_INT: Number,
  NUMBER_FLOAT: Number,
  NUMBER_SCIENTIFIC: Number,
  STRING: String,
  ENUM: ['foo', 'bar'],
  NUMBER_ARRAY: Array(Number),
  STRING_ARRAY: Array(String),
  BOOLEAN_ARRAY: Array(Boolean),
}

export const NON_NORMALIZED_TEST_SCHEMA: ConfigSchema<
  typeof nonNormalizedTestSchema
> = nonNormalizedTestSchema

const normalizedTestSchema = {
  BOOLEAN_TRUE: { type: Boolean, default: false },
  BOOLEAN_FALSE: { type: Boolean, default: true },
  NUMBER_INT: { type: Number, default: 9 },
  NUMBER_FLOAT: { type: Number, default: 0.2 },
  NUMBER_SCIENTIFIC: { type: Number, default: 9e4 },
  STRING: { type: String, default: 'foo' },
  ENUM: { type: ['foo', 'bar'], default: 'bar' },
  NUMBER_ARRAY: { type: Array(Number), default: [1, 2, 3] },
  STRING_ARRAY: { type: Array(String), default: ['foo', 'bar', 'baz'] },
  BOOLEAN_ARRAY: { type: Array(Boolean), default: [true, false] },
}

export const NORMALIZED_TEST_SCHEMA: NormalizedConfigSchema<
  typeof normalizedTestSchema
> = normalizedTestSchema

export const TEST_CONFIG: DotenvOutput<typeof NORMALIZED_TEST_SCHEMA> = {
  STRING: 'foo',
  NUMBER_INT: '1234',
  NUMBER_FLOAT: '41.1337',
  NUMBER_SCIENTIFIC: '6.0221409e23',
  BOOLEAN_TRUE: 'true',
  BOOLEAN_FALSE: 'false',
  ENUM: 'foo',
  NUMBER_ARRAY: '1,2,3,4',
  STRING_ARRAY: 'foo,bar,baz',
  BOOLEAN_ARRAY: 'true,false',
}

export const INVALID_TEST_CONFIG: DotenvOutput<
  typeof NORMALIZED_TEST_SCHEMA
> = {
  STRING: 'cannot be invalid',
  NUMBER_INT: 'asdf',
  NUMBER_FLOAT: 'asdf',
  NUMBER_SCIENTIFIC: 'asdf',
  BOOLEAN_TRUE: 'asdf',
  BOOLEAN_FALSE: 'asdf',
  ENUM: 'baz',
  NUMBER_ARRAY: '1,2,foo,4',
  STRING_ARRAY: 'cannot be invalid',
  BOOLEAN_ARRAY: 'foo,bar',
}
