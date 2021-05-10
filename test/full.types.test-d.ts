import { expectType } from 'tsd'
import { parse } from '..'
import {
  NORMALIZED_TEST_SCHEMA,
  NORMALIZED_TEST_SCHEMA_WITH_OPTIONALS,
} from './fixtures'

// Test normal config parsing
const config = parse(NORMALIZED_TEST_SCHEMA)

expectType<boolean[]>(config.BOOLEAN_ARRAY)
expectType<boolean>(config.BOOLEAN_FALSE)
expectType<boolean>(config.BOOLEAN_TRUE)
expectType<'foo' | 'bar'>(config.ENUM)
expectType<number[]>(config.NUMBER_ARRAY)
expectType<number>(config.NUMBER_FLOAT)
expectType<number>(config.NUMBER_INT)
expectType<number>(config.NUMBER_SCIENTIFIC)
expectType<string>(config.STRING)
expectType<string[]>(config.STRING_ARRAY)

// Test config parsing with optional values
const optConfig = parse(NORMALIZED_TEST_SCHEMA_WITH_OPTIONALS)

expectType<boolean[] | undefined>(optConfig.BOOLEAN_ARRAY)
expectType<boolean | undefined>(optConfig.BOOLEAN_FALSE)
expectType<boolean | undefined>(optConfig.BOOLEAN_TRUE)
expectType<'foo' | 'bar' | undefined>(optConfig.ENUM)
expectType<number[] | undefined>(optConfig.NUMBER_ARRAY)
expectType<number | undefined>(optConfig.NUMBER_FLOAT)
expectType<number | undefined>(optConfig.NUMBER_INT)
expectType<number | undefined>(optConfig.NUMBER_SCIENTIFIC)
expectType<string | undefined>(optConfig.STRING)
expectType<string[] | undefined>(optConfig.STRING_ARRAY)

// Test config parsing with cameL case keys
const camelCaseConfig = parse(NORMALIZED_TEST_SCHEMA_WITH_OPTIONALS, true)

expectType<boolean[] | undefined>(camelCaseConfig.booleanArray)
expectType<boolean | undefined>(camelCaseConfig.booleanFalse)
expectType<boolean | undefined>(camelCaseConfig.booleanTrue)
expectType<'foo' | 'bar' | undefined>(camelCaseConfig.enum)
expectType<number[] | undefined>(camelCaseConfig.numberArray)
expectType<number | undefined>(camelCaseConfig.numberFloat)
expectType<number | undefined>(camelCaseConfig.numberInt)
expectType<number | undefined>(camelCaseConfig.numberScientific)
expectType<string | undefined>(camelCaseConfig.string)
expectType<string[] | undefined>(camelCaseConfig.stringArray)
