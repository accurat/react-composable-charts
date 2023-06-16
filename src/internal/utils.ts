import { isNil } from 'lodash-es'

export const xand = (a: boolean, b: boolean) => a === b
export const xor = (a: boolean, b: boolean) => !xand(a, b)

export const removeEmptyKeys = <T extends object>(o: T): T =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => !isNil(v))) as T
