import React, { useState, useEffect } from 'react';
import { 
  Play, Square, RotateCcw, Shield, Clock, Cpu, HardDrive, WifiOff, 
  HelpCircle, CheckCircle2, AlertCircle, ArrowLeft, Send, Sparkles, Terminal
} from 'lucide-react';
import { Challenge, LabSession, LabStatus, User } from '../types';
import { WebTargetSimulator } from './targets/WebTargetSimulator';
import { LinuxTerminalSimulator } from './targets/LinuxTerminalSimulator';
import { NetworkPcapSimulator } from './targets/NetworkPcapSimulator';
import { SocLogSimulator } from './targets/SocLogSimulator';
import { CryptoJwtSimulator } from './targets/CryptoJwtSimulator';

interface LabSessionViewProps {
  challenge: Challenge;
  session: LabSession | undefined;
  currentUser: User;
  onStartLab: () => void;
  onStopLab: () => void;
  onResetLab: () => void;
  onSubmitFlag: (flag: string) => { isCorrect: boolean; message: string; pointsAwarded: number };
  onBackToCatalog: () => void;
  isCompleted: boolean;
  lang: 'ar' | 'en';
}

export const LabSessionView: React.FC<LabSessionViewProps> = ({
  challenge,
  session,
  currentUser,
  onStartLab,
  onStopLab,
  onResetLab,
  onSubmitFlag,
  onBackToCatalog,
  isCompleted,
  lang
}) => {
  const isAr = lang === 'ar';
  const [flagInput, setFlagInput] = useState('');
  const [submissionFeedback, setSubmissionFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(session?.remainingSeconds || 3600);

  // Timer countdown
  useEffect(() => {
    if (session?.status === 'RUNNING' && timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session?.status, timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagInput.trim()) return;
    const res = onSubmitFlag(flagInput);
    setSubmissionFeedback(res);
  };

  const handleCopyFlagToInput = (flag: string) => {
    setFlagInput(flag);
  };

  const getStatusBadge = (status: LabStatus) => {
    switch (status) {
      case 'RUNNING':
        return <span className="text-emerald-400 font-bold">{isAr ? 'قيد التشغيل' : 'RUNNING'}</span>;
      case 'READY':
        return <span className="text-cyan-400 font-bold">{isAr ? 'جاهز' : 'READY'}</span>;
      case 'PROVISIONING':
        return <span className="text-amber-400 font-bold">{isAr ? 'جاري التهيئة...' : 'PROVISIONING'}</span>;
      case 'RESETTING':
        return <span className="text-purple-400 font-bold">{isAr ? 'إعادة ضبط...' : 'RESETTING'}</span>;
      case 'STOPPING':
        return <span className="text-slate-400 font-bold">{isAr ? 'جاري الإيقاف...' : 'STOPPING'}</span>;
      case 'STOPPED':
        return <span className="text-slate-500 font-medium">{isAr ? 'متوقف' : 'STOPPED'}</span>;
      case 'FAILED':
        return <span className="text-red-400 font-bold">{isAr ? 'فشل' : 'FAILED'}</span>;
    }
  };

  const renderTargetSimulator = () => {
    if (!session || session.status === 'STOPPED') {
      return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Play className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              {isAr ? 'المختبر متوقف حالياً' : 'Lab Environment is Currently Stopped'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {isAr
                ? 'اضغط على زر "بدء المختبر" لتخصيص بيئة الحاوية المعزولة وتشغيل الهدف التدريبي.'
                : 'Click "Start Lab" above to spin up the isolated container target and initialize the sandbox.'}
            </p>
          </div>
          <button
            onClick={onStartLab}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-lg shadow-emerald-950/40 inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isAr ? 'بدء المختبر الآن' : 'Start Lab Now'}</span>
          </button>
        </div>
      );
    }

    switch (challenge.targetType) {
      case 'web':
        return <WebTargetSimulator onCopyFlag={handleCopyFlagToInput} lang={lang} />;
      case 'terminal':
        return <LinuxTerminalSimulator onCopyFlag={handleCopyFlagToInput} lang={lang} />;
      case 'network_pcap':
        return <NetworkPcapSimulator onCopyFlag={handleCopyFlagToInput} lang={lang} />;
      case 'soc_logs':
        return <SocLogSimulator onCopyFlag={handleCopyFlagToInput} lang={lang} />;
      case 'crypto_tool':
        return <CryptoJwtSimulator onCopyFlag={handleCopyFlagToInput} lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isAr ? 'الرجوع إلى الفهرس' : 'Back to Catalog'}
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="uppercase tracking-wider font-mono text-[11px] text-emerald-400">{challenge.category}</span>
              <span aria-hidden="true">·</span>
              <span>+{challenge.points} pts</span>
              <span aria-hidden="true">·</span>
              <span>{challenge.difficulty}</span>
            </div>
            <h1 className="text-xl font-bold text-white">{challenge.title}</h1>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-2.5">
          {(!session || session.status === 'STOPPED') ? (
            <button
              onClick={onStartLab}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>{isAr ? 'بدء المختبر' : 'Start Lab'}</span>
            </button>
          ) : (
            <>
              <button
                onClick={onResetLab}
                title={isAr ? 'إعادة ضبط حقيقية: مسح الملفات المؤقتة وإعادة بناء البيئة' : 'True Reset: Wipe ephemeral state and re-mint from baseline'}
                className="px-3.5 py-2 bg-purple-950/70 border border-purple-800/80 hover:bg-purple-900 text-purple-200 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? 'إعادة ضبط (Reset)' : 'Reset Target'}</span>
              </button>
              <button
                onClick={onStopLab}
                className="px-3.5 py-2 bg-red-950/70 border border-red-800/80 hover:bg-red-900 text-red-200 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{isAr ? 'إيقاف المختبر' : 'Stop Lab'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Lab Telemetry & Isolation Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <div className="text-slate-500 text-[11px] mb-0.5">{isAr ? 'حالة الجلسة:' : 'Session Status:'}</div>
          <div>{getStatusBadge(session?.status || 'STOPPED')}</div>
        </div>

        <div>
          <div className="text-slate-500 text-[11px] mb-0.5">{isAr ? 'الوقت المتبقي:' : 'Time Remaining:'}</div>
          <div className="flex items-center gap-1.5 text-slate-200 tabular-nums font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{session?.status === 'RUNNING' ? formatTimer(timerSeconds) : '--:--'}</span>
          </div>
        </div>

        <div>
          <div className="text-slate-500 text-[11px] mb-0.5">{isAr ? 'العزل الشبكي:' : 'Network Isolation:'}</div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
            <span>Isolated (No WAN)</span>
          </div>
        </div>

        <div>
          <div className="text-slate-500 text-[11px] mb-0.5">{isAr ? 'حدود الموارد (cgroups):' : 'Resource Caps:'}</div>
          <div className="text-slate-300">
            {session?.resourceLimits?.memory || '512 MB'} · {session?.resourceLimits?.cpu || '0.5 vCPU'}
          </div>
        </div>
      </div>

      {/* Main Grid: Target Simulator Viewport & Flag Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Interactive Target Sandbox (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'نافذة التفاعل مع الهدف التدريبي' : 'Target Execution Sandbox'}</span>
            </div>
            {session && (
              <span className="font-mono text-[11px] text-slate-500">
                Resets: <strong className="text-slate-300">{session.resetCount}</strong>
              </span>
            )}
          </div>

          {renderTargetSimulator()}

          {/* Learning Objectives & Safety Notes Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
            <div className="font-semibold text-white">
              {isAr ? 'أهداف التعلم والتعليمات الأمنية:' : 'Learning Objectives & Safety Notes:'}
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400 leading-relaxed">
              {challenge.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800/80">
              <strong className="text-slate-400">{isAr ? 'تنبيه أمني:' : 'Safety Notice:'}</strong> {challenge.safetyNotes}
            </div>
          </div>
        </div>

        {/* Right: Flag Submission Box, Hints & Scoring (1 col) */}
        <div className="space-y-5">
          
          {/* Flag Submission Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-white text-sm">
                {isAr ? 'تسليم العلم (Submit Flag)' : 'Submit Flag'}
              </div>
              {isCompleted && (
                <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'مكتمل' : 'Solved'}</span>
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'بعد استخراج العلم من داخل الهدف التدريبي، قم بإدخاله هنا للتحقق التلقائي والحصول على النقاط.'
                : 'Enter the captured flag string below to verify your solution and earn score points.'}
            </p>

            <form onSubmit={handleFlagSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="ROGUE{...}"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-emerald-400 font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isAr ? 'التحقق من الإجابة' : 'Submit & Validate'}</span>
              </button>
            </form>

            {/* Submission Result Feedback */}
            {submissionFeedback && (
              <div className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
                submissionFeedback.isCorrect
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/50 border-red-500/40 text-red-300'
              }`}>
                {submissionFeedback.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{submissionFeedback.message}</span>
              </div>
            )}
          </div>

          {/* Hints Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'تلميحات وإرشادات الحل' : 'Hints & Guidelines'}</span>
              </div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
              >
                {showHints ? (isAr ? 'إخفاء' : 'Hide') : (isAr ? 'إظهار التلميحات' : 'Reveal Hints')}
              </button>
            </div>

            {showHints ? (
              <div className="space-y-2 pt-1">
                {challenge.hints.map((hint, i) => (
                  <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-amber-400 mr-1 rtl:ml-1">#{i + 1}:</span>
                    {hint}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed">
                {isAr
                  ? 'هل تواجه صعوبة في التحدي؟ يمكنك إظهار التلميحات للمساعدة.'
                  : 'Stuck on this challenge? Reveal hints for methodology guidance.'}
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
