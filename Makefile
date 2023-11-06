run:
	rustup update
	cargo update
	cargo clean
	cargo build --release --target=wasm32-unknown-unknown -v
	deno run --allow-read --allow-write main.ts
