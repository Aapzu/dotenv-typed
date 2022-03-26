export type CamelCase<S extends string | number | symbol> = S extends string
  ? S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>
  : S

export type KeysToCamelCase<T extends Record<string, unknown>> = {
  [K in keyof T as CamelCase<K>]: T[K] extends Record<
    string | number | symbol,
    unknown
  >
    ? KeysToCamelCase<T[K]>
    : T[K]
}
