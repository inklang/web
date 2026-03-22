import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  // Stub: returns mock output. Replace with actual runtime call.
  return NextResponse.json({
    stdout: `[ink] Executed ${code.split('\n').length} lines\n> Done.`,
    stderr: '',
  })
}
