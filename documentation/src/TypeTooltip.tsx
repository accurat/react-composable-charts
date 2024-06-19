import { ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Code } from './Code'
import { CodeSandbox } from './CodeSandbox'

export const TypeTooltip = ({
  children,
  tooltip,
}: {
  children?: ReactNode
  tooltip?: string
}) => {
  console.log('tooltip: ', tooltip)
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            style={{
              cursor: 'pointer',
              all: 'unset',
              borderBottom: '1px solid #6bc2be',
              paddingBottom: 2,
            }}
          >
            <Code>{children}</Code>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          {tooltip && (
            <Tooltip.Content
              sideOffset={5}
              style={{
                boxShadow:
                  'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
              }}
            >
              <CodeSandbox
                editorStyle={{ height: 'auto' }}
                hideLineNumbers
                hidePreview
                hideTabs
                readOnly
                files={{ 'App.tsx': tooltip.trim() }}
              />

              <Tooltip.Arrow style={{ fill: 'white' }} />
            </Tooltip.Content>
          )}
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
