import React, { useState, useRef, useEffect } from 'react';
import {
  ApiSettings,
  HunterProfile,
  WorkoutRoutine,
  TechniqueExercise,
  DifficultyRank,
  TechniqueCategory
} from '../types';
import {
  askForgeRoutineCoachStream,
  parseForgeRoutineBlock,
  stripRoutineJsonBlock,
  isAiConfigured,
  ChatMessage,
  ParsedForgeRoutine
} from '../utils/aiCoachEngine';
import { soundEngine } from '../utils/audioEngine';
import { MarkdownRenderer } from './MarkdownRenderer';
import { exercisesData } from '../data/exercisesData';
import {
  loadCustomExercises,
  saveCustomExercises,
  extractYoutubeId,
  loadForgeChatMessages,
  saveForgeChatMessages,
  clearForgeChatMessages
} from '../utils/storage';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Plus,
  Video,
  FileText,
  CheckCircle2,
  ChevronRight,
  Dumbbell,
  Zap,
  StopCircle,
  Upload,
  AlertCircle,
  Settings,
  Trash2,
  Music,
  Check,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface ForgeCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiSettings: ApiSettings;
  hunterProfile: HunterProfile;
  onOpenSettings: () => void;
  onRoutineCreated: (newRoutine: WorkoutRoutine) => void;
}

const TECHNIQUE_CATEGORIES: TechniqueCategory[] = [
  'Warm-Up & Finger Independence',
  'Alternate Picking',
  'Scale & 3NPS',
  'Legato & Hammer/Pull',
  'Economy & Sweep Picking',
  'String Skipping',
  'Tapping',
  'Bending, Vibrato & Harmonics',
  'Modern Fusion & Hybrid Picking'
];

const DIFFICULTY_RANKS: DifficultyRank[] = [
  'E-Rank',
  'D-Rank',
  'C-Rank',
  'B-Rank',
  'A-Rank',
  'S-Rank'
];

const rankToLevel = (rank: DifficultyRank): number => {
  switch (rank) {
    case 'E-Rank': return 1;
    case 'D-Rank': return 2;
    case 'C-Rank': return 3;
    case 'B-Rank': return 4;
    case 'A-Rank': return 5;
    case 'S-Rank': return 6;
    default: return 3;
  }
};

const SUGGESTED_PROMPTS = [
  'Proponimi una routine di 25 min su Alternate Picking & Sincronizzazione',
  'Voglio una scheda ad alta intensità su Scale 3NPS & Legato',
  'Crea una routine di Sweep Picking & Arpeggi per il mio livello',
  'Voglio inserire un mio esercizio personale e collegarlo ad altri licks'
];

interface AttachedCustomExercise {
  id: string;
  title: string;
  category: TechniqueCategory;
  difficultyRank: DifficultyRank;
  targetBpm: number;
  videoUrl?: string;
  tabFileName?: string;
  tabFileData?: string;
  tabFileType?: 'image' | 'pdf' | 'text' | 'file';
  tabText?: string;
}

/**
 * Visual, elegant proposal card for The Forge routine proposals.
 * Completely replaces raw JSON strings with a high-contrast, tactile UI card.
 */
const RoutineProposalCard: React.FC<{
  routine: ParsedForgeRoutine;
  onApply: () => void;
}> = ({ routine, onApply }) => {
  const hasCustomExercise = routine.exercises.some((e) => e.isCustom);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#16161c] to-[#0f0f13] border-2 border-red-500/60 shadow-2xl shadow-red-950/40 animate-fade-in transition-all my-2">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-red-900/60 border border-red-500/70 text-red-200 flex items-center gap-1">
              <Dumbbell className="w-3 h-3 text-red-400" />
              Proposta Scheda
            </span>
            <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
              {routine.targetRank}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold text-zinc-300 bg-zinc-900 rounded border border-zinc-800">
              ~{routine.estimatedMinutes} min
            </span>

            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-zinc-900 border border-zinc-750 text-zinc-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-red-400" />
              Catalogo Ufficiale (67 Licks)
            </span>

            {hasCustomExercise && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-950/70 border border-red-500/50 text-red-300">
                + Esercizio Personale
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-black text-white mt-1.5 font-serif tracking-wide">
            {routine.routineName}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-2xl">
            {routine.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onApply}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-black tracking-wider uppercase rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>Applica e Salva in The Forge</span>
        </button>
      </div>

      {/* Exercises list */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Esercizi inclusi ({routine.exercises.length}):
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {routine.exercises.map((ex, exIdx) => (
            <div
              key={exIdx}
              className="flex items-start justify-between p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 text-xs hover:border-zinc-700 transition-colors"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono font-bold text-red-400">
                    #{exIdx + 1}
                  </span>
                  <span className="font-semibold text-zinc-200">
                    {ex.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500 flex-wrap">
                  <span className="text-zinc-400">{ex.category}</span>
                  {ex.targetBpm && (
                    <span className="text-zinc-400 font-mono">• {ex.targetBpm} BPM</span>
                  )}
                  {ex.isCustom && (
                    <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] font-bold">
                      Personale
                    </span>
                  )}
                </div>
                {ex.notes && (
                  <p className="text-[10px] text-zinc-500 italic mt-0.5 line-clamp-1">
                    "{ex.notes}"
                  </p>
                )}
              </div>

              {ex.difficultyRank && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-zinc-900 border border-zinc-700 text-zinc-300 shrink-0">
                  {ex.difficultyRank}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ForgeCoachModal: React.FC<ForgeCoachModalProps> = ({
  isOpen,
  onClose,
  apiSettings,
  hunterProfile,
  onOpenSettings,
  onRoutineCreated
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = loadForgeChatMessages<ChatMessage>();
    if (saved && saved.length > 0) return saved;
    return [
      {
        role: 'assistant',
        content: `🎸 Ciao **${hunterProfile.name}**! Sono il tuo **Architect & Coach di The Forge**.\n\nTi aiuto a progettare e costruire la tua **scheda di allenamento ideale** su misura, selezionando esclusivamente tra i **67 esercizi ufficiali del catalogo** di Guitar Leveling (oppure integrando i tuoi esercizi personali allegati).\n\nDimmi su quale tecnica o obiettivo vuoi concentrarti oggi!`
      }
    ];
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Attached custom exercises in this session
  const [attachedExercises, setAttachedExercises] = useState<AttachedCustomExercise[]>([]);
  const [showAttachModal, setShowAttachModal] = useState<boolean>(false);

  // Attach modal form states
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<TechniqueCategory>('Alternate Picking');
  const [customRank, setCustomRank] = useState<DifficultyRank>('C-Rank');
  const [customBpm, setCustomBpm] = useState<number>(110);
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [customTabFileName, setCustomTabFileName] = useState<string>('');
  const [customTabFileData, setCustomTabFileData] = useState<string>('');
  const [customTabFileType, setCustomTabFileType] = useState<'image' | 'pdf' | 'text' | 'file' | undefined>(undefined);
  const [customTabText, setCustomTabText] = useState<string>('');
  const [customAttachError, setCustomAttachError] = useState<string | null>(null);

  // Parsed routine detected from last assistant message
  const [pendingRoutine, setPendingRoutine] = useState<ParsedForgeRoutine | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
    }
  }, [isOpen]);

  // Persist messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      saveForgeChatMessages(messages);
    }
  }, [messages]);

  // Whenever messages update, check if there is a forge-routine JSON in the last assistant message
  useEffect(() => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
    if (lastAssistant && lastAssistant.content) {
      const parsed = parseForgeRoutineBlock(lastAssistant.content);
      if (parsed) {
        setPendingRoutine(parsed);
      }
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleResetChat = () => {
    const initial: ChatMessage[] = [
      {
        role: 'assistant',
        content: `🎸 Ciao **${hunterProfile.name}**! Sono il tuo **Architect & Coach di The Forge**.\n\nTi aiuto a progettare e costruire la tua **scheda di allenamento ideale** su misura, selezionando esclusivamente tra i **67 esercizi ufficiali del catalogo** di Guitar Leveling (oppure integrando i tuoi esercizi personali allegati).\n\nDimmi su quale tecnica o obiettivo vuoi concentrarti oggi!`
      }
    ];
    setMessages(initial);
    clearForgeChatMessages();
    setPendingRoutine(null);
    soundEngine.playCardFlip();
  };

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsStreaming(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const initialAssistantMsg: ChatMessage = { role: 'assistant', content: '' };

    setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
    setInputValue('');
    setIsLoading(true);
    setIsStreaming(true);

    setTimeout(() => scrollToBottom('smooth'), 50);

    const abortCtrl = new AbortController();
    abortControllerRef.current = abortCtrl;

    try {
      await askForgeRoutineCoachStream(
        text,
        messages,
        apiSettings,
        (accumulatedText) => {
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
              next[lastIdx] = { ...next[lastIdx], content: accumulatedText };
            }
            return next;
          });
        },
        abortCtrl.signal
      );
      soundEngine.playSuccess();
    } catch (e: any) {
      if (e?.name !== 'AbortError') {
        setMessages((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (lastIdx >= 0 && next[lastIdx].role === 'assistant' && !next[lastIdx].content) {
            next[lastIdx] = {
              role: 'assistant',
              content: `⚠️ Errore di comunicazione con il Coach Forge: ${e?.message || 'verifica la connessione'}.`
            };
          }
          return next;
        });
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  // Trigger request to finalize routine
  const handleRequestFinalizeRoutine = () => {
    handleSendMessage('Ottimo, concordiamo su questo piano! Procedi con la creazione della scheda con il blocco JSON completo.');
  };

  // Handle file input for custom exercise attachment
  const handleProcessCustomFile = (file: File) => {
    setCustomAttachError(null);
    setCustomTabFileName(file.name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomTabFileData(reader.result as string);
        setCustomTabFileType('image');
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomTabFileData(reader.result as string);
        setCustomTabFileType('pdf');
      };
      reader.readAsDataURL(file);
    } else if (
      file.type.startsWith('text/') ||
      file.name.toLowerCase().endsWith('.txt') ||
      file.name.toLowerCase().endsWith('.tab')
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        setCustomTabText(text);
        setCustomTabFileData(text);
        setCustomTabFileType('text');
      };
      reader.readAsText(file);
    } else {
      setCustomTabFileData(file.name);
      setCustomTabFileType('file');
    }
  };

  // Confirm custom exercise attachment
  const handleConfirmAttachCustomExercise = () => {
    if (!customTitle.trim()) {
      setCustomAttachError('Inserisci un titolo per il tuo esercizio.');
      return;
    }

    const newAttached: AttachedCustomExercise = {
      id: `custom-forge-${Date.now()}`,
      title: customTitle.trim(),
      category: customCategory,
      difficultyRank: customRank,
      targetBpm: customBpm,
      videoUrl: customVideoUrl.trim() || undefined,
      tabFileName: customTabFileName.trim() || undefined,
      tabFileData: customTabFileData || undefined,
      tabFileType: customTabFileType,
      tabText: customTabText.trim() || undefined
    };

    setAttachedExercises((prev) => [...prev, newAttached]);
    setShowAttachModal(false);

    // Reset form
    setCustomTitle('');
    setCustomVideoUrl('');
    setCustomTabFileName('');
    setCustomTabFileData('');
    setCustomTabFileType(undefined);
    setCustomTabText('');
    setCustomAttachError(null);

    // Inject message into chat
    const details = [
      `Titolo: **"${newAttached.title}"**`,
      `Categoria: *${newAttached.category}*`,
      `Rank: ${newAttached.difficultyRank}`,
      newAttached.videoUrl ? `Video URL: ${newAttached.videoUrl}` : null,
      newAttached.tabFileName ? `File Tab: ${newAttached.tabFileName}` : null
    ].filter(Boolean).join(' | ');

    const promptText = `Vorrei inserire nella scheda questo mio esercizio personale: [${details}]. Come lo integriamo al meglio nella routine?`;
    handleSendMessage(promptText);
  };

  // Apply and save the routine into The Forge
  const handleApplyAndSaveRoutine = (routineOverride?: ParsedForgeRoutine) => {
    const routineToUse = routineOverride || pendingRoutine;
    if (!routineToUse) return;

    const allCustom = loadCustomExercises();
    const updatedCustom = [...allCustom];
    const finalExerciseIds: string[] = [];

    // Process each exercise from the parsed routine
    routineToUse.exercises.forEach((ex, idx) => {
      // 1. Check if it matches an attached custom exercise
      const matchedAttached = attachedExercises.find(
        (a) => a.title.toLowerCase().trim() === ex.title.toLowerCase().trim()
      );

      // 2. Check if it matches an existing catalog exercise
      let matchedCatalog = exercisesData.find(
        (c) =>
          (ex.existingId && c.id === ex.existingId) ||
          c.title.toLowerCase().trim() === ex.title.toLowerCase().trim()
      );

      // 3. Check if it matches an existing custom exercise in storage
      let matchedSavedCustom = updatedCustom.find(
        (c) =>
          (ex.existingId && c.id === ex.existingId) ||
          c.title.toLowerCase().trim() === ex.title.toLowerCase().trim()
      );

      if (matchedAttached) {
        // Create full custom exercise and save to storage
        const customEx: TechniqueExercise = {
          id: matchedAttached.id,
          title: matchedAttached.title,
          category: matchedAttached.category,
          level: rankToLevel(matchedAttached.difficultyRank),
          difficultyRank: matchedAttached.difficultyRank,
          defaultBpm: Math.max(50, matchedAttached.targetBpm - 30),
          targetBpm: matchedAttached.targetBpm,
          description: ex.notes || 'Esercizio personale integrato via Forge Coach IA.',
          focusMuscles: 'Precisione tecnica, articolazione e postura.',
          biomechanicalFocus: ex.notes || 'Integrazione tecnica e memoria muscolare.',
          videoUrl: matchedAttached.videoUrl,
          youtubeId: extractYoutubeId(matchedAttached.videoUrl || ''),
          tabFileName: matchedAttached.tabFileName,
          tabFileData: matchedAttached.tabFileData,
          tabFileType: matchedAttached.tabFileType,
          tabText: matchedAttached.tabText,
          tips: [ex.notes || 'Esegui a velocità controllata prima di aumentare il metronomo.'],
          measures: [],
          tuning: 'Standard E (E A D G B E)',
          xpReward: 35,
          isCustom: true
        };
        updatedCustom.push(customEx);
        finalExerciseIds.push(customEx.id);
      } else if (matchedCatalog) {
        finalExerciseIds.push(matchedCatalog.id);
      } else if (matchedSavedCustom) {
        finalExerciseIds.push(matchedSavedCustom.id);
      } else {
        // Fallback custom exercise if not in catalog
        const autoCustomId = `forge-custom-${Date.now()}-${idx}`;
        const autoCustomEx: TechniqueExercise = {
          id: autoCustomId,
          title: ex.title,
          category: (ex.category as TechniqueCategory) || 'Alternate Picking',
          level: rankToLevel(ex.difficultyRank || routineToUse.targetRank || 'C-Rank'),
          difficultyRank: ex.difficultyRank || routineToUse.targetRank || 'C-Rank',
          defaultBpm: Math.max(60, (ex.targetBpm || 100) - 30),
          targetBpm: ex.targetBpm || 100,
          description: ex.notes || 'Esercizio consigliato dal Coach Forge.',
          focusMuscles: 'Articolazione, tempo ed esecuzione pulita.',
          biomechanicalFocus: ex.notes || 'Sincronizzazione e fluidità motoria.',
          videoUrl: ex.videoUrl,
          youtubeId: extractYoutubeId(ex.videoUrl || ''),
          tips: [ex.notes || 'Aumenta solo quando ogni nota è scandita al 100%.'],
          measures: [],
          tuning: 'Standard E (E A D G B E)',
          xpReward: 30,
          isCustom: true
        };
        updatedCustom.push(autoCustomEx);
        finalExerciseIds.push(autoCustomEx.id);
      }
    });

    // Save any newly created custom exercises
    saveCustomExercises(updatedCustom);

    // Build the workout routine
    const newRoutine: WorkoutRoutine = {
      id: `forge-routine-${Date.now()}`,
      name: routineToUse.routineName || 'Nuova Scheda Coach IA',
      description: routineToUse.description || 'Scheda personalizzata creata con il Coach Forge.',
      isPreset: false,
      exerciseIds: finalExerciseIds,
      estimatedMinutes: routineToUse.estimatedMinutes || 25,
      targetRank: routineToUse.targetRank || 'C-Rank',
      createdAt: new Date().toISOString()
    };

    soundEngine.playSuccess();
    onRoutineCreated(newRoutine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative flex flex-col w-full max-w-4xl h-[92vh] max-h-[860px] bg-[#0c0c0e] border border-red-600/30 rounded-2xl shadow-2xl shadow-red-950/40 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-zinc-800/80 bg-[#121215]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 shadow-md shadow-red-950/50">
              <Dumbbell className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-white uppercase font-serif">
                  Coach IA • Creatore Schede Forge
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-red-900/40 border border-red-500/40 text-red-300">
                  Architect Mode
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Pianifica la tua routine ideale selezionando esclusivamente dai 67 esercizi ufficiali del catalogo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetChat}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all cursor-pointer"
              title="Azzera la chat e inizia una nuova pianificazione"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Nuova Chat</span>
            </button>

            {!isAiConfigured(apiSettings) && (
              <button
                onClick={onOpenSettings}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
                title="Configura chiave API per risposte illimitate"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Configura IA</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-zinc-950/60 border-b border-zinc-800/50 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-red-400" /> Idee rapide:
          </span>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 px-3 py-1 text-xs font-medium rounded-full bg-zinc-900 border border-zinc-700/60 text-zinc-300 hover:text-white hover:border-red-500/50 hover:bg-red-950/30 transition-all whitespace-nowrap cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Message Stream & Conversation */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-[#0c0c0e] to-[#08080a]">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const cleanText = stripRoutineJsonBlock(msg.content);
            const routineInMsg = !isUser ? parseForgeRoutineBlock(msg.content) : null;

            return (
              <div
                key={index}
                className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'} animate-fade-in`}
              >
                <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
                  {!isUser && (
                    <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center shrink-0 text-red-400">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-red-600/20 border border-red-500/40 text-red-50 rounded-tr-none shadow-md'
                        : 'bg-zinc-900/90 border border-zinc-800/90 text-zinc-200 rounded-tl-none shadow-xl'
                    }`}
                  >
                    {cleanText ? (
                      <MarkdownRenderer content={cleanText} />
                    ) : isStreaming && index === messages.length - 1 ? (
                      <div className="flex items-center gap-2 text-zinc-400 text-xs py-1">
                        <Sparkles className="w-3.5 h-3.5 text-red-400 animate-spin" />
                        <span>Il Coach sta elaborando la scheda...</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Render the clean, structured Routine Card directly under the message */}
                {routineInMsg && (
                  <div className="w-full max-w-[94%] sm:max-w-[88%] ml-0 sm:ml-11">
                    <RoutineProposalCard
                      routine={routineInMsg}
                      onApply={() => handleApplyAndSaveRoutine(routineInMsg)}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Bar: Include Custom Exercise & Official Catalog Badge */}
        <div className="px-3 sm:px-4 py-2.5 bg-zinc-950/90 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* 1. Includi Esercizio Personale */}
            <button
              type="button"
              onClick={() => setShowAttachModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/70 text-zinc-300 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-red-400" />
              <span>+ Esercizio Personale</span>
            </button>

            {/* 2. Badge Fonte: Solo Catalogo Ufficiale */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-700/60 text-xs font-semibold text-zinc-300">
              <BookOpen className="w-3.5 h-3.5 text-red-400" />
              <span>Fonte: Catalogo Ufficiale (67 Esercizi)</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono bg-red-950/80 border border-red-900/60 text-red-300 rounded font-bold">ATTIVO</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!pendingRoutine && (
              <button
                type="button"
                onClick={handleRequestFinalizeRoutine}
                disabled={isLoading}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-500/40 text-red-300 hover:text-white transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Genera Scheda</span>
              </button>
            )}

            {pendingRoutine && (
              <button
                type="button"
                onClick={() => handleApplyAndSaveRoutine(pendingRoutine)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-950/60 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Salva Scheda in Forge</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#101013] border-t border-zinc-800/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Chiedi al Coach (es. 'Voglio una routine di 25 min su Alternate Picking & Sincronizzazione')..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-sm bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 transition-all"
            />

            {isStreaming ? (
              <button
                type="button"
                onClick={handleStopStream}
                className="flex items-center justify-center p-3 rounded-xl bg-amber-600/30 border border-amber-500/50 text-amber-300 hover:bg-amber-600/40 transition-colors"
                title="Interrompi risposta"
              >
                <StopCircle className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="flex items-center justify-center p-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white shadow-md shadow-red-950/50 transition-all cursor-pointer"
                title="Invia messaggio"
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Modal: Attach Custom Exercise */}
      {showAttachModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#121215] border border-red-500/40 rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-white font-bold font-serif text-base">
                <Plus className="w-4 h-4 text-red-400" />
                <span>Collega il Tuo Esercizio Personale</span>
              </div>
              <button
                onClick={() => setShowAttachModal(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {customAttachError && (
              <div className="p-3 text-xs rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{customAttachError}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">
                  Titolo Esercizio *
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Es. Il Mio Lick di Riscaldamento in Sol Minore"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-750 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">
                    Categoria Tecnica
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as TechniqueCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-750 text-white focus:outline-none focus:border-red-500"
                  >
                    {TECHNIQUE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">
                    Difficoltà (Rank)
                  </label>
                  <select
                    value={customRank}
                    onChange={(e) => setCustomRank(e.target.value as DifficultyRank)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-750 text-white focus:outline-none focus:border-red-500"
                  >
                    {DIFFICULTY_RANKS.map((rk) => (
                      <option key={rk} value={rk}>
                        {rk}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">
                  BPM Target: <span className="font-mono text-red-400 font-bold">{customBpm} BPM</span>
                </label>
                <input
                  type="range"
                  min={40}
                  max={240}
                  step={5}
                  value={customBpm}
                  onChange={(e) => setCustomBpm(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-red-400" />
                  Link Video YouTube (Opzionale)
                </label>
                <input
                  type="url"
                  value={customVideoUrl}
                  onChange={(e) => setCustomVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-750 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-red-400" />
                  Carica Tablatura (Immagine, PDF o File)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf,.txt,.tab"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleProcessCustomFile(file);
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{customTabFileName ? 'Sostituisci File' : 'Seleziona File'}</span>
                  </button>
                  {customTabFileName && (
                    <span className="text-zinc-300 truncate max-w-[200px] text-[11px] font-mono">
                      {customTabFileName}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">
                  Oppure Scrivi la Tablatura o Note Testuali
                </label>
                <textarea
                  rows={3}
                  value={customTabText}
                  onChange={(e) => setCustomTabText(e.target.value)}
                  placeholder="e|--------------------|&#10;B|---12h15p12---------|&#10;G|------------14------|"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-750 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-red-500 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowAttachModal(false)}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={handleConfirmAttachCustomExercise}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-950/60 transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Collega e Invia al Coach</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
