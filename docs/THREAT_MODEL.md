# Threat Model & Security Posture — RogueByte Cyber Lab

## 1. Executive Summary
RogueByte Cyber Lab hosts deliberately vulnerable targets for training purposes. Consequently, the threat environment is uniquely adversarial. Our threat model assumes that students or malicious actors may attempt to break out of lab containers, abuse system resources, pivot across student networks, or tamper with administrative scoring systems.

## 2. Threat Analysis (STRIDE Taxonomy)

| Threat Category | Primary Risk | Mitigation Implemented |
| :--- | :--- | :--- |
| **Spoofing** | Student impersonating another student or instructor | Cryptographically signed JWT tokens with short TTL; strict session revocation checks; TLS enforcement. |
| **Tampering** | Modifying lab scores, submission records, or Docker configs | Centralized immutable audit logs; server-side flag hashing; parameter tampering protection on all `/api/labs/:id` routes. |
| **Repudiation** | User denying starting a malicious scan or lab reset | Structured audit trail storing `actor_id`, `ip_address`, `timestamp`, `action`, `resource_id`. |
| **Information Disclosure** | Leakage of Docker socket, environment secrets, or other students' lab states | Docker socket strictly unexposed to network; zero `.env` secrets in logs; lab targets reside on distinct non-routable subnets. |
| **Denial of Service (DoS)** | Fork-bombs, memory exhaustion, or spawning hundreds of lab instances | Strict cgroups limits: `pids-limit: 100`, `mem_limit: 512m`, `cpus: 0.5`. Global cap of max concurrent active labs per user. |
| **Elevation of Privilege** | Container breakout (`cap-add: SYS_ADMIN`), host takeover | Containers run as unprivileged UID; `read_only: true` root filesystems with ephemeral `tmpfs`; `no-new-privileges: true`; dangerous capabilities dropped (`cap_drop: [ALL]`). |

## 3. Defense-in-Depth Implementation

### A. Docker Daemon & Socket Protection
- **No Direct Socket Binding:** The Docker API socket (`/var/run/docker.sock`) is NEVER mounted inside training target containers or exposed via TCP.
- **Dedicated Orchestrator Boundary:** Only the trusted host background daemon communicates with Docker, executing pre-compiled, parameter-checked lifecycles.

### B. Network Isolation
- **`internal: true` Bridge Networks:** Lab subnets are instantiated with the Docker `internal: true` flag. This prevents targets from reaching the public internet or external cloud VPCs.
- **Inter-Container Isolation:** Each student lab container is assigned an isolated bridge network. Pinging or attacking fellow students' targets is blocked at the virtual switch level (`com.docker.network.bridge.enable_icc: false`).

### C. Resource Governance & Quotas
- Memory limit: 512MB per lab target.
- CPU quota: 50% single-core maximum.
- Process limit (PID cgroup): 100 processes max (prevents `while true; do fork; done`).
- Ephemeral storage: 200MB max tmpfs mount, destroyed on session termination or reset.

### D. Safe Secret Management
- Passwords and flag secrets are salted and hashed (Argon2 / SHA-256).
- Audit logs automatically redact sensitive fields (`password`, `token`, `authorization`, `cookie`).

---
Author: **SID AHMED FARES (SidoDev-Dz)** — **RogueByte** © 2026
