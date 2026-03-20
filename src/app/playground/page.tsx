'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlaygroundEditor, EXAMPLES, DEFAULT } from '@/components/playground/editor'
import { PlaygroundOutput } from '@/components/playground/output'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function PlaygroundPage() {
  const [code, setCode] = useState(DEFAULT)
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRun() {
    setLoading(true)
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setStdout(data.stdout || '')
      setStderr(data.stderr || '')
    } catch {
      setStderr('Request failed. Is the API server running?')
    } finally {
      setLoading(false)
    }
  }

  function loadExample(index: number) {
    setCode(EXAMPLES[index].code)
    setStdout('')
    setStderr('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-zinc-800">
        <Select<string> onValueChange={(v) => { if (v) loadExample(parseInt(v)) }}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Load example..." />
          </SelectTrigger>
          <SelectContent>
            {EXAMPLES.map((ex, i) => (
              <SelectItem key={i} value={String(i)}>{ex.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleRun} disabled={loading} size="sm">
          {loading ? 'Running...' : 'Run'}
        </Button>
      </div>
      {/* Editor */}
      <div className="flex-1">
        <PlaygroundEditor code={code} onChange={setCode} />
      </div>
      {/* Output */}
      <div className="border-t border-zinc-800">
        <PlaygroundOutput stdout={stdout} stderr={stderr} />
      </div>
    </div>
  )
}
