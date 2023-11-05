import { encodeHex } from 'https://deno.land/std@0.205.0/encoding/hex.ts'

await Deno.mkdir('output/', { recursive: true })

const hashes = JSON.parse(await Deno.readTextFile('output/hashes.json').catch(() => '{}')) as Record<string, string | undefined>
const hash = encodeHex(await crypto.subtle.digest('SHA-256', await Deno.readFile('main.wasm')))
hashes[ await Deno.realPath('./') ] = hash

Deno.writeTextFile('output/hashes.json', JSON.stringify(hashes, undefined, '\t'))
Deno.rename('main.wasm', `output/${hash}.wasm`)
