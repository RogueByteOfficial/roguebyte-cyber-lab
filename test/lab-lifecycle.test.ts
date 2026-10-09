/**
 * Test Suite: Lab Lifecycle & True Reset Verification
 * Architect: SID AHMED FARES (SidoDev-Dz)
 */

import { rogueStore } from '../src/services/store.ts';

export function runLabLifecycleTests(): { name: string; passed: boolean; error?: string }[] {
  const results: { name: string; passed: boolean; error?: string }[] = [];
  const studentId = 'user-student-2';

  // 1. Provisioning & State Transitions
  try {
    const session = rogueStore.startLab(studentId, 'lnx-201');
    const isRunning = session.status === 'RUNNING';
    const hasIsolation = session.networkIsolated === true && session.networkName.startsWith('br_rogue_lab_');
    const hasResourceCaps = session.resourceLimits.memory === '512 MB' && session.resourceLimits.pids === 100;

    results.push({
      name: 'Lifecycle: Lab starts with strict resource caps & isolated bridge network',
      passed: isRunning && hasIsolation && hasResourceCaps
    });

    // 2. Simulate Ephemeral Container Mutation
    session.containerState.ephemeralFiles['/tmp/exploit.py'] = 'import os; os.system("whoami")';
    session.containerState.tamperedState = true;

    // Record student points before reset
    const scoreBeforeReset = rogueStore.getUserScore(studentId).totalPoints;

    // 3. True Reset Execution
    const postResetSession = rogueStore.resetLab(studentId, session.id);
    const ephemeralWiped = Object.keys(postResetSession.containerState.ephemeralFiles).length === 0;
    const tamperedCleared = postResetSession.containerState.tamperedState === false;
    const resetCounterIncremented = postResetSession.resetCount > 0;
    const scoreAfterReset = rogueStore.getUserScore(studentId).totalPoints;

    results.push({
      name: 'Lifecycle: True Reset completely purges ephemeral filesystem mutations',
      passed: ephemeralWiped && tamperedCleared && resetCounterIncremented
    });

    results.push({
      name: 'Lifecycle: Academic points & learning records preserved across container resets',
      passed: scoreBeforeReset === scoreAfterReset
    });

    // 4. Safe Teardown
    const stopped = rogueStore.stopLab(studentId, session.id);
    results.push({
      name: 'Lifecycle: Graceful stop dismantles target and transitions to STOPPED',
      passed: stopped.status === 'STOPPED'
    });
  } catch (err: any) {
    results.push({
      name: 'Lifecycle: Session execution flow',
      passed: false,
      error: err.message
    });
  }

  return results;
}
