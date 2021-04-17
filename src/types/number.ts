import { ConfigItemObjectType, TypeModule } from '../types'

export const baseNumberRegex = /(?:NaN|-?(?:(?:\d+|\d*\.\d+)(?:[E|e][+|-]?\d+)?|Infinity))/i
export const numberRegex = RegExp(
  '^' + baseNumberRegex.source + '$',
  baseNumberRegex.flags
)

const numberModule: TypeModule<NumberConstructor> = {
  isOfType: (item): item is ConfigItemObjectType<NumberConstructor> =>
    !!item && item.type === Number,

  parse: (value) => parseFloat(value),

  validateStringValue: (value) => numberRegex.test(value),

  validateValue: (value) => typeof value === 'number',

  typeName: 'number',
}

export default numberModule
