import { expectType } from 'ts-expect'
import { NormalizedConfigSchema } from '../../src/types/configTypes'
import { ConfigItemValue } from '../../src/types/configItemTypes'

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

expectType<string>(configItemValues.string)
expectType<number>(configItemValues.number)
expectType<boolean>(configItemValues.boolean)
expectType<string>(configItemValues.enum)
expectType<Array<string>>(configItemValues.stringArray)
expectType<Array<number>>(configItemValues.numberArray)
expectType<Array<boolean>>(configItemValues.booleanArray)

// NormalizedConfigSchema

const schema = { STRING: String, NUMBER: { type: Number, default: 2 } }
const n: NormalizedConfigSchema<typeof schema> = {
  STRING: { type: String },
  NUMBER: { type: Number, default: 2 },
}
expectType<StringConstructor>(n.STRING.type)
expectType<NumberConstructor>(n.NUMBER.type)
expectType<number>(n.NUMBER.default)
