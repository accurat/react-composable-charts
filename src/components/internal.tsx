import React, { Context, ReactNode, createContext, useContext } from 'react'
import {
  AnimationIteratees,
  CartesianScale,
  ScaleOrdinal,
  tuple,
} from '../lib/types'
import { SvgAttributes } from '../lib/types.svg'

type ContextConsumer<T> = (props: {
  children: (value: T) => ReactNode
}) => JSX.Element

function buildContext<T>(): [
  Context<T | null>,
  () => T | null,
  ContextConsumer<T | null>
]
function buildContext<T>(
  dependency: string
): [Context<T>, () => T, ContextConsumer<T>]
function buildContext<T>(dependency?: string) {
  const CurrentContext = createContext<T | null>(null)
  const useHook = () => {
    const value = useContext(CurrentContext)
    if (value === null && dependency !== undefined)
      throw new Error(`${dependency} missing`)
    return value
  }

  const Consumer: ContextConsumer<T | null> = ({ children }) => {
    const value = useHook()
    return <>{children(value)}</>
  }
  return tuple(CurrentContext, useHook, Consumer)
}

export const [ChartContext, useChartContext, ChartConsumer] =
  buildContext<{
    width: number
    height: number
    top: number
    left: number
    right: number
    bottom: number
  }>('Chart')

export const [GridContext, useGridContext, GridConsumer] =
  buildContext<{
    xAxes: number
    yAxes: number
    xTicks: Array<number | string | Date>
    yTicks: Array<number | string | Date>
  }>('Grid')

export const [StyleContext, useStyleContext, StyleConsumer] =
  buildContext<SvgAttributes>()

export const [AnimationContext, useAnimationContext, AnimationConsumer] =
  buildContext<AnimationIteratees<any>>()

export const [CartesianContext, useCartesianContext, CartesianConsumer] =
  buildContext<{
    xScale: CartesianScale
    yScale: CartesianScale
    colorScale?: ScaleOrdinal
  }>('Cartesian')

export type Mouse = {
  x: number
  y: number
}

export const [MouseContext, useMouseContext, MouseConsumer] = buildContext<
  Mouse | undefined
>("Interaction missing (use 'interactive' prop)")
