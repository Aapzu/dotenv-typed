import { ConfigItemObjectType } from '../types/configItemTypes'
import { TypeModule } from '../types/typeModuleTypes'

const booleanArrayRegex = /^((?:true|false)(,(?:true|false))*)?$/i

const booleanArrayModule: TypeModule<Array<BooleanConstructor>> = {
  isOfType: (item): item is ConfigItemObjectType<Array<BooleanConstructor>> =>
    !!item &&
    Array.isArray(item.type) &&
    item.type.length === 1 &&
    item.type[0] === Boolean,

  parse: (value) =>
    value
      ? value.split(',').map((value) => value.toLowerCase() === 'true')
      : [],

  validateStringValue: (value) => booleanArrayRegex.test(value),

  validateValue: (value) =>
    Array.isArray(value) && !value.some((item) => !(typeof item === 'boolean')),

  typeName: 'boolean array',
}

export default booleanArrayModule
