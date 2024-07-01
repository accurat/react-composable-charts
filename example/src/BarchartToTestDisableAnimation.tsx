import { useState } from 'react'
import * as _ from 'lodash-es'
import { makeLayout } from 'yogurt-layout'
import {
  Bars,
  Cartesian,
  CartesianConsumer,
  Chart,
  Elements,
  Grid,
  ScaleCategorical,
  ScaleContinuous,
  Svg,
} from '../../src'

type Datum = {
  label: string
  icon: string
  color: string
  value: number
}

const iconWidth = 30
const iconHeight = 30

export function BarchartToTestDisableAnimation({}) {
  const [dataset, setDataset] = useState<Datum[]>(createDataset)

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
        <button onClick={() => setDataset(createDataset())}>shuffle</button>
      </div>

      <Svg width={layout.svg.width} height={layout.svg.height}>
        <Chart {...layout.chart}>
          <Cartesian
            x={{ scale: 'linear', domain: [0, 100] }}
            y={{
              scale: 'band',
              domain: dataset.map((d) => d.label),
              paddingInner: 0.1,
            }}
            nice={true}
          >
            <Grid>
              <Grid.YLines stroke="grey" />
              <Grid.XLines stroke="grey" />
              <Grid.YLabels padding={5} />
              <Grid.XLabels padding={5} />
            </Grid>

            <CartesianConsumer>
              {({ xScale: xScaleTmp, yScale: yScaleTmp }) => {
                const xScale = xScaleTmp as ScaleContinuous
                const yScale = yScaleTmp as ScaleCategorical

                return (
                  <g>
                    <Bars
                      data={dataset}
                      dataKey={(_, i) => i}
                      enter={{ opacity: 0, fill: 'tomato' }}
                      x-data={{ base: 0, to: (d) => d.value }}
                      y-data={(d) => d.label}
                      fill={(d) => d.color}
                      disableAnimationByAttr={{ fill: true }}
                    />
                    <Elements
                      data={dataset}
                      dataKey={(_, i) => i}
                      tag="image"
                      enter={{
                        // @ts-ignore
                        href: (d: Datum) => getIconHref(d.icon),
                        opacity: 0,
                        width: 0,
                        height: 0,
                      }}
                      x={(d: Datum) => xScale(d.value) - iconWidth - 10}
                      y={(d: Datum) => yScale(d.label) + yScale.bandwidth() / 2 - iconHeight / 2}
                      href={(d: Datum) => getIconHref(d.icon)}
                      opacity={1}
                      width={iconWidth}
                      height={iconHeight}
                      disableAnimation={false}
                      disableAnimationByAttr={{ href: true }}
                    />
                  </g>
                )
              }}
            </CartesianConsumer>

            <Grid>
              <Grid.YAxes stroke="white" strokeWidth={2} />
              <Grid.XAxes stroke="white" strokeWidth={2} />
            </Grid>
          </Cartesian>
        </Chart>
      </Svg>
    </div>
  )
}

function createDataset() {
  const colors = ['#f6cf65', '#FF9C97', '#6b93bd', '#95CFB7', '#D4838F', '#C9B180']
  const iconsAndLabels = [
    {
      label: 'Pictogram_3x3-Basketball_Filled_Black_RGB',
      icon: 'https://og-icons.ocsddna.net/icons/countries/large/BRA.png',
    },
    {
      label: 'Pictogram_Gymnastics-Artistic_Outlined_White_RGB',
      icon: 'https://og-icons.ocsddna.net/icons/countries/large/ITA.png',
    },
    {
      label: 'Afghanistan',
      icon: 'https://og-icons.ocsddna.net/icons/disciplines/VVO_filled_black.png',
    },
    {
      label: 'Argentina',
      icon: 'https://og-icons.ocsddna.net/icons/disciplines/TEN_filled_black.png',
    },
    {
      label: 'Australia',
      icon: 'https://og-icons.ocsddna.net/icons/disciplines/VVO_filled_black.png',
    },
    {
      label: 'Italy',
      icon: 'https://og-icons.ocsddna.net/icons/disciplines/VVO_filled_black.png',
    },
  ]

  const casuallySortedColors = _.shuffle(colors)
  const casuallySortedIconsAndLabels = _.shuffle(iconsAndLabels)

  return colors.map((_colorHex, i) => {
    const iconAndLabel = casuallySortedIconsAndLabels[i]
    const color = casuallySortedColors[i]

    return {
      label: i.toString(),
      icon: iconAndLabel.icon,
      color,
      value: _.random(0, 100),
    } as Datum
  })
}

function getIconHref(icon: string) {
  return icon
}
