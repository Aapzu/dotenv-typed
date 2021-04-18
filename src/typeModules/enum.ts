import { ConfigItemObjectType, TypeModule } from '../types'

const enumModule: TypeModule<Array<string>> = {
  isOfType: (item): item is ConfigItemObjectType<string[]> =>
    !!item &&
    Array.isArray(item.type) &&
    !!item.type.length &&
    typeof item.type[0] === 'string',

  parse: (value) => value,

  validateStringValue: (
    value: string,
    schema: ConfigItemObjectType<string[]>
  ) => schema.type.includes(value),

  validateValue: (value, schema) =>
    typeof value === 'string' && schema.type.includes(value),

  typeName: 'enum',
}

export default enumModule
