import { getItemTypeModule } from '../src/getItemTypeModule'

import booleanModule from '../src/typeModules/boolean'
import booleanArrayModule from '../src/typeModules/booleanArray'
import enumModule from '../src/typeModules/enum'
import numberModule from '../src/typeModules/number'
import numberArrayModule from '../src/typeModules/numberArray'
import stringModule from '../src/typeModules/string'
import stringArrayModule from '../src/typeModules/stringArray'

describe('getItemTypeModule', () => {
  it.each`
    itemType                    | expectedModule        | name
    ${{ type: Boolean }}        | ${booleanModule}      | ${'booleanModule'}
    ${{ type: Array(Boolean) }} | ${booleanArrayModule} | ${'booleanArrayModule'}
    ${{ type: ['foo', 'bar'] }} | ${enumModule}         | ${'enumModule'}
    ${{ type: Number }}         | ${numberModule}       | ${'numberModule'}
    ${{ type: Array(Number) }}  | ${numberArrayModule}  | ${'numberArrayModule'}
    ${{ type: String }}         | ${stringModule}       | ${'stringModule'}
    ${{ type: Array(String) }}  | ${stringArrayModule}  | ${'stringArrayModule'}
  `('recognizes $name', ({ itemType, expectedModule }) => {
    expect(getItemTypeModule(itemType)).toBe(expectedModule)
  })
})
