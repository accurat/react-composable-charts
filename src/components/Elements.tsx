import React from 'react'
import {
  AnimationProps,
  NativeEventHandlers,
  SvgAttributesGetters,
  tuple,
} from '../lib/types'
import { AnimatedDataset } from './AnimatedDataset'
import { useSanitizedCascadingAnimation } from './Animation'
import { partition, pick } from 'lodash-es'
import { useCascadingStyle } from './Style'

const splitSvgProps = <T,>(
  props: SvgAttributesGetters<T> & NativeEventHandlers<T>
): [SvgAttributesGetters<T>, NativeEventHandlers<T>] => {
  const keys = Object.keys(props) as (keyof typeof props)[]
  const existingKeys = keys.filter((k) => typeof k !== 'undefined')
  const [fnKeys, valKeys] = partition(
    existingKeys,
    (key) => key.match(/^on[A-Z]/) !== null
  )
  return tuple(
    pick(props, valKeys) as SvgAttributesGetters<T>,
    pick(props, fnKeys) as NativeEventHandlers<T>
  )
}

export interface ElementsProps<T>
  extends AnimationProps<T>,
    SvgAttributesGetters<T>,
    NativeEventHandlers<T> {
  data: T[]
  tag: string
}

export function Elements<T>({
  tag,
  data,
  dataKey,
  delay,
  duration,
  enter,
  easing,
  ...props
}: ElementsProps<T>) {
  const animation = useSanitizedCascadingAnimation({ delay, duration, easing })
  const [svgProps, events] = splitSvgProps(props)
  const attributes = { ...useCascadingStyle({}), ...svgProps }

  return (
    <AnimatedDataset
      tag={tag}
      dataset={data}
      keyFn={(d: T, i: number) => dataKey?.(d, i) ?? i}
      attrs={attributes}
      events={events}
      init={enter}
      {...(animation as any)}
    />
  )
}
