/**
 * Test Suite: Resource Ownership & IDOR Protection Verification
 * Architect: SID AHMED FARES (SidoDev-Dz)
 */

import { rogueStore } from '../src/services/store.ts';

export function runOwnershipTests(): { name: string; passed: boolean; error?: string }[] {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  // Setup: Student 1 starts a lab
  const student1Id = 'user-student-1';
  const student2Id = 'user-student-2';
  const adminId = 'user-admin-1';

  const session = rogueStore.startLab(student1Id, 'web-101');

  // Test 1: Student 2 cannot stop Student 1's lab session (Horizontal Privilege Escalation Prevention)
  try {
    rogueStore.stopLab(student2Id, session.id);
    results.push({
      name: 'Ownership: Student B cannot stop Student A lab (IDOR Mitigated)',
      passed: false,
      error: 'Student 2 was able to stop Student 1 session'
    });
  } catch (err: any) {
    results.push({
      name: 'Ownership: Student B cannot stop Student A lab (IDOR Mitigated)',
      passed: err.message.includes('FORBIDDEN')
    });
  }

  // Test 2: Student 2 cannot reset Student 1's lab session
  try {
    rogueStore.resetLab(student2Id, session.id);
    results.push({
      name: 'Ownership: Student B cannot reset Student A lab (IDOR Mitigated)',
      passed: false,
      error: 'Student 2 was able to reset Student 1 session'
    });
  } catch (err: any) {
    results.push({
      name: 'Ownership: Student B cannot reset Student A lab (IDOR Mitigated)',
      passed: err.message.includes('FORBIDDEN')
    });
  }

  // Test 3: Student 1 CAN reset their own lab session
  try {
    const resetSession = rogueStore.resetLab(student1Id, session.id);
    results.push({
      name: 'Ownership: Student A can reset their own lab session',
      passed: resetSession.resetCount >= 1 && resetSession.status === 'RUNNING'
    });
  } catch (err: any) {
    results.push({
      name: 'Ownership: Student A can reset their own lab session',
      passed: false,
      error: err.message
    });
  }

  // Test 4: Administrator CAN stop any student lab session (Oversight Authority)
  try {
    const stoppedSession = rogueStore.stopLab(adminId, session.id);
    results.push({
      name: 'Ownership: Administrator has supervisory override on student sessions',
      passed: stoppedSession.status === 'STOPPED'
    });
  } catch (err: any) {
    results.push({
      name: 'Ownership: Administrator has supervisory override on student sessions',
      passed: false,
      error: err.message
    });
  }

  return results;
}
