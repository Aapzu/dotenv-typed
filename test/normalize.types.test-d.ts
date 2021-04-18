import { expectType } from 'tsd'
import normalize from '../src/normalize'
import { NORMALIZED_TEST_SCHEMA } from './fixtures'

const {
  BOOLEAN_TRUE,
  BOOLEAN_FALSE,
  NUMBER_INT,
  NUMBER_FLOAT,
  NUMBER_SCIENTIFIC,
  STRING,
  ENUM,
  NUMBER_ARRAY,
  BOOLEAN_ARRAY,
  STRING_ARRAY,
} = normalize(NORMALIZED_TEST_SCHEMA)

expectType<{ type: BooleanConstructor; default: boolean }>(BOOLEAN_TRUE)
expectType<{ type: BooleanConstructor; default: boolean }>(BOOLEAN_FALSE)

expectType<{ type: NumberConstructor; default: number }>(NUMBER_INT)
expectType<{ type: NumberConstructor; default: number }>(NUMBER_FLOAT)
expectType<{ type: NumberConstructor; default: number }>(NUMBER_SCIENTIFIC)

expectType<{ type: string[]; default: string }>(ENUM)
expectType<{ type: Array<NumberConstructor>; default: number[] }>(NUMBER_ARRAY)
expectType<{ type: Array<StringConstructor>; default: string[] }>(STRING_ARRAY)
expectType<{ type: Array<BooleanConstructor>; default: boolean[] }>(
  BOOLEAN_ARRAY
)

expectType<{ type: StringConstructor; default: string }>(STRING)
