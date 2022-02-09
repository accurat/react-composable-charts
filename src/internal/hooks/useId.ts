import { useConst } from './useConst'

export const useId = () => useConst(Math.random().toString(16).split('.')[1])
