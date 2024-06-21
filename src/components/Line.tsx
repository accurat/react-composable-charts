import React from 'react'
import { Lines, LinesProps } from './Lines'

export interface LineProps<T> extends Omit<LinesProps<T>, 'data'> {
  data: T[]
}

export function Line<T>({ data, ...props }: LineProps<T>) {
  return <Lines data={[data]} {...props} />
}
