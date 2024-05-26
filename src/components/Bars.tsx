import React from 'react'
import {
  AnimationProps,
  SvgAttributesGetters,
  DataAccessor,
  toAccessor,
  NativeEventHandlers,
  DataGetter,
  CartesianScale,
} from '../lib/types'
import { useCartesianContext } from './internal'
import { computePos, scaleZero } from '../lib/scales'
import { Elements } from './Elements'

export type BarsAxesConfig<T> =
  | DataAccessor<T>
  | { base?: DataGetter<T>; to: DataGetter<T> }

function sanitizeAxisConfig<T>(
  config: BarsAxesConfig<T>,
  scale: CartesianScale
): { base: DataAccessor<T>; to: DataAccessor<T> } {
  if (typeof config === 'function') {
    return { to: config, base: config }
  }
  const { to, base = () => scaleZero(scale) } = config
  return {
    to: toAccessor(to),
    base: toAccessor(base),
  }
}

export interface BarsProps<T>
  extends AnimationProps<T>,
    SvgAttributesGetters<T>,
    NativeEventHandlers<T> {
  data: T[]
  'data-x': BarsAxesConfig<T>
  'data-y': BarsAxesConfig<T>
}

export function Bars<T>({
  'data-x': _dataX,
  'data-y': _dataY,
  ...props
}: BarsProps<T>) {
  const { xScale, yScale } = useCartesianContext()

  const dataX = sanitizeAxisConfig(_dataX, xScale)
  const dataY = sanitizeAxisConfig(_dataY, yScale)

  const x1 = (d: T) => computePos(dataX.base(d), xScale, 'start')
  const y1 = (d: T) => computePos(dataY.base(d), yScale, 'end')

  const x2 = (d: T) => computePos(dataX.to(d), xScale, 'end')
  const y2 = (d: T) => computePos(dataY.to(d), yScale, 'start')

  const x = (d: T) => Math.min(x1(d), x2(d))
  const y = (d: T) => Math.min(y1(d), y2(d))
  const width = (d: T) => Math.abs(x1(d) - x2(d))
  const height = (d: T) => Math.abs(y1(d) - y2(d))

  return (
    <Elements {...props} tag="rect" x={x} y={y} width={width} height={height} />
  )
}
