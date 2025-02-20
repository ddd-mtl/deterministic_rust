# --locked
#	cargo clean
build:
	@echo "Current directory is: $(CURDIR)"
	CARGO_HOME=registry RUSTFLAGS=--remap-path-prefix=$(CURDIR)/$(CARGO_HOME)=michel cargo build --release --target=wasm32-unknown-unknown -v
	deno run -A main.ts

nbuild:
	cargo clean
	cargo +nightly build --release --target=wasm32-unknown-unknown -v
	deno run -A main.ts
