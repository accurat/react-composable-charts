import { range } from 'lodash-es'
import React from 'react'
import { CommonStyleProps, isScaleContinuous } from '../lib/types'
import { useCartesianContext, useChartContext } from './internal'
import { LineData } from './LineData'

export interface LineFunctionProps extends CommonStyleProps {
  fn: (x: number) => number
  /** points per pixel */
  resolution?: number
}

export function LineFunction({
  fn,
  resolution = 1,
  ...props
}: LineFunctionProps) {
  const { left, right } = useChartContext()
  const { xScale } = useCartesianContext()

  if (!isScaleContinuous(xScale))
    throw new Error(
      'LineFunction must be used in a Cartesian component with a continuous x scale'
    )

  const step = 1 / resolution
  const xValues = range(left, right + step, step).map(xScale.invert) as number[]

  return <LineData data={xValues} x={(x) => x} y={fn} {...props} />
}
