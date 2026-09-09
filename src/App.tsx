import React, { useState, useEffect } from 'react';
import { HunterProfile, WorkoutRoutine, WorkoutSessionLog, TechniqueExercise, ApiSettings } from './types';
import {
  loadHunterProfile,
  saveHunterProfile,
  loadUserRoutines,
  saveUserRoutines,
  loadSessionLogs,
  saveSessionLogs,
  loadApiSettings,
  saveApiSettings
} from './utils/storage';
import { TheoryTechniqueBossView } from './components/TheoryTechniqueBossView';
import { WorkoutsView } from './components/WorkoutsView';
import { ProgressStatsView } from './components/ProgressStatsView';
import { SettingsView } from './components/SettingsView';
import { CoachChatModal } from './components/CoachChatModal';
import { GymWorkoutActiveModal } from './components/GymWorkoutActiveModal';
import { MetronomeBar } from './components/MetronomeBar';
import { soundEngine } from './utils/audioEngine';
import {
  Layers,
  Dumbbell,
  User,
  Activity,
  Flame,
  Trophy,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Swords,
  BookOpen,
  Settings as SettingsIcon,
  Bot,
  Key
} from 'lucide-react';

export default function App() {
  // Navigation active tab: 'path' (1) | 'workouts' (2) | 'profile' (3) | 'settings' (4)
  const [activeTab, setActiveTab] = useState<'path' | 'workouts' | 'profile' | 'settings'>('path');

  // Persistence State
  const [hunterProfile, setHunterProfile] = useState<HunterProfile>(loadHunterProfile);
  const [userRoutines, setUserRoutines] = useState<WorkoutRoutine[]>(loadUserRoutines);
  const [sessionLogs, setSessionLogs] = useState<WorkoutSessionLog[]>(loadSessionLogs);
  const [apiSettings, setApiSettings] = useState<ApiSettings>(loadApiSettings);

  // Coach AI Modal
  const [isCoachModalOpen, setIsCoachModalOpen] = useState<boolean>(false);

  // Active Live Workout Modal
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState<WorkoutRoutine | null>(null);

  // Floating Metronome visibility
  const [showFloatingMetronome, setShowFloatingMetronome] = useState<boolean>(false);
  const [floatingBpm, setFloatingBpm] = useState<number>(100);

  // Sound mute toggle
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Save profile updates
  const handleUpdateProfile = (updated: HunterProfile) => {
    setHunterProfile(updated);
    saveHunterProfile(updated);
  };

  // Save API settings updates
  const handleUpdateApiSettings = (updated: ApiSettings) => {
    setApiSettings(updated);
    saveApiSettings(updated);
  };

  // Launch single exercise workout
  const handleStartSingleExerciseWorkout = (exercise: TechniqueExercise) => {
    const singleRoutine: WorkoutRoutine = {
      id: `single-${exercise.id}-${Date.now()}`,
      name: `Focus: ${exercise.title}`,
      description: `Sessione di allenamento mirata su ${exercise.category}`,
      isPreset: false,
      exerciseIds: [exercise.id],
      estimatedMinutes: 10,
      targetRank: exercise.difficultyRank,
      createdAt: new Date().toISOString()
    };
    setActiveWorkoutRoutine(singleRoutine);
  };

  // Launch full routine workout
  const handleStartRoutineWorkout = (routine: WorkoutRoutine) => {
    setActiveWorkoutRoutine(routine);
  };

  // Handle completed workout
  const handleFinishWorkout = (log: WorkoutSessionLog, updatedProfile: HunterProfile) => {
    setSessionLogs((prev) => [log, ...prev]);
    setHunterProfile(updatedProfile);
    setActiveWorkoutRoutine(null);
  };

  const toggleSound = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    soundEngine.setMuted(next);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-red-600/30 selection:text-red-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center text-white shadow-lg shadow-red-950/60 font-black border border-red-500/30">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-wider text-zinc-100 uppercase">
                  GUITAR <span className="text-red-500">LEVELING</span>
                </h1>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Accademia di Teoria, Tecnica, Boss Fight & Coach IA
              </p>
            </div>
          </div>

          {/* Quick Header Stats & Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Coach AI Trigger Button */}
            <button
              onClick={() => setIsCoachModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-950/50 transition-all hover:scale-105 active:scale-95"
              title="Apri Chat col Coach IA"
            >
              <Bot className="w-4 h-4" />
              <span>COACH IA</span>
            </button>

            {/* Hunter Rank Quick Badge */}
            <div
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#09090b] border border-zinc-800 hover:border-red-600/50 cursor-pointer transition-all shadow-sm"
            >
              <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center font-mono font-black text-xs shadow-md shadow-red-950/40">
                {hunterProfile.rank.replace('-Rank', '')}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-mono font-bold text-zinc-200">
                  LVL {hunterProfile.level}
                </div>
                <div className="text-[9px] font-mono text-red-400">
                  {hunterProfile.hunterClass}
                </div>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono font-bold text-red-400">
              <Flame className="w-4 h-4 fill-current text-red-500" />
              <span>{hunterProfile.streakDays}d</span>
            </div>

            {/* Metronome Launcher Pill */}
            <button
              onClick={() => setShowFloatingMetronome(!showFloatingMetronome)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                showFloatingMetronome
                  ? 'bg-red-950/40 border-red-600 text-red-300 shadow-md shadow-red-950/30'
                  : 'bg-[#09090b] border-zinc-800 text-zinc-300 hover:text-red-400 hover:border-zinc-700'
              }`}
              title="Metronomo Rapido"
            >
              <Activity className="w-4 h-4 text-red-400" />
              <span className="hidden md:inline">METRONOMO</span>
            </button>

            {/* Sound Mute Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-[#09090b] border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title={isAudioMuted ? 'Attiva Suoni' : 'Muta Suoni'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-zinc-300" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {activeTab === 'path' && (
          <TheoryTechniqueBossView
            hunterProfile={hunterProfile}
            onUpdateProfile={handleUpdateProfile}
            onStartSingleExerciseWorkout={handleStartSingleExerciseWorkout}
            apiSettings={apiSettings}
            onOpenSettings={() => setActiveTab('settings')}
          />
        )}

        {activeTab === 'workouts' && (
          <WorkoutsView
            routines={userRoutines}
            hunterProfile={hunterProfile}
            onUpdateRoutines={setUserRoutines}
            onStartWorkout={handleStartRoutineWorkout}
            apiSettings={apiSettings}
            onOpenSettings={() => setActiveTab('settings')}
          />
        )}

        {activeTab === 'profile' && (
          <ProgressStatsView
            hunterProfile={hunterProfile}
            sessionLogs={sessionLogs}
            onSelectRoutineTab={() => setActiveTab('workouts')}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            apiSettings={apiSettings}
            onUpdateApiSettings={handleUpdateApiSettings}
            hunterProfile={hunterProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* Coach Chat Fullscreen/Floating Modal */}
      <CoachChatModal
        isOpen={isCoachModalOpen}
        onClose={() => setIsCoachModalOpen(false)}
        apiSettings={apiSettings}
        hunterProfile={hunterProfile}
        onOpenSettings={() => setActiveTab('settings')}
      />

      {/* Active Workout Fullscreen Modal */}
      {activeWorkoutRoutine && (
        <GymWorkoutActiveModal
          routine={activeWorkoutRoutine}
          hunterProfile={hunterProfile}
          onClose={() => setActiveWorkoutRoutine(null)}
          onFinishWorkout={handleFinishWorkout}
        />
      )}

      {/* Floating Metronome Overlay */}
      {showFloatingMetronome && (
        <MetronomeBar
          initialBpm={floatingBpm}
          onBpmChange={(b) => setFloatingBpm(b)}
          isFloating={true}
        />
      )}

      {/* Bottom Sticky 4-Tab Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0c0c0e]/95 backdrop-blur-lg border-t border-zinc-800/90 shadow-2xl py-2 px-4 sm:px-8">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
          {/* TAB 1: THE ACADEMY (TEORIA, TECNICA, BOSS) */}
          <button
            onClick={() => setActiveTab('path')}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-2.5 rounded-xl transition-all duration-200 ${
              activeTab === 'path'
                ? 'bg-red-950/40 text-red-400 border border-red-600/40 shadow-lg shadow-red-950/40 scale-105'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <div className="relative">
              <BookOpen className="w-5 h-5 mb-0.5" />
              {activeTab === 'path' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-tight">
              1. ACADEMY
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
              Teoria • Boss
            </span>
          </button>

          {/* TAB 2: THE FORGE (WORKOUT & SCHEDE DI ALLENAMENTO) */}
          <button
            onClick={() => setActiveTab('workouts')}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-2.5 rounded-xl transition-all duration-200 ${
              activeTab === 'workouts'
                ? 'bg-red-950/40 text-red-400 border border-red-600/40 shadow-lg shadow-red-950/40 scale-105'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <div className="relative">
              <Dumbbell className="w-5 h-5 mb-0.5" />
              {activeTab === 'workouts' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-tight">
              2. FORGE
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
              Workout
            </span>
          </button>

          {/* TAB 3: HALL OF FAME (LIVELLO, RECORD PERSONALI, TROFEI) */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-2.5 rounded-xl transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-red-950/40 text-red-400 border border-red-600/40 shadow-lg shadow-red-950/40 scale-105'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <div className="relative">
              <User className="w-5 h-5 mb-0.5" />
              {activeTab === 'profile' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-tight">
              3. PROFILO
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
              Record • XP
            </span>
          </button>

          {/* TAB 4: SETTINGS & API (CHIAVI API, PREMI PDF, BACKUP) */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-2.5 rounded-xl transition-all duration-200 ${
              activeTab === 'settings'
                ? 'bg-red-950/40 text-red-400 border border-red-600/40 shadow-lg shadow-red-950/40 scale-105'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <div className="relative">
              <SettingsIcon className="w-5 h-5 mb-0.5" />
              {activeTab === 'settings' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-tight">
              4. IMPOSTAZIONI
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
              API • Premi PDF
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

