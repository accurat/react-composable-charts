import { Merge } from '../../lib/types'

/** @deprecated */
export interface CommonStyleProps {
  stroke?: string
  strokeWidth?: number
  fill?: string
  opacity?: number
  fillOpacity?: number
  rx?: number

  strokeDasharray?: string | number
  strokeDashoffset?: string | number
  strokeLinecap?: 'butt' | 'round' | 'square'
  mask?: string

  fontFamily?: string
  fontSize?: string | number
  fontWeight?: string | number
  dominantBaseline?: 'auto' | 'middle' | 'hanging'
  textAnchor?: 'start' | 'middle' | 'end'

  transform?: string
}

/** @deprecated */
export interface CommonStyleGetter<T> {
  stroke?: (datum: T) => string
  fill?: (datum: T) => string
}

/** @deprecated */
export type StyleProps<T> = Merge<CommonStyleProps, CommonStyleGetter<T>>
