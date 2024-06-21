import React from 'react'
import { Areas, AreasProps } from './Areas'

export interface AreaProps<T> extends Omit<AreasProps<T>, 'data'> {
  data: T[]
}

export function Area<T>({ data, ...props }: AreaProps<T>) {
  return <Areas data={[data]} {...props} />
}
