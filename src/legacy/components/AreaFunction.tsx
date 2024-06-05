import { range } from 'lodash-es'
import React from 'react'
import { isScaleContinuous } from '../../lib/types'
import { AreaData } from './AreaData'
import { useCartesianContext, useChartContext } from '../../components/internal'
import { CommonStyleProps } from '../lib/types'

/** @deprecated */
export interface AreaFunctionProps extends CommonStyleProps {
  fn: (x: number) => number
  fnBase?: (x: number) => number
  /** points per pixel */
  resolution?: number
}

/** @deprecated since v0.2.0. Will be removed in v1.0.0 */
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
