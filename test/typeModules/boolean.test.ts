import booleanModule from '../../src/typeModules/boolean'

const { isOfType, validateStringValue, validateValue } = booleanModule

describe('boolean module', () => {
  describe('isOfType', () => {
    it('returns true for correct Boolean type ', () => {
      expect(isOfType({ type: Boolean })).toBe(true)
    })
    it('returns true for correct Boolean type with default value', () => {
      expect(isOfType({ type: Boolean, default: true })).toBe(true)
    })
    it('returns true for correct Boolean type with optional: true', () => {
      expect(isOfType({ type: Boolean, optional: true })).toBe(true)
    })
    it.each`
      label                  | value
      ${'undefined'}         | ${undefined}
      ${'StringConstructor'} | ${String}
      ${'NumberConstructor'} | ${Number}
      ${'Boolean array'}     | ${[true, false]}
    `('returns false for $label type', ({ value }) => {
      expect(isOfType({ type: value })).toBe(false)
    })
  })

  describe('validateStringValue', () => {
    describe.each`
      label             | values
      ${'true values'}  | ${['TRUE', 'TrUe', 'true']}
      ${'false values'} | ${['FALSE', 'FalSe', 'false']}
    `('$label', ({ values }) => {
      it.each(values as string[])(`returns true for %s`, (value) => {
        expect(validateStringValue(value, Boolean)).toBe(true)
      })
    })

    describe.each`
      label                       | values
      ${'strings'}                | ${['', 'foo', 'alfkjalkf']}
      ${'numbers'}                | ${['1', '1.0', '1e3']}
      ${'boolean arrays'}         | ${['1,2,3']}
      ${'wrongly typed booleans'} | ${['t', 'f', 'falsee', 'truee']}
      ${'null and undefined'}     | ${['null', 'undefined']}
    `('$label', ({ values }) => {
      it.each(values as string[])(`returns false for %s`, (value) => {
        expect(validateStringValue(value, Boolean)).toBe(false)
      })
    })
  })

  describe('validateValue', () => {
    it.each([true, false])(`returns true for %s`, (value) => {
      expect(validateValue(value, Boolean)).toBe(true)
    })
    describe.each`
      label                   | values
      ${'strings'}            | ${['', 'foo', 'alfkjalkf']}
      ${'numbers'}            | ${[1, 2]}
      ${'null and undefined'} | ${[null, undefined]}
    `('$label', ({ values }) => {
      it.each(values as (string | number | null | undefined)[])(
        `returns false for %s`,
        (value) => {
          expect(validateValue(value, Boolean)).toBe(false)
        }
      )
    })
  })
})
