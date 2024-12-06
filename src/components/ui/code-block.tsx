'use client'

import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children?: React.ReactNode
  language: string
  code?: string
  filename?: string
}

export function CodeBlock({ children, language, code = '', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const getCodeString = () => {
    if (code) return code
    if (typeof children === 'string') return children
    if (React.isValidElement(children)) {
      return children.props.children || ''
    }
    return ''
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCodeString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="group relative my-6 rounded-lg overflow-hidden">
      <div className="absolute left-3 top-1 z-10 flex items-center gap-2">
        <span className="rounded-md px-2 py-1 text-xs font-medium text-slate-400
				transition-all duration-200 
				 dark:text-slate-400">
	  {language}
        </span>
      </div>
      {filename && (
        <div className="flex items-center border-b border-slate-200 px-4 py-2 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
          {filename}
        </div>
      )}
      
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="rounded-md px-1 py-1 text-xs font-medium text-slate-600	hover:text-slate-400
                     transition-all duration-200 hover:bg-slate-700 dark:bg-slate-800/90	
                     dark:text-slate-300 dark:hover:bg-slate-700/80 
                     shadow-sm hover:shadow-md border-slate-200/50 dark:border-slate-700/50
                     flex items-center gap-1"
        >
          {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        </button>
      </div>
      <Highlight 
        theme={themes.oneDark} 
        code={getCodeString().trim()} 
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={cn("overflow-x-auto p-4 text-sm",
			language && "pt-9"
		  )} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-4 select-none inline-block w-4 text-right text-slate-400 dark:text-slate-600">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
} 