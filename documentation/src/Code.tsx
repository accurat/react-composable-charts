import { ReactNode } from 'react'

export const Code = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      background: '#eceef0',
      padding: '0.1rem 0.3rem',
      borderRadius: '3px',
    }}
  >
    {children}
  </code>
)
