/**
 * Test Suite: Flag Scoring Engine & Replay Attack Prevention
 * Architect: SID AHMED FARES (SidoDev-Dz)
 */

import { rogueStore } from '../src/services/store.ts';

export function runScoringTests(): { name: string; passed: boolean; error?: string }[] {
  const results: { name: string; passed: boolean; error?: string }[] = [];
  const studentId = 'user-student-1';
  const challengeId = 'net-301'; // Not solved yet by student 1

  try {
    const initialScore = rogueStore.getUserScore(studentId).totalPoints;

    // Test 1: Submitting incorrect flag
    const wrongAttempt = rogueStore.submitFlag(studentId, challengeId, 'ROGUE{incorrect_flag_attempt}');
    results.push({
      name: 'Scoring: Incorrect flag rejected with 0 points',
      passed: wrongAttempt.isCorrect === false && wrongAttempt.pointsAwarded === 0
    });

    // Test 2: Submitting correct flag awards points
    const correctAttempt = rogueStore.submitFlag(studentId, challengeId, 'ROGUE{pcap_cl3art3xt_cr3ds_1nt3rc3pt3d}');
    const scoreAfterSolve = rogueStore.getUserScore(studentId).totalPoints;
    results.push({
      name: 'Scoring: Legitimate flag accepted and points credited',
      passed: correctAttempt.isCorrect === true && 
              correctAttempt.pointsAwarded === 100 && 
              scoreAfterSolve === initialScore + 100
    });

    // Test 3: Replay attack prevention (re-submitting does not double points)
    const replayAttempt = rogueStore.submitFlag(studentId, challengeId, 'ROGUE{pcap_cl3art3xt_cr3ds_1nt3rc3pt3d}');
    const scoreAfterReplay = rogueStore.getUserScore(studentId).totalPoints;
    results.push({
      name: 'Scoring: Replay attack mitigated (no duplicate points awarded for already solved challenge)',
      passed: replayAttempt.isCorrect === true && 
              replayAttempt.pointsAwarded === 0 && 
              scoreAfterReplay === scoreAfterSolve
    });
  } catch (err: any) {
    results.push({
      name: 'Scoring: Validation pipeline',
      passed: false,
      error: err.message
    });
  }

  return results;
}
