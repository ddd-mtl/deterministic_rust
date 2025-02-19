import { encodeBase64Url } from "@std/encoding";

await Deno.mkdir("output/" + Deno.build.os + "/", { recursive: true });

const file = await Deno.readFile("target/wasm32-unknown-unknown/release/deterministic_rust.wasm");

const hash = await crypto.subtle.digest("SHA-256", file)

const b64 = encodeBase64Url(hash)

console.log("\n HASH:", b64);

// await Deno.rename(
//   "target/wasm32-unknown-unknown/release/deterministic_rust.wasm",
//   "output/" + Deno.build.os + "/" + b64 + ".wasm",
// );
