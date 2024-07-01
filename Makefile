build:
	cargo clean
	cargo +nightly build --release --target=wasm32-unknown-unknown -v
	deno run -A main.ts
