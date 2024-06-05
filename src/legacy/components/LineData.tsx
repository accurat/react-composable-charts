import React from 'react'
import { line } from 'd3-shape'
import { AnimationProps, DataAccessor } from '../../lib/types'
import { useCartesianContext } from '../../components/internal'
import { useCascadingStyle } from '../../components/Style'
import { computePos } from '../../lib/scales'
import { buildCurveFn, CurveType } from '../../lib/curve'
import { tuple } from '../../lib/types'
import { AnimatedDataset } from '../../components/AnimatedDataset'
import { useSanitizedCascadingAnimation } from '../../components/Animation'
import { CommonStyleProps } from '../lib/types'

/** @deprecated */
export interface LineDataProps<T>
  extends CommonStyleProps,
    AnimationProps<T[]> {
  data: T[]
  x: DataAccessor<T>
  y: DataAccessor<T>
  curve?: CurveType
}

/** @deprecated since v0.2.0. Use `Line` instead. Will be removed in v1.0.0 */
export function LineData<T>({
  data,
  x,
  y,
  dataKey,
  curve: type = 'line',
  delay,
  duration,
  enter,
  easing,
  ...props
}: LineDataProps<T>) {
  const { xScale, yScale } = useCartesianContext()
  const style = useCascadingStyle(props)
  const curveFn = buildCurveFn(type)
  const animation = useSanitizedCascadingAnimation({ duration, delay, easing })

  const d = (data: T[]) => {
    const points = data
      .map((d) => tuple(computePos(x(d), xScale), computePos(y(d), yScale)))
      .filter((d) => d.every((p) => !isNaN(p)))
    return line().curve(curveFn)(points) ?? ''
  }

  return (
    <AnimatedDataset
      tag="path"
      dataset={[data]}
      attrs={{ d, fill: 'none', ...style }}
      init={enter}
      keyFn={dataKey}
      {...(animation as any)}
    />
  )
}
