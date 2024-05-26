import {
  CartesianScale,
  isScaleCategorical,
  DataValue,
  DataAccessor,
  Getter,
  toAccessor,
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
