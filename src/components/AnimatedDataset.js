/* eslint-disable no-nested-ternary, no-underscore-dangle */

import React from 'react'
import { select } from 'd3-selection'
import 'd3-transition'
import { DEFAULT_EASE } from '../internal/constants'

function mapKeys(obj, fn) {
  const entries = Object.entries(obj)
  const mapped = entries.map(([k, v]) => [fn(k), v])
  return Object.fromEntries(mapped)
}

function parseAttributeName(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase()
}

function parseEventName(str) {
  return str.replace(/on(.*)/, '$1').toLowerCase()
}

function hasOwnProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property)
}

function fallback(...fns) {
  return function (...args) {
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i]

      const value = typeof fn === 'function' ? fn(...args) : fn

      const isValidValue =
        value !== undefined &&
        value !== null &&
        (typeof value !== 'number' || !isNaN(value))

      if (isValidValue) return value
    }
    return undefined
  }
}

export function AnimatedDataset({
  dataset,
  attrs: unparsedAttrs,
  tag = 'rect',
  init: unparsedInit = {},
  events: unparsedEvents = {},
  keyFn = (d) => d,
  duration = 500,
  delay = 0,
  tweens: unparsedTweens = {},
  disableAnimation = false,
  easing = DEFAULT_EASE,
}) {
  const ref = React.createRef()
  const refOldAttrs = React.useRef()

  React.useLayoutEffect(() => {
    if (!ref.current) return

    const attrs = mapKeys(unparsedAttrs, parseAttributeName)
    const init = mapKeys(unparsedInit, parseAttributeName)
    const events = mapKeys(unparsedEvents, parseEventName)
    const tweens = mapKeys(unparsedTweens, parseAttributeName)

    const attrsList = Object.keys(attrs).filter((a) => a !== 'text')
    const tweensList = Object.keys(tweens).filter((a) => a !== 'text')
    const eventsList = Object.keys(events)
    const oldAttrs = refOldAttrs.current || {}
    const oldAttrsList = Object.keys(oldAttrs).filter((a) => a !== 'text')

    const animate = () => {
      select(ref.current)
        .selectAll(tag)
        .data(dataset, keyFn)
        .join(
          (enter) =>
            enter
              .append(tag)
              .text(attrs.text)
              .call((sel) => {
                attrsList.forEach((a) => {
                  sel.attr(a, fallback(init[a], oldAttrs[a], attrs[a]))
                })
              })
              .call((sel) => {
                eventsList.forEach((event) => {
                  sel.on(event, events[event])
                })
              })
              .call((sel) => {
                const tran = disableAnimation
                  ? sel
                  : sel
                      .transition()
                      .ease(easing)
                      .delay(delay)
                      .duration(duration)

                attrsList.forEach((a) => {
                  tran.attr(a, attrs[a])
                })

                tweensList.forEach((a) => {
                  tran.attrTween(a, tweens[a])
                })

                tran.textTween(tweens.text)
              }),
          (update) =>
            update.text(attrs.text).call((sel) => {
              const tran = disableAnimation
                ? sel
                : sel.transition().ease(easing).delay(delay).duration(duration)

              attrsList.forEach((a) => {
                tran.attr(a, attrs[a])
              })

              tweensList.forEach((a) => {
                tran.attrTween(a, tweens[a])
              })

              tran.textTween(tweens.text)
            }),
          (exit) =>
            exit.call((sel) => {
              const tran = disableAnimation
                ? sel
                : sel.transition().ease(easing).delay(delay).duration(duration)

              oldAttrsList.forEach((a) => {
                tran.attr(a, fallback(init[a], oldAttrs[a]))
              })

              tweensList.forEach((a) => {
                tran.attrTween(a, tweens[a])
              })

              tran.textTween(tweens.text)

              tran.remove()
            })
        )
      refOldAttrs.current = attrs
    }

    if (disableAnimation) {
      animate()
    } else {
      requestAnimationFrame(animate)
    }
  }, [
    unparsedTweens,
    easing,
    dataset,
    unparsedInit,
    keyFn,
    ref,
    tag,
    unparsedAttrs,
    duration,
    disableAnimation,
    unparsedEvents,
    delay,
  ])

  return React.createElement('g', { ref })
}
