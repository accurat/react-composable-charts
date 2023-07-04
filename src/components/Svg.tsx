import React, { CSSProperties, SVGProps, useRef } from 'react'
import { useForceRender } from '../internal/hooks/useForceRender'
import { TooltipParentProvider } from './Tooltip'

interface SvgProps extends SVGProps<SVGSVGElement> {
  wrapperStyle?: CSSProperties
}

export function Svg({ wrapperStyle = {}, ...props }: SvgProps) {
  useForceRender()
  const ref = useRef<HTMLDivElement>(null)
  const tooltipParent = ref.current

  return (
    <div ref={ref} style={{ ...wrapperStyle, position: 'relative' }}>
      {tooltipParent && (
        <TooltipParentProvider value={tooltipParent}>
          <svg {...props} />
        </TooltipParentProvider>
      )}
    </div>
  )
}
