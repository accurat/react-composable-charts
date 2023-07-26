import { Context, createContext, useContext } from 'react'
import {
  AnimationIteratees,
  CartesianScale,
  CommonStyleProps,
  ScaleOrdinal,
  tuple,
} from '../lib/types'

function buildContext<T>(): [Context<T | null>, () => T | null]
function buildContext<T>(dependency: string): [Context<T>, () => T]
function buildContext<T>(dependency?: string) {
  const CurrentContext = createContext<T | null>(null)
  const useHook = () => {
    const value = useContext(CurrentContext)
    if (value === null && dependency !== undefined)
      throw new Error(`${dependency} missing`)
    return value
  }

  return tuple(CurrentContext, useHook)
}

export const [ChartContext, useChartContext] =
  buildContext<{
    width: number
    height: number
    top: number
    left: number
    right: number
    bottom: number
  }>('Chart')

export const [GridContext, useGridContext] =
  buildContext<{
    xAxes: number
    yAxes: number
    xTicks: Array<number | string | Date>
    yTicks: Array<number | string | Date>
  }>('Grid')

export const [StyleContext, useStyleContext] = buildContext<CommonStyleProps>()

export const [AnimationContext, useAnimationContext] =
  buildContext<AnimationIteratees<any>>()

export const [CartesianContext, useCartesianContext] =
  buildContext<{
    xScale: CartesianScale
    yScale: CartesianScale
    colorScale?: ScaleOrdinal
  }>('Cartesian')

export type Mouse = {
  x: number
  y: number
}

export const [MouseContext, useMouseContext] = buildContext<Mouse | undefined>(
  "Interaction missing (use 'interactive' prop)"
)
