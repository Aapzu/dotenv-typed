import { expectType } from 'ts-expect'
import { CamelCase, KeysToCamelCase } from '../../src/types'

expectType<CamelCase<'BAR'>>('bar')
expectType<CamelCase<'BAR_FOO_BAZ'>>('barFooBaz')

expectType<
  KeysToCamelCase<{
    FOO: 'bar'
    BAR_FOO_BAZ: 'foo'
  }>
>({
  foo: 'bar',
  barFooBaz: 'foo',
})

expectType<
  KeysToCamelCase<{
    FOO: 'bar'
    BAR_FOO_BAZ: {
      BAR: {
        FOO_BAR: 'foo'
      }
    }
  }>
>({
  foo: 'bar',
  barFooBaz: {
    bar: {
      fooBar: 'foo',
    },
  },
})
