import { mapKeys, camelCase } from 'lodash'

type CamelCase<
  S extends string
> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>

type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends {}
    ? KeysToCamelCase<T[K]>
    : T[K]
}

const camelCaseKeys = <T extends Record<string, any>>(
  obj: T
): KeysToCamelCase<T> => {
  return mapKeys(obj, camelCase) as KeysToCamelCase<T>
}

export default camelCaseKeys
