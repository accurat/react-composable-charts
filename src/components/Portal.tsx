import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
export interface PortalProps {
  children: ReactNode
  container: Element
}

export function Portal({ children, container }: PortalProps) {
  return createPortal(children, container)
}
