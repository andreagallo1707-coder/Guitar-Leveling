import React from 'react';
import { HunterProfile, WorkoutSessionLog } from '../types';
import { getXpForNextLevel, loadCustomExercises } from '../utils/storage';
import { bossFightsData } from '../data/bossData';
import { exercisesData } from '../data/exercisesData';
import {
  Trophy,
  Flame,
  Clock,
  Sparkles,
  Zap,
  Activity,
  Award,
  Calendar,
  Shield,
  Swords,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Dumbbell
} from 'lucide-react';

interface ProgressStatsViewProps {
  hunterProfile: HunterProfile;
  sessionLogs: WorkoutSessionLog[];
  onSelectRoutineTab: () => void;
}

export const ProgressStatsView: React.FC<ProgressStatsViewProps> = ({
  hunterProfile,
  sessionLogs,
  onSelectRoutineTab
}) => {
  const nextLevelXp = getXpForNextLevel(hunterProfile.level);
  const xpPercentage = Math.min(100, Math.round((hunterProfile.currentXp / nextLevelXp) * 100));

  const totalPRsCount = Object.keys(hunterProfile.exercisePRs).length;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. SOLO LEVELING HUNTER CARD */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0c0c0e] via-zinc-950 to-red-950/20 border border-red-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/30">
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & Rank Info */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#09090b] border-2 border-red-600/80 flex flex-col items-center justify-center shadow-xl shadow-red-950/60">
                <span className="text-2xl sm:text-3xl font-black font-mono text-red-500">
                  {hunterProfile.rank.replace('-Rank', '')}
                </span>
                <span className="text-[9px] font-mono text-zinc-400 font-bold tracking-widest">
                  RANK
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono font-bold text-[10px] shadow-md shadow-red-950/50">
                LVL {hunterProfile.level}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight">
                {hunterProfile.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-[#09090b] border border-zinc-800 text-zinc-300">
                  Classe: <strong className="text-red-400">{hunterProfile.hunterClass}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stat Counters */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-[#09090b] border border-zinc-800 p-3 rounded-xl text-center min-w-[90px] shadow-sm">
              <Flame className="w-4 h-4 text-red-500 mx-auto mb-1" />
              <div className="text-lg font-black font-mono text-zinc-100">
                {hunterProfile.streakDays}
              </div>
              <div className="text-[10px] font-mono text-zinc-400">Streak Giorni</div>
            </div>

            <div className="bg-[#09090b] border border-zinc-800 p-3 rounded-xl text-center min-w-[90px] shadow-sm">
              <Clock className="w-4 h-4 text-red-400 mx-auto mb-1" />
              <div className="text-lg font-black font-mono text-zinc-100">
                {hunterProfile.totalMinutesPracticed}
              </div>
              <div className="text-[10px] font-mono text-zinc-400">Minuti Totali</div>
            </div>

            <div className="bg-[#09090b] border border-zinc-800 p-3 rounded-xl text-center min-w-[90px] shadow-sm">
              <Trophy className="w-4 h-4 text-red-500 mx-auto mb-1" />
              <div className="text-lg font-black font-mono text-zinc-100">
                {hunterProfile.defeatedBossIds.length}
              </div>
              <div className="text-[10px] font-mono text-zinc-400">Boss Battuti</div>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">
              Progresso Livello {hunterProfile.level} → {hunterProfile.level + 1}
            </span>
            <span className="text-red-400 font-bold">
              {hunterProfile.currentXp} / {nextLevelXp} XP ({xpPercentage}%)
            </span>
          </div>

          <div className="h-3 w-full bg-[#09090b] rounded-full overflow-hidden border border-zinc-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full transition-all duration-500 shadow-lg shadow-red-600/50"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. RECORD MASSIMALI BPM DASHBOARD */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                Bacheca Record Personali di Velocità (BPM Massimi)
              </h3>
              <p className="text-xs text-zinc-400">
                La velocità massima pulita raggiunta per ciascun esercizio durante gli allenamenti.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded bg-[#09090b] text-red-400 font-bold border border-red-900/40">
            {totalPRsCount} Record Registrati
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...exercisesData, ...loadCustomExercises()].map((ex) => {
            const pr = hunterProfile.exercisePRs[ex.id];
            const maxBpm = pr?.maxBpm || ex.defaultBpm;
            const deltaFromBase = maxBpm - ex.defaultBpm;

            return (
              <div
                key={ex.id}
                className="bg-[#09090b] border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between shadow-sm hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    {ex.category}
                  </span>
                  <div className="text-xs font-bold text-zinc-200 truncate max-w-[170px]">
                    {ex.title}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    Base: {ex.defaultBpm} • Target: {ex.targetBpm}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-mono font-black text-red-400 flex items-center justify-end gap-1">
                    <Trophy className="w-3.5 h-3.5 text-red-400" />
                    {maxBpm} <span className="text-[10px] font-normal text-zinc-400">BPM</span>
                  </div>
                  {deltaFromBase > 0 && (
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      +{deltaFromBase} BPM Guadagnati
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BOSS TROPHIES SHOWCASE */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                Sala dei Trofei Boss (Canzoni & Assoli Conquistati)
              </h3>
              <p className="text-xs text-zinc-400">
                Canzoni e assoli leggendari conquistati nel tuo percorso.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-zinc-400">
            {hunterProfile.defeatedBossIds.length} / {bossFightsData.length} Boss Sconfitti
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {bossFightsData.map((boss) => {
            const isDefeated = hunterProfile.defeatedBossIds.includes(boss.id);

            return (
              <div
                key={boss.id}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                  isDefeated
                    ? 'bg-red-950/30 border-red-900/60 shadow-lg shadow-red-950/30'
                    : 'bg-[#09090b] border-zinc-800/60 opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                    isDefeated
                      ? 'bg-red-600 text-white ring-2 ring-red-400/50 shadow-md shadow-red-950/50'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {isDefeated ? <Trophy className="w-5 h-5" /> : boss.rank.replace('-Rank', '')}
                </div>
                <div className="text-xs font-bold text-zinc-200 line-clamp-1">{boss.title}</div>
                <div className="text-[10px] font-mono text-zinc-400 truncate">{boss.artist}</div>
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isDefeated
                      ? 'bg-red-950/60 text-red-400 border border-red-900/60'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {isDefeated ? 'SCONFITTO' : 'BLOCCATO'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. WORKOUT SESSION LOGS */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                Storico Allenamenti & Sessioni
              </h3>
              <p className="text-xs text-zinc-400">
                Tutte le schede completate e i dettagli delle serie registrate.
              </p>
            </div>
          </div>

          <button
            onClick={onSelectRoutineTab}
            className="text-xs font-mono text-red-400 hover:underline flex items-center gap-1"
          >
            Avvia Nuovo Allenamento <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {sessionLogs.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-zinc-800 rounded-2xl space-y-3 bg-[#09090b]">
            <Dumbbell className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-xs font-mono text-zinc-400">
              Non hai ancora registrato nessun allenamento. Vai alla sezione 2 e avvia la tua prima scheda!
            </p>
            <button
              onClick={onSelectRoutineTab}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs shadow-md shadow-red-950/50"
            >
              VAI ALLE SCHEDE
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {sessionLogs.map((log) => {
              const formattedDate = new Date(log.date).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={log.id}
                  className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-3 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2">
                    <div>
                      <span className="text-xs font-mono text-zinc-400">{formattedDate}</span>
                      <h4 className="text-sm font-bold text-zinc-100">{log.routineName}</h4>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-zinc-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-red-400" />
                        {Math.max(1, Math.round(log.totalDurationSeconds / 60))} min
                      </span>
                      <span>•</span>
                      <span className="text-zinc-300">{log.totalSets} Serie</span>
                      <span>•</span>
                      <span className="text-red-400 font-bold">+{log.xpEarned} XP</span>
                      {log.newPRsCount > 0 && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                          {log.newPRsCount} NUOVI RECORD!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary of sets inside log */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
                    {log.sets.map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0c0c0e] border border-zinc-800/60 p-2 rounded-lg flex items-center justify-between"
                      >
                        <span className="text-zinc-300 truncate max-w-[140px]">
                          {s.exerciseTitle} (Set {s.setIndex})
                        </span>
                        <span className="text-red-400 font-bold">{s.achievedBpm} BPM</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
