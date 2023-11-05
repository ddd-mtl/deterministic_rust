run:
	rustup update
	rustc --target=wasm32-unknown-unknown main.rs
	deno run --allow-read --allow-write main.ts
