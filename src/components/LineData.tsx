import React from 'react'
import { line } from 'd3-shape'
import { AnimationProps, CommonStyleProps, DataAccessor } from '../lib/types'
import { useCartesianContext } from './internal'
import { useCascadingStyle } from './Style'
import { computePos } from '../lib/scales'
import { buildCurveFn, CurveType } from '../lib/curve'
import { tuple } from '../lib/types'
import { AnimatedDataset } from './AnimatedDataset'
import { useSanitizedCascadingAnimation } from './Animation'

export interface LineDataProps<T>
  extends CommonStyleProps,
    AnimationProps<T[]> {
  data: T[]
  x: DataAccessor<T>
  y: DataAccessor<T>
  curve?: CurveType
}

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
