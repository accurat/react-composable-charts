import React from 'react'
import {
  AnimationProps,
  SvgAttributesGetters,
  DataAccessor,
  NativeEventHandlers,
  tuple,
} from '../lib/types'
import { useCartesianContext } from './internal'
import { combineGetters, createDataScale } from '../lib/scales'
import { Elements } from './Elements'
import { CurveType, buildCurveFn } from '../lib/curve'
import { line } from 'd3'

export interface LineProps<T>
  extends AnimationProps<T[]>,
    Pick<SvgAttributesGetters<T>, 'x' | 'y'>,
    Omit<SvgAttributesGetters<T[]>, 'x' | 'y'>,
    NativeEventHandlers<T[]> {
  data: T[]
  'data-x'?: DataAccessor<T>
  'data-y'?: DataAccessor<T>
  curve?: CurveType
}

export function Line<T>({
  data,
  'data-x': dataX,
  'data-y': dataY,
  x: _x,
  y: _y,
  curve: curveType = 'line',
  ...props
}: LineProps<T>) {
  const { xScale, yScale } = useCartesianContext()
  const curveFn = buildCurveFn(curveType)

  const x = combineGetters([createDataScale(dataX, xScale, 0), _x])
  const y = combineGetters([createDataScale(dataY, yScale, 0), _y])

  const d = (data: T[]) => {
    const points = data
      .map((d) => tuple(x(d), y(d)))
      .filter((d) => d.every((p) => !isNaN(p)))
    return line().curve(curveFn)(points) ?? ''
  }

  return <Elements fill="none" {...props} data={[data]} tag="path" d={d} />
}
