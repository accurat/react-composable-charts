import { ReactNode } from 'react'

export const Code = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      background: '#eceef0',
      padding: '0.2rem 0.4rem',
      borderRadius: '3px',
    }}
  >
    {children}
  </code>
)
