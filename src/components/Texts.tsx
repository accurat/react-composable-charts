import React from 'react'
import {
  AnimationProps,
  SvgAttributesGetters,
  DataAccessor,
  toAccessor,
  NativeEventHandlers,
  DataValue,
  DefaultedIteratee,
} from '../lib/types'
import { useCartesianContext } from './internal'
import { computePos } from '../lib/scales'
import { Elements } from './Elements'

export interface TextsProps<T>
  extends AnimationProps<T>,
    SvgAttributesGetters<T>,
    NativeEventHandlers<T> {
  data: T[]
  'data-x'?: DataAccessor<T>
  'data-y'?: DataAccessor<T>
  text?: DefaultedIteratee<T, DataValue>
}

export function Texts<T>({
  'data-x': dataX,
  'data-y': dataY,
  ...props
}: TextsProps<T>) {
  const { xScale, yScale } = useCartesianContext()

  const x = (t: T) => {
    const x = dataX ? computePos(dataX(t), xScale, 'center') : 0
    return x + Number(toAccessor(props.x ?? 0)(t))
  }

  const y = (t: T) => {
    const y = dataY ? computePos(dataY(t), yScale, 'center') : 0
    return y + Number(toAccessor(props.y ?? 0)(t))
  }

  return <Elements {...props} tag="text" x={x} y={y} />
}
