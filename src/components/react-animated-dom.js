import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { select } from 'd3-selection'
import 'd3-transition'
import _ from 'lodash-es'
import { DEFAULT_EASE } from '../internal/constants'

/* eslint-disable @typescript-eslint/no-unused-vars */
const fail = (message) => {
  throw new Error(`[${pkg.name}]: ${message}`)
}

function useFirstRender() {
  const count = useRef(0)
  useEffect(() => {
    count.current += 1
  }, [])
  return count.current === 0
}

function forEach(obj, fn) {
  Object.entries(obj).forEach(([k, v], i) => fn(k, v, i, obj))
}

function mapKeys(obj, fn) {
  const entries = Object.entries(obj)
  const mapped = entries.map(([k, v]) => [fn(k), v])
  return Object.fromEntries(mapped)
}

function mapValues(obj, fn) {
  const entries = Object.entries(obj)
  const mapped = entries.map(([k, v]) => [k, fn(v)])
  return Object.fromEntries(mapped)
}

function partitionByKey(obj, fn) {
  const entries = Object.entries(obj)
  const [lEntries, rEntries] = entries.reduce(
    ([l, r], entry) => {
      ;(fn(entry[0]) ? l : r).push(entry)
      return [l, r]
    },
    [[], []]
  )

  return [Object.fromEntries(lEntries), Object.fromEntries(rEntries)]
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

function splitProps(obj) {
  const isAttribute = (key) => !parseAttributeName(key).startsWith('on-')
  const [unparsedAttributes, unparsedEvents] = partitionByKey(obj, isAttribute)
  return [
    mapKeys(unparsedAttributes, parseAttributeName),
    mapKeys(unparsedEvents, parseEventName),
  ]
}

const ANIMATION_STATES = {
  ENTER: 'enter',
  EXIT: 'exit',
  DEFAULT: 'default',
}

function extract(obj, state) {
  return mapValues(obj, (value) =>
    typeof value === 'object'
      ? value[state] ?? value[ANIMATION_STATES.DEFAULT]
      : value
  )
}

function applyAttributes(selection, attributes) {
  forEach(attributes, (attr, value) => {
    selection.attr(attr, value)
  })
}
function applyTween(selection, tweens) {
  forEach(tweens, (attr, value) => {
    selection.attrTween(attr, value)
  })
}

function applyStyle(selection, style) {
  forEach(style, (name, value) => {
    selection.style(name, value)
  })
}
function applyStyleTweens(selection, style) {
  forEach(style, (name, value) => {
    selection.styleTween(name, value)
  })
}

/** transition-animation state */
const t2aState = (transitionState) =>
  ({
    entering: ANIMATION_STATES.ENTER,
    entered: ANIMATION_STATES.DEFAULT,
    exiting: ANIMATION_STATES.EXIT,
    exited: ANIMATION_STATES.EXIT,
  }[transitionState])

const AnimatedGroup = ({ tag, ...props }) => (
  <TransitionGroup component={tag} {...props} />
)

const Animated = ({
  duration = 500,
  delay = 0,
  in: inProp,
  onExited,
  ...props
}) => (
  <Transition timeout={duration + delay} in={inProp} onExited={onExited}>
    {(state) => (
      <AnimatedElement
        state={t2aState(state)}
        {...props}
        duration={duration}
        delay={delay}
      />
    )}
  </Transition>
)

const AnimatedElement = ({
  state,
  tag: Tag,
  duration,
  delay,
  easing = DEFAULT_EASE,
  disableAnimation = false,
  children,
  className = '',
  style: unparsedStyle = {},
  tweens: unparsedTweens = {},
  styleTweens: unparsedStyleTweens = {},
  ...props
}) => {
  const ref = useRef()
  const isFirstRender = useFirstRender()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const createTransition = (sel) =>
      sel.transition().duration(duration).delay(delay).ease(easing)

    const animate = () => {
      const [attrs] = splitProps(props)
      const defaultAttrs = extract(attrs, ANIMATION_STATES.DEFAULT)
      const enterAttrs = extract(attrs, ANIMATION_STATES.ENTER)
      const exitAttrs = extract(attrs, ANIMATION_STATES.EXIT)

      const style = mapKeys(unparsedStyle, parseAttributeName)
      const tweens = mapKeys(unparsedTweens, parseAttributeName)
      const styleTweens = mapKeys(unparsedStyleTweens, parseAttributeName)

      const defaultStyle = extract(style, ANIMATION_STATES.DEFAULT)
      const enterStyle = extract(style, ANIMATION_STATES.ENTER)
      const exitStyle = extract(style, ANIMATION_STATES.EXIT)

      const noTransition = select(el)
      const transition = disableAnimation
        ? noTransition
        : createTransition(select(el))

      if (state === ANIMATION_STATES.ENTER) {
        applyAttributes(noTransition, enterAttrs)
        applyStyle(noTransition, enterStyle)

        applyAttributes(transition, defaultAttrs)
        applyStyle(transition, defaultStyle)
        applyTween(transition, tweens)
        applyStyleTweens(transition, styleTweens)
      } else if (state === ANIMATION_STATES.DEFAULT) {
        // On first mount, TransitionGroup passes entered instead of entering
        // Check if it is first rendere to fix initial attributes values
        if (isFirstRender) {
          applyAttributes(noTransition, enterAttrs)
          applyStyle(noTransition, enterStyle)
        }
        applyAttributes(transition, defaultAttrs)
        applyStyle(transition, defaultStyle)
        applyTween(transition, tweens)
        applyStyleTweens(transition, styleTweens)
      } else if (state === ANIMATION_STATES.EXIT) {
        applyAttributes(transition, exitAttrs)
        applyStyle(transition, exitStyle)
        applyTween(transition, tweens)
        applyStyleTweens(transition, styleTweens)
      } else {
        fail(`Unknown animation state: ${state}`)
      }
    }

    animate()
  }, [
    isFirstRender,
    disableAnimation,
    state,
    delay,
    props,
    duration,
    easing,
    unparsedTweens,
    unparsedStyle,
    unparsedStyleTweens,
  ])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

const tags = ['div']

const buildComponent = (Comp, fixedProps) => (props) =>
  <Comp {...props} {...fixedProps} />

export const animatedGroup = _.zipObject(
  tags,
  tags.map((tag) => buildComponent(AnimatedGroup, { tag }))
)

export const animated = _.zipObject(
  tags,
  tags.map((tag) => buildComponent(Animated, { tag }))
)
