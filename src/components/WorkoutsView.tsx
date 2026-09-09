import React, { useState } from 'react';
import { WorkoutRoutine, TechniqueExercise, HunterProfile, ApiSettings } from '../types';
import { exercisesData } from '../data/exercisesData';
import { saveUserRoutines, loadCustomExercises, saveCustomExercises } from '../utils/storage';
import { getAllBossFights, bossToWorkoutExercise } from '../utils/bossWorkoutAdapter';
import { soundEngine } from '../utils/audioEngine';
import { ImportExerciseModal } from './ImportExerciseModal';
import { RoutinePreviewModal } from './RoutinePreviewModal';
import { ForgeCoachModal } from './ForgeCoachModal';
import {
  Dumbbell,
  Plus,
  Search,
  Play,
  Trash2,
  Clock,
  Sparkles,
  Trophy,
  Check,
  Flame,
  Layers,
  Zap,
  Tag,
  Upload,
  Video,
  FileText,
  Music,
  Eye,
  Bot,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  UserCheck,
  Swords,
  ExternalLink
} from 'lucide-react';

interface WorkoutsViewProps {
  routines: WorkoutRoutine[];
  hunterProfile: HunterProfile;
  onUpdateRoutines: (routines: WorkoutRoutine[]) => void;
  onStartWorkout: (routine: WorkoutRoutine) => void;
  apiSettings?: ApiSettings;
  onOpenSettings?: () => void;
}

export const WorkoutsView: React.FC<WorkoutsViewProps> = ({
  routines,
  hunterProfile,
  onUpdateRoutines,
  onStartWorkout,
  apiSettings,
  onOpenSettings
}) => {
  const [isCreatingRoutine, setIsCreatingRoutine] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [customExercises, setCustomExercises] = useState<TechniqueExercise[]>(() => loadCustomExercises());
  const [routineSearchQuery, setRoutineSearchQuery] = useState<string>('');

  // Two folders closed by default
  const [isCustomFolderOpen, setIsCustomFolderOpen] = useState<boolean>(false);
  const [isPresetFolderOpen, setIsPresetFolderOpen] = useState<boolean>(false);

  // Forge Coach AI Modal
  const [isForgeCoachOpen, setIsForgeCoachOpen] = useState<boolean>(false);

  // Keep customExercises synchronized when modals close or routines update
  React.useEffect(() => {
    setCustomExercises(loadCustomExercises());
  }, [isForgeCoachOpen, isImportModalOpen, routines.length]);

  // Routine Preview & In-depth Editing
  const [selectedPreviewRoutine, setSelectedPreviewRoutine] = useState<WorkoutRoutine | null>(null);

  // New Routine Form State
  const [newRoutineName, setNewRoutineName] = useState<string>('');
  const [newRoutineDesc, setNewRoutineDesc] = useState<string>('');
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);
  const [exerciseModalSearch, setExerciseModalSearch] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedRankFilter, setSelectedRankFilter] = useState<string>('all');
  const [exerciseSourceTab, setExerciseSourceTab] = useState<'technique' | 'bosses' | 'all'>('technique');
  const [selectedBossCategoryFilter, setSelectedBossCategoryFilter] = useState<'all' | 'official' | 'fandom'>('all');

  const rankSortWeight: Record<string, number> = {
    'E-Rank': 1,
    'D-Rank': 2,
    'C-Rank': 3,
    'B-Rank': 4,
    'A-Rank': 5,
    'S-Rank': 6,
  };

  const getRankBadgeStyle = (rank: string) => {
    switch (rank) {
      case 'E-Rank':
        return 'bg-zinc-800 text-zinc-200 border-zinc-500 font-bold';
      case 'D-Rank':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/70 font-bold';
      case 'C-Rank':
        return 'bg-sky-950 text-sky-200 border-sky-400 font-bold shadow-sm shadow-sky-950/50';
      case 'B-Rank':
        return 'bg-purple-950 text-purple-200 border-purple-400 font-bold shadow-sm shadow-purple-950/50';
      case 'A-Rank':
        return 'bg-amber-950/70 text-amber-300 border-amber-600/70 font-bold';
      case 'S-Rank':
        return 'bg-red-950 text-red-200 border-red-500 font-black animate-pulse shadow-sm';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  // Combine official database exercises with user imported exercises and all Boss Fights
  const allBossExercises = React.useMemo(() => {
    const bosses = getAllBossFights(hunterProfile);
    return bosses.map((b) => bossToWorkoutExercise(b, hunterProfile.customBossVideos));
  }, [hunterProfile]);

  const allExercises = React.useMemo(() => {
    return [...exercisesData, ...customExercises, ...allBossExercises];
  }, [customExercises, allBossExercises]);

  const officialBossCount = React.useMemo(() => {
    return allBossExercises.filter((b) => b.bossFightData?.category !== 'fandom').length;
  }, [allBossExercises]);

  const fandomBossCount = React.useMemo(() => {
    return allBossExercises.filter((b) => b.bossFightData?.category === 'fandom').length;
  }, [allBossExercises]);

  const techniqueExercisesCount = exercisesData.length + customExercises.length;

  // Filtered routines
  const filteredRoutines = routines.filter((r) =>
    r.name.toLowerCase().includes(routineSearchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(routineSearchQuery.toLowerCase())
  );

  // Filtered exercises inside "Create Routine" modal
  const modalFilteredExercises = React.useMemo(() => {
    return allExercises
      .filter((ex) => {
        // Source Tab filter
        if (exerciseSourceTab === 'technique' && ex.isBoss) return false;
        if (exerciseSourceTab === 'bosses' && !ex.isBoss) return false;

        // Boss Category filter (when in bosses tab or all)
        if (ex.isBoss && selectedBossCategoryFilter !== 'all') {
          const isFandom = ex.bossFightData?.category === 'fandom';
          if (selectedBossCategoryFilter === 'official' && isFandom) return false;
          if (selectedBossCategoryFilter === 'fandom' && !isFandom) return false;
        }

        // Technique category filter
        if (!ex.isBoss && selectedCategoryFilter !== 'all' && ex.category !== selectedCategoryFilter) {
          return false;
        }

        // Rank filter
        if (selectedRankFilter !== 'all' && ex.difficultyRank !== selectedRankFilter) {
          return false;
        }

        // Search text
        if (exerciseModalSearch.trim()) {
          const q = exerciseModalSearch.toLowerCase();
          const matchTitle = ex.title.toLowerCase().includes(q);
          const matchCat = ex.category.toLowerCase().includes(q);
          const matchArtist = ex.bossFightData?.artist?.toLowerCase().includes(q);
          const matchFandom = ex.bossFightData?.fandomUniverse?.toLowerCase().includes(q);
          if (!matchTitle && !matchCat && !matchArtist && !matchFandom) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort Bosses in ascending rank order (E-Rank to S-Rank)
        if (exerciseSourceTab === 'bosses' || (a.isBoss && b.isBoss)) {
          const wA = rankSortWeight[a.difficultyRank] || 0;
          const wB = rankSortWeight[b.difficultyRank] || 0;
          if (wA !== wB) return wA - wB;
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [
    allExercises,
    exerciseSourceTab,
    selectedBossCategoryFilter,
    selectedCategoryFilter,
    selectedRankFilter,
    exerciseModalSearch,
  ]);

  const categories = Array.from(new Set(allExercises.map((e) => e.category)));

  const handleToggleExerciseSelection = (exId: string) => {
    setSelectedExerciseIds((prev) =>
      prev.includes(exId) ? prev.filter((id) => id !== exId) : [...prev, exId]
    );
  };

  const handleSaveImportedExercise = (newExercise: TechniqueExercise) => {
    const updated = [newExercise, ...customExercises];
    setCustomExercises(updated);
    saveCustomExercises(updated);
    // Automatically select the new imported exercise in current routine draft
    setSelectedExerciseIds((prev) => (prev.includes(newExercise.id) ? prev : [...prev, newExercise.id]));
  };

  const handleDeleteCustomExercise = (exerciseId: string) => {
    const updated = customExercises.filter((e) => e.id !== exerciseId);
    setCustomExercises(updated);
    saveCustomExercises(updated);
    setSelectedExerciseIds((prev) => prev.filter((id) => id !== exerciseId));
  };

  const handleSaveNewRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoutineName.trim()) return;
    if (selectedExerciseIds.length === 0) return;

    const estimatedMinutes = Math.max(10, selectedExerciseIds.length * 6);

    const newRoutine: WorkoutRoutine = {
      id: `custom-routine-${Date.now()}`,
      name: newRoutineName.trim(),
      description: newRoutineDesc.trim() || 'Scheda di allenamento personalizzata',
      isPreset: false,
      exerciseIds: selectedExerciseIds,
      estimatedMinutes,
      targetRank: hunterProfile.rank,
      createdAt: new Date().toISOString()
    };

    const updated = [newRoutine, ...routines];
    onUpdateRoutines(updated);
    saveUserRoutines(updated);
    setIsCustomFolderOpen(true);

    // Reset Form
    setNewRoutineName('');
    setNewRoutineDesc('');
    setSelectedExerciseIds([]);
    setIsCreatingRoutine(false);
  };

  const handleDeleteRoutine = (routineId: string) => {
    const updated = routines.filter((r) => r.id !== routineId);
    onUpdateRoutines(updated);
    saveUserRoutines(updated);
    if (selectedPreviewRoutine?.id === routineId) {
      setSelectedPreviewRoutine(null);
    }
  };

  const handleSavePreviewRoutine = (updatedRoutine: WorkoutRoutine) => {
    const exists = routines.some((r) => r.id === updatedRoutine.id);
    const updatedList = exists
      ? routines.map((r) => (r.id === updatedRoutine.id ? updatedRoutine : r))
      : [updatedRoutine, ...routines];
    onUpdateRoutines(updatedList);
    saveUserRoutines(updatedList);
    setSelectedPreviewRoutine(updatedRoutine);
  };

  const handleCoachRoutineCreated = (newRoutine: WorkoutRoutine) => {
    // Immediately reload custom exercises from storage to ensure instant visibility on routine cards
    const freshCustom = loadCustomExercises();
    setCustomExercises(freshCustom);

    const updated = [newRoutine, ...routines];
    onUpdateRoutines(updated);
    saveUserRoutines(updated);
    setIsCustomFolderOpen(true);
    // Open preview of the new routine so user can review/edit/start it
    setSelectedPreviewRoutine(newRoutine);
  };

  // Group routines by custom vs preset
  const customRoutines = filteredRoutines.filter((r) => !r.isPreset);
  const presetRoutines = filteredRoutines.filter((r) => r.isPreset);

  const renderRoutineCard = (routine: WorkoutRoutine) => {
    const exercises = routine.exerciseIds
      .map((id) => allExercises.find((e) => e.id === id) || loadCustomExercises().find((e) => e.id === id))
      .filter(Boolean) as TechniqueExercise[];

    return (
      <div
        key={routine.id}
        className="bg-[#0c0c0e] border border-zinc-800 hover:border-red-900/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all shadow-lg hover:shadow-red-950/10"
      >
        <div className="space-y-3">
          {/* Routine Header */}
          <div className="flex items-start justify-between gap-2">
            <div
              onClick={() => setSelectedPreviewRoutine(routine)}
              className="space-y-1 cursor-pointer group flex-1"
              title="Clicca per aprire la preview della scheda"
            >
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                  routine.isPreset
                    ? 'bg-[#09090b] text-blue-400 border-blue-900/40'
                    : 'bg-[#09090b] text-red-400 border-red-900/40'
                }`}>
                  {routine.isPreset ? 'SCHEDA UFFICIALE' : 'SCHEDA PERSONALIZZATA'}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~{routine.estimatedMinutes} min
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 group-hover:text-red-400 transition-colors flex items-center gap-1.5">
                {routine.name}
              </h3>
            </div>

            {!routine.isPreset && (
              <button
                onClick={() => handleDeleteRoutine(routine.id)}
                className="p-1.5 text-zinc-600 hover:text-red-400 rounded-lg hover:bg-[#09090b] transition-colors cursor-pointer"
                title="Elimina scheda"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            {routine.description}
          </p>

          {/* Exercises list inside routine (clickable to open preview) */}
          <div
            onClick={() => setSelectedPreviewRoutine(routine)}
            className="bg-[#09090b] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-3 space-y-1.5 cursor-pointer transition-colors group"
            title="Clicca per visualizzare la sequenza dettagliata e modificare"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500 font-bold uppercase block group-hover:text-zinc-400 transition-colors">
                Esercizi inclusi ({exercises.length}):
              </span>
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-red-400 transition-colors flex items-center gap-1">
                <Eye className="w-3 h-3" /> Preview & Modifica
              </span>
            </div>
            <div className="space-y-1">
              {exercises.map((ex, idx) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between text-xs font-mono text-zinc-300 py-0.5"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-red-500 font-bold">{idx + 1}.</span>
                    <span className="truncate">{ex.title}</span>
                    {ex.isCustom && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-red-950/70 text-red-300 border border-red-800/70 font-bold flex-shrink-0">
                        IMPORTATO
                      </span>
                    )}
                    {(ex.youtubeId || ex.videoUrl) && (
                      <span title="Tutorial Video Collegato" className="flex items-center">
                        <Video className="w-3 h-3 text-red-400 flex-shrink-0" />
                      </span>
                    )}
                    {ex.isBoss && (
                      <span title="Partitura e Tab Ufficiale Songsterr" className="flex items-center">
                        <ExternalLink className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      </span>
                    )}
                    {!ex.isBoss && (ex.tabFileName || ex.tabFileData || ex.tabText) && (
                      <span title="Tablatura Allegata" className="flex items-center">
                        <FileText className="w-3 h-3 text-zinc-400 flex-shrink-0" />
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0c0c0e] text-zinc-400 border border-zinc-800 whitespace-nowrap ml-2">
                    {ex.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons: Preview & Start Workout */}
        <div className="pt-2 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={() => setSelectedPreviewRoutine(routine)}
            className="w-full sm:flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 text-zinc-300 hover:text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>PREVIEW & MODIFICA</span>
          </button>

          <button
            onClick={() => onStartWorkout(routine)}
            className="w-full sm:flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-950/50 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>AVVIA ALLENAMENTO</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0c0c0e] via-zinc-950 to-[#0c0c0e] border border-zinc-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-red-950/40 text-red-400 border border-red-900/50">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              The Forge • Schede di Allenamento
            </h2>
            <p className="text-xs text-zinc-400">
              Gestisci le schede preimpostate dell'app e le tue routine personalizzate create con il Coach IA o create da te.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
          <button
            onClick={() => setIsForgeCoachOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-950/80 via-zinc-900 to-red-950/80 hover:from-red-900/60 hover:to-zinc-900 border border-red-500/50 hover:border-red-400 text-red-300 hover:text-white font-mono font-bold text-xs shadow-lg shadow-red-950/50 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Bot className="w-4 h-4 text-red-400 animate-pulse" />
            <span>CHIEDI AL COACH IA</span>
          </button>

          <button
            onClick={() => setIsCreatingRoutine(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs shadow-lg shadow-red-950/50 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>CREA NUOVA SCHEDA</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-96">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cerca schede per nome..."
          value={routineSearchQuery}
          onChange={(e) => setRoutineSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:border-red-600 outline-none"
        />
      </div>

      {/* TWO FOLDERS (CLOSED BY DEFAULT) */}
      <div className="space-y-4">
        {/* CARTELLA 1: ROUTINE PERSONALIZZATE (COACH IA & UTENTE) */}
        <div className="border border-zinc-800/90 rounded-2xl bg-[#0c0c0e]/90 overflow-hidden shadow-xl transition-all">
          <button
            type="button"
            onClick={() => {
              setIsCustomFolderOpen((prev) => !prev);
              soundEngine.playCardFlip();
            }}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-zinc-900/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl border transition-colors ${
                isCustomFolderOpen
                  ? 'bg-red-950/70 border-red-500/60 text-red-400'
                  : 'bg-zinc-900 border-zinc-750 text-zinc-400'
              }`}>
                {isCustomFolderOpen ? (
                  <FolderOpen className="w-5 h-5 text-red-400" />
                ) : (
                  <Folder className="w-5 h-5 text-zinc-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-black text-white font-serif tracking-wide">
                    Routine Personalizzate
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-red-950/80 border border-red-500/50 text-red-300">
                    {customRoutines.length} {customRoutines.length === 1 ? 'Scheda' : 'Schede'}
                  </span>
                  <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-zinc-900 border border-zinc-750 text-zinc-400">
                    Coach IA & Personali
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Schede create su misura dal Coach IA o configurate manualmente da te
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 hidden sm:inline font-mono">
                {isCustomFolderOpen ? 'Chiudi cartella' : 'Apri cartella'}
              </span>
              <div className="p-2 text-zinc-400 hover:text-white rounded-lg">
                {isCustomFolderOpen ? (
                  <ChevronDown className="w-5 h-5 text-red-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-zinc-400" />
                )}
              </div>
            </div>
          </button>

          {isCustomFolderOpen && (
            <div className="p-4 sm:p-5 pt-1 border-t border-zinc-800/80 animate-fade-in">
              {customRoutines.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-[#09090b] border border-dashed border-zinc-800 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-red-950/40 border border-red-900/50 flex items-center justify-center text-red-400">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-200">
                      Nessuna scheda personalizzata creata finora
                    </h4>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
                      Puoi chiedere al Coach IA di pianificare una routine mirata sui 67 esercizi del catalogo o creare tu una scheda manualmente.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => setIsForgeCoachOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Bot className="w-3.5 h-3.5 text-red-400" />
                      <span>Chiedi al Coach IA</span>
                    </button>
                    <button
                      onClick={() => setIsCreatingRoutine(true)}
                      className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Crea Scheda</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {customRoutines.map(renderRoutineCard)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CARTELLA 2: SCHEDE PREIMPOSTATE (UFFICIALI DELL'APP) */}
        <div className="border border-zinc-800/90 rounded-2xl bg-[#0c0c0e]/90 overflow-hidden shadow-xl transition-all">
          <button
            type="button"
            onClick={() => {
              setIsPresetFolderOpen((prev) => !prev);
              soundEngine.playCardFlip();
            }}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-zinc-900/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl border transition-colors ${
                isPresetFolderOpen
                  ? 'bg-blue-950/70 border-blue-500/60 text-blue-400'
                  : 'bg-zinc-900 border-zinc-750 text-zinc-400'
              }`}>
                {isPresetFolderOpen ? (
                  <FolderOpen className="w-5 h-5 text-blue-400" />
                ) : (
                  <Folder className="w-5 h-5 text-zinc-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-black text-white font-serif tracking-wide">
                    Schede Preimpostate
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-blue-950/80 border border-blue-500/50 text-blue-300">
                    {presetRoutines.length} {presetRoutines.length === 1 ? 'Scheda' : 'Schede'}
                  </span>
                  <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-zinc-900 border border-zinc-750 text-zinc-400">
                    Ufficiali Guitar Leveling
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Workout ufficiali bilanciati per Rank e stili tecnici pronti all'uso
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 hidden sm:inline font-mono">
                {isPresetFolderOpen ? 'Chiudi cartella' : 'Apri cartella'}
              </span>
              <div className="p-2 text-zinc-400 hover:text-white rounded-lg">
                {isPresetFolderOpen ? (
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-zinc-400" />
                )}
              </div>
            </div>
          </button>

          {isPresetFolderOpen && (
            <div className="p-4 sm:p-5 pt-1 border-t border-zinc-800/80 animate-fade-in">
              {presetRoutines.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-[#09090b] border border-dashed border-zinc-800">
                  <p className="text-xs text-zinc-400">
                    Nessuna scheda preimpostata corrisponde ai criteri di ricerca.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {presetRoutines.map(renderRoutineCard)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: CREATE NEW CUSTOM ROUTINE */}
      {isCreatingRoutine && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 bg-[#09090b] border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-950/40 text-red-400 border border-red-900/50">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-100">
                    Crea Nuova Scheda di Allenamento
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Cerca e seleziona gli esercizi dal database dell'app o fatti guidare dal Coach IA.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreatingRoutine(false)}
                className="text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg hover:bg-zinc-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewRoutine} className="flex-1 flex flex-col overflow-hidden">
              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Coach AI Banner suggestion */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-950 border border-red-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-zinc-200">Vuoi farti guidare o avere proposte su misura?</span>
                      <p className="text-zinc-400 text-[11px] mt-0.5">
                        Chiedi al Coach IA di creare la scheda per te, anche allegando video e tab personali!
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingRoutine(false);
                      setIsForgeCoachOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 shadow-md shadow-red-950/60 shrink-0"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    Chiedi al Coach IA
                  </button>
                </div>

                {/* Name & Description Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                      NOME DELLA SCHEDA *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="es. Speed Workout 30 Min, Downpicking Metallica, etc."
                      value={newRoutineName}
                      onChange={(e) => setNewRoutineName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                      DESCRIZIONE & OBIETTIVO
                    </label>
                    <input
                      type="text"
                      placeholder="es. Esercizi focalizzati sulla resistenza e precisione del polso..."
                      value={newRoutineDesc}
                      onChange={(e) => setNewRoutineDesc(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-red-600 outline-none"
                    />
                  </div>
                </div>

                {/* Exercises Selector with Search & Import Button */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <label className="block text-xs font-mono font-bold text-red-400">
                        SELEZIONA ESERCIZI ({selectedExerciseIds.length} Selezionati):
                      </label>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {selectedExerciseIds.filter((id) => !id.startsWith('boss-')).length} Tecnica •{' '}
                        {selectedExerciseIds.filter((id) => id.startsWith('boss-')).length} Boss Fight
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsImportModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-700/70 text-red-300 hover:text-white font-mono text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5 text-red-400" />
                      <span>+ IMPORTA ESERCIZIO PERSONALE</span>
                    </button>
                  </div>

                  {/* Navigation Tabs: Tecnica vs Boss Fight vs Tutti */}
                  <div className="flex items-center gap-1.5 p-1 bg-[#09090b] rounded-xl border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => {
                        setExerciseSourceTab('technique');
                        setSelectedRankFilter('all');
                        setSelectedCategoryFilter('all');
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        exerciseSourceTab === 'technique'
                          ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>ESERCIZI TECNICA</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40">
                        {techniqueExercisesCount}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setExerciseSourceTab('bosses');
                        setSelectedRankFilter('all');
                        setSelectedBossCategoryFilter('all');
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        exerciseSourceTab === 'bosses'
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                      }`}
                    >
                      <Swords className="w-3.5 h-3.5" />
                      <span>BOSS FIGHT (BRANI)</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40">
                        {allBossExercises.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setExerciseSourceTab('all');
                        setSelectedRankFilter('all');
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        exerciseSourceTab === 'all'
                          ? 'bg-zinc-800 text-zinc-100'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                      }`}
                    >
                      <span>TUTTI</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40">
                        {allExercises.length}
                      </span>
                    </button>
                  </div>

                  {/* Filters Bar tailored to the active tab */}
                  {exerciseSourceTab === 'bosses' ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Cerca per brano, artista, anime (es. Nirvana, Megadeth, Dragon Ball)..."
                          value={exerciseModalSearch}
                          onChange={(e) => setExerciseModalSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 outline-none focus:border-purple-600"
                        />
                      </div>

                      {/* Dropdown 1: Boss Canonici vs Boss Fandom */}
                      <select
                        value={selectedBossCategoryFilter}
                        onChange={(e) => setSelectedBossCategoryFilter(e.target.value as any)}
                        className="bg-[#09090b] border border-purple-900/60 text-xs font-mono text-purple-300 font-bold px-3 py-1.5 rounded-lg outline-none focus:border-purple-500"
                      >
                        <option value="all">Tutti i Boss ({allBossExercises.length})</option>
                        <option value="official">⚔️ Boss Canonici ({officialBossCount})</option>
                        <option value="fandom">🎮 Boss Fandom ({fandomBossCount})</option>
                      </select>

                      {/* Dropdown 2: Rank */}
                      <select
                        value={selectedRankFilter}
                        onChange={(e) => setSelectedRankFilter(e.target.value)}
                        className="bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-300 px-3 py-1.5 rounded-lg outline-none focus:border-purple-500"
                      >
                        <option value="all">Tutti i Rank</option>
                        <option value="E-Rank">E-Rank</option>
                        <option value="D-Rank">D-Rank</option>
                        <option value="C-Rank">C-Rank</option>
                        <option value="B-Rank">B-Rank</option>
                        <option value="A-Rank">A-Rank</option>
                        <option value="S-Rank">S-Rank</option>
                      </select>
                    </div>
                  ) : exerciseSourceTab === 'technique' ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Cerca per tecnica (es. alternate picking, sweep, legato)..."
                          value={exerciseModalSearch}
                          onChange={(e) => setExerciseModalSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 outline-none focus:border-red-600"
                        />
                      </div>

                      <select
                        value={selectedRankFilter}
                        onChange={(e) => setSelectedRankFilter(e.target.value)}
                        className="bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-300 px-3 py-1.5 rounded-lg outline-none"
                      >
                        <option value="all">Tutti i Rank</option>
                        <option value="E-Rank">E-Rank</option>
                        <option value="D-Rank">D-Rank</option>
                        <option value="C-Rank">C-Rank</option>
                        <option value="B-Rank">B-Rank</option>
                        <option value="A-Rank">A-Rank</option>
                        <option value="S-Rank">S-Rank</option>
                      </select>

                      <select
                        value={selectedCategoryFilter}
                        onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                        className="bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-300 px-3 py-1.5 rounded-lg outline-none"
                      >
                        <option value="all">Tutte le Tecniche</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Cerca per brano, tecnica o artista..."
                          value={exerciseModalSearch}
                          onChange={(e) => setExerciseModalSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 outline-none focus:border-red-600"
                        />
                      </div>

                      <select
                        value={selectedBossCategoryFilter}
                        onChange={(e) => setSelectedBossCategoryFilter(e.target.value as any)}
                        className="bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-300 px-3 py-1.5 rounded-lg outline-none"
                      >
                        <option value="all">Tutti i Tipi</option>
                        <option value="official">⚔️ Solo Boss Canonici</option>
                        <option value="fandom">🎮 Solo Boss Fandom</option>
                      </select>

                      <select
                        value={selectedRankFilter}
                        onChange={(e) => setSelectedRankFilter(e.target.value)}
                        className="bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-300 px-3 py-1.5 rounded-lg outline-none"
                      >
                        <option value="all">Tutti i Rank</option>
                        <option value="E-Rank">E-Rank</option>
                        <option value="D-Rank">D-Rank</option>
                        <option value="C-Rank">C-Rank</option>
                        <option value="B-Rank">B-Rank</option>
                        <option value="A-Rank">A-Rank</option>
                        <option value="S-Rank">S-Rank</option>
                      </select>
                    </div>
                  )}

                  {/* Exercise Pick List */}
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {modalFilteredExercises.length === 0 ? (
                      <div className="py-12 text-center text-zinc-500 font-mono text-xs">
                        Nessun elemento trovato con i filtri correnti.
                      </div>
                    ) : (
                      modalFilteredExercises.map((ex) => {
                        const isSelected = selectedExerciseIds.includes(ex.id);

                        return (
                          <div
                            key={ex.id}
                            onClick={() => handleToggleExerciseSelection(ex.id)}
                            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                              isSelected
                                ? ex.isBoss
                                  ? 'bg-purple-950/30 border-purple-600/80 ring-1 ring-purple-600/40'
                                  : 'bg-red-950/30 border-red-600/70 ring-1 ring-red-600/30'
                                : 'bg-[#09090b] border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <div className="space-y-1 min-w-0 flex-1 pr-3">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold border ${getRankBadgeStyle(ex.difficultyRank)}`}>
                                  {ex.difficultyRank}
                                </span>
                                <span className="text-xs font-mono font-bold text-zinc-200 truncate">
                                  {ex.title}
                                </span>
                                {ex.isBoss && (
                                  <>
                                    <span
                                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold flex items-center gap-1 border ${
                                        ex.bossFightData?.category === 'fandom'
                                          ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                                          : 'bg-red-950/80 text-red-300 border-red-700'
                                      }`}
                                    >
                                      <Swords className="w-2.5 h-2.5" />
                                      {ex.bossFightData?.category === 'fandom'
                                        ? ex.bossFightData?.fandomUniverse
                                          ? `FANDOM • ${ex.bossFightData.fandomUniverse}`
                                          : 'FANDOM BOSS'
                                        : 'BOSS CANONICO'}
                                    </span>
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold">
                                      {ex.bossFightData?.type === 'full_song' ? 'CANZONE INTERA' : 'ASSOLO'}
                                    </span>
                                  </>
                                )}
                                {ex.isCustom && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-950/80 text-red-300 border border-red-800/80 font-bold">
                                    IMPORTATO
                                  </span>
                                )}
                                {(ex.youtubeId || ex.videoUrl) && (
                                  <span className="flex items-center gap-0.5 text-[10px] font-mono text-red-400">
                                    <Video className="w-3 h-3" />
                                    <span>Video</span>
                                  </span>
                                )}
                                {(ex.tabFileName || ex.tabFileData || ex.tabText) && (
                                  <span className="flex items-center gap-0.5 text-[10px] font-mono text-zinc-400">
                                    <FileText className="w-3 h-3" />
                                    <span>Tab</span>
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-mono text-zinc-400">
                                {ex.isBoss && ex.bossFightData ? (
                                  <span>
                                    Artista: <strong className="text-zinc-200">{ex.bossFightData.artist}</strong> • Target: {ex.targetBpm} BPM • +{ex.bossFightData.xpReward} XP
                                  </span>
                                ) : (
                                  <span>
                                    {ex.category} • Target: {ex.targetBpm} BPM
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {ex.isCustom && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCustomExercise(ex.id);
                                  }}
                                  className="p-1.5 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-zinc-800 transition-colors"
                                  title="Elimina esercizio importato dal database"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}

                              <div
                                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-bold font-mono text-xs transition-colors ${
                                  isSelected
                                    ? ex.isBoss
                                      ? 'bg-purple-600 text-white'
                                      : 'bg-red-600 text-white'
                                    : 'bg-zinc-850 hover:bg-zinc-800 text-zinc-400 border border-zinc-700'
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">SELEZIONATO</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">AGGIUNGI</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#09090b] border-t border-zinc-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsCreatingRoutine(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs font-bold"
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  disabled={!newRoutineName.trim() || selectedExerciseIds.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:pointer-events-none text-white font-mono text-xs font-bold shadow-lg shadow-red-950/50 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  SALVA SCHEDA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: IMPORT CUSTOM EXERCISE */}
      <ImportExerciseModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSaveExercise={handleSaveImportedExercise}
        initialRank={selectedRankFilter !== 'all' ? (selectedRankFilter as any) : undefined}
        initialCategory={selectedCategoryFilter !== 'all' ? selectedCategoryFilter : undefined}
      />

      {/* MODAL: ROUTINE PREVIEW & IN-PREVIEW EDITOR */}
      <RoutinePreviewModal
        isOpen={Boolean(selectedPreviewRoutine)}
        onClose={() => setSelectedPreviewRoutine(null)}
        routine={selectedPreviewRoutine}
        hunterProfile={hunterProfile}
        onSaveRoutine={handleSavePreviewRoutine}
        onStartWorkout={(r) => {
          setSelectedPreviewRoutine(null);
          onStartWorkout(r);
        }}
      />

      {/* MODAL: FORGE COACH IA */}
      <ForgeCoachModal
        isOpen={isForgeCoachOpen}
        onClose={() => setIsForgeCoachOpen(false)}
        apiSettings={apiSettings || { baseUrl: 'https://openrouter.ai', model: '', apiKey: '' }}
        hunterProfile={hunterProfile}
        onOpenSettings={onOpenSettings || (() => {})}
        onRoutineCreated={handleCoachRoutineCreated}
      />
    </div>
  );
};
