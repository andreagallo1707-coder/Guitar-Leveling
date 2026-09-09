import React, { useState } from 'react';
import {
  WorkoutRoutine,
  TechniqueExercise,
  HunterProfile,
  DifficultyRank,
  TechniqueCategory
} from '../types';
import { exercisesData } from '../data/exercisesData';
import { loadCustomExercises, saveCustomExercises, loadHunterProfile } from '../utils/storage';
import { getAllBossFights, bossToWorkoutExercise } from '../utils/bossWorkoutAdapter';
import { ImportExerciseModal } from './ImportExerciseModal';
import {
  X,
  Play,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Plus,
  RefreshCw,
  Trash2,
  Video,
  FileText,
  Clock,
  Dumbbell,
  Check,
  Search,
  ExternalLink,
  Edit2,
  Save,
  Sparkles,
  Layers,
  CheckCircle2,
  Swords,
  Zap
} from 'lucide-react';

interface RoutinePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine: WorkoutRoutine | null;
  onSaveRoutine: (updatedRoutine: WorkoutRoutine) => void;
  onStartWorkout: (routine: WorkoutRoutine) => void;
  hunterProfile?: HunterProfile;
}

export const RoutinePreviewModal: React.FC<RoutinePreviewModalProps> = ({
  isOpen,
  onClose,
  routine,
  onSaveRoutine,
  onStartWorkout,
  hunterProfile
}) => {
  if (!isOpen || !routine) return null;

  // Local state for editing routine in preview
  const [name, setName] = useState<string>(routine.name);
  const [description, setDescription] = useState<string>(routine.description);
  const [isEditingHeader, setIsEditingHeader] = useState<boolean>(false);
  const [exerciseIds, setExerciseIds] = useState<string[]>(routine.exerciseIds);
  const [customExercises, setCustomExercises] = useState<TechniqueExercise[]>(() =>
    loadCustomExercises()
  );

  // Active 3-dots kebab menu index
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  // Selector modal states (either replacing an existing exercise or adding new from catalog)
  const [isExerciseSelectorOpen, setIsExerciseSelectorOpen] = useState<boolean>(false);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [selectorSearch, setSelectorSearch] = useState<string>('');
  const [selectorCategory, setSelectorCategory] = useState<string>('all');
  const [selectorRank, setSelectorRank] = useState<string>('all');
  const [pickerSourceTab, setPickerSourceTab] = useState<'technique' | 'bosses' | 'all'>('technique');
  const [pickerBossCategory, setPickerBossCategory] = useState<'all' | 'official' | 'fandom'>('all');

  // Custom exercise modal state
  const [isCustomExerciseModalOpen, setIsCustomExerciseModalOpen] = useState<boolean>(false);

  // Video and Tab preview states
  const [previewVideo, setPreviewVideo] = useState<{ title: string; youtubeId?: string; videoUrl?: string } | null>(null);
  const [previewTab, setPreviewTab] = useState<{
    title: string;
    fileName?: string;
    fileData?: string;
    fileType?: string;
    text?: string;
  } | null>(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Combined pool of all available exercises including Boss Fights
  const allBossExercises = React.useMemo(() => {
    const profile = hunterProfile || loadHunterProfile();
    const bosses = getAllBossFights(profile);
    return bosses.map((b) => bossToWorkoutExercise(b, profile.customBossVideos));
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

  const techniqueCount = exercisesData.length + customExercises.length;

  const rankSortWeight: Record<string, number> = {
    'E-Rank': 1,
    'D-Rank': 2,
    'C-Rank': 3,
    'B-Rank': 4,
    'A-Rank': 5,
    'S-Rank': 6,
  };

  // Resolve current exercises in routine
  const currentExercises = exerciseIds
    .map((id) => allExercises.find((e) => e.id === id))
    .filter(Boolean) as TechniqueExercise[];

  const estimatedMinutes = Math.max(10, exerciseIds.length * 6);

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

  // Reorder exercise up
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...exerciseIds];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setExerciseIds(next);
    setHasUnsavedChanges(true);
    setActiveMenuIndex(null);
  };

  // Reorder exercise down
  const handleMoveDown = (index: number) => {
    if (index >= exerciseIds.length - 1) return;
    const next = [...exerciseIds];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setExerciseIds(next);
    setHasUnsavedChanges(true);
    setActiveMenuIndex(null);
  };

  // Delete exercise from routine
  const handleDeleteExercise = (index: number) => {
    const next = exerciseIds.filter((_, i) => i !== index);
    setExerciseIds(next);
    setHasUnsavedChanges(true);
    setActiveMenuIndex(null);
  };

  // Replace exercise trigger
  const handleTriggerReplace = (index: number) => {
    setReplacingIndex(index);
    setActiveMenuIndex(null);
    setIsExerciseSelectorOpen(true);
  };

  // Add exercise from catalog trigger
  const handleTriggerAddFromCatalog = () => {
    setReplacingIndex(null);
    setIsExerciseSelectorOpen(true);
  };

  // Select an exercise from picker (either replace or append)
  const handleSelectExerciseFromPicker = (selectedExId: string) => {
    if (replacingIndex !== null) {
      // Replace at index
      const next = [...exerciseIds];
      next[replacingIndex] = selectedExId;
      setExerciseIds(next);
      setReplacingIndex(null);
    } else {
      // Append to routine
      setExerciseIds((prev) => [...prev, selectedExId]);
    }
    setHasUnsavedChanges(true);
    setIsExerciseSelectorOpen(false);
  };

  // Save new custom exercise and append to routine
  const handleSaveCustomExercise = (newEx: TechniqueExercise) => {
    const updatedCustom = [newEx, ...customExercises];
    setCustomExercises(updatedCustom);
    saveCustomExercises(updatedCustom);

    // Append to this routine
    setExerciseIds((prev) => [...prev, newEx.id]);
    setHasUnsavedChanges(true);
    setIsCustomExerciseModalOpen(false);
  };

  // Save changes to routine
  const handleSaveChanges = () => {
    const updated: WorkoutRoutine = {
      ...routine,
      name: name.trim() || routine.name,
      description: description.trim() || routine.description,
      exerciseIds,
      estimatedMinutes
    };
    onSaveRoutine(updated);
    setHasUnsavedChanges(false);
  };

  // Start workout directly
  const handleStartNow = () => {
    // If there were modifications, persist them first
    if (hasUnsavedChanges) {
      const updated: WorkoutRoutine = {
        ...routine,
        name: name.trim() || routine.name,
        description: description.trim() || routine.description,
        exerciseIds,
        estimatedMinutes
      };
      onSaveRoutine(updated);
      onStartWorkout(updated);
    } else {
      onStartWorkout(routine);
    }
    onClose();
  };

  // Filtered exercises for selector modal
  const filteredPickerExercises = React.useMemo(() => {
    return allExercises
      .filter((ex) => {
        if (pickerSourceTab === 'technique' && ex.isBoss) return false;
        if (pickerSourceTab === 'bosses' && !ex.isBoss) return false;

        if (ex.isBoss && pickerBossCategory !== 'all') {
          const isFandom = ex.bossFightData?.category === 'fandom';
          if (pickerBossCategory === 'official' && isFandom) return false;
          if (pickerBossCategory === 'fandom' && !isFandom) return false;
        }

        if (!ex.isBoss && selectorCategory !== 'all' && ex.category !== selectorCategory) {
          return false;
        }

        if (selectorRank !== 'all' && ex.difficultyRank !== selectorRank) {
          return false;
        }

        if (selectorSearch.trim()) {
          const q = selectorSearch.toLowerCase();
          const matchTitle = ex.title.toLowerCase().includes(q);
          const matchCat = ex.category.toLowerCase().includes(q);
          const matchArtist = ex.bossFightData?.artist?.toLowerCase().includes(q);
          const matchFandom = ex.bossFightData?.fandomUniverse?.toLowerCase().includes(q);
          if (!matchTitle && !matchCat && !matchArtist && !matchFandom) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (pickerSourceTab === 'bosses' || (a.isBoss && b.isBoss)) {
          const wA = rankSortWeight[a.difficultyRank] || 0;
          const wB = rankSortWeight[b.difficultyRank] || 0;
          if (wA !== wB) return wA - wB;
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [
    allExercises,
    pickerSourceTab,
    pickerBossCategory,
    selectorCategory,
    selectorRank,
    selectorSearch,
  ]);

  const categories = Array.from(new Set(allExercises.map((e) => e.category)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative flex flex-col w-full max-w-4xl h-[92vh] max-h-[860px] bg-[#0c0c0e] border border-red-600/30 rounded-2xl shadow-2xl shadow-red-950/40 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-800/80 bg-[#121215]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#09090b] text-red-400 font-bold border border-red-900/40">
                  {routine.isPreset ? 'SCHEDA UFFICIALE' : 'SCHEDA PERSONALIZZATA'}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${getRankBadgeStyle(
                    routine.targetRank
                  )}`}
                >
                  {routine.targetRank}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" /> ~{estimatedMinutes} min
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-zinc-500" /> {exerciseIds.length} esercizi
                </span>
                {hasUnsavedChanges && (
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/50 border border-amber-500/50 px-2 py-0.5 rounded animate-pulse">
                    MODIFICHE NON SALVATE
                  </span>
                )}
              </div>

              {isEditingHeader ? (
                <div className="space-y-2 mt-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Nome della scheda"
                    className="w-full px-3 py-1.5 text-base font-bold bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    rows={2}
                    placeholder="Descrizione della scheda"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-red-500"
                  />
                  <button
                    onClick={() => setIsEditingHeader(false)}
                    className="px-3 py-1 text-xs font-semibold rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                  >
                    Fine Modifica Testi
                  </button>
                </div>
              ) : (
                <div className="group relative">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-wide truncate">
                      {name}
                    </h2>
                    <button
                      onClick={() => setIsEditingHeader(true)}
                      className="p-1 text-zinc-500 hover:text-zinc-200 transition-colors"
                      title="Modifica nome e descrizione"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">
                    {description}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {hasUnsavedChanges && (
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salva</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Exercises List / Editor Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 bg-[#0c0c0e]">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <span className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
              Sequenza Esercizi ({exerciseIds.length})
            </span>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              Usa le frecce per riordinare o il menu con i 3 pallini per sostituire/eliminare
            </span>
          </div>

          {currentExercises.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              Nessun esercizio presente nella scheda. Aggiungine uno qui sotto!
            </div>
          ) : (
            <div className="space-y-2.5">
              {currentExercises.map((exercise, index) => (
                <div
                  key={`${exercise.id}-${index}`}
                  className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-[#111115] border border-zinc-800/80 hover:border-zinc-700 transition-all text-xs"
                >
                  {/* Left: Index, Reorder arrows, Exercise Details */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 pr-3">
                    {/* Reorder arrows */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        disabled={index === 0}
                        onClick={() => handleMoveUp(index)}
                        className="p-1 rounded text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                        title="Sposta in alto"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={index === currentExercises.length - 1}
                        onClick={() => handleMoveDown(index)}
                        className="p-1 rounded text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                        title="Sposta in basso"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-mono font-bold text-red-500 w-5 shrink-0 text-right">
                      #{index + 1}
                    </span>

                    {/* Exercise Rank */}
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${getRankBadgeStyle(
                        exercise.difficultyRank
                      )}`}
                    >
                      {exercise.difficultyRank}
                    </span>

                    {/* Title and Category */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-100 text-sm truncate">
                          {exercise.title}
                        </span>
                        {exercise.isBoss && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800/80 font-bold shrink-0 flex items-center gap-1">
                            <Swords className="w-2.5 h-2.5 text-purple-400" />
                            {exercise.bossFightData?.category === 'fandom' ? 'FANDOM BOSS' : 'BOSS FIGHT'}
                          </span>
                        )}
                        {exercise.isCustom && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-950/70 text-red-300 border border-red-800/70 font-bold shrink-0">
                            IMPORTATO
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-zinc-400">
                        <span className="text-zinc-500">{exercise.category}</span>
                        <span>•</span>
                        <span>Target: <strong className="text-zinc-300">{exercise.targetBpm} BPM</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Video/Tab Quick View & 3-dots Menu */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Video Preview Button */}
                    {(exercise.youtubeId || exercise.videoUrl) && (
                      <button
                        onClick={() =>
                          setPreviewVideo({
                            title: exercise.title,
                            youtubeId: exercise.youtubeId,
                            videoUrl: exercise.videoUrl
                          })
                        }
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 transition-colors"
                        title="Guarda video esercizio"
                      >
                        <Video className="w-3 h-3 text-red-400" />
                        <span className="hidden sm:inline font-mono text-[10px]">Video</span>
                      </button>
                    )}

                    {/* Songsterr Link for Boss Fights */}
                    {exercise.isBoss && (
                      <a
                        href={
                          exercise.bossFightData?.songsterrUrl ||
                          `https://www.songsterr.com/a/wa/search?pattern=${encodeURIComponent(
                            exercise.bossFightData?.title || exercise.title
                          )}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 transition-colors"
                        title="Apri tablatura Songsterr"
                      >
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                        <span className="hidden sm:inline font-mono text-[10px]">Songsterr</span>
                      </a>
                    )}

                    {/* Tab Preview Button for regular technique exercises */}
                    {!exercise.isBoss &&
                      (exercise.tabFileName ||
                        exercise.tabFileData ||
                        exercise.tabText ||
                        (exercise.measures && exercise.measures.length > 0)) && (
                      <button
                        onClick={() =>
                          setPreviewTab({
                            title: exercise.title,
                            fileName: exercise.tabFileName,
                            fileData: exercise.tabFileData,
                            fileType: exercise.tabFileType,
                            text: exercise.tabText
                          })
                        }
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 transition-colors"
                        title="Visualizza tablatura"
                      >
                        <FileText className="w-3 h-3 text-amber-400" />
                        <span className="hidden sm:inline font-mono text-[10px]">Tab</span>
                      </button>
                    )}

                    {/* 3-Dots Kebab Menu */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveMenuIndex(activeMenuIndex === index ? null : index)
                        }
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Opzioni esercizio"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuIndex === index && (
                        <div className="absolute right-0 top-8 z-40 w-48 bg-[#18181c] border border-zinc-700 rounded-xl shadow-2xl p-1 animate-fade-in text-xs">
                          <button
                            onClick={() => handleTriggerReplace(index)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-zinc-200 hover:bg-zinc-800 rounded-lg text-left transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                            <span>Sostituisci esercizio</span>
                          </button>

                          <button
                            disabled={index === 0}
                            onClick={() => handleMoveUp(index)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-zinc-200 hover:bg-zinc-800 rounded-lg text-left transition-colors disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Sposta in alto</span>
                          </button>

                          <button
                            disabled={index === currentExercises.length - 1}
                            onClick={() => handleMoveDown(index)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-zinc-200 hover:bg-zinc-800 rounded-lg text-left transition-colors disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Sposta in basso</span>
                          </button>

                          <div className="my-1 border-t border-zinc-800" />

                          <button
                            onClick={() => handleDeleteExercise(index)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-950/40 rounded-lg text-left transition-colors font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            <span>Elimina dalla scheda</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Exercise Actions at Bottom */}
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleTriggerAddFromCatalog}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-700 hover:border-red-500/80 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all text-xs font-semibold"
            >
              <Plus className="w-4 h-4 text-red-400" />
              <span>+ Aggiungi Esercizio dal Catalogo</span>
            </button>

            <button
              onClick={() => setIsCustomExerciseModalOpen(true)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-700 hover:border-amber-500/80 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all text-xs font-semibold"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>+ Crea & Aggiungi Esercizio Personale</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#121215] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs font-bold transition-all"
            >
              Chiudi
            </button>

            {hasUnsavedChanges && (
              <button
                onClick={handleSaveChanges}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Salva Modifiche</span>
              </button>
            )}
          </div>

          <button
            onClick={handleStartNow}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono text-xs font-black uppercase tracking-wider shadow-lg shadow-red-950/60 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>AVVIA ALLENAMENTO</span>
          </button>
        </div>
      </div>

      {/* Submodal: Exercise Selector (Replace or Add from Catalog) */}
      {isExerciseSelectorOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl h-[85vh] bg-[#121216] border border-zinc-700 rounded-2xl shadow-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-white font-serif">
                  {replacingIndex !== null
                    ? `Sostituisci Esercizio #${replacingIndex + 1}`
                    : 'Aggiungi Esercizio alla Scheda'}
                </h3>
                <p className="text-xs text-zinc-400">
                  Cerca tra tutti gli esercizi del catalogo e personalizzati
                </p>
              </div>
              <button
                onClick={() => setIsExerciseSelectorOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs & Filters */}
            <div className="py-3 space-y-2.5 border-b border-zinc-800">
              {/* Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setPickerSourceTab('technique');
                    setSelectorRank('all');
                    setSelectorCategory('all');
                  }}
                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    pickerSourceTab === 'technique'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>TECNICA ({techniqueCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPickerSourceTab('bosses');
                    setSelectorRank('all');
                    setPickerBossCategory('all');
                  }}
                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    pickerSourceTab === 'bosses'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>BOSS ({allBossExercises.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPickerSourceTab('all');
                    setSelectorRank('all');
                  }}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    pickerSourceTab === 'all'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>TUTTI</span>
                </button>
              </div>

              {/* Search & Select dropdowns */}
              {pickerSourceTab === 'bosses' ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cerca per brano, artista, anime..."
                      value={selectorSearch}
                      onChange={(e) => setSelectorSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-purple-900/60 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <select
                    value={pickerBossCategory}
                    onChange={(e) => setPickerBossCategory(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-zinc-900 border border-purple-900/60 rounded-lg text-xs text-purple-300 font-bold focus:outline-none"
                  >
                    <option value="all">Tutti i Boss ({allBossExercises.length})</option>
                    <option value="official">⚔️ Boss Canonici ({officialBossCount})</option>
                    <option value="fandom">🎮 Boss Fandom ({fandomBossCount})</option>
                  </select>

                  <select
                    value={selectorRank}
                    onChange={(e) => setSelectorRank(e.target.value)}
                    className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 focus:outline-none"
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
              ) : pickerSourceTab === 'technique' ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cerca per tecnica o titolo..."
                      value={selectorSearch}
                      onChange={(e) => setSelectorSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-red-500 outline-none"
                    />
                  </div>

                  <select
                    value={selectorRank}
                    onChange={(e) => setSelectorRank(e.target.value)}
                    className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 focus:outline-none"
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
                    value={selectorCategory}
                    onChange={(e) => setSelectorCategory(e.target.value)}
                    className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 focus:outline-none"
                  >
                    <option value="all">Tutte le Categorie</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
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
                      placeholder="Cerca per titolo, brano o categoria..."
                      value={selectorSearch}
                      onChange={(e) => setSelectorSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-red-500 outline-none"
                    />
                  </div>

                  <select
                    value={pickerBossCategory}
                    onChange={(e) => setPickerBossCategory(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 focus:outline-none"
                  >
                    <option value="all">Tutti i Tipi</option>
                    <option value="official">Solo Boss Canonici</option>
                    <option value="fandom">Solo Boss Fandom</option>
                  </select>

                  <select
                    value={selectorRank}
                    onChange={(e) => setSelectorRank(e.target.value)}
                    className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 focus:outline-none"
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
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-2 space-y-1.5">
              {filteredPickerExercises.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-xs">
                  Nessun esercizio trovato per questi filtri.
                </div>
              ) : (
                filteredPickerExercises.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => handleSelectExerciseFromPicker(ex.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all text-xs ${
                      ex.isBoss
                        ? 'bg-zinc-900/80 hover:bg-purple-950/30 border-zinc-800 hover:border-purple-500/60'
                        : 'bg-zinc-900/70 hover:bg-zinc-800 border-zinc-800 hover:border-red-500/50'
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${getRankBadgeStyle(
                            ex.difficultyRank
                          )}`}
                        >
                          {ex.difficultyRank}
                        </span>
                        <span className="font-semibold text-zinc-200 truncate">
                          {ex.title}
                        </span>
                        {ex.isBoss && (
                          <>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-bold flex items-center gap-0.5 ${
                                ex.bossFightData?.category === 'fandom'
                                  ? 'bg-purple-950 text-purple-300 border-purple-700'
                                  : 'bg-red-950 text-red-300 border-red-700'
                              }`}
                            >
                              <Swords className="w-2.5 h-2.5" />
                              {ex.bossFightData?.category === 'fandom' ? 'FANDOM' : 'BOSS'}
                            </span>
                            <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                              {ex.bossFightData?.type === 'full_song' ? 'CANZONE' : 'ASSOLO'}
                            </span>
                          </>
                        )}
                        {ex.isCustom && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-red-950 text-red-300 border border-red-800">
                            Mio
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        {ex.isBoss && ex.bossFightData ? (
                          <span>
                            Artista: {ex.bossFightData.artist} • Target {ex.targetBpm} BPM • +{ex.bossFightData.xpReward} XP
                          </span>
                        ) : (
                          <span>
                            {ex.category} • Target {ex.targetBpm} BPM
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className={`px-2.5 py-1 rounded font-bold text-[10px] shrink-0 border ${
                        ex.isBoss
                          ? 'bg-purple-950/70 hover:bg-purple-900 border-purple-500/50 text-purple-200'
                          : 'bg-red-950/60 hover:bg-red-900 border-red-500/40 text-red-300'
                      }`}
                    >
                      Scegli
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submodal: Video Player Preview */}
      {previewVideo && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#121216] border border-zinc-700 rounded-2xl shadow-2xl p-4 overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-bold text-white truncate font-serif">
                  {previewVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewVideo(null)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800">
              {previewVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${previewVideo.youtubeId}?autoplay=1&rel=0`}
                  title={previewVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : previewVideo.videoUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-sm text-zinc-300 mb-3">
                    Video esterno collegato all'esercizio:
                  </p>
                  <a
                    href={previewVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apri Video ({previewVideo.videoUrl})
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Submodal: Tab Preview */}
      {previewTab && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#121216] border border-zinc-700 rounded-2xl shadow-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white truncate font-serif">
                  Tablatura: {previewTab.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewTab(null)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {previewTab.fileType === 'image' && previewTab.fileData ? (
                <img
                  src={previewTab.fileData}
                  alt={previewTab.title}
                  className="max-w-full rounded-lg border border-zinc-800 mx-auto"
                />
              ) : previewTab.fileType === 'pdf' && previewTab.fileData ? (
                <div className="text-center py-6">
                  <p className="text-xs text-zinc-300 mb-3">
                    Documento PDF collegato: {previewTab.fileName}
                  </p>
                  <a
                    href={previewTab.fileData}
                    download={previewTab.fileName || 'tablatura.pdf'}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                  >
                    Scarica / Apri PDF
                  </a>
                </div>
              ) : previewTab.text ? (
                <pre className="p-4 bg-black/80 border border-zinc-800 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre">
                  {previewTab.text}
                </pre>
              ) : (
                <div className="text-center py-8 text-xs text-zinc-500">
                  Nessuna anteprima testuale o file salvato per questo esercizio.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submodal: Import / Add Personal Exercise */}
      {isCustomExerciseModalOpen && (
        <ImportExerciseModal
          isOpen={isCustomExerciseModalOpen}
          onClose={() => setIsCustomExerciseModalOpen(false)}
          onSaveExercise={handleSaveCustomExercise}
        />
      )}
    </div>
  );
};
