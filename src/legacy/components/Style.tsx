import { mapValues, partition, pick } from 'lodash-es'
import { ScaleOrdinal, tuple } from '../../lib/types'
import { useCascadingStyle } from '../../components/Style'
import { CommonStyleGetter, CommonStyleProps, StyleProps } from '../lib/types'

function splitStyleProps<T>(props: StyleProps<T>) {
  const keys = Object.keys(props) as (keyof StyleProps<T>)[]
  const existingKeys = keys.filter((k) => typeof k !== 'undefined')
  const [fnKeys, valKeys] = partition(
    existingKeys,
    (key) => typeof props[key] === 'function'
  )
  return tuple(
    pick(props, valKeys) as CommonStyleProps,
    pick(props, fnKeys) as CommonStyleGetter<T>
  )
}

/** @deprecated */
export function useComputableStyle<T>(
  curr: StyleProps<T>,
  colorScale?: ScaleOrdinal
) {
  const [props, getters] = splitStyleProps(curr)
  const style = useCascadingStyle(props)

  const getterKeys = Object.keys(getters) as (keyof typeof getters)[]
  if (getterKeys.length > 0 && !colorScale) {
    throw new Error(`Define a color scale`)
  }

  return {
    ...style,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...mapValues(getters, (fn) => (d: T) => colorScale!(fn!(d))),
  }
}
