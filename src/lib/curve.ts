import {
  curveBumpX,
  curveBumpY,
  curveCatmullRom,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3-shape'

export type CurveType =
  | 'line'
  | 'curve'
  | 'monotone-x'
  | 'monotone-y'
  | 'step'
  | 'step-after'
  | 'step-before'
  | 'bump-x'
  | 'bump-y'

// prettier-ignore
export function buildCurveFn(type: CurveType) {
  switch (type) {
  case 'line':        return curveLinear
  case 'curve':       return curveCatmullRom.alpha(1)
  case 'monotone-x':  return curveMonotoneX
  case 'monotone-y':  return curveMonotoneY
  case 'step':        return curveStep
  case 'step-before': return curveStepBefore
  case 'step-after':  return curveStepAfter
  case 'bump-x':      return curveBumpX
  case 'bump-y':      return curveBumpY
  default: throw new Error(`Unknown curve type ${type}`)
  }
}
