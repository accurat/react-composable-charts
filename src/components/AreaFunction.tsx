import range from 'lodash/range'
import React from 'react'
import { CommonStyleProps, isScaleContinuous } from '../lib/types'
import { AreaData } from './AreaData'
import { useCartesianContext, useChartContext } from './internal'

export interface AreaFunctionProps extends CommonStyleProps {
  fn: (x: number) => number
  fnBase?: (x: number) => number
  /** points per pixel */
  resolution?: number
}

export function AreaFunction({
  fn,
  resolution = 1,
  fnBase = () => 0,
  ...props
}: AreaFunctionProps) {
  const { left, right } = useChartContext()
  const { xScale } = useCartesianContext()

  if (!isScaleContinuous(xScale))
    throw new Error(
      'AreaFunction must be used in a Cartesian component with a continuous x scale'
    )

  const step = 1 / resolution
  const xValues = range(left, right + step, step).map(xScale.invert) as number[]

  return (
    <AreaData
      data={xValues}
      x={(x) => x}
      y={{ to: fn, base: fnBase }}
      {...props}
    />
  )
}
