import React from 'react'
import { line } from 'd3'
import { createDataScale } from '../lib/scales'
import {
  AnimationProps,
  DataAccessor,
  NativeEventHandlers,
  SvgAttributesGetters,
} from '../lib/types'
import { useCartesianContext, useChartContext } from './internal'
import { Elements } from './Elements'
import { VoronoiTile, voronoi } from '../lib/voronoi'

export interface VoronoiProps<T>
  extends AnimationProps<VoronoiTile<T>>,
    SvgAttributesGetters<VoronoiTile<T>>,
    NativeEventHandlers<VoronoiTile<T>> {
  data: T[]
  'x-data'?: DataAccessor<T>
  'y-data'?: DataAccessor<T>
}

export function Voronoi<T>({
  data,
  'x-data': dataX,
  'y-data': dataY,
  ...props
}: VoronoiProps<T>) {
  const { xScale, yScale } = useCartesianContext()
  const { left, top, right, bottom } = useChartContext()

  const cx = createDataScale(dataX, xScale, 0)
  const cy = createDataScale(dataY, yScale, 0)

  const voronoiData = voronoi({
    data,
    x: cx,
    y: cy,
    bounds: [left, top, right, bottom],
  })

  return (
    <Elements
      {...props}
      data={voronoiData}
      tag="path"
      d={(d) => line()(d.polygon) || ''}
    />
  )
}
