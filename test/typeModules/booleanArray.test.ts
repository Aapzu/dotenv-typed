import booleanArrayModule from '../../src/typeModules/booleanArray'

const { isOfType, validateStringValue, validateValue } = booleanArrayModule

const BooleanArray = Array(Boolean)

describe('booleanArray module', () => {
  describe('isOfType', () => {
    it('returns true for correct BooleanArray type ', () => {
      expect(isOfType({ type: BooleanArray })).toBe(true)
    })
    it('returns true for correct BooleanArray type with default value', () => {
      expect(isOfType({ type: BooleanArray, default: [true, false] })).toBe(
        true
      )
    })
    it('returns true for correct BooleanArray type with optional: true', () => {
      expect(isOfType({ type: BooleanArray, optional: true })).toBe(true)
    })
    it.each`
      label                   | value
      ${'undefined'}          | ${undefined}
      ${'StringConstructor'}  | ${String}
      ${'BooleanConstructor'} | ${Boolean}
      ${'[Boolean, Boolean]'} | ${[Boolean, Boolean]}
      ${'String array'}       | ${['foo', 'bar']}
    `('returns false for $label type', ({ value }) => {
      expect(isOfType({ type: value })).toBe(false)
    })
  })

  describe('validateStringValue', () => {
    it.each`
      label                                     | value
      ${'empty array'}                          | ${''}
      ${'single item array'}                    | ${'true'}
      ${'multiple items'}                       | ${'true,true,false'}
      ${'multiple values with different cases'} | ${'TRUE,false,FAlsE'}
    `('returns true for $label', ({ value }) => {
      expect(validateStringValue(value, { type: Array(Boolean) })).toBe(true)
    })

    describe.each`
      label                            | values
      ${'strings'}                     | ${['foo', 'alfkjalkf']}
      ${'string arrays'}               | ${['foo,bar']}
      ${'wrongly typed booleanArrays'} | ${[',true', 'false,', 'true,,false']}
      ${'null and undefined'}          | ${['null', 'undefined']}
    `('$label', ({ values }) => {
      it.each(values as string[])('returns false for %s', (value) => {
        expect(validateStringValue(value, { type: Array(Boolean) })).toBe(false)
      })
    })
  })

  describe('isValidBooleanArrayDefaultValue', () => {
    it.each`
      label                     | value
      ${'empty array'}          | ${[]}
      ${'single item array'}    | ${[true]}
      ${'multiple items array'} | ${[true, false, true]}
    `('returns true for $label', ({ value }) => {
      expect(validateValue(value, { type: Array(Boolean) })).toBe(true)
    })

    describe.each`
      label             | value
      ${'string'}       | ${'alfkjalkf'}
      ${'boolean'}      | ${true}
      ${'null'}         | ${null}
      ${'number array'} | ${[1, 2, 3]}
      ${'undefined'}    | ${undefined}
    `('returns false for $label', ({ value }) => {
      expect(validateValue(value, { type: Array(Boolean) })).toBe(false)
    })
  })
})
