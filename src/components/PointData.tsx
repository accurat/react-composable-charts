import React from 'react'
import { computePos } from '../lib/scales'
import { AnimationProps, DataAccessor, StyleProps } from '../lib/types'
import { AnimatedDataset } from './AnimatedDataset'
import { useSanitizedCascadingAnimation } from './Animation'
import { useCartesianContext } from './internal'
import { useComputableStyle } from './Style'

interface PointDataProps<T> extends StyleProps<T>, AnimationProps<T> {
  data: T[]
  x: DataAccessor<T>
  y: DataAccessor<T>
  r?: number | ((datum: T) => number)
}

export function PointData<T>({
  data,
  x,
  y,
  r = 1,
  dataKey,
  duration,
  delay,
  enter,
  easing,
  ...props
}: PointDataProps<T>) {
  const { xScale, yScale, colorScale } = useCartesianContext()
  const style = useComputableStyle(props, colorScale)
  const animation = useSanitizedCascadingAnimation({ delay, duration, easing })

  return (
    <AnimatedDataset
      tag="circle"
      dataset={data}
      keyFn={(d: T, i: number) => dataKey?.(d, i) ?? i}
      attrs={{
        cx: (d: T) => computePos(x(d), xScale),
        cy: (d: T) => computePos(y(d), yScale),
        r: (d: T) => (typeof r === 'function' ? r(d) : r),
        ...style,
      }}
      init={enter}
      {...(animation as any)}
    />
  )
}
