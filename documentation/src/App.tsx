import { CodeSandboxEmbed } from './CodesandboxEmbed'
import { Code } from './Code'
import { CodeSandbox } from './CodeSandobx'

function App() {
  return (
    <div className="main">
      <h1>React Composable Charts</h1>

      <h2>Install</h2>

      <ExampleInstall />

      <h2>Basic structure</h2>

      <p>
        A "<Code>react-composable-</Code>chart" looks something like this:
      </p>

      <ExampleBasicStructure />

      <p>
        Note how <Code>{'<Chart>'}</Code> is placed inside a svg element. This
        allows to have multiple charts in the same svg element.
      </p>

      <h2>
        <Code>Chart</Code> component
      </h2>
      <ExampleChart />

      <h2>
        <Code>Cartesian</Code> component
      </h2>
      <ExampleCartesian />

      <h2>
        <Code>Grid</Code> component
      </h2>
      <ExampleGrid />

      <CodeSandboxEmbed src="https://codesandbox.io/embed/rcc-scatterplot-gus8g?fontsize=14&hidenavigation=1&theme=dark" />

      <CodeSandboxEmbed src="https://codesandbox.io/embed/rcc-stacked-area-graph-d1xrx?fontsize=14&hidenavigation=1&theme=dark" />
    </div>
  )
}

export default App

const dataTs = /* tsx */ `export const dataset = [
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
    editorStyle={{ height: 220 }}
    hideLineNumbers
    hidePreview
    hideTabs
    readOnly
    files={{
      'App.tsx': /* tsx */ `<svg>
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

export const ExampleChart = () => (
  <CodeSandbox
    readOnly
    hidePreview
    hideTabs
    editorStyle={{ height: 320 }}
    files={{
      '/App.tsx': {
        code: /* tsx */ `import { Chart } from 'react-composable-charts'

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

export const ExampleCartesian = () => (
  <CodeSandbox
    readOnly
    hidePreview
    editorStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: /* tsx */ `import { Chart, Cartesian } from "react-composable-charts";
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

export const ExampleGrid = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: /* tsx */ `import { Chart, Cartesian, Grid } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="blue" />
    <Grid.YLines stroke="blue" />
    <Grid.XLabels stroke="red" padding={5} />
    <Grid.YLabels stroke="red" padding={5} />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
  </Grid>
)

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
          <ChartGrid />
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
