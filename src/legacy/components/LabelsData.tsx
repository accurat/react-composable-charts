import React from 'react'
import {
  DataAccessor,
  Getter,
  KeyAccessor,
  AnimationProps,
} from '../../lib/types'
import { AnimatedDataset } from '../../components/AnimatedDataset'
import { useSanitizedCascadingAnimation } from '../../components/Animation'
import { useCartesianContext } from '../../components/internal'
import { useComputableStyle } from './Style'
import { StyleProps } from '../lib/types'
import { buildComputePos } from '../lib/scales'

/** @deprecated */
export interface LabelsDataProps<T> extends StyleProps<T>, AnimationProps<T> {
  data: T[]
  dataX?: DataAccessor<T>
  dataY?: DataAccessor<T>
  dataKey?: KeyAccessor<T>

  positionX?: Getter<T, number>
  positionY?: Getter<T, number>

  offsetX?: Getter<T, number>
  offsetY?: Getter<T, number>

  text: DataAccessor<T>
}

/** @deprecated since v0.2.0. Use `Texts` instead. Will be removed in v1.0.0 */
export function LabelsData<T>({
  data,
  dataX,
  dataY,
  dataKey,
  positionX,
  positionY,
  offsetX,
  offsetY,
  text,

  enter = {},
  delay,
  duration,
  ...props
}: LabelsDataProps<T>) {
  const { xScale, yScale, colorScale } = useCartesianContext()
  const style = useComputableStyle(props, colorScale)
  const animation = useSanitizedCascadingAnimation({ delay, duration })

  const computeXPos = buildComputePos(dataX, positionX, offsetX, xScale, 'X')
  const computeYPos = buildComputePos(dataY, positionY, offsetY, yScale, 'Y')

  return (
    <AnimatedDataset
      tag="text"
      dataset={data}
      attrs={{
        x: (d: T) => computeXPos(d, 'center'),
        y: (d: T) => computeYPos(d, 'center'),
        text,
        ...style,
      }}
      init={enter}
      keyFn={(d: T, i: number) => dataKey?.(d, i) ?? i}
      {...(animation as any)}
    />
  )
}
