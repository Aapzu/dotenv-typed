import { getItemTypeModule } from '../src/getItemTypeModule'

import arrayModule from '../src/typeModules/array'
import booleanModule from '../src/typeModules/boolean'
import enumModule from '../src/typeModules/enum'
import numberModule from '../src/typeModules/number'
import stringModule from '../src/typeModules/string'

describe('getItemTypeModule', () => {
  it.each`
    itemType                    | expectedModule                | name
    ${{ type: Boolean }}        | ${booleanModule}              | ${'booleanModule'}
    ${{ type: Array(Boolean) }} | ${arrayModule(booleanModule)} | ${'booleanArrayModule'}
    ${{ type: ['foo', 'bar'] }} | ${enumModule}                 | ${'enumModule'}
    ${{ type: Number }}         | ${numberModule}               | ${'numberModule'}
    ${{ type: Array(Number) }}  | ${arrayModule(numberModule)}  | ${'numberArrayModule'}
    ${{ type: String }}         | ${stringModule}               | ${'stringModule'}
    ${{ type: Array(String) }}  | ${arrayModule(stringModule)}  | ${'stringArrayModule'}
  `('recognizes $name', ({ itemType, expectedModule }) => {
    expect(getItemTypeModule(itemType)).toBe(expectedModule)
  })
})
