run:
	rustup update
	cargo update
	-cat ~/.cargo/config.toml
	-cat ~/.cargo/config
	cargo clean
	cargo build --release --target=wasm32-unknown-unknown -v
	deno run --allow-read --allow-write main.ts
