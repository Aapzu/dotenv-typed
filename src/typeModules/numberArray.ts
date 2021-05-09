import { ConfigItemObjectType, TypeModule } from '../types'
import { baseNumberRegex } from './number'

const numberArrayRegex = RegExp(
  `^((${baseNumberRegex.source}(,${baseNumberRegex.source})*)?)?$`
)

const stringModule: TypeModule<Array<NumberConstructor>> = {
  isOfType: (item): item is ConfigItemObjectType<Array<NumberConstructor>> =>
    !!item &&
    Array.isArray(item.type) &&
    item.type.length === 1 &&
    item.type[0] === Number,

  parse: (value) => (value ? value.split(',').map(parseFloat) : []),

  validateStringValue: (value) => numberArrayRegex.test(value),

  validateValue: (value) =>
    Array.isArray(value) && !value.some((item) => !(typeof item === 'number')),

  typeName: 'number array',
}

export default stringModule
