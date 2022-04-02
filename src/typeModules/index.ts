import booleanModule from './boolean'
import enumModule from './enum'
import numberModule from './number'
import stringModule from './string'
import array from './array'

const typeModules = [
  booleanModule,
  numberModule,
  stringModule,
  enumModule,
  array(booleanModule),
  array(numberModule),
  array(stringModule),
]

export default typeModules
