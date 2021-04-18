import enumModule from './enum'

const { isOfType, validateStringValue, validateValue } = enumModule

const schema = { type: ['foo', 'bar'] }

describe('enum module', () => {
  describe('isOfType', () => {
    it('returns true for correct Enum type ', () => {
      expect(isOfType({ ...schema })).toBe(true)
    })
    it('returns true for correct Enum type with default value', () => {
      expect(isOfType({ ...schema, default: 'foo' })).toBe(true)
    })
    it('returns true for correct Enum type with optional: true', () => {
      expect(isOfType({ ...schema, optional: true })).toBe(true)
    })
    it.each`
      label                   | value
      ${'undefined'}          | ${undefined}
      ${'StringConstructor'}  | ${String}
      ${'BooleanConstructor'} | ${Boolean}
      ${'Number array'}       | ${[1, 2]}
    `('returns false for $label type', ({ value }) => {
      expect(isOfType({ type: value })).toBe(false)
    })
  })

  describe('validateStringValue', () => {
    it.each(['foo', 'bar'])(`returns true for %s`, (value) => {
      expect(validateStringValue(value, schema)).toBe(true)
    })

    describe.each`
      label                    | values
      ${'other strings'}       | ${['', 'baz', 'alfkjalkf']}
      ${'booleans'}            | ${['true', 'false']}
      ${'enum arrays'}         | ${['1,2,3']}
      ${'wrongly typed enums'} | ${['1.a', '123e', 'e123', '1234.']}
      ${'null and undefined'}  | ${['null', 'undefined']}
    `('$label', ({ values }) => {
      it.each(values as string[])(`returns false for %s`, (value) => {
        expect(validateStringValue(value, schema)).toBe(false)
      })
    })
  })

  describe('isValidEnumDefaultValue', () => {
    it.each(['foo', 'bar'])(`returns true for %s`, (value) => {
      expect(validateValue(value, schema)).toBe(true)
    })
    describe.each`
      label                   | values
      ${'other strings'}      | ${['', 'baz', 'alfkjalkf']}
      ${'booleans'}           | ${[true, false]}
      ${'null and undefined'} | ${[null, undefined]}
    `('$label', ({ values }) => {
      it.each(values as (string | number | null | undefined)[])(
        `returns false for %s`,
        (value) => {
          expect(validateValue(value, schema)).toBe(false)
        }
      )
    })
  })
})
