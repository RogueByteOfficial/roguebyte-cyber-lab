import React from 'react';
import { Shield, Github, Heart, ExternalLink, Code2 } from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>RogueByte Cyber Lab</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              {isAr
                ? 'منصة تدريبية هندسية متكاملة لتعليم أمن المعلومات، واختبار الاختراق الأخلاقي، وتحليل الأنظمة، والدفاع السيبراني في بيئات معزولة وآمنة تماماً.'
                : 'An advanced educational cybersecurity training platform designed for ethical hacking, systems analysis, and defensive digital operations in strictly isolated environments.'}
            </p>
            <div className="text-slate-500 font-mono text-[11px]">
              {isAr ? 'المطور الرئيسي:' : 'Lead Architect:'}{' '}
              <span className="text-slate-300 font-semibold">SID AHMED FARES (SidoDev-Dz)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">
              {isAr ? 'روابط المشروع' : 'Project Links'}
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a
                  href="https://github.com/sidopac1a/roguebyte-cyber-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub: sidopac1a</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/RogueByteOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>RogueByteOfficial</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://ko-fi.com/roguebyte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 flex items-center gap-1.5 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-pink-500" />
                  <span>Support on Ko-fi</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">
              {isAr ? 'الأمان والترخيص' : 'Security & License'}
            </div>
            <p className="text-slate-500 leading-normal">
              {isAr
                ? 'مرخص بموجب ترخيص MIT المفتوح المصدر. جميع التدريبات مخصصة لأغراض تعليمية دفاعية وقانونية فقط.'
                : 'Licensed under the MIT License. All lab targets are isolated and restricted to authorized educational defensive usage.'}
            </p>
            <div className="text-slate-500">
              © 2026 RogueByte / SID AHMED FARES
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            RogueByte Cyber Lab · Built with React, TypeScript & Tailwind CSS
          </div>
          <div>
            Author: <strong className="text-slate-400">SID AHMED FARES</strong> · SidoDev-Dz · MIT License
          </div>
        </div>
      </div>
    </footer>
  );
};
