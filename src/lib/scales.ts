import {
  CartesianScale,
  isScaleCategorical,
  DataValue,
  DataAccessor,
  Getter,
  toAccessor,
  isNotNil,
} from './types'

export const scaleZero = (scale: CartesianScale) =>
  isScaleCategorical(scale) ? scale.domain()[0] : 0
export const scaleStep = (scale: CartesianScale) =>
  isScaleCategorical(scale) ? scale.bandwidth() : 1

function computeCenterPos(value: DataValue, scale: CartesianScale) {
  const pos = scale(value as any)
  const off = isScaleCategorical(scale) ? scale.bandwidth() / 2 : 0
  return pos + off
}
function computeStartPos(value: DataValue, scale: CartesianScale) {
  const pos = scale(value as any)
  return pos
}

function computeEndPos(value: DataValue, scale: CartesianScale) {
  const pos = scale(value as any)
  return pos + scaleStep(scale)
}

export function computePos(
  value: DataValue,
  scale: CartesianScale,
  position: 'center' | 'start' | 'end' | number = 'center'
) {
  if (position === 'center') return computeCenterPos(value, scale)
  if (position === 'start') return computeStartPos(value, scale)
  if (position === 'end') return computeEndPos(value, scale)
  return computeStartPos(value, scale) + scaleStep(scale) * position
}

export function createDataScale<T, U extends DataValue>(
  dataAccessor: DataAccessor<T> | undefined,
  scale: CartesianScale,
  defaultValue: U,
  position: 'center' | 'start' | 'end' | number = 'center'
) {
  return (d: T) => {
    const computed = dataAccessor
      ? computePos(dataAccessor(d), scale, position)
      : defaultValue

    return computed
  }
}

export function combineGetters<T, U extends number>(
  getters: (Getter<T, U> | undefined)[]
) {
  return (d: T) =>
    getters
      .filter(isNotNil)
      .map((g) => toAccessor(g)(d))
      .reduce((a, b) => a + b, 0)
}

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
