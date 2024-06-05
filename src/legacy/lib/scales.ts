import { computePos } from '../../lib/scales'
import {
  CartesianScale,
  DataAccessor,
  Getter,
  toAccessor,
} from '../../lib/types'

/** @deprecated */
export function buildComputePos<T>(
  dataAccessor: DataAccessor<T> | undefined,
  positionGetter: Getter<T, number> | undefined,
  offsetGetter: Getter<T, number> | undefined,
  scale: CartesianScale,
  debugName: string
) {
  return (
    datum: T,
    position: 'center' | 'start' | 'end' | number = 'center'
  ) => {
    const offset =
      offsetGetter !== undefined ? toAccessor(offsetGetter)(datum) : 0

    if (positionGetter !== undefined) {
      const positionAccessor = toAccessor(positionGetter)
      return positionAccessor(datum) + offset
    }

    if (dataAccessor !== undefined) {
      const value = dataAccessor(datum)
      return computePos(value, scale, position) + offset
    }

    throw new Error(
      `Please declare 1 of data${debugName} or position${debugName}`
    )
  }
}
