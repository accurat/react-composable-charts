/* eslint-disable @typescript-eslint/no-unused-vars */
import { CodeSandboxEmbed } from './CodesandboxEmbed'
import { Code } from './Code'
import { CodeSandbox, RCC_VERSION } from './CodeSandbox'
import { WithSidebar } from './WithSidebar'
import { Deprecated } from './Deprecated'
import React from 'react'
import { TypeTooltip } from './TypeTooltip'

const VERSION_TEXT = 'v' + RCC_VERSION
function Table({ cells }: { cells: React.ReactNode[][] }) {
  const tdStyle = {
    border: '1px solid #cdcdcd',
    padding: '0.75rem',
  }
  return (
    <table
      style={{
        border: '1px solid #cdcdcd',
        borderCollapse: 'collapse',
        maxWidth: 700,
        margin: '0 auto',
      }}
    >
      <thead>
        <tr>
          <th style={tdStyle}>Prop</th>
          <th style={tdStyle}>Description</th>
        </tr>
      </thead>
      <tbody style={{ border: 'inherit' }}>
        {cells.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td
                key={j}
                style={{
                  ...tdStyle,
                  ...(j === 0 ? { whiteSpace: 'nowrap' } : {}),
                }}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function PropsTable({
  props,
}: {
  props: {
    name: string
    type?: React.ReactNode
    doc: React.ReactNode
    default?: string
    optional?: boolean
  }[]
}) {
  return (
    <Table
      cells={props.map((row) => [
        <Code>{row.name}</Code>,
        <>
          {row.type && (
            <div>
              {typeof row.type === 'string' ? (
                <Code>{row.type}</Code>
              ) : (
                row.type
              )}
            </div>
          )}
          {row.doc}{' '}
          {row.default && (
            <>
              <i>Default</i>: <Code>{row.default}</Code>
            </>
          )}{' '}
          {row.optional && <i> Optional.</i>}
        </>,
      ])}
    />
  )
}

function App() {
  return (
    <WithSidebar
      title={<code>{VERSION_TEXT}</code>}
      items={PageContent.map((d) => ({
        title: d.title,
        id: d.id,
        level: d.level,
        deprecated: d.deprecated,
      }))}
    >
      <div className="main" style={{ position: 'relative' }}>
        <h1>
          React Composable Charts{' '}
          <code style={{ fontSize: '1.25rem' }}>{VERSION_TEXT}</code>
        </h1>

        <p>
          <b>🚨 NB:</b> this library is still in early development. This
          documentation is specific for version <code>{VERSION_TEXT}</code>. Any
          different version might have breaking changes.
        </p>
        {PageContent.map((d, i) => {
          const Title = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'][d.level + 1] as any
          return (
            <>
              <Title id={d.id} style={{ padding: '1rem 0 0 0' }}>
                {d.title}{' '}
                {d.deprecated && (
                  <Deprecated description={d.deprecationMessage} />
                )}
              </Title>
              {d.content}
            </>
          )
        })}
      </div>
    </WithSidebar>
  )
}

export default App

const dataTs = `export const dataset = [
  { key: "e", x: 69.04, y: 0.04 },
  { key: "d", x: 26.87, y: 0.21 },
  { key: "c", x: 95.28, y: 0.72 },
  { key: "i", x: 80.10, y: 0.61 },
  { key: "g", x: 9.13, y: 0.10 },
  { key: "o", x: 90.44, y: 0.66 },
  { key: "q", x: 44.57, y: 0.79 },
  { key: "a", x: 37.45, y: 0.45 },
  { key: "h", x: 78.23, y: 0.13 },
  { key: "l", x: 79.35, y: 0.48 },
  { key: "f", x: 58.78, y: 0.46 },
  { key: "p", x: 76.03, y: 0.67 },
  { key: "n", x: 42.23, y: 0.72 },
  { key: "b", x: 44.39, y: 0.97 },
  { key: "m", x: 72.24, y: 0.13 },
];
`

const dataStackedTs = `export const dataset = [
  { serie: "A", value: 13.621247938246794, category: "Cat 1" },
  { serie: "A", value: 50.33793406484519, category: "Cat 2" },
  { serie: "A", value: 0.967986903849094, category: "Cat 3" },
  { serie: "B", value: 39.983235531734486, category: "Cat 1" },
  { serie: "B", value: 48.8401186257581, category: "Cat 2" },
  { serie: "B", value: 91.72521762333308, category: "Cat 3" },
  { serie: "C", value: 57.01203374882626, category: "Cat 1" },
  { serie: "C", value: 26.56612690193194, category: "Cat 2" },
  { serie: "C", value: 98.75832987656905, category: "Cat 3" },
  { serie: "D", value: 71.53236939612553, category: "Cat 1" },
  { serie: "D", value: 61.61424862522307, category: "Cat 2" },
  { serie: "D", value: 98.91903480695572, category: "Cat 3" },
  { serie: "E", value: 90.55723582054097, category: "Cat 1" },
  { serie: "E", value: 4.53256449881696, category: "Cat 2" },
  { serie: "E", value: 1.8372763409422843, category: "Cat 3" },
  { serie: "F", value: 92.53848659726005, category: "Cat 1" },
  { serie: "F", value: 52.71149196840017, category: "Cat 2" },
  { serie: "F", value: 86.00364579986699, category: "Cat 3" },
  { serie: "G", value: 10.393801343498698, category: "Cat 1" },
  { serie: "G", value: 68.27735195305023, category: "Cat 2" },
  { serie: "G", value: 6.373842246991823, category: "Cat 3" },
  { serie: "H", value: 83.90818128052047, category: "Cat 1" },
  { serie: "H", value: 37.927408866972925, category: "Cat 2" },
  { serie: "H", value: 47.71929746475645, category: "Cat 3" },
  { serie: "I", value: 86.53903932927196, category: "Cat 1" },
  { serie: "I", value: 36.699676248875335, category: "Cat 2" },
  { serie: "I", value: 49.48086733106838, category: "Cat 3" },
  { serie: "J", value: 4.379620050636324, category: "Cat 1" },
  { serie: "J", value: 40.71813959759349, category: "Cat 2" },
  { serie: "J", value: 87.81511205115957, category: "Cat 3" }
];
`
const COLOR = '#6bc2be'
const ExampleInstall = () => (
  <CodeSandbox
    template="vanilla"
    editorStyle={{ height: 55 }}
    hideLineNumbers
    hidePreview
    hideTabs
    readOnly
    files={{ 'index.js': 'yarn add react-composable-charts react d3' }}
  />
)

const ExampleBasicStructure = () => (
  <CodeSandbox
    editorStyle={{ height: 'auto' }}
    hideLineNumbers
    hidePreview
    hideTabs
    readOnly
    files={{
      'App.tsx': `<svg>
  <Chart>
    <Cartesian>
      <Grid />
      <Data />
    </Cartesian>
  </Chart>
</svg>
`,
    }}
  />
)

const ExampleChart = () => (
  <CodeSandbox
    readOnly
    hidePreview
    hideTabs
    editorStyle={{ height: 320 }}
    files={{
      '/App.tsx': {
        code: `import { Chart } from 'react-composable-charts'

export default function App() {
  const width = 200
  const height = 200
  return (
    <svg width={width} height={height}>
      <Chart width={width} height={height}>
        ...
      </Chart>
    </svg>
  )
}
`,
      },
    }}
  />
)

const ExampleCartesian = () => (
  <CodeSandbox
    readOnly
    hidePreview
    editorStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 200;
  const height = 200;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart width={width} height={height}>
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
        >
          ...
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleGrid = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice={true}
        >
          <Grid tickSize={50}>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleElementsProps = () => (
  <CodeSandbox
    hideLineNumbers
    hidePreview
    hideTabs
    readOnly
    editorStyle={{ height: 180 }}
    files={{
      '/App.tsx': {
        code: `<Circles
  data={data}
  ...
  fill={datum => colorScale(datum.category)
  stroke="black"
  ...
/>`,
      },
    }}
  />
)

const ExampleElementsEventHandlers = () => (
  <CodeSandbox
    hideLineNumbers
    hidePreview
    hideTabs
    readOnly
    editorStyle={{ height: 200 }}
    files={{
      '/App.tsx': {
        code: `<Circles
  data={data}
  ...
  onClick={(event, datum) => ...}
  onMouseOver={(event, datum) => ...}
  onMouseOut={(event, datum) => ...}
  ...
/>`,
      },
    }}
  />
)

const ExampleElementsDataAttributes = () => (
  <CodeSandbox
    hideLineNumbers
    hidePreview
    hideTabs
    readOnly
    editorStyle={{ height: 220 }}
    files={{
      '/App.tsx': {
        code: `<Cartesian x={...} y={...}>
  <Circles
    data={data}
    ...
    x-data={(d) => d.age}
    y-data={(d) => d.weight}
    ...
  />
<Cartesian>`,
      },
    }}
  />
)

const ExampleCircles = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, Circles } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <Circles
            data={dataset}
            x-data={(d) => d.x}
            y-data={(d) => d.y}
            r={7}
            fill="${COLOR}"
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleBarsVertical = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, Bars } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = dataset.map((d) => d.key);
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "band", domain: xDomain, paddingInner: 0.1 }}
          y={{ scale: "linear", domain: yDomain }}
          nice={true}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>
          
          <Bars
            data={dataset}
            x-data={(d) => d.key}
            y-data={{ to: (d) => d.y, base: 0 }}
            fill="#6bc2be"
          />

          <Grid>
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
          </Grid>
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleRects = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, Rects } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
  <svg width={width} height={height}>
    <Chart
      top={padding}
      left={padding}
      width={width - padding * 2}
      height={height - padding * 2}
    >
      <Cartesian
        x={{ scale: "linear", domain: xDomain }}
        y={{ scale: "linear", domain: yDomain }}
        nice={true}
      >
        <Grid>
          <Grid.XLines stroke="grey" />
          <Grid.YLines stroke="grey" />
          <Grid.XAxes stroke="black" strokeWidth={2} />
          <Grid.YAxes stroke="black" strokeWidth={2} />
          <Grid.XLabels padding={5} />
          <Grid.YLabels padding={5} />
        </Grid>

        <Rects
          data={dataset}
          x-data={(d) => d.x}
          y-data={(d) => d.y}
          x={-10}
          y={-10}
          width={20}
          height={20}
          rx={6}
          fill="#6bc2be"
        />
      </Cartesian>
    </Chart>
  </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleLine = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, Line } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
const width = 400;
const height = 400;
const padding = 30;
const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
return (
  <svg width={width} height={height}>
    <Chart
      top={padding}
      left={padding}
      width={width - padding * 2}
      height={height - padding * 2}
    >
      <Cartesian
        x={{ scale: "linear", domain: xDomain }}
        y={{ scale: "linear", domain: yDomain }}
        nice={true}
      >
        <Grid>
          <Grid.XLines stroke="grey" />
          <Grid.YLines stroke="grey" />
          <Grid.XAxes stroke="black" strokeWidth={2} />
          <Grid.YAxes stroke="black" strokeWidth={2} />
          <Grid.XLabels padding={5} />
          <Grid.YLabels padding={5} />
        </Grid>

        <Line
          data={d3.sort(dataset, (d) => d.x)}
          x-data={(d) => d.x}
          y-data={(d) => d.y}
          strokeWidth={2}
          stroke="#6bc2be"
        />
      </Cartesian>
    </Chart>
  </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleArea = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, Area } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice={true}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <Area
            data={d3.sort(dataset, (d) => d.x)}
            x-data={(d) => d.x}
            y-data={(d) => d.y}
            fill="#6bc2be"
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleTexts = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, Circles, Texts } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
const width = 400;
const height = 400;
const padding = 30;
const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
return (
  <svg width={width} height={height}>
    <Chart
      top={padding}
      left={padding}
      width={width - padding * 2}
      height={height - padding * 2}
    >
      <Cartesian
        x={{ scale: "linear", domain: xDomain }}
        y={{ scale: "linear", domain: yDomain }}
        nice={true}
      >
        <Grid>
          <Grid.XLines stroke="grey" />
          <Grid.YLines stroke="grey" />
          <Grid.XAxes stroke="black" strokeWidth={2} />
          <Grid.YAxes stroke="black" strokeWidth={2} />
          <Grid.XLabels padding={5} />
          <Grid.YLabels padding={5} />
        </Grid>

        <Texts
          data={dataset}
          x-data={(d) => d.x}
          y-data={(d) => d.y}
          y={-10}
          textAnchor="middle"
          text={(d) => d.key}
        />

        <Circles
          data={dataset}
          x-data={(d) => d.x}
          y-data={(d) => d.y}
          r={2}
          fill="#6bc2be"
        />
      </Cartesian>
    </Chart>
  </svg>
);
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleElements = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, Circles, CartesianConsumer, Elements, computePos, Style } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <CartesianConsumer>
            {({ xScale, yScale }) => (
              <Style strokeWidth={3} stroke="#6bc2be" opacity={0.5}>
                <Elements
                  data={dataset}
                  tag="line"
                  x1={padding}
                  x2={padding + 20}
                  y1={(d) => computePos(d.y, yScale)}
                  y2={(d) => computePos(d.y, yScale)}
                />
                <Elements
                  data={dataset}
                  tag="line"
                  x1={(d) => computePos(d.x, xScale)}
                  x2={(d) => computePos(d.x, xScale)}
                  y1={height - padding - 20}
                  y2={height - padding}
                />
              </Style>
            )}
          </CartesianConsumer>

          <Circles
            data={dataset}
            x-data={(d) => d.x}
            y-data={(d) => d.y}
            r={7}
            fill="#6bc2be"
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}

`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleBarsVerticalStacked = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, Bars, stackNarrow } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 40;

  const categories = ["Cat 1", "Cat 2", "Cat 3"];
  const colors = ["#011627", "#41EAD4", "#F71735"];
  const stackedData = stackNarrow({
    data: dataset,
    categories,
    getCategory: (d) => d.category,
    getGroup: (d) => d.serie,
    getValue: (d) => d.value
  });

  const xDomain = [...new Set(stackedData.map((d) => d.group))];
  const yDomain = d3.extent(stackedData, (d) => d.to) as [number, number];
  const colorScale = d3.scaleOrdinal(categories, colors);

  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "band", domain: xDomain, paddingInner: 0.1 }}
          y={{ scale: "linear", domain: yDomain }}
          nice
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <Bars
            data={stackedData}
            x-data={(d) => d.group}
            y-data={{ to: (d) => d.to, base: (d) => d.base }}
            fill={(d) => colorScale(d.category)}
          />

          <Grid>
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
          </Grid>
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataStackedTs,
    }}
  />
)

const ExamplePointData = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, PointData } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <PointData
            data={dataset}
            x={(d) => d.x}
            y={(d) => d.y}
            r={7}
            fill="${COLOR}"
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleLineData = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, LineData } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice={true}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <LineData
            data={d3.sort(dataset, (d) => d.x)}
            x={(d) => d.x}
            y={(d) => d.y}
            strokeWidth={2}
            stroke="#6bc2be"
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleAreaData = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, AreaData } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice={true}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <AreaData
            data={d3.sort(dataset, (d) => d.x)}
            x={(d) => d.x}
            y={(d) => d.y}
            fill="#6bc2be"
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleRectData = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, RectData } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice={true}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <RectData
            data={dataset}
            x={(d) => d.x}
            y={(d) => d.y}
            width={20}
            height={20}
            rx={6}
            fill="#6bc2be"
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleBarData = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, BarData } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = dataset.map((d) => d.key);
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "band", domain: xDomain, paddingInner: 0.1 }}
          y={{ scale: "linear", domain: yDomain }}
          nice={true}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>
          
          <BarData
          data={dataset}
          x={(d) => d.key}
          y={{ to: (d) => d.y, base: 0 }}
          fill="#6bc2be"
          />

          <Grid>
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
          </Grid>
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)
const ExampleStackedBarchart = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, BarData, stackNarrow } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 40;

  const categories = ["Cat 1", "Cat 2", "Cat 3"];
  const stackedData = stackNarrow({
    data: dataset,
    categories,
    getCategory: (d) => d.category,
    getGroup: (d) => d.serie,
    getValue: (d) => d.value
  });

  const xDomain = [...new Set(stackedData.map((d) => d.group))];
  const yDomain = d3.extent(stackedData, (d) => d.to) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "band", domain: xDomain, paddingInner: 0.1 }}
          y={{ scale: "linear", domain: yDomain }}
          color={{
            scale: "ordinal",
            domain: categories,
            range: ["#011627", "#41EAD4", "#F71735"]
          }}
          nice
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          {categories.map((cat) => (
            <BarData
              data={stackedData.filter((d) => d.category === cat)}
              x={(d) => d.group}
              y={{ to: (d) => d.to, base: (d) => d.base }}
              fill={(d) => d.category}
            />
          ))}

          <Grid>
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
          </Grid>
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataStackedTs,
    }}
  />
)

const ExampleLabelData = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, PointData, LabelsData } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  const xDomain = d3.extent(dataset, (d) => d.x) as [number, number];
  const yDomain = d3.extent(dataset, (d) => d.y) as [number, number];
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          nice={true}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <LabelsData
            data={dataset}
            dataX={(d) => d.x}
            dataY={(d) => d.y}
            textAnchor="middle"
            offsetY={-10}
            text={(d) => d.key}
          />

          <PointData
            data={dataset}
            x={(d) => d.x}
            y={(d) => d.y}
            r={2}
            fill="#6bc2be"
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
      'data.ts': dataTs,
    }}
  />
)

const ExampleLineFunction = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    hideTabs
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, LineFunction } from "react-composable-charts";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: [-1, 1] }}
          y={{ scale: "linear", domain: [-1, 1] }}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <LineFunction
            fn={(x) => Math.sin(x * Math.PI * 2) * 0.5}
            stroke="#6bc2be"
            strokeWidth={2}
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
    }}
  />
)

const ExampleAreaFunction = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    hideTabs
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, AreaFunction } from "react-composable-charts";

export default function App() {
  const width = 400;
  const height = 400;
  const padding = 30;
  return (
    <svg width={width} height={height}>
      <Chart
        top={padding}
        left={padding}
        width={width - padding * 2}
        height={height - padding * 2}
      >
        <Cartesian
          x={{ scale: "linear", domain: [-1, 1] }}
          y={{ scale: "linear", domain: [-1, 1] }}
        >
          <Grid>
            <Grid.XLines stroke="grey" />
            <Grid.YLines stroke="grey" />
            <Grid.XAxes stroke="black" strokeWidth={2} />
            <Grid.YAxes stroke="black" strokeWidth={2} />
            <Grid.XLabels padding={5} />
            <Grid.YLabels padding={5} />
          </Grid>

          <AreaFunction
            fn={(x) => Math.sin(x * Math.PI * 2) * 0.5 + 0.25}
            fnBase={(x) => Math.sin(x * Math.PI * 2) * 0.5 - 0.25}
            fill="#6bc2be"
            opacity={0.5}
          />
        </Cartesian>
      </Chart>
    </svg>
  );
}
`,
      },
    }}
  />
)

const TYPES = {
  dataValue: (
    <TypeTooltip tooltip={'type DataValue = string | number | Date'}>
      DataValue
    </TypeTooltip>
  ),
  dataValueArray: (
    <TypeTooltip tooltip={'type DataValue = string | number | Date'}>
      DataValue[]
    </TypeTooltip>
  ),

  filterDataValue: (
    <TypeTooltip
      tooltip={`
type DataValue = string | number | Date
        
type Filter<T> = (el: T, index: number, arr: T[]) => boolean`}
    >
      {'Filter<DataVaue>'}
    </TypeTooltip>
  ),
}

const PageContent: {
  title: React.ReactNode
  id: string
  level: number
  deprecated?: boolean
  deprecationMessage?: React.ReactNode
  content: React.ReactNode
}[] = [
  {
    title: 'Install',
    id: 'install',
    level: 0,
    content: (
      <p>
        <ExampleInstall />
      </p>
    ),
  },
  {
    title: 'Basic structure',
    id: 'basic-structure',
    level: 0,
    content: (
      <>
        <p>
          A "<Code>react-composable-</Code>chart" looks something like this:
        </p>

        <ExampleBasicStructure />

        <p>
          Note how <Code>{'<Chart>'}</Code> is placed inside a svg element. This
          allows to have multiple charts in the same svg element.
        </p>
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Chart</Code> component
      </>
    ),
    id: 'chart-component',
    level: 1,
    content: (
      <>
        <p>
          <Code>Chart</Code> defines where the chart is placed in the svg
          element. It also defines the size of the chart. The chart is placed in
          the svg element at the position defined by <Code>left</Code> and{' '}
          <Code>top</Code> props. The size of the chart is defined by{' '}
          <Code>width</Code> and <Code>height</Code> props.
        </p>
        <ExampleChart />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Cartesian</Code> component
      </>
    ),
    id: 'cartesian-component',
    level: 1,
    content: (
      <>
        <p>
          <Code>Cartesian</Code> create a "cartesian" chart. It defines the
          scales used to map data to the chart. The scales are defined by the{' '}
          <Code>x</Code> and <Code>y</Code> prop. It also allows to define an
          optional <Code>color</Code> scale.
        </p>
        <p>
          The component accepts also an optional <Code>nice</Code> prop that
          allows to use nice scales.
        </p>
        <ExampleCartesian />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Grid</Code> component
      </>
    ),
    id: 'grid-component',
    level: 1,
    content: (
      <>
        <p>
          <Code>Grid</Code> component allows to add a grid to the chart. It is
          composed of several sub-components: <Code>XLines</Code>,{' '}
          <Code>YLines</Code>, <Code>XLabels</Code>, <Code>YLabels</Code>,{' '}
          <Code>XAxes</Code> and <Code>YAxes</Code>.
        </p>
        <p>
          Every sub components can be used and styled independently. For
          example, if you want to add only the x lines, you can use the{' '}
          <Code>XLines</Code> component.
        </p>
        <p>
          It is also possible to pass props to <Code>Grid</Code> component that
          reflect to the entire grid, such as:
        </p>
        <PropsTable
          props={[
            {
              name: 'tickCount',
              doc: 'Wanted number of ticks to be displayes of each axis. This uses ticks function from d3, that may be different from the number of ticks displayed.',
              optional: true,
              type: 'number',
            },
            {
              name: 'tickSize',
              doc: (
                <>
                  Wanted distance between each tick. This uses ticks function
                  from d3, that may be different from the distance between ticks
                  displayed.
                  <br></br>
                  If <Code>tickCount</Code> is passed, this prop is ignored.
                </>
              ),
              optional: true,
              type: 'number',
            },
            {
              name: 'xAnchor',
              doc: 'position of x axes and x labels.',
              type: "'bottom' | 'top' | 'none'",
              default: 'none',
            },
            {
              name: 'yAnchor',
              doc: 'position of y axes and y labels.',
              default: 'none',
              type: "'left' | 'right' | 'none'",
            },
          ]}
        />
        <ExampleGrid />

        <h4>
          <Code>Grid.XLabels</Code> and <Code>Grid.YLabels</Code>
        </h4>

        <PropsTable
          props={[
            {
              name: 'padding',
              type: 'number',
              doc: 'padding between the label and the axis.',
              optional: true,
            },
            {
              name: 'format',
              type: '(allTicks: DataValue[]) => (tick: DataValue, i: number) => string',
              doc: 'higher order function to format the displayed ticks.',
              optional: true,
            },
            {
              name: 'inner',
              type: 'boolean',
              doc: 'if true, the labels are displayed inside the chart.',
              optional: true,
            },
            {
              name: 'filter',
              type: TYPES.filterDataValue,
              doc: 'function to filter the ticks.',
              optional: true,
            },
            {
              name: 'ticks',
              type: TYPES.dataValueArray,
              doc: (
                <>
                  Array of ticks to be displayed. This is used to override the
                  default ticks generated by <Code>Grid</Code>.
                </>
              ),
              optional: true,
            },
            {
              name: '...props',
              type: 'SvgAttributes & AnimationProps',
              doc: '',
            },
          ]}
        />

        <h4>
          <Code>Grid.XLines</Code> and <Code>Grid.YLines</Code>
        </h4>
        <PropsTable
          props={[
            {
              name: 'ticks',
              type: TYPES.dataValueArray,
              doc: (
                <>
                  Array of ticks to be displayed. This is used to override the
                  default ticks generated by <Code>Grid</Code>.
                </>
              ),
              optional: true,
            },
            {
              name: 'filter',
              type: TYPES.filterDataValue,
              doc: <>Function to filter the ticks.</>,
              optional: true,
            },
            {
              name: '...props',
              type: 'SvgAttributes & AnimationProps',
              doc: <></>,
            },
          ]}
        />
      </>
    ),
  },
  {
    title: 'Elements components',
    id: 'elements-components',
    level: 0,

    content: (
      <>
        <h4>
          <Code>data</Code> + <Code>dataKey</Code>
        </h4>
        <p>
          Elements components are used to render data in the chart. They usually
          accepts a <Code>data</Code> prop that is an array of objects. Each
          object represents a data point. The data components also accepts a{' '}
          <Code>dataKey</Code> prop that is used to uniquely identify each data
          point. The <Code>dataKey</Code> prop is used to animate the data
          points.
        </p>

        <h4>Svg attributes</h4>
        <p>
          Elements components also accepts a svg attributes as props. These can
          either be a value or a function that accepts an element of{' '}
          <Code>data</Code> and returns the value to be passed to the svg
          element. If a value is passed, it will be the same for all the data.
          Otherwise the function will be called per element of <Code>data</Code>
          .
          <p>
            {' '}
            In following example:
            <ul>
              <li>
                <Code>fill</Code> prop is a function that returns the value of
                the data point that should be passed to the fill attribute of
                the circle
              </li>
              <li>
                <Code>stroke</Code> prop is a value that will be the same for
                all the data points.
              </li>
            </ul>
          </p>
        </p>

        <ExampleElementsProps />

        <h4>Data attributes</h4>
        <p>
          Elements components also accepts <Code>*-data</Code> props, such as{' '}
          <Code>x-data</Code> or <Code>y-data</Code>. These are used to map the
          data point to the chart. This props should be a function that accepts
          an element of <Code>data</Code> and returns the <b>value</b> of the
          data point that should be passed to the scales.
        </p>

        <p>
          In the following example:
          <ul>
            <li>
              <Code>x-data</Code> prop is a function that returns the value of
              the data point that should be passed to the x scale (defined on
              the <Code>Cartesian</Code>)
            </li>
            <li>
              <Code>y-data</Code> prop is a function that returns the value of
              the data point that should be passed to the y scale (defined on
              the <Code>Cartesian</Code>)
            </li>
          </ul>
        </p>

        <ExampleElementsDataAttributes />
        <p>
          Each "elements" component has its set of <Code>*-data</Code>{' '}
          properties. Read each component documentation to understand which
          properties are available.
        </p>

        <h4>Event handlers</h4>
        <p>
          Element components acctepts event handlers such as{' '}
          <Code>onClick</Code>, <Code>onMouseOver</Code>,{' '}
          <Code>onMouseOut</Code> etc. These are functions that accepts two
          parameters:
          <ul>
            <li>
              native <Code>event</Code> object
            </li>
            <li>
              hovered <Code>datum</Code>
            </li>
          </ul>
        </p>

        <ExampleElementsEventHandlers />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Circles</Code>
      </>
    ),
    id: 'circles',
    level: 1,
    content: (
      <>
        <p>
          It renders a <Code>{'<circle>'}</Code> for each data point.
        </p>
        <h4>Props:</h4>
        <p>
          <PropsTable
            props={[
              {
                name: 'x-data',
                doc: (
                  <>
                    function that returns the value of the data point that
                    should be passed to the x scale (defined on the{' '}
                    <Code>Cartesian</Code>).
                  </>
                ),
                optional: true,
              },
              {
                name: 'y-data',
                doc: (
                  <>
                    function that returns the value of the data point that
                    should be passed to the x scale (defined on the{' '}
                    <Code>Cartesian</Code>).
                  </>
                ),
                optional: true,
              },

              {
                name: 'cx',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>cx</Code> attribute. If{' '}
                    <Code>x-data</Code> prop is passed, the result of this
                    function will be summed to the <Code>cx</Code> prop.
                  </>
                ),
                optional: true,
              },
              {
                name: 'cy',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>cy</Code> attribute. If{' '}
                    <Code>y-data</Code> prop is passed, the result of this
                    function will be summed to the <Code>cy</Code> prop.
                  </>
                ),
                optional: true,
              },
            ]}
          />
        </p>
        <h4>Example:</h4>

        <ExampleCircles />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Bars</Code>
      </>
    ),
    id: 'bars',
    level: 1,

    content: (
      <>
        <p>
          It renders a <Code>{'<rect>'}</Code> for each data point. This
          component is useful to render barcharts due to its
          <Code>x-data</Code> and <Code>y-data</Code> props that allows to
          specify the start and end of the bar.
        </p>
        <h4>Props:</h4>
        <p>
          <PropsTable
            props={[
              {
                name: 'x-data',
                doc: (
                  <>
                    It can either be a function that returns the value of the
                    data point or an object with <Code>base</Code> and{' '}
                    <Code>to</Code> props. The <Code>base</Code> prop is the
                    start of the bar and the <Code>to</Code> prop is the end of
                    the bar.
                    <br></br>
                    <br></br>
                    If <Code>base</Code> is missing, it will be set to the
                    "domain zero".
                  </>
                ),
                optional: true,
              },
              {
                name: 'y-data',
                doc: (
                  <>
                    It can either be a function that returns the value of the
                    data point or an object with <Code>base</Code> and{' '}
                    <Code>to</Code> props. The <Code>base</Code> prop is the
                    start of the bar and the <Code>to</Code> prop is the end of
                    the bar.
                    <br></br>
                    <br></br>
                    If <Code>base</Code> is missing, it will be set to the
                    "domain zero".
                  </>
                ),
                optional: true,
              },
              {
                name: 'x',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>x</Code> attribute. If{' '}
                    <Code>x-data</Code> prop is passed, the result of this
                    function will be summed to the <Code>x</Code> prop.
                  </>
                ),
                optional: true,
              },
              {
                name: 'y',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>y</Code> attribute. If{' '}
                    <Code>y-data</Code> prop is passed, the result of this
                    function will be summed to the <Code>y</Code> prop.
                  </>
                ),
                optional: true,
              },
              {
                name: 'width',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>width</Code> attribute.
                    If <Code>x-data</Code> prop is passed, the result of this
                    function will be summed to the <Code>width</Code> prop.
                  </>
                ),
              },
              {
                name: 'height',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>height</Code> attribute.
                    If <Code>y-data</Code> prop is passed, the result of this
                    function will be summed to the <Code>height</Code> prop.
                  </>
                ),
              },
            ]}
          />
        </p>
        <h4>Example:</h4>
        <ExampleBarsVertical />
        <p>
          If you want to render a stacked barchart, you can use the{' '}
          <Code>stackNarrow</Code> function.
        </p>
        <ExampleBarsVerticalStacked />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Rects</Code>
      </>
    ),
    id: 'rects',
    level: 1,
    content: (
      <>
        <p>
          It renders a <Code>{'<rect>'}</Code> for each data point.
        </p>
        <h4>Props:</h4>

        <p>
          <PropsTable
            props={[
              {
                name: 'x-data',
                doc: (
                  <>
                    function that returns the value of the data point that
                    should be passed to the x scale (defined on the{' '}
                    <Code>Cartesian</Code>).
                  </>
                ),
                optional: true,
              },
              {
                name: 'y-data',
                doc: (
                  <>
                    function that returns the value of the data point that
                    should be passed to the y scale (defined on the{' '}
                    <Code>Cartesian</Code>).
                  </>
                ),
                optional: true,
              },
              {
                name: 'x',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>x</Code> attribute. If{' '}
                    <Code>x-data</Code> prop is passed, the result of this
                    function will be summed to the <Code>x</Code> prop.
                  </>
                ),
                optional: true,
              },
              {
                name: 'y',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>y</Code> attribute. If{' '}
                    <Code>y-data</Code> prop is passed, the result of this
                    function will be summed to the <Code>y</Code> prop.
                  </>
                ),
                optional: true,
              },
              {
                name: 'width',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>width</Code> attribute.
                  </>
                ),
                optional: true,
              },
              {
                name: 'height',
                doc: (
                  <>
                    value or function that returns the value of the data point
                    that should be passed to the <Code>height</Code> attribute.
                  </>
                ),
                optional: true,
              },
            ]}
          />
        </p>

        <h4>Example:</h4>

        <ExampleRects />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Line</Code>
      </>
    ),
    id: 'line',
    level: 1,
    content: (
      <>
        <p>
          It renders a <Code>{'<path>'}</Code> passing through each data point.
        </p>
        <h4>Props:</h4>
        <PropsTable
          props={[
            {
              name: 'x-data',
              doc: (
                <>
                  function that returns the value of the data point that should
                  be passed to the x scale (defined on the{' '}
                  <Code>Cartesian</Code>).
                </>
              ),
              optional: true,
            },
            {
              name: 'y-data',
              doc: (
                <>
                  function that returns the value of the data point that should
                  be passed to the y scale (defined on the{' '}
                  <Code>Cartesian</Code>).
                </>
              ),
              optional: true,
            },
            {
              name: 'curve',
              doc: <>type of curve to be used.</>,
              default: 'line',
              optional: true,
            },
            {
              name: 'x',
              doc: (
                <>
                  value or function that returns the value of the data point
                  that should be used to calculate the position for each point
                  of the path. If <Code>x-data</Code> prop is passed, the result
                  of this function will be summed to the <Code>x</Code> prop.
                </>
              ),
            },
            {
              name: 'y',
              doc: (
                <>
                  value or function that returns the value of the data point
                  that should be used to calculate the position for each point
                  of the path. If <Code>y-data</Code> prop is passed, the result
                  of this function will be summed to the <Code>y</Code> prop.
                </>
              ),
            },
          ]}
        />
        <h4>Example:</h4>
        <ExampleLine />
      </>
    ),
  },

  {
    title: (
      <>
        <Code>Area</Code>
      </>
    ),
    id: 'area',
    level: 1,
    content: (
      <>
        <p>
          It renders a <Code>{'<path>'}</Code> that fills the area between the
          line and the x axis.
        </p>
        <h4>Props:</h4>
        <PropsTable
          props={[
            {
              name: 'x-data',
              doc: (
                <>
                  function that returns the value of the data point that should
                  be passed to the x scale (defined on the{' '}
                  <Code>Cartesian</Code>).
                </>
              ),
              optional: true,
            },
            {
              name: 'y-data',
              doc: (
                <>
                  It can either be a function that returns the value of the data
                  point or an object with <Code>base</Code> and <Code>to</Code>{' '}
                  props. The <Code>base</Code> prop is the start of the bar and
                  the <Code>to</Code> prop is the end of the bar.
                  <br></br>
                  <br></br>
                  If <Code>base</Code> is missing, it will be set to the "domain
                  zero".
                </>
              ),
              optional: true,
            },
            {
              name: 'curve',
              doc: <>type of curve to be used.</>,
              default: 'line',
              optional: true,
            },
            {
              name: 'x',
              doc: (
                <>
                  value or function that returns the value of the data point
                  that should be used to calculate the position for each point
                  of the path. If <Code>x-data</Code> prop is passed, the result
                  of this function will be summed to the <Code>x</Code> prop.
                </>
              ),
            },
            {
              name: 'y1',
              doc: (
                <>
                  value or function that returns the value of the data point
                  that should be used to calculate the position for each point
                  of the path. If <Code>base</Code> is passed to{' '}
                  <Code>y-data</Code> prop, the result of this function will be
                  summed to the <Code>y1</Code> prop.
                </>
              ),
            },
            {
              name: 'y2',
              doc: (
                <>
                  value or function that returns the value of the data point
                  that should be used to calculate the position for each point
                  of the path. If <Code>to</Code> is passed to{' '}
                  <Code>y-data</Code> prop, the result of this function will be
                  summed to the <Code>y2</Code> prop.
                </>
              ),
            },
          ]}
        />
        <h4>Example:</h4>
        <ExampleArea />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Texts</Code>
      </>
    ),
    id: 'texts',
    level: 1,
    content: (
      <>
        <p>
          It renders a <Code>{'<text>'}</Code> for each data point.
        </p>
        <h4>Props:</h4>
        <PropsTable
          props={[
            {
              name: 'x-data',
              doc: (
                <>
                  function that returns the value of the data point that should
                  be passed to the x scale (defined on the{' '}
                  <Code>Cartesian</Code>).
                </>
              ),
            },
            {
              name: 'y-data',
              doc: (
                <>
                  function that returns the value of the data point that should
                  be passed to the y scale (defined on the{' '}
                  <Code>Cartesian</Code>).
                </>
              ),
            },
            {
              name: 'text',
              doc: (
                <>
                  value or function that returns the value of the data point
                  that should be rendered inside the <Code>{'<text>'}</Code>{' '}
                  element.
                </>
              ),
            },
            {
              name: 'x',
              doc: (
                <>
                  value or function that returns the value of the data point
                  that should be passed to the <Code>x</Code> attribute. If{' '}
                  <Code>x-data</Code> prop is passed, the result of this
                  function will be summed to the <Code>x</Code> prop.
                </>
              ),
            },
            {
              name: 'y',
              doc: (
                <>
                  value or function that returns the value of the data point
                  that should be passed to the <Code>y</Code> attribute. If{' '}
                  <Code>y-data</Code> prop is passed, the result of this
                  function will be summed to the <Code>y</Code> prop.
                </>
              ),
            },
          ]}
        />
        <h4>Example:</h4>
        <ExampleTexts />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>Elements</Code>
      </>
    ),
    id: 'elements',
    level: 1,
    content: (
      <>
        <p>
          <Code>Elements</Code> is a generic component that allows to render
          multiple elements components at once. It accepts a <Code>tag</Code>{' '}
          prop that defines the type of element to render
        </p>

        <h4>Example:</h4>

        <ExampleElements />
      </>
    ),
  },

  {
    title: 'Data components',
    id: 'data-components',
    level: 0,
    deprecated: true,
    deprecationMessage: <>since v0.2.0.</>,
    content: (
      <>
        <p>
          Data components are used to render data in the chart. They usually
          accepts a <Code>data</Code> prop that is an array of objects. Each
          object represents a data point. The data components also accepts a{' '}
          <Code>dataKey</Code> prop that is used to uniquely identify each data
          point. The <Code>dataKey</Code> prop is used to animate the data
          points.
        </p>
        <p>
          Data components also accepts a <Code>x</Code> and <Code>y</Code> prop.
          These are used to map the data point to the chart. This props should
          be a function that accepts an element of <Code>data</Code> and returns
          the <b>value</b> of the data point that should be passed to the x and
          y scales.
        </p>
        <p>
          Finally, data components accept styiling props such as{' '}
          <Code>fill</Code>, <Code>stroke</Code>, <Code>strokeWidth</Code> etc.
          If a <Code>color</Code> prop is passed to the containing{' '}
          <Code>Cartesian</Code> component, a function can be passed to{' '}
          <Code>fill</Code> and <Code>stroke</Code> props. This function will be
          called per element of <Code>data</Code> and should return the{' '}
          <b>value</b> to be passed to the color scale.
        </p>
      </>
    ),
  },
  {
    title: (
      <>
        <Code>PointData</Code>
      </>
    ),
    id: 'point-data',
    level: 1,
    deprecated: true,
    deprecationMessage: (
      <>
        since v0.2.0. Use <Code>Circles</Code> instead
      </>
    ),
    content: (
      <>
        <ExamplePointData />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>RectData</Code>
      </>
    ),
    id: 'rect-data',
    level: 1,
    deprecated: true,
    deprecationMessage: (
      <>
        since v0.2.0. Use <Code>Rects</Code> instead
      </>
    ),
    content: (
      <>
        <ExampleRectData />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>BarData</Code>
      </>
    ),
    id: 'bar-data',
    level: 1,
    deprecated: true,
    deprecationMessage: (
      <>
        since v0.2.0. Use <Code>Bars</Code> instead
      </>
    ),
    content: (
      <>
        <p>
          <Code>BarData</Code> is a special data component that allows to render
          bars (rects) for each data point specifing the start and end of the
          bar. To do so, <Code>x</Code> and <Code>y</Code> props accepts an
          object with <Code>base</Code> (the bar bottom) and <Code>to</Code>{' '}
          (the bar top). Here an example of vertical barchart.
        </p>
        <ExampleBarData />

        <p>
          If you want to render a stacked barchart, you can use the{' '}
          <Code>stackNarrow</Code> function.
        </p>
        <ExampleStackedBarchart />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>LineData</Code>
      </>
    ),
    id: 'line-data',
    level: 1,
    deprecated: true,
    deprecationMessage: (
      <>
        since v0.2.0. Use <Code>Line</Code> instead
      </>
    ),
    content: (
      <>
        <ExampleLineData />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>AreaData</Code>
      </>
    ),
    id: 'area-data',
    level: 1,
    deprecated: true,
    deprecationMessage: (
      <>
        {' '}
        since v0.2.0. Use <Code>Area</Code> instead
      </>
    ),
    content: (
      <>
        <p>
          As for <Code>BarData</Code>, <Code>AreaData</Code> accepts an object
          with <Code>base</Code> and <Code>to</Code> props for <Code>y</Code>{' '}
          props.
        </p>
        <ExampleAreaData />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>LabelsData</Code>
      </>
    ),
    id: 'labels-data',
    level: 1,
    deprecated: true,
    deprecationMessage: (
      <>
        since v0.2.0. Use <Code>Tests</Code> instead
      </>
    ),
    content: (
      <>
        <p>
          <Code>LabelsData</Code> is a special data component that allows to
          render labels for each data points. Instead of accepting only{' '}
          <Code>x</Code> and <Code>y</Code> props, it accepts:
          <ul>
            <li>
              <Code>dataX</Code> and <Code>dataY</Code> are functions that
              accept an element of data and returns the <b>value</b> of the data
              point that should be passed to the x and y scales. These works
              like the <Code>x</Code> and <Code>y</Code> props of the other data
              components.
            </li>
            <li>
              <Code>offsetX</Code> and <Code>offsetY</Code> are number
              representing the offset in pixels from the position defined by{' '}
              <Code>dataX</Code> and <Code>dataY</Code>.
            </li>
            <li>
              <Code>positionX</Code> and <Code>positionY</Code> are functions
              that accept an element of data and returns the <b>position</b> in
              pixels.
            </li>
          </ul>
        </p>
        <ExampleLabelData />
      </>
    ),
  },
  {
    title: 'Function components',
    id: 'function-components',
    level: 0,
    deprecated: true,
    deprecationMessage: <>since v0.2.0.</>,
    content: (
      <>
        <p>
          Function components are used to render a function in the chart. They
          usually accepts a <Code>fn</Code> prop that is a function that accepts
          a x value and returns a y value.
        </p>
      </>
    ),
  },
  {
    title: (
      <>
        <Code>LineFunction</Code>
      </>
    ),
    id: 'line-function',
    level: 1,
    deprecated: true,
    deprecationMessage: <>since v0.2.0.</>,
    content: (
      <>
        <ExampleLineFunction />
      </>
    ),
  },
  {
    title: (
      <>
        <Code>AreaFunction</Code>
      </>
    ),
    id: 'area-function',
    level: 1,
    deprecated: true,
    deprecationMessage: <>since v0.2.0.</>,
    content: (
      <>
        <ExampleAreaFunction />
      </>
    ),
  },
  {
    title: 'More examples',
    id: 'more-examples',
    level: 0,
    content: <></>,
  },
  {
    title: 'Animated Scatterplot',
    id: 'animated-scatterplot',
    level: 1,

    content: (
      <>
        <div>
          <CodeSandboxEmbed src="https://codesandbox.io/embed/rcc-scatterplot-gus8g?fontsize=14&hidenavigation=1&theme=dark" />
        </div>
      </>
    ),
  },
  {
    title: 'Stacked Area Chart',
    id: 'stacked-area-chart',
    level: 1,

    content: (
      <>
        <div>
          <CodeSandboxEmbed src="https://codesandbox.io/embed/rcc-stacked-area-graph-d1xrx?fontsize=14&hidenavigation=1&theme=dark" />
        </div>
      </>
    ),
  },
]
