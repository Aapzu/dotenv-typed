import numberModule from './number'

const { isOfType, validateStringValue, validateValue } = numberModule

describe('number module', () => {
  describe('isOfType', () => {
    it('returns true for correct Number type ', () => {
      expect(isOfType({ type: Number })).toBe(true)
    })
    it('returns true for correct Number type with default value', () => {
      expect(isOfType({ type: Number, default: 'foo' })).toBe(true)
    })
    it('returns true for correct Number type with optional: true', () => {
      expect(isOfType({ type: Number, optional: true })).toBe(true)
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

  describe('isValidNumberItem', () => {
    describe.each`
      label                   | values
      ${'integers'}           | ${['1', '0', '-2', '1044214141241412']}
      ${'NaN'}                | ${['NaN', 'nan', 'nAN']}
      ${'Infinity'}           | ${['Infinity', 'infinity']}
      ${'decimals'}           | ${['1.0', '1.0', '14124124.014123', '.123']}
      ${'scientific numbers'} | ${['1.203e-123', '1e+123', '10e100', '1E123', '-123e123']}
    `('$label', ({ values }) => {
      it.each(values as string[])(`returns true for %s`, (value) => {
        expect(validateStringValue(value)).toBe(true)
      })
    })

    describe.each`
      label                      | values
      ${'strings'}               | ${['', 'foo', 'alfkjalkf']}
      ${'booleans'}              | ${['true', 'false']}
      ${'number arrays'}         | ${['1,2,3']}
      ${'wrongly typed numbers'} | ${['1.a', '123e', 'e123', '1234.']}
      ${'null and undefined'}    | ${['null', 'undefined']}
    `('$label', ({ values }) => {
      it.each(values as string[])(`returns false for %s`, (value) => {
        expect(validateStringValue(value)).toBe(false)
      })
    })
  })

  describe('isValidNumberDefaultValue', () => {
    describe.each`
      label                   | values
      ${'integers'}           | ${[1, 0, -2, 123123123]}
      ${'special constants'}  | ${[NaN, Infinity]}
      ${'decimals'}           | ${[1.0, 1.0, 14124124.014123, 0.123]}
      ${'scientific numbers'} | ${[1.203e-123, 1e123, 10e100, 1e123]}
    `('$label', ({ values }) => {
      it.each(values as number[])(`returns true for %s`, (value) => {
        expect(validateValue(value)).toBe(true)
      })
    })
    describe.each`
      label                   | values
      ${'strings'}            | ${['', 'foo', 'alfkjalkf']}
      ${'booleans'}           | ${[true, false]}
      ${'null and undefined'} | ${[null, undefined]}
    `('$label', ({ values }) => {
      it.each(values as any[])(`returns false for %s`, (value) => {
        expect(validateValue(value)).toBe(false)
      })
    })
  })
})
