import normalize from '../src/normalize'

describe('normalize', () => {
  it('normalizes the format', () => {
    const original = {
      STRING: String,
      NUMBER: Number,
      BOOLEAN: Number,
      ENUM: ['foo', 'bar'],
      STRING_ARRAY: Array(String),
      NUMBER_ARRAY: Array(Number),
      STRING2: { type: String },
      NUMBER2: { type: Number },
      BOOLEAN2: { type: Number },
      ENUM2: { type: Number },
      STRING_ARRAY2: { type: Number },
      NUMBER_ARRAY2: { type: Number },
      OPTIONAL: {
        type: String,
        optional: true,
      },
      DEFAULT: {
        type: Boolean,
        default: true,
      },
    }
    const normalized = {
      STRING: { type: String },
      NUMBER: { type: Number },
      BOOLEAN: { type: Number },
      ENUM: { type: ['foo', 'bar'] },
      STRING_ARRAY: { type: Array(String) },
      NUMBER_ARRAY: { type: Array(Number) },
      STRING2: { type: String },
      NUMBER2: { type: Number },
      BOOLEAN2: { type: Number },
      ENUM2: { type: Number },
      STRING_ARRAY2: { type: Number },
      NUMBER_ARRAY2: { type: Number },
      OPTIONAL: {
        type: String,
        optional: true,
      },
      DEFAULT: {
        type: Boolean,
        default: true,
      },
    }
    expect(normalize(original)).toEqual(normalized)
  })
})
