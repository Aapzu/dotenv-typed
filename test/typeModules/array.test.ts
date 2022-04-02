import array from '../../src/typeModules/array'
import booleanModule from '../../src/typeModules/boolean'
import numberModule from '../../src/typeModules/number'
import stringModule from '../../src/typeModules/string'

const BooleanArray = Array(Boolean)
const NumberArray = Array(Number)
const StringArray = Array(String)

describe('array module', () => {
  describe('booleanArray module', () => {
    const { isOfType, validateStringValue, validateValue, parse } = array(
      booleanModule
    )

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
        expect(validateStringValue(value, Array(Boolean))).toBe(true)
      })

      describe.each`
        label                            | values
        ${'strings'}                     | ${['foo', 'alfkjalkf']}
        ${'string arrays'}               | ${['foo,bar']}
        ${'wrongly typed booleanArrays'} | ${[',true', 'false,', 'true,,false']}
        ${'null and undefined'}          | ${['null', 'undefined']}
      `('$label', ({ values }) => {
        it.each(values as string[])('returns false for %s', (value) => {
          expect(validateStringValue(value, Array(Boolean))).toBe(false)
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
        expect(validateValue(value, Array(Boolean))).toBe(true)
      })

      describe.each`
        label             | value
        ${'string'}       | ${'alfkjalkf'}
        ${'boolean'}      | ${true}
        ${'null'}         | ${null}
        ${'number array'} | ${[1, 2, 3]}
        ${'undefined'}    | ${undefined}
      `('returns false for $label', ({ value }) => {
        expect(validateValue(value, Array(Boolean))).toBe(false)
      })
    })

    describe('parse', () => {
      it('parses a list properly', () => {
        expect(parse('false,false,true')).toEqual([false, false, true])
      })

      it('parses an empty list properly', () => {
        expect(parse('')).toEqual([])
      })
    })
  })
  describe('numberArray module', () => {
    const { isOfType, validateStringValue, validateValue, parse } = array(
      numberModule
    )

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
        expect(validateStringValue(value, Array(Number))).toBe(true)
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
          expect(validateStringValue(value, Array(Number))).toBe(false)
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
        expect(validateValue(value, Array(Number))).toBe(true)
      })

      describe.each`
        label          | value
        ${'string'}    | ${'alfkjalkf'}
        ${'boolean'}   | ${true}
        ${'null'}      | ${null}
        ${'undefined'} | ${undefined}
      `('returns false for $label', ({ value }) => {
        expect(validateValue(value, Array(Number))).toBe(false)
      })
    })

    describe('parse', () => {
      it('parses a list properly', () => {
        expect(parse('6,1.23,1.6e6,NaN,Infinity')).toEqual([
          6,
          1.23,
          1.6e6,
          NaN,
          Infinity,
        ])
      })

      it('parses an empty list properly', () => {
        expect(parse('')).toEqual([])
      })
    })
  })

  describe('stringArray module', () => {
    const { isOfType, validateStringValue, validateValue, parse } = array(
      stringModule
    )

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
        expect(validateStringValue(value, Array(String))).toBe(true)
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
        expect(validateValue(value, Array(String))).toBe(true)
      })

      describe.each`
        label             | value
        ${'string'}       | ${'alfkjalkf'}
        ${'boolean'}      | ${true}
        ${'null'}         | ${null}
        ${'undefined'}    | ${undefined}
        ${'number array'} | ${[1, 2, 3]}
      `('returns false for $label', ({ value }) => {
        expect(validateValue(value, Array(String))).toBe(false)
      })
    })

    describe('parse', () => {
      it('parses a list properly', () => {
        expect(parse('foo,bar,baz')).toEqual(['foo', 'bar', 'baz'])
      })

      it('parses a list with empty values properly', () => {
        expect(parse(',foo,,')).toEqual(['', 'foo', '', ''])
      })

      it('parses an empty list properly', () => {
        expect(parse('')).toEqual([])
      })
    })
  })
})
