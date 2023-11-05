import { encodeHex } from 'https://deno.land/std@0.205.0/encoding/hex.ts'
import { parse, stringify } from 'https://deno.land/std@0.205.0/toml/mod.ts'
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

const cargo = parse(await Deno.readTextFile('Cargo.toml')) as Cargo
hashes[ await Deno.realPath('./') + ' ' + cargo.package.version ] = hash
cargo.package.version = cargo.package.version.slice(0, cargo.package.version.lastIndexOf('.') + 1)
	+ (parseInt(cargo.package.version.slice(cargo.package.version.lastIndexOf('.') + 1)) + 1)

Deno.writeTextFile('Cargo.toml', stringify(cargo))
Deno.writeTextFile('output/hashes.json', JSON.stringify(hashes, undefined, '\t'))
Deno.rename('target/wasm32-unknown-unknown/release/deterministic_rust.wasm', `output/${hash}.wasm`)
