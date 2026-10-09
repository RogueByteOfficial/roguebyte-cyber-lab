# Automated Testing Strategy & Verification — RogueByte Cyber Lab

## 1. Overview
RogueByte Cyber Lab includes an automated test harness designed to rigorously evaluate:
1. **RBAC & Authorization:** Strict enforcement of Student, Instructor, and Admin permissions.
2. **Resource Ownership Defense:** Prevention of Horizontal Privilege Escalation (IDOR) between students.
3. **Lab State Machine Transitions:** `STOPPED` -> `PROVISIONING` -> `READY` -> `RUNNING` -> `RESETTING` -> `STOPPING`.
4. **Target Isolation & Reset Integrity:** Verification that a reset completely scrubs ephemeral container modifications without wiping student achievements, scores, or audit logs.
5. **Fail-Closed Mechanics:** Safety handling when an orchestrator or target health check fails.

## 2. Test Execution

### Running All Tests
```bash
npm test
```

### Running Specific Test Suites
```bash
# Test RBAC and Ownership Enforcement
npx tsx test/auth-rbac.test.ts

# Test Lab Lifecycle & Reset Integrity
npx tsx test/lab-lifecycle.test.ts

# Test Challenge Flag Validation Engine
npx tsx test/challenges-scoring.test.ts
```

## 3. Test Suites Matrix

| Suite | Focus Area | Assertions |
| :--- | :--- | :--- |
| `auth-rbac.test.ts` | Server-side role enforcement | Student cannot access admin audit logs; Instructor cannot mutate another instructor's course; invalid tokens rejected. |
| `ownership.test.ts` | Resource Isolation & IDOR | Student B attempting to stop or reset Student A's lab session receives HTTP 403 Forbidden. |
| `lab-lifecycle.test.ts` | State machine & Reset verification | State follows deterministic transitions; reset purges ephemeral writes; student score retained. |
| `challenges-scoring.test.ts` | Flag validation & Points calculation | Dynamic and static flag validation; prevents replay attacks; awards points exactly once. |

---
Author: **SID AHMED FARES (SidoDev-Dz)** — **RogueByte** © 2026
