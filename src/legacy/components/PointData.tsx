import React from 'react'
import { computePos } from '../../lib/scales'
import { AnimationProps, DataAccessor, StyleProps } from '../../lib/types'
import { AnimatedDataset } from '../../components/AnimatedDataset'
import { useSanitizedCascadingAnimation } from '../../components/Animation'
import { useCartesianContext } from '../../components/internal'
import { useComputableStyle } from '../../components/Style'

interface PointDataProps<T> extends StyleProps<T>, AnimationProps<T> {
  data: T[]
  x: DataAccessor<T>
  y: DataAccessor<T>
  r?: number | ((datum: T) => number)
}

/** @deprecated since v0.1.5. Use `Circles` instead. Will be removed in v1.0.0 */
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
