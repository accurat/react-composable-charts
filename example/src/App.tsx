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
} from '../../src'
import { extent, range } from 'd3'
import { makeLayout } from 'yogurt-layout'

const createDataset = () => {
  const maxX = Math.random() * 100
  const maxY = Math.random() * 100
  return range(5).map(() => ({
    x: (Math.random() * 2 - 1) * maxX,
    y: (Math.random() * 2 - 1) * maxY,
    key: Math.random(),
  }))
}

const App = () => {
  const [data, setData] = React.useState(createDataset)

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
        <button onClick={() => setData(createDataset())}>shuffle</button>
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

export default App
