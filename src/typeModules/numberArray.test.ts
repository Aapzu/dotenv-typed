import numberArrayModule from './numberArray'

const { isOfType, validateStringValue, validateValue } = numberArrayModule

const NumberArray = Array(Number)

describe('numberArray module', () => {
  describe('isOfType', () => {
    it('returns true for correct NumberArray type ', () => {
      expect(isOfType({ type: NumberArray })).toBe(true)
    })
    it('returns true for correct NumberArray type with default value', () => {
      expect(isOfType({ type: NumberArray, default: [1, 2] })).toBe(true)
    })
    it('returns true for correct NumberArray type with optional: true', () => {
      expect(isOfType({ type: NumberArray, optional: true })).toBe(true)
    })
    it.each`
      label                   | value
      ${'undefined'}          | ${undefined}
      ${'StringConstructor'}  | ${String}
      ${'BooleanConstructor'} | ${Boolean}
      ${'[Number, Number]'}   | ${[Number, Number]}
      ${'String array'}       | ${['foo', 'bar']}
    `('returns false for $label type', ({ value }) => {
      expect(isOfType({ type: value })).toBe(false)
    })
  })

  describe('validateStringValue', () => {
    it.each`
      label                       | value
      ${'empty array'}            | ${''}
      ${'single item array'}      | ${'1'}
      ${'multiple items'}         | ${'1,2,3'}
      ${'multiple decimal items'} | ${'1.0,2.113213,3.40e21'}
    `('returns true for $label', ({ value }) => {
      expect(validateStringValue(value, { type: Array(Number) })).toBe(true)
    })

    describe.each`
      label                           | values
      ${'strings'}                    | ${['foo', 'alfkjalkf']}
      ${'booleans'}                   | ${['true', 'false']}
      ${'string arrays'}              | ${['foo,bar']}
      ${'wrongly typed numberArrays'} | ${[',1', '1,', '1,,2', '1..0,1']}
      ${'null and undefined'}         | ${['null', 'undefined']}
    `('$label', ({ values }) => {
      it.each(values as string[])('returns false for %s', (value) => {
        expect(validateStringValue(value, { type: Array(Number) })).toBe(false)
      })
    })
  })

  describe('isValidNumberArrayDefaultValue', () => {
    it.each`
      label                      | value
      ${'empty array'}           | ${[]}
      ${'single item array'}     | ${[1]}
      ${'multiple items array'}  | ${[1.0, 1.0, 14124124.014123, 0.123]}
      ${'special numbers array'} | ${[NaN, Infinity]}
    `('returns true for $label', ({ value }) => {
      expect(validateValue(value, { type: Array(Number) })).toBe(true)
    })

    describe.each`
      label          | value
      ${'string'}    | ${'alfkjalkf'}
      ${'boolean'}   | ${true}
      ${'null'}      | ${null}
      ${'undefined'} | ${undefined}
    `('returns false for $label', ({ value }) => {
      expect(validateValue(value, { type: Array(Number) })).toBe(false)
    })
  })
})
