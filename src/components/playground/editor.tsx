'use client'

import MonacoEditor from '@monaco-editor/react'

const EXAMPLES = [
  {
    label: 'Hello World',
    code: `fn main() {
  print("Hello, ink!")
}`,
  },
  {
    label: 'Simple Function',
    code: `fn add(a, b) {
  return a + b
}

fn main() {
  print(add(2, 3))
}`,
  },
  {
    label: 'For Loop',
    code: `fn main() {
  for i in range(5) {
    print("Number: " + i)
  }
}`,
  },
]

const DEFAULT = EXAMPLES[0].code

export function PlaygroundEditor({ code, onChange }: { code: string; onChange: (v: string) => void }) {
  return (
    <MonacoEditor
      height="400px"
      defaultLanguage="plaintext"
      value={code}
      onChange={(v) => onChange(v || '')}
      theme="vs-dark"
      options={{ minimap: { enabled: false }, fontSize: 14 }}
    />
  )
}

export { EXAMPLES, DEFAULT }
