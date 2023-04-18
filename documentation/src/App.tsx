import { CodeSandboxEmbed } from './CodesandboxEmbed'
import { Code } from './Code'
import { CodeSandbox } from './CodeSandbox'

function Table({ cells }: { cells: React.ReactNode[][] }) {
  const tdStyle = {
    border: '1px solid #cdcdcd',
    padding: '0.75rem',
  }
  return (
    <table style={{ border: '1px solid #cdcdcd', borderCollapse: 'collapse' }}>
      <tbody style={{ border: 'inherit' }}>
        {cells.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td key={j} style={tdStyle}>
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

      <p>
        <Code>Chart</Code> defines where the chart is placed in the svg element.
        It also defines the size of the chart. The chart is placed in the svg
        element at the position defined by <Code>left</Code> and{' '}
        <Code>top</Code> props. The size of the chart is defined by{' '}
        <Code>width</Code> and <Code>height</Code> props.
      </p>
      <ExampleChart />

      <h2>
        <Code>Cartesian</Code> component
      </h2>

      <p>
        <Code>Cartesian</Code> create a "cartesian" chart. It defines the scales
        used to map data to the chart. The scales are defined by the{' '}
        <Code>x</Code> and <Code>y</Code> prop. It also allows to define an
        optional <Code>color</Code> scale.
      </p>

      <p>
        The component accepts also an optional <Code>nice</Code> prop that
        allows to use nice scales.
      </p>
      <ExampleCartesian />

      <h2>
        <Code>Grid</Code> component
      </h2>

      <p>
        <Code>Grid</Code> component allows to add a grid to the chart. It is
        composed of several sub-components: <Code>XLines</Code>,{' '}
        <Code>YLines</Code>, <Code>XLabels</Code>, <Code>YLabels</Code>,{' '}
        <Code>XAxes</Code> and <Code>YAxes</Code>.
      </p>

      <p>
        Every sub components can be used and styled independently. For example,
        if you want to add only the x lines, you can use the <Code>XLines</Code>{' '}
        component.
      </p>

      <p>
        It is also possible to pass props to <Code>Grid</Code> component that
        reflect to the entire grid, such as <Code>tickCount</Code> or{' '}
        <Code>tickSize</Code>.
      </p>

      <ExampleGrid />

      <h2>Data components</h2>

      <p>
        Data components are used to render data in the chart. They usually
        accepts a <Code>data</Code> prop that is an array of objects. Each
        object represents a data point. The data components also accepts a{' '}
        <Code>dataKey</Code> prop that is used to uniquely identify each data
        point. The <Code>dataKey</Code> prop is used to animate the data points.
      </p>

      <p>
        Data components also accepts a <Code>x</Code> and <Code>y</Code> prop.
        These are used to map the data point to the chart. This props should be
        a function that accepts an element of <Code>data</Code> and returns the{' '}
        <b>value</b> of the data point that should be passed to the x and y
        scales.
      </p>

      <p>
        Finally, data components accept styiling props such as <Code>fill</Code>
        , <Code>stroke</Code>, <Code>strokeWidth</Code> etc. If a{' '}
        <Code>color</Code> prop is passed to the containing{' '}
        <Code>Cartesian</Code> component, a function can be passed to{' '}
        <Code>fill</Code> and <Code>stroke</Code> props. This function will be
        called per element of <Code>data</Code> and should return the{' '}
        <b>value</b> to be passed to the color scale.
      </p>

      <h3>
        <Code>PointData</Code>
      </h3>
      <ExamplePointData />

      <h3>
        <Code>LineData</Code>
      </h3>
      <ExampleLineData />

      <h3>
        <Code>AreaData</Code>
      </h3>
      <ExampleAreaData />

      <h3>
        <Code>RectData</Code>
      </h3>
      <ExampleRectData />

      <h3>
        <Code>BarData</Code>
      </h3>
      <ExampleBarData />

      <h3>
        <Code>LabelsData</Code>
      </h3>

      <p>
        <Code>LabelsData</Code> is a special data component that allows to
        render labels for each data points. Instead of accepting only{' '}
        <Code>x</Code> and <Code>y</Code> props, it accepts:
        <ul>
          <li>
            <Code>dataX</Code> and <Code>dataY</Code> are functions that accept
            an element of data and returns the <b>value</b> of the data point
            that should be passed to the x and y scales. These works like the{' '}
            <Code>x</Code> and <Code>y</Code> props of the other data
            components.
          </li>
          <li>
            <Code>offsetX</Code> and <Code>offsetY</Code> are number
            representing the offset in pixels from the position defined by{' '}
            <Code>dataX</Code> and <Code>dataY</Code>.
          </li>
          <li>
            <Code>positionX</Code> and <Code>positionY</Code> are functions that
            accept an element of data and returns the <b>position</b> in pixels.
          </li>
        </ul>
      </p>
      <ExampleLabelData />

      <h2>Function components</h2>
      <h3>
        <Code>LineFunction</Code>
      </h3>
      <ExampleLineFunction />

      <h3>
        <Code>AreaFunction</Code>
      </h3>
      <ExampleAreaFunction />

      <CodeSandboxEmbed src="https://codesandbox.io/embed/rcc-scatterplot-gus8g?fontsize=14&hidenavigation=1&theme=dark" />

      <CodeSandboxEmbed src="https://codesandbox.io/embed/rcc-stacked-area-graph-d1xrx?fontsize=14&hidenavigation=1&theme=dark" />
    </div>
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
    editorStyle={{ height: 220 }}
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

export const ExampleChart = () => (
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

export const ExampleCartesian = () => (
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

export const ExampleGrid = () => (
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
          <Grid>
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

export const ExamplePointData = () => (
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

export const ExampleLineData = () => (
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

export const ExampleAreaData = () => (
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

export const ExampleRectData = () => (
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

export const ExampleBarData = () => (
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
          x={{ scale: "band", domain: xDomain }}
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

          <BarData
            data={dataset}
            x={(d) => d.key}
            y={{ to: (d) => d.y }}
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

export const ExampleLabelData = () => (
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

export const ExampleLineFunction = () => (
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

export const ExampleAreaFunction = () => (
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
