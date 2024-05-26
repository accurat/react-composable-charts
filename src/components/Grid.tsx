/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Elements, Texts, element } from '..'
import { computePos } from '../lib/scales'
import {
  AnimationProps,
  CartesianScale,
  CommonStyleProps,
  Component,
  DataValue,
  isScaleContinuous,
  Filter,
} from '../lib/types'
import { xor } from '../internal/utils'
import {
  GridContext,
  useCartesianContext,
  useChartContext,
  useGridContext,
} from './internal'
import { Range } from './Range'
import { useCascadingStyle } from './Style'

export interface GridProps {
  children?: React.ReactNode
  xAnchor?: 'bottom' | 'top' | 'none'
  yAnchor?: 'left' | 'right' | 'none'

  /** Ideal number di pixel per tick */
  tickSize?: number

  /** Ideal total number of ticks */
  tickCount?: number
}

export interface GridLinesProps
  extends CommonStyleProps,
    AnimationProps<DataValue> {
  ticks?: DataValue[]
}

export interface GridLabelsProps
  extends CommonStyleProps,
    AnimationProps<DataValue> {
  format?: (allValues: DataValue[]) => (value: DataValue, i: number) => string
  padding?: number
  threshold?: number
  inner?: boolean
  ticks?: DataValue[]
  filter?: Filter<DataValue>
}

export type GridComponent = Component<GridProps> & {
  XAxes: Component<CommonStyleProps>
  YAxes: Component<CommonStyleProps>
  XLabels: Component<GridLabelsProps>
  YLabels: Component<GridLabelsProps>
  XLines: Component<GridLinesProps>
  YLines: Component<GridLinesProps>
}

export type AxesAnchor = 'start' | 'end' | 'none'

const computeAxesPos = (
  scale: CartesianScale,
  range: [number, number],
  anchor: AxesAnchor = 'none'
) => {
  const [start, end] = range
  return {
    start: () => start,
    end: () => end,
    none: () => {
      const zeroPos = isScaleContinuous(scale) ? scale(0) : scale.range()[0]
      return Range.clampValue(zeroPos, [start, end])
    },
  }[anchor]()
}

const computeTicks = (scale: CartesianScale, count: number) =>
  isScaleContinuous(scale) ? scale.ticks(count) : scale.domain()

export const Grid = (({
  children,
  tickSize: tickResolution = 50,
  tickCount,
  xAnchor = 'none',
  yAnchor = 'none',
}) => {
  const { top, left, bottom, right, width, height } = useChartContext()
  const { yScale, xScale } = useCartesianContext()

  const xCount = tickCount ?? width / tickResolution
  const yCount = tickCount ?? height / tickResolution

  const xAxesAnchor = ({ bottom: 'start', top: 'end', none: 'none' } as const)[
    xAnchor
  ]
  const yAxesAnchor = ({ left: 'start', right: 'end', none: 'none' } as const)[
    yAnchor
  ]
  return (
    <GridContext.Provider
      value={{
        xAxes: computeAxesPos(xScale, [left, right], yAxesAnchor),
        yAxes: computeAxesPos(yScale, [bottom, top], xAxesAnchor),
        xTicks: computeTicks(xScale, xCount),
        yTicks: computeTicks(yScale, yCount),
      }}
    >
      {children}
    </GridContext.Provider>
  )
}) as GridComponent

Grid.XAxes = (props) => {
  const { left, right } = useChartContext()
  const { yAxes } = useGridContext()
  const style = useCascadingStyle(props)
  // TODO: add animation
  return <element.line {...style} x1={left} x2={right} y1={yAxes} y2={yAxes} />
}

Grid.YAxes = (props) => {
  const { top, bottom } = useChartContext()
  const { xAxes } = useGridContext()

  const style = useCascadingStyle(props)
  // TODO: add animation
  return <element.line {...style} x1={xAxes} x2={xAxes} y1={top} y2={bottom} />
}

Grid.XLabels = ({
  format: buildFormatter = () => (value) => String(value),
  padding = 0,
  threshold = 0,
  inner: _inner = false,
  filter = () => true,
  ticks: _ticks,
  dataKey,
  enter = {},
  delay,
  duration,
  ...props
}) => {
  const { top } = useChartContext()
  const { yAxes, xTicks } = useGridContext()
  const style = useCascadingStyle(props)

  const ticks = _ticks ?? xTicks
  const filteredTicks = ticks.filter(filter)
  const reverse = yAxes <= top + threshold
  const inner = xor(_inner, reverse)
  const formatter = buildFormatter(filteredTicks)

  return (
    <Texts
      data={filteredTicks}
      data-x={(t) => t}
      y={yAxes + (inner ? -padding : padding)}
      textAnchor="middle"
      dominantBaseline={inner ? 'auto' : 'hanging'}
      text={formatter}
      opacity={1}
      enter={{ opacity: 0, ...enter }}
      dataKey={(tick, i) => dataKey?.(tick, i) ?? tick}
      {...style}
    />
  )
}

Grid.YLabels = ({
  format: buildFormatter = () => (value) => String(value),
  padding = 0,
  threshold = 0,
  inner: _inner = false,
  filter = () => true,
  ticks: _ticks,
  dataKey,
  delay,
  duration,
  enter,
  ...props
}) => {
  const { right } = useChartContext()
  const { xAxes, yTicks } = useGridContext()
  const style = useCascadingStyle(props)

  const ticks = _ticks ?? yTicks
  const filteredTicks = ticks.filter(filter)
  const reverse = xAxes >= right - threshold
  const inner = xor(_inner, reverse)
  const formatter = buildFormatter(filteredTicks)

  return (
    <Texts
      data={filteredTicks}
      x={xAxes + (inner ? padding : -padding)}
      data-y={(t) => t}
      textAnchor={inner ? 'start' : 'end'}
      dominantBaseline="middle"
      text={formatter}
      opacity={1}
      enter={{ opacity: 0, ...enter }}
      dataKey={(tick, i) => dataKey?.(tick, i) ?? tick}
      {...style}
    />
  )
}

Grid.XLines = ({ ticks, dataKey, delay, duration, enter, ...props }) => {
  const { top, bottom } = useChartContext()
  const { xScale } = useCartesianContext()
  const xTicks = ticks ?? useGridContext().xTicks
  const style = useCascadingStyle(props)

  return (
    <Elements
      tag="line"
      data={xTicks}
      x1={(t) => computePos(t, xScale)}
      x2={(t) => computePos(t, xScale)}
      y1={top}
      y2={bottom}
      opacity={1}
      enter={{ opacity: 0, ...enter }}
      dataKey={(tick: DataValue, i: number) => dataKey?.(tick, i) ?? tick}
      {...style}
    />
  )
}

Grid.YLines = ({ ticks, dataKey, enter, duration, delay, ...props }) => {
  const { left, right } = useChartContext()
  const { yScale } = useCartesianContext()
  const yTicks = ticks ?? useGridContext().yTicks
  const style = useCascadingStyle(props)

  return (
    <Elements
      tag="line"
      data={yTicks}
      x1={left}
      x2={right}
      y1={(t) => computePos(t, yScale)}
      y2={(t) => computePos(t, yScale)}
      opacity={1}
      enter={{ opacity: 0, ...enter }}
      dataKey={(tick: DataValue, i: number) => dataKey?.(tick, i) ?? tick}
      {...style}
    />
  )
}
