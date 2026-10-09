import React from 'react';
import { Shield, Terminal, Network, ShieldAlert, KeyRound, ArrowRight, Lock, Server, Cpu, CheckCircle2 } from 'lucide-react';
import { ChallengeCategory } from '../types';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onSelectTrack: (category: ChallengeCategory) => void;
  lang: 'ar' | 'en';
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectTrack, lang }) => {
  const isAr = lang === 'ar';

  const tracks = [
    {
      id: 'web' as ChallengeCategory,
      titleAr: 'أمن تطبيقات الويب (Web Security)',
      titleEn: 'Web Application Security',
      descAr: 'تدريب على ثغرات OWASP Top 10 مثل SQL Injection، XSS، IDOR، وكسر آليات المصادقة في بيئات متجر إلكتروني واقعية.',
      descEn: 'Master OWASP Top 10 vulnerabilities including SQLi, XSS, IDOR, and authentication bypasses in realistic store environments.',
      icon: Lock,
      color: 'emerald'
    },
    {
      id: 'linux' as ChallengeCategory,
      titleAr: 'أمن أنظمة Linux ورفع الصلاحيات',
      titleEn: 'Linux Security & PrivEsc',
      descAr: 'تحليل أذونات الملفات، اكتشاف ملفات SUID غير الآمنة، واستغلال ثغرات التكوين للترقية من مستخدم عادي إلى root.',
      descEn: 'Analyze Linux permissions, identify misconfigured SUID binaries, and execute privilege escalation to root.',
      icon: Terminal,
      color: 'blue'
    },
    {
      id: 'network' as ChallengeCategory,
      titleAr: 'أمن الشبكات وتحليل الحزم (Network Defense)',
      titleEn: 'Network Security & PCAP',
      descAr: 'فحص الحزم واعتراض حركة المرور لكشف هجمات ARP Poisoning واستخراج بيانات الاعتماد الصريحة المنقولة دون تشفير.',
      descEn: 'Deep packet inspection and traffic triage to detect ARP poisoning and recover leaked plaintext credentials.',
      icon: Network,
      color: 'cyan'
    },
    {
      id: 'blue_team' as ChallengeCategory,
      titleAr: 'الدفاع السيبراني ومركز العمليات (Blue Team SOC)',
      titleEn: 'SOC & Incident Response',
      descAr: 'تحليل سجلات المصادقة /var/log/auth.log، رصد هجمات القوة العمياء، وتطبيق قواعد الجدار الناري الفورية لعزل المهاجمين.',
      descEn: 'Analyze authentication logs, identify distributed brute-force patterns, and deploy instant firewall isolation.',
      icon: ShieldAlert,
      color: 'amber'
    },
    {
      id: 'fundamentals' as ChallengeCategory,
      titleAr: 'أساسيات التشفير والرموز (Fundamentals)',
      titleEn: 'Security & Cryptography',
      descAr: 'كسر التجزئات المشفرة، التلاعب برموز JWT باستخدام ثغرة Alg None، وفهم معايير الصلاحيات الصارمة.',
      descEn: 'Crack password hashes, manipulate JWT tokens via Alg None vulnerabilities, and verify cryptographic integrity.',
      icon: KeyRound,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'منصة تدريبية هندسية معزولة وآمنة' : 'Isolated Defensive Cyber Training Platform'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {isAr ? (
            <>
              احترف الأمن السيبراني واختبار الاختراق مع <br className="hidden sm:inline" />
              <span className="text-emerald-400">RogueByte Cyber Lab</span>
            </>
          ) : (
            <>
              Master Ethical Hacking & Digital Defense with <br className="hidden sm:inline" />
              <span className="text-emerald-400">RogueByte Cyber Lab</span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {isAr
            ? 'بيئة تدريبية عملية وتفاعلية تحاكي أهدافاً حقيقية ضمن شبكات معزولة تماماً. تتيح لك تشغيل المختبرات، استخراج الأعلام، وممارسة رفع الصلاحيات والدفاع السيبراني بأمان تام.'
            : 'An interactive hands-on training environment simulating real-world vulnerable targets within strictly isolated virtual subnets. Run labs, capture flags, and practice defense safely.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('catalog')}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 group"
          >
            <span>{isAr ? 'استكشاف التحديات والمختبرات' : 'Explore Challenges & Labs'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold rounded-xl text-sm transition-colors"
          >
            {isAr ? 'بيانات المطور والمعمارية' : 'Architecture & Author'}
          </button>
        </div>

        {/* Quick Author Trust Marker */}
        <div className="text-xs text-slate-500 font-mono pt-2">
          Architect: <span className="text-slate-300">SID AHMED FARES (SidoDev-Dz)</span> · MIT License · RogueByte
        </div>

        {/* Hero Cybersecurity Laboratory Visual */}
        <div className="pt-4 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
            <img
              src="/src/assets/images/roguebyte_cyber_lab_hero_1791547598680.jpg"
              alt="RogueByte Cyber Lab Security Operations Center"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover max-h-[420px] transition-transform duration-700 group-hover:scale-102"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 rtl:right-4 rtl:left-auto text-[11px] font-mono text-emerald-300 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800">
              RogueByte Security Operations Center · Live Sandbox Active
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Guarantees Strip */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">
                {isAr ? 'عزل شبكي صارم (No WAN)' : 'Strict Network Isolation'}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isAr
                  ? 'جميع الأهداف التدريبية تعمل داخل شبكات وهمية داخلية بدون وصول للإنترنت الخارجي لحماية بيئتك.'
                  : 'All targets operate within internal bridge subnets with zero external internet routing.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">
                {isAr ? 'إعادة ضبط حقيقية (True Reset)' : 'True Reset Engine'}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isAr
                  ? 'مسح كامل للطبقات المؤقتة وإعادة تشغيل القالب النظيف دون حذف نقاط ونتائج الطالب الأكاديمية.'
                  : 'Purges all ephemeral container mutations back to baseline while preserving academic score.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">
                {isAr ? 'حدود موارد آمنة (cgroups)' : 'Resource Caps (cgroups)'}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isAr
                  ? 'تقييد الذاكرة (512MB) والمعالج (0.5 vCPU) والعمليات (100 PIDs) لمنع هجمات حجب الخدمة.'
                  : 'Hardware caps enforce 512MB RAM, 0.5 CPU, and 100 PIDs to protect host stability.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Tracks Grid */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isAr ? 'مسارات التدريب التفاعلية' : 'Hands-on Training Tracks'}
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              {isAr ? 'اختر مسارك التعليمي وابدأ باختبار المهارات العملية فوراً' : 'Select your track and launch practice lab environments'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <span>{isAr ? 'عرض الكل' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tracks.map(t => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => {
                  onSelectTrack(t.id);
                  onNavigate('catalog');
                }}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3 cursor-pointer transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Track #{t.id}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                    {isAr ? t.titleAr : t.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {isAr ? t.descAr : t.descEn}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-xs font-semibold text-emerald-400 group-hover:underline gap-1">
                  <span>{isAr ? 'ابدأ التدريب' : 'Start Track'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
