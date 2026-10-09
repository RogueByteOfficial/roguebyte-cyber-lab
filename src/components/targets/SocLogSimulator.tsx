import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Ban, Copy, Terminal, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SocLogSimulatorProps {
  onCopyFlag: (flag: string) => void;
  lang: 'ar' | 'en';
}

export const SocLogSimulator: React.FC<SocLogSimulatorProps> = ({ onCopyFlag, lang }) => {
  const isAr = lang === 'ar';
  const FLAG = 'ROGUE{b1ue_t3am_brut3_f0rc3_c0nta1nm3nt}';

  const [isBlocked, setIsBlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filterIp, setFilterIp] = useState('');

  const rawLogs = [
    'Mar 09 04:12:01 auth sshd[14210]: Failed password for invalid user admin from 198.51.100.77 port 48210 ssh2',
    'Mar 09 04:12:03 auth sshd[14212]: Failed password for invalid user root from 198.51.100.77 port 48214 ssh2',
    'Mar 09 04:12:04 auth sshd[14215]: Failed password for invalid user test from 198.51.100.77 port 48218 ssh2',
    'Mar 09 04:12:06 auth sshd[14218]: Failed password for invalid user oracle from 198.51.100.77 port 48222 ssh2',
    'Mar 09 04:12:08 auth sshd[14220]: Failed password for invalid user ubuntu from 198.51.100.77 port 48226 ssh2',
    'Mar 09 04:12:09 auth sshd[14223]: Failed password for invalid user deploy from 198.51.100.77 port 48230 ssh2',
    'Mar 09 04:12:11 auth sshd[14225]: Failed password for invalid user operator from 198.51.100.77 port 48234 ssh2',
    'Mar 09 04:12:13 auth sshd[14228]: Failed password for invalid user postgres from 198.51.100.77 port 48238 ssh2'
  ];

  const handleMitigate = () => {
    setIsBlocked(true);
  };

  const handleCopy = () => {
    onCopyFlag(FLAG);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans text-xs">
      {/* SOC Triage Header */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-slate-200">
            {isAr ? 'مركز العمليات الأمنية (SOC) · تحليل سجلات /var/log/auth.log' : 'SOC Analyst Console · /var/log/auth.log Triage'}
          </span>
        </div>
        <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/60">
          <AlertTriangle className="w-3 h-3" />
          <span>Active SSH Brute Force In Progress</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Attacker Identification Card */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-slate-400 text-[11px] mb-0.5">{isAr ? 'عنوان IP المهاجم المكتشف:' : 'Identified Offending IP:'}</div>
            <div className="font-mono text-sm font-bold text-red-400">198.51.100.77 (ASN 64496 - Malicious Botnet)</div>
          </div>
          <div>
            {!isBlocked ? (
              <button
                onClick={handleMitigate}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 text-xs shadow-lg shadow-red-950/50"
              >
                <Ban className="w-4 h-4" />
                <span>{isAr ? 'تطبيق حظر الجدار الناري (iptables DROP)' : 'Apply Firewall Containment (DROP)'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-900/60">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'تم عزل وحظر المهاجم بنجاح!' : 'Attacker Successfully Isolated!'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Success Flag Display */}
        {isBlocked && (
          <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'تقرير الحادث الأمني مكتمل: استخرج العلم' : 'Incident Containment Verified: Extract Flag'}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-xs flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ العلم' : 'Copy Flag')}</span>
              </button>
            </div>
            <div className="bg-slate-950 p-2.5 rounded font-mono text-xs text-emerald-300 border border-emerald-900/60 select-all">
              {FLAG}
            </div>
          </div>
        )}

        {/* Live Raw Log Stream */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>Raw Authentication Stream:</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300 max-h-[160px] overflow-y-auto">
            {rawLogs.map((line, idx) => (
              <div key={idx} className="hover:text-red-400 transition-colors">
                {line}
              </div>
            ))}
            {isBlocked && (
              <div className="text-emerald-400 font-bold pt-1 border-t border-slate-800">
                Mar 09 04:12:15 kernel: [IPTABLES DROP] IN=eth0 SRC=198.51.100.77 PROTO=TCP DPT=22
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
