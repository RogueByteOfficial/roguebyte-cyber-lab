/**
 * Master Automated Test Harness — RogueByte Cyber Lab
 * Architect: SID AHMED FARES (SidoDev-Dz)
 * Brand: RogueByte
 */

import { runAuthRbacTests } from './auth-rbac.test.ts';
import { runOwnershipTests } from './ownership.test.ts';
import { runLabLifecycleTests } from './lab-lifecycle.test.ts';
import { runScoringTests } from './challenges-scoring.test.ts';

console.log('\n============================================================');
console.log('🛡️  RogueByte Cyber Lab — Automated Test Suite Execution');
console.log('   Lead Architect: SID AHMED FARES (SidoDev-Dz)');
console.log('   Brand: RogueByte | Repo: sidopac1a/roguebyte-cyber-lab');
console.log('============================================================\n');

const suites = [
  { suiteName: '1. RBAC & Server Authorization', fn: runAuthRbacTests },
  { suiteName: '2. Resource Ownership & IDOR Protection', fn: runOwnershipTests },
  { suiteName: '3. Lab Lifecycle & True Reset Isolation', fn: runLabLifecycleTests },
  { suiteName: '4. Scoring Engine & Replay Mitigation', fn: runScoringTests }
];

let totalCount = 0;
let passedCount = 0;
let failedCount = 0;

for (const suite of suites) {
  console.log(`\n📋 Running Suite: ${suite.suiteName}`);
  console.log('------------------------------------------------------------');
  const results = suite.fn();
  for (const r of results) {
    totalCount++;
    if (r.passed) {
      passedCount++;
      console.log(`  ✓ PASS: ${r.name}`);
    } else {
      failedCount++;
      console.log(`  ✗ FAIL: ${r.name}`);
      if (r.error) {
        console.log(`    ↳ Error: ${r.error}`);
      }
    }
  }
}

console.log('\n============================================================');
console.log(`📊 Test Summary: ${passedCount}/${totalCount} Passed (${failedCount} Failed)`);
console.log('============================================================\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL DEFENSE AND LIFECYCLE TESTS VERIFIED SUCCESSFULLY.\n');
  process.exit(0);
}
