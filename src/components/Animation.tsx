import { mapValues } from 'lodash-es'
import React from 'react'
import { DEFAULT_EASE } from '../internal/constants'
import {
  AnimationIteratees,
  CommonAnimationProps,
  wrapIteratee,
} from '../lib/types'
import { removeEmptyKeys } from '../internal/utils'
import { AnimationContext, useAnimationContext } from './internal'

interface Props extends Partial<CommonAnimationProps> {
  children: React.ReactNode
}

function sanitizeAnimationOptions<T>({
  easing,
  ...obj
}: AnimationIteratees<T>): AnimationIteratees<{ datum: T }> {
  const sanitized = mapValues(obj, (value) =>
    typeof value === 'function'
      ? wrapIteratee(value, (d: { datum: T }) => d.datum)
      : value
  )
  return { ...sanitized, easing }
}

export function useCascadingAnimation<T extends AnimationIteratees<any>>(
  curr: T = {} as T
): T {
  const animation = {
    ...(useAnimationContext() ?? {
      delay: 0,
      duration: 500,
      easing: DEFAULT_EASE,
    }),
    ...removeEmptyKeys(curr),
  }
  return animation
}

export function useSanitizedCascadingAnimation<T>(anim: AnimationIteratees<T>) {
  return sanitizeAnimationOptions(useCascadingAnimation(anim))
}

export function Animation({ children, ...animationProps }: Props) {
  const animation = useCascadingAnimation(animationProps)

  return (
    <AnimationContext.Provider value={animation}>
      {children}
    </AnimationContext.Provider>
  )
}
