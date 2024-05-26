import React from 'react'
import {
  AnimationProps,
  SvgAttributesGetters,
  DataAccessor,
  toAccessor,
  NativeEventHandlers,
} from '../lib/types'
import { useCartesianContext } from './internal'
import { computePos } from '../lib/scales'
import { Elements } from './Elements'

export interface CirclesProps<T>
  extends AnimationProps<T>,
    SvgAttributesGetters<T>,
    NativeEventHandlers<T> {
  data: T[]
  'data-x'?: DataAccessor<T>
  'data-y'?: DataAccessor<T>
}

export function Circles<T>({
  'data-x': dataX,
  'data-y': dataY,
  ...props
}: CirclesProps<T>) {
  const { xScale, yScale } = useCartesianContext()

  const cx = (t: T) => {
    const x = dataX ? computePos(dataX(t), xScale) : 0
    return x + Number(toAccessor(props.cx ?? 0)(t))
  }

  const cy = (t: T) => {
    const y = dataY ? computePos(dataY(t), yScale) : 0
    return y + Number(toAccessor(props.cy ?? 0)(t))
  }

  return <Elements {...props} tag="circle" cx={cx} cy={cy} />
}
