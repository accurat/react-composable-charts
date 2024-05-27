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

export interface RectsProps<T>
  extends AnimationProps<T>,
    SvgAttributesGetters<T>,
    NativeEventHandlers<T> {
  data: T[]
  'data-x'?: DataAccessor<T>
  'data-y'?: DataAccessor<T>
  'data-width'?: DataAccessor<T>
  'data-height'?: DataAccessor<T>
}

export function Rects<T>({
  'data-x': dataX,
  'data-y': dataY,
  'data-width': dataWidth,
  'data-height': dataHeight,
  ...props
}: RectsProps<T>) {
  const { xScale, yScale } = useCartesianContext()

  const x = createDataScale(dataX, xScale, 0)
  const y = createDataScale(dataY, yScale, 0)
  const width = createDataScale(dataWidth, xScale, 0)
  const height = createDataScale(dataHeight, yScale, 0)

  return (
    <Elements
      {...props}
      tag="rect"
      x={combineGetters([x, props.x])}
      y={combineGetters([y, props.y])}
      width={combineGetters([width, props.width])}
      height={combineGetters([height, props.height])}
    />
  )
}
