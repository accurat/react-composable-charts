import React from 'react'
import { useId } from '../internal/hooks/useId'

export interface ClipRectProps {
  top?: number
  left?: number
  width: number
  height: number
  children?: React.ReactNode
}

export function ClipRect({
  width,
  height,
  top = 0,
  left = 0,
  children,
}: ClipRectProps) {
  const id = useId()

  return (
    <>
      <defs>
        <clipPath id={id}>
          <rect x={left} y={top} width={width} height={height} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id})`}>{children}</g>
    </>
  )
}
