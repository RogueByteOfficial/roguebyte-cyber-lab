import React from 'react';
import { Shield, User as UserIcon, Sun, Moon, Globe, Terminal } from 'lucide-react';
import { User, Role } from '../types';

interface NavbarProps {
  currentUser: User;
  onSelectUser: (userId: string) => void;
  users: User[];
  activeView: string;
  onNavigate: (view: string) => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSelectUser,
  users,
  activeView,
  onNavigate,
  lang,
  onToggleLang,
  isDarkMode,
  onToggleTheme
}) => {
  const isAr = lang === 'ar';

  const navItems = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'catalog', labelAr: 'المختبرات والتحديات', labelEn: 'Labs & Challenges' },
    { 
      id: currentUser.role === 'admin' ? 'admin' : currentUser.role === 'instructor' ? 'instructor' : 'student',
      labelAr: currentUser.role === 'admin' ? 'لوحة المسؤول' : currentUser.role === 'instructor' ? 'لوحة المدرب' : 'لوحة الطالب',
      labelEn: currentUser.role === 'admin' ? 'Admin Console' : currentUser.role === 'instructor' ? 'Instructor Hub' : 'Student Hub'
    },
    { id: 'about', labelAr: 'عن المشروع والمؤلف', labelEn: 'About & Author' },
  ];

  const roleLabels: Record<Role, { ar: string; en: string }> = {
    student: { ar: 'طالب', en: 'Student' },
    instructor: { ar: 'مدرب', en: 'Instructor' },
    admin: { ar: 'مسؤول النظام', en: 'Admin' }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left rtl:text-right whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              RogueByte <span className="text-emerald-400">Cyber Lab</span>
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'border-emerald-400 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? item.labelAr : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action Area & Quick Persona Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center gap-1"
          >
            <Globe className="w-4 h-4" />
            <span className="font-mono text-xs">{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle (Visual toggle for dark/neutral preference) */}
          <button
            onClick={onToggleTheme}
            title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Persona Switcher Dropdown */}
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <UserIcon className="w-4 h-4 text-emerald-400 mx-1.5" />
            <select
              value={currentUser.id}
              onChange={(e) => onSelectUser(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer pr-6 pl-2 py-1 rtl:pl-6 rtl:pr-2 appearance-none"
              title={isAr ? 'تبديل دور المستخدم الحالي' : 'Switch active role'}
            >
              {users.map(u => (
                <option key={u.id} value={u.id} className="bg-slate-900 text-slate-200">
                  {u.fullName} ({roleLabels[u.role][lang]})
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>
    </header>
  );
};
