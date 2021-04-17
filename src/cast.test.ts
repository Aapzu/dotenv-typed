import cast from '../src/cast'
import { TEST_CONFIG, NORMALIZED_TEST_SCHEMA } from './fixtures'

describe('cast', () => {
  describe('String type', () => {
    it('does nothing for String type', () => {
      const casted = cast(
        { STRING: NORMALIZED_TEST_SCHEMA.STRING },
        { STRING: TEST_CONFIG.STRING }
      )
      expect(casted).toEqual({
        STRING: 'foo',
      })
    })
  })

  describe('Number type', () => {
    it('parses int', () => {
      const casted = cast(
        { NUMBER_INT: NORMALIZED_TEST_SCHEMA.NUMBER_INT },
        { NUMBER_INT: TEST_CONFIG.NUMBER_INT }
      )
      expect(casted).toEqual({
        NUMBER_INT: 1234,
      })
    })

    it('parses float', () => {
      const casted = cast(
        { NUMBER_FLOAT: NORMALIZED_TEST_SCHEMA.NUMBER_FLOAT },
        { NUMBER_FLOAT: TEST_CONFIG.NUMBER_FLOAT }
      )
      expect(casted).toEqual({
        NUMBER_FLOAT: 41.1337,
      })
    })

    it('parses scientific number format', () => {
      const casted = cast(
        { NUMBER_SCIENTIFIC: NORMALIZED_TEST_SCHEMA.NUMBER_SCIENTIFIC },
        { NUMBER_SCIENTIFIC: TEST_CONFIG.NUMBER_SCIENTIFIC }
      )
      expect(casted).toEqual({
        NUMBER_SCIENTIFIC: 6.0221409e23,
      })
    })
  })

  describe('Boolean type', () => {
    it('parses true', () => {
      const casted = cast(
        { BOOLEAN_TRUE: NORMALIZED_TEST_SCHEMA.BOOLEAN_TRUE },
        { BOOLEAN_TRUE: TEST_CONFIG.BOOLEAN_TRUE }
      )
      expect(casted).toEqual({
        BOOLEAN_TRUE: true,
      })
    })

    it('parses false', () => {
      const casted = cast(
        { BOOLEAN_FALSE: NORMALIZED_TEST_SCHEMA.BOOLEAN_FALSE },
        { BOOLEAN_FALSE: TEST_CONFIG.BOOLEAN_FALSE }
      )
      expect(casted).toEqual({
        BOOLEAN_FALSE: false,
      })
    })
  })

  describe('Enum type', () => {
    it('parses true', () => {
      const casted = cast(
        { BOOLEAN_TRUE: NORMALIZED_TEST_SCHEMA.BOOLEAN_TRUE },
        { BOOLEAN_TRUE: TEST_CONFIG.BOOLEAN_TRUE }
      )
      expect(casted).toEqual({
        BOOLEAN_TRUE: true,
      })
    })

    it('parses false', () => {
      const casted = cast(
        { BOOLEAN_FALSE: NORMALIZED_TEST_SCHEMA['BOOLEAN_FALSE'] },
        { BOOLEAN_FALSE: TEST_CONFIG['BOOLEAN_FALSE'] }
      )
      expect(casted).toEqual({
        BOOLEAN_FALSE: false,
      })
    })
  })

  describe('String array type', () => {
    it('parses true', () => {
      const casted = cast(
        { BOOLEAN_TRUE: NORMALIZED_TEST_SCHEMA.BOOLEAN_TRUE },
        { BOOLEAN_TRUE: TEST_CONFIG.BOOLEAN_TRUE }
      )
      expect(casted).toEqual({
        BOOLEAN_TRUE: true,
      })
    })

    it('parses false', () => {
      const casted = cast(
        { BOOLEAN_FALSE: NORMALIZED_TEST_SCHEMA.BOOLEAN_FALSE },
        { BOOLEAN_FALSE: TEST_CONFIG.BOOLEAN_FALSE }
      )
      expect(casted).toEqual({
        BOOLEAN_FALSE: false,
      })
    })
  })
})
