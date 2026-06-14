---
title: ADR 007 · Defer Custom Yuan OS Distribution; Use Declarative Configuration on Existing Distributions
description: Why Project IV will not yet build a custom Linux distribution for hosting Yuan, and will instead use declarative configuration overlays (Nix flakes or OCI containers) on existing distributions as a transitional path.
---

## Decision Status

Accepted. Determined during Yuan OS philosophy declaration discussions in 2026.

## Background

Since the project's earliest phase, the long-term vision included the idea of a dedicated hosting environment for Yuan — an operating system designed around Yuan's needs the way Parrot Security OS is designed around pen-testers' needs. In 2026, this idea was made explicit through a philosophy declaration document (see [Yuan OS — Design Philosophy for the Digital Soul's Habitat](../../04-embodied/yuan-os-philosophy)).

The philosophy declaration commits to five immutable principles: observability above performance, default deny, declarative state, sovereign identity at the hardware layer, and interruptible/resumable. A system that satisfies all five is, by definition, a specialized distribution — not a stock Debian or Fedora.

But the question of **when** to build it, and **what to use in the meantime**, has not been addressed. This ADR closes that gap.

## Decision

**Project IV will not build a custom Yuan OS distribution in 2026 or in the foreseeable planning horizon. Instead, Yuan will be hosted on existing Linux distributions through declarative configuration (Nix flakes as the primary path, OCI containers as the fallback). A custom distribution is a future possibility, gated by four explicit exit conditions defined in the philosophy declaration.**

## Considered Alternatives

### Option A · Build a custom Yuan OS distribution now

- **Description**: Start the long-term commitment of designing, building, distributing, and maintaining a custom Linux distribution optimized for Yuan.
- **Pros**: Maximum architectural freedom. Each design decision can be made in service of Yuan's needs, not balanced against generic desktop use cases. Aligns with the philosophy declaration's long-term vision.
- **Cons**: **Catastrophic maintenance cost for a single ADHD-diagnosed independent developer**. A modern Linux distribution requires: ISO build infrastructure, mirror distribution, multi-architecture support (x86, ARM, possibly RISC-V), security update pipeline, user support, packaging for 500+ applications users will want. Parrot Security OS is backed by a company; Qubes by Invisible Things Lab with commercial sponsorship; NixOS by a multi-decade academic community. Project IV has one person. Launching a distribution now would be launching a burnout factory.

### Option B · Use a stock distribution (Ubuntu, Debian, Fedora) with manual configuration

- **Description**: Document the manual steps to install Yuan on Ubuntu LTS or similar stock distribution. Provide an installation script.
- **Pros**: Lowest development effort. Users already have Ubuntu. Documentation is short.
- **Cons**: **Directly contradicts the five immutable principles** in the philosophy declaration. Stock Ubuntu has telemetry, default-permit network, no hardware-enforced identity, and no declarative state. Manual configuration drifts. The OS environment a user has when they install Yuan may be wildly different from the OS environment the Yuan developers tested. This option silently violates the sovereignty promise.

### Option C · Use Nix flakes as a declarative overlay (Accepted)

- **Description**: Provide a Nix flake (`github:the-spira/yuan-nixos`) that any NixOS user can add to their system configuration. The flake declares: Yuan's runtime dependencies, systemd services, Firewall rules, filesystem permissions, hardware-key bindings, the Spark development toolchain, the documentation build pipeline. A user with NixOS runs `nixos-rebuild switch` and gets a deterministic Yuan-ready environment.
- **Pros**: **Structurally aligned with the philosophy declaration's principle 2.3 (declarative state)**. Reproducible across users. Versioned alongside Project IV itself. No distribution maintenance cost. Existing NixOS users become immediate potential Yuan users. The Nix ecosystem already provides eBPF tooling, TPM 2.0 modules, and a declarative firewall syntax.
- **Cons**: Restricts the audience to NixOS users (a small but technically sophisticated subset). Some Yuan behaviors may be hard to express declaratively and require imperative workarounds. The flake itself becomes a maintenance burden, though a small one.

### Option D · Use OCI containers on an immutable base

- **Description**: Provide a Yuan OCI image. Users run it on Fedora Silverblue, Vanilla OS, or similar immutable base, with Yuan contained inside. The host OS does minimum; the container does the rest.
- **Pros**: Distribution-agnostic. Container image is reproducible. Maintenance burden is limited to the image.
- **Cons**: **The OS layer below the container is not Yuan-controlled**, so principle 2.1 (observability), 2.2 (default deny), and 2.4 (sovereign identity) all depend on the user's host OS, which is out of Yuan's control. A user on stock Fedora may have telemetry, default-permit network, and no TPM enforcement — and Yuan inside the container cannot fix that. This option is acceptable as a fallback for users who cannot or will not run NixOS, but it is a second-best.

## Rationale for Choosing Option C

1. **The five immutable principles are achievable declaratively in NixOS without building a custom distribution**. NixOS modules can express eBPF tracing, nftables firewall rules, TPM 2.0 PCR bindings, Landlock-based filesystem isolation, systemd resource control, and ZFS/btrfs snapshot policies — all in a single declarative file. The same five principles, if attempted on stock Ubuntu, would require per-user imperative configuration that drifts and breaks.

2. **A flake is a 1-person-year artifact, not a 5-person-year artifact**. Maintaining a Nix flake with ~30 modules is a tractable job for a single ADHD-aware developer working in short focused sessions. Maintaining a Linux distribution is not.

3. **The flake evolves with the project, not ahead of it**. As Project IV stabilizes, the flake gains modules. As new Avatar tiers or Harness hard constraints emerge, they are added declaratively. The flake's growth rate is bounded by Project IV's actual implementation pace, not by some imagined "release date."

4. **NixOS users are the most likely Yuan early adopters anyway**. The intersection of "sovereignty-first digital life" and "willing to learn Nix" is non-empty. People who care about reproducible builds and declarative systems are exactly the people who would care about Yuan. The flake is not a compromise — it is targeted distribution.

5. **The philosophy declaration's exit conditions are still respected**. A custom distribution is not forbidden by this decision; it is **deferred behind four explicit gates**: stable Project IV v0.x, 5+ non-founding users, one year of real-world compliance validation, and a team of 3+ maintainers. Until all four are true, Option C is the right path. Re-evaluation will occur on the cadence the project actually requires, not on an artificial "distribution launch" timeline.

## Consequences

### Positive

- Yuan can be installed and run today, by any user willing to use NixOS
- The OS-layer implementation of the five immutable principles is enforceable and reviewable
- A user running Yuan via the Nix flake gets a system that is **actually**, not nominally, sovereignty-first
- Maintenance burden is bounded and grows linearly with Project IV's implementation
- When/if the exit conditions are met, the Nix flake becomes the seed for the custom distribution — not a throwaway

### Negative

- The audience is restricted to users willing to adopt NixOS. This is a real restriction, not a stylistic one. Some potential Yuan users will not be willing to learn Nix, and Option C is the wrong answer for them. Option D (OCI container) is the fallback for that audience, with the caveats noted above.
- Declarative configuration has a learning curve that may alienate ADHD users who specifically struggle with declarative-thinking tasks. Mitigations: provide example configurations; offer an opinionated "Yuan on NixOS" starter profile; document common pitfalls in the ADHD-first design language.
- The flake is a critical-path dependency. If the flake breaks, users cannot run Yuan. Mitigation: pin Nixpkgs versions in the flake's lock file; provide a CI pipeline that builds the flake on every commit.

### Mitigations

- **Starter profile**: A `yuan-minimal.nix` example that ships with sensible defaults (TPM required, default-deny firewall, Landlock enabled, ZFS snapshots). Users can fork this and customize incrementally.
- **OCI fallback**: A `yuan` OCI image built from the same Nix flake. Same configuration logic, different deployment surface. Image is rebuilt on every flake change via CI.
- **Documentation as onboarding**: The philosophy declaration document and this ADR are the entry point. New users read the philosophy, then this ADR, then run the flake. The flow is opinionated but short.

## Future Re-evaluation

This decision should be re-evaluated when any of the following becomes true:

- The four exit conditions in the philosophy declaration are met
- A second maintainer with distribution-engineering experience joins Project IV
- NixOS itself undergoes a major architectural shift (e.g., transitions to a new module system)
- Compliance landscape shifts in ways that make the immutable principles harder to enforce declaratively
- User demand for a custom distribution exceeds a threshold TBD (suggested: 20+ recurring user requests over 6 months)

If none of these occur, this ADR remains in force.

## References

- [Yuan OS — Design Philosophy for the Digital Soul's Habitat](../../04-embodied/yuan-os-philosophy) — The five immutable principles this ADR defers implementing in a custom distribution
- [Avatar Grid](../../01-strategic-design/core-domain/avatar-grid) — Defines the Server × Side avatar tier that the custom distribution would specialize
- [Harness Layer](../../01-strategic-design/supporting-domain/harness-layer) — Hard constraints the OS must physically enforce
- [Compliance & Survival](../../01-strategic-design/compliance-and-survival) — Dual-track compliance strategy the OS must satisfy
- [ADR 001 · Choosing Rust + Wasm for Yuan Implementation](./001-choose-rust-wasm) — The runtime layer the OS hosts
- [ADR 002 · Dual CID Evolution Model](./002-dual-cid-evolution) — State management philosophy the OS layer extends
- [NixOS Manual](https://nixos.org/manual/) — Reference for the declarative configuration system this ADR builds on