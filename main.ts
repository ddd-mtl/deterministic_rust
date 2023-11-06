import { encodeHex } from 'https://deno.land/std@0.205.0/encoding/hex.ts'
import { parse } from 'https://deno.land/std@0.205.0/toml/mod.ts'
await Deno.mkdir('output/', { recursive: true })

type Cargo = {
	package: {
		name: string,
		version: string,
		edition: string,
	}
}

const hashes = JSON.parse(await Deno.readTextFile('output/hashes.json').catch(() => '{}')) as Record<string, string | undefined>
const hash = encodeHex(await crypto.subtle.digest('SHA-256', await Deno.readFile('target/wasm32-unknown-unknown/release/deterministic_rust.wasm')))
hashes[ await Deno.realPath('./') + ' ' + (parse(await Deno.readTextFile('Cargo.toml')) as Cargo).package.version ] = hash

Deno.writeTextFile('output/hashes.json', JSON.stringify(hashes, undefined, '\t'))
Deno.rename('target/wasm32-unknown-unknown/release/deterministic_rust.wasm', `output/${hash}.wasm`)
