import { HunterProfile, WorkoutRoutine, WorkoutSessionLog, DifficultyRank, ApiSettings, LickPrize, TechniqueExercise, BossTrainingProgress } from '../types';
import { presetRoutines } from '../data/routinesData';

const STORAGE_KEYS = {
  PROFILE: 'guitar_leveling_profile_v2',
  ROUTINES: 'guitar_leveling_routines_v2',
  SESSION_LOGS: 'guitar_leveling_session_logs_v2',
  API_SETTINGS: 'guitar_leveling_api_settings_v2',
  METRONOME_SETTINGS: 'guitar_leveling_metronome_v2',
  CUSTOM_EXERCISES: 'guitar_leveling_custom_exercises_v2',
  FORGE_CHAT_MESSAGES: 'guitar_leveling_forge_chat_messages_v1',
};

export const DEFAULT_API_SETTINGS: ApiSettings = {
  baseUrl: 'https://openrouter.ai',
  model: '',
  apiKey: '',
  temperature: 0.7
};

export const INITIAL_HUNTER_PROFILE: HunterProfile = {
  name: 'Chitarrista Elettrico',
  level: 1,
  currentXp: 0,
  rank: 'E-Rank',
  hunterClass: 'Chitarrista Ritmico Novizio',
  streakDays: 1,
  lastPracticeDate: null,
  totalMinutesPracticed: 0,
  totalSessionsCompleted: 0,
  defeatedBossIds: [],
  completedTheoryModuleIds: [],
  passedQuizModuleIds: [],
  savedPrizes: [],
  exercisePRs: {
    'ex-spider-warmup': { maxBpm: 60, achievedAt: new Date().toISOString() },
  },
  customBossVideos: {},
  bossTrainingProgress: {},
  customTheoryLessons: []
};

export function getRankFromLevel(level: number): DifficultyRank {
  if (level >= 35) return 'S-Rank';
  if (level >= 25) return 'A-Rank';
  if (level >= 18) return 'B-Rank';
  if (level >= 10) return 'C-Rank';
  if (level >= 5) return 'D-Rank';
  return 'E-Rank';
}

export function getHunterClassFromLevel(level: number): string {
  if (level >= 40) return 'Leggenda della Chitarra';
  if (level >= 30) return 'Virtuoso del Manico';
  if (level >= 22) return 'Shredder d\'Élite';
  if (level >= 15) return 'Lead Guitarist Esperto';
  if (level >= 9) return 'Riff Master Adepto';
  if (level >= 4) return 'Apprendista del Manico';
  return 'Chitarrista Ritmico Novizio';
}

export function getXpForNextLevel(level: number): number {
  return Math.round(150 * Math.pow(1.22, level - 1));
}

export function loadHunterProfile(): HunterProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...INITIAL_HUNTER_PROFILE,
        ...parsed,
        defeatedBossIds: parsed.defeatedBossIds || [],
        completedTheoryModuleIds: parsed.completedTheoryModuleIds || [],
        passedQuizModuleIds: parsed.passedQuizModuleIds || [],
        savedPrizes: parsed.savedPrizes || [],
        exercisePRs: parsed.exercisePRs || { ...INITIAL_HUNTER_PROFILE.exercisePRs },
        customBossVideos: parsed.customBossVideos || {},
        bossTrainingProgress: parsed.bossTrainingProgress || {},
        customTheoryLessons: parsed.customTheoryLessons || []
      };
    }
  } catch (e) {
    console.error('Error loading profile:', e);
  }
  return INITIAL_HUNTER_PROFILE;
}

export function saveHunterProfile(profile: HunterProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile:', e);
  }
}

export function saveCustomBossVideo(profile: HunterProfile, bossId: string, customUrlOrId: string): HunterProfile {
  const updatedVideos = {
    ...(profile.customBossVideos || {}),
    [bossId]: customUrlOrId
  };
  const updated: HunterProfile = {
    ...profile,
    customBossVideos: updatedVideos
  };
  saveHunterProfile(updated);
  return updated;
}

export function removeCustomBossVideo(profile: HunterProfile, bossId: string): HunterProfile {
  const updatedVideos = { ...(profile.customBossVideos || {}) };
  delete updatedVideos[bossId];
  const updated: HunterProfile = {
    ...profile,
    customBossVideos: updatedVideos
  };
  saveHunterProfile(updated);
  return updated;
}

export function recordBossTrainingProgress(
  profile: HunterProfile,
  progressData: {
    bossId: string;
    bossTitle: string;
    targetBpm: number;
    achievedBpm: number;
    durationSeconds: number;
    cleanlinessRating: number;
    notes?: string;
  }
): HunterProfile {
  const prev = profile.bossTrainingProgress?.[progressData.bossId];
  const maxBpm = Math.max(prev?.maxAchievedBpm || 0, progressData.achievedBpm);
  const totalSeconds = (prev?.totalTrainingSeconds || 0) + progressData.durationSeconds;
  const sessionsCount = (prev?.sessionsCount || 0) + 1;

  const updatedProgress: Record<string, BossTrainingProgress> = {
    ...(profile.bossTrainingProgress || {}),
    [progressData.bossId]: {
      bossId: progressData.bossId,
      bossTitle: progressData.bossTitle,
      lastTargetBpm: progressData.targetBpm,
      lastAchievedBpm: progressData.achievedBpm,
      maxAchievedBpm: maxBpm,
      totalTrainingSeconds: totalSeconds,
      lastCleanlinessRating: progressData.cleanlinessRating,
      notes: progressData.notes !== undefined ? progressData.notes : (prev?.notes || ''),
      lastTrainedAt: new Date().toISOString(),
      sessionsCount
    }
  };

  const updated: HunterProfile = {
    ...profile,
    bossTrainingProgress: updatedProgress
  };
  saveHunterProfile(updated);
  return updated;
}

export function loadApiSettings(): ApiSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.API_SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate legacy provider/customEndpoint if baseUrl is not yet set
      let baseUrl = parsed.baseUrl;
      if (!baseUrl) {
        if (parsed.customEndpoint) {
          baseUrl = parsed.customEndpoint;
        } else if (parsed.provider === 'openai') {
          baseUrl = 'https://api.openai.com';
        } else if (parsed.provider === 'deepseek') {
          baseUrl = 'https://api.deepseek.com';
        } else if (parsed.provider === 'groq') {
          baseUrl = 'https://api.groq.com/openai';
        } else {
          baseUrl = 'https://openrouter.ai';
        }
      }

      return {
        ...DEFAULT_API_SETTINGS,
        ...parsed,
        baseUrl: baseUrl || 'https://openrouter.ai',
        model: parsed.model || '',
        apiKey: parsed.apiKey || ''
      };
    }
  } catch (e) {
    console.error('Error loading API settings:', e);
  }
  return DEFAULT_API_SETTINGS;
}

export function saveApiSettings(settings: ApiSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.API_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving API settings:', e);
  }
}

export function loadUserRoutines(): WorkoutRoutine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    if (raw) {
      const parsed: WorkoutRoutine[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const savedIds = new Set(parsed.map((r) => r.id));
        const missingPresets = presetRoutines.filter((p) => !savedIds.has(p.id));
        return [...parsed, ...missingPresets];
      }
    }
  } catch (e) {
    console.error('Error loading routines:', e);
  }
  return presetRoutines;
}

export function saveUserRoutines(routines: WorkoutRoutine[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));
  } catch (e) {
    console.error('Error saving routines:', e);
  }
}

export function loadCustomExercises(): TechniqueExercise[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXERCISES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading custom exercises:', e);
  }
  return [];
}

export function saveCustomExercises(exercises: TechniqueExercise[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXERCISES, JSON.stringify(exercises));
  } catch (e) {
    console.error('Error saving custom exercises:', e);
  }
}

export function extractYoutubeId(url: string): string | undefined {
  if (!url || typeof url !== 'string') return undefined;
  const trimmed = url.trim();
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const match = trimmed.match(regExp);
  if (match && match[1]) {
    return match[1];
  }
  // Check if user directly entered an 11-char ID
  if (/^[\w-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  return undefined;
}

export function loadSessionLogs(): WorkoutSessionLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION_LOGS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading logs:', e);
  }
  return [];
}

export function saveSessionLogs(logs: WorkoutSessionLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSION_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Error saving logs:', e);
  }
}

/**
 * Add XP and calculate level ups
 */
export function awardXpToProfile(
  profile: HunterProfile,
  xpEarned: number
): { updatedProfile: HunterProfile; didLevelUp: boolean; newLevel: number } {
  let { level, currentXp } = profile;
  currentXp += xpEarned;
  let didLevelUp = false;

  while (true) {
    const requiredForNext = getXpForNextLevel(level);
    if (currentXp >= requiredForNext) {
      currentXp -= requiredForNext;
      level += 1;
      didLevelUp = true;
    } else {
      break;
    }
  }

  const updatedProfile: HunterProfile = {
    ...profile,
    level,
    currentXp,
    rank: getRankFromLevel(level),
    hunterClass: getHunterClassFromLevel(level)
  };

  saveHunterProfile(updatedProfile);
  return { updatedProfile, didLevelUp, newLevel: level };
}

/**
 * Export all user data as JSON file for full backup
 */
export function exportUserDataJson(): string {
  const profile = loadHunterProfile();
  const routines = loadUserRoutines();
  const logs = loadSessionLogs();
  const apiSettings = loadApiSettings();

  const data = {
    exportDate: new Date().toISOString(),
    version: '2.0',
    profile,
    routines: routines.filter(r => !r.isPreset),
    sessionLogs: logs,
    apiSettings: {
      ...apiSettings,
      apiKey: apiSettings.apiKey ? '***' : '' // Mask key on export
    }
  };

  return JSON.stringify(data, null, 2);
}

/**
 * Import user data from JSON string
 */
export function importUserDataJson(jsonStr: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonStr);
    if (!data.profile) {
      return { success: false, message: 'File JSON non valido: profilo mancante.' };
    }
    if (data.profile) saveHunterProfile(data.profile);
    if (data.routines) saveUserRoutines(data.routines);
    if (data.sessionLogs) saveSessionLogs(data.sessionLogs);
    return { success: true, message: 'Dati importati con successo!' };
  } catch (e) {
    return { success: false, message: 'Errore di parsing del file JSON.' };
  }
}

export function resetAllUserData(): void {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.ROUTINES);
  localStorage.removeItem(STORAGE_KEYS.SESSION_LOGS);
  localStorage.removeItem(STORAGE_KEYS.API_SETTINGS);
  localStorage.removeItem(STORAGE_KEYS.FORGE_CHAT_MESSAGES);
}

export function loadForgeChatMessages<T = any>(): T[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FORGE_CHAT_MESSAGES);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveForgeChatMessages<T = any>(messages: T[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FORGE_CHAT_MESSAGES, JSON.stringify(messages));
  } catch (e) {
    console.warn('Failed to save Forge chat messages:', e);
  }
}

export function clearForgeChatMessages(): void {
  localStorage.removeItem(STORAGE_KEYS.FORGE_CHAT_MESSAGES);
}

