import React from 'react'
import { ClipRect } from './ClipRect'
import { useChartContext } from './internal'

export interface ClipChartProps {
  children?: React.ReactNode
}

export function ClipChart({ children }: ClipChartProps) {
  return <ClipRect {...useChartContext()}>{children}</ClipRect>
}
