import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const EXAMPLE_CODE = `import spawn_mob, Zombie from mobs;

// Grammar injected by the mobs package:
mob Dragon {
    name: "Boss"
    health: 500
}

// Standard inklang event handling:
on event:player_death(player) {
    spawn_mob(Zombie, player.location)
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
          A compiled scripting language for PaperMC servers.
        </p>
        <p className="text-zinc-500 mb-8">Packages extend the language itself.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/docs">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/docs/intro">
            <Button variant="outline" size="lg">Learn More</Button>
          </Link>
        </div>
      </section>

      {/* Code Preview */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-800 p-6 overflow-x-auto">
          <p className="text-xs text-zinc-500 mb-3">After installing the mobs package:</p>
          <pre className="text-sm text-zinc-300">
            <code>{EXAMPLE_CODE}</code>
          </pre>
        </Card>
      </section>

      <Separator className="max-w-3xl mx-auto" />

      {/* Features */}
      <section className="px-6 py-16 max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Grammar Injection</h3>
          <p className="text-sm text-zinc-400">Packages can add new syntax directly to the language. Config files that read like native language features.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Bundled APIs</h3>
          <p className="text-sm text-zinc-400">Packages ship with classes and functions. Import what you need, use it like built-in language tools.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Compiled to Bytecode</h3>
          <p className="text-sm text-zinc-400">Fast execution on a register-based VM with SSA optimizations. No interpreted overhead.</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="font-semibold mb-2">Clean Syntax</h3>
          <p className="text-sm text-zinc-400">String interpolation, first-class functions, classes with inheritance, and operators that read naturally.</p>
        </Card>
      </section>
    </div>
  )
}
