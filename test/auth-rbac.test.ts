/**
 * Test Suite: Auth & RBAC Permissions Verification
 * Architect: SID AHMED FARES (SidoDev-Dz)
 */

import { rogueStore } from '../src/services/store.ts';

export function runAuthRbacTests(): { name: string; passed: boolean; error?: string }[] {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  // Test 1: Student role is forbidden from accessing Admin Audit Logs
  try {
    rogueStore.getAuditLogs('student');
    results.push({
      name: 'RBAC: Student forbidden from reading Audit Logs',
      passed: false,
      error: 'Expected access denial, but student was granted access'
    });
  } catch (err: any) {
    if (err.message.includes('FORBIDDEN')) {
      results.push({
        name: 'RBAC: Student forbidden from reading Audit Logs',
        passed: true
      });
    } else {
      results.push({
        name: 'RBAC: Student forbidden from reading Audit Logs',
        passed: false,
        error: err.message
      });
    }
  }

  // Test 2: Admin role is authorized to access Admin Audit Logs
  try {
    const logs = rogueStore.getAuditLogs('admin');
    if (Array.isArray(logs) && logs.length > 0) {
      results.push({
        name: 'RBAC: Admin granted access to Audit Logs',
        passed: true
      });
    } else {
      results.push({
        name: 'RBAC: Admin granted access to Audit Logs',
        passed: false,
        error: 'Logs array was empty or invalid'
      });
    }
  } catch (err: any) {
    results.push({
      name: 'RBAC: Admin granted access to Audit Logs',
      passed: false,
      error: err.message
    });
  }

  // Test 3: Instructor role is forbidden from accessing Admin Audit Logs
  try {
    rogueStore.getAuditLogs('instructor');
    results.push({
      name: 'RBAC: Instructor forbidden from reading Audit Logs',
      passed: false,
      error: 'Expected access denial for instructor'
    });
  } catch (err: any) {
    results.push({
      name: 'RBAC: Instructor forbidden from reading Audit Logs',
      passed: err.message.includes('FORBIDDEN')
    });
  }

  return results;
}
