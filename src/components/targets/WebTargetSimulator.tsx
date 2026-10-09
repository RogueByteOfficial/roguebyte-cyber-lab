import React, { useState } from 'react';
import { ShoppingBag, Lock, AlertCircle, CheckCircle2, Copy, Search, ShieldCheck, Database, Key } from 'lucide-react';

interface WebTargetSimulatorProps {
  onCopyFlag: (flag: string) => void;
  lang: 'ar' | 'en';
}

export const WebTargetSimulator: React.FC<WebTargetSimulatorProps> = ({ onCopyFlag, lang }) => {
  const isAr = lang === 'ar';
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'store' | 'exploit_guide'>('store');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const FLAG = 'ROGUE{sql_1nj3ct10n_auth_byp4ss_succ3ss}';

  const products = [
    { id: 1, name: 'Rogue Security Shield Hardware Key', price: '$49.99', category: 'Hardware' },
    { id: 2, name: 'Encrypted Flash Drive 128GB', price: '$89.00', category: 'Storage' },
    { id: 3, name: 'Network Tap Analyzer Module', price: '$120.00', category: 'Networking' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Simulated SQL injection vulnerability logic
    // db.query(`SELECT * FROM users WHERE email = '${emailInput}' AND password = '${passwordInput}'`)
    const rawEmail = emailInput.trim();

    if (rawEmail.includes("' OR 1=1--") || rawEmail.includes("' or 1=1--") || rawEmail.includes("admin'--")) {
      setIsLoggedIn(true);
      setErrorMsg('');
    } else if (rawEmail === 'admin@juice-sh.op' && passwordInput === 'SuperSecretAdminPassword123!') {
      setIsLoggedIn(true);
    } else {
      setErrorMsg(isAr ? 'خطأ في المصادقة: البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Authentication error: Invalid email or password.');
    }
  };

  const handleResetTarget = () => {
    setIsLoggedIn(false);
    setEmailInput('');
    setPasswordInput('');
    setErrorMsg('');
  };

  const copyToClipboard = () => {
    onCopyFlag(FLAG);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Target Browser Address Bar */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          <span className="text-slate-400 font-sans font-medium text-[11px] mr-2 rtl:ml-2">
            Target Host: <span className="text-emerald-400">juice-shop.rogue-lab.local:3000</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab(activeTab === 'store' ? 'exploit_guide' : 'store')}
            className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-[11px] font-sans"
          >
            {activeTab === 'store' ? (isAr ? 'شرح الثغرة والإصلاح' : 'Vulnerability Writeup') : (isAr ? 'العودة للمتجر' : 'Back to Store')}
          </button>
          <button
            onClick={handleResetTarget}
            className="px-2.5 py-1 rounded bg-red-950/60 border border-red-900/60 text-red-300 hover:bg-red-900/80 transition-colors text-[11px] font-sans"
          >
            {isAr ? 'إعادة ضبط الهدف' : 'Reset Target'}
          </button>
        </div>
      </div>

      {activeTab === 'exploit_guide' ? (
        <div className="p-6 space-y-4 text-sm bg-slate-900/90 text-slate-300 font-sans">
          <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-800 pb-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>{isAr ? 'تحليل ثغرة حقن استعلامات SQL (SQL Injection)' : 'SQL Injection Analysis & Remediation'}</span>
          </div>
          <p className="leading-relaxed">
            {isAr
              ? 'تحدث هذه الثغرة عندما يقوم الخادم بدمج مدخلات المستخدم مباشرة داخل استعلام SQL دون معالجة أو استخدام استعلامات مجهزة (Prepared Statements). الاستعلام الضعيف في الخادم مكتوب كالآتي:'
              : 'This vulnerability occurs when the backend concatenates untrusted user inputs directly into raw SQL queries without parameterized queries:'}
          </p>
          <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-red-400 border border-red-900/40 overflow-x-auto">
            {`// Vulnerable Node.js / SQL Handler\nconst query = "SELECT * FROM users WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "';";\nconst user = await db.query(query);`}
          </div>
          <p className="leading-relaxed">
            {isAr
              ? 'عند إدخال الحمولة (\' OR 1=1--) في حقل البريد، يتحول الاستعلام إلى: يتحقق دائماً من صحة الشرط 1=1 ويتجاهل فحص كلمة المرور بفضل رمز التعليق (--).'
              : 'By injecting the payload (\' OR 1=1--), the condition (1=1) evaluates to TRUE for all rows, while the double hyphen (--) comments out the remainder of the query, bypassing authentication.'}
          </p>
          <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-400 border border-emerald-900/40 overflow-x-auto">
            {`// Secure Remediation with Parameterized Statements\nconst query = "SELECT id, email, role FROM users WHERE email = $1 AND password_hash = $2;";\nconst user = await db.query(query, [req.body.email, hashedInput]);`}
          </div>
        </div>
      ) : (
        <div className="p-5 flex-1 flex flex-col justify-between">
          {/* Mock Store Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-white text-sm">RogueByte Juice & Cyber Market</span>
            </div>
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-400 font-mono">admin@juice-sh.op (UID: 0)</span>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    {isAr ? 'تسجيل الخروج' : 'Logout'}
                  </button>
                </div>
              ) : (
                <span className="text-xs text-slate-400">{isAr ? 'وضع الضيف' : 'Guest Mode'}</span>
              )}
            </div>
          </div>

          {/* Success Flag Banner if Logged In */}
          {isLoggedIn ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-5 mb-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>{isAr ? 'تم اختراق لوحة المسؤول بنجاح! استخرج العلم:' : 'Admin Dashboard Pwned! Extract the Flag:'}</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ العلم' : 'Copy Flag')}</span>
                </button>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-emerald-900/60 font-mono text-emerald-300 text-xs sm:text-sm select-all">
                {FLAG}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? 'تم استخراج قاعدة بيانات المشرف وبيانات الدفع المشفرة. قم بنسخ العلم وإرساله في صندوق الإجابة بالأسفل لتسجيل نقاط التحدي.'
                  : 'Administrative records and customer invoices revealed. Copy the flag string and submit it in the challenge submission box.'}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
              {/* Login Form (Target) */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3.5">
                <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'بوابة تسجيل الدخول (الهدف المصاب)' : 'Vulnerable Login Gateway'}</span>
                </div>

                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {isAr ? 'البريد الإلكتروني (Email)' : 'Email'}
                    </label>
                    <input
                      type="text"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="' OR 1=1--"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {isAr ? 'كلمة المرور (Password)' : 'Password'}
                    </label>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="any_password"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-2 rounded bg-red-950/40 border border-red-900/50 text-red-300 text-xs flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailInput("' OR 1=1--")}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-mono transition-colors"
                      title={isAr ? 'إدراج حمولة SQLi تلقائياً' : 'Auto-fill SQLi payload'}
                    >
                      Payload 💉
                    </button>
                  </div>
                </form>
              </div>

              {/* Product Store Front */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-300">
                  {isAr ? 'المنتجات المعروضة للعامة' : 'Public Store Catalog'}
                </div>
                <div className="space-y-2">
                  {products.map(p => (
                    <div key={p.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-medium text-slate-200">{p.name}</div>
                        <div className="text-[11px] text-slate-500">{p.category}</div>
                      </div>
                      <div className="font-mono text-emerald-400 font-bold">{p.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-3 flex items-center justify-between">
            <span>RogueByte Simulated Web Target · Isolation: br_rogue_lab</span>
            <span className="font-mono">SQL Engine: PostgreSQL 16 (Emulated)</span>
          </div>
        </div>
      )}
    </div>
  );
};
