import { ConfigItemObjectType } from '../types/configItemTypes'
import { TypeModule } from '../types/typeModuleTypes'

const enumModule: TypeModule<Array<string>> = {
  isOfType: (item): item is ConfigItemObjectType<string[]> =>
    !!item &&
    Array.isArray(item.type) &&
    !!item.type.length &&
    typeof item.type[0] === 'string',

  parse: (value) => value,

  validateStringValue: (
    value: string,
    type: ConfigItemObjectType<string[]>['type']
  ) => type.includes(value),

  validateValue: (value, type) =>
    typeof value === 'string' && type.includes(value),

  typeName: (schema) => (schema ? `enum ${schema.type.join(' | ')}` : 'enum'),
}

export default enumModule
