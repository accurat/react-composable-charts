import React from 'react'
import {
  AnimationProps,
  SvgAttributesGetters,
  DataAccessor,
  NativeEventHandlers,
} from '../lib/types'
import { useCartesianContext } from './internal'
import { combineGetters, createDataScale } from '../lib/scales'
import { Elements } from './Elements'

export interface CirclesProps<T>
  extends AnimationProps<T>,
    SvgAttributesGetters<T>,
    NativeEventHandlers<T> {
  data: T[]
  'x-data'?: DataAccessor<T>
  'y-data'?: DataAccessor<T>
}

export function Circles<T>({
  'x-data': dataX,
  'y-data': dataY,
  ...props
}: CirclesProps<T>) {
  const { xScale, yScale } = useCartesianContext()
  const cx = createDataScale(dataX, xScale, 0)
  const cy = createDataScale(dataY, yScale, 0)

  return (
    <Elements
      {...props}
      tag="circle"
      cx={combineGetters([cx, props.cx])}
      cy={combineGetters([cy, props.cy])}
    />
  )
}
