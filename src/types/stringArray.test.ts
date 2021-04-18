import stringArrayModule from './stringArray'

const { isOfType, validateStringValue, validateValue } = stringArrayModule

const StringArray = Array(String)

describe('stringArray module', () => {
  describe('isOfType', () => {
    it('returns true for correct StringArray type ', () => {
      expect(isOfType({ type: StringArray })).toBe(true)
    })
    it('returns true for correct StringArray type with default value', () => {
      expect(isOfType({ type: StringArray, default: ['foo', 'bar'] })).toBe(
        true
      )
    })
    it('returns true for correct StringArray type with optional: true', () => {
      expect(isOfType({ type: StringArray, optional: true })).toBe(true)
    })
    it.each`
      label                   | value
      ${'undefined'}          | ${undefined}
      ${'StringConstructor'}  | ${String}
      ${'BooleanConstructor'} | ${Boolean}
      ${'[String, String]'}   | ${[String, String]}
      ${'Number'}             | ${[1, 2, 3]}
    `('returns false for $label type', ({ value }) => {
      expect(isOfType({ type: value })).toBe(false)
    })
  })

  describe('validateStringValue', () => {
    it.each`
      label                                 | value
      ${'empty array'}                      | ${''}
      ${'single item array'}                | ${'foo'}
      ${'multiple items'}                   | ${'foo,bar'}
      ${'array of multiple kinds of items'} | ${',foo,1,true,bar'}
      ${'array with empty items'}           | ${'foo,,,bar'}
    `('returns true for $label', ({ value }) => {
      expect(validateStringValue(value, { type: Array(String) })).toBe(true)
    })
  })

  describe('isValidStringArrayDefaultValue', () => {
    it.each`
      label                        | value
      ${'empty array'}             | ${[]}
      ${'single item array'}       | ${['foo']}
      ${'single empty item array'} | ${['']}
      ${'multiple items array'}    | ${['foo', 'bar']}
    `('returns true for $label', ({ value }) => {
      expect(validateValue(value, { type: Array(String) })).toBe(true)
    })

    describe.each`
      label             | value
      ${'string'}       | ${'alfkjalkf'}
      ${'boolean'}      | ${true}
      ${'null'}         | ${null}
      ${'undefined'}    | ${undefined}
      ${'number array'} | ${[1, 2, 3]}
    `('returns false for $label', ({ value }) => {
      expect(validateValue(value, { type: Array(String) })).toBe(false)
    })
  })
})
