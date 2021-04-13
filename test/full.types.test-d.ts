import { expectType } from 'tsd'
import { parse } from '..'
import { TEST_SCHEMA } from './fixtures'

const {
  BOOLEAN_TRUE,
  BOOLEAN_FALSE,
  NUMBER_INT,
  NUMBER_FLOAT,
  NUMBER_SCIENTIFIC,
  STRING,
} = parse('foobar', TEST_SCHEMA)

expectType<boolean>(BOOLEAN_TRUE)
expectType<boolean>(BOOLEAN_FALSE)

expectType<number>(NUMBER_INT)
expectType<number>(NUMBER_FLOAT)
expectType<number>(NUMBER_SCIENTIFIC)

expectType<string>(STRING)
