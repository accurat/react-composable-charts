import { useEffect, useState } from 'react'

export function useForceRender() {
  const [rendered, setRendered] = useState(false)
  useEffect(() => {
    if (!rendered) setRendered(true)
  }, [rendered])
}
