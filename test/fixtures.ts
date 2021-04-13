import {
  ConfigSchema,
  DotenvOutput,
  NormalizedConfigSchema,
} from '../src/types'

export const TEST_SCHEMA: NormalizedConfigSchema = {
  BOOLEAN_TRUE: { type: Boolean },
  BOOLEAN_FALSE: { type: Boolean },
  NUMBER_INT: { type: Number },
  NUMBER_FLOAT: { type: Number },
  NUMBER_SCIENTIFIC: { type: Number },
  STRING: { type: String },
  ENUM: { type: ['foo', 'bar'] },
  NUMBER_ARRAY: { type: Array(Number) },
  STRING_ARRAY: { type: Array(String) },
  // OBJECT: Object,
}

export const TEST_SCHEMA2: ConfigSchema = {
  BOOLEAN_TRUE: { type: Boolean },
  BOOLEAN_FALSE: { type: Boolean },
  NUMBER_INT: { type: Number },
  NUMBER_FLOAT: { type: Number },
  NUMBER_SCIENTIFIC: { type: Number },
  STRING: { type: String },
  ENUM: { type: ['foo', 'bar'] },
  NUMBER_ARRAY: { type: Array(Number) },
  STRING_ARRAY: { type: Array(String) },
  // OBJECT: Object,
}

export const TEST_CONFIG: DotenvOutput<typeof TEST_SCHEMA> = {
  STRING: 'foo',
  NUMBER_INT: '1234',
  NUMBER_FLOAT: '41.1337',
  NUMBER_SCIENTIFIC: '6.0221409e23',
  BOOLEAN_TRUE: 'true',
  BOOLEAN_FALSE: 'false',
  ENUM: 'foo',
  NUMBER_ARRAY: '1, 2, 3, 4',
  STRING_ARRAY: 'foo, bar, baz',
  // OBJECT: '{ "foo": 1, "bar": "baz" }',
}

export const INVALID_TEST_CONFIG: DotenvOutput<typeof TEST_SCHEMA> = {
  STRING: 'cannot be invalid',
  NUMBER_INT: 'asdf',
  NUMBER_FLOAT: 'asdf',
  NUMBER_SCIENTIFIC: 'asdf',
  BOOLEAN_TRUE: 'asdf',
  BOOLEAN_FALSE: 'asdf',
  ENUM: 'baz',
  NUMBER_ARRAY: '1, 2, 3, 4',
  STRING_ARRAY: 'foo, bar, baz',
  // OBJECT: '{ "foo": 1, "bar": "baz" }',
}
