import { isConfigItemObject } from '../../src/utils/configUtils'

describe('configUtils', () => {
  describe('isConfigItemObject', () => {
    it('returns false from plain item', () => {
      expect(isConfigItemObject(Number)).toBe(false)
    })

    it('returns true from config item object', () => {
      expect(isConfigItemObject({ type: Number })).toBe(true)
    })
  })
})
