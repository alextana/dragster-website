'use client'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { vueMain, vueItem, reactMain } from './data'
import { useState } from 'react'
import { Icon } from '@iconify/react'

const CodeExamples = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>('vue')
  const frameworks = [
    // {
    //   id: 0,
    //   name: 'react',
    //   icon: <Icon width='30' icon='logos:react' />,
    // },
    {
      id: 1,
      name: 'vue',
      icon: <Icon width='30' icon='logos:vue' />,
    },
  ]
  return (
    <div className='code-examples'>
      <div className='framework-selectors flex gap-2 items-center'>
        {frameworks.length > 1 &&
          frameworks.map((framework) => (
            <button
              onClick={() => setSelectedFramework(framework.name)}
              key={framework.id}
              className={`${
                selectedFramework === framework.name
                  ? 'bg-primary text-primary-content hover:bg-primary-focus'
                  : 'bg-neutral hover:bg-neutral-focus'
              } framework w-max grid place-content-center px-8 py-2
              text-center border border-base-200
              rounded-xl`}
            >
              <div className='flex items-center gap-3'>
                <div className='text-center mx-auto w-max'>
                  {framework.icon}
                </div>
                <span className='block text-xl capitalize'>
                  {framework.name}
                </span>
              </div>
            </button>
          ))}
      </div>
      <div className='my-12' />
      <Example framework={selectedFramework} />
    </div>
  )
}

const Example = ({ framework }: { framework: string }) => {
  interface ItemsType {
    [key: string]: {
      id: number
      title: string
      str: string
      icon: JSX.Element
    }[]
  }
  const items: ItemsType = {
    vue: [
      {
        id: 0,
        title: 'Main.vue',
        str: 'main',
        icon: <Icon icon='logos:vue' />,
      },
      {
        id: 1,
        title: 'ItemList.vue',
        str: 'itemlist',
        icon: <Icon icon='logos:vue' />,
      },
    ],
    react: [
      {
        id: 0,
        title: 'Main.tsx',
        str: 'main',
        icon: <Icon icon='logos:react' />,
      },
    ],
  }

  const [selectedView, setSelectedView] = useState('main')

  const handleViewChange = (view: string): void => {
    if (selectedView === view) return

    setSelectedView(view)
  }

  return (
    <pre className='relative text-left'>
      <div className='file-selector absolute -top-8 left-0 w-full bg-base-200 flex gap-[1px]'>
        {items &&
          items[framework].map((item) => (
            <button
              key={item.id}
              onClick={() => handleViewChange(item.str)}
              className={`${
                selectedView === item.str
                  ? 'bg-primary text-primary-content border-neutral-content'
                  : ''
              } selector-button bg-base-300 border-t border-transparent px-4 text-xs py-2 hover:bg-primary hover:text-primary-content`}
            >
              <div className='flex gap-2 items-center'>
                {item.icon && <span>{item.icon}</span>}
                <span>{item.title}</span>
              </div>
            </button>
          ))}
      </div>
      <code>
        {framework === 'react' && (
          <SyntaxHighlighter
            language='javascript'
            showLineNumbers={true}
            style={ocean}
          >
            {reactMain}
          </SyntaxHighlighter>
        )}
        {framework === 'vue' && (
          <SyntaxHighlighter
            language='javascript'
            showLineNumbers={true}
            style={ocean}
          >
            {selectedView === 'main' ? vueMain : vueItem}
          </SyntaxHighlighter>
        )}
      </code>
    </pre>
  )
}

export default CodeExamples
