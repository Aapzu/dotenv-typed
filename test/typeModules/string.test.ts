import stringModule from '../../src/typeModules/string'

const { isOfType, validateStringValue, validateValue } = stringModule

describe('string module', () => {
  describe('isOfType', () => {
    it('returns true for correct String type ', () => {
      expect(isOfType({ type: String })).toBe(true)
    })
    it('returns true for correct String type with default value', () => {
      expect(isOfType({ type: String, default: 'foo' })).toBe(true)
    })
    it('returns true for correct String type with optional: true', () => {
      expect(isOfType({ type: String, optional: true })).toBe(true)
    })
    it.each`
      label                   | value
      ${'undefined'}          | ${undefined}
      ${'NumberConstructor'}  | ${Number}
      ${'BooleanConstructor'} | ${Boolean}
      ${'String array'}       | ${['foo']}
    `('returns false for {label} type', ({ value }) => {
      expect(isOfType({ type: value })).toBe(false)
    })
  })

  describe('isValidStringItem', () => {
    it.each`
      label                               | value
      ${'a normal string'}                | ${'foo'}
      ${'a string with weird characters'} | ${'😆 ɸ ɷ ɲ ˿ ξ'}
      ${'an empty string'}                | ${''}
    `('returns true for {label} ', ({ value }) => {
      expect(validateStringValue(value, String)).toBe(true)
    })
  })

  describe('isValidStringDefaultValue', () => {
    it.each`
      label                               | value
      ${'a normal string'}                | ${'foo'}
      ${'a string with weird characters'} | ${'😆 ɸ ɷ ɲ ˿ ξ'}
      ${'an empty string'}                | ${''}
    `('returns true for {label} ', ({ value }) => {
      expect(validateValue(value, String)).toBe(true)
    })
    it.each`
      label          | value
      ${'number'}    | ${1}
      ${'boolean'}   | ${true}
      ${'undefined'} | ${undefined}
      ${'array'}     | ${[]}
    `('returns false for {label} ', ({ value }) => {
      expect(validateValue(value, String)).toBe(false)
    })
  })
})
