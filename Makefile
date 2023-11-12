run:
	rustup update
	cargo update
	cargo clean
	cargo +nightly b --release --target=wasm32-unknown-unknown -v
	deno run --allow-read --allow-write main.ts
