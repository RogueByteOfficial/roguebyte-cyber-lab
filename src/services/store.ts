/**
 * Central State & Business Logic Engine — RogueByte Cyber Lab
 * Architect: SID AHMED FARES (SidoDev-Dz)
 * Brand: RogueByte
 */

import { User, Role, Challenge, LabSession, LabStatus, Submission, UserScore, AuditLog, LabOrchestratorMetrics } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-student-1',
    email: 'student@roguebyte.local',
    fullName: 'Ahmed Fares',
    role: 'student',
    createdAt: '2026-03-01T10:00:00Z',
    bio: 'Cybersecurity Trainee specializing in Web Application Testing.'
  },
  {
    id: 'user-student-2',
    email: 'sarah.student@roguebyte.local',
    fullName: 'Sarah K.',
    role: 'student',
    createdAt: '2026-03-05T12:00:00Z',
    bio: 'Ethical Hacking Student & Linux Enthusiast.'
  },
  {
    id: 'user-instructor-1',
    email: 'instructor@roguebyte.local',
    fullName: 'Karim Belkacem',
    role: 'instructor',
    createdAt: '2026-02-15T08:30:00Z',
    bio: 'Lead Defensive Security & Incident Response Trainer.'
  },
  {
    id: 'user-admin-1',
    email: 'admin@roguebyte.local',
    fullName: 'SID AHMED FARES',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00Z',
    bio: 'Founder & Security Architect at RogueByte (SidoDev-Dz).'
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'web-101',
    title: 'OWASP Juice Shop: SQL Injection & Auth Bypass',
    slug: 'owasp-sqli-auth-bypass',
    category: 'web',
    difficulty: 'easy',
    points: 100,
    description: 'تطبيق ويب تدريبي يحاكي متجراً إلكترونياً مصاباً بثغرة حقن SQL في استعلام تسجيل الدخول. مهمتك هي تجاوز التحقق من كلمة المرور والدخول كمسؤول للنظام واستخراج العلم السري.',
    learningObjectives: [
      'فهم كيفية تركيب استعلامات SQL غير المحمية في قواعد البيانات',
      'استخدام تقنية SQL Injection Authentication Bypass (\' OR 1=1--)',
      'التعرف على آليات المعالجة البرمجية الآمنة باستخدام Prepared Statements'
    ],
    safetyNotes: 'جميع الأهداف التدريبية تعمل داخل شبكة معزولة (Isolated Bridge). يمنع اختبار أدوات الفحص على أي نطاقات خارجية.',
    hints: [
      'فحص حقل البريد الإلكتروني في نموذج الدخول بمدخلات تحتوي على رمز الاقتباس المفرد (\').',
      'تذكر أن الرمز -- في SQL يقوم بالتعليق على بقية الاستعلام.'
    ],
    flag: 'ROGUE{sql_1nj3ct10n_auth_byp4ss_succ3ss}',
    targetType: 'web',
    readinessEndpoint: '/health',
    estimatedTimeMinutes: 20,
    tags: ['OWASP Top 10', 'Injection', 'Authentication', 'SQLi']
  },
  {
    id: 'lnx-201',
    title: 'Linux Security: Privilege Escalation via SUID Binaries',
    slug: 'linux-suid-priv-esc',
    category: 'linux',
    difficulty: 'medium',
    points: 150,
    description: 'بيئة Linux مصغرة ومعزولة. تبدأ الجلسة كمستخدم غير ذي صلاحيات (rogue-trainee). قم بفحص النظام للبحث عن ملفات تنفيذية تحمل إذن SUID غير الآمن، واستغل ملف find لترقية صلاحياتك إلى root وقراءة العلم.',
    learningObjectives: [
      'استعراض أذونات الملفات وصلاحيات SUID الخاصة بنظام Linux',
      'استخدام أمر البحث: find / -perm -4000 2>/dev/null',
      'تطبيق مهارات رفع الصلاحيات عبر ملفات النظام الموثوقة'
    ],
    safetyNotes: 'حاوية الهدف مقيدة بـ 512MB RAM وتعمل بنظام ملفات قراءة فقط مع مجلد tmpfs مؤقت لمنع التعديل على النواة.',
    hints: [
      'استخدم الأمر find للبحث عن الملفات التي تمتلك SUID bit مفعل.',
      'راجع وثائق GTFOBins لملف find لمعرفة كيفية تشغيل شل بصلاحية root.'
    ],
    flag: 'ROGUE{su1d_f1nd_pr1v_3sc4l4t10n_pwn3d}',
    targetType: 'terminal',
    estimatedTimeMinutes: 30,
    tags: ['Linux', 'Privilege Escalation', 'SUID', 'GTFOBins']
  },
  {
    id: 'net-301',
    title: 'Network Defense: MitM & Cleartext Packet Inspection',
    slug: 'network-packet-mitm-inspection',
    category: 'network',
    difficulty: 'easy',
    points: 100,
    description: 'تحليل حركة المرور الشبكية المسجلة (PCAP Stream) لكشف هجوم انتحال عنوان ARP (ARP Poisoning) واستخراج بيانات الاعتماد الحساسة المنقولة عبر بروتوكول HTTP غير المشفر.',
    learningObjectives: [
      'فهم بنية حزم الشبكة لبروتوكولات ARP و TCP و HTTP',
      'تحديد مؤشرات الاختراق (IoCs) لهجمات الرجل في المنتصف (MitM)',
      'استخراج الحمولات والبيانات الحساسة من جلسات HTTP Streams'
    ],
    safetyNotes: 'يتم تشغيل حركة المرور داخل شبكة وهمية خالية من أي توجيه خارجي.',
    hints: [
      'فلترة الحزم لرؤية طلبات POST الموجهة لمسار الدخول /api/login.',
      'ابحث عن ردود ARP متكررة من نفس العنوان الفيزيائي MAC لعدة عناوين IP.'
    ],
    flag: 'ROGUE{pcap_cl3art3xt_cr3ds_1nt3rc3pt3d}',
    targetType: 'network_pcap',
    estimatedTimeMinutes: 25,
    tags: ['Wireshark', 'PCAP', 'ARP Spoofing', 'Packet Analysis']
  },
  {
    id: 'soc-401',
    title: 'Blue Team: SOC Log Analysis & Active Containment',
    slug: 'soc-auth-log-brute-force',
    category: 'blue_team',
    difficulty: 'medium',
    points: 200,
    description: 'أنت مسؤول مركز العمليات الأمنية (SOC Analyst). رصد النظام محاولات متتالية لاختراق SSH عبر هجوم القوة العمياء. حلل سجلات /var/log/auth.log، حدد عنوان IP المهاجم، وطبّق أمر الحظر في الجدار الناري.',
    learningObjectives: [
      'قراءة وتحليل سجلات المصادقة لنظام Linux (/var/log/auth.log)',
      'حساب معدل الفشل وتحديد نمط Dictionary Attacks',
      'اتخاذ إجراء الاستجابة الفوري عبر iptables / UFW وإصدار تقرير الحادث'
    ],
    safetyNotes: 'لا يتم إجراء أي حظر حقيقي على بطاقة الشبكة الفعلية لحاسوب المضيف.',
    hints: [
      'ابحث عن السطور التي تحتوي على "Failed password for invalid user" أو "Failed password for root".',
      'العنوان المتكرر أكثر من 50 مرة في دقيقة واحدة هو المهاجم.'
    ],
    flag: 'ROGUE{b1ue_t3am_brut3_f0rc3_c0nta1nm3nt}',
    targetType: 'soc_logs',
    estimatedTimeMinutes: 35,
    tags: ['Blue Team', 'SOC', 'Log Analysis', 'Incident Response']
  },
  {
    id: 'sec-501',
    title: 'Security Fundamentals: Insecure JWT None Algorithm',
    slug: 'jwt-none-algorithm-bypass',
    category: 'fundamentals',
    difficulty: 'easy',
    points: 100,
    description: 'تدريب على أمن رموز المصادقة JSON Web Tokens. تطبيق خادم يستقبل الرموز ولكنه يقبل خوارزمية "none". قم بتعديل الحمولة لتغيير دور المستخدم إلى admin وتجاوز التوقيع الرقمي.',
    learningObjectives: [
      'فهم تركيبة JWT (Header, Payload, Signature)',
      'التعرف على ثغرة Alg None Misconfiguration',
      'أفضل ممارسات التحقق الإجباري من خوارزمية التوقيع في الخادم'
    ],
    safetyNotes: 'الرموز تستخدم في بيئة المحاكاة المحلية فقط ولا تمثل مفاتيح حقيقية.',
    hints: [
      'قم بفك ترميز Base64Url للرأس (Header) والحمولة (Payload).',
      'غير "alg": "HS256" إلى "alg": "none"، وغير "role": "user" إلى "role": "admin"، ثم احذف التوقيع بعد النقطة الثانية.'
    ],
    flag: 'ROGUE{jwt_alg0r1thm_n0n3_f0rg3ry_d0n3}',
    targetType: 'crypto_tool',
    estimatedTimeMinutes: 20,
    tags: ['JWT', 'Cryptography', 'Authentication', 'Token Forgery']
  }
];

class RogueByteStore {
  private users: User[] = [...INITIAL_USERS];
  private currentUser: User = INITIAL_USERS[0]; // Default: Student Ahmed Fares
  private challenges: Challenge[] = [...INITIAL_CHALLENGES];
  private sessions: Map<string, LabSession> = new Map();
  private submissions: Submission[] = [];
  private scores: Map<string, UserScore> = new Map();
  private auditLogs: AuditLog[] = [];

  constructor() {
    this.seedInitialState();
  }

  private seedInitialState() {
    // Seed initial scores
    this.scores.set('user-student-1', {
      userId: 'user-student-1',
      totalPoints: 100,
      rank: 2,
      completedChallengeIds: ['web-101'],
      lastActive: new Date().toISOString(),
      streakDays: 4
    });

    this.scores.set('user-student-2', {
      userId: 'user-student-2',
      totalPoints: 250,
      rank: 1,
      completedChallengeIds: ['web-101', 'lnx-201'],
      lastActive: new Date().toISOString(),
      streakDays: 7
    });

    // Seed initial submission
    this.submissions.push({
      id: 'sub-seed-1',
      userId: 'user-student-1',
      challengeId: 'web-101',
      submittedFlag: 'ROGUE{sql_1nj3ct10n_auth_byp4ss_succ3ss}',
      isCorrect: true,
      pointsAwarded: 100,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ipAddress: '10.200.1.42'
    });

    // Seed audit log entry
    this.logAudit({
      actorId: 'user-admin-1',
      actorName: 'SID AHMED FARES',
      actorRole: 'admin',
      action: 'SYSTEM_BOOTSTRAP',
      resourceType: 'system',
      resourceId: 'node-master-01',
      ipAddress: '127.0.0.1',
      details: {
        engine: 'RogueByte Lab Daemon',
        isolationMode: 'cgroups_v2_internal_bridge',
        author: 'SID AHMED FARES (SidoDev-Dz)'
      }
    });
  }

  // --- Auth & Persona ---
  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUser(userId: string): User {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error(`User ${userId} not found`);
    this.currentUser = user;
    this.logAudit({
      actorId: user.id,
      actorName: user.fullName,
      actorRole: user.role,
      action: 'USER_LOGIN_SWITCH',
      resourceType: 'user_session',
      resourceId: user.id,
      ipAddress: '10.200.1.42'
    });
    return user;
  }

  public getUsers(): User[] {
    return [...this.users];
  }

  // --- Challenges ---
  public getChallenges(): Challenge[] {
    return [...this.challenges];
  }

  public getChallenge(id: string): Challenge | undefined {
    return this.challenges.find(c => c.id === id || c.slug === id);
  }

  // --- Lab Sessions & Orchestrator ---
  public getSession(sessionId: string): LabSession | undefined {
    return this.sessions.get(sessionId);
  }

  public getUserSessions(userId: string): LabSession[] {
    return Array.from(this.sessions.values()).filter(s => s.userId === userId);
  }

  public getAllActiveSessions(): LabSession[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Enforces server-side ownership:
   * Returns true if user owns the lab, or is an admin.
   */
  public verifyOwnership(userId: string, sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;
    if (user.role === 'admin') return true;
    return session.userId === userId;
  }

  /**
   * Starts a lab session: STOPPED -> PROVISIONING -> READY -> RUNNING
   */
  public startLab(userId: string, challengeId: string): LabSession {
    const challenge = this.getChallenge(challengeId);
    if (!challenge) throw new Error('Challenge not found');

    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    // Check if user already has an active session for this challenge
    const existing = Array.from(this.sessions.values()).find(
      s => s.userId === userId && s.challengeId === challengeId && s.status !== 'STOPPED'
    );
    if (existing) return existing;

    const sessionId = `lab-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const portOffset = Math.floor(Math.random() * 1000) + 30000;

    const newSession: LabSession = {
      id: sessionId,
      userId,
      challengeId,
      status: 'PROVISIONING',
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      remainingSeconds: 3600,
      targetHost: '10.200.1.10',
      targetPort: portOffset,
      resetCount: 0,
      networkIsolated: true,
      networkName: `br_rogue_lab_${sessionId.slice(0, 8)}`,
      resourceLimits: {
        cpu: '0.5 vCPU',
        memory: '512 MB',
        pids: 100
      },
      containerState: {
        ephemeralFiles: {},
        tamperedState: false,
        logs: [`[${new Date().toLocaleTimeString()}] Provisioning container cgroup namespace...`,
               `[${new Date().toLocaleTimeString()}] Binding strictly internal network bridge...`]
      }
    };

    this.sessions.set(sessionId, newSession);

    this.logAudit({
      actorId: user.id,
      actorName: user.fullName,
      actorRole: user.role,
      action: 'LAB_PROVISION_START',
      resourceType: 'lab_session',
      resourceId: sessionId,
      ipAddress: '10.200.1.42',
      details: { challengeId, template: challenge.category }
    });

    // Simulate instant deterministic transition to READY then RUNNING
    newSession.status = 'READY';
    newSession.containerState.logs.push(`[${new Date().toLocaleTimeString()}] Readiness probe HTTP 200 OK.`);
    newSession.status = 'RUNNING';

    return newSession;
  }

  /**
   * Stops a lab session safely
   */
  public stopLab(userId: string, sessionId: string): LabSession {
    if (!this.verifyOwnership(userId, sessionId)) {
      throw new Error('FORBIDDEN: You do not own this lab session.');
    }

    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    const user = this.users.find(u => u.id === userId)!;

    session.status = 'STOPPING';
    session.containerState.logs.push(`[${new Date().toLocaleTimeString()}] Halting container gracefully...`);
    
    session.status = 'STOPPED';
    session.remainingSeconds = 0;
    session.containerState.logs.push(`[${new Date().toLocaleTimeString()}] Storage layer wiped. Ephemeral network disassembled.`);

    this.logAudit({
      actorId: user.id,
      actorName: user.fullName,
      actorRole: user.role,
      action: 'LAB_STOP_SUCCESS',
      resourceType: 'lab_session',
      resourceId: sessionId,
      ipAddress: '10.200.1.42'
    });

    return session;
  }

  /**
   * Full True Reset of the Lab Session:
   * 1. Validates ownership
   * 2. Moves to RESETTING
   * 3. Completely wipes ephemeral writable layer and tampering
   * 4. Re-instantiates clean immutable base
   * 5. Preserves academic score in PostgreSQL / Store
   * 6. Moves back to READY -> RUNNING
   */
  public resetLab(userId: string, sessionId: string): LabSession {
    if (!this.verifyOwnership(userId, sessionId)) {
      throw new Error('FORBIDDEN: You do not have permission to reset this lab session.');
    }

    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    const user = this.users.find(u => u.id === userId)!;

    session.status = 'RESETTING';
    session.resetCount += 1;
    session.containerState.logs.push(`[${new Date().toLocaleTimeString()}] RESET INITIATED (Cycle #${session.resetCount})`);
    
    // Scrub all ephemeral writes
    session.containerState.ephemeralFiles = {};
    session.containerState.tamperedState = false;
    session.containerState.logs.push(`[${new Date().toLocaleTimeString()}] Ephemeral tmpfs flushed. Target re-minted from immutable base image.`);
    
    // Readiness probe
    session.containerState.logs.push(`[${new Date().toLocaleTimeString()}] Health check verified. Memory cap 512MB reapplied.`);
    session.status = 'READY';
    session.status = 'RUNNING';

    this.logAudit({
      actorId: user.id,
      actorName: user.fullName,
      actorRole: user.role,
      action: 'LAB_TRUE_RESET',
      resourceType: 'lab_session',
      resourceId: sessionId,
      ipAddress: '10.200.1.42',
      details: { resetIteration: session.resetCount }
    });

    return session;
  }

  /**
   * Flag Submission and Automated Verification
   */
  public submitFlag(userId: string, challengeId: string, submittedFlag: string): { isCorrect: boolean; message: string; pointsAwarded: number } {
    const challenge = this.getChallenge(challengeId);
    if (!challenge) throw new Error('Challenge not found');

    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    const cleanInput = submittedFlag.trim();
    const isCorrect = cleanInput === challenge.flag;

    const userScore = this.scores.get(userId) || {
      userId,
      totalPoints: 0,
      rank: 99,
      completedChallengeIds: [],
      lastActive: new Date().toISOString(),
      streakDays: 1
    };

    const alreadySolved = userScore.completedChallengeIds.includes(challengeId);
    let pointsAwarded = 0;

    if (isCorrect && !alreadySolved) {
      pointsAwarded = challenge.points;
      userScore.totalPoints += pointsAwarded;
      userScore.completedChallengeIds.push(challengeId);
      userScore.lastActive = new Date().toISOString();
      this.scores.set(userId, userScore);
    }

    const submission: Submission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      challengeId,
      submittedFlag: cleanInput,
      isCorrect,
      pointsAwarded,
      timestamp: new Date().toISOString(),
      ipAddress: '10.200.1.42'
    };
    this.submissions.push(submission);

    this.logAudit({
      actorId: user.id,
      actorName: user.fullName,
      actorRole: user.role,
      action: isCorrect ? 'CHALLENGE_SOLVED_SUCCESS' : 'CHALLENGE_FLAG_INCORRECT',
      resourceType: 'challenge',
      resourceId: challengeId,
      ipAddress: '10.200.1.42',
      details: { pointsAwarded, alreadySolved }
    });

    if (isCorrect) {
      return {
        isCorrect: true,
        message: alreadySolved 
          ? 'العلم صحيح! (لقد حصلت على نقاط هذا التحدي مسبقاً).'
          : `مبروك! تم حل التحدي بنجاح وإضافة +${pointsAwarded} نقطة إلى رصيدك.`,
        pointsAwarded
      };
    } else {
      return {
        isCorrect: false,
        message: 'العلم غير صحيح. راجع المخرجات والتعليمات وحاول مجدداً.',
        pointsAwarded: 0
      };
    }
  }

  // --- Submissions & Scores ---
  public getUserScore(userId: string): UserScore {
    return this.scores.get(userId) || {
      userId,
      totalPoints: 0,
      rank: 1,
      completedChallengeIds: [],
      lastActive: new Date().toISOString(),
      streakDays: 1
    };
  }

  public getAllScores(): UserScore[] {
    return Array.from(this.scores.values()).sort((a, b) => b.totalPoints - a.totalPoints);
  }

  public getUserSubmissions(userId: string): Submission[] {
    return this.submissions.filter(s => s.userId === userId);
  }

  public getAllSubmissions(): Submission[] {
    return [...this.submissions];
  }

  // --- Audit Logs ---
  public logAudit(entry: Omit<AuditLog, 'id' | 'timestamp'>) {
    const log: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      ...entry
    };
    this.auditLogs.unshift(log);
    // Keep max 200 logs in memory
    if (this.auditLogs.length > 200) {
      this.auditLogs.pop();
    }
  }

  public getAuditLogs(requestingUserRole: Role): AuditLog[] {
    if (requestingUserRole !== 'admin') {
      throw new Error('FORBIDDEN: Only administrators can view system audit logs.');
    }
    return [...this.auditLogs];
  }

  // --- Orchestrator Metrics ---
  public getMetrics(): LabOrchestratorMetrics {
    const activeSessions = Array.from(this.sessions.values()).filter(
      s => s.status === 'RUNNING' || s.status === 'READY' || s.status === 'PROVISIONING'
    );
    const totalResets = Array.from(this.sessions.values()).reduce((sum, s) => sum + s.resetCount, 0);

    return {
      totalNodes: 3,
      activeContainers: activeSessions.length,
      maxCapacity: 20,
      cpuLoadPercentage: Math.min(95, 12 + activeSessions.length * 8),
      memoryUsedMb: 512 + activeSessions.length * 256,
      isolatedNetworksActive: activeSessions.length,
      totalResetsExecuted: totalResets
    };
  }
}

export const rogueStore = new RogueByteStore();
