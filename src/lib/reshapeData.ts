import { omit } from 'lodash-es'

export const wideToNarrow = <
  T extends object,
  K extends keyof T,
  N extends string,
  V extends string
>(
  data: T[],
  cols: K[],
  namesTo: N,
  valuesTo: V
): (Omit<T, K> & Record<N, string> & Record<V, T[K]>)[] =>
  data.flatMap((datum) => {
    const datumWithoutCols = omit(datum, cols)
    return cols.map((c) => ({
      ...datumWithoutCols,
      [namesTo]: c,
      [valuesTo]: datum[c],
    })) as any
  })

// export const narrowToWide = <T extends object, C extends keyof T, V extends keyof T>(
//   data: T[],
//   key: (d: T) => string,
//   col: C,
//   value: V
// ) => {
//   const groupedBy = groupBy(data, key)
//   return Object.values(groupedBy).map((arr) => {
//     const datumWithoutColAndValue = omit(arr[0], [col, value])
//     return arr.reduce((acc, curr) => {
//       acc[curr[col as string]] = curr[value]
//       return acc
//     }, datumWithoutColAndValue)
//   })
// }
