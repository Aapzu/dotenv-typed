import { getItemTypeModule } from '../src/getItemTypeModule'
import booleanModule from '../src/typeModules/boolean'
import enumModule from '../src/typeModules/enum'
import numberModule from '../src/typeModules/number'
import stringModule from '../src/typeModules/string'

describe('getItemTypeModule', () => {
  it.each`
    itemType                    | expectedModule   | name
    ${{ type: Boolean }}        | ${booleanModule} | ${'booleanModule'}
    ${{ type: ['foo', 'bar'] }} | ${enumModule}    | ${'enumModule'}
    ${{ type: Number }}         | ${numberModule}  | ${'numberModule'}
    ${{ type: String }}         | ${stringModule}  | ${'stringModule'}
  `('recognizes $name', ({ itemType, expectedModule }) => {
    expect(getItemTypeModule(itemType)).toBe(expectedModule)
  })

  it.each`
    itemType                    | expectedModuleType | name
    ${{ type: Array(Boolean) }} | ${'boolean array'} | ${'booleanArrayModule'}
    ${{ type: Array(Number) }}  | ${'number array'}  | ${'numberArrayModule'}
    ${{ type: Array(String) }}  | ${'string array'}  | ${'stringArrayModule'}
  `('recognizes $name', ({ itemType, expectedModuleType }) => {
    expect(getItemTypeModule(itemType).typeName).toBe(expectedModuleType)
  })
})
