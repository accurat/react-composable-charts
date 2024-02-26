import * as React from 'react'
import {
  AreaData,
  BarData,
  Cartesian,
  Chart,
  ClipChart,
  ClipRect,
  element,
  Grid,
  LabelsData,
  LineData,
  PointData,
  RectData,
  Style,
  Tooltip,
  Svg,
  useMouseContext,
  stackNarrow,
} from '../../src'
import { extent, range } from 'd3'
import { makeLayout } from 'yogurt-layout'

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
              <BarData
                data={data}
                dataKey={(d) => d.key}
                x={{ to: (d) => d.x }}
                y={(d) => d.y}
                opacity={0.4}
                strokeWidth={10}
                fill="blue"
                stroke="blue"
                enter={{ opacity: 0 }}
              />

              <AreaData
                data={data.slice().sort((a, b) => a.x - b.x)}
                x={(d) => d.x}
                y={(d) => d.y}
                curve="bump-x"
                fill="yellow"
                opacity={0.3}
                dataKey={() => Math.random()}
                enter={{ opacity: 0 }}
              />

              <LineData
                data={data.slice().sort((a, b) => a.x - b.x)}
                x={(d) => d.x}
                y={(d) => d.y}
                stroke="yellow"
                curve="bump-x"
                dataKey={() => Math.random()}
                opacity={1}
                enter={{ opacity: 0 }}
              />

              <RectData
                data={data}
                dataKey={(d) => d.key}
                x={(d) => d.x}
                y={(d) => d.y}
                width={50}
                height={50}
                rx={10}
                opacity={0.2}
                fill={(d) => (d.x > 0 ? 'positive' : 'negative')}
                enter={{ opacity: 0 }}
              />

              <PointData
                data={data}
                dataKey={(d) => d.key}
                x={(d) => d.x}
                y={(d) => d.y}
                r={6}
                fillOpacity={0.5}
                opacity={1}
                fill={(d) => (d.x > 0 ? 'positive' : 'negative')}
                stroke={(d) => (d.x > 0 ? 'positive' : 'negative')}
                enter={{ opacity: 0 }}
              />

              <LabelsData
                data={data}
                text={(d) => `key: ${d.key.toFixed(4)}`}
                dataX={(d) => d.x}
                dataY={(d) => d.y}
                offsetX={(d) => (d.x > 0 ? -55 : 55)}
                offsetY={-1}
                fill={(d) => (d.x < 0 ? 'positive' : 'negative')}
                dataKey={(d) => d.key}
                dominantBaseline="middle"
                textAnchor="middle"
                opacity={1}
                enter={{ opacity: 0 }}
              />
            </ClipRect>

            <circle cx={100} cy={100} r={10} fill="red" />
            <Tooltip
              x={100}
              y={-20}
              horizontalAnchor="center"
              verticalAnchor="end"
            >
              <div
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                ciao
              </div>
            </Tooltip>

            <TestMouse />
          </Cartesian>
        </Chart>
      </Svg>
    </div>
  )
}

const TestMouse = () => {
  const mouse = useMouseContext()
  return (
    <>
      {mouse && <circle cx={mouse.x} cy={mouse.y} r={10} fill="red" />}
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

            <BarData
              data={stackedData}
              x={(d) => d.group}
              y={{ to: (d) => d.to, base: (d) => d.base }}
              fill={(d) => d.category as string}
              dataKey={(d) => d.group + d.category}
              opacity={1}
              transform="translate(0, 0)"
              enter={{ opacity: 0, transform: 'translate(100,0)' }}
            />
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
    </div>
  )
}

export default App
