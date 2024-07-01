import * as React from 'react'
import {
  Cartesian,
  Chart,
  ClipChart,
  ClipRect,
  element,
  Grid,
  Style,
  Tooltip,
  Svg,
  stackNarrow,
  Circles,
  Texts,
  Bars,
  Line,
  Area,
  Rects,
  MouseConsumer,
  CartesianConsumer,
  computePos,
  Elements,
} from '../../src'
import { extent, range, scaleOrdinal } from 'd3'
import { makeLayout } from 'yogurt-layout'
import { LegacyExamples } from './Legacy'
import { BarchartToTestDisableAnimation } from './BarchartToTestDisableAnimation'

const createLinechartDataset = () => {
  const maxX = Math.random() * 100
  const maxY = Math.random() * 100
  return range(5).map(() => ({
    x: (Math.random() * 2 - 1) * maxX,
    y: (Math.random() * 2 - 1) * maxY,
    key: Math.random(),
  }))
}

const Linechart = () => {
  const [data, setData] = React.useState(createLinechartDataset)

  const layout = makeLayout({
    id: 'svg',
    width: 600,
    height: 600,
    padding: 10,
    children: [
      {
        id: 'wrapper',
        padding: 20,
        children: [{ id: 'chart' }],
      },
    ],
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div>
        <button onClick={() => setData(createLinechartDataset())}>
          shuffle
        </button>
      </div>
      <Svg width={layout.svg.width} height={layout.svg.height}>
        <Chart {...layout.chart}>
          <Cartesian
            x={{
              scale: 'linear',
              domain: extent(data.map((d) => d.x)) as [number, number],
            }}
            y={{
              scale: 'linear',
              domain: extent(data.map((d) => d.y)) as [number, number],
            }}
            color={{
              scale: 'ordinal',
              domain: ['positive', 'negative'],
              range: ['white', 'red'],
            }}
            interactive
            nice
          >
            <Grid>
              <Style stroke="white">
                <ClipChart>
                  <Grid.XLines opacity={0.3} />
                  <Grid.YLines opacity={0.3} />
                  <Grid.XAxes strokeWidth={2} />
                  <Grid.YAxes strokeWidth={2} />
                </ClipChart>

                <element.rect
                  x={layout.chart.left}
                  y={layout.chart.top}
                  width={layout.chart.width}
                  height={layout.chart.height}
                  fill="none"
                  opacity={0.3}
                />
              </Style>
              <Style fill="white">
                <ClipRect {...layout.svg}>
                  <Grid.XLabels padding={5} />
                  <Grid.YLabels padding={5} />
                </ClipRect>
              </Style>
            </Grid>

            <ClipRect {...layout.wrapper}>
              <CartesianConsumer>
                {({ xScale, yScale }) => (
                  <Style opacity={0.75} strokeWidth={1}>
                    <Elements
                      tag="line"
                      data={data}
                      x1={(d) => computePos(d.x, xScale)}
                      x2={(d) => computePos(d.x, xScale)}
                      y1={layout.chart.top}
                      y2={layout.chart.bottom}
                      stroke={(d) => (d.x > 0 ? 'white' : 'red')}
                      enter={{ opacity: 0 }}
                      dataKey={(d) => d.key}
                    />
                    <Elements
                      tag="line"
                      data={data}
                      x1={layout.chart.left}
                      x2={layout.chart.right}
                      y1={(d) => computePos(d.y, yScale)}
                      y2={(d) => computePos(d.y, yScale)}
                      stroke={(d) => (d.x > 0 ? 'white' : 'red')}
                      enter={{ opacity: 0 }}
                      dataKey={(d) => d.key}
                    />
                  </Style>
                )}
              </CartesianConsumer>
              <Bars
                data={data}
                dataKey={(d) => d.key}
                x-data={{ to: (d) => d.x }}
                y-data={(d) => d.y}
                opacity={0.4}
                strokeWidth={10}
                fill="blue"
                stroke="blue"
                enter={{ opacity: 0 }}
              />

              <Area
                data={data.slice().sort((a, b) => a.x - b.x)}
                x-data={(d) => d.x}
                y-data={{ to: (d) => d.y, base: (d) => d.y }}
                y1={(d) => (d.y > 0 ? 100 : -100)}
                curve="bump-x"
                fill="yellow"
                opacity={0.3}
                dataKey={() => Math.random()}
                enter={{ opacity: 0 }}
              />

              <Line
                data={data.slice().sort((a, b) => a.x - b.x)}
                x-data={(d) => d.x}
                y-data={(d) => d.y}
                stroke="yellow"
                curve="bump-x"
                dataKey={() => Math.random()}
                opacity={1}
                enter={{ opacity: 0 }}
              />

              <Rects
                data={data}
                dataKey={(d) => d.key}
                x-data={(d) => d.x}
                y-data={(d) => d.y}
                x={-25}
                y={-25}
                width={50}
                height={50}
                rx={10}
                opacity={0.2}
                fill={(d) => (d.x > 0 ? 'white' : 'red')}
                enter={{ opacity: 0 }}
              />

              <Circles
                data={data}
                dataKey={(d) => d.key}
                x-data={(d) => d.x}
                y-data={(d) => d.y}
                r={6}
                fillOpacity={0.5}
                opacity={1}
                fill={(d) => (d.x > 0 ? 'white' : 'red')}
                stroke={(d) => (d.x > 0 ? 'white' : 'red')}
                enter={{ opacity: 0 }}
              />

              <Texts
                data={data}
                text={(d) => `key: ${d.key.toFixed(4)}`}
                x-data={(d) => d.x}
                y-data={(d) => d.y}
                x={(d) => (d.x > 0 ? -55 : 55)}
                y={-1}
                fill={(d) => (d.x < 0 ? 'white' : 'red')}
                dataKey={(d) => d.key}
                dominantBaseline="middle"
                textAnchor="middle"
                opacity={1}
                enter={{ opacity: 0 }}
              />
            </ClipRect>

            <MouseConsumer>
              {(mouse) => (
                <>
                  {mouse && (
                    <circle cx={mouse.x} cy={mouse.y} r={10} fill="red" />
                  )}
                  <Tooltip
                    x={0}
                    y={0}
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    mouse: {Math.round(mouse?.x ?? 0) || '-'},{' '}
                    {Math.round(mouse?.y ?? 0) || '-'}
                  </Tooltip>
                </>
              )}
            </MouseConsumer>
          </Cartesian>
        </Chart>
      </Svg>
    </div>
  )
}

const categories = ['A', 'B', 'C']
const colors = ['#FFC300', '#FF5733', '#C70039']
const groups = ['a', 'b', 'c', 'd', 'e']
const createBarchartDataset = () => {
  return categories.flatMap((category) =>
    groups.map((group) => ({
      category,
      group,
      value: Math.random() * 100,
    }))
  )
}

const StackedBarchart = () => {
  const [data] = React.useState(createBarchartDataset)
  const [hovered, setHovered] = React.useState(null as typeof data[0] | null)

  const [selectedA, setSelectedA] = React.useState(true)
  const [selectedC, setSelectedC] = React.useState(true)

  const selectedGroups = groups
    .filter((d) => !(d === 'a' && !selectedA))
    .filter((d) => !(d === 'c' && !selectedC))

  const visibleData = data.filter((d) => selectedGroups.includes(d.group))

  const layout = makeLayout({
    id: 'svg',
    width: 600,
    height: 600,
    padding: 10,
    children: [
      {
        id: 'wrapper',
        padding: 20,
        children: [{ id: 'chart' }],
      },
    ],
  })

  const stackedData = stackNarrow({
    data: visibleData,
    categories,
    getCategory: (d) => d.category,
    getValue: (d) => d.value,
    getGroup: (d) => d.group,
  })

  const xDomain = [...new Set(stackedData.map((d) => d.group))]
  const yDomain = [0, extent(stackedData, (d) => d.to)[1]] as [number, number]

  const colorScale = scaleOrdinal(categories, colors)
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ color: 'white', display: 'flex' }}>
        <div>
          a
          <input
            type="checkbox"
            checked={selectedA}
            onChange={() => setSelectedA(!selectedA)}
          />
        </div>
        <div>
          c
          <input
            type="checkbox"
            checked={selectedC}
            onChange={() => setSelectedC(!selectedC)}
          />
        </div>
      </div>
      <svg width={layout.svg.width} height={layout.svg.height}>
        <Chart {...layout.chart}>
          <Cartesian
            x={{ scale: 'band', domain: xDomain }}
            y={{ scale: 'linear', domain: yDomain }}
            color={{
              scale: 'ordinal',
              domain: categories,
              range: colors,
            }}
            nice
          >
            <Grid tickSize={100}>
              <Grid.YLines stroke="white" strokeWidth={0.8} opacity={0.4} />

              <Style fill={'white'}>
                <Grid.XLabels padding={5} />
                <Grid.YLabels
                  padding={5}
                  format={() => (d) =>
                    new Intl.NumberFormat('en', {
                      notation: 'compact',
                    }).format(d as number)}
                />
              </Style>
            </Grid>

            <ClipChart>
              <Bars
                data={stackedData}
                x-data={(d) => d.group}
                y-data={{ to: (d) => d.to, base: (d) => d.base }}
                fill={(d) => colorScale(d.category as string)}
                stroke={(d) => colorScale(d.category as string)}
                dataKey={(d) => d.group + d.category}
                opacity={1}
                fillOpacity={(d) => (!hovered || hovered === d.datum ? 1 : 0.5)}
                transform="translate(0, 0)"
                enter={{
                  opacity: 0,
                  transform: 'translate(100,0)',
                }}
                onMouseOver={(_, d) => {
                  console.log({ selectedA, selectedC })
                  setHovered(d.datum)
                }}
                onMouseOut={() => setHovered(null)}
              />
            </ClipChart>
          </Cartesian>
        </Chart>
      </svg>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Linechart />
      <StackedBarchart />
      <LegacyExamples />
      <BarchartToTestDisableAnimation />
    </div>
  )
}

export default App
