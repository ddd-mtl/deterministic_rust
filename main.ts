import { encodeBase64Url } from "@std/encoding";

await Deno.mkdir("output/" + Deno.build.os + "/", { recursive: true });

await Deno.rename(
  "target/wasm32-unknown-unknown/release/deterministic_rust.wasm",
  "output/" + Deno.build.os + "/" +
    encodeBase64Url(
      await crypto.subtle.digest(
        "SHA-256",
        await Deno.readFile(
          "target/wasm32-unknown-unknown/release/deterministic_rust.wasm",
        ),
      ),
    ) + ".wasm",
);
