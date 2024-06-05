import React from 'react'
import { computePos, scaleZero } from '../../lib/scales'
import { AnimationProps, DataAccessor, toAccessor } from '../../lib/types'
import { AnimatedDataset } from '../../components/AnimatedDataset'
import { useSanitizedCascadingAnimation } from '../../components/Animation'
import { useCartesianContext } from '../../components/internal'
import { useComputableStyle } from './Style'
import { StyleProps } from '../lib/types'

/** @deprecated */
export interface RectDataProps<T> extends StyleProps<T>, AnimationProps<T> {
  data: T[]
  x: DataAccessor<T>
  y: DataAccessor<T>
  width: number | DataAccessor<T>
  height: number | DataAccessor<T>
}

/** @deprecated since v0.2.0. Use `Rects` instead. Will be removed in v1.0.0 */
export function RectData<T>({
  data,
  x: _x,
  y: _y,
  width: _width,
  height: _height,
  dataKey,
  duration,
  delay,
  enter,
  easing,
  ...props
}: RectDataProps<T>) {
  const { xScale, yScale, colorScale } = useCartesianContext()
  const style = useComputableStyle(props, colorScale)
  const animation = useSanitizedCascadingAnimation({ delay, duration, easing })

  const x = (d: T) => computePos(_x(d), xScale)
  const y = (d: T) => computePos(_y(d), yScale)

  // TODO: refactor. _width can be either a px value
  // or a function that returns a data value
  const width = (d: T) => {
    return typeof _width === 'function'
      ? Math.abs(computePos(toAccessor(_width)(d), xScale)) -
          computePos(scaleZero(xScale), xScale)
      : _width
  }

  const height = (d: T) => {
    return typeof _height === 'function'
      ? Math.abs(
          computePos(toAccessor(_height)(d), yScale) -
            computePos(scaleZero(yScale), yScale)
        )
      : _height
  }

  return (
    <AnimatedDataset
      tag="rect"
      dataset={data}
      keyFn={(d: T, i: number) => dataKey?.(d, i) ?? i}
      attrs={{
        x: (d: T) => x(d) - width(d) / 2,
        y: (d: T) => y(d) - height(d) / 2,
        width,
        height,
        ...style,
      }}
      init={enter}
      {...(animation as any)}
    />
  )
}
