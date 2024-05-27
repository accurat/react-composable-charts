import React from 'react'
import { area } from 'd3-shape'
import { buildCurveFn, CurveType } from '../../lib/curve'
import { computePos, scaleZero } from '../../lib/scales'
import {
  AnimationProps,
  CartesianScale,
  DataAccessor,
  DataGetter,
  toAccessor,
} from '../../lib/types'
import { useCartesianContext } from '../../components/internal'
import { useCascadingStyle } from '../../components/Style'
import { AnimatedDataset } from '../../components/AnimatedDataset'
import { useSanitizedCascadingAnimation } from '../../components/Animation'
import { CommonStyleProps } from '../lib/types'

/** @deprecated */
export type AreaYConfig<T> =
  | DataAccessor<T>
  | { base: DataGetter<T>; to: DataAccessor<T> }

function sanitizeYConfig<T>(
  config: AreaYConfig<T>,
  scale: CartesianScale
): { base: DataAccessor<T>; to: DataAccessor<T> } {
  if (typeof config === 'function') {
    return { to: config, base: () => scaleZero(scale) }
  }

  const { base, to } = config

  return { to, base: toAccessor(base) }
}

/** @deprecated */
export interface AreaDataProps<T>
  extends CommonStyleProps,
    AnimationProps<T[]> {
  data: T[]
  x: DataAccessor<T>
  y: AreaYConfig<T>
  curve?: CurveType
}

/** @deprecated since v0.1.5. Use `Area` instead. Will be removed in v1.0.0 */
export function AreaData<T>({
  data,
  x,
  y: _y,
  curve = 'line',
  dataKey,
  enter,
  duration,
  delay,
  easing,
  ...props
}: AreaDataProps<T>) {
  const { xScale, yScale } = useCartesianContext()
  const style = useCascadingStyle(props)
  const curveFn = buildCurveFn(curve)
  const animation = useSanitizedCascadingAnimation({ duration, delay, easing })
  const y = sanitizeYConfig(_y, yScale)

  const d = (data: T[]) => {
    const points = data
      .map((d) => [
        computePos(x(d), xScale),
        computePos(y.base(d), yScale),
        computePos(y.to(d), yScale),
      ])
      .filter((d) => d.every((p) => !isNaN(p)))

    return (
      area<number[]>()
        .x((d) => d[0])
        .y0((d) => d[1])
        .y1((d) => d[2])
        .curve(curveFn)(points) ?? ''
    )
  }

  return (
    <AnimatedDataset
      tag="path"
      dataset={[data]}
      attrs={{ d, fill: 'none', ...style }}
      keyFn={dataKey}
      init={enter}
      {...(animation as any)}
    />
  )
}
