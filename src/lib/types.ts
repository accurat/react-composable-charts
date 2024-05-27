import { EventHandler, SyntheticEvent } from 'react'
import { EventsHandlers, SvgAttributes } from './types.svg'

export const tuple = <Args extends any[]>(...args: Args) => args
export const strTuple = <Args extends string[]>(...args: Args) => args
export const isUndefinedTuple = (
  x: [any, any]
): x is [undefined, undefined] => {
  return x.length === 2 && x[0] === undefined && x[1] === undefined
}
export const isNotNil = <T>(t: T | undefined | null): t is T => {
  return t !== null && t !== undefined
}
/**
 * Type used to prettify complex type
 */
type Id<T> = {
  [K in keyof T]: T[K]
}

type Get<Key, From> = Key extends keyof From ? From[Key] : never

/**
 * Picks undefined keys
 */
type UndefinedProperties<T> = {
  [P in keyof T]-?: undefined extends T[P] ? P : never
}[keyof T]

/**
 * Turn undefined keys as optional
 */
type ToOptional<T> = Id<
  Partial<Pick<T, UndefinedProperties<T>>> & Omit<T, UndefinedProperties<T>>
>

/**
 * Merge objects
 */
type Merge<A, B> = ToOptional<
  {
    [K in keyof A | keyof B]: Get<K, A> | Get<K, B>
  }
>

export type Component<Props> = (props: Props) => JSX.Element

// TODO: deprecate
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

// TODO: deprecate
export interface CommonStyleGetter<T> {
  stroke?: (datum: T) => string
  fill?: (datum: T) => string
}

// TODO: deprecate
export type StyleProps<T> = Merge<CommonStyleProps, CommonStyleGetter<T>>

export type SvgAttributesGetters<T> = {
  [K in keyof SvgAttributes]?: Getter<T, NonNullable<SvgAttributes[K]>>
}

type NativeEvent<T> = T extends EventHandler<infer V>
  ? V extends SyntheticEvent<any, infer E>
    ? E
    : never
  : never

export type NativeEventHandlers<T> = {
  [Event in keyof EventsHandlers]?: (
    event: NativeEvent<Required<EventsHandlers>[Event]>,
    datum: T
  ) => void
}

export type Iteratee<T, U> = (t: T, i: number) => U
export type DefaultedIteratee<T, U> = U | Iteratee<T, U>

export function wrapIteratee<A, B, C>(
  iteratee: Iteratee<B, C>,
  map: Accessor<A, B>
): Iteratee<A, C> {
  return (d: A, i: number) => iteratee(map(d), i)
}

export interface CommonAnimationProps {
  delay: number
  duration: number
  easing: (time: number) => number
}

export interface AnimationIteratees<T> {
  delay?: DefaultedIteratee<T, number>
  duration?: DefaultedIteratee<T, number>
  easing?: (time: number) => number
}
export interface AnimationProps<T> extends AnimationIteratees<T> {
  dataKey?: KeyAccessor<T>

  enter?: CommonStyleProps
  // exit?: CommonStyleProps;
}

export type Accessor<Datum, Value> = (t: Datum) => Value
export type Getter<Datum, Value> = Value | Accessor<Datum, Value>

export function isAccessor<T, V>(
  getter: Getter<T, V>
): getter is Accessor<T, V> {
  return typeof getter === 'function'
}

export function toAccessor<T, V>(getter: Getter<T, V>): Accessor<T, V> {
  return isAccessor(getter) ? getter : () => getter
}

export type DataValue = string | number | Date
export type DataAccessor<T> = Accessor<T, DataValue>
export type DataGetter<T> = Getter<T, DataValue>

export type KeyAccessor<T> = (t: T, index: number) => DataValue
export type Filter<T> = (value: T, index: number, array: T[]) => boolean

export type ScaleContinuous = ((value: number | Date) => number) & {
  invert: (value: number) => number | Date
  nice(): ScaleContinuous
  copy(): ScaleContinuous
  ticks(count?: number): number[] | Date[]
  range(): number[]
}

export type ScaleCategorical = ((value: string) => number) & {
  copy(): ScaleCategorical
  bandwidth(): number
  domain(): string[]
  range(): number[]
}

export type ScaleOrdinal = (value: string) => string

export const isScaleContinuous = (v: any): v is ScaleContinuous => {
  return (
    typeof v === 'function' &&
    typeof v.invert === 'function' &&
    typeof v.nice === 'function' &&
    typeof v.copy === 'function'
  )
}
export const isScaleCategorical = (v: any): v is ScaleCategorical => {
  return (
    typeof v === 'function' &&
    typeof v.copy === 'function' &&
    typeof v.bandwidth === 'function'
  )
}

export type CartesianScale = ScaleContinuous | ScaleCategorical
