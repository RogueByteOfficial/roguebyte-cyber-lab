/**
 * Core Types & Domain Models — RogueByte Cyber Lab
 * Architect: SID AHMED FARES (SidoDev-Dz)
 * Brand: RogueByte
 */

export type Role = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  createdAt: string;
  bio?: string;
  avatarSeed?: string;
}

export type LabStatus = 
  | 'STOPPED' 
  | 'PROVISIONING' 
  | 'READY' 
  | 'RUNNING' 
  | 'RESETTING' 
  | 'STOPPING' 
  | 'FAILED';

export type ChallengeCategory = 'web' | 'linux' | 'network' | 'blue_team' | 'fundamentals';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  category: ChallengeCategory;
  difficulty: DifficultyLevel;
  points: number;
  description: string;
  learningObjectives: string[];
  safetyNotes: string;
  hints: string[];
  flag: string; // Stored securely on server, verified via hash in real deployment
  targetType: 'web' | 'terminal' | 'network_pcap' | 'soc_logs' | 'crypto_tool';
  readinessEndpoint?: string;
  estimatedTimeMinutes: number;
  tags: string[];
}

export interface LabSession {
  id: string;
  userId: string;
  challengeId: string;
  status: LabStatus;
  startedAt?: string;
  expiresAt?: string;
  remainingSeconds: number;
  targetHost: string;
  targetPort: number;
  resetCount: number;
  failureReason?: string;
  networkIsolated: boolean;
  networkName: string;
  resourceLimits: {
    cpu: string;
    memory: string;
    pids: number;
  };
  containerState: {
    ephemeralFiles: Record<string, string>;
    tamperedState: boolean;
    logs: string[];
  };
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  submittedFlag: string;
  isCorrect: boolean;
  pointsAwarded: number;
  timestamp: string;
  ipAddress: string;
}

export interface UserScore {
  userId: string;
  totalPoints: number;
  rank: number;
  completedChallengeIds: string[];
  lastActive: string;
  streakDays: number;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: Role;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface LabOrchestratorMetrics {
  totalNodes: number;
  activeContainers: number;
  maxCapacity: number;
  cpuLoadPercentage: number;
  memoryUsedMb: number;
  isolatedNetworksActive: number;
  totalResetsExecuted: number;
}
