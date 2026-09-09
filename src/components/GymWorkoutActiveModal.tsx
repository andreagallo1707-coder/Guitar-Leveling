import React, { useState, useEffect, useRef } from 'react';
import { WorkoutRoutine, WorkoutSet, WorkoutSessionLog, HunterProfile, TechniqueExercise } from '../types';
import { exercisesData } from '../data/exercisesData';
import { TabViewer } from './TabViewer';
import { MetronomeBar } from './MetronomeBar';
import { soundEngine } from '../utils/audioEngine';
import { awardXpToProfile, loadCustomExercises, recordBossTrainingProgress } from '../utils/storage';
import { getAllBossFights, bossToWorkoutExercise } from '../utils/bossWorkoutAdapter';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  Plus,
  Trash2,
  Trophy,
  Star,
  Timer,
  Activity,
  Sparkles,
  Eye,
  Layers,
  Music,
  Video,
  ShieldAlert,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Swords,
  Dumbbell
} from 'lucide-react';

interface GymWorkoutActiveModalProps {
  routine: WorkoutRoutine;
  hunterProfile: HunterProfile;
  onClose: () => void;
  onFinishWorkout: (log: WorkoutSessionLog, updatedProfile: HunterProfile) => void;
}

export const GymWorkoutActiveModal: React.FC<GymWorkoutActiveModalProps> = ({
  routine,
  hunterProfile,
  onClose,
  onFinishWorkout
}) => {
  // Session stopwatch
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Mobile view tab toggle: 'sets' or 'tab_metronome'
  const [mobileViewTab, setMobileViewTab] = useState<'sets' | 'tab_metronome'>('sets');

  // Rest Timer
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number>(0);
  const [restTargetSeconds, setRestTargetSeconds] = useState<number>(60);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);

  // Exercises in this session with their sets (technique exercises, user imports and boss fights)
  const allAvailableExercises = React.useMemo(() => {
    const custom = loadCustomExercises();
    const allBosses = getAllBossFights(hunterProfile);
    const bossExercises = allBosses.map((b) =>
      bossToWorkoutExercise(b, hunterProfile.customBossVideos)
    );
    return [...exercisesData, ...custom, ...bossExercises];
  }, [hunterProfile]);

  const routineExercises = React.useMemo(() => {
    return routine.exerciseIds
      .map((id) => allAvailableExercises.find((ex) => ex.id === id))
      .filter(Boolean) as TechniqueExercise[];
  }, [routine, allAvailableExercises]);

  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [previewTabExerciseId, setPreviewTabExerciseId] = useState<string | null>(
    routineExercises[0]?.id || null
  );

  // Workout sets state
  const [exerciseSets, setExerciseSets] = useState<Record<string, WorkoutSet[]>>(() => {
    const initial: Record<string, WorkoutSet[]> = {};
    routineExercises.forEach((ex) => {
      const isBoss = Boolean(ex.isBoss);
      const bossProgress = hunterProfile.bossTrainingProgress?.[ex.id];
      const pastPr = isBoss
        ? (bossProgress?.maxAchievedBpm || ex.defaultBpm)
        : (hunterProfile.exercisePRs[ex.id]?.maxBpm || ex.defaultBpm);

      initial[ex.id] = [
        {
          id: `${ex.id}-set-1`,
          exerciseId: ex.id,
          exerciseTitle: ex.title,
          setIndex: 1,
          targetBpm: pastPr,
          achievedBpm: pastPr,
          durationSeconds: 60,
          cleanlinessRating: 4,
          notes: '',
          isBossFight: isBoss,
          bossId: isBoss ? ex.id : undefined
        },
        {
          id: `${ex.id}-set-2`,
          exerciseId: ex.id,
          exerciseTitle: ex.title,
          setIndex: 2,
          targetBpm: Math.min(ex.targetBpm, pastPr + 5),
          achievedBpm: Math.min(ex.targetBpm, pastPr + 5),
          durationSeconds: 60,
          cleanlinessRating: 4,
          notes: '',
          isBossFight: isBoss,
          bossId: isBoss ? ex.id : undefined
        },
        {
          id: `${ex.id}-set-3`,
          exerciseId: ex.id,
          exerciseTitle: ex.title,
          setIndex: 3,
          targetBpm: Math.min(ex.targetBpm, pastPr + 10),
          achievedBpm: Math.min(ex.targetBpm, pastPr + 10),
          durationSeconds: 60,
          cleanlinessRating: 4,
          notes: '',
          isBossFight: isBoss,
          bossId: isBoss ? ex.id : undefined
        }
      ];
    });
    return initial;
  });

  const [completedSetIds, setCompletedSetIds] = useState<Set<string>>(new Set());
  const [showMetronome, setShowMetronome] = useState<boolean>(true);
  const [activeMetronomeBpm, setActiveMetronomeBpm] = useState<number>(
    routineExercises[0]?.defaultBpm || 100
  );

  // Overall session stopwatch
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Rest Timer countdown
  useEffect(() => {
    let restInterval: NodeJS.Timeout | null = null;
    if (isRestActive && restSecondsRemaining > 0) {
      restInterval = setInterval(() => {
        setRestSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRestActive(false);
            soundEngine.playTimerDone();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (restInterval) clearInterval(restInterval);
    };
  }, [isRestActive, restSecondsRemaining]);

  const startRestTimer = (seconds: number) => {
    setRestTargetSeconds(seconds);
    setRestSecondsRemaining(seconds);
    setIsRestActive(true);
  };

  const handleToggleSetComplete = (setId: string, exId: string, achievedBpm: number) => {
    const next = new Set(completedSetIds);
    if (next.has(setId)) {
      next.delete(setId);
    } else {
      next.add(setId);
      // Trigger rest timer on set completion
      startRestTimer(60);
      soundEngine.playClick(true);
    }
    setCompletedSetIds(next);
  };

  const handleUpdateSet = (
    exId: string,
    setId: string,
    field: keyof WorkoutSet,
    val: number | string
  ) => {
    setExerciseSets((prev) => {
      const currentList = prev[exId] || [];
      const updated = currentList.map((s) => (s.id === setId ? { ...s, [field]: val } : s));
      return { ...prev, [exId]: updated };
    });
  };

  const handleAddSet = (exId: string) => {
    setExerciseSets((prev) => {
      const currentList = prev[exId] || [];
      const last = currentList[currentList.length - 1];
      const newIndex = currentList.length + 1;
      const ex = routineExercises.find((e) => e.id === exId);
      const isBoss = Boolean(ex?.isBoss);
      const newSet: WorkoutSet = {
        id: `${exId}-set-${Date.now()}-${newIndex}`,
        exerciseId: exId,
        exerciseTitle: last?.exerciseTitle || ex?.title || 'Esercizio',
        setIndex: newIndex,
        targetBpm: last ? last.targetBpm + 5 : 100,
        achievedBpm: last ? last.achievedBpm + 5 : 100,
        durationSeconds: 60,
        cleanlinessRating: 4,
        notes: '',
        isBossFight: isBoss,
        bossId: isBoss ? exId : undefined
      };
      return { ...prev, [exId]: [...currentList, newSet] };
    });
  };

  const handleDeleteSet = (exId: string, setId: string) => {
    setExerciseSets((prev) => {
      const currentList = prev[exId] || [];
      if (currentList.length <= 1) return prev; // Keep at least 1 set
      return { ...prev, [exId]: currentList.filter((s) => s.id !== setId) };
    });
  };

  const handleFinishWorkout = () => {
    setIsTimerRunning(false);

    // Calculate logs, PRs, and XP
    const flatSets: WorkoutSet[] = [];
    let prCount = 0;
    const updatedPrs = { ...hunterProfile.exercisePRs };

    (Object.entries(exerciseSets) as [string, WorkoutSet[]][]).forEach(([exId, sets]) => {
      sets.forEach((s) => {
        if (completedSetIds.has(s.id)) {
          const currentPr = updatedPrs[exId]?.maxBpm || 0;
          const isNewPr = s.achievedBpm > currentPr;

          if (isNewPr) {
            prCount += 1;
            updatedPrs[exId] = {
              maxBpm: s.achievedBpm,
              achievedAt: new Date().toISOString()
            };
          }

          flatSets.push({
            ...s,
            isPersonalRecord: isNewPr
          });
        }
      });
    });

    const xpGained = Math.max(50, completedSetIds.size * 25 + prCount * 50);

    const log: WorkoutSessionLog = {
      id: `session-${Date.now()}`,
      routineId: routine.id,
      routineName: routine.name,
      date: new Date().toISOString(),
      totalDurationSeconds: elapsedSeconds,
      totalSets: flatSets.length,
      sets: flatSets,
      xpEarned: xpGained,
      newPRsCount: prCount
    };

    let profileWithStats: HunterProfile = {
      ...hunterProfile,
      totalMinutesPracticed:
        hunterProfile.totalMinutesPracticed + Math.max(1, Math.round(elapsedSeconds / 60)),
      totalSessionsCompleted: hunterProfile.totalSessionsCompleted + 1,
      lastPracticeDate: new Date().toISOString(),
      exercisePRs: updatedPrs
    };

    // Record Boss training progress for all boss exercises trained in this workout
    routineExercises.forEach((ex) => {
      if (ex.isBoss) {
        const bossCompletedSets = flatSets.filter(
          (s) => s.exerciseId === ex.id || s.bossId === ex.id
        );
        if (bossCompletedSets.length > 0) {
          const maxAchieved = Math.max(...bossCompletedSets.map((s) => s.achievedBpm || 0));
          const lastSet = bossCompletedSets[bossCompletedSets.length - 1];
          const lastTarget = lastSet?.targetBpm || ex.targetBpm;
          const lastAchieved = lastSet?.achievedBpm || ex.defaultBpm;
          const totalSecs = bossCompletedSets.reduce((sum, s) => sum + (s.durationSeconds || 60), 0);
          const cleanliness = lastSet?.cleanlinessRating || 4;
          const combinedNotes = bossCompletedSets
            .map((s) => s.notes?.trim())
            .filter(Boolean)
            .join(' • ');

          const bossFightId = (ex as any).bossFightData?.id || ex.id.replace('boss-exercise-', '');
          profileWithStats = recordBossTrainingProgress(profileWithStats, {
            bossId: bossFightId,
            bossTitle: ex.title,
            targetBpm: lastTarget,
            achievedBpm: maxAchieved || lastAchieved,
            durationSeconds: totalSecs,
            cleanlinessRating: cleanliness,
            notes: combinedNotes
          });
        }
      }
    });

    const { updatedProfile } = awardXpToProfile(profileWithStats, xpGained);

    // Audio & Confetti celebration
    soundEngine.playLevelUp();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    onFinishWorkout(log, updatedProfile);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentActiveExercise = routineExercises[activeExerciseIndex];
  const previewTabExercise = allAvailableExercises.find((e) => e.id === previewTabExerciseId);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-[#0c0c0e] border-b border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                SESSIONE LIVE
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#09090b] text-zinc-300 border border-zinc-800 truncate max-w-[140px] sm:max-w-none">
                {routine.name}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-zinc-400 font-mono mt-0.5">
              <span className="flex items-center gap-1 text-zinc-200 font-bold">
                <Timer className="w-3.5 h-3.5 text-red-400" /> {formatTime(elapsedSeconds)}
              </span>
              <span>•</span>
              <span>{completedSetIds.size} Serie Fatte</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Rest Timer Quick Pill */}
          {isRestActive ? (
            <button
              onClick={() => setIsRestActive(false)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-600 text-white font-mono font-bold text-xs shadow-lg shadow-red-950/50 animate-pulse"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>RECUPERO: {formatTime(restSecondsRemaining)}</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-1 bg-[#09090b] border border-zinc-800 rounded-lg p-1 text-xs font-mono">
              <span className="text-zinc-500 px-1">Timer:</span>
              {[30, 60, 90, 120].map((sec) => (
                <button
                  key={sec}
                  onClick={() => startRestTimer(sec)}
                  className="px-2 py-0.5 rounded hover:bg-zinc-800 text-zinc-300 hover:text-red-400 transition-colors"
                >
                  {sec}s
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowMetronome(!showMetronome)}
            className={`p-2 rounded-lg border font-mono text-xs flex items-center gap-1 transition-all ${
              showMetronome
                ? 'bg-red-950/40 border-red-600/50 text-red-300 shadow-sm'
                : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Metronomo Live"
          >
            <Activity className="w-4 h-4" />
          </button>

          <button
            onClick={handleFinishWorkout}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs shadow-lg shadow-red-950/50 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span className="hidden sm:inline">COMPLETA ALLENAMENTO</span>
            <span className="sm:hidden">FINE</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile-Only Tab Switcher (< lg) */}
      <div className="lg:hidden flex items-center bg-[#09090b] border-b border-zinc-800 px-3 py-1.5 gap-2 flex-shrink-0">
        <button
          onClick={() => setMobileViewTab('sets')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors ${
            mobileViewTab === 'sets'
              ? 'bg-[#0c0c0e] text-red-400 border border-red-900/60 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          1. Scheda Serie ({routineExercises.length} Esercizi)
        </button>
        <button
          onClick={() => setMobileViewTab('tab_metronome')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors ${
            mobileViewTab === 'tab_metronome'
              ? 'bg-[#0c0c0e] text-red-400 border border-red-900/60 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          2. Tablatura & Metronomo
        </button>
      </div>

      {/* Main Workspace: Desktop Side-by-Side Contained View & Mobile Adaptive View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 sm:p-5 overflow-hidden bg-[#09090b]">
        {/* Left Column: Exercises & Tracking Table */}
        <div
          className={`lg:col-span-7 h-full overflow-y-auto space-y-4 pr-1 ${
            mobileViewTab === 'sets' ? 'block' : 'hidden lg:block'
          }`}
        >
          {routineExercises.map((ex, exIdx) => {
            const sets = exerciseSets[ex.id] || [];
            const pastPr = hunterProfile.exercisePRs[ex.id]?.maxBpm;
            const isCurrentlySelected = activeExerciseIndex === exIdx;

            return (
              <div
                key={ex.id}
                onClick={() => {
                  setActiveExerciseIndex(exIdx);
                  setPreviewTabExerciseId(ex.id);
                  setActiveMetronomeBpm(pastPr || ex.defaultBpm);
                }}
                className={`bg-[#0c0c0e] border rounded-2xl p-3.5 sm:p-5 transition-all shadow-md ${
                  isCurrentlySelected
                    ? 'border-red-600/70 ring-1 ring-red-600/30 shadow-xl shadow-red-950/20'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Exercise Title Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#09090b] border border-zinc-800 text-red-400 flex items-center justify-center font-mono font-black text-xs">
                      {exIdx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-zinc-100 text-sm sm:text-base flex items-center gap-2">
                          {ex.title}
                        </h3>
                        {ex.isBoss && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/80 font-bold flex items-center gap-1">
                            <Swords className="w-3 h-3 text-purple-400" />
                            {ex.bossFightData?.category === 'fandom' ? 'FANDOM BOSS' : 'BOSS FIGHT'}
                          </span>
                        )}
                        {ex.isBoss && hunterProfile.customBossVideos?.[ex.id] && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/80 font-semibold flex items-center gap-1">
                            <Video className="w-2.5 h-2.5 text-amber-400" />
                            Canale Personalizzato
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-0.5 flex-wrap">
                        <span className="text-red-400 font-semibold">{ex.category}</span>
                        <span>•</span>
                        <span>Target: {ex.targetBpm} BPM</span>
                        {ex.tuning && (
                          <>
                            <span>•</span>
                            <span className="text-zinc-400">Accordatura: {ex.tuning}</span>
                          </>
                        )}
                        {pastPr && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-400 flex items-center gap-1 font-bold">
                              <Trophy className="w-3 h-3" /> RECORD: {pastPr} BPM
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTabExerciseId(ex.id);
                      setActiveExerciseIndex(exIdx);
                      setActiveMetronomeBpm(pastPr || ex.defaultBpm);
                      setMobileViewTab('tab_metronome');
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#09090b] border border-zinc-800 hover:border-red-600/50 text-red-400 font-mono text-xs font-bold transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VEDI TAB & METRONOMO</span>
                  </button>
                </div>

                {/* Sets Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs min-w-[560px]">
                    <thead>
                      <tr className="text-zinc-500 border-b border-zinc-800/60 pb-1.5">
                        <th className="py-2 px-1.5 text-center w-10">SET</th>
                        <th className="py-2 px-1.5 text-center w-20">TARGET</th>
                        <th className="py-2 px-1.5 text-center w-24">BPM REALE</th>
                        <th className="py-2 px-1.5 text-center w-18">DURATA</th>
                        <th className="py-2 px-1.5 text-center w-24">PULIZIA</th>
                        <th className="py-2 px-2 text-left min-w-[150px]">NOTE MANUALI</th>
                        <th className="py-2 px-1.5 text-center w-14">STATO</th>
                        <th className="py-2 px-1 text-center w-8"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/40">
                      {sets.map((set, sIdx) => {
                        const isDone = completedSetIds.has(set.id);
                        const isPr = set.achievedBpm > (pastPr || 0);

                        return (
                          <tr
                            key={set.id}
                            className={`transition-colors ${
                              isDone ? 'bg-red-950/20 text-zinc-100' : 'hover:bg-zinc-900/40'
                            }`}
                          >
                            {/* Set # */}
                            <td className="py-2 px-1.5 text-center font-bold text-zinc-400">
                              {sIdx + 1}
                            </td>

                            {/* Target BPM */}
                            <td className="py-2 px-1.5 text-center">
                              <input
                                type="number"
                                min="40"
                                max="300"
                                value={set.targetBpm}
                                onChange={(e) =>
                                  handleUpdateSet(
                                    ex.id,
                                    set.id,
                                    'targetBpm',
                                    Number(e.target.value)
                                  )
                                }
                                className="w-16 px-1.5 py-1 rounded bg-[#09090b] border border-zinc-800 text-center font-bold text-zinc-200 focus:border-red-600 outline-none text-xs"
                              />
                            </td>

                            {/* Achieved BPM */}
                            <td className="py-2 px-1.5 text-center">
                              <div className="relative inline-flex items-center">
                                <input
                                  type="number"
                                  min="40"
                                  max="300"
                                  value={set.achievedBpm}
                                  onChange={(e) =>
                                    handleUpdateSet(
                                      ex.id,
                                      set.id,
                                      'achievedBpm',
                                      Number(e.target.value)
                                    )
                                  }
                                  className={`w-16 px-1.5 py-1 rounded border text-center font-black outline-none transition-colors text-xs ${
                                    isPr
                                      ? 'bg-red-950/40 border-red-600 text-red-300 ring-1 ring-red-500'
                                      : 'bg-[#09090b] border-zinc-800 text-zinc-200 focus:border-red-600'
                                  }`}
                                />
                                {isPr && (
                                  <span
                                    className="absolute -top-3 -right-2 text-[8px] font-mono font-black text-red-400 bg-[#0c0c0e] border border-red-600 px-1 rounded-full whitespace-nowrap"
                                    title="Nuovo Record!"
                                  >
                                    RECORD!
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Duration */}
                            <td className="py-2 px-1.5 text-center">
                              <div className="inline-flex items-center gap-1">
                                <input
                                  type="number"
                                  step="10"
                                  min="10"
                                  max="600"
                                  value={set.durationSeconds}
                                  onChange={(e) =>
                                    handleUpdateSet(
                                      ex.id,
                                      set.id,
                                      'durationSeconds',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-13 px-1 py-1 rounded bg-[#09090b] border border-zinc-800 text-center font-semibold text-zinc-300 outline-none text-xs"
                                />
                                <span className="text-[10px] text-zinc-500">s</span>
                              </div>
                            </td>

                            {/* Cleanliness Rating Stars */}
                            <td className="py-2 px-1.5 text-center">
                              <div className="flex items-center justify-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateSet(ex.id, set.id, 'cleanlinessRating', star)
                                    }
                                    className={`p-0.5 transition-transform active:scale-125 ${
                                      star <= set.cleanlinessRating
                                        ? 'text-red-400'
                                        : 'text-zinc-700 hover:text-zinc-500'
                                    }`}
                                  >
                                    <Star className="w-3 h-3 fill-current" />
                                  </button>
                                ))}
                              </div>
                            </td>

                            {/* Manual Notes for each set */}
                            <td className="py-2 px-2 text-left">
                              <input
                                type="text"
                                placeholder="Note pulizia, plettrata..."
                                value={set.notes || ''}
                                onChange={(e) =>
                                  handleUpdateSet(ex.id, set.id, 'notes', e.target.value)
                                }
                                className="w-full px-2 py-1 rounded bg-[#09090b] border border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus:border-red-600 outline-none text-xs font-sans"
                              />
                            </td>

                            {/* Complete Checkbox */}
                            <td className="py-2 px-1.5 text-center">
                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleSetComplete(set.id, ex.id, set.achievedBpm)
                                }
                                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold transition-all mx-auto ${
                                  isDone
                                    ? 'bg-red-600 text-white shadow-md shadow-red-950/50 ring-2 ring-red-500'
                                    : 'bg-[#09090b] border border-zinc-800 text-zinc-600 hover:text-zinc-200 hover:border-zinc-700'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </td>

                            {/* Delete set */}
                            <td className="py-2 px-1 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteSet(ex.id, set.id)}
                                className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                                title="Rimuovi serie"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Add Set Button */}
                <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddSet(ex.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#09090b] hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-red-400 font-mono text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    AGGIUNGI SERIE (+1 SET)
                  </button>

                  <div className="text-[11px] font-mono text-zinc-500">
                    {ex.focusMuscles}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live Tab Viewer & Live Metronome (Contained Scroll on Desktop) */}
        <div
          className={`lg:col-span-5 h-full overflow-y-auto space-y-4 pr-1 ${
            mobileViewTab === 'tab_metronome' ? 'block' : 'hidden lg:block'
          }`}
        >
          {previewTabExercise ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#0c0c0e] p-3 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-xs font-mono font-bold text-red-400 block">
                    {previewTabExercise.isBoss ? 'BOSS FIGHT IN FOCUS' : 'TABLATURA ESERCIZIO IN FOCUS'}
                  </span>
                  <span className="text-sm font-bold text-zinc-100">{previewTabExercise.title}</span>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-[#09090b] border border-zinc-800 text-zinc-400">
                  {previewTabExercise.difficultyRank}
                </span>
              </div>

              {/* Video Player if exercise has youtubeId */}
              {previewTabExercise.youtubeId && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-red-400 font-bold flex items-center gap-1.5">
                      <Video className="w-4 h-4" />
                      VIDEO LEZIONE INTEGRATA
                    </span>
                    {previewTabExercise.channelName && (
                      <span className="text-zinc-400">
                        Canale: <strong className="text-zinc-200">{previewTabExercise.channelName}</strong>
                      </span>
                    )}
                  </div>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-lg">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${previewTabExercise.youtubeId}?rel=0`}
                      title={previewTabExercise.title}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* External Video Tutorial Link (if not standard YouTube embed) */}
              {!previewTabExercise.youtubeId && previewTabExercise.videoUrl && (
                <div className="bg-[#0c0c0e] border border-zinc-800 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                      <Video className="w-4 h-4" />
                      TUTORIAL VIDEO ALLEGATO
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    Video tutorial collegato a questo esercizio:
                  </p>
                  <a
                    href={previewTabExercise.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-xs font-mono font-bold text-red-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    APRI VIDEO TUTORIAL IN UNA NUOVA SCHEDA
                  </a>
                </div>
              )}

              {/* Dedicated Songsterr Link Hub for Boss Fights (Exclusive Source together with YouTube) */}
              {previewTabExercise.isBoss && (
                <div className="bg-[#08120c] border border-emerald-900/60 rounded-2xl p-4 space-y-3 shadow-lg shadow-emerald-950/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-800/40">
                        <Music className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-mono font-bold text-zinc-100 flex items-center gap-1.5">
                          Songsterr (Partitura Ufficiale)
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-400">
                          Tablatura completa e sincronizzata su Songsterr
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                      SONGSTERR
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    Per questo Boss la tablatura ufficiale di studio è disponibile direttamente su Songsterr:
                  </p>

                  <a
                    href={
                      previewTabExercise.bossFightData?.songsterrUrl ||
                      `https://www.songsterr.com/a/wa/search?pattern=${encodeURIComponent(
                        previewTabExercise.bossFightData?.title || previewTabExercise.title
                      )}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    APRI TABLATURA COMPLETA SU SONGSTERR ↗
                  </a>
                </div>
              )}

              {/* Imported Custom Tablatura (Image, PDF, Text or File) - ONLY for regular technique exercises */}
              {!previewTabExercise.isBoss && (previewTabExercise.tabFileData || previewTabExercise.tabText) && (
                <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      TABLATURA ALLEGATA
                    </span>
                    {previewTabExercise.tabFileName && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#09090b] text-zinc-400 border border-zinc-800 truncate max-w-[200px]">
                        {previewTabExercise.tabFileName}
                      </span>
                    )}
                  </div>

                  {/* Image Tablatura */}
                  {previewTabExercise.tabFileData &&
                    (previewTabExercise.tabFileType === 'image' ||
                      previewTabExercise.tabFileData.startsWith('data:image')) && (
                      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black/60 p-1 flex justify-center">
                        <img
                          src={previewTabExercise.tabFileData}
                          alt={previewTabExercise.tabFileName || 'Tablatura Esercizio'}
                          className="max-h-[420px] w-auto max-w-full object-contain rounded-lg"
                        />
                      </div>
                    )}

                  {/* PDF Tablatura */}
                  {previewTabExercise.tabFileData &&
                    (previewTabExercise.tabFileType === 'pdf' ||
                      previewTabExercise.tabFileData.startsWith('data:application/pdf')) && (
                      <div className="space-y-2">
                        <iframe
                          src={previewTabExercise.tabFileData}
                          title="PDF Tablatura"
                          className="w-full h-80 rounded-xl border border-zinc-800 bg-zinc-950"
                        />
                        <a
                          href={previewTabExercise.tabFileData}
                          download={previewTabExercise.tabFileName || 'tablatura.pdf'}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-red-400"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Scarica / Apri PDF a schermo intero
                        </a>
                      </div>
                    )}

                  {/* Text / ASCII Tablatura */}
                  {(previewTabExercise.tabText ||
                    previewTabExercise.tabFileType === 'text') && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-zinc-500 uppercase">
                        Notazione Tab ASCII:
                      </div>
                      <pre className="p-3 rounded-xl bg-[#09090b] border border-zinc-800 font-mono text-xs text-red-200 overflow-x-auto whitespace-pre leading-relaxed selection:bg-red-600/40">
                        {previewTabExercise.tabText || previewTabExercise.tabFileData}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Graphical Tab Viewer or Authentic PDF (e.g. JTC Mantovanelli) - ONLY FOR TECHNIQUE EXERCISES */}
              {!previewTabExercise.isBoss &&
                ((previewTabExercise.measures && previewTabExercise.measures.length > 0) ||
                  previewTabExercise.pdfUrl ||
                  previewTabExercise.id.startsWith('ex-jtc')) && (
                <TabViewer
                  exerciseId={previewTabExercise.id}
                  exerciseTitle={previewTabExercise.title}
                  pdfUrl={previewTabExercise.pdfUrl}
                  pdfStartPage={previewTabExercise.pdfStartPage || 2}
                  measures={previewTabExercise.measures || []}
                  tuning={previewTabExercise.tuning}
                  tempoBpm={activeMetronomeBpm}
                  interactivePlayback={true}
                />
              )}

              {/* Biomechanical focus */}
              {previewTabExercise.biomechanicalFocus && (
                <div className="bg-amber-950/20 border border-amber-800/50 rounded-xl p-3 space-y-1">
                  <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    FOCUS BIOMECCANICO:
                  </span>
                  <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                    {previewTabExercise.biomechanicalFocus}
                  </p>
                </div>
              )}

              {/* Embedded Live Metronome */}
              {showMetronome && (
                <MetronomeBar
                  initialBpm={activeMetronomeBpm}
                  onBpmChange={(b) => setActiveMetronomeBpm(b)}
                  isFloating={false}
                />
              )}

              {/* Technical Tips */}
              <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-3.5 space-y-1.5">
                <span className="text-xs font-bold font-mono text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  CONSIGLI TECNICI:
                </span>
                <ul className="space-y-1 text-xs text-zinc-400 list-disc list-inside">
                  {previewTabExercise.tips.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl bg-[#0c0c0e]">
              Seleziona un esercizio a sinistra per visualizzare la tablatura grafica.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
