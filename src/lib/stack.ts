import { groupBy, keyBy, get, compact } from 'lodash-es'

type Stack<T> = {
  datum: T
  to: number
  base: number
  group: string
  category: string | number
  value: number
}
interface StackNarrowProps<T extends object> {
  data: T[]
  getGroup: (d: T) => string
  categories: string[]
  getCategory: (d: T) => string | number
  getValue: (d: T) => number
}

export const stackNarrow = <T extends object>({
  data,
  categories,
  getCategory,
  getGroup,
  getValue,
}: StackNarrowProps<T>): Stack<T>[] => {
  const groups = Object.values(groupBy(data, getGroup))

  return groups.flatMap((group) => {
    const dataByCategory = keyBy(group, getCategory)
    const dataSortedByCategory = compact(
      categories.map((category) => {
        return get(dataByCategory, category, undefined)
      })
    )
    let top = 0
    let bottom = 0
    return dataSortedByCategory.map((datum) => {
      const value = getValue(datum)
      const base = value >= 0 ? top : bottom
      const to = base + value

      if (value >= 0) {
        top = to
      } else {
        bottom = to
      }
      return {
        datum,
        base,
        to,
        value,
        group: getGroup(datum),
        category: getCategory(datum),
      }
    })
  })
}
