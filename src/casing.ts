import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import { KeysToCamelCase } from './types'

export const camelCaseKeys = <T extends Record<string, unknown>>(
  obj: T
): KeysToCamelCase<T> =>
  mapKeys(obj, (_value, key) => camelCase(key)) as KeysToCamelCase<T>
