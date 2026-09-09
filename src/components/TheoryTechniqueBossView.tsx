import React, { useState } from 'react';
import { TheoryModule, TechniqueExercise, TechniqueCategory, BossFight, BossTabFile, BossCategory, BossType, HunterProfile, DifficultyRank, ApiSettings, LickPrize, TheoryQuizQuestion, CustomTheoryLesson, CustomTheoryFile } from '../types';
import { theoryModules } from '../data/theoryData';
import { exercisesData } from '../data/exercisesData';
import { bossFightsData } from '../data/bossData';
import { fandomBossFightsData } from '../data/fandomBossData';
import { theoryQuizzesByModuleId } from '../data/theoryQuizzes';
import { TabViewer } from './TabViewer';
import { FretboardViewer } from './FretboardViewer';
import { MetronomeBar } from './MetronomeBar';
import { soundEngine } from '../utils/audioEngine';
import { awardXpToProfile, saveHunterProfile, saveCustomBossVideo, removeCustomBossVideo } from '../utils/storage';
import { extractYoutubeId, getEffectiveBossYoutubeId, bossToWorkoutExercise } from '../utils/bossWorkoutAdapter';
import {
  explainQuizMistakeStream,
  generateLickPrize,
  generateTheoryQuizWithAi,
  isAiConfigured,
  getRecommendedSystemsCount,
  shuffleQuizOptions
} from '../utils/aiCoachEngine';
import { generateRewardLickPdf } from '../utils/pdfGenerator';
import { MarkdownRenderer } from './MarkdownRenderer';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Zap,
  Swords,
  CheckCircle2,
  Lock,
  Play,
  Trophy,
  Flame,
  Search,
  Filter,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  Award,
  Video,
  Layers,
  ArrowRight,
  ShieldAlert,
  Dumbbell,
  FileCode,
  Music,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Download,
  HelpCircle,
  Bot,
  AlertCircle,
  GraduationCap,
  RefreshCw,
  RotateCcw,
  Key,
  Gamepad2,
  X,
  Plus,
  Upload,
  FileText,
  Trash2,
  Eye,
  FileUp,
  Edit2,
  PlusCircle,
  File
} from 'lucide-react';

interface TheoryTechniqueBossViewProps {
  hunterProfile: HunterProfile;
  onUpdateProfile: (updated: HunterProfile) => void;
  onStartSingleExerciseWorkout: (exercise: TechniqueExercise) => void;
  onAddExerciseToRoutinePrompt?: (exercise: TechniqueExercise) => void;
  apiSettings: ApiSettings;
  onOpenSettings?: () => void;
}

export const TheoryTechniqueBossView: React.FC<TheoryTechniqueBossViewProps> = ({
  hunterProfile,
  onUpdateProfile,
  onStartSingleExerciseWorkout,
  onAddExerciseToRoutinePrompt,
  apiSettings,
  onOpenSettings
}) => {
  // 3 Sub-sections: 'theory' | 'technique' | 'bosses'
  const [subSection, setSubSection] = useState<'theory' | 'technique' | 'bosses'>('theory');

  // Boss sub-category: 'official' | 'fandom'
  const [bossCategory, setBossCategory] = useState<'official' | 'fandom'>('official');

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRank, setSelectedRank] = useState<string>('all');

  // Active Modals
  const [activeTheoryModal, setActiveTheoryModal] = useState<TheoryModule | null>(null);
  const [activeExerciseModal, setActiveExerciseModal] = useState<TechniqueExercise | null>(null);
  const [activeBossModal, setActiveBossModal] = useState<BossFight | null>(null);

  // Custom Boss Import & Tab Upload State
  const [isImportBossModalOpen, setIsImportBossModalOpen] = useState<boolean>(false);
  const [viewingScoreModal, setViewingScoreModal] = useState<BossTabFile | null>(null);
  const [importForm, setImportForm] = useState<{
    title: string;
    artist: string;
    albumYear: string;
    category: BossCategory;
    fandomUniverse: string;
    type: BossType;
    rank: DifficultyRank;
    tempoBpm: number;
    tuning: string;
    genre: string;
    youtubeUrl: string;
    songsterrUrl: string;
    description: string;
    customTabFile: BossTabFile | null;
  }>({
    title: '',
    artist: '',
    albumYear: '2024',
    category: 'official',
    fandomUniverse: '',
    type: 'full_song',
    rank: 'C-Rank',
    tempoBpm: 120,
    tuning: 'E Standard (E A D G B E)',
    genre: 'Rock / Metal',
    youtubeUrl: '',
    songsterrUrl: '',
    description: '',
    customTabFile: null,
  });

  // Custom Theory Lessons Form & Modal State
  const [isCustomTheoryModalOpen, setIsCustomTheoryModalOpen] = useState<boolean>(false);
  const [isTheoryDragActive, setIsTheoryDragActive] = useState<boolean>(false);
  const [customTheoryForm, setCustomTheoryForm] = useState<{
    title: string;
    category: string;
    level: number;
    readTimeMin: number;
    shortSummary: string;
    fullContent: string;
    file: CustomTheoryFile | null;
  }>({
    title: '',
    category: 'Lezioni Personali',
    level: 1,
    readTimeMin: 5,
    shortSummary: '',
    fullContent: '',
    file: null
  });

  // Custom YouTube video link replacement state for any boss
  const [customVideoInputBossId, setCustomVideoInputBossId] = useState<string | null>(null);
  const [customVideoInputValue, setCustomVideoInputValue] = useState<string>('');
  const [customVideoError, setCustomVideoError] = useState<string | null>(null);

  const handleSaveCustomVideo = (bossId: string) => {
    const extracted = extractYoutubeId(customVideoInputValue);
    if (!extracted) {
      setCustomVideoError('Inserisci un link o ID YouTube valido (es. https://www.youtube.com/watch?v=... o youtu.be/...)');
      return;
    }
    const updatedProfile = saveCustomBossVideo(hunterProfile, bossId, extracted);
    onUpdateProfile(updatedProfile);
    soundEngine.playSuccess();
    setCustomVideoInputBossId(null);
    setCustomVideoInputValue('');
    setCustomVideoError(null);
  };

  const handleResetCustomVideo = (bossId: string) => {
    const updatedProfile = removeCustomBossVideo(hunterProfile, bossId);
    onUpdateProfile(updatedProfile);
    soundEngine.playClick();
    setCustomVideoInputBossId(null);
    setCustomVideoInputValue('');
    setCustomVideoError(null);
  };

  const handleStartBossWorkout = (boss: BossFight) => {
    const ex = bossToWorkoutExercise(boss, hunterProfile.customBossVideos);
    onStartSingleExerciseWorkout(ex);
  };

  // Attach a tab file (PDF, Image, etc.) to ANY boss (official, fandom, or custom)
  const handleAttachTabFile = (bossId: string, file: File) => {
    if (!file) return;
    const formatSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const newTabFile: BossTabFile = {
        name: file.name,
        type: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream'),
        dataUrl,
        uploadedAt: new Date().toLocaleDateString('it-IT'),
        fileSize: formatSize(file.size)
      };

      const updatedTabs = {
        ...(hunterProfile.bossUploadedTabs || {}),
        [bossId]: newTabFile
      };

      const updatedProfile: HunterProfile = {
        ...hunterProfile,
        bossUploadedTabs: updatedTabs
      };

      onUpdateProfile(updatedProfile);
      saveHunterProfile(updatedProfile);
      soundEngine.playSuccess();
    };
    reader.readAsDataURL(file);
  };

  // Remove attached tab file from a boss
  const handleRemoveAttachedTab = (bossId: string) => {
    const updatedTabs = { ...(hunterProfile.bossUploadedTabs || {}) };
    delete updatedTabs[bossId];

    // If it's a custom boss, also clear customTabFile from the customBosses array
    const updatedCustomBosses = (hunterProfile.customBosses || []).map((b) => {
      if (b.id === bossId) {
        const copy = { ...b };
        delete copy.customTabFile;
        return copy;
      }
      return b;
    });

    const updatedProfile: HunterProfile = {
      ...hunterProfile,
      bossUploadedTabs: updatedTabs,
      customBosses: updatedCustomBosses
    };

    onUpdateProfile(updatedProfile);
    saveHunterProfile(updatedProfile);
  };

  // Delete a custom imported boss
  const handleDeleteCustomBoss = (bossId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo Boss personalizzato?')) return;
    const updatedCustomBosses = (hunterProfile.customBosses || []).filter((b) => b.id !== bossId);
    const updatedTabs = { ...(hunterProfile.bossUploadedTabs || {}) };
    delete updatedTabs[bossId];

    const updatedProfile: HunterProfile = {
      ...hunterProfile,
      customBosses: updatedCustomBosses,
      bossUploadedTabs: updatedTabs
    };

    onUpdateProfile(updatedProfile);
    saveHunterProfile(updatedProfile);

    if (activeBossModal?.id === bossId) {
      setActiveBossModal(null);
    }
  };

  // Handle Theory File Upload (supports PDF, DOC, DOCX, TXT, MD, Images, Guitar Pro, etc.)
  const handleTheoryFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;

      const formatSize = (bytes: number) => {
        if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
        return `${(bytes / 1024).toFixed(1)} KB`;
      };

      // Extract text content if text or markdown file
      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const textReader = new FileReader();
        textReader.onload = (tEvent) => {
          const text = tEvent.target?.result as string;
          setCustomTheoryForm((prev) => ({
            ...prev,
            title: prev.title.trim() ? prev.title : file.name.replace(/\.[^/.]+$/, ''),
            file: {
              name: file.name,
              type: file.type || 'text/plain',
              dataUrl,
              fileSize: formatSize(file.size),
              uploadedAt: new Date().toLocaleDateString('it-IT'),
              textContent: text
            },
            fullContent: prev.fullContent || text
          }));
        };
        textReader.readAsText(file);
      } else {
        setCustomTheoryForm((prev) => ({
          ...prev,
          title: prev.title.trim() ? prev.title : file.name.replace(/\.[^/.]+$/, ''),
          file: {
            name: file.name,
            type: file.type || 'application/octet-stream',
            dataUrl,
            fileSize: formatSize(file.size),
            uploadedAt: new Date().toLocaleDateString('it-IT')
          }
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Custom Theory Lesson
  const handleSaveCustomTheoryLesson = () => {
    if (!customTheoryForm.title.trim()) {
      alert('Inserisci il titolo della lezione.');
      return;
    }
    if (!customTheoryForm.file) {
      alert('Seleziona e importa un file per la lezione (PDF, Word, TXT o altri formati).');
      return;
    }

    const lessonId = `custom-th-${Date.now()}`;
    const newLesson: CustomTheoryLesson = {
      id: lessonId,
      title: customTheoryForm.title.trim(),
      category: customTheoryForm.category.trim() || 'Lezioni Personali',
      level: customTheoryForm.level || 1,
      readTimeMin: customTheoryForm.readTimeMin || 5,
      shortSummary:
        customTheoryForm.shortSummary.trim() ||
        `Documento allegato: ${customTheoryForm.file.name} (${customTheoryForm.file.fileSize})`,
      fullContent:
        customTheoryForm.fullContent.trim() ||
        (customTheoryForm.file.textContent ||
          `### ${customTheoryForm.title.trim()}\n\nMateriale didattico allegato: **${customTheoryForm.file.name}** (${customTheoryForm.file.fileSize}).\n\nUtilizza i pulsanti dedicati qui sotto per visualizzare o scaricare il file.`),
      keyTakeaways: [
        `File di studio: ${customTheoryForm.file.name}`,
        'Lezione creata e archiviata dallo studente'
      ],
      createdAt: new Date().toISOString(),
      isCustom: true,
      file: customTheoryForm.file
    };

    const updatedCustomLessons = [newLesson, ...(hunterProfile.customTheoryLessons || [])];
    const updatedProfile: HunterProfile = {
      ...hunterProfile,
      customTheoryLessons: updatedCustomLessons
    };

    onUpdateProfile(updatedProfile);
    saveHunterProfile(updatedProfile);
    soundEngine.playSuccess();
    setIsCustomTheoryModalOpen(false);
    setCustomTheoryForm({
      title: '',
      category: 'Lezioni Personali',
      level: 1,
      readTimeMin: 5,
      shortSummary: '',
      fullContent: '',
      file: null
    });
  };

  // Delete Custom Theory Lesson
  const handleDeleteCustomTheoryLesson = (lessonId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa lezione personalizzata?')) return;
    const updatedCustomLessons = (hunterProfile.customTheoryLessons || []).filter((l) => l.id !== lessonId);
    const updatedCompleted = (hunterProfile.completedTheoryModuleIds || []).filter((id) => id !== lessonId);

    const updatedProfile: HunterProfile = {
      ...hunterProfile,
      customTheoryLessons: updatedCustomLessons,
      completedTheoryModuleIds: updatedCompleted
    };

    onUpdateProfile(updatedProfile);
    saveHunterProfile(updatedProfile);

    if (activeTheoryModal?.id === lessonId) {
      setActiveTheoryModal(null);
    }
  };

  // Save a new imported boss
  const handleSaveImportedBoss = () => {
    if (!importForm.title.trim() || !importForm.artist.trim()) {
      alert('Inserisci almeno il Titolo e l\'Artista del brano o assolo.');
      return;
    }

    const bossId = `custom-boss-${Date.now()}`;
    const ytId = extractYoutubeId(importForm.youtubeUrl);
    const ytUrl = importForm.youtubeUrl.trim()
      ? importForm.youtubeUrl.startsWith('http')
        ? importForm.youtubeUrl.trim()
        : `https://www.youtube.com/watch?v=${importForm.youtubeUrl.trim()}`
      : undefined;

    const rankXpMap: Record<DifficultyRank, number> = {
      'E-Rank': 350,
      'D-Rank': 450,
      'C-Rank': 550,
      'B-Rank': 680,
      'A-Rank': 850,
      'S-Rank': 1200
    };

    const newBoss: BossFight = {
      id: bossId,
      title: importForm.title.trim(),
      artist: importForm.artist.trim(),
      albumYear: importForm.albumYear.trim() || '2024',
      category: importForm.category,
      fandomUniverse: importForm.category === 'fandom' ? (importForm.fandomUniverse.trim() || 'Fandom') : undefined,
      type: importForm.type,
      rank: importForm.rank,
      tempoBpm: Number(importForm.tempoBpm) || 120,
      tuning: importForm.tuning.trim() || 'E Standard (E A D G B E)',
      genre: importForm.genre.trim() || 'Rock / Metal',
      description: importForm.description.trim() || `Boss personalizzato importato per la sfida e lo studio avanzato.`,
      whyThisSong: `Brano aggiunto personalmente per sfidare e affinare la tecnica chitarristica.`,
      requiredSkills: ['Studio approfondito partitura', 'Precisione ritmica', 'Sincronizzazione mani'],
      xpReward: rankXpMap[importForm.rank] || 550,
      mrTabsUrl: ytUrl,
      youtubeId: ytId || '',
      youtubeTitle: `${importForm.title.trim()} - Guitar Tutorial & Tab`,
      youtubeChannelName: importForm.category === 'fandom' ? 'YouTube' : 'Mr. Tabs',
      songsterrUrl: importForm.songsterrUrl.trim() || `https://www.songsterr.com/a/wa/search?pattern=${encodeURIComponent(importForm.title.trim())}`,
      isCustomImported: true,
      customTabFile: importForm.customTabFile || undefined,
      measures: []
    };

    const updatedCustomBosses = [newBoss, ...(hunterProfile.customBosses || [])];
    const updatedTabs = { ...(hunterProfile.bossUploadedTabs || {}) };
    if (importForm.customTabFile) {
      updatedTabs[bossId] = importForm.customTabFile;
    }

    const updatedProfile: HunterProfile = {
      ...hunterProfile,
      customBosses: updatedCustomBosses,
      bossUploadedTabs: updatedTabs
    };

    onUpdateProfile(updatedProfile);
    saveHunterProfile(updatedProfile);

    // Switch view to the chosen category
    setBossCategory(importForm.category);
    setIsImportBossModalOpen(false);
    soundEngine.playSuccess();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  // Dynamic AI Quiz State (NotebookLM style)
  const [dynamicQuizzes, setDynamicQuizzes] = useState<Record<string, TheoryQuizQuestion[]>>({});
  const [generatingQuizForModuleId, setGeneratingQuizForModuleId] = useState<string | null>(null);
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, number>>({});
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [loadingExplanation, setLoadingExplanation] = useState<Record<string, boolean>>({});
  const [generatingPrize, setGeneratingPrize] = useState<boolean>(false);
  const [aiConfigModalError, setAiConfigModalError] = useState<string | null>(null);

  // Collapsible Category Folders state in Technique section - ALL CLOSED BY DEFAULT
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleCategoryFolder = (category: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleExpandAllFolders = () => {
    const all: Record<string, boolean> = {};
    TECHNIQUE_CATEGORY_BLOCKS.forEach((b) => {
      all[b.category] = true;
    });
    setExpandedFolders(all);
  };

  const handleCollapseAllFolders = () => {
    setExpandedFolders({});
  };

  // When opening a theory module modal, ensure options are shuffled so the correct answer is randomized
  React.useEffect(() => {
    if (activeTheoryModal && !dynamicQuizzes[activeTheoryModal.id]) {
      const base = theoryQuizzesByModuleId[activeTheoryModal.id] || [];
      if (base.length > 0) {
        setDynamicQuizzes((prev) => ({
          ...prev,
          [activeTheoryModal.id]: base.map(shuffleQuizOptions)
        }));
      }
    }
  }, [activeTheoryModal?.id]);

  // Open boss modal
  const handleOpenBossModal = (boss: BossFight) => {
    setActiveBossModal(boss);
  };

  // Complete Theory Module Reading & Claim XP (Only after achieving ≥ 80% accuracy in the test)
  const handleCompleteTheory = (module: TheoryModule) => {
    if (hunterProfile.completedTheoryModuleIds.includes(module.id)) return;

    // Verify test passing requirement (≥ 80% correct answers)
    const activeQuestions = dynamicQuizzes[module.id] || theoryQuizzesByModuleId[module.id] || [];
    const totalQuestions = activeQuestions.length;
    let correctCount = 0;
    let answeredCount = 0;

    activeQuestions.forEach((q) => {
      const ans = userQuizAnswers[q.id];
      if (ans !== undefined) {
        answeredCount++;
        if (ans === q.correctIndex) {
          correctCount++;
        }
      }
    });

    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const isPassed =
      (hunterProfile.passedQuizModuleIds || []).includes(module.id) ||
      (answeredCount === totalQuestions && totalQuestions > 0 && scorePercent >= 80);

    // Gated: user cannot claim module XP without satisfying the 80% test threshold!
    if (!isPassed) return;

    const completed = [...hunterProfile.completedTheoryModuleIds, module.id];
    const { updatedProfile } = awardXpToProfile(
      { ...hunterProfile, completedTheoryModuleIds: completed },
      module.xpReward
    );
    onUpdateProfile(updatedProfile);
    soundEngine.playLevelUp();
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  // Reset quiz answers to allow the user to retake the test from scratch
  const handleResetQuizAnswers = (moduleId: string) => {
    const activeQuestions = dynamicQuizzes[moduleId] || theoryQuizzesByModuleId[moduleId] || [];
    setUserQuizAnswers((prev) => {
      const next = { ...prev };
      activeQuestions.forEach((q) => delete next[q.id]);
      return next;
    });
    setAiExplanations((prev) => {
      const next = { ...prev };
      activeQuestions.forEach((q) => delete next[q.id]);
      return next;
    });
    soundEngine.playRestBeep();
  };

  // Generate NotebookLM-style dynamic test for a Theory Module
  const handleGenerateTheoryQuiz = async (module: TheoryModule) => {
    // Guardrail: AI must be configured with a valid API key
    if (!isAiConfigured(apiSettings)) {
      setAiConfigModalError(
        "Configurazione IA non rilevata: per generare o rigenerare test personalizzati con l'IA o ricevere spiegazioni dal Coach, apri la scheda Impostazioni e inserisci una API Key valida (ad es. OpenRouter, Groq, OpenAI o provider compatibile)."
      );
      return;
    }

    setAiConfigModalError(null);
    setGeneratingQuizForModuleId(module.id);
    try {
      // Pass timestamp as refreshSeed to ensure dynamic, distinct new questions always strictly relevant to the module
      const generated = await generateTheoryQuizWithAi(module, apiSettings, Date.now());
      setDynamicQuizzes((prev) => ({ ...prev, [module.id]: generated }));
      // Clear answers for this module's questions
      setUserQuizAnswers((prev) => {
        const next = { ...prev };
        generated.forEach((q) => delete next[q.id]);
        return next;
      });
      soundEngine.playSuccess();
    } catch (err: any) {
      console.error('Error generating theory quiz:', err);
      setAiConfigModalError(
        err?.message?.includes('CONFIG_REQUIRED')
          ? err.message.replace('CONFIG_REQUIRED: ', '')
          : `Errore durante la generazione del test IA: ${err?.message || 'Verifica la configurazione delle API nelle Impostazioni'}.`
      );
    } finally {
      setGeneratingQuizForModuleId(null);
    }
  };

  // Answer Quiz Option (PERMANENT - Cannot be modified once answered, prevents trial-and-error gaming)
  const handleSelectQuizOption = (
    questionId: string,
    optionIndex: number,
    correctIndex: number,
    module: TheoryModule
  ) => {
    // Strict block: if question has already been answered, do NOT allow changing
    if (userQuizAnswers[questionId] !== undefined) return;

    const newAnswers = { ...userQuizAnswers, [questionId]: optionIndex };
    setUserQuizAnswers(newAnswers);

    if (optionIndex === correctIndex) {
      soundEngine.playSuccess();
    } else {
      soundEngine.playRestBeep();
    }

    // Get the active quiz list for this module (dynamic or curated)
    const activeQuestions = dynamicQuizzes[module.id] || theoryQuizzesByModuleId[module.id] || [];
    const totalQuestions = activeQuestions.length;

    if (totalQuestions > 0) {
      let correctCount = 0;
      let answeredCount = 0;

      activeQuestions.forEach((q) => {
        const ans = q.id === questionId ? optionIndex : newAnswers[q.id];
        if (ans !== undefined) {
          answeredCount++;
          if (ans === q.correctIndex) {
            correctCount++;
          }
        }
      });

      const percentage = Math.round((correctCount / totalQuestions) * 100);

      // Check if user reached at least 80% accuracy upon completing all questions
      if (answeredCount === totalQuestions && percentage >= 80) {
        if (!hunterProfile.passedQuizModuleIds?.includes(module.id)) {
          const updatedPassed = [...(hunterProfile.passedQuizModuleIds || []), module.id];
          const { updatedProfile } = awardXpToProfile(
            { ...hunterProfile, passedQuizModuleIds: updatedPassed },
            100 // +100 XP
          );
          onUpdateProfile(updatedProfile);
        }
        soundEngine.playLevelUp();
        try {
          confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    }
  };

  // Ask AI Coach for Explanation of Wrong Answer with smooth real-time streaming
  const handleAskCoachForQuiz = async (
    moduleTitle: string,
    questionText: string,
    wrongAnswerText: string,
    correctAnswerText: string,
    questionId: string
  ) => {
    // Guardrail: AI must be configured
    if (!isAiConfigured(apiSettings)) {
      setAiExplanations((prev) => ({
        ...prev,
        [questionId]: 'Funzione Coach disabilitata: è richiesta una chiave API valida in Impostazioni per ricevere spiegazioni personalizzate.'
      }));
      return;
    }

    setLoadingExplanation((prev) => ({ ...prev, [questionId]: true }));
    setAiExplanations((prev) => ({ ...prev, [questionId]: '' }));

    try {
      await explainQuizMistakeStream(
        moduleTitle,
        questionText,
        wrongAnswerText,
        correctAnswerText,
        apiSettings,
        (accumulatedText) => {
          // Streams in-place without triggering any auto-scroll
          setAiExplanations((prev) => ({ ...prev, [questionId]: accumulatedText }));
        }
      );
      soundEngine.playSuccess();
    } catch (e: any) {
      setAiExplanations((prev) => ({
        ...prev,
        [questionId]: `Errore del Coach: ${e?.message || 'Verifica la configurazione in Impostazioni.'}`
      }));
    } finally {
      setLoadingExplanation((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  // Generate & Download PDF Lick Prize for Technique Block (Unlocked ONLY after reaching Target BPM in ALL exercises of the block)
  const handleClaimBlockPrize = async (
    block: { category: TechniqueCategory; blockNumber: number; title: string },
    blockExercises: TechniqueExercise[]
  ) => {
    setGeneratingPrize(true);
    try {
      const highestRank = blockExercises.reduce<DifficultyRank>((acc, curr) => {
        const wCurr = rankSortWeight[curr.difficultyRank] || 0;
        const wAcc = rankSortWeight[acc] || 0;
        return wCurr > wAcc ? curr.difficultyRank : acc;
      }, 'C-Rank');

      const maxTargetBpm = Math.max(...blockExercises.map((e) => e.targetBpm), 140);
      const systemsCount = getRecommendedSystemsCount(highestRank);

      const prize = await generateLickPrize(
        `Premio Virtuoso: Blocco ${block.blockNumber < 10 ? `0${block.blockNumber}` : block.blockNumber} - ${block.title}`,
        block.category,
        highestRank,
        maxTargetBpm,
        apiSettings,
        undefined,
        systemsCount
      );

      const updatedPrizes = [prize, ...(hunterProfile.savedPrizes || []).filter((p) => p.id !== prize.id)];
      const updatedProfile = { ...hunterProfile, savedPrizes: updatedPrizes };
      onUpdateProfile(updatedProfile);
      saveHunterProfile(updatedProfile);

      generateRewardLickPdf(prize, hunterProfile);
      soundEngine.playSuccess();
    } catch (e) {
      console.error('Error generating block prize:', e);
    } finally {
      setGeneratingPrize(false);
    }
  };

  // Generate & Download PDF Lick Prize for Boss Fight (Unlocked ONLY after defeating the Boss)
  const handleClaimBossPrize = async (boss: BossFight) => {
    if (!hunterProfile.defeatedBossIds.includes(boss.id)) {
      return;
    }
    setGeneratingPrize(true);
    try {
      const systemsCount = getRecommendedSystemsCount(boss.rank);

      const prize = await generateLickPrize(
        `Boss ${boss.rank}: ${boss.title} (${boss.artist})`,
        boss.genre,
        boss.rank,
        boss.tempoBpm,
        apiSettings,
        undefined,
        systemsCount
      );

      const updatedPrizes = [prize, ...(hunterProfile.savedPrizes || []).filter((p) => p.id !== prize.id)];
      const updatedProfile = { ...hunterProfile, savedPrizes: updatedPrizes };
      onUpdateProfile(updatedProfile);
      saveHunterProfile(updatedProfile);

      generateRewardLickPdf(prize, hunterProfile);
      soundEngine.playSuccess();
    } catch (e) {
      console.error('Error generating boss prize:', e);
    } finally {
      setGeneratingPrize(false);
    }
  };

  // Defeat Boss Fight
  const handleDefeatBoss = (boss: BossFight) => {
    const isAlreadyDefeated = hunterProfile.defeatedBossIds.includes(boss.id);
    const updatedBosses = isAlreadyDefeated
      ? hunterProfile.defeatedBossIds
      : [...hunterProfile.defeatedBossIds, boss.id];

    const { updatedProfile } = awardXpToProfile(
      { ...hunterProfile, defeatedBossIds: updatedBosses },
      isAlreadyDefeated ? 50 : boss.xpReward
    );
    onUpdateProfile(updatedProfile);
    soundEngine.playLevelUp();
    try {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
  };

  const SOLO_LEVELING_RANKS: DifficultyRank[] = ['E-Rank', 'D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank'];

  const getTheorySoloRank = (level: number): DifficultyRank => {
    switch (level) {
      case 1: return 'E-Rank';
      case 2: return 'D-Rank';
      case 3: return 'C-Rank';
      case 4: return 'B-Rank';
      case 5: return 'A-Rank';
      default: return 'S-Rank';
    }
  };

  const getRankBadgeStyle = (rank: string) => {
    switch (rank) {
      case 'E-Rank':
        return 'bg-zinc-800 text-zinc-200 border-zinc-600';
      case 'D-Rank':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/70';
      case 'C-Rank':
        return 'bg-sky-950 text-sky-200 border-sky-400 font-semibold shadow-sm shadow-sky-950/40';
      case 'B-Rank':
        return 'bg-purple-950 text-purple-200 border-purple-400 font-semibold shadow-sm shadow-purple-950/40';
      case 'A-Rank':
        return 'bg-amber-950/70 text-amber-300 border-amber-600/70';
      case 'S-Rank':
        return 'bg-red-950/90 text-red-300 border-red-500 shadow-sm';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const getBossRankBadgeStyle = (rank: string) => {
    switch (rank) {
      case 'E-Rank':
        return 'bg-zinc-800 text-zinc-200 border-zinc-500 font-bold';
      case 'D-Rank':
        return 'bg-emerald-950/90 text-emerald-300 border-emerald-500 font-bold shadow-sm';
      case 'C-Rank':
        return 'bg-sky-950 text-sky-200 border-sky-400 font-bold shadow-md shadow-sky-950/60';
      case 'B-Rank':
        return 'bg-purple-950 text-purple-200 border-purple-400 font-bold shadow-md shadow-purple-950/60';
      case 'A-Rank':
        return 'bg-amber-950/90 text-amber-300 border-amber-500 font-bold shadow-sm';
      case 'S-Rank':
        return 'bg-red-950 text-red-200 border-red-500 font-black animate-pulse shadow-md shadow-red-950/80';
      default:
        return 'bg-zinc-800 text-zinc-200 border-zinc-600 font-bold';
    }
  };

  // Combined Theory Modules (Official Progressive Canon + Custom Student Lessons)
  const customTheoryModules: TheoryModule[] = (hunterProfile.customTheoryLessons || []).map((cl) => ({
    id: cl.id,
    title: cl.title,
    category: (cl.category as any) || 'Lezioni Personali',
    level: cl.level || 1,
    readTimeMin: cl.readTimeMin || 5,
    shortSummary: cl.shortSummary || `File allegato: ${cl.file.name}`,
    fullContent:
      cl.fullContent ||
      (cl.file.textContent ||
        `### ${cl.title}\n\nDocumento allegato per lo studio: **${cl.file.name}** (${cl.file.fileSize}).\n\nPuoi visualizzare o scaricare il documento tramite i comandi dedicati.`),
    keyTakeaways: cl.keyTakeaways || [`Documento: ${cl.file.name}`, 'Materiale didattico personalizzato dello studente'],
    relatedExerciseIds: [],
    xpReward: 150,
    isCustom: true,
    customFile: cl.file
  }));

  const allTheoryModules: TheoryModule[] = [
    ...customTheoryModules,
    ...theoryModules
  ];

  // Filtered Theory
  const filteredTheory = allTheoryModules.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.customFile?.name && m.customFile.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchRank = selectedRank === 'all' || getTheorySoloRank(m.level) === selectedRank;
    return matchSearch && matchCat && matchRank;
  });

  // Rank order weight for ascending difficulty (E -> S)
  const rankSortWeight: Record<DifficultyRank, number> = {
    'E-Rank': 1,
    'D-Rank': 2,
    'C-Rank': 3,
    'B-Rank': 4,
    'A-Rank': 5,
    'S-Rank': 6,
  };

  const TECHNIQUE_CATEGORY_BLOCKS: {
    category: TechniqueCategory;
    blockNumber: number;
    title: string;
    subtitle: string;
  }[] = [
    {
      category: 'Warm-Up & Finger Independence',
      blockNumber: 1,
      title: 'Warm-Up & Finger Independence',
      subtitle: 'Isolamento tendineo della mano sinistra, indipendenza 3°-4° dito, allungamento ed endurance ritmica.'
    },
    {
      category: 'Alternate Picking',
      blockNumber: 2,
      title: 'Alternate Picking & Sincronizzazione Rigorosa',
      subtitle: 'Pennata alternata su corda singola, cambi corda inside/outside picking e accenti ritmici.'
    },
    {
      category: 'Scale & 3NPS',
      blockNumber: 3,
      title: 'Scale & 3NPS (Three Notes Per String)',
      subtitle: 'Pentatoniche collegate a 5 forme, scale modali e sequenze a 3 note per corda lungo il manico.'
    },
    {
      category: 'Legato & Hammer/Pull',
      blockNumber: 4,
      title: 'Legato & Hammer-On / Pull-Off',
      subtitle: 'Scioltezza digitale mano sinistra, trilli, sequenze discendenti fluide e sliding legato.'
    },
    {
      category: 'Economy & Sweep Picking',
      blockNumber: 5,
      title: 'Economy Picking & Sweep Picking',
      subtitle: 'Rolling del polpastrello, arpeggi a 3-5 corde e transizioni fluide con plettrata continua.'
    },
    {
      category: 'String Skipping',
      blockNumber: 6,
      title: 'String Skipping (Salto di Corda)',
      subtitle: 'Arpeggi e intervalli aperti con salto di corda, precisione della mano destra.'
    },
    {
      category: 'Tapping',
      blockNumber: 7,
      title: 'Tapping (A una e due mani)',
      subtitle: 'Tapping percussivo, estensioni melodiche e arpeggi polifonici a due mani.'
    },
    {
      category: 'Bending, Vibrato & Harmonics',
      blockNumber: 8,
      title: 'Expressive Phrasing (Bending, Vibrato & Harmonics)',
      subtitle: 'Intonazione millimetrica del bending, vibrato controllato, armonici naturali, pinch e tapped harmonics.'
    },
    {
      category: 'Modern Fusion & Hybrid Picking',
      blockNumber: 9,
      title: 'Modern Fusion & Hybrid Picking',
      subtitle: 'Plettro + dita medio/anulare, salti di registro e tocco fusion contemporaneo.'
    }
  ];

  // Filtered Exercises
  const filteredExercises = exercisesData.filter((ex) => {
    const matchSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat =
      selectedCategory === 'all' ||
      ex.category === selectedCategory ||
      (selectedCategory.includes('Bending') && ex.category.includes('Bending'));
    const matchRank = selectedRank === 'all' || ex.difficultyRank === selectedRank;
    return matchSearch && matchCat && matchRank;
  });

  // Combined Bosses list (Official Rock/Metal Canon + Fandom Anime/Gaming + Custom Imported)
  const customBosses: BossFight[] = (hunterProfile.customBosses || []).map((b) => ({
    ...b,
    category: b.category || 'official'
  }));

  const allBosses: BossFight[] = [
    ...bossFightsData.map((b) => ({ ...b, category: b.category || ('official' as const) })),
    ...fandomBossFightsData.map((b) => ({ ...b, category: 'fandom' as const })),
    ...customBosses
  ];

  const officialBossesCount = allBosses.filter((b) => b.category !== 'fandom').length;
  const fandomBossesCount = allBosses.filter((b) => b.category === 'fandom').length;

  // Filtered Bosses according to selected category (official vs fandom), search, rank and type - SORTED BY ASCENDING RANK
  const filteredBosses = allBosses
    .filter((b) => {
      const isFandom = b.category === 'fandom';
      const matchBossCat = bossCategory === 'fandom' ? isFandom : !isFandom;
      const matchSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.fandomUniverse && b.fandomUniverse.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchRank = selectedRank === 'all' || b.rank === selectedRank;
      const matchType =
        selectedCategory === 'all' ||
        (selectedCategory === 'songs' && b.type === 'full_song') ||
        (selectedCategory === 'solos' && b.type === 'full_solo');
      return matchBossCat && matchSearch && matchRank && matchType;
    })
    .sort((a, b) => {
      const wA = rankSortWeight[a.rank] || 0;
      const wB = rankSortWeight[b.rank] || 0;
      if (wA !== wB) return wA - wB;
      return a.title.localeCompare(b.title);
    });

  // Categories list
  const theoryCategories = Array.from(new Set(allTheoryModules.map((m) => m.category)));
  const techniqueCategories = Array.from(new Set(exercisesData.map((e) => e.category)));

  return (
    <div className="space-y-6 pb-12">
      {/* Sub-section Navigation Bar (3 Under-sections) */}
      <div className="bg-[#0c0c0e] p-1.5 rounded-2xl border border-zinc-800 flex flex-wrap gap-1 shadow-lg">
        <button
          onClick={() => {
            setSubSection('theory');
            setSelectedCategory('all');
            setSelectedRank('all');
          }}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all ${
            subSection === 'theory'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          1. TEORIA MUSICALE
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 font-mono font-bold">
            {hunterProfile.completedTheoryModuleIds.length}/{theoryModules.length}
          </span>
        </button>

        <button
          onClick={() => {
            setSubSection('technique');
            setSelectedCategory('all');
            setSelectedRank('all');
          }}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all ${
            subSection === 'technique'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          2. ESERCIZI DI TECNICA
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 font-mono font-bold">
            {exercisesData.length} Licks
          </span>
        </button>

        <button
          onClick={() => {
            setSubSection('bosses');
            setSelectedCategory('all');
            setSelectedRank('all');
          }}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all ${
            subSection === 'bosses'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Swords className="w-4 h-4" />
          3. BOSS FIGHT (CANZONI)
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 font-mono font-bold">
            {hunterProfile.defeatedBossIds.length}/{bossFightsData.length}
          </span>
        </button>
      </div>

      {/* Global Search and Category Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              subSection === 'theory'
                ? 'Cerca argomento teorico...'
                : subSection === 'technique'
                ? 'Cerca tecnica, lick o esercizio...'
                : 'Cerca canzone, band o boss...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:border-red-600 outline-none"
          />
        </div>

        {/* Category / Rank Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedRank('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
              selectedCategory === 'all' && selectedRank === 'all'
                ? 'bg-[#0c0c0e] text-red-400 border border-red-900/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 bg-[#09090b] border border-zinc-800/80'
            }`}
          >
            Tutti
          </button>

          {subSection === 'theory' && (
            <>
              {SOLO_LEVELING_RANKS.map((rank) => (
                <button
                  key={rank}
                  onClick={() => setSelectedRank((prev) => (prev === rank ? 'all' : rank))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
                    selectedRank === rank
                      ? 'bg-red-950/70 text-red-300 border border-red-700 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 bg-[#09090b] border border-zinc-800/80'
                  }`}
                >
                  {rank}
                </button>
              ))}

              <span className="text-zinc-700 select-none px-1">|</span>

              {theoryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory((prev) => (prev === cat ? 'all' : cat))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0c0c0e] text-red-400 border border-red-900/60 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 bg-[#09090b] border border-zinc-800/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </>
          )}

          {subSection === 'technique' && (
            <>
              {SOLO_LEVELING_RANKS.map((rank) => (
                <button
                  key={rank}
                  onClick={() => setSelectedRank((prev) => (prev === rank ? 'all' : rank))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
                    selectedRank === rank
                      ? 'bg-red-950/70 text-red-300 border border-red-700 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 bg-[#09090b] border border-zinc-800/80'
                  }`}
                >
                  {rank}
                </button>
              ))}

              <span className="text-zinc-700 select-none px-1">|</span>

              {techniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory((prev) => (prev === cat ? 'all' : cat))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0c0c0e] text-red-400 border border-red-900/60 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 bg-[#09090b] border border-zinc-800/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </>
          )}

          {subSection === 'bosses' && (
            <>
              <button
                onClick={() => setSelectedCategory('songs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === 'songs'
                    ? 'bg-blue-950/60 text-blue-300 border border-blue-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 bg-[#09090b] border border-zinc-800/80'
                }`}
              >
                🎵 Canzoni Intere
              </button>
              <button
                onClick={() => setSelectedCategory('solos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === 'solos'
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 bg-[#09090b] border border-zinc-800/80'
                }`}
              >
                ⚡ Assoli Completi
              </button>
              {['E-Rank', 'D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank'].map((rank) => (
                <button
                  key={rank}
                  onClick={() => setSelectedRank(rank)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
                    selectedRank === rank
                      ? 'bg-[#0c0c0e] text-red-400 border border-red-900/60 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 bg-[#09090b] border border-zinc-800/80'
                  }`}
                >
                  {rank}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* SUB-SECTION 1: MUSIC THEORY (SCUOLA DI CHITARRA A LIVELLI GRADUALI) */}
      {subSection === 'theory' && (
        <div className="space-y-4">
          <div className="bg-[#0c0c0e] border border-zinc-800 p-4 rounded-2xl flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-100">
                  Piano di Studi Teorico Graduale
                </h2>
                <p className="text-xs text-zinc-400">
                  Strutturato a moduli progressivi con Rango Hunter da E-Rank (Fondamenti) a S-Rank (Armonia & Virtuosismo).
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTheory.map((module) => {
              const isCompleted = hunterProfile.completedTheoryModuleIds.includes(module.id);
              const soloRank = getTheorySoloRank(module.level);

              return (
                <div
                  key={module.id}
                  onClick={() => setActiveTheoryModal(module)}
                  className={`bg-[#0c0c0e] border rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between shadow-md ${
                    isCompleted
                      ? 'border-emerald-500/40 bg-emerald-950/10'
                      : 'border-zinc-800 hover:border-red-600/60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${getRankBadgeStyle(soloRank)}`}>
                          {soloRank}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400 font-semibold">
                          {module.category}
                        </span>
                      </div>
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4" /> COMPLETATO
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-mono text-zinc-400">
                          <Clock className="w-3.5 h-3.5" /> {module.readTimeMin} min lettura
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-zinc-100 hover:text-red-400 transition-colors">
                      {module.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {module.shortSummary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> +{module.xpReward} XP
                    </span>
                    <span className="text-xs font-mono text-zinc-300 flex items-center gap-1 hover:text-red-400">
                      Apri Lezione <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: TECHNIQUE EXERCISES (ESERCIZI DI TECNICA A CARTELLE INTERATTIVE) */}
      {subSection === 'technique' && (
        <div className="space-y-4">
          {/* Folder Section Header with Expand / Collapse Controls */}
          <div className="bg-[#0c0c0e] border border-zinc-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50">
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  Libreria Tecnica: Cartelle Tematiche ad Espansione
                </h2>
                <p className="text-xs text-zinc-400">
                  Ogni categoria è una cartella interattiva. Aprila per visualizzare gli esercizi ordinati per Rank Hunter (da E-Rank a S-Rank).
                </p>
              </div>
            </div>

            {/* Quick Actions to Expand / Collapse All Folders */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleExpandAllFolders}
                className="px-3.5 py-2 rounded-xl bg-[#121216] hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-zinc-100 font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                title="Apri tutte le cartelle contemporaneamente"
              >
                <FolderOpen className="w-4 h-4 text-red-400" />
                Espandi Tutte
              </button>
              <button
                type="button"
                onClick={handleCollapseAllFolders}
                className="px-3.5 py-2 rounded-xl bg-[#121216] hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-zinc-100 font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                title="Chiudi tutte le cartelle"
              >
                <Folder className="w-4 h-4 text-zinc-400" />
                Comprimi Tutte
              </button>
            </div>
          </div>

          {/* RENDER TECHNIQUE BLOCKS IN ASCENDING ORDER */}
          {TECHNIQUE_CATEGORY_BLOCKS.map((block) => {
            // Filter exercises belonging to this category and matching current filters
            const blockExercises = filteredExercises
              .filter((ex) => ex.category === block.category || (block.category.includes('Bending') && ex.category.includes('Bending')))
              .sort((a, b) => {
                const rankA = rankSortWeight[a.difficultyRank] || 0;
                const rankB = rankSortWeight[b.difficultyRank] || 0;
                if (rankA !== rankB) return rankA - rankB;
                return a.level - b.level;
              });

            // Full list of exercises in this block regardless of search filter, to accurately determine block mastery
            const allBlockExercises = exercisesData
              .filter((ex) => ex.category === block.category || (block.category.includes('Bending') && ex.category.includes('Bending')))
              .sort((a, b) => {
                const rankA = rankSortWeight[a.difficultyRank] || 0;
                const rankB = rankSortWeight[b.difficultyRank] || 0;
                if (rankA !== rankB) return rankA - rankB;
                return a.level - b.level;
              });

            const totalInBlock = allBlockExercises.length;
            const masteredInBlock = allBlockExercises.filter(
              (ex) => (hunterProfile.exercisePRs[ex.id]?.maxBpm || 0) >= ex.targetBpm
            ).length;
            const isBlockMastered = totalInBlock > 0 && masteredInBlock === totalInBlock;

            const isOpen = !!expandedFolders[block.category];

            // Calculate tested PRs
            const testedPrsCount = blockExercises.filter(
              (ex) => (hunterProfile.exercisePRs[ex.id]?.maxBpm || 0) > 0
            ).length;

            return (
              <div
                key={block.category}
                className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl overflow-hidden shadow-lg transition-all"
              >
                {/* Interactive Folder Header Banner */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleCategoryFolder(block.category)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCategoryFolder(block.category);
                    }
                  }}
                  className={`w-full p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left transition-colors cursor-pointer select-none ${
                    isOpen ? 'bg-[#121216] border-b border-zinc-800' : 'hover:bg-[#111115]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl border transition-all ${
                        isOpen
                          ? 'bg-red-950/70 border-red-700/70 text-red-400'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {isOpen ? (
                        <FolderOpen className="w-5 h-5 text-red-400" />
                      ) : (
                        <Folder className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono font-black px-2.5 py-0.5 rounded-md bg-red-950/60 text-red-400 border border-red-800/60">
                          BLOCCO {block.blockNumber < 10 ? `0${block.blockNumber}` : block.blockNumber}
                        </span>
                        <h3 className="text-base font-bold text-zinc-100">
                          {block.title}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        {block.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-xl bg-[#09090b] border border-zinc-800 text-zinc-300 font-semibold">
                        {blockExercises.length} {blockExercises.length === 1 ? 'Esercizio' : 'Esercizi'}
                      </span>
                      {isBlockMastered ? (
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold flex items-center gap-1.5 shadow-sm">
                          <Trophy className="w-3.5 h-3.5 text-amber-400" />
                          PREMIO VIRTUOSO SBLOCCATO
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono px-2 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium hidden md:inline-flex items-center gap-1">
                          <Lock className="w-3 h-3 text-zinc-500" />
                          Target Virtuoso: {masteredInBlock}/{totalInBlock}
                        </span>
                      )}
                      {testedPrsCount > 0 && !isBlockMastered && (
                        <span className="text-[11px] font-mono px-2 py-1 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 font-bold hidden lg:inline-flex items-center gap-1">
                          <Trophy className="w-3 h-3" /> {testedPrsCount}/{blockExercises.length} Testati
                        </span>
                      )}
                    </div>

                    <div
                      className={`p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-red-400 bg-red-950/40 border-red-800/50' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Folder Contents (Exercises Grid) */}
                {isOpen && (
                  <div className="p-4 sm:p-6 bg-[#09090b]/50 border-t border-zinc-800/50 space-y-5">
                    {/* PREMIO VIRTUOSO DEL BLOCCO TECNICO */}
                    <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isBlockMastered
                        ? 'bg-gradient-to-r from-amber-950/40 via-[#14120a] to-[#0c0c0e] border-amber-500/60 shadow-lg shadow-amber-950/30'
                        : 'bg-[#121216] border-zinc-800/80'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Trophy className={`w-4 h-4 ${isBlockMastered ? 'text-amber-400 animate-bounce' : 'text-zinc-500'}`} />
                            <h4 className={`text-xs sm:text-sm font-mono font-bold uppercase ${
                              isBlockMastered ? 'text-amber-300' : 'text-zinc-300'
                            }`}>
                              Premio Virtuoso Blocco {block.blockNumber < 10 ? `0${block.blockNumber}` : block.blockNumber}: Assolo Maestro ({block.title})
                            </h4>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl font-sans">
                            Il premio Lick/Assolo PDF è riscattabile solo dopo aver raggiunto il <strong>Target Virtuoso in TUTTI gli esercizi</strong> del blocco ({masteredInBlock} su {totalInBlock} completati a target).
                          </p>
                          {/* Progress bar towards whole block mastery */}
                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex-1 max-w-xs h-2 rounded-full bg-zinc-800 overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  isBlockMastered ? 'bg-amber-400' : 'bg-red-500'
                                }`}
                                style={{ width: `${totalInBlock > 0 ? (masteredInBlock / totalInBlock) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-mono font-bold text-zinc-400">
                              {masteredInBlock}/{totalInBlock} a Target BPM
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center">
                          {isBlockMastered ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClaimBlockPrize(block, allBlockExercises);
                              }}
                              disabled={generatingPrize}
                              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 active:scale-95 cursor-pointer"
                              title="Tutti gli esercizi sono a Target Virtuoso! Clicca per generare e scaricare l'Assolo Premio in PDF"
                            >
                              <Download className="w-4 h-4" />
                              {generatingPrize ? 'GENERAZIONE ASSOLO IA...' : 'SCARICA ASSOLO PREMIO DEL BLOCCO (PDF)'}
                            </button>
                          ) : (
                            <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-500 font-mono text-xs font-semibold flex items-center justify-center gap-2">
                              <Lock className="w-3.5 h-3.5 text-zinc-600" />
                              PREMIO BLOCCATO ({masteredInBlock}/{totalInBlock})
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {blockExercises.length === 0 ? (
                      <div className="text-center py-8 px-4 rounded-xl border border-dashed border-zinc-800 bg-[#0c0c0e]/60 space-y-2">
                        <Folder className="w-8 h-8 text-zinc-600 mx-auto" />
                        <p className="text-xs font-mono text-zinc-300 font-semibold">
                          Cartella in fase di allestimento video
                        </p>
                        <p className="text-[11px] font-mono text-zinc-500 max-w-md mx-auto">
                          Stiamo selezionando e catalogando gli esercizi più efficaci e progressivi (E-Rank ➔ S-Rank) dai migliori canali YouTube.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {blockExercises.map((ex) => {
                    const personalRecord = hunterProfile.exercisePRs[ex.id]?.maxBpm;

                    return (
                      <div
                        key={ex.id}
                        className="bg-[#0c0c0e] border border-zinc-800 hover:border-red-600/60 rounded-2xl p-5 space-y-4 transition-all shadow-md flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border font-bold ${getRankBadgeStyle(ex.difficultyRank)}`}>
                                  {ex.difficultyRank}
                                </span>
                                {ex.channelName ? (
                                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-900/40 font-semibold flex items-center gap-1">
                                    <Video className="w-3 h-3" /> {ex.channelName}
                                  </span>
                                ) : (
                                  <span className="text-xs font-mono text-zinc-400 font-semibold">
                                    {ex.category}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base font-bold text-zinc-100">{ex.title}</h3>
                            </div>

                            {personalRecord && (
                              <div className="text-right">
                                <span className="text-[10px] font-mono text-zinc-500 block">RECORD (PR)</span>
                                <span className="text-sm font-mono font-black text-emerald-400 flex items-center gap-1">
                                  <Trophy className="w-3.5 h-3.5" /> {personalRecord} BPM
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                            {ex.description}
                          </p>

                          {ex.biomechanicalFocus && (
                            <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-2.5 text-[11px] font-mono text-amber-200/90 line-clamp-2">
                              <strong>Biomeccanica:</strong> {ex.biomechanicalFocus}
                            </div>
                          )}

                          <div className="bg-[#09090b] p-2.5 rounded-xl border border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                            <span className="text-zinc-400">
                              BPM Base: <strong className="text-zinc-200">{ex.defaultBpm}</strong>
                            </span>
                            <span className="text-red-400">
                              Target Virtuoso: <strong>{ex.targetBpm} BPM</strong>
                            </span>
                            <span className="text-emerald-400 font-bold">+{ex.xpReward} XP</span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                          {/* Actions Row */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveExerciseModal(ex)}
                              className="flex-1 py-2 px-3 rounded-xl bg-[#09090b] hover:bg-zinc-900 border border-zinc-800 text-red-400 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                            >
                              {ex.youtubeId ? (
                                <>
                                  <Video className="w-3.5 h-3.5" />
                                  VEDI VIDEO & SCHEDA
                                </>
                              ) : (
                                <>
                                  <BookOpen className="w-3.5 h-3.5" />
                                  VEDI TAB & CONSIGLI
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => onStartSingleExerciseWorkout(ex)}
                              className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-md shadow-red-950/50 active:scale-95 transition-all flex items-center gap-1.5"
                            >
                              <Dumbbell className="w-3.5 h-3.5" />
                              ALLENA
                            </button>
                          </div>

                          {/* Stato Virtuosismo per il Premio del Blocco */}
                          <div className="w-full py-2 px-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 font-mono text-[11px] flex items-center justify-between">
                            {(personalRecord || 0) >= ex.targetBpm ? (
                              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                Target Virtuoso Raggiunto!
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-zinc-400">
                                <Lock className="w-3 h-3 text-zinc-500" />
                                Target Blocco: {ex.targetBpm} BPM
                              </span>
                            )}
                            <span className={(personalRecord || 0) >= ex.targetBpm ? 'text-emerald-400 font-black' : 'text-zinc-400 font-bold'}>
                              {personalRecord || 0} / {ex.targetBpm} BPM
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      );
    })}
  </div>
)}

      {/* SUB-SECTION 3: BOSS FIGHT ARENA (CANZONI INTERE & ASSOLI COMPLETI) */}
      {subSection === 'bosses' && (
        <div className="space-y-4">
          <div className="bg-[#0c0c0e] border border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-100">
                  Arena dei Boss Musicali (Canzoni Intere & Assoli Completi)
                </h2>
                <p className="text-xs text-zinc-400">
                  Sconfiggi i Boss per riscuotere l'Assolo Premio PDF esclusivo generato con l'IA.
                </p>
              </div>
            </div>

            {/* Action Bar: Switcher + Import Boss Button */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <div className="flex items-center gap-1.5 bg-[#08080a] p-1 rounded-xl border border-zinc-800">
                <button
                  onClick={() => setBossCategory('official')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    bossCategory === 'official'
                      ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Swords className="w-3.5 h-3.5" />
                  BOSS CANONICI ({officialBossesCount})
                </button>

                <button
                  onClick={() => setBossCategory('fandom')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    bossCategory === 'fandom'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  CANZONI FANDOM ({fandomBossesCount})
                </button>
              </div>

              <button
                onClick={() => {
                  setImportForm({
                    title: '',
                    artist: '',
                    albumYear: '2024',
                    category: bossCategory,
                    fandomUniverse: bossCategory === 'fandom' ? 'Anime / Gaming' : '',
                    type: 'full_song',
                    rank: 'C-Rank',
                    tempoBpm: 120,
                    tuning: 'E Standard (E A D G B E)',
                    genre: 'Hard Rock / Metal',
                    youtubeUrl: '',
                    songsterrUrl: '',
                    description: '',
                    customTabFile: null,
                  });
                  setIsImportBossModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/40 cursor-pointer transition-all hover:scale-105 active:scale-95"
                title="Importa o crea un nuovo Boss personalizzato (Canzone o Assolo) con video, tabs o partitura file"
              >
                <Plus className="w-4 h-4" />
                IMPORTA BOSS
              </button>
            </div>
          </div>

          {/* Fandom Banner if in Fandom section */}
          {bossCategory === 'fandom' && (
            <div className="bg-gradient-to-r from-purple-950/40 via-[#100c18] to-[#0c0c0e] border border-purple-800/50 p-4 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-900/50 text-purple-300 border border-purple-700/60">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-purple-200 flex items-center gap-2">
                    Canzoni per il Fandom (Anime, Gaming & Colonne Sonore)
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-900/70 text-purple-200 border border-purple-600">
                      {fandomBossesCount} Brani Disponibili
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Sezione speciale per i brani iconici della cultura Nerd/Gaming con canali YouTube selezionati e link Songsterr. Sconfiggi i Boss per sbloccare gli assoli premio!
                  </p>
                </div>
              </div>
            </div>
          )}

          {filteredBosses.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#0c0c0e] border border-dashed border-zinc-800 space-y-3">
              <Gamepad2 className="w-10 h-10 text-purple-400/60 mx-auto animate-pulse" />
              <h4 className="text-sm font-bold text-zinc-200">
                {bossCategory === 'fandom' ? 'Area Canzoni Fandom in preparazione' : 'Nessun Boss trovato con questi filtri'}
              </h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                {bossCategory === 'fandom'
                  ? 'Pronta ad accogliere i brani e gli assoli dal fandom selezionati da te (Anime, Videogame, Colonne Sonore) con tablatura e canali YouTube autorizzati.'
                  : 'Modifica i filtri di ricerca o il Rank per visualizzare altri Boss.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBosses.map((boss) => {
              const isDefeated = hunterProfile.defeatedBossIds.includes(boss.id);

              return (
                <div
                  key={boss.id}
                  onClick={() => handleOpenBossModal(boss)}
                  className={`bg-[#0c0c0e] border rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-md ${
                    isDefeated
                      ? 'border-red-900/60 bg-gradient-to-b from-[#0c0c0e] to-red-950/20 shadow-xl shadow-red-950/30'
                      : 'border-zinc-800 hover:border-red-600/60'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Boss Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full border ${getBossRankBadgeStyle(
                            boss.rank
                          )}`}
                        >
                          {boss.rank} BOSS
                        </span>

                        {boss.type === 'full_song' ? (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800">
                            CANZONE INTERA
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                            ASSOLO COMPLETO
                          </span>
                        )}

                        {boss.fandomUniverse && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
                            {boss.fandomUniverse}
                          </span>
                        )}
                      </div>

                      {isDefeated ? (
                        <span className="flex items-center gap-1 text-xs font-mono text-amber-300 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/50">
                          <Trophy className="w-3.5 h-3.5 text-amber-400" /> SCONFITTO • PREMIO OK!
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-zinc-500">Da Conquistare</span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 hover:text-red-400 transition-colors">
                        {boss.title}
                      </h3>
                      <p className="text-xs text-red-400 font-mono font-semibold">
                        {boss.artist}
                      </p>
                      <p className="text-[11px] text-zinc-500 font-mono">{boss.albumYear}</p>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {boss.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 pt-1">
                      <span>Tempo: <strong>{boss.tempoBpm} BPM</strong></span>
                      <span>•</span>
                      <span>{boss.genre}</span>
                    </div>

                    {/* Badges row: YouTube, Songsterr, Attached Tab, Custom Video, Forge Training, Custom Boss */}
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      {hunterProfile.customBossVideos?.[boss.id] ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/80 flex items-center gap-1 font-semibold">
                          <Video className="w-3 h-3 text-amber-400" />
                          Canale Personalizzato
                        </span>
                      ) : boss.youtubeChannelName ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/50 text-red-300 border border-red-800/60 flex items-center gap-1">
                          <Video className="w-3 h-3 text-red-400" />
                          {boss.youtubeChannelName}
                        </span>
                      ) : boss.mrTabsUrl ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/50 text-red-300 border border-red-800/60 flex items-center gap-1">
                          <Video className="w-3 h-3 text-red-400" />
                          Mr. Tabs
                        </span>
                      ) : null}

                      {hunterProfile.bossTrainingProgress?.[boss.id] && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/70 text-purple-300 border border-purple-800/80 flex items-center gap-1 font-semibold">
                          <Dumbbell className="w-3 h-3 text-purple-400" />
                          Forgia: Max {hunterProfile.bossTrainingProgress[boss.id].maxAchievedBpm} BPM
                        </span>
                      )}

                      {boss.songsterrUrl && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                          <FileCode className="w-3 h-3 text-emerald-400" />
                          Songsterr
                        </span>
                      )}

                      {(hunterProfile.bossUploadedTabs?.[boss.id] || boss.customTabFile) && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/70 flex items-center gap-1 font-semibold">
                          <FileText className="w-3 h-3 text-amber-400" />
                          Partitura
                        </span>
                      )}

                      {boss.isCustomImported && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/70 flex items-center gap-1 font-semibold">
                          Importato
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> +{boss.xpReward} XP
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartBossWorkout(boss);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-700/70 text-purple-300 hover:text-white font-mono text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                        title="Allenati su questa canzone in The Forge con metronomo e tracciamento BPM/pulizia"
                      >
                        <Dumbbell className="w-3 h-3 text-purple-400" />
                        FORGIA
                      </button>

                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#09090b] hover:bg-zinc-900 text-zinc-200 font-mono text-xs font-bold border border-zinc-800 cursor-pointer">
                        {isDefeated ? (
                          <>
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            VEDI PREMIO
                          </>
                        ) : (
                          <>
                            <Swords className="w-3.5 h-3.5 text-red-400" />
                            SFIDA BOSS
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      )}

      {/* MODAL 1: THEORY LESSON VIEWER WITH INTERACTIVE QUIZZES & AI COACH */}
      {activeTheoryModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 bg-[#09090b] border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono font-bold text-red-400">
                  MODULO TEORICO • LIVELLO {activeTheoryModal.level}
                </span>
                <h3 className="text-lg font-bold text-zinc-100">{activeTheoryModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveTheoryModal(null)}
                className="text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg hover:bg-zinc-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Theory Content (Rendered with MarkdownRenderer so headings, lists and bold text display cleanly without raw symbols) */}
              <div className="text-zinc-200 text-sm leading-relaxed font-sans">
                <MarkdownRenderer content={activeTheoryModal.fullContent} className="text-sm leading-relaxed" />
              </div>

              {/* Fretboard Formula Diagram if exists */}
              {activeTheoryModal.fretboardFormula && (
                <div className="space-y-2">
                  <FretboardViewer
                    title={activeTheoryModal.fretboardFormula.scaleOrChordName}
                    rootNote={activeTheoryModal.fretboardFormula.rootNote}
                    notesOnFretboard={activeTheoryModal.fretboardFormula.notesOnFretboard}
                  />
                </div>
              )}

              {/* Key Takeaways */}
              <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold font-mono text-red-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  PUNTI CHIAVE DA RICORDARE:
                </span>
                <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside font-mono">
                  {activeTheoryModal.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </div>

              {/* INTERACTIVE QUIZ SECTION (NOTEBOOKLM STYLE + AI TEST GENERATION) */}
              {(() => {
                const activeQuestions =
                  dynamicQuizzes[activeTheoryModal.id] ||
                  theoryQuizzesByModuleId[activeTheoryModal.id] ||
                  [];
                const totalQuestions = activeQuestions.length;
                let answeredCount = 0;
                let correctCount = 0;

                activeQuestions.forEach((q) => {
                  const ans = userQuizAnswers[q.id];
                  if (ans !== undefined) {
                    answeredCount++;
                    if (ans === q.correctIndex) correctCount++;
                  }
                });

                const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
                const isPassed =
                  (hunterProfile.passedQuizModuleIds || []).includes(activeTheoryModal.id) ||
                  (answeredCount === totalQuestions && totalQuestions > 0 && scorePercent >= 80);
                const isGeneratingQuiz = generatingQuizForModuleId === activeTheoryModal.id;

                return (
                  <div className="bg-[#121216] border border-red-900/50 rounded-2xl p-5 space-y-5">
                    {/* Header & AI Generator Trigger */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-red-400" />
                        <div>
                          <h4 className="text-sm font-mono font-bold text-zinc-100 flex items-center gap-2">
                            TEST DI VERIFICA TEORICA
                            {totalQuestions > 0 && (
                              <span className="text-xs text-zinc-400 font-normal">
                                ({totalQuestions} Domande)
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] font-mono text-zinc-400">
                            Completa il test con almeno l'<strong>80%</strong> di risposte corrette per riscattare l'XP e sbloccare l'Assolo Premio.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Reset / Retry Test Button */}
                        {answeredCount > 0 && (
                          <button
                            onClick={() => handleResetQuizAnswers(activeTheoryModal.id)}
                            className="px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 active:scale-95 shadow-sm"
                            title="Azzera le risposte e ripeti il test dall'inizio"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                            RIPETI TEST
                          </button>
                        )}

                        {/* Button to Generate AI Quiz (NotebookLM style) */}
                        <button
                          onClick={() => handleGenerateTheoryQuiz(activeTheoryModal)}
                          disabled={isGeneratingQuiz}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md self-start sm:self-auto ${
                            !isAiConfigured(apiSettings)
                              ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/40 active:scale-95'
                          }`}
                          title={
                            !isAiConfigured(apiSettings)
                              ? 'Configura la tua API Key in Impostazioni per abilitare la generazione IA di test'
                              : 'Genera un nuovo set di domande a risposta multipla con l\'IA basato sul testo della lezione'
                          }
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingQuiz ? 'animate-spin' : ''}`} />
                          {isGeneratingQuiz
                            ? 'GENERAZIONE TEST IA...'
                            : !isAiConfigured(apiSettings)
                            ? 'CONFIGURA IA PER TEST'
                            : totalQuestions > 0
                            ? 'RIGENERA TEST IA'
                            : 'GENERA TEST IA (NOTEBOOKLM)'}
                        </button>
                      </div>
                    </div>

                    {/* AI Configuration Notice if not configured */}
                    {!isAiConfigured(apiSettings) && (
                      <div className="bg-amber-950/20 border border-amber-800/60 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs font-mono">
                        <div className="flex items-center gap-2 text-amber-300">
                          <Key className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>
                            <strong>Funzione IA inattiva:</strong> per rigenerare quiz pertinenti con l'IA o chiedere chiarimenti al Coach, configura una API Key in Impostazioni.
                          </span>
                        </div>
                        {onOpenSettings && (
                          <button
                            onClick={onOpenSettings}
                            className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold whitespace-nowrap text-[11px] transition-colors shrink-0"
                          >
                            Apri Impostazioni
                          </button>
                        )}
                      </div>
                    )}

                    {/* AI Error Alert if generation failed or key missing */}
                    {aiConfigModalError && (
                      <div className="bg-red-950/40 border border-red-800/80 rounded-xl p-3 flex items-start justify-between gap-3 text-xs font-mono text-red-300 animate-in fade-in">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span>{aiConfigModalError}</span>
                            {onOpenSettings && (
                              <div>
                                <button
                                  onClick={onOpenSettings}
                                  className="underline text-red-200 hover:text-white font-bold"
                                >
                                  Vai alla scheda Impostazioni API →
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => setAiConfigModalError(null)}
                          className="text-zinc-400 hover:text-zinc-200 p-1 rounded-lg"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {/* Progress / Status banner */}
                    <div className="bg-[#09090b] p-3 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400">Precisione attuale:</span>
                        <span
                          className={`font-bold ${
                            scorePercent >= 80
                              ? 'text-emerald-400'
                              : answeredCount > 0
                              ? 'text-amber-400'
                              : 'text-zinc-300'
                          }`}
                        >
                          {scorePercent}% ({correctCount}/{totalQuestions || 0} corrette)
                        </span>
                      </div>

                      <div>
                        {isPassed ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-bold flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> REQUISITO 80% SUPERATO • PREMIO SBLOCCATO
                          </span>
                        ) : answeredCount === totalQuestions && totalQuestions > 0 ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-800 font-bold flex items-center gap-1 text-[11px]">
                            <AlertCircle className="w-3.5 h-3.5" /> SOTTO L'80% • RIPROVA O RIGENERA IL TEST
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-[11px]">
                            Rispondi a tutte le domande (minimo 80% per sbloccare l'assolo)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Empty State if no questions yet */}
                    {totalQuestions === 0 && !isGeneratingQuiz && (
                      <div className="text-center py-6 space-y-3 bg-[#09090b] rounded-xl border border-dashed border-zinc-800 p-6">
                        <Bot className="w-8 h-8 text-indigo-400 mx-auto" />
                        <p className="text-xs font-mono text-zinc-300">
                          Nessun test attivo per questo modulo. Clicca sul pulsante per fare generare all'IA un test a risposta multipla su misura!
                        </p>
                        <button
                          onClick={() => handleGenerateTheoryQuiz(activeTheoryModal)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all inline-flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          GENERA TEST DI VERIFICA CON L'IA
                        </button>
                      </div>
                    )}

                    {/* Questions Rendering */}
                    {totalQuestions > 0 && (
                      <div className="space-y-6">
                        {activeQuestions.map((quiz, qIdx) => {
                          const selectedOpt = userQuizAnswers[quiz.id];
                          const isAnswered = selectedOpt !== undefined;
                          const isCorrect = selectedOpt === quiz.correctIndex;
                          const isWrong = isAnswered && !isCorrect;

                          return (
                            <div key={quiz.id} className="space-y-3 bg-[#09090b] p-4 rounded-xl border border-zinc-800">
                              <p className="text-xs sm:text-sm font-mono font-bold text-zinc-200">
                                {qIdx + 1}. {quiz.question}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {quiz.options.map((opt, optIdx) => {
                                  let btnClass = 'bg-[#151518] border-zinc-700 text-zinc-300 hover:border-zinc-500 cursor-pointer';
                                  if (isAnswered) {
                                    if (optIdx === quiz.correctIndex) {
                                      btnClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold cursor-default';
                                    } else if (optIdx === selectedOpt && isWrong) {
                                      btnClass = 'bg-red-950/70 border-red-500 text-red-200 font-bold cursor-default';
                                    } else {
                                      btnClass = 'bg-[#121215] border-zinc-800 text-zinc-500 opacity-60 cursor-default';
                                    }
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      disabled={isAnswered}
                                      onClick={() => handleSelectQuizOption(quiz.id, optIdx, quiz.correctIndex, activeTheoryModal)}
                                      className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-start gap-2 ${btnClass}`}
                                    >
                                      <span className="w-5 h-5 rounded-md bg-black/40 flex items-center justify-center shrink-0 text-[10px] font-bold">
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span className="flex-1">{opt}</span>
                                      {isAnswered && optIdx === selectedOpt && (
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/50 shrink-0">
                                          Tua Risposta
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Instant Feedback & AI Coach Help Button */}
                              {isCorrect && (
                                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 pt-1">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  <span>Esatto! {quiz.explanation}</span>
                                </div>
                              )}

                              {isWrong && (
                                <div className="space-y-2 pt-1">
                                  <div className="text-xs font-mono text-red-400 flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                      <AlertCircle className="w-4 h-4 text-red-400" />
                                      Risposta errata. Risposta bloccata: riprova dall'inizio con "Ripeti Test" o chiedi al Coach!
                                    </span>

                                    <button
                                      onClick={() => {
                                        if (!isAiConfigured(apiSettings)) {
                                          if (onOpenSettings) onOpenSettings();
                                          return;
                                        }
                                        handleAskCoachForQuiz(
                                          activeTheoryModal.title,
                                          quiz.question,
                                          quiz.options[selectedOpt],
                                          quiz.options[quiz.correctIndex],
                                          quiz.id
                                        );
                                      }}
                                      disabled={loadingExplanation[quiz.id]}
                                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono flex items-center gap-1 transition-colors ${
                                        !isAiConfigured(apiSettings)
                                          ? 'bg-zinc-800/80 hover:bg-zinc-700 border-zinc-700 text-zinc-400'
                                          : 'bg-red-950/80 hover:bg-red-900 border-red-800 text-red-300'
                                      }`}
                                      title={!isAiConfigured(apiSettings) ? 'Richiede configurazione IA nelle Impostazioni' : 'Chiedi spiegazione al Coach IA'}
                                    >
                                      <Bot className="w-3.5 h-3.5" />
                                      {loadingExplanation[quiz.id]
                                        ? 'Coach in streaming...'
                                        : !isAiConfigured(apiSettings)
                                        ? 'Coach (Configura IA)'
                                        : 'Spiegazione del Coach IA'}
                                    </button>
                                  </div>

                                  {aiExplanations[quiz.id] && (
                                    <div className="bg-[#140b0d] border border-red-900/40 rounded-xl p-3 text-xs text-zinc-200 font-sans animate-in fade-in">
                                      <div className="font-mono font-bold text-red-400 flex items-center justify-between gap-1.5 mb-2 text-[11px]">
                                        <span className="flex items-center gap-1.5">
                                          <Bot className="w-3.5 h-3.5" /> SPIEGAZIONE DEL COACH:
                                        </span>
                                        {loadingExplanation[quiz.id] && (
                                          <span className="flex items-center gap-1 text-[10px] text-amber-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                                            in streaming...
                                          </span>
                                        )}
                                      </div>
                                      <div className="relative">
                                        <MarkdownRenderer content={aiExplanations[quiz.id]} className="text-xs" />
                                        {loadingExplanation[quiz.id] && (
                                          <span className="inline-block w-1.5 h-3.5 bg-red-500 ml-1 animate-pulse align-middle" />
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer with Unlocked/Locked Theory Prize */}
            <div className="p-4 bg-[#09090b] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-400">
                Ricompensa: <strong className="text-red-400">+{activeTheoryModal.xpReward} XP</strong>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {(() => {
                  const activeQuestions =
                    dynamicQuizzes[activeTheoryModal.id] ||
                    theoryQuizzesByModuleId[activeTheoryModal.id] ||
                    [];
                  const totalQuestions = activeQuestions.length;
                  let answeredCount = 0;
                  let correctCount = 0;

                  activeQuestions.forEach((q) => {
                    const ans = userQuizAnswers[q.id];
                    if (ans !== undefined) {
                      answeredCount++;
                      if (ans === q.correctIndex) correctCount++;
                    }
                  });

                  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
                  const isPassed =
                    (hunterProfile.passedQuizModuleIds || []).includes(activeTheoryModal.id) ||
                    (answeredCount === totalQuestions && totalQuestions > 0 && scorePercent >= 80);

                  if (isPassed) {
                    return (
                      <div className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        TEST SUPERATO ({scorePercent}%)
                      </div>
                    );
                  }

                  if (totalQuestions === 0) {
                    return (
                      <button
                        onClick={() => handleGenerateTheoryQuiz(activeTheoryModal)}
                        disabled={generatingQuizForModuleId === activeTheoryModal.id}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 cursor-pointer"
                        title="Genera il test a risposta multipla per verificare l'apprendimento e sbloccare i punti XP"
                      >
                        <GraduationCap className="w-4 h-4" />
                        {generatingQuizForModuleId === activeTheoryModal.id
                          ? 'GENERAZIONE TEST IA...'
                          : 'GENERA TEST DI VERIFICA'}
                      </button>
                    );
                  }

                  return (
                    <div
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono text-xs font-bold flex items-center justify-center gap-2"
                      title="Completa il test con almeno l'80% di risposte esatte per sbloccare i punti XP"
                    >
                      <Lock className="w-4 h-4 text-zinc-600" />
                      SOGLIA XP: {scorePercent}% / 80% RICHIESTO
                    </div>
                  );
                })()}

                {(() => {
                  const isCompleted = hunterProfile.completedTheoryModuleIds.includes(activeTheoryModal.id);
                  const activeQuestions =
                    dynamicQuizzes[activeTheoryModal.id] ||
                    theoryQuizzesByModuleId[activeTheoryModal.id] ||
                    [];
                  const totalQuestions = activeQuestions.length;
                  let answeredCount = 0;
                  let correctCount = 0;

                  activeQuestions.forEach((q) => {
                    const ans = userQuizAnswers[q.id];
                    if (ans !== undefined) {
                      answeredCount++;
                      if (ans === q.correctIndex) correctCount++;
                    }
                  });

                  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
                  const isPassed =
                    (hunterProfile.passedQuizModuleIds || []).includes(activeTheoryModal.id) ||
                    (answeredCount === totalQuestions && totalQuestions > 0 && scorePercent >= 80);

                  if (isCompleted) {
                    return (
                      <button
                        disabled
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 opacity-90 cursor-default"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        LEZIONE COMPLETATA (+{activeTheoryModal.xpReward} XP)
                      </button>
                    );
                  }

                  if (isPassed) {
                    return (
                      <button
                        onClick={() => {
                          handleCompleteTheory(activeTheoryModal);
                          setActiveTheoryModal(null);
                        }}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 active:scale-95"
                        title="Hai superato il test con successo (≥80%)! Clicca per completare la lezione e riscattare l'esperienza."
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        RISCATTA +{activeTheoryModal.xpReward} XP (COMPLETA LEZIONE)
                      </button>
                    );
                  }

                  return (
                    <button
                      disabled
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed opacity-80"
                      title="Completa il test con almeno l'80% di risposte esatte per riscattare l'esperienza di questa lezione"
                    >
                      <Lock className="w-4 h-4 text-zinc-600" />
                      RISCATTA XP BLOCCATO (SERVE ≥80% AL TEST)
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: TECHNIQUE EXERCISE TAB & TIPS VIEWER */}
      {activeExerciseModal && (() => {
        const userPr = hunterProfile.exercisePRs[activeExerciseModal.id]?.maxBpm || 0;
        const isVirtuosoAchieved = userPr >= activeExerciseModal.targetBpm;
        const percentVirtuoso = Math.min(100, Math.round((userPr / activeExerciseModal.targetBpm) * 100));

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
            <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-5 bg-[#09090b] border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-red-400">
                      {activeExerciseModal.difficultyRank} • {activeExerciseModal.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{activeExerciseModal.title}</h3>
                </div>
                <button
                  onClick={() => setActiveExerciseModal(null)}
                  className="text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg hover:bg-zinc-900"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                {/* Embedded YouTube Video Player if exercise has a YouTube ID */}
                {activeExerciseModal.youtubeId && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                        <Video className="w-4 h-4" />
                        VIDEO LEZIONE INTERATTIVA CON TABLATURA INTEGRATA
                      </span>
                      {activeExerciseModal.channelName && (
                        <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                          Canale Ufficiale: <strong className="text-zinc-200">{activeExerciseModal.channelName}</strong>
                        </span>
                      )}
                    </div>

                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeExerciseModal.youtubeId}?rel=0`}
                        title={activeExerciseModal.title}
                        className="absolute top-0 left-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Graphical Tablature or Authentic PDF (e.g. JTC Mantovanelli) */}
                {((activeExerciseModal.measures && activeExerciseModal.measures.length > 0) ||
                  activeExerciseModal.pdfUrl ||
                  activeExerciseModal.id.startsWith('ex-jtc')) && (
                  <TabViewer
                    exerciseId={activeExerciseModal.id}
                    exerciseTitle={activeExerciseModal.title}
                    pdfUrl={activeExerciseModal.pdfUrl}
                    pdfStartPage={activeExerciseModal.pdfStartPage || 2}
                    measures={activeExerciseModal.measures || []}
                    tuning={activeExerciseModal.tuning}
                    tempoBpm={activeExerciseModal.defaultBpm}
                    interactivePlayback={true}
                  />
                )}

                {/* Embedded Interactive Metronome so user can practice right here while watching the video */}
                <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4" />
                      METRONOMO INTEGRATO PER STUDIO SUL VIDEO
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      BPM Base: <strong className="text-zinc-200">{activeExerciseModal.defaultBpm}</strong> ➔ Target Virtuoso: <strong className="text-red-400">{activeExerciseModal.targetBpm} BPM</strong>
                    </span>
                  </div>
                  <MetronomeBar initialBpm={activeExerciseModal.defaultBpm} isFloating={false} />
                </div>

                {/* Biomechanical & Postural Focus */}
                {activeExerciseModal.biomechanicalFocus && (
                  <div className="bg-amber-950/25 border border-amber-700/50 rounded-xl p-4 space-y-2 shadow-md">
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      FOCUS BIOMECCANICO & ALLINEAMENTO TENDINEO:
                    </span>
                    <p className="text-xs text-zinc-200 font-mono leading-relaxed">
                      {activeExerciseModal.biomechanicalFocus}
                    </p>
                  </div>
                )}

                {/* Description & Muscle Focus */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-mono font-bold text-zinc-300 block">
                      DESCRIZIONE & OBIETTIVO
                    </span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {activeExerciseModal.description}
                    </p>
                  </div>

                  <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-mono font-bold text-red-400 block">
                      ANATOMIA & FOCUS MECCANICO
                    </span>
                    <p className="text-xs text-zinc-300 font-mono">
                      {activeExerciseModal.focusMuscles}
                    </p>
                  </div>
                </div>

                {/* Technical Tips */}
                <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold font-mono text-red-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    CONSIGLI DI ESECUZIONE DEL COACH:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside font-sans">
                    {activeExerciseModal.tips.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* VIRTUOSO REWARD UNLOCK BOX (ACTIVATES ONLY AT TARGET VIRTUOSO BPM) */}
                <div className="bg-[#121216] border border-amber-900/50 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Trophy className={`w-4 h-4 ${isVirtuosoAchieved ? 'text-amber-400' : 'text-zinc-500'}`} />
                        <h4 className="text-xs font-mono font-bold text-amber-300 uppercase">
                          Target Virtuoso per il Premio del Blocco
                        </h4>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400 leading-relaxed">
                        Questo esercizio contribuisce allo sblocco dell'<strong>Assolo Maestro del Blocco</strong>: il premio si sblocca quando <strong>tutti gli esercizi del blocco</strong> raggiungono il loro Target Virtuoso BPM.
                      </p>
                    </div>

                    <div className="shrink-0">
                      {isVirtuosoAchieved ? (
                        <div className="px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          TARGET ESERCIZIO CONQUISTATO!
                        </div>
                      ) : (
                        <div className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs font-medium flex items-center gap-2">
                          <Lock className="w-4 h-4 text-zinc-500" />
                          Target: {activeExerciseModal.targetBpm} BPM
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar towards virtuoso BPM */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-400">
                        Record Attuale: <strong className="text-zinc-100">{userPr} BPM</strong>
                      </span>
                      <span className={isVirtuosoAchieved ? 'text-amber-400 font-bold' : 'text-red-400'}>
                        Target Virtuoso: {activeExerciseModal.targetBpm} BPM ({percentVirtuoso}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isVirtuosoAchieved ? 'bg-amber-400' : 'bg-red-600'
                        }`}
                        style={{ width: `${percentVirtuoso}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#09090b] border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">
                  Target Virtuoso: <strong className="text-red-400">{activeExerciseModal.targetBpm} BPM</strong>
                </span>

                <button
                  onClick={() => {
                    const ex = activeExerciseModal;
                    setActiveExerciseModal(null);
                    onStartSingleExerciseWorkout(ex);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-950/50 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Dumbbell className="w-4 h-4" />
                  AVVIA ALLENAMENTO CON QUESTO ESERCIZIO
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MODAL 3: BOSS FIGHT ARENA (MR. TABS & SONGSTERR OFFICIAL HUBS) */}
      {activeBossModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 bg-[#09090b] border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-black px-2.5 py-1 rounded border ${getBossRankBadgeStyle(activeBossModal.rank)}`}>
                  {activeBossModal.rank} BOSS
                </span>
                {activeBossModal.type === 'full_song' ? (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-700">
                    CANZONE INTERA
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700">
                    ASSOLO COMPLETO
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">{activeBossModal.title}</h3>
                  <p className="text-xs font-mono text-red-400">
                    {activeBossModal.artist} • {activeBossModal.albumYear}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveBossModal(null);
                }}
                className="text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg hover:bg-zinc-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* 1. EMBEDDED YOUTUBE PLAYER (VIDEO & PLAY-ALONG IN APP CON OPZIONE DI SOSTITUZIONE CANALE) */}
              {(() => {
                const isCustomVideo = Boolean(hunterProfile.customBossVideos?.[activeBossModal.id]);
                const ytId = getEffectiveBossYoutubeId(activeBossModal, hunterProfile.customBossVideos);
                const progress = hunterProfile.bossTrainingProgress?.[activeBossModal.id];

                return (
                  <div className="space-y-4">
                    {/* YouTube Player Box */}
                    <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-800/40">
                            <Video className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-mono font-bold text-zinc-100 flex items-center gap-1.5">
                                VIDEO & PLAY-ALONG DIRETTO NELL'APP
                              </h4>
                              {isCustomVideo && (
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 font-bold">
                                  CANALE PERSONALIZZATO
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-zinc-400">
                              {isCustomVideo
                                ? 'Video sostituito con canale/link YouTube personalizzato dell\'utente'
                                : (activeBossModal.youtubeChannelName
                                    ? `Canale YouTube: ${activeBossModal.youtubeChannelName}`
                                    : 'Tutorial con tablatura scorrevole sincronizzata')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() => {
                              setCustomVideoInputBossId(
                                customVideoInputBossId === activeBossModal.id ? null : activeBossModal.id
                              );
                              setCustomVideoInputValue(hunterProfile.customBossVideos?.[activeBossModal.id] || '');
                              setCustomVideoError(null);
                            }}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="Sostituisci il video YouTube con il video del tuo canale preferito"
                          >
                            <Edit2 className="w-3 h-3 text-red-400" />
                            {isCustomVideo ? 'Modifica Link Video' : 'Sostituisci Video YouTube'}
                          </button>

                          {isCustomVideo && (
                            <button
                              type="button"
                              onClick={() => handleResetCustomVideo(activeBossModal.id)}
                              className="text-[11px] font-mono px-2 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-800 flex items-center gap-1 transition-colors cursor-pointer"
                              title="Ripristina il video tutorial predefinito del boss"
                            >
                              <RotateCcw className="w-3 h-3" /> Ripristina Default
                            </button>
                          )}

                          {ytId && (
                            <a
                              href={`https://www.youtube.com/watch?v=${ytId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors"
                            >
                              Apri su YouTube <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Input Box for Custom YouTube Video Link */}
                      {customVideoInputBossId === activeBossModal.id && (
                        <div className="p-3.5 bg-[#140b0d] border border-red-900/70 rounded-xl space-y-2.5 text-xs animate-in fade-in">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-red-300 font-mono flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-red-400" /> Sostituisci Video (URL o ID YouTube):
                            </span>
                            <button
                              type="button"
                              onClick={() => setCustomVideoInputBossId(null)}
                              className="text-zinc-500 hover:text-zinc-300 px-1"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={customVideoInputValue}
                              onChange={(e) => {
                                setCustomVideoInputValue(e.target.value);
                                setCustomVideoError(null);
                              }}
                              placeholder="Incolla link YouTube (es. https://www.youtube.com/watch?v=... o https://youtu.be/...)"
                              className="flex-1 bg-black border border-zinc-700 focus:border-red-500 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none placeholder:text-zinc-600"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveCustomVideo(activeBossModal.id)}
                              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono font-bold rounded-lg transition-colors cursor-pointer text-xs"
                            >
                              Salva Video
                            </button>
                          </div>
                          {customVideoError && (
                            <div className="text-[11px] text-red-400 font-mono">{customVideoError}</div>
                          )}
                          <p className="text-[10px] font-mono text-zinc-400">
                            Il video sostituito sarà riprodotto direttamente qui nel riquadro dell'app e utilizzato in The Forge durante l'allenamento.
                          </p>
                        </div>
                      )}

                      {/* Video Player Display */}
                      {ytId ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-inner">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                            title={activeBossModal.youtubeTitle || activeBossModal.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        </div>
                      ) : (
                        <div className="p-8 text-center bg-black/60 rounded-xl border border-zinc-800 text-zinc-500 text-xs font-mono">
                          Nessun video YouTube impostato. Usa il pulsante "Sostituisci Video YouTube" per collegare il tuo video tutorial preferito.
                        </div>
                      )}
                    </div>

                    {/* Forge Training Progress Card (if user trained this boss in The Forge) */}
                    {progress && (
                      <div className="bg-[#0f0b18] border border-purple-900/70 rounded-2xl p-4 space-y-3 shadow-lg shadow-purple-950/20">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-900/40 pb-2.5">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-800/40">
                              <Dumbbell className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-mono font-bold text-purple-200 flex items-center gap-2">
                                PROGRESSI DI ALLENAMENTO NELLA FORGIA (THE FORGE)
                              </h4>
                              <span className="text-[10px] font-mono text-zinc-400">
                                Sessioni completate: <strong>{progress.sessionsCount}</strong> • Tempo totale: <strong>{Math.round(progress.totalTrainingSeconds / 60)} min</strong> ({progress.totalTrainingSeconds}s)
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-purple-300">
                            Ultimo workout: {new Date(progress.lastTrainedAt).toLocaleDateString('it-IT')}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                          <div className="bg-black/40 border border-purple-950 rounded-xl p-2.5">
                            <div className="text-[10px] font-mono text-zinc-400">Target BPM</div>
                            <div className="text-sm font-bold text-zinc-200 font-mono">{progress.lastTargetBpm} BPM</div>
                          </div>
                          <div className="bg-black/40 border border-purple-950 rounded-xl p-2.5">
                            <div className="text-[10px] font-mono text-zinc-400">Max BPM Raggiunto</div>
                            <div className="text-sm font-bold text-amber-400 font-mono">{progress.maxAchievedBpm} BPM</div>
                          </div>
                          <div className="bg-black/40 border border-purple-950 rounded-xl p-2.5">
                            <div className="text-[10px] font-mono text-zinc-400">Pulizia del Suono</div>
                            <div className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-1">
                              {'★'.repeat(progress.lastCleanlinessRating)}{'☆'.repeat(5 - progress.lastCleanlinessRating)}
                            </div>
                          </div>
                          <div className="bg-black/40 border border-purple-950 rounded-xl p-2.5">
                            <div className="text-[10px] font-mono text-zinc-400">BPM Ultima Sessione</div>
                            <div className="text-sm font-bold text-blue-400 font-mono">{progress.lastAchievedBpm} BPM</div>
                          </div>
                        </div>

                        {progress.notes && (
                          <div className="bg-black/50 border border-purple-950/80 rounded-xl p-3 text-xs text-zinc-200 font-mono">
                            <span className="text-purple-400 font-bold mr-1.5">Note di Allenamento:</span>
                            {progress.notes}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quick Forge Launch Action */}
                    <div className="p-3 bg-gradient-to-r from-purple-950/40 via-[#100c18] to-zinc-900 border border-purple-800/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Dumbbell className="w-4 h-4 text-purple-400 shrink-0" />
                        <div className="text-xs">
                          <span className="font-bold text-zinc-200">Allenati su questo brano in The Forge</span>
                          <p className="text-[11px] font-mono text-zinc-400">
                            Pratica con metronomo, traccia serie per serie BPM reale, durata, pulizia sonora e note personali.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleStartBossWorkout(activeBossModal);
                          setActiveBossModal(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-purple-950/50 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
                      >
                        <Dumbbell className="w-3.5 h-3.5" />
                        ALLENA NELLA FORGIA
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* 2. PRIMARY OFFICIAL SOURCES (YOUTUBE / MR. TABS & SONGSTERR) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    FONTI E COLLEGAMENTI UFFICIALI PER LO STUDIO DEL BRANO:
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Video tutorial + Tablatura interattiva
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* YOUTUBE DEDICATED HUB CARD */}
                  <div className="bg-[#12080a] border border-red-900/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg shadow-red-950/20">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-800/40">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-mono font-bold text-zinc-100 flex items-center gap-1.5">
                              {activeBossModal.youtubeChannelName || 'Mr. Tabs'} (YouTube)
                              <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                            </h4>
                            <span className="text-[10px] font-mono text-red-400">
                              {activeBossModal.youtubeChannelName
                                ? `Canale Selezionato: ${activeBossModal.youtubeChannelName}`
                                : 'Canale Ufficiale Video Tutorial'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                          VIDEO & TAB
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {activeBossModal.youtubeTitle
                          ? `Guarda il video "${activeBossModal.youtubeTitle}" con tablatura sincronizzata a schermo e play-along.`
                          : 'Video lezione completa con tablatura scorrevole sincronizzata, diteggiatura reale delle mani sul manico e audio originale di riferimento.'}
                      </p>

                      <div className="bg-black/50 border border-red-900/40 rounded-xl p-3 space-y-1">
                        <div className="text-[11px] font-mono text-zinc-400">
                          Video tutorial associato:
                        </div>
                        <div className="text-xs font-mono font-bold text-red-300 truncate">
                          {activeBossModal.youtubeTitle || `${activeBossModal.artist} - ${activeBossModal.title}`}
                        </div>
                      </div>
                    </div>

                    <a
                      href={activeBossModal.mrTabsUrl || (activeBossModal.youtubeId ? `https://www.youtube.com/watch?v=${activeBossModal.youtubeId}` : undefined)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-all hover:scale-[1.01] active:scale-95"
                    >
                      <Video className="w-4 h-4" />
                      APRI VIDEO SU YOUTUBE ↗
                    </a>
                  </div>

                  {/* SONGSTERR DEDICATED HUB CARD */}
                  <div className="bg-[#08120c] border border-emerald-900/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg shadow-emerald-950/20">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-800/40">
                            <FileCode className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-mono font-bold text-zinc-100 flex items-center gap-1.5">
                              Songsterr (Chitarra)
                              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                            </h4>
                            <span className="text-[10px] font-mono text-emerald-400">Tablatura Interattiva Ufficiale</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          MULTI-TRACCIA
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Partitura completa interattiva con <strong>traccia per chitarra isolata</strong>, regolazione fine del tempo (50%-100%), loop per battuta e diteggiature.
                      </p>

                      <div className="bg-black/50 border border-emerald-900/40 rounded-xl p-3 space-y-1">
                        <div className="text-[11px] font-mono text-zinc-400">
                          Ricerca filtrata per chitarra:
                        </div>
                        <div className="text-xs font-mono font-bold text-emerald-300 truncate">
                          {activeBossModal.artist} - {activeBossModal.title} (Guitar Tabs)
                        </div>
                      </div>
                    </div>

                    <a
                      href={activeBossModal.songsterrUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.01] active:scale-95"
                    >
                      <FileCode className="w-4 h-4" />
                      APRI TABLATURA COMPLETA SU SONGSTERR ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* 3. PERSONAL ATTACHED TAB / SCORE SECTION (PDF / IMAGE / FILE) */}
              {(() => {
                const attachedTab = hunterProfile.bossUploadedTabs?.[activeBossModal.id] || activeBossModal.customTabFile;

                return (
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-mono font-bold text-zinc-100 flex items-center gap-2">
                            PARTITURA / TABLATURA PERSONALE ALLEGATA
                            {attachedTab && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                                ATTIVA
                              </span>
                            )}
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-400">
                            Carica o visualizza il tuo file personale di partitura o tab (PDF, Immagine, TXT) per questo Boss
                          </span>
                        </div>
                      </div>

                      {attachedTab && (
                        <button
                          onClick={() => handleRemoveAttachedTab(activeBossModal.id)}
                          className="text-[11px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-950/40 transition-colors"
                          title="Rimuovi la partitura allegata da questo Boss"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Rimuovi
                        </button>
                      )}
                    </div>

                    {attachedTab ? (
                      <div className="bg-black/50 border border-amber-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="text-xs font-mono font-bold text-zinc-100 truncate block">
                              {attachedTab.name}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2 flex-wrap">
                            <span>Dimensione: <strong>{attachedTab.fileSize || 'N/D'}</strong></span>
                            <span>•</span>
                            <span>Caricato: {attachedTab.uploadedAt || 'Recente'}</span>
                            <span>•</span>
                            <span className="uppercase text-amber-400/90 font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-900/60">
                              {attachedTab.type.includes('pdf') ? 'PDF' : attachedTab.type.includes('image') ? 'IMMAGINE' : 'DOCUMENTO'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => setViewingScoreModal(attachedTab)}
                            className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-950/40 cursor-pointer"
                            title="Apri e visualizza a schermo intero il file partitura"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            VISUALIZZA
                          </button>

                          <a
                            href={attachedTab.dataUrl}
                            download={attachedTab.name}
                            className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-zinc-700"
                            title="Scarica il file sul tuo dispositivo"
                          >
                            <Download className="w-3.5 h-3.5" />
                            SCARICA
                          </a>

                          <label className="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 border border-zinc-700 cursor-pointer">
                            <FileUp className="w-3.5 h-3.5 text-zinc-400" />
                            SOSTITUISCI
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.gp,.gpx,.gp5"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleAttachTabFile(activeBossModal.id, file);
                                e.target.value = '';
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-zinc-800 hover:border-amber-500/60 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-black/30 hover:bg-amber-950/10 group">
                        <Upload className="w-7 h-7 text-zinc-500 group-hover:text-amber-400 transition-colors mb-2" />
                        <span className="text-xs font-mono font-bold text-zinc-200 group-hover:text-amber-300">
                          Carica il file della Partitura o Tablatura per questo Boss
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500 mt-1">
                          Trascina o clicca qui per selezionare un file (PDF, Immagine PNG/JPG, TXT, Guitar Pro)
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.gp,.gpx,.gp5"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleAttachTabFile(activeBossModal.id, file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                    )}
                  </div>
                );
              })()}

              {/* SONG SPECIFICATIONS & BATTLE BLUEPRINT */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block">ACCORDATURA RICHIESTA:</span>
                  <p className="text-xs font-mono font-bold text-amber-300">
                    {activeBossModal.tuning}
                  </p>
                </div>

                <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block">TEMPO ORIGINALE:</span>
                  <p className="text-xs font-mono font-bold text-zinc-200">
                    {activeBossModal.tempoBpm} BPM ({activeBossModal.genre})
                  </p>
                </div>

                <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block">STATUS VITTORIA:</span>
                  <p className={`text-xs font-mono font-bold ${
                    hunterProfile.defeatedBossIds.includes(activeBossModal.id)
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  }`}>
                    {hunterProfile.defeatedBossIds.includes(activeBossModal.id)
                      ? '✓ Sconfitto e Conquistato'
                      : '⚔️ Da Battere'}
                  </p>
                </div>
              </div>

              {/* Breakdown Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-mono font-bold text-zinc-300 block">
                    PERCHÉ QUESTO BRANO (CHALLENGE):
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {activeBossModal.whyThisSong}
                  </p>
                </div>

                <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-mono font-bold text-red-400 block">
                    ABILITÀ E TECNICHE DA PADRONEGGIARE:
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside font-mono">
                    {activeBossModal.requiredSkills.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer with PDF Lick, Defeat / Victory Trigger & Custom Delete */}
            <div className="p-4 bg-[#09090b] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400">
                  XP Boss Fight: <strong className="text-red-400">+{activeBossModal.xpReward} XP</strong>
                </span>

                {activeBossModal.isCustomImported && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Sei sicuro di voler eliminare il Boss personalizzato "${activeBossModal.title}"?`)) {
                        handleDeleteCustomBoss(activeBossModal.id);
                        setActiveBossModal(null);
                      }
                    }}
                    className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Elimina questo boss importato dalla tua lista"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    ELIMINA BOSS IMPORTATO
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {hunterProfile.defeatedBossIds.includes(activeBossModal.id) ? (
                  <button
                    onClick={() => handleClaimBossPrize(activeBossModal)}
                    disabled={generatingPrize}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 cursor-pointer"
                    title="Boss sconfitto! Scarica l'Assolo Premio del Boss in PDF"
                  >
                    <Download className="w-4 h-4" />
                    {generatingPrize ? 'GENERAZIONE ASSOLO IA...' : 'SCARICA ASSOLO PREMIO BOSS (PDF)'}
                  </button>
                ) : (
                  <div
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono text-xs font-semibold flex items-center justify-center gap-2"
                    title="Sconfiggi il Boss registrando la vittoria per sbloccare l'Assolo Premio in PDF"
                  >
                    <Lock className="w-3.5 h-3.5 text-zinc-600" />
                    PREMIO BLOCCATO (BATTI IL BOSS)
                  </div>
                )}

                <button
                  onClick={() => {
                    handleDefeatBoss(activeBossModal);
                    setActiveBossModal(null);
                  }}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    hunterProfile.defeatedBossIds.includes(activeBossModal.id)
                      ? 'bg-red-950/40 border border-red-900/50 text-red-300'
                      : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50 active:scale-95'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  {hunterProfile.defeatedBossIds.includes(activeBossModal.id)
                    ? 'REGISTRA DI NUOVO VITTORIA'
                    : 'REGISTRA VITTORIA SUL BOSS (+XP)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: IMPORT CUSTOM BOSS MODAL (CANONICO O FANDOM) */}
      {isImportBossModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 bg-[#09090b] border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-md">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    IMPORTA NUOVO BOSS
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      CANZONE O ASSOLO
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Aggiungi qualsiasi brano canonico o fandom con video YouTube, Songsterr e partitura allegata
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsImportBossModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg hover:bg-zinc-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Body */}
            <div className="p-6 space-y-4 overflow-y-auto">
              {/* Category & Type selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1.5">
                    CATEGORIA DESTINAZIONE:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setImportForm(prev => ({ ...prev, category: 'official' }))}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        importForm.category === 'official'
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-950/40'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      <Swords className="w-3.5 h-3.5" />
                      BOSS CANONICO
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportForm(prev => ({ ...prev, category: 'fandom' }))}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        importForm.category === 'fandom'
                          ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-950/40'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      <Gamepad2 className="w-3.5 h-3.5" />
                      CANZONE FANDOM
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1.5">
                    TIPOLOGIA:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setImportForm(prev => ({ ...prev, type: 'full_song' }))}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        importForm.type === 'full_song'
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-950/40'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      CANZONE INTERA
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportForm(prev => ({ ...prev, type: 'full_solo' }))}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        importForm.type === 'full_solo'
                          ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-950/40'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      ASSOLO COMPLETO
                    </button>
                  </div>
                </div>
              </div>

              {/* Title & Artist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                    TITOLO DEL BRANO / ASSOLO <span className="text-red-400">*</span>:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Es. Through the Fire and Flames"
                    value={importForm.title}
                    onChange={(e) => setImportForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                    ARTISTA / BAND / SAGA <span className="text-red-400">*</span>:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Es. DragonForce o Undertale OST"
                    value={importForm.artist}
                    onChange={(e) => setImportForm(prev => ({ ...prev, artist: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Fandom Universe & Rank */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                    DIFFICOLTÀ (RANK):
                  </label>
                  <select
                    value={importForm.rank}
                    onChange={(e) => setImportForm(prev => ({ ...prev, rank: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="E-Rank">E-Rank (Fondamentale / Introduttivo)</option>
                    <option value="D-Rank">D-Rank (Elementare / Primi cambi)</option>
                    <option value="C-Rank">C-Rank (Intermedio / Estensioni e scale)</option>
                    <option value="B-Rank">B-Rank (Avanzato / Velocità e pattern)</option>
                    <option value="A-Rank">A-Rank (Virtuoso / Shred estremo)</option>
                    <option value="S-Rank">S-Rank (Master / Workout estremo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                    TEMPO (BPM):
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="350"
                    value={importForm.tempoBpm}
                    onChange={(e) => setImportForm(prev => ({ ...prev, tempoBpm: parseInt(e.target.value) || 120 }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                    {importForm.category === 'fandom' ? 'SAGA / UNIVERSO:' : 'ANNO / EPOCA:'}
                  </label>
                  <input
                    type="text"
                    placeholder={importForm.category === 'fandom' ? 'Es. Anime, Gaming, Souls' : 'Es. 1986, 2024'}
                    value={importForm.category === 'fandom' ? importForm.fandomUniverse : importForm.albumYear}
                    onChange={(e) => {
                      if (importForm.category === 'fandom') {
                        setImportForm(prev => ({ ...prev, fandomUniverse: e.target.value }));
                      } else {
                        setImportForm(prev => ({ ...prev, albumYear: e.target.value }));
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Tuning & Genre */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                    ACCORDATURA:
                  </label>
                  <input
                    type="text"
                    placeholder="Es. E Standard, Drop D, Half-Step Down"
                    value={importForm.tuning}
                    onChange={(e) => setImportForm(prev => ({ ...prev, tuning: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                    GENERE / STILE:
                  </label>
                  <input
                    type="text"
                    placeholder="Es. Power Metal, J-Rock, Shred, Neo-Classical"
                    value={importForm.genre}
                    onChange={(e) => setImportForm(prev => ({ ...prev, genre: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Links: YouTube and Songsterr */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-red-400" />
                      LINK VIDEO YOUTUBE O ID VIDEO:
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Riquadro integrato nell'app
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Es. https://www.youtube.com/watch?v=0jgrCKhxE1s oppure 0jgrCKhxE1s"
                    value={importForm.youtubeUrl}
                    onChange={(e) => setImportForm(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 mb-1 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    LINK SONGSTERR O ALTRO SITO PER TABS:
                  </label>
                  <input
                    type="text"
                    placeholder="Es. https://www.songsterr.com/a/wsa/dragonforce-through-the-fire-and-flames-tab-s12384"
                    value={importForm.songsterrUrl}
                    onChange={(e) => setImportForm(prev => ({ ...prev, songsterrUrl: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* File Upload for Partitura / Tab */}
              <div className="pt-2">
                <label className="block text-xs font-mono font-bold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  ALLEGA PARTITURA / TABLATURA PERSONALE (OPZIONALE):
                </label>

                {importForm.customTabFile ? (
                  <div className="bg-amber-950/20 border border-amber-800/50 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-xs font-mono font-bold text-zinc-100 block">
                          {importForm.customTabFile.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {importForm.customTabFile.fileSize} • {importForm.customTabFile.type}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImportForm(prev => ({ ...prev, customTabFile: null }))}
                      className="text-xs font-mono text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/30"
                    >
                      Rimuovi
                    </button>
                  </div>
                ) : (
                  <label className="border border-dashed border-zinc-800 hover:border-amber-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-zinc-900/40 hover:bg-amber-950/10 transition-colors">
                    <Upload className="w-6 h-6 text-zinc-500 mb-1.5" />
                    <span className="text-xs font-mono text-zinc-300">
                      Carica file partitura (PDF, PNG, JPG, Guitar Pro, TXT)
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.gp,.gpx,.gp5"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const dataUrl = event.target?.result as string;
                            setImportForm(prev => ({
                              ...prev,
                              customTabFile: {
                                name: file.name,
                                type: file.type || 'application/octet-stream',
                                dataUrl,
                                fileSize: `${(file.size / 1024).toFixed(1)} KB`,
                                uploadedAt: new Date().toLocaleDateString('it-IT')
                              }
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Description / Tech Notes */}
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-300 mb-1">
                  NOTE TECNICHE / ABILITÀ RICHIESTE:
                </label>
                <textarea
                  rows={2}
                  placeholder="Es. Sweep picking a 5 corde, tapping a due mani, alternate picking a 180 BPM..."
                  value={importForm.description}
                  onChange={(e) => setImportForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#09090b] border-t border-zinc-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsImportBossModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs font-semibold cursor-pointer transition-colors"
              >
                ANNULLA
              </button>

              <button
                type="button"
                onClick={handleSaveImportedBoss}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/50 cursor-pointer transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                SALVA ED ENTRA IN ARENA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: SCORE VIEWER MODAL (VIEW PDF / IMAGE PARTITURA A SCHERMO INTERO) */}
      {viewingScoreModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-hidden animate-in fade-in">
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl max-w-5xl w-full h-[94vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#09090b] border-b border-zinc-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-zinc-100 truncate flex items-center gap-2">
                    {viewingScoreModal.name}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {viewingScoreModal.fileSize || 'Partitura'}
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Caricata il {viewingScoreModal.uploadedAt || 'recente'} • Visualizzatore Partitura
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={viewingScoreModal.dataUrl}
                  download={viewingScoreModal.name}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-mono text-xs font-bold flex items-center gap-1.5 border border-zinc-700 transition-colors"
                  title="Scarica partitura sul dispositivo"
                >
                  <Download className="w-3.5 h-3.5" />
                  SCARICA
                </a>

                <button
                  onClick={() => setViewingScoreModal(null)}
                  className="text-zinc-400 hover:text-zinc-100 p-2 rounded-lg hover:bg-zinc-900 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 p-4 bg-[#070709] overflow-auto flex items-center justify-center">
              {viewingScoreModal.type.includes('pdf') ? (
                <iframe
                  src={viewingScoreModal.dataUrl}
                  title={viewingScoreModal.name}
                  className="w-full h-full rounded-xl border border-zinc-800 bg-white"
                />
              ) : viewingScoreModal.type.includes('image') ? (
                <div className="w-full h-full flex items-center justify-center p-2 overflow-auto">
                  <img
                    src={viewingScoreModal.dataUrl}
                    alt={viewingScoreModal.name}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-lg border border-zinc-800"
                  />
                </div>
              ) : (
                <div className="text-center space-y-4 max-w-md p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
                  <FileText className="w-12 h-12 text-amber-400 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-200">{viewingScoreModal.name}</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      File tablatura/partitura ({viewingScoreModal.type}). Puoi scaricarlo e aprirlo nel tuo editor musicale preferito (es. Guitar Pro, TuxGuitar, MuseScore).
                    </p>
                  </div>
                  <a
                    href={viewingScoreModal.dataUrl}
                    download={viewingScoreModal.name}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold shadow-md shadow-amber-950/40"
                  >
                    <Download className="w-4 h-4" />
                    SCARICA FILE PARTITURA
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

