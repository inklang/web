import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const EXAMPLE_CODE = `fn main() {
  let greeting = "Hello, inklang!"
  print(greeting)

  let nums = [1, 2, 3, 4, 5]
  for num in nums {
    print("Number: " + num)
  }
}`

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
          inklang
        </h1>
        <p className="text-xl text-zinc-400 mb-2">
          A compiled scripting language for the modern VM.
        </p>
        <p className="text-zinc-500 mb-8">Fast. Simple. Extensible.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/docs">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/playground">
            <Button variant="outline" size="lg">Try Playground</Button>
          </Link>
        </div>
      </section>

      {/* Code Preview */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-800 p-6 overflow-x-auto">
          <pre className="text-sm text-zinc-300">
            <code>{EXAMPLE_CODE}</code>
          </pre>
        </Card>
      </section>

      <Separator className="max-w-3xl mx-auto" />

      {/* Features */}
      <section className="px-6 py-16 max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Compiled to Bytecode</h3>
          <p className="text-sm text-zinc-400">Fast execution with a register-based VM optimized for modern hardware.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Simple Syntax</h3>
          <p className="text-sm text-zinc-400">Clean, expressive syntax that reads naturally. No ceremony required.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">First-Class Functions</h3>
          <p className="text-sm text-zinc-400">Functions are values — pass them around, return them, close over scope.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Extensible via Packages</h3>
          <p className="text-sm text-zinc-400">Build and share reusable code with inklang&apos;s package manager.</p>
        </Card>
      </section>
    </div>
  )
}
