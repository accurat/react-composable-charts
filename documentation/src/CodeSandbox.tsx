import {
  SandpackCodeEditor,
  SandpackFiles,
  SandpackLayout,
  SandpackPredefinedTemplate,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { CSSProperties } from 'react'

export const RCC_VERSION = '0.2.0'

const dependencies = {
  'react-composable-charts': RCC_VERSION,
  d3: 'latest',
  '@types/d3': 'latest',
}

export const CodeSandbox = ({
  hidePreview = false,
  style = {},
  editorStyle = {},
  preivewStyle = {},
  readOnly = false,
  files = {},
  hideLineNumbers = false,
  hideTabs = false,
  template = 'react-ts',
}: {
  hidePreview?: boolean
  style?: CSSProperties
  editorStyle?: CSSProperties
  preivewStyle?: CSSProperties
  readOnly?: boolean
  files?: SandpackFiles
  hideLineNumbers?: boolean
  hideTabs?: boolean
  template?: SandpackPredefinedTemplate
}) => (
  <div>
    <SandpackProvider
      files={files}
      template={template}
      customSetup={{ dependencies }}
      style={style}
    >
      <SandpackLayout>
        <SandpackCodeEditor
          style={editorStyle}
          readOnly={readOnly}
          showReadOnly={false}
          showTabs={!hideTabs}
          showLineNumbers={!hideLineNumbers}
        />
        {!hidePreview && <SandpackPreview style={preivewStyle} />}
      </SandpackLayout>
    </SandpackProvider>
  </div>
)
