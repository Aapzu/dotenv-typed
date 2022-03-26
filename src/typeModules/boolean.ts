import { ConfigItemObjectType } from '../types/configItemTypes'
import { TypeModule } from '../types/typeModuleTypes'

const booleanModule: TypeModule<BooleanConstructor> = {
  isOfType: (item): item is ConfigItemObjectType<BooleanConstructor> =>
    !!item && item.type === Boolean,

  parse: (value) => value.toLowerCase() === 'true',

  validateStringValue: (value) =>
    value.toLowerCase() === 'true' || value.toLowerCase() === 'false',

  validateValue: (value) => {
    return typeof value === 'boolean'
  },

  typeName: 'boolean',
}

export default booleanModule
