export type DifficultyRank = 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank';

export type TechniqueCategory =
  | 'Warm-Up & Finger Independence'
  | 'Alternate Picking'
  | 'Scale & 3NPS'
  | 'Legato & Hammer/Pull'
  | 'Economy & Sweep Picking'
  | 'String Skipping'
  | 'Tapping'
  | 'Bending, Vibrato & Harmonics'
  | 'Bending & Vibrato'
  | 'Modern Fusion & Hybrid Picking';

export type TheoryCategory =
  | 'Fondamenti & Tastiera'
  | 'Intervalli & Ear Training'
  | 'Triadi, Quadriadi & Rivolti'
  | 'Scale Pentatoniche & Blues'
  | 'Scale Maggiori, Minori & Modi'
  | 'Armonia Rock & Progressioni'
  | 'Fraseggio, Assoli & Virtuosismo'
  | 'Analisi, Composizione & Produzione';

export interface ApiSettings {
  baseUrl: string; // Indirizzo Base del Server (Base URL), default: "https://openrouter.ai"
  model: string;   // Identificativo del Modello (Model ID), e.g. "auto/best-free"
  apiKey: string;  // Chiave API (API Key)
  temperature?: number;
  // Backward compatibility fields
  provider?: string;
  customEndpoint?: string;
}

export interface GraphicTabNote {
  string: 1 | 2 | 3 | 4 | 5 | 6; // 1 = cantino (High e), 6 = Mi basso (Low E)
  fret: number | string;          // Tasto (es. 12, 15, 0, 7)
  technique?: string;            // 'h', 'p', 'b', '/', '\\', '~', 'pm', 't'
  timePosition?: number;         // 0 to 3 (beat position inside 4/4 measure)
}

export interface GraphicTabMeasure {
  measureNumber: number;         // 1 to 16
  timeSignature?: string;        // default "4/4"
  notes: GraphicTabNote[];
}

export interface GraphicTabSystem {
  systemIndex: number;           // 0, 1, 2, 3 (line 1, 2, 3, 4)
  measures: GraphicTabMeasure[]; // exactly 4 measures per line
}

export interface LickPrize {
  id: string;
  title: string;
  category: string;
  bpm: number;
  level: number;
  rank: DifficultyRank;
  tabText: string;
  graphicSystems?: GraphicTabSystem[]; // Professional 3-4 lines x 4 measures vector tab
  explanation: string;
  key: string;
  tuning?: string;
  unlockedAt: string;
  source: 'boss' | 'theory' | 'technique' | 'forge' | 'custom';
}

export interface TheoryQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TabNote {
  string: 1 | 2 | 3 | 4 | 5 | 6; // 1 = high e, 6 = low E
  fret: number; // 0 = open, 1-24
  technique?: 'h' | 'p' | '/' | '\\' | 'b' | 'r' | '~' | 'pm' | 't' | 'harm' | 'v';
  annotation?: string;
}

export interface TabBeat {
  notes: TabNote[];
  duration?: '1/4' | '1/8' | '1/16' | '1/32' | '1/2' | '1/1' | 'triplet';
  palmMutted?: boolean;
}

export interface TabMeasure {
  measureNumber: number;
  timeSignature?: string; // e.g. "4/4", "3/4"
  beats: TabBeat[];
  label?: string;
}

export interface TechniqueExercise {
  id: string;
  title: string;
  category: TechniqueCategory;
  level: number; // 1-5
  difficultyRank: DifficultyRank;
  defaultBpm: number;
  targetBpm: number;
  description: string;
  focusMuscles: string; // e.g. "Polso destro, indipendenza 3°-4° dito mano sinistra"
  biomechanicalFocus?: string;
  channelName?: string;
  videoUrl?: string;
  youtubeId?: string;
  pdfUrl?: string;
  pdfStartPage?: number;
  tips: string[];
  measures: TabMeasure[];
  tuning: string; // e.g. "Standard E (E A D G B E)" or "Drop D"
  xpReward: number;
  isCustom?: boolean;
  tabFileName?: string;
  tabFileData?: string; // Base64 Data URL or file content
  tabFileType?: 'image' | 'pdf' | 'text' | 'file';
  tabText?: string;
  isBoss?: boolean;
  bossFightData?: BossFight;
}

export type BossType = 'full_song' | 'full_solo';
export type BossCategory = 'official' | 'fandom';

export interface BossTabFile {
  name: string;
  type: string; // 'application/pdf' | 'image/png' | 'image/jpeg' | 'text/plain' | etc.
  dataUrl: string;
  uploadedAt: string;
  fileSize?: string;
}

export interface BossFight {
  id: string;
  title: string;
  artist: string;
  albumYear: string;
  rank: DifficultyRank;
  type: BossType; // 'full_song' = Canzone Intera | 'full_solo' = Assolo Completo
  genre: string;
  category?: BossCategory; // 'official' (default) | 'fandom'
  fandomUniverse?: string; // Es. 'Anime / Manga', 'Videogames', 'Pop Culture'
  tempoBpm: number;
  tuning: string;
  youtubeId: string;
  youtubeTitle: string;
  youtubeChannelName?: string; // Canale YouTube specifico selezionato
  mrTabsUrl: string; // Link al canale/video YouTube
  songsterrUrl: string; // Link diretto alla tablatura completa su Songsterr o altro sito tabs
  description: string;
  whyThisSong: string;
  requiredSkills: string[];
  measures: TabMeasure[];
  xpReward: number;
  isCustomImported?: boolean;
  customTabFile?: BossTabFile;
  customYoutubeId?: string;
  customYoutubeUrl?: string;
}

export interface BossTrainingProgress {
  bossId: string;
  bossTitle: string;
  lastTargetBpm: number;
  lastAchievedBpm: number;
  maxAchievedBpm: number;
  totalTrainingSeconds: number;
  lastCleanlinessRating: number; // 1 to 5 stars
  notes: string;
  lastTrainedAt: string; // ISO date
  sessionsCount: number;
}

export interface CustomTheoryFile {
  name: string;
  type: string; // 'application/pdf', 'application/msword', 'text/plain', etc.
  dataUrl: string;
  fileSize: string;
  uploadedAt: string;
  textContent?: string;
}

export interface CustomTheoryLesson {
  id: string;
  title: string;
  category?: string;
  level?: number;
  readTimeMin?: number;
  shortSummary?: string;
  fullContent?: string;
  keyTakeaways?: string[];
  createdAt: string;
  isCustom: true;
  file: CustomTheoryFile;
}

export interface TheoryModule {
  id: string;
  title: string;
  category: TheoryCategory;
  level: number; // 1-5
  readTimeMin: number;
  shortSummary: string;
  fullContent: string;
  keyTakeaways: string[];
  fretboardFormula?: {
    rootNote: string;
    scaleOrChordName: string;
    intervals: string[];
    notesOnFretboard: { fret: number; string: number; label: string; isRoot?: boolean }[];
  };
  quizzes?: TheoryQuizQuestion[];
  relatedExerciseIds: string[];
  xpReward: number;
  isCustom?: boolean;
  customFile?: CustomTheoryFile;
}

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  exerciseTitle: string;
  setIndex: number;
  targetBpm: number;
  achievedBpm: number;
  durationSeconds: number;
  cleanlinessRating: number; // 1 to 5 stars
  isPersonalRecord?: boolean;
  notes?: string;
  isBossFight?: boolean;
  bossId?: string;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  description: string;
  isPreset: boolean;
  exerciseIds: string[];
  estimatedMinutes: number;
  targetRank: DifficultyRank;
  createdAt: string;
}

export interface WorkoutSessionLog {
  id: string;
  routineId: string;
  routineName: string;
  date: string; // ISO date
  totalDurationSeconds: number;
  totalSets: number;
  sets: WorkoutSet[];
  xpEarned: number;
  newPRsCount: number;
}

export interface HunterProfile {
  name: string;
  level: number;
  currentXp: number;
  rank: DifficultyRank;
  hunterClass: string;
  streakDays: number;
  lastPracticeDate: string | null;
  totalMinutesPracticed: number;
  totalSessionsCompleted: number;
  defeatedBossIds: string[];
  completedTheoryModuleIds: string[];
  passedQuizModuleIds: string[];
  savedPrizes: LickPrize[];
  exercisePRs: Record<string, { maxBpm: number; achievedAt: string }>;
  customBosses?: BossFight[];
  bossUploadedTabs?: Record<string, BossTabFile>;
  customBossVideos?: Record<string, string>; // bossId -> custom youtube URL or video ID
  bossTrainingProgress?: Record<string, BossTrainingProgress>; // bossId -> training metrics
  customTheoryLessons?: CustomTheoryLesson[];
}
