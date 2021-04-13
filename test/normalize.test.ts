import normalize from '../src/normalize'

describe('normalize', () => {
  it('normalizes the format', () => {
    const original = {
      STRING: String,
      NUMBER: Number,
      BOOLEAN: Number,
      ENUM: Number,
      NUMBER: Number,
      ENUM: Number,
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
      STRING: {
        type: String,
      },
      NUMBER: {
        type: Number,
      },
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
