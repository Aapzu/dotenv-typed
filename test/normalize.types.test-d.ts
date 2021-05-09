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

type BooleanTrueSchema = {
  readonly type: BooleanConstructor
  readonly default: true
}
type BooleanFalseSchema = {
  readonly type: BooleanConstructor
  readonly default: false
}
type NumberIntSchema = {
  readonly type: NumberConstructor
  readonly default: 9
}
type NumberFloatSchema = {
  readonly type: NumberConstructor
  readonly default: 0.2
}
type NumberScientificSchema = {
  readonly type: NumberConstructor
  readonly default: 90000
}
type EnumSchema = {
  readonly type: readonly ['foo', 'bar']
  readonly default: 'bar'
}
type NumberArraySchema = {
  readonly type: Array<NumberConstructor>
  readonly default: readonly [1, 2, 3]
}
type StringArraySchema = {
  readonly type: Array<StringConstructor>
  readonly default: readonly ['foo', 'bar', 'baz']
}
type BooleanArraySchema = {
  readonly type: Array<BooleanConstructor>
  readonly default: readonly [true, false]
}
type StringSchema = {
  readonly type: StringConstructor
  readonly default: 'foo'
}

expectType<BooleanTrueSchema>(BOOLEAN_TRUE)
expectType<BooleanFalseSchema>(BOOLEAN_FALSE)

expectType<NumberIntSchema>(NUMBER_INT)
expectType<NumberFloatSchema>(NUMBER_FLOAT)
expectType<NumberScientificSchema>(NUMBER_SCIENTIFIC)

expectType<EnumSchema>(ENUM)
expectType<NumberArraySchema>(NUMBER_ARRAY)
expectType<StringArraySchema>(STRING_ARRAY)
expectType<BooleanArraySchema>(BOOLEAN_ARRAY)

expectType<StringSchema>(STRING)
