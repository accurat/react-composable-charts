import React, {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
} from 'react'
import { Portal } from './Portal'

const TooltipParentContext = createContext<HTMLDivElement | null>(null)
export const TooltipParentProvider = TooltipParentContext.Provider

export function useTooltipParent() {
  const tooltipParent = useContext(TooltipParentContext)
  if (!tooltipParent) throw Error('use Svg component')
  return tooltipParent
}
export type TooltipAnchor = 'start' | 'center' | 'end'
export interface TooltipProps {
  x: number
  y: number
  horizontalAnchor?: TooltipAnchor
  verticalAnchor?: TooltipAnchor
  children?: ReactNode
  style?: CSSProperties
  horizontalSpacing?: number
  verticalSpacing?: number
}

const ANCHOR_OFFSET: Record<TooltipAnchor, string> = {
  start: '',
  center: '- 50%',
  end: '- 100%',
}

export function Tooltip({
  x,
  y,
  children = null,
  style = {},
  horizontalAnchor = 'start',
  verticalAnchor = 'start',
  horizontalSpacing = 0,
  verticalSpacing = 0,
}: TooltipProps) {
  const parent = useTooltipParent()

  return (
    <Portal container={parent}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate(${x}px, ${y}px)`,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div
          style={{
            transition: 'transform 0.15s',
            transform: `translate(
            calc(${horizontalSpacing}px ${ANCHOR_OFFSET[horizontalAnchor]}),
            calc(${verticalSpacing}px ${ANCHOR_OFFSET[verticalAnchor]})
          )`,
            ...style,
          }}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}
