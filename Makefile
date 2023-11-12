run:
	rustup update
	cargo update
	cargo clean
	# cargo +nightly b --release --target=wasm32-unknown-unknown -v
	mkdir -p target/wasm32-unknown-unknown/release
	rustc +nightly --crate-name deterministic_rust --edition=2021 src/main.rs --error-format=json --json=diagnostic-rendered-ansi,artifacts,future-incompat --diagnostic-width=383 --crate-type bin --emit=dep-info,link -C opt-level=3 -C embed-bitcode=no --out-dir target/wasm32-unknown-unknown/release/ --target wasm32-unknown-unknown
	deno run --allow-read --allow-write main.ts
