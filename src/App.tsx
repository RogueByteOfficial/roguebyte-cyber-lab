/**
 * RogueByte Cyber Lab — Main Application Entry Point
 * Architect: SID AHMED FARES (SidoDev-Dz)
 * Brand: RogueByte
 * License: MIT
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { LabSessionView } from './components/LabSessionView';
import { StudentDashboardView } from './components/dashboards/StudentDashboardView';
import { InstructorDashboardView } from './components/dashboards/InstructorDashboardView';
import { AdminDashboardView } from './components/dashboards/AdminDashboardView';
import { AboutView } from './components/AboutView';
import { rogueStore } from './services/store';
import { ChallengeCategory, User, LabSession } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(() => rogueStore.getCurrentUser());
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('web-101');
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Trigger re-render on store mutations
  const [storeRevision, setStoreRevision] = useState<number>(0);
  const bumpStoreRevision = () => setStoreRevision(prev => prev + 1);

  // Sync document direction and language tag
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const allUsers = rogueStore.getUsers();
  const challenges = rogueStore.getChallenges();
  const userScore = rogueStore.getUserScore(currentUser.id);
  const userSessions = rogueStore.getUserSessions(currentUser.id);
  const allSubmissions = rogueStore.getAllSubmissions();
  const currentChallenge = rogueStore.getChallenge(selectedChallengeId) || challenges[0];
  const activeSessionForChallenge = userSessions.find(
    s => s.challengeId === currentChallenge.id && s.status !== 'STOPPED'
  );

  const handleSelectUser = (userId: string) => {
    try {
      const user = rogueStore.setCurrentUser(userId);
      setCurrentUser(user);
      bumpStoreRevision();
      // If currently on a role-specific dashboard, navigate to the new role's dashboard
      if (['student', 'instructor', 'admin'].includes(activeView)) {
        setActiveView(user.role);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartLab = () => {
    try {
      rogueStore.startLab(currentUser.id, currentChallenge.id);
      bumpStoreRevision();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleStopLab = () => {
    if (!activeSessionForChallenge) return;
    try {
      rogueStore.stopLab(currentUser.id, activeSessionForChallenge.id);
      bumpStoreRevision();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleResetLab = () => {
    if (!activeSessionForChallenge) return;
    try {
      rogueStore.resetLab(currentUser.id, activeSessionForChallenge.id);
      bumpStoreRevision();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmitFlag = (flag: string) => {
    const result = rogueStore.submitFlag(currentUser.id, currentChallenge.id, flag);
    bumpStoreRevision();
    return result;
  };

  const handleSelectChallenge = (challengeId: string) => {
    setSelectedChallengeId(challengeId);
    setActiveView('lab');
  };

  const handleForceStopSession = (sessionId: string) => {
    try {
      rogueStore.stopLab(currentUser.id, sessionId);
      bumpStoreRevision();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'}`}>
      
      {/* Top Bar Navigation */}
      <Navbar
        currentUser={currentUser}
        onSelectUser={handleSelectUser}
        users={allUsers}
        activeView={activeView}
        onNavigate={setActiveView}
        lang={lang}
        onToggleLang={() => setLang(prev => (prev === 'ar' ? 'en' : 'ar'))}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(prev => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            onNavigate={setActiveView}
            onSelectTrack={(cat) => {
              setSelectedCategory(cat);
              setActiveView('catalog');
            }}
            lang={lang}
          />
        )}

        {activeView === 'catalog' && (
          <CatalogView
            challenges={challenges}
            userScore={userScore}
            onSelectChallenge={handleSelectChallenge}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            lang={lang}
          />
        )}

        {activeView === 'lab' && (
          <LabSessionView
            challenge={currentChallenge}
            session={activeSessionForChallenge}
            currentUser={currentUser}
            onStartLab={handleStartLab}
            onStopLab={handleStopLab}
            onResetLab={handleResetLab}
            onSubmitFlag={handleSubmitFlag}
            onBackToCatalog={() => setActiveView('catalog')}
            isCompleted={userScore.completedChallengeIds.includes(currentChallenge.id)}
            lang={lang}
          />
        )}

        {activeView === 'student' && (
          <StudentDashboardView
            currentUser={currentUser}
            userScore={userScore}
            challenges={challenges}
            submissions={allSubmissions}
            activeSessions={userSessions.filter(s => s.status !== 'STOPPED')}
            onSelectChallenge={handleSelectChallenge}
            lang={lang}
          />
        )}

        {activeView === 'instructor' && (
          <InstructorDashboardView
            currentUser={currentUser}
            students={allUsers.filter(u => u.role === 'student')}
            allScores={rogueStore.getAllScores()}
            challenges={challenges}
            allSubmissions={allSubmissions}
            lang={lang}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboardView
            currentUser={currentUser}
            metrics={rogueStore.getMetrics()}
            auditLogs={rogueStore.getAuditLogs(currentUser.role)}
            activeSessions={rogueStore.getAllActiveSessions().filter(s => s.status !== 'STOPPED')}
            onForceStopSession={handleForceStopSession}
            lang={lang}
          />
        )}

        {activeView === 'about' && (
          <AboutView lang={lang} />
        )}
      </main>

      {/* Global Footer */}
      <Footer lang={lang} />

    </div>
  );
}
