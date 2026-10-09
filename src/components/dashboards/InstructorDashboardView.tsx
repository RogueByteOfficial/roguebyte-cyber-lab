import React from 'react';
import { Users, BookOpen, Activity, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { User, Challenge, UserScore, Submission } from '../../types';

interface InstructorDashboardViewProps {
  currentUser: User;
  students: User[];
  allScores: UserScore[];
  challenges: Challenge[];
  allSubmissions: Submission[];
  lang: 'ar' | 'en';
}

export const InstructorDashboardView: React.FC<InstructorDashboardViewProps> = ({
  currentUser,
  students,
  allScores,
  challenges,
  allSubmissions,
  lang
}) => {
  const isAr = lang === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isAr ? 'لوحة تحكم المدرب والمشرف الأكاديمي' : 'Instructor & Curriculum Console'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'متابعة أداء الطلاب، نسب إنجاز التحديات، ومراجعة سجلات التقدم الأكاديمي.'
              : 'Monitor student cohorts, challenge completion ratios, and academic progression.'}
          </p>
        </div>
        <div className="text-xs font-mono text-slate-500">
          Role: <span className="text-cyan-400 font-bold uppercase">{currentUser.role}</span>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'الطلاب المسجلون:' : 'Enrolled Students:'}</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">{students.length}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'المختبرات المتاحة:' : 'Active Lab Templates:'}</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">{challenges.length}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'إجمالي التسليمات:' : 'Total Submissions:'}</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">{allSubmissions.length}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'نسبة النجاح العامة:' : 'Solve Success Rate:'}</div>
          <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
            {allSubmissions.length > 0 
              ? `${Math.round((allSubmissions.filter(s => s.isCorrect).length / allSubmissions.length) * 100)}%` 
              : '100%'}
          </div>
        </div>
      </div>

      {/* Student Cohort Performance Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 font-bold text-white text-sm">
          {isAr ? 'قائمة الطلاب والنتائج الأكاديمية' : 'Student Performance Matrix'}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">{isAr ? 'اسم الطالب' : 'Student'}</th>
                <th className="py-2.5 px-4">{isAr ? 'البريد الإلكتروني' : 'Email'}</th>
                <th className="py-2.5 px-4">{isAr ? 'التحديات المنجزة' : 'Solved'}</th>
                <th className="py-2.5 px-4">{isAr ? 'مجموع النقاط' : 'Points'}</th>
                <th className="py-2.5 px-4">{isAr ? 'الترتيب' : 'Rank'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {students.map(st => {
                const score = allScores.find(s => s.userId === st.id);
                return (
                  <tr key={st.id} className="hover:bg-slate-850 transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{st.fullName}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{st.email}</td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-300">
                      {score?.completedChallengeIds.length || 0} / {challenges.length}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums font-bold text-emerald-400">
                      {score?.totalPoints || 0} pts
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-cyan-400 font-semibold">
                      #{score?.rank || 99}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
