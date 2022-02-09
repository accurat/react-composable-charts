import React from 'react'
import { ChartContext } from './internal'

export interface ChartProps {
  width: number
  height: number
  children?: React.ReactNode
  top?: number
  left?: number
}

export function Chart({
  width,
  height,
  children,
  top = 0,
  left = 0,
}: ChartProps) {
  return (
    <ChartContext.Provider
      value={{
        width,
        height,
        top,
        left,
        right: width + left,
        bottom: height + top,
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}
