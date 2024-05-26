import React from 'react'

export type Booleanish = boolean | 'true' | 'false'

/**
 * Common SVG properties
 *
 * this is a copy of React's SVGAttributes
 */
export type SvgAttributes = {
  // Attributes which also defined in HTMLAttributes
  // See comment in SVGDOMPropertyConfig.js
  color?: string | undefined
  height?: number | string | undefined
  id?: string | undefined
  lang?: string | undefined
  max?: number | string | undefined
  media?: string | undefined
  method?: string | undefined
  min?: number | string | undefined
  name?: string | undefined
  target?: string | undefined
  type?: string | undefined
  width?: number | string | undefined

  // Other HTML properties supported by SVG elements in browsers
  role?: React.AriaRole | undefined
  tabIndex?: number | undefined
  crossOrigin?: 'anonymous' | 'use-credentials' | '' | undefined

  // SVG Specific attributes
  accentHeight?: number | string | undefined
  accumulate?: 'none' | 'sum' | undefined
  additive?: 'replace' | 'sum' | undefined
  alignmentBaseline?:
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit'
    | undefined
  allowReorder?: 'no' | 'yes' | undefined
  alphabetic?: number | string | undefined
  amplitude?: number | string | undefined
  arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated' | undefined
  ascent?: number | string | undefined
  attributeName?: string | undefined
  attributeType?: string | undefined
  autoReverse?: Booleanish | undefined
  azimuth?: number | string | undefined
  baseFrequency?: number | string | undefined
  baselineShift?: number | string | undefined
  baseProfile?: number | string | undefined
  bbox?: number | string | undefined
  begin?: number | string | undefined
  bias?: number | string | undefined
  by?: number | string | undefined
  calcMode?: number | string | undefined
  capHeight?: number | string | undefined
  clip?: number | string | undefined
  clipPath?: string | undefined
  clipPathUnits?: number | string | undefined
  clipRule?: number | string | undefined
  colorInterpolation?: number | string | undefined
  colorInterpolationFilters?:
    | 'auto'
    | 'sRGB'
    | 'linearRGB'
    | 'inherit'
    | undefined
  colorProfile?: number | string | undefined
  colorRendering?: number | string | undefined
  contentScriptType?: number | string | undefined
  contentStyleType?: number | string | undefined
  cursor?: number | string | undefined
  cx?: number | string | undefined
  cy?: number | string | undefined
  d?: string | undefined
  decelerate?: number | string | undefined
  descent?: number | string | undefined
  diffuseConstant?: number | string | undefined
  direction?: number | string | undefined
  display?: number | string | undefined
  divisor?: number | string | undefined
  dominantBaseline?: number | string | undefined
  dur?: number | string | undefined
  dx?: number | string | undefined
  dy?: number | string | undefined
  edgeMode?: number | string | undefined
  elevation?: number | string | undefined
  enableBackground?: number | string | undefined
  end?: number | string | undefined
  exponent?: number | string | undefined
  externalResourcesRequired?: Booleanish | undefined
  fill?: string | undefined
  fillOpacity?: number | string | undefined
  fillRule?: 'nonzero' | 'evenodd' | 'inherit' | undefined
  filter?: string | undefined
  filterRes?: number | string | undefined
  filterUnits?: number | string | undefined
  floodColor?: number | string | undefined
  floodOpacity?: number | string | undefined
  focusable?: Booleanish | 'auto' | undefined
  fontFamily?: string | undefined
  fontSize?: number | string | undefined
  fontSizeAdjust?: number | string | undefined
  fontStretch?: number | string | undefined
  fontStyle?: number | string | undefined
  fontVariant?: number | string | undefined
  fontWeight?: number | string | undefined
  format?: number | string | undefined
  fr?: number | string | undefined
  from?: number | string | undefined
  fx?: number | string | undefined
  fy?: number | string | undefined
  g1?: number | string | undefined
  g2?: number | string | undefined
  glyphName?: number | string | undefined
  glyphOrientationHorizontal?: number | string | undefined
  glyphOrientationVertical?: number | string | undefined
  glyphRef?: number | string | undefined
  gradientTransform?: string | undefined
  gradientUnits?: string | undefined
  hanging?: number | string | undefined
  horizAdvX?: number | string | undefined
  horizOriginX?: number | string | undefined
  href?: string | undefined
  ideographic?: number | string | undefined
  imageRendering?: number | string | undefined
  in2?: number | string | undefined
  in?: string | undefined
  intercept?: number | string | undefined
  k1?: number | string | undefined
  k2?: number | string | undefined
  k3?: number | string | undefined
  k4?: number | string | undefined
  k?: number | string | undefined
  kernelMatrix?: number | string | undefined
  kernelUnitLength?: number | string | undefined
  kerning?: number | string | undefined
  keyPoints?: number | string | undefined
  keySplines?: number | string | undefined
  keyTimes?: number | string | undefined
  lengthAdjust?: number | string | undefined
  letterSpacing?: number | string | undefined
  lightingColor?: number | string | undefined
  limitingConeAngle?: number | string | undefined
  local?: number | string | undefined
  markerEnd?: string | undefined
  markerHeight?: number | string | undefined
  markerMid?: string | undefined
  markerStart?: string | undefined
  markerUnits?: number | string | undefined
  markerWidth?: number | string | undefined
  mask?: string | undefined
  maskContentUnits?: number | string | undefined
  maskUnits?: number | string | undefined
  mathematical?: number | string | undefined
  mode?: number | string | undefined
  numOctaves?: number | string | undefined
  offset?: number | string | undefined
  opacity?: number | string | undefined
  operator?: number | string | undefined
  order?: number | string | undefined
  orient?: number | string | undefined
  orientation?: number | string | undefined
  origin?: number | string | undefined
  overflow?: number | string | undefined
  overlinePosition?: number | string | undefined
  overlineThickness?: number | string | undefined
  paintOrder?: number | string | undefined
  panose1?: number | string | undefined
  path?: string | undefined
  pathLength?: number | string | undefined
  patternContentUnits?: string | undefined
  patternTransform?: number | string | undefined
  patternUnits?: string | undefined
  pointerEvents?: number | string | undefined
  points?: string | undefined
  pointsAtX?: number | string | undefined
  pointsAtY?: number | string | undefined
  pointsAtZ?: number | string | undefined
  preserveAlpha?: Booleanish | undefined
  preserveAspectRatio?: string | undefined
  primitiveUnits?: number | string | undefined
  r?: number | string | undefined
  radius?: number | string | undefined
  refX?: number | string | undefined
  refY?: number | string | undefined
  renderingIntent?: number | string | undefined
  repeatCount?: number | string | undefined
  repeatDur?: number | string | undefined
  requiredExtensions?: number | string | undefined
  requiredFeatures?: number | string | undefined
  restart?: number | string | undefined
  result?: string | undefined
  rotate?: number | string | undefined
  rx?: number | string | undefined
  ry?: number | string | undefined
  scale?: number | string | undefined
  seed?: number | string | undefined
  shapeRendering?: number | string | undefined
  slope?: number | string | undefined
  spacing?: number | string | undefined
  specularConstant?: number | string | undefined
  specularExponent?: number | string | undefined
  speed?: number | string | undefined
  spreadMethod?: string | undefined
  startOffset?: number | string | undefined
  stdDeviation?: number | string | undefined
  stemh?: number | string | undefined
  stemv?: number | string | undefined
  stitchTiles?: number | string | undefined
  stopColor?: string | undefined
  stopOpacity?: number | string | undefined
  strikethroughPosition?: number | string | undefined
  strikethroughThickness?: number | string | undefined
  string?: number | string | undefined
  stroke?: string | undefined
  strokeDasharray?: string | number | undefined
  strokeDashoffset?: string | number | undefined
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit' | undefined
  strokeMiterlimit?: number | string | undefined
  strokeOpacity?: number | string | undefined
  strokeWidth?: number | string | undefined
  surfaceScale?: number | string | undefined
  systemLanguage?: number | string | undefined
  tableValues?: number | string | undefined
  targetX?: number | string | undefined
  targetY?: number | string | undefined
  textAnchor?: string | undefined
  textDecoration?: number | string | undefined
  textLength?: number | string | undefined
  textRendering?: number | string | undefined
  to?: number | string | undefined
  transform?: string | undefined
  u1?: number | string | undefined
  u2?: number | string | undefined
  underlinePosition?: number | string | undefined
  underlineThickness?: number | string | undefined
  unicode?: number | string | undefined
  unicodeBidi?: number | string | undefined
  unicodeRange?: number | string | undefined
  unitsPerEm?: number | string | undefined
  vAlphabetic?: number | string | undefined
  values?: string | undefined
  vectorEffect?: number | string | undefined
  version?: string | undefined
  vertAdvY?: number | string | undefined
  vertOriginX?: number | string | undefined
  vertOriginY?: number | string | undefined
  vHanging?: number | string | undefined
  vIdeographic?: number | string | undefined
  viewBox?: string | undefined
  viewTarget?: number | string | undefined
  visibility?: number | string | undefined
  vMathematical?: number | string | undefined
  widths?: number | string | undefined
  wordSpacing?: number | string | undefined
  writingMode?: number | string | undefined
  x1?: number | string | undefined
  x2?: number | string | undefined
  x?: number | string | undefined
  xChannelSelector?: string | undefined
  xHeight?: number | string | undefined
  xlinkActuate?: string | undefined
  xlinkArcrole?: string | undefined
  xlinkHref?: string | undefined
  xlinkRole?: string | undefined
  xlinkShow?: string | undefined
  xlinkTitle?: string | undefined
  xlinkType?: string | undefined
  xmlBase?: string | undefined
  xmlLang?: string | undefined
  xmlns?: string | undefined
  xmlnsXlink?: string | undefined
  xmlSpace?: string | undefined
  y1?: number | string | undefined
  y2?: number | string | undefined
  y?: number | string | undefined
  yChannelSelector?: string | undefined
  z?: number | string | undefined
  zoomAndPan?: string | undefined
}

export type EventsHandlers<T = Element> = {
  // Clipboard Events
  onCopy?: React.ClipboardEventHandler<T> | undefined
  onCopyCapture?: React.ClipboardEventHandler<T> | undefined
  onCut?: React.ClipboardEventHandler<T> | undefined
  onCutCapture?: React.ClipboardEventHandler<T> | undefined
  onPaste?: React.ClipboardEventHandler<T> | undefined
  onPasteCapture?: React.ClipboardEventHandler<T> | undefined

  // Composition Events
  onCompositionEnd?: React.CompositionEventHandler<T> | undefined
  onCompositionEndCapture?: React.CompositionEventHandler<T> | undefined
  onCompositionStart?: React.CompositionEventHandler<T> | undefined
  onCompositionStartCapture?: React.CompositionEventHandler<T> | undefined
  onCompositionUpdate?: React.CompositionEventHandler<T> | undefined
  onCompositionUpdateCapture?: React.CompositionEventHandler<T> | undefined

  // Focus Events
  onFocus?: React.FocusEventHandler<T> | undefined
  onFocusCapture?: React.FocusEventHandler<T> | undefined
  onBlur?: React.FocusEventHandler<T> | undefined
  onBlurCapture?: React.FocusEventHandler<T> | undefined

  // Form Events
  onChange?: React.FormEventHandler<T> | undefined
  onChangeCapture?: React.FormEventHandler<T> | undefined
  onBeforeInput?: React.FormEventHandler<T> | undefined
  onBeforeInputCapture?: React.FormEventHandler<T> | undefined
  onInput?: React.FormEventHandler<T> | undefined
  onInputCapture?: React.FormEventHandler<T> | undefined
  onReset?: React.FormEventHandler<T> | undefined
  onResetCapture?: React.FormEventHandler<T> | undefined
  onSubmit?: React.FormEventHandler<T> | undefined
  onSubmitCapture?: React.FormEventHandler<T> | undefined
  onInvalid?: React.FormEventHandler<T> | undefined
  onInvalidCapture?: React.FormEventHandler<T> | undefined

  // Image Events
  onLoad?: React.ReactEventHandler<T> | undefined
  onLoadCapture?: React.ReactEventHandler<T> | undefined
  onError?: React.ReactEventHandler<T> | undefined // also a Media Event
  onErrorCapture?: React.ReactEventHandler<T> | undefined // also a Media Event

  // Keyboard Events
  onKeyDown?: React.KeyboardEventHandler<T> | undefined
  onKeyDownCapture?: React.KeyboardEventHandler<T> | undefined
  onKeyPress?: React.KeyboardEventHandler<T> | undefined
  onKeyPressCapture?: React.KeyboardEventHandler<T> | undefined
  onKeyUp?: React.KeyboardEventHandler<T> | undefined
  onKeyUpCapture?: React.KeyboardEventHandler<T> | undefined

  // Media Events
  onAbort?: React.ReactEventHandler<T> | undefined
  onAbortCapture?: React.ReactEventHandler<T> | undefined
  onCanPlay?: React.ReactEventHandler<T> | undefined
  onCanPlayCapture?: React.ReactEventHandler<T> | undefined
  onCanPlayThrough?: React.ReactEventHandler<T> | undefined
  onCanPlayThroughCapture?: React.ReactEventHandler<T> | undefined
  onDurationChange?: React.ReactEventHandler<T> | undefined
  onDurationChangeCapture?: React.ReactEventHandler<T> | undefined
  onEmptied?: React.ReactEventHandler<T> | undefined
  onEmptiedCapture?: React.ReactEventHandler<T> | undefined
  onEncrypted?: React.ReactEventHandler<T> | undefined
  onEncryptedCapture?: React.ReactEventHandler<T> | undefined
  onEnded?: React.ReactEventHandler<T> | undefined
  onEndedCapture?: React.ReactEventHandler<T> | undefined
  onLoadedData?: React.ReactEventHandler<T> | undefined
  onLoadedDataCapture?: React.ReactEventHandler<T> | undefined
  onLoadedMetadata?: React.ReactEventHandler<T> | undefined
  onLoadedMetadataCapture?: React.ReactEventHandler<T> | undefined
  onLoadStart?: React.ReactEventHandler<T> | undefined
  onLoadStartCapture?: React.ReactEventHandler<T> | undefined
  onPause?: React.ReactEventHandler<T> | undefined
  onPauseCapture?: React.ReactEventHandler<T> | undefined
  onPlay?: React.ReactEventHandler<T> | undefined
  onPlayCapture?: React.ReactEventHandler<T> | undefined
  onPlaying?: React.ReactEventHandler<T> | undefined
  onPlayingCapture?: React.ReactEventHandler<T> | undefined
  onProgress?: React.ReactEventHandler<T> | undefined
  onProgressCapture?: React.ReactEventHandler<T> | undefined
  onRateChange?: React.ReactEventHandler<T> | undefined
  onRateChangeCapture?: React.ReactEventHandler<T> | undefined
  onSeeked?: React.ReactEventHandler<T> | undefined
  onSeekedCapture?: React.ReactEventHandler<T> | undefined
  onSeeking?: React.ReactEventHandler<T> | undefined
  onSeekingCapture?: React.ReactEventHandler<T> | undefined
  onStalled?: React.ReactEventHandler<T> | undefined
  onStalledCapture?: React.ReactEventHandler<T> | undefined
  onSuspend?: React.ReactEventHandler<T> | undefined
  onSuspendCapture?: React.ReactEventHandler<T> | undefined
  onTimeUpdate?: React.ReactEventHandler<T> | undefined
  onTimeUpdateCapture?: React.ReactEventHandler<T> | undefined
  onVolumeChange?: React.ReactEventHandler<T> | undefined
  onVolumeChangeCapture?: React.ReactEventHandler<T> | undefined
  onWaiting?: React.ReactEventHandler<T> | undefined
  onWaitingCapture?: React.ReactEventHandler<T> | undefined

  // MouseEvents
  onAuxClick?: React.MouseEventHandler<T> | undefined
  onAuxClickCapture?: React.MouseEventHandler<T> | undefined
  onClick?: React.MouseEventHandler<T> | undefined
  onClickCapture?: React.MouseEventHandler<T> | undefined
  onContextMenu?: React.MouseEventHandler<T> | undefined
  onContextMenuCapture?: React.MouseEventHandler<T> | undefined
  onDoubleClick?: React.MouseEventHandler<T> | undefined
  onDoubleClickCapture?: React.MouseEventHandler<T> | undefined
  onDrag?: React.DragEventHandler<T> | undefined
  onDragCapture?: React.DragEventHandler<T> | undefined
  onDragEnd?: React.DragEventHandler<T> | undefined
  onDragEndCapture?: React.DragEventHandler<T> | undefined
  onDragEnter?: React.DragEventHandler<T> | undefined
  onDragEnterCapture?: React.DragEventHandler<T> | undefined
  onDragExit?: React.DragEventHandler<T> | undefined
  onDragExitCapture?: React.DragEventHandler<T> | undefined
  onDragLeave?: React.DragEventHandler<T> | undefined
  onDragLeaveCapture?: React.DragEventHandler<T> | undefined
  onDragOver?: React.DragEventHandler<T> | undefined
  onDragOverCapture?: React.DragEventHandler<T> | undefined
  onDragStart?: React.DragEventHandler<T> | undefined
  onDragStartCapture?: React.DragEventHandler<T> | undefined
  onDrop?: React.DragEventHandler<T> | undefined
  onDropCapture?: React.DragEventHandler<T> | undefined
  onMouseDown?: React.MouseEventHandler<T> | undefined
  onMouseDownCapture?: React.MouseEventHandler<T> | undefined
  onMouseEnter?: React.MouseEventHandler<T> | undefined
  onMouseLeave?: React.MouseEventHandler<T> | undefined
  onMouseMove?: React.MouseEventHandler<T> | undefined
  onMouseMoveCapture?: React.MouseEventHandler<T> | undefined
  onMouseOut?: React.MouseEventHandler<T> | undefined
  onMouseOutCapture?: React.MouseEventHandler<T> | undefined
  onMouseOver?: React.MouseEventHandler<T> | undefined
  onMouseOverCapture?: React.MouseEventHandler<T> | undefined
  onMouseUp?: React.MouseEventHandler<T> | undefined
  onMouseUpCapture?: React.MouseEventHandler<T> | undefined

  // Selection Events
  onSelect?: React.ReactEventHandler<T> | undefined
  onSelectCapture?: React.ReactEventHandler<T> | undefined

  // Touch Events
  onTouchCancel?: React.TouchEventHandler<T> | undefined
  onTouchCancelCapture?: React.TouchEventHandler<T> | undefined
  onTouchEnd?: React.TouchEventHandler<T> | undefined
  onTouchEndCapture?: React.TouchEventHandler<T> | undefined
  onTouchMove?: React.TouchEventHandler<T> | undefined
  onTouchMoveCapture?: React.TouchEventHandler<T> | undefined
  onTouchStart?: React.TouchEventHandler<T> | undefined
  onTouchStartCapture?: React.TouchEventHandler<T> | undefined

  // Pointer Events
  onPointerDown?: React.PointerEventHandler<T> | undefined
  onPointerDownCapture?: React.PointerEventHandler<T> | undefined
  onPointerMove?: React.PointerEventHandler<T> | undefined
  onPointerMoveCapture?: React.PointerEventHandler<T> | undefined
  onPointerUp?: React.PointerEventHandler<T> | undefined
  onPointerUpCapture?: React.PointerEventHandler<T> | undefined
  onPointerCancel?: React.PointerEventHandler<T> | undefined
  onPointerCancelCapture?: React.PointerEventHandler<T> | undefined
  onPointerEnter?: React.PointerEventHandler<T> | undefined
  onPointerEnterCapture?: React.PointerEventHandler<T> | undefined
  onPointerLeave?: React.PointerEventHandler<T> | undefined
  onPointerLeaveCapture?: React.PointerEventHandler<T> | undefined
  onPointerOver?: React.PointerEventHandler<T> | undefined
  onPointerOverCapture?: React.PointerEventHandler<T> | undefined
  onPointerOut?: React.PointerEventHandler<T> | undefined
  onPointerOutCapture?: React.PointerEventHandler<T> | undefined
  onGotPointerCapture?: React.PointerEventHandler<T> | undefined
  onGotPointerCaptureCapture?: React.PointerEventHandler<T> | undefined
  onLostPointerCapture?: React.PointerEventHandler<T> | undefined
  onLostPointerCaptureCapture?: React.PointerEventHandler<T> | undefined

  // UI Events
  onScroll?: React.UIEventHandler<T> | undefined
  onScrollCapture?: React.UIEventHandler<T> | undefined

  // Wheel Events
  onWheel?: React.WheelEventHandler<T> | undefined
  onWheelCapture?: React.WheelEventHandler<T> | undefined

  // Animation Events
  onAnimationStart?: React.AnimationEventHandler<T> | undefined
  onAnimationStartCapture?: React.AnimationEventHandler<T> | undefined
  onAnimationEnd?: React.AnimationEventHandler<T> | undefined
  onAnimationEndCapture?: React.AnimationEventHandler<T> | undefined
  onAnimationIteration?: React.AnimationEventHandler<T> | undefined
  onAnimationIterationCapture?: React.AnimationEventHandler<T> | undefined

  // Transition Events
  onTransitionEnd?: React.TransitionEventHandler<T> | undefined
  onTransitionEndCapture?: React.TransitionEventHandler<T> | undefined
}
