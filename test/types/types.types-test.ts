import { expectType, TypeEqual } from 'ts-expect'
import { ConfigItemValue, NormalizedConfigSchema } from '../../src/types'

// ConfigItemType

const configItemValues: {
  string: ConfigItemValue<StringConstructor>
  number: ConfigItemValue<NumberConstructor>
  boolean: ConfigItemValue<BooleanConstructor>
  enum: ConfigItemValue<Array<string>>
  stringArray: ConfigItemValue<Array<StringConstructor>>
  numberArray: ConfigItemValue<Array<NumberConstructor>>
  booleanArray: ConfigItemValue<Array<BooleanConstructor>>
} = {
  string: 'foo',
  number: 1,
  boolean: true,
  enum: 'foo',
  stringArray: ['foo', 'bar'],
  numberArray: [1, 2, 3],
  booleanArray: [true, false],
}

expectType<TypeEqual<string, typeof configItemValues.string>>(true)
expectType<TypeEqual<number, typeof configItemValues.number>>(true)
expectType<TypeEqual<boolean, typeof configItemValues.boolean>>(true)
expectType<TypeEqual<string, typeof configItemValues.enum>>(true)
expectType<TypeEqual<Array<string>, typeof configItemValues.stringArray>>(true)
expectType<TypeEqual<Array<number>, typeof configItemValues.numberArray>>(true)
expectType<TypeEqual<Array<boolean>, typeof configItemValues.booleanArray>>(
  true
)

// NormalizedConfigSchema

const schema = { STRING: String, NUMBER: { type: Number, default: 2 } }
const n: NormalizedConfigSchema<typeof schema> = {
  STRING: { type: String },
  NUMBER: { type: Number, default: 2 },
}
expectType<TypeEqual<StringConstructor, typeof n.STRING.type>>(true)
expectType<TypeEqual<NumberConstructor, typeof n.NUMBER.type>>(true)
expectType<TypeEqual<number, typeof n.NUMBER.default>>(true)
