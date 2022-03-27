import { ConfigItemObjectType } from '../types/configItemTypes'
import { TypeModule } from '../types/typeModuleTypes'

const stringArrayModule: TypeModule<Array<StringConstructor>> = {
  isOfType: (item): item is ConfigItemObjectType<Array<StringConstructor>> =>
    !!item &&
    Array.isArray(item.type) &&
    item.type.length === 1 &&
    item.type[0] === String,

  parse: (value) => (value ? value.split(',') : []),

  validateStringValue: () => true,

  validateValue: (value) =>
    Array.isArray(value) && !value.some((item) => !(typeof item === 'string')),

  typeName: 'string array',
}

export default stringArrayModule
