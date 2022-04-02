import booleanModule from './boolean'
import enumModule from './enum'
import numberModule from './number'
import stringModule from './string'
import arrayModule from './arrayModule'

const typeModules = [
  booleanModule,
  numberModule,
  stringModule,
  enumModule,
  arrayModule(booleanModule),
  arrayModule(numberModule),
  arrayModule(stringModule),
]

export default typeModules
