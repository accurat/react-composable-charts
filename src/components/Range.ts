import { clamp as lodashClamp } from 'lodash-es'

const clampValue = (value: number, [min, max]: [number, number]) => {
  if (min > max) [min, max] = [max, min]
  return lodashClamp(value, min, max)
}

const applyTransform = (range: number[], transform: number[]) => {
  const length = Math.abs(range[0] - range[1])
  const n0 = transform[0] * length + range[0]
  const n1 = transform[1] * length + range[1]
  return [n0, n1]
}

const inferTransform = (prev: number[], curr: number[]) => {
  const length = Math.abs(prev[0] - prev[1])
  const t0 = (curr[0] - prev[0]) / length
  const t1 = (curr[1] - prev[1]) / length
  return [t0, t1]
}

export const Range = {
  clampValue,
  inferTransform,
  applyTransform,
}
