import React from 'react';
import { Award, CheckCircle2, Flame, Clock, Play, ArrowRight, Shield } from 'lucide-react';
import { User, UserScore, Challenge, Submission, LabSession } from '../../types';

interface StudentDashboardViewProps {
  currentUser: User;
  userScore: UserScore;
  challenges: Challenge[];
  submissions: Submission[];
  activeSessions: LabSession[];
  onSelectChallenge: (id: string) => void;
  lang: 'ar' | 'en';
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  currentUser,
  userScore,
  challenges,
  submissions,
  activeSessions,
  onSelectChallenge,
  lang
}) => {
  const isAr = lang === 'ar';

  const userSubmissions = submissions.filter(s => s.userId === currentUser.id);
  const completedChallenges = challenges.filter(c => userScore.completedChallengeIds.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Student Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isAr ? `مرحباً بك، ${currentUser.fullName}` : `Welcome back, ${currentUser.fullName}`}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'تابع تقدمك الأكاديمي، النقاط المحرزة، وحالة المختبرات النشطة.'
              : 'Track your academic progress, captured flags, and active lab sessions.'}
          </p>
        </div>
        <div className="text-xs font-mono text-slate-500">
          Account Role: <span className="text-emerald-400 font-bold uppercase">{currentUser.role}</span>
        </div>
      </div>

      {/* KPI Stat Cards (High-Density Discipline) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'مجموع النقاط:' : 'Total Points:'}</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">{userScore.totalPoints} pts</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'التحديات المكتملة:' : 'Challenges Solved:'}</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">{userScore.completedChallengeIds.length} / {challenges.length}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'الترتيب العام:' : 'Global Rank:'}</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">#{userScore.rank}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'أيام التدريب المتتالية:' : 'Active Streak:'}</div>
          <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums flex items-center gap-1">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>{userScore.streakDays} days</span>
          </div>
        </div>
      </div>

      {/* Active Lab Sessions Banner */}
      {activeSessions.length > 0 && (
        <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>{isAr ? 'لديك جلسة مختبر نشطة حالياً' : 'Active Lab Session Running'}</span>
            </div>
            <span className="font-mono text-xs text-emerald-300 tabular-nums">Status: RUNNING</span>
          </div>
          {activeSessions.map(sess => {
            const ch = challenges.find(c => c.id === sess.challengeId);
            return (
              <div key={sess.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-lg border border-emerald-900/40">
                <div>
                  <div className="font-bold text-white text-xs">{ch?.title}</div>
                  <div className="font-mono text-[11px] text-slate-400">
                    Host: {sess.targetHost}:{sess.targetPort} · Network: {sess.networkName}
                  </div>
                </div>
                <button
                  onClick={() => onSelectChallenge(sess.challengeId)}
                  className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{isAr ? 'متابعة المختبر' : 'Resume Lab'}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Grid: Solved Challenges & Recent Submissions Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Solved Challenges */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="font-bold text-white text-sm">
            {isAr ? 'التحديات المنجزة' : 'Solved Challenges'}
          </div>

          <div className="space-y-2.5">
            {completedChallenges.map(c => (
              <div
                key={c.id}
                onClick={() => onSelectChallenge(c.id)}
                className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-colors cursor-pointer group"
              >
                <div>
                  <div className="font-medium text-white text-xs group-hover:text-emerald-400 transition-colors">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {c.category} · {c.difficulty}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-emerald-400 text-xs font-bold tabular-nums">+{c.points} pts</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}

            {completedChallenges.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-xs">
                {isAr ? 'لم تقم بحل أي تحدٍ بعد. توجه للفهرس للبدء.' : 'No challenges completed yet. Head to the catalog to start.'}
              </div>
            )}
          </div>
        </div>

        {/* Recent Submissions Log */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="font-bold text-white text-sm">
            {isAr ? 'سجل تسليم الأعلام الأخير' : 'Recent Flag Submissions Log'}
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            {userSubmissions.slice(-5).reverse().map(sub => {
              const ch = challenges.find(c => c.id === sub.challengeId);
              return (
                <div key={sub.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-slate-300 font-sans font-medium text-xs truncate max-w-[200px]">{ch?.title}</div>
                    <div className="text-slate-500 text-[10px]">{new Date(sub.timestamp).toLocaleTimeString()}</div>
                  </div>
                  <div className="text-right rtl:text-left">
                    {sub.isCorrect ? (
                      <span className="text-emerald-400 font-bold">CORRECT (+{sub.pointsAwarded} pts)</span>
                    ) : (
                      <span className="text-red-400">INCORRECT</span>
                    )}
                  </div>
                </div>
              );
            })}

            {userSubmissions.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-xs font-sans">
                {isAr ? 'لا توجد محاولات تسليم مسجلة حتى الآن.' : 'No submission attempts recorded yet.'}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
