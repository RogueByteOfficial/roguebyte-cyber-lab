import React, { useState } from 'react';
import { KeyRound, ShieldAlert, ShieldCheck, Copy, RefreshCw, FileCode } from 'lucide-react';

interface CryptoJwtSimulatorProps {
  onCopyFlag: (flag: string) => void;
  lang: 'ar' | 'en';
}

export const CryptoJwtSimulator: React.FC<CryptoJwtSimulatorProps> = ({ onCopyFlag, lang }) => {
  const isAr = lang === 'ar';
  const FLAG = 'ROGUE{jwt_alg0r1thm_n0n3_f0rg3ry_d0n3}';

  const [headerAlg, setHeaderAlg] = useState<'HS256' | 'none'>('HS256');
  const [roleClaim, setRoleClaim] = useState<'trainee' | 'admin'>('trainee');
  const [authSuccess, setAuthSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const base64UrlEncode = (str: string) => {
    return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  const headerObj = { alg: headerAlg, typ: 'JWT' };
  const payloadObj = { sub: 'trainee_991', role: roleClaim, iss: 'rogue-auth' };

  const encodedHeader = base64UrlEncode(JSON.stringify(headerObj));
  const encodedPayload = base64UrlEncode(JSON.stringify(payloadObj));
  const signature = headerAlg === 'none' ? '' : 'dGhpcy1pcy1hLXNlY3JldC1zaWduYXR1cmU';

  const fullJwt = `${encodedHeader}.${encodedPayload}.${signature}`;

  const handleTestToken = () => {
    // If user forged algorithm to "none" AND changed role to "admin"
    if (headerAlg === 'none' && roleClaim === 'admin') {
      setAuthSuccess(true);
    } else {
      setAuthSuccess(false);
    }
  };

  const handleCopy = () => {
    onCopyFlag(FLAG);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans text-xs">
      {/* Header */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-purple-400" />
          <span className="font-bold text-slate-200">
            {isAr ? 'أداة تحليل رموز JWT · ثغرة Alg None Misconfiguration' : 'JWT Analyzer & None Algorithm Tamper Console'}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Token Manipulator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Header & Claims Controls */}
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-3">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5 text-xs">
              <FileCode className="w-3.5 h-3.5 text-purple-400" />
              <span>{isAr ? 'تعديل خوارزمية الرأس (Header)' : 'Header Algorithm'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHeaderAlg('HS256')}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-medium border ${
                  headerAlg === 'HS256' ? 'bg-purple-950 text-purple-200 border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                alg: "HS256"
              </button>
              <button
                onClick={() => setHeaderAlg('none')}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-medium border ${
                  headerAlg === 'none' ? 'bg-purple-950 text-purple-200 border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                alg: "none" ⚠️
              </button>
            </div>

            <div className="font-semibold text-slate-300 text-xs pt-1">
              {isAr ? 'صلاحية المستخدم في الحمولة (Payload Role)' : 'Payload Role Claim'}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRoleClaim('trainee')}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-medium border ${
                  roleClaim === 'trainee' ? 'bg-purple-950 text-purple-200 border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                role: "trainee"
              </button>
              <button
                onClick={() => setRoleClaim('admin')}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-medium border ${
                  roleClaim === 'admin' ? 'bg-purple-950 text-purple-200 border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                role: "admin" 👑
              </button>
            </div>

            <button
              onClick={handleTestToken}
              className="w-full mt-2 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isAr ? 'إرسال الرمز للتحقق في خادم المختبر' : 'Verify Token with Lab API'}</span>
            </button>
          </div>

          {/* Encoded Token Preview */}
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-slate-400 mb-1">{isAr ? 'الرمز المشفر المولد (Encoded JWT):' : 'Generated JWT Token:'}</div>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] break-all border border-slate-800 text-slate-200">
                <span className="text-red-400">{encodedHeader}</span>
                <span className="text-slate-400">.</span>
                <span className="text-purple-400">{encodedPayload}</span>
                <span className="text-slate-400">.</span>
                <span className="text-cyan-400">{signature}</span>
              </div>
            </div>

            {authSuccess ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAr ? 'تم قبول الرمز بصلاحيات المشرف!' : 'Admin Token Forgery Verified!'}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-2 py-0.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-[11px] flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ العلم' : 'Copy Flag')}</span>
                  </button>
                </div>
                <div className="font-mono text-emerald-300 text-xs bg-slate-950 p-2 rounded border border-emerald-900/60 select-all">
                  {FLAG}
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-[11px] text-center p-2 bg-slate-900/50 rounded border border-slate-800">
                {isAr
                  ? 'قم بضبط alg على "none" و role على "admin" ثم اضغط تحقق لتجاوز الحماية.'
                  : 'Set alg to "none" and role to "admin", then click verify to forge the token.'}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
