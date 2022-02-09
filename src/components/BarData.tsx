import React from 'react'
import { computePos, scaleZero } from '../lib/scales'
import {
  CartesianScale,
  DataAccessor,
  StyleProps,
  DataGetter,
  toAccessor,
  AnimationProps,
} from '../lib/types'
import { AnimatedDataset } from './AnimatedDataset'
import { useSanitizedCascadingAnimation } from './Animation'
import { useCartesianContext } from './internal'
import { useComputableStyle } from './Style'

export type BarAxesConfig<T> =
  | DataAccessor<T>
  | { base?: DataGetter<T>; to: DataGetter<T> }

function sanitizeAxisConfig<T>(
  config: BarAxesConfig<T>,
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

export interface BarDataProps<T> extends StyleProps<T>, AnimationProps<T> {
  data: T[]
  x: BarAxesConfig<T>
  y: BarAxesConfig<T>
}

export function BarData<T>({
  data,
  x: _x,
  y: _y,
  dataKey,
  delay,
  duration,
  enter = {},
  easing,
  ...props
}: BarDataProps<T>) {
  const { xScale, yScale, colorScale } = useCartesianContext()
  const style = useComputableStyle(props, colorScale)

  const x = sanitizeAxisConfig(_x, xScale)
  const y = sanitizeAxisConfig(_y, yScale)
  const animation = useSanitizedCascadingAnimation({ delay, duration, easing })

  const x1 = (d: T) => computePos(x.base(d), xScale, 'start')
  const y1 = (d: T) => computePos(y.base(d), yScale, 'end')

  const x2 = (d: T) => computePos(x.to(d), xScale, 'end')
  const y2 = (d: T) => computePos(y.to(d), yScale, 'start')

  return (
    <AnimatedDataset
      tag="rect"
      dataset={data}
      attrs={{
        x: (d: T) => Math.min(x1(d), x2(d)),
        y: (d: T) => Math.min(y1(d), y2(d)),
        width: (d: T) => Math.abs(x1(d) - x2(d)),
        height: (d: T) => Math.abs(y1(d) - y2(d)),
        ...style,
      }}
      init={enter}
      keyFn={(d: T, i: number) => dataKey?.(d, i) ?? i}
      {...(animation as any)}
    />
  )
}
