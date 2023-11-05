run:
	rustup update
	cargo update
	cargo build --release --target=wasm32-unknown-unknown
	deno run --allow-read --allow-write main.ts
