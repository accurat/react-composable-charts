import { ReactNode } from 'react'

export const Deprecated = ({ description }: { description?: ReactNode }) => {
  return (
    <span style={{ color: 'red', fontStyle: 'italic', fontSize: '0.857em' }}>
      @deprecated{' '}
      <span style={{ fontWeight: 'normal', fontStyle: 'normal' }}>
        {description}
      </span>
    </span>
  )
}
