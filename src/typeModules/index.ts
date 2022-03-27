// import arrayModule from './array'
import arrayModule from './array'
import booleanModule from './boolean'
import enumModule from './enum'
import numberModule from './number'
import stringModule from './string'

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
