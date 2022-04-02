import { camelCaseKeys } from '../../src/utils/casing'

describe('casing', () => {
  describe('camelCaseKeys', () => {
    it('correctly maps the keys', () => {
      expect(
        camelCaseKeys({
          FOO: 1,
          BAR_FOO_BAZ: 2,
          FOO_BAR: 3,
        })
      ).toEqual({
        foo: 1,
        barFooBaz: 2,
        fooBar: 3,
      })
    })
  })
})
