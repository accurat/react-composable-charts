import React from 'react'
import { area } from 'd3-shape'
import { buildCurveFn, CurveType } from '../lib/curve'
import { combineGetters, createDataScale, scaleZero } from '../lib/scales'
import {
  AnimationProps,
  CartesianScale,
  DataAccessor,
  DataGetter,
  NativeEventHandlers,
  SvgAttributesGetters,
  toAccessor,
} from '../lib/types'
import { useCartesianContext } from './internal'
import { Elements } from './Elements'

export type AreaAxesConfig<T> =
  | DataAccessor<T>
  | { base: DataGetter<T>; to: DataAccessor<T> }

function sanitizeAxesConfig<T>(
  config: AreaAxesConfig<T>,
  scale: CartesianScale
): { base: DataAccessor<T>; to: DataAccessor<T> } {
  if (typeof config === 'function') {
    return { to: config, base: () => scaleZero(scale) }
  }

  const { base, to } = config

  return { to, base: toAccessor(base) }
}

export interface AreaProps<T>
  extends AnimationProps<T[]>,
    Pick<SvgAttributesGetters<T>, 'x' | 'y1' | 'y2'>,
    Omit<SvgAttributesGetters<T[]>, 'x' | 'y1' | 'y2'>,
    NativeEventHandlers<T[]> {
  data: T[]
  'data-x': DataAccessor<T>
  'data-y': AreaAxesConfig<T>
  curve?: CurveType
}

export function Area<T>({
  data,
  'data-x': dataX,
  'data-y': _dataY,
  curve = 'line',
  x: _x,
  y1: _y1,
  y2: _y2,
  ...props
}: AreaProps<T>) {
  const { xScale, yScale } = useCartesianContext()
  const curveFn = buildCurveFn(curve)
  const dataY = sanitizeAxesConfig(_dataY, yScale)

  const x = combineGetters([createDataScale(dataX, xScale, 0), _x])
  const y1 = combineGetters([createDataScale(dataY.base, yScale, 0), _y1])
  const y2 = combineGetters([createDataScale(dataY.to, yScale, 0), _y2])

  const d = (data: T[]) => {
    const points = data
      .map((d) => [x(d), y1(d), y2(d)])
      .filter((d) => d.every((p) => !isNaN(p)))

    return (
      area<number[]>()
        .x((d) => d[0])
        .y0((d) => d[1])
        .y1((d) => d[2])
        .curve(curveFn)(points) ?? ''
    )
  }

  return <Elements tag="path" data={[data]} {...props} d={d} />
}
