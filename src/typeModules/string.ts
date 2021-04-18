import { ConfigItemObjectType, TypeModule } from '../types'

const stringModule: TypeModule<StringConstructor> = {
  isOfType: (item): item is ConfigItemObjectType<StringConstructor> =>
    !!item && item.type === String,

  parse: (value) => value,

  validateStringValue: () => true,

  validateValue: (value) => typeof value === 'string',

  typeName: 'string',
}

export default stringModule
