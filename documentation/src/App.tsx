import { CodeSandboxEmbed } from './CodesandboxEmbed'
import { Code } from './Code'
import { CodeSandbox } from './CodeSandbox'

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

      <h2>Data components</h2>
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

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
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

export const ExamplePointData = () => (
  <CodeSandbox
    editorStyle={{ height: 540 }}
    preivewStyle={{ height: 540 }}
    files={{
      '/App.tsx': {
        code: `import { Chart, Cartesian, Grid, PointData } from "react-composable-charts";
import * as d3 from "d3";
import { dataset } from "./data";

const Data = () => (
  <PointData
    data={dataset}
    x={(d) => d.x}
    y={(d) => d.y}
    r={7}
    fill="${COLOR}"   
  />
);

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
          <Data />
        </Cartesian>
      </Chart>
    </svg>
  );
}

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
  </Grid>
)
              
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

const Data = () => (
  <LineData
    data={d3.sort(dataset, (d) => d.x)}
    x={(d) => d.x}
    y={(d) => d.y}
    strokeWidth={2}
    stroke="${COLOR}"
  />
);

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
          <Data />
        </Cartesian>
      </Chart>
    </svg>
  );
}

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
  </Grid>
)
              
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

const Data = () => (
  <AreaData
    data={d3.sort(dataset, (d) => d.x)}
    x={(d) => d.x}
    y={(d) => d.y}
    fill="${COLOR}"
  />
);

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
          <Data />
        </Cartesian>
      </Chart>
    </svg>
  );
}

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
  </Grid>
)
              
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

const Data = () => (
  <RectData
    data={dataset}
    x={(d) => d.x}
    y={(d) => d.y}
    width={20}
    height={20}
    rx={6}
    fill="${COLOR}"
  />
);

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
          <Data />
        </Cartesian>
      </Chart>
    </svg>
  );
}

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
  </Grid>
)
              
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

const Data = () => (
  <BarData
    data={dataset}
    x={(d) => d.key}
    y={{ to: (d) => d.y }}
    fill="${COLOR}"
  />
);

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
          <ChartGrid />
          <Data />
        </Cartesian>
      </Chart>
    </svg>
  );
}

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
  </Grid>
)
              
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

const Data = () => (
  <>
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
      fill="${COLOR}"   
    />
  </>
);

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
          <Data />
        </Cartesian>
      </Chart>
    </svg>
  );
}

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
  </Grid>
)
              
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

const Data = () => (
  <LineFunction
    fn={(x) => Math.sin(x * Math.PI * 2) * 0.5}
    stroke="${COLOR}"
    strokeWidth={2}
  />
);

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
          <ChartGrid />
          <Data />
        </Cartesian>
      </Chart>
    </svg>
  );
}

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
  </Grid>
);

              
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

const Data = () => (
  <AreaFunction
    fn={(x) => Math.sin(x * Math.PI * 2) * 0.5 + 0.25}
    fnBase={(x) => Math.sin(x * Math.PI * 2) * 0.5 - 0.25}
    fill="${COLOR}"
    opacity={0.5}
  />
);

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
          <ChartGrid />
          <Data />
        </Cartesian>
      </Chart>
    </svg>
  );
}

const ChartGrid = () => (
  <Grid>
    <Grid.XLines stroke="grey" />
    <Grid.YLines stroke="grey" />
    <Grid.XAxes stroke="black" strokeWidth={2} />
    <Grid.YAxes stroke="black" strokeWidth={2} />
    <Grid.XLabels padding={5} />
    <Grid.YLabels padding={5} />
  </Grid>
);
              
`,
      },
    }}
  />
)
