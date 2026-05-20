---
title: ADR 001 · Choosing Rust + Wasm for Yuan Implementation
description: Why Yuan must be written in Rust and compiled to WebAssembly, rather than other languages or runtimes.
---

## Decision Status

Accepted. Determined during early architectural design phase in 2025.

## Background

Yuan is the core of Project IV's digital life — an encrypted, executable module that needs to run securely across different avatars (browser, desktop, server, mobile).

Core Requirements:

1. **Cross-platform Execution**: Yuan must run identically across browser tabs (Tiny Avatar), desktop applications (Main Avatar), and servers (Server Avatar)
2. **Secure Sandbox**: Yuan contains the user's digital DNA and must execute in an isolated environment, preventing malicious code from accessing the host system
3. **Encryption & Sovereignty**: Yuan is encrypted with the user's private key; only the user can decrypt and activate it
4. **Acceptable Performance**: Even in Tiny Avatar (browser tab), wake time should be < 3 seconds
5. **Long-term Maintainability**: The reference implementation of core protocols requires long-term maintenance; language choice affects community contribution barriers

## Decision

**Yuan's core logic is written in Rust and compiled to WebAssembly (Wasm) modules.**

## Considered Alternatives

### Option A: JavaScript / TypeScript Direct Execution

- **Pros**: Lowest development barrier, directly usable in frontend ecosystem
- **Cons**: Cannot provide true sandbox isolation (browser sandbox is coarse-grained and cannot prevent memory access between different scripts on the same page); cryptographic key management in JS runtime is too risky; requires additional runtime for non-browser environments (CLI, embedded)

### Option B: Containerization (Docker/OCI)

- **Pros**: Mature isolation technology, cross-platform
- **Cons**: Startup time is too long (seconds to minutes), cannot run in Tiny Avatar; image size far exceeds Wasm modules; requires daemon process, not suitable for lightweight edge environments

### Option C: Native Binary + Platform-specific Compilation

- **Pros**: Optimal performance
- **Cons**: Cannot run safely in browsers; each avatar platform requires independent binary distribution, violating the principle of "same Yuan runs everywhere"; users must trust platform distribution channels, introducing supply chain attack surface

### Option D: JavaScript Compiled to Wasm (e.g., AssemblyScript)

- **Pros**: Close to TypeScript development experience
- **Cons**: AssemblyScript is not a strict subset of TypeScript; ecosystem maturity is far lower than Rust+Wasm; insufficient expressive power for cryptographic operations requiring fine-grained memory control

## Rationale for Choosing Rust + Wasm

1. **True Cross-platform**: Wasm is a W3C standard natively supported by all major browsers. Independent runtimes like wasmtime and wasmer cover desktop, server, and embedded environments. The same `.wasm` file loads and executes in any avatar.
2. **Compile-time Safety**: Rust's ownership system and borrow checker eliminate memory safety vulnerabilities at compile time. Combined with Wasm's sandbox isolation, this forms a dual-layer security protection — Rust guarantees no internal memory errors, Wasm guarantees no unauthorized access to external hosts.
3. **Mature Wasm Toolchain**: The `wasm-pack` toolchain standardizes the process of compiling Rust to Wasm. `wasm-bindgen` provides efficient interoperability with JavaScript host environments. Ecosystem maturity ranks first among Wasm target languages.
4. **Cryptographic Support**: Rust's `rust-crypto` ecosystem includes complete modern cryptographic primitives (AES-GCM, Ed25519, X25519), and many libraries support `no_std` environments, suitable for use in Wasm's constrained runtime.
5. **Performance**: Rust compiled to Wasm has execution efficiency close to native. For Yuan's thinking engine and cryptographic operations, performance is sufficient — on Tiny Avatar, Yuan's L0 routing layer compiles to < 500KB.
6. **Synergy with Harness**: Hard constraints need to be embedded in Yuan as code-level permission checks. Rust's type system can express hard constraints as compile-time checks rather than runtime assertions — this reduces the runtime attack surface.

## Consequences

### Positive

- Yuan can execute in any Wasm-supported runtime, covering all avatar types
- Rust's safety reduces memory vulnerability risks in Yuan itself
- Wasm's sandbox isolation provides standardized security boundaries for avatars
- Single Yuan codebase compiles to all platforms, manageable maintenance cost

### Negative

- Rust's learning curve is steeper than TypeScript, increasing community contribution barriers
- Interaction between Wasm modules and host environment requires crossing FFI boundaries, increasing communication overhead (mitigated through batch calls)
- Wasm in browsers cannot directly access DOM or network APIs — must bridge through JavaScript. This means a clear bridge interface exists between Dao-Kit's UI layer (TypeScript) and Yuan core (Wasm). This is both a disadvantage and a natural service boundary in the architecture.

### Mitigations

- Dao-Kit's UI layer uses TypeScript + dao.js SDK; developers don't need to learn Rust to build user interfaces (see [ADR 003](./003-emberspark-over-yore))
- Core Dao-Kit developers need to learn Rust, but this is an intentional barrier — code deeply interacting with Yuan core inherently requires stronger security guarantees
- Performance overhead of Wasm-JS bridging is minimized through batch processing design in the interface: pass as much context as possible in a single call rather than multiple small calls

## References

- [WebAssembly Specification](https://webassembly.org/specs/)
- [Rust and WebAssembly Guide](https://rustwasm.github.io/docs/book/)
- [wasm-pack Documentation](https://rustwasm.github.io/docs/wasm-pack/)
