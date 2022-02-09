import React, { SVGProps } from 'react'
import { Component, strTuple } from '../lib/types'
import { AnimatedDataset } from './AnimatedDataset'
import { useCascadingAnimation } from './Animation'
import { useCascadingStyle } from './Style'

const tags = strTuple(
  'rect',
  'line',
  'circle',
  'path',
  'text',
  'polygon',
  'tspan',
  'ellipse',
  'g'
)
type Tag = typeof tags[number]
export type StyledSvgElements = {
  [element in Tag]: Component<SVGProps<element>>
}

export const element = Object.fromEntries(
  tags.map((Tag) => [
    Tag,
    // TODO: add forward ref
    ({ duration, delay, easing, tweens, ...props }: any) => (
      <AnimatedDataset
        tag={Tag}
        dataset={[{}]}
        keyFn={((_: any, i: number) => i) as any}
        attrs={useCascadingStyle(props)}
        tweens={tweens}
        {...(useCascadingAnimation({ duration, delay, easing }) as any)}
      />
    ),
  ])
) as StyledSvgElements
