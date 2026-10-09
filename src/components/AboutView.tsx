import React from 'react';
import { Shield, Github, Heart, Code2, ExternalLink, Cpu, Terminal, FileText, CheckCircle2 } from 'lucide-react';

interface AboutViewProps {
  lang: 'ar' | 'en';
}

export const AboutView: React.FC<AboutViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-sans">
      
      {/* Author & Brand Showcase Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Shield className="w-4 h-4" />
              <span>RogueByte Cyber Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isAr ? 'عن المشروع والمطور الرئيسي' : 'About the Project & Lead Developer'}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              {isAr
                ? 'منصة تدريبية هندسية متكاملة لتعليم أمن المعلومات، واختبار الاختراق الأخلاقي، وتحليل الأنظمة، والدفاع السيبراني في بيئات معزولة وآمنة تماماً.'
                : 'An advanced educational cybersecurity training platform designed for ethical hacking, systems analysis, and defensive digital operations in strictly isolated environments.'}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 shrink-0">
            <a
              href="https://ko-fi.com/roguebyte"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-pink-950/40"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support on Ko-fi</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href="https://github.com/sidopac1a/roguebyte-cyber-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub: sidopac1a</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Developer Metadata Table (Clean unboxed style) */}
        <div className="border-t border-slate-800 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="text-slate-500 text-[11px] font-sans">{isAr ? 'المطور والمؤلف:' : 'Author / Developer:'}</div>
            <div className="font-bold text-white text-sm">SID AHMED FARES</div>
            <div className="text-slate-400 text-[11px]">Alias: SidoDev-Dz</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="text-slate-500 text-[11px] font-sans">{isAr ? 'العلامة والمؤسسة:' : 'Brand / Org:'}</div>
            <div className="font-bold text-emerald-400 text-sm">RogueByte</div>
            <div className="text-slate-400 text-[11px]">RogueByteOfficial</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="text-slate-500 text-[11px] font-sans">{isAr ? 'اسم المستودع:' : 'Repository:'}</div>
            <div className="font-bold text-slate-200 text-sm truncate">roguebyte-cyber-lab</div>
            <div className="text-slate-400 text-[11px]">Owner: sidopac1a</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="text-slate-500 text-[11px] font-sans">{isAr ? 'الترخيص البرمجي:' : 'Software License:'}</div>
            <div className="font-bold text-cyan-400 text-sm">MIT License</div>
            <div className="text-slate-400 text-[11px]">Open Source</div>
          </div>
        </div>
      </div>

      {/* Technical Stack Specifications */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">
          {isAr ? 'البنية التقنية المعتمدة للمنصة' : 'Engineered Technology Stack'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
              <Cpu className="w-4 h-4" />
              <span>Full-Stack Runtime</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              React 19 + TypeScript + Vite + Tailwind CSS v4, backed by modular Express/Node.js architecture for high-performance simulation.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5 text-sm">
              <Terminal className="w-4 h-4" />
              <span>Dev & Operating System</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Engineered specifically for Windows 10/11 with WSL2 (Ubuntu), Docker Desktop with native WSL integration, and standalone Linux hosts.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="font-bold text-purple-400 flex items-center gap-1.5 text-sm">
              <Shield className="w-4 h-4" />
              <span>Data & Ephemeral Storage</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Relational PostgreSQL migrations schema, Redis caching, and ephemeral container tmpfs overlays destroyed on session termination.
            </p>
          </div>
        </div>
      </div>

      {/* MIT License & Attribution Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3 text-xs">
        <div className="font-bold text-white text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>MIT License Notice</span>
        </div>
        <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-400 leading-relaxed border border-slate-800/80">
          Copyright (c) 2026 SID AHMED FARES (SidoDev-Dz) / RogueByte.<br /><br />
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including the rights to use, copy, modify, merge, publish, and distribute copies.<br /><br />
          Third-party training targets (such as OWASP Juice Shop, Linux base utilities) retain their respective original licenses and copyrights.
        </div>
      </div>

      {/* Legal & Educational Notice */}
      <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-xl text-xs text-amber-300 leading-relaxed">
        <strong>{isAr ? 'تنبيه أمني وإخلاء مسؤولية قانوني:' : 'Legal Notice & Ethical Policy:'}</strong>{' '}
        {isAr
          ? 'مشروع RogueByte Cyber Lab مصمم ومخصص للأغراض التعليمية والتدريبية الدفاعية والأكاديمية فقط. لا يجوز استخدام أي من الأدوات أو المعارف المطروحة في أي أنشطة غير قانونية أو استهداف أنظمة وشبكات دون إذن مسبق وصريح ومكتوب من مالكيها.'
          : 'RogueByte Cyber Lab is strictly designed for educational, academic, and authorized defensive security training. Unauthorized penetration testing or cyber attacks against systems without prior explicit written permission are strictly prohibited and illegal.'}
      </div>

    </div>
  );
};
