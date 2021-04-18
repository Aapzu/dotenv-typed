import { expectType } from 'tsd'
import { parse } from '..'
import { NORMALIZED_TEST_SCHEMA } from './fixtures'

const {
  BOOLEAN_ARRAY,
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  ENUM,
  NUMBER_ARRAY,
  NUMBER_FLOAT,
  NUMBER_INT,
  NUMBER_SCIENTIFIC,
  STRING,
  STRING_ARRAY,
} = parse('foobar', NORMALIZED_TEST_SCHEMA)

expectType<boolean[]>(BOOLEAN_ARRAY)
expectType<boolean>(BOOLEAN_FALSE)
expectType<boolean>(BOOLEAN_TRUE)
expectType<string>(ENUM)
expectType<number[]>(NUMBER_ARRAY)
expectType<number>(NUMBER_FLOAT)
expectType<number>(NUMBER_INT)
expectType<number>(NUMBER_SCIENTIFIC)
expectType<string>(STRING)
expectType<string[]>(STRING_ARRAY)
