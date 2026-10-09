import React, { useState } from 'react';
import { Shield, Server, Activity, AlertTriangle, RefreshCw, Square, Terminal, Cpu, HardDrive, WifiOff } from 'lucide-react';
import { User, AuditLog, LabOrchestratorMetrics, LabSession } from '../../types';

interface AdminDashboardViewProps {
  currentUser: User;
  metrics: LabOrchestratorMetrics;
  auditLogs: AuditLog[];
  activeSessions: LabSession[];
  onForceStopSession: (sessionId: string) => void;
  lang: 'ar' | 'en';
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  metrics,
  auditLogs,
  activeSessions,
  onForceStopSession,
  lang
}) => {
  const isAr = lang === 'ar';
  const [filterAction, setFilterAction] = useState<string>('ALL');

  const filteredLogs = auditLogs.filter(log => {
    if (filterAction === 'ALL') return true;
    return log.action.includes(filterAction);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span>{isAr ? 'لوحة إدارة النظام والبنية التحتية' : 'Platform & Orchestrator Administration'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'مراقبة عُقد التشغيل، فحص العزل الشبكي، والوصول إلى سجلات التدقيق غير القابلة للتلاعب.'
              : 'Cluster oversight, network isolation health checks, and immutable audit logs.'}
          </p>
        </div>
        <div className="text-xs font-mono text-slate-500">
          Superadmin: <span className="text-emerald-400 font-bold">SID AHMED FARES (SidoDev-Dz)</span>
        </div>
      </div>

      {/* Live Cluster Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'عُقد الحاويات النشطة:' : 'Orchestrator Nodes:'}</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">{metrics.totalNodes} Nodes</div>
          <div className="text-[11px] text-emerald-400 font-mono">100% Health Status</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'الحاويات المعزولة الجارية:' : 'Running Targets:'}</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
            {metrics.activeContainers} / {metrics.maxCapacity}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Capacity: {Math.round((metrics.activeContainers / metrics.maxCapacity) * 100)}%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'استهلاك الذاكرة والمعالج:' : 'cgroups Resource Load:'}</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">{metrics.memoryUsedMb} MB</div>
          <div className="text-[11px] text-slate-400 font-mono">CPU Load: {metrics.cpuLoadPercentage}%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">{isAr ? 'دورات إعادة الضبط (True Resets):' : 'True Resets Executed:'}</div>
          <div className="text-2xl font-bold text-purple-400 font-mono tabular-nums">{metrics.totalResetsExecuted}</div>
          <div className="text-[11px] text-slate-400 font-mono">Storage Purged: 100%</div>
        </div>
      </div>

      {/* Active Sessions Supervisory Monitor */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'الجلسات الجارية حالياً في البيئات المعزولة' : 'Active Isolated Lab Sessions'}</span>
          </div>
          <span className="font-mono text-xs text-slate-400">{activeSessions.length} Active Sessions</span>
        </div>

        {activeSessions.length > 0 ? (
          <div className="space-y-2">
            {activeSessions.map(sess => (
              <div key={sess.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-mono font-bold text-slate-200">Session ID: {sess.id}</div>
                  <div className="font-mono text-[11px] text-slate-400">
                    Host: {sess.targetHost}:{sess.targetPort} · Net: {sess.networkName} (Isolated) · User: {sess.userId}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold font-mono text-xs">{sess.status}</span>
                  <button
                    onClick={() => onForceStopSession(sess.id)}
                    className="px-2.5 py-1 bg-red-950/80 border border-red-800/80 hover:bg-red-900 text-red-200 font-semibold rounded text-xs transition-colors flex items-center gap-1"
                  >
                    <Square className="w-3 h-3 fill-current" />
                    <span>{isAr ? 'إنهاء قسري' : 'Force Stop'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            {isAr ? 'لا توجد حاويات نشطة حالياً. جميع موارد العزل جاهزة في وضع الاستعداد.' : 'No active lab containers running. All sandbox resources are idle and ready.'}
          </div>
        )}
      </div>

      {/* Immutable Security Audit Logs Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden space-y-3">
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'سجل التدقيق الأمني (Tamper-Resistant Audit Trail)' : 'Security Audit Logs Stream'}</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Source: PostgreSQL audit_logs table · Strict RBAC Protected
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            {['ALL', 'LAB', 'CHALLENGE', 'LOGIN'].map(f => (
              <button
                key={f}
                onClick={() => setFilterAction(f)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  filterAction === f ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto max-h-[360px]">
          <table className="w-full text-left rtl:text-right font-mono text-[11px]">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 sticky top-0">
              <tr>
                <th className="py-2 px-3">Timestamp</th>
                <th className="py-2 px-3">Actor</th>
                <th className="py-2 px-3">Action</th>
                <th className="py-2 px-3">Resource</th>
                <th className="py-2 px-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-2 px-3 text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-3 text-white font-semibold">
                    {log.actorName} ({log.actorRole})
                  </td>
                  <td className="py-2 px-3 font-bold text-emerald-400">
                    {log.action}
                  </td>
                  <td className="py-2 px-3 text-slate-400 truncate max-w-xs">
                    {log.resourceType}:{log.resourceId}
                  </td>
                  <td className="py-2 px-3 text-slate-500 tabular-nums">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
