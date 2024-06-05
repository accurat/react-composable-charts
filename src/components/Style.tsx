import React from 'react'
import { StyleContext, useStyleContext } from './internal'
import { SvgAttributes } from '../lib/types.svg'

interface Props extends SvgAttributes {
  children?: React.ReactNode
}

export function useCascadingStyle(curr: SvgAttributes): SvgAttributes {
  return { ...(useStyleContext() ?? {}), ...curr }
}

export function Style({ children, ...props }: Props) {
  const style = useCascadingStyle(props)
  return <StyleContext.Provider value={style}>{children}</StyleContext.Provider>
}
