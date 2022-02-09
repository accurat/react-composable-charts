import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Chart, ChartProps } from '../src'

const meta: Meta = {
  title: 'Welcome',
  component: Chart,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<ChartProps> = (args) => <Chart {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
