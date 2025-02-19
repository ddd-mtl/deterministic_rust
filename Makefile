build:
	cargo clean
	cargo build --release --target=wasm32-unknown-unknown -v
	deno run -A main.ts
