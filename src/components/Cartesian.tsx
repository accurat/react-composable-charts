import {
  scaleBand,
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  scalePoint,
  scalePow,
  scaleSqrt,
  scaleTime,
} from 'd3-scale'
import React from 'react'
import { useGesture, Vector2 } from '@use-gesture/react'
import {
  CartesianScale,
  isScaleContinuous,
  ScaleCategorical,
  ScaleContinuous,
  ScaleOrdinal,
  tuple,
} from '../lib/types'
import { CartesianContext, useChartContext } from './internal'

export type ContinuousScaleConfigs =
  | { scale: 'linear'; domain?: number[] }
  | { scale: 'square'; domain?: number[] }
  | { scale: 'log'; domain?: number[]; base?: number }
  | { scale: 'pow'; domain?: number[]; exponent?: number }
  | { scale: 'date'; domain?: Date[] }

export type CategoricalScaleConfigs =
  | {
      scale: 'band'
      domain?: string[]
      padding?: number
      paddingInner?: number
      paddingOuter?: number
    }
  | { scale: 'point'; domain?: string[]; padding?: number }

export type OrdinalScaleConfigs = {
  scale: 'ordinal'
  domain: string[]
  range: string[]
}

export type ScaleConfigs = ContinuousScaleConfigs | CategoricalScaleConfigs

export type CartesianScaleType = ScaleConfigs['scale']
export type CartesianScaleOptions<T extends CartesianScaleType> = Extract<
  ScaleConfigs,
  { scale: T }
>
export type CartesianScaleDomain<T extends CartesianScaleType> = NonNullable<
  CartesianScaleOptions<T>['domain']
>

type Callback<Event> = (e: Event) => void
export type CartesianGestureCallback<
  X extends CartesianScaleType,
  Y extends CartesianScaleType
> = Callback<{
  xDomain: CartesianScaleDomain<X>
  yDomain: CartesianScaleDomain<Y>
}>

/* eslint-disable indent */
function buildScale(options: ScaleConfigs, range: [number, number]) {
  switch (options.scale) {
    case 'linear':
      return scaleLinear()
        .domain(options?.domain ?? [0, 1])
        .range(range) as ScaleContinuous
    case 'square':
      return scaleSqrt()
        .domain(options?.domain ?? [0, 1])
        .range(range) as ScaleContinuous
    case 'log':
      return scaleLog()
        .domain(options?.domain ?? [0, 1])
        .range(range)
        .base(options.base ?? 10) as ScaleContinuous
    case 'pow':
      return scalePow()
        .domain(options?.domain ?? [0, 1])
        .range(range)
        .exponent(options.exponent ?? 1) as ScaleContinuous
    case 'date':
      return scaleTime()
        .domain(options?.domain ?? [])
        .range(range) as ScaleContinuous
    case 'band': {
      // TODO: add padding, paddingInner, paddingOuter options based on pixels
      const scale = scaleBand<number | string>(options?.domain ?? [], range)
      if (options.padding !== undefined) scale.padding(options.padding)
      if (options.paddingInner !== undefined)
        scale.paddingInner(options.paddingInner)
      if (options.paddingOuter !== undefined)
        scale.paddingOuter(options.paddingOuter)

      return scale as ScaleCategorical
    }
    case 'point':
      // TODO: add padding option based on pixels
      return scalePoint<number | string>()
        .domain(options?.domain ?? [])
        .range(range)
        .padding(options?.padding ?? 0) as ScaleCategorical
    default:
      throw new Error(`Unknown scale options: ${options}`)
  }
}

function buildOrdinalScale(options: OrdinalScaleConfigs) {
  switch (options.scale) {
    case 'ordinal':
      return scaleOrdinal()
        .domain(options.domain)
        .range(options.range) as ScaleOrdinal

    default:
      throw new Error(`Unknown scale options: ${options}`)
  }
}

function computePannedDomain(scale: CartesianScale, movement: number) {
  return isScaleContinuous(scale)
    ? scale.range().map((ext) => scale.invert(ext - movement))
    : scale.domain()
}

function computeZoommedDomain(
  scale: CartesianScale,
  zoom: number,
  origin: number
) {
  return isScaleContinuous(scale)
    ? scale.range().map((ext) => scale.invert((ext - origin) * zoom + ext))
    : scale.domain()
}

function handlePan<X extends CartesianScaleType, Y extends CartesianScaleType>(
  xScale: CartesianScale,
  yScale: CartesianScale,
  options: { delta: [number, number]; cb: CartesianGestureCallback<X, Y> }
) {
  const { delta, cb } = options
  const [dx, dy] = delta

  const xDomain = computePannedDomain(xScale, dx) as CartesianScaleDomain<X>
  const yDomain = computePannedDomain(yScale, dy) as CartesianScaleDomain<Y>

  cb({ xDomain, yDomain })
}

function handleZoom<X extends CartesianScaleType, Y extends CartesianScaleType>(
  xScale: CartesianScale,
  yScale: CartesianScale,
  options: {
    zoom: number
    mouse: [number, number]
    cb: CartesianGestureCallback<X, Y>
  }
) {
  const { zoom, mouse, cb } = options
  const [mx, my] = mouse
  const xDomain = computeZoommedDomain(
    xScale,
    zoom,
    mx
  ) as CartesianScaleDomain<X>
  const yDomain = computeZoommedDomain(
    yScale,
    zoom,
    my
  ) as CartesianScaleDomain<Y>

  cb({ xDomain, yDomain })
}

interface CartesianProps<
  X extends CartesianScaleType,
  Y extends CartesianScaleType
> {
  x?: CartesianScaleOptions<X>
  y?: CartesianScaleOptions<Y>
  color?: OrdinalScaleConfigs
  nice?: 'x' | 'y' | boolean
  onDrag?: CartesianGestureCallback<X, Y>
  onPinch?: CartesianGestureCallback<X, Y>
  onWheel?: CartesianGestureCallback<X, Y>
  children?: React.ReactNode
}

export function Cartesian<
  X extends CartesianScaleType = 'linear',
  Y extends CartesianScaleType = 'linear'
>({
  x,
  y,
  color,
  children,
  nice = false,
  onDrag,
  onPinch,
  onWheel,
}: CartesianProps<X, Y>) {
  const { top, left, bottom, right, width, height } = useChartContext()

  const xRange = tuple(left, right)
  const yRange = tuple(bottom, top)

  const xScaleNotNice = buildScale(x ?? { scale: 'linear' }, xRange)
  const yScaleNotNice = buildScale(y ?? { scale: 'linear' }, yRange)
  const colorScale = color ? buildOrdinalScale(color) : undefined

  const xScale = xScaleNotNice.copy()
  const yScale = yScaleNotNice.copy()
  if ((nice === true || nice === 'x') && isScaleContinuous(xScale))
    xScale.nice()
  if ((nice === true || nice === 'y') && isScaleContinuous(yScale))
    yScale.nice()

  const bind = useGesture({
    onDrag: (state) => {
      if (!onDrag || state.pinching) return
      const { delta } = state
      handlePan(xScaleNotNice, yScaleNotNice, { delta, cb: onDrag })
    },
    onPinch: (state) => {
      if (!onPinch) return
      // TODO: fix pinch speed on mobile
      const zoom = -state.velocity[0] / 50

      // TODO: find user mouse
      const mouse = tuple((left + right) / 2, (top + bottom) / 2)

      handleZoom(xScaleNotNice, yScaleNotNice, { zoom, mouse, cb: onPinch })
    },
    onWheel: (state) => {
      if (!onWheel || state.pinching) return
      const delta: Vector2 = tuple(-state.delta[0], -state.delta[1])
      handlePan(xScaleNotNice, yScaleNotNice, { delta, cb: onWheel })
    },
  })

  return (
    <CartesianContext.Provider value={{ xScale, yScale, colorScale }}>
      {children}
      <rect
        {...bind()}
        x={left}
        y={top}
        width={width}
        height={height}
        fill="transparent"
      />
    </CartesianContext.Provider>
  )
}
