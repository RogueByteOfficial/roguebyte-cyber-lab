import React, { useState } from 'react';
import { Search, Filter, Terminal, Lock, Network, ShieldAlert, KeyRound, Play, CheckCircle2, Clock, Award } from 'lucide-react';
import { Challenge, ChallengeCategory, DifficultyLevel, UserScore } from '../types';

interface CatalogViewProps {
  challenges: Challenge[];
  userScore: UserScore;
  onSelectChallenge: (challengeId: string) => void;
  selectedCategory: ChallengeCategory | 'all';
  onCategoryChange: (category: ChallengeCategory | 'all') => void;
  lang: 'ar' | 'en';
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  challenges,
  userScore,
  onSelectChallenge,
  selectedCategory,
  onCategoryChange,
  lang
}) => {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  const categories: { id: ChallengeCategory | 'all'; labelAr: string; labelEn: string }[] = [
    { id: 'all', labelAr: 'جميع المسارات', labelEn: 'All Tracks' },
    { id: 'web', labelAr: 'أمن الويب (Web)', labelEn: 'Web Security' },
    { id: 'linux', labelAr: 'أنظمة Linux', labelEn: 'Linux Security' },
    { id: 'network', labelAr: 'الشبكات (Network)', labelEn: 'Network Defense' },
    { id: 'blue_team', labelAr: 'الدفاع (Blue Team)', labelEn: 'Blue Team SOC' },
    { id: 'fundamentals', labelAr: 'الأساسيات (Fundamentals)', labelEn: 'Fundamentals' }
  ];

  const difficulties: { id: DifficultyLevel | 'all'; labelAr: string; labelEn: string }[] = [
    { id: 'all', labelAr: 'جميع المستويات', labelEn: 'All Levels' },
    { id: 'easy', labelAr: 'مبتدئ (Easy)', labelEn: 'Easy' },
    { id: 'medium', labelAr: 'متوسط (Medium)', labelEn: 'Medium' },
    { id: 'hard', labelAr: 'متقدم (Hard)', labelEn: 'Hard' }
  ];

  const filteredChallenges = challenges.filter(c => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;
    const matchesQuery = searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesDiff && matchesQuery;
  });

  const getCategoryIcon = (cat: ChallengeCategory) => {
    switch (cat) {
      case 'web': return Lock;
      case 'linux': return Terminal;
      case 'network': return Network;
      case 'blue_team': return ShieldAlert;
      case 'fundamentals': return KeyRound;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header and Search Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isAr ? 'دليل التحديات والمختبرات التعليمية' : 'Labs & Challenges Catalog'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'اختر التحدي للبدء في تشغيل البيئة المعزولة وحل التمارين التقنية.'
              : 'Launch isolated lab environments and solve technical security challenges.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'البحث عن تحدٍ أو ثغرة...' : 'Search challenge or vulnerability...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Segmented Filter Controls (Interactive Buttons) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          {difficulties.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDifficulty(d.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedDifficulty === d.id
                  ? 'bg-slate-800 text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? d.labelAr : d.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {filteredChallenges.map(challenge => {
          const Icon = getCategoryIcon(challenge.category);
          const isCompleted = userScore.completedChallengeIds.includes(challenge.id);

          return (
            <div
              key={challenge.id}
              onClick={() => onSelectChallenge(challenge.id)}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 cursor-pointer transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Clean unboxed metadata header */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                      {challenge.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono tabular-nums">
                    <span className="text-emerald-400 font-bold">+{challenge.points} pts</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-500">{challenge.difficulty}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors leading-snug">
                  {challenge.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {challenge.description}
                </p>

                {/* Unboxed tags and time metadata */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>~{challenge.estimatedTimeMinutes} min</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{challenge.tags.slice(0, 2).join(' / ')}</span>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {isCompleted ? (
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'تم الحل بنجاح' : 'Completed'}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">
                    {isAr ? 'جاهز للبدء' : 'Ready to start'}
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectChallenge(challenge.id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isAr ? 'فتح المختبر' : 'Launch Lab'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-sm font-medium">
            {isAr ? 'لا توجد تحديات تطابق معايير البحث المحددة.' : 'No challenges found matching your filter criteria.'}
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              onCategoryChange('all');
              setSelectedDifficulty('all');
            }}
            className="mt-3 text-xs text-emerald-400 hover:underline"
          >
            {isAr ? 'إعادة ضبط عوامل التصفية' : 'Reset all filters'}
          </button>
        </div>
      )}
    </div>
  );
};
