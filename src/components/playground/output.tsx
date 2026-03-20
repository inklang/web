import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface OutputProps {
  stdout: string
  stderr: string
}

export function PlaygroundOutput({ stdout, stderr }: OutputProps) {
  return (
    <Tabs defaultValue="stdout">
      <TabsList className="w-full justify-start rounded-none border-b border-zinc-800 bg-transparent h-auto p-0">
        <TabsTrigger value="stdout" className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-500 data-[state=active]:bg-transparent">
          stdout
        </TabsTrigger>
        <TabsTrigger value="stderr" className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-500 data-[state=active]:bg-transparent">
          stderr
        </TabsTrigger>
      </TabsList>
      <TabsContent value="stdout" className="p-4 font-mono text-sm text-zinc-300 bg-zinc-900 rounded-b-md border border-zinc-800 border-t-0 min-h-24">
        {stdout || <span className="text-zinc-600">Run your code to see output here.</span>}
      </TabsContent>
      <TabsContent value="stderr" className="p-4 font-mono text-sm text-red-400 bg-zinc-900 rounded-b-md border border-zinc-800 border-t-0 min-h-24">
        {stderr || <span className="text-zinc-600">No errors.</span>}
      </TabsContent>
    </Tabs>
  )
}
