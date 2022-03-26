import {
  ConfigItem,
  ConfigItemValueWithOptionals,
  NormalizedConfigItem,
} from './configItemTypes'
import { KeysToCamelCase } from './index'

export type ConfigSchema<
  S extends Record<string, ConfigItem> = Record<string, ConfigItem>
> = {
  [K in keyof S]: S[K]
}

export type NormalizedConfigSchema<S extends ConfigSchema = ConfigSchema> = {
  [K in keyof S]: NormalizedConfigItem<S[K]>
}

type EnvObjectType<S extends ConfigSchema> = {
  [K in keyof S]: ConfigItemValueWithOptionals<S[K]>
}

export type EnvType<
  S extends ConfigSchema,
  CamelCaseKeys extends boolean = false
> = CamelCaseKeys extends true
  ? KeysToCamelCase<EnvObjectType<S>>
  : EnvObjectType<S>

export type DotenvOutput<
  S extends NormalizedConfigSchema = NormalizedConfigSchema
> = {
  [K in keyof S]: string
}
