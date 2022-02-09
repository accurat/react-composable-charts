import { useRef } from 'react'

export const useConst = <T>(initial: T) => useRef(initial).current
