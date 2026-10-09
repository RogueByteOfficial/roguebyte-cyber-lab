# System Architecture — RogueByte Cyber Lab

## 1. Architectural Overview
RogueByte Cyber Lab is architected as an isolated, multi-tiered educational cybersecurity platform. It decouples the core management plane (User Auth, Courseware, Submissions, Scoring) from the ephemeral execution plane (Lab Runners, Container Sandbox, Target Vulnerable Services).

```
+-------------------------------------------------------------------------+
|                              Client Layer                               |
|          React SPA + TypeScript + Tailwind CSS (Bilingual AR/EN)        |
+------------------------------------+------------------------------------+
                                     | HTTPS / WSS
+------------------------------------v------------------------------------+
|                         Management API Gateway                          |
|           Node.js / Express API Server + Strict RBAC & Ownership        |
+------------------+------------------+------------------+----------------+
                   |                  |                  |
+------------------v--+   +-----------v------+   +-------v----------------+
|  PostgreSQL Storage |   |  Redis & Queues  |   | Audit & Event Logging  |
|  Users, Challenges, |   |  Session states, |   | Tamper-proof activity  |
|  Submissions, Scans |   |  rate-limiters   |   | audit records          |
+---------------------+   +------------------+   +------------------------+
                                     |
+------------------------------------v------------------------------------+
|                       Lab Orchestrator Daemon                           |
|        Isolated Worker Process (Restricted UNIX Socket or Mock IPC)     |
+------------------------------------+------------------------------------+
                                     | Internal Bridge Network
+------------------------------------v------------------------------------+
|                     Ephemeral Target Lab Sandbox                        |
|                                                                         |
|  [Lab Target: Web]       [Lab Target: Linux]    [Lab Target: Network]   |
|  - OWASP Juice Shop      - Restricted Shell     - Virtual Wire PCAP     |
|  - Read-Only Volumes     - SUID Lab Binaries    - Internal Subnet Only  |
|  - Ephemeral tmpfs       - Resource Limits      - Zero External WAN     |
+-------------------------------------------------------------------------+
```

## 2. Core Components

### A. Management API Layer
- **Role-Based Access Control (RBAC):** Three discrete roles with strict server-side validation:
  - `Student`: Manages their own lab sessions, submits challenge flags, views their own scoreboards.
  - `Instructor`: Creates courses, reviews submissions, monitors cohort progress, views session metrics.
  - `Administrator`: Full platform oversight, lab node provisioning, system quotas, and tamper-resistant audit logs.
- **Resource Ownership Enforcement:** All stateful queries verify `session.userId === req.user.id` or require `role === 'admin'`. Path traversal, parameter tampering (IDOR), and horizontal privilege escalations are mitigated at the middleware layer.

### B. Lab Session Lifecycle State Machine
Every lab session traverses deterministic, strictly audited states:
- `STOPPED`: Session allocated in DB, no container/process running.
- `PROVISIONING`: Worker validates resource quotas, builds sandbox network, mounts ephemeral memory/tmpfs.
- `READY`: Target service passes readiness probes (HTTP 200 / socket ping).
- `RUNNING`: Student connected, timer counting down (default: 60 minutes).
- `RESETTING`: Target halted, storage purged, freshly minted from baseline immutable image, student score records preserved.
- `STOPPING`: Graceful SIGTERM followed by SIGKILL, network interfaces dismantled.
- `FAILED`: Safe fail-closed state; access disabled, diagnostic telemetry recorded, resources reclaimed.

### C. Reset Guarantees
A reset is **never** a mere container restart. It guarantees:
1. Complete unmount and wipe of any writable layer / volume overlay.
2. Re-instantiation from the immutable base image tag.
3. Preservation of all student progress, points, and submission history in PostgreSQL.
4. Renewal of session authorization tokens and network isolation rules.

## 3. Network Segmentation Matrix
| Network Zone | Permitted Ingress | Permitted Egress | Purpose |
| :--- | :--- | :--- | :--- |
| `rogue_mgmt_net` | Reverse Proxy (3000/443) | PostgreSQL (5432), Redis (6379) | Administrative API & Dashboard |
| `rogue_lab_net` | Internal Proxy Gateway only | None (Internal flag: `internal: true`) | Target containers, zero internet access |
| `student_bridge` | Student WebSocket Shell | Target Port (e.g., 3001) | Isolated interactive target access |

---
Author: **SID AHMED FARES (SidoDev-Dz)** — **RogueByte** © 2026
