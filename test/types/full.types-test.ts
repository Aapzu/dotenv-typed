import { expectType, TypeEqual } from 'ts-expect'
import { parse } from '../..'
import {
  NORMALIZED_TEST_SCHEMA,
  NORMALIZED_TEST_SCHEMA_WITH_OPTIONALS,
} from '../fixtures'

// Test normal config parsing
const config = parse(NORMALIZED_TEST_SCHEMA)

expectType<TypeEqual<boolean[], typeof config.BOOLEAN_ARRAY>>(true)
expectType<TypeEqual<boolean, typeof config.BOOLEAN_FALSE>>(true)
expectType<TypeEqual<boolean, typeof config.BOOLEAN_TRUE>>(true)
expectType<TypeEqual<'foo' | 'bar', typeof config.ENUM>>(true)
expectType<TypeEqual<number[], typeof config.NUMBER_ARRAY>>(true)
expectType<TypeEqual<number, typeof config.NUMBER_FLOAT>>(true)
expectType<TypeEqual<number, typeof config.NUMBER_INT>>(true)
expectType<TypeEqual<number, typeof config.NUMBER_SCIENTIFIC>>(true)
expectType<TypeEqual<string, typeof config.STRING>>(true)
expectType<TypeEqual<string[], typeof config.STRING_ARRAY>>(true)

// Test config parsing with optional values
const optConfig = parse(NORMALIZED_TEST_SCHEMA_WITH_OPTIONALS)

expectType<TypeEqual<boolean[] | undefined, typeof optConfig.BOOLEAN_ARRAY>>(
  true
)
expectType<TypeEqual<boolean | undefined, typeof optConfig.BOOLEAN_FALSE>>(true)
expectType<TypeEqual<boolean | undefined, typeof optConfig.BOOLEAN_TRUE>>(true)
expectType<TypeEqual<'foo' | 'bar' | undefined, typeof optConfig.ENUM>>(true)
expectType<TypeEqual<number[] | undefined, typeof optConfig.NUMBER_ARRAY>>(true)
expectType<TypeEqual<number | undefined, typeof optConfig.NUMBER_FLOAT>>(true)
expectType<TypeEqual<number | undefined, typeof optConfig.NUMBER_INT>>(true)
expectType<TypeEqual<number | undefined, typeof optConfig.NUMBER_SCIENTIFIC>>(
  true
)
expectType<TypeEqual<string | undefined, typeof optConfig.STRING>>(true)
expectType<TypeEqual<string[] | undefined, typeof optConfig.STRING_ARRAY>>(true)
