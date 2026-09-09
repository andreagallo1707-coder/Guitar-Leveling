import { BossFight, TechniqueExercise, HunterProfile, DifficultyRank, TechniqueCategory } from '../types';
import { bossFightsData } from '../data/bossData';
import { fandomBossFightsData } from '../data/fandomBossData';

/**
 * Extracts a standard 11-character YouTube video ID from any format:
 * - Direct ID (e.g. 'GKXkchJNto4')
 * - Full URL (e.g. 'https://www.youtube.com/watch?v=GKXkchJNto4')
 * - Short URL (e.g. 'https://youtu.be/GKXkchJNto4')
 * - Embed URL (e.g. 'https://www.youtube.com/embed/GKXkchJNto4')
 * - Shorts URL (e.g. 'https://www.youtube.com/shorts/GKXkchJNto4')
 */
export function extractYoutubeId(input?: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (match && match[1]) {
    return match[1];
  }
  return '';
}

/**
 * Gets all Boss Fights across canonical, fandom, and user-custom imports.
 */
export function getAllBossFights(hunterProfile?: HunterProfile): BossFight[] {
  const custom = hunterProfile?.customBosses || [];
  return [...bossFightsData, ...fandomBossFightsData, ...custom];
}

/**
 * Gets the effective YouTube Video ID for a boss, respecting any custom user override.
 */
export function getEffectiveBossYoutubeId(boss: BossFight, customBossVideos?: Record<string, string>): string {
  const customOverride = customBossVideos?.[boss.id];
  if (customOverride) {
    const extracted = extractYoutubeId(customOverride);
    if (extracted) return extracted;
  }
  if (boss.customYoutubeId) {
    return boss.customYoutubeId;
  }
  if (boss.youtubeId) {
    const extracted = extractYoutubeId(boss.youtubeId);
    if (extracted) return extracted;
  }
  return extractYoutubeId(boss.mrTabsUrl);
}

const rankToLevelMap: Record<DifficultyRank, number> = {
  'E-Rank': 1,
  'D-Rank': 2,
  'C-Rank': 3,
  'B-Rank': 4,
  'A-Rank': 5,
  'S-Rank': 6
};

/**
 * Adapts a BossFight (song or solo) into a TechniqueExercise suitable for The Forge
 * workout routines, active session timer, and tracking.
 */
export function bossToWorkoutExercise(
  boss: BossFight,
  customBossVideos?: Record<string, string>
): TechniqueExercise {
  const effectiveYtId = getEffectiveBossYoutubeId(boss, customBossVideos);
  const isFandom = boss.category === 'fandom';
  const prefix = isFandom ? '★ [Fandom]' : '⚔️ [Boss]';

  return {
    id: boss.id,
    title: `${prefix} ${boss.title} - ${boss.artist}`,
    category: 'Modern Fusion & Hybrid Picking' as TechniqueCategory,
    level: rankToLevelMap[boss.rank] || 3,
    difficultyRank: boss.rank,
    defaultBpm: Math.max(50, Math.round(boss.tempoBpm * 0.7)),
    targetBpm: boss.tempoBpm,
    description: boss.description,
    focusMuscles: `Repertorio e applicazione: ${boss.genre} (${boss.tuning}). Abilità richieste: ${boss.requiredSkills.join(', ')}`,
    channelName: boss.youtubeChannelName || (isFandom ? 'Anime/Gaming OST' : 'Mr. Tabs / Official Guitar Channel'),
    videoUrl: effectiveYtId ? `https://www.youtube.com/watch?v=${effectiveYtId}` : boss.mrTabsUrl,
    youtubeId: effectiveYtId,
    tips: [boss.whyThisSong, ...boss.requiredSkills],
    measures: [], // Nessuna tablatura interna generata dall'app per i Boss: rimangono esclusivamente link YouTube e Songsterr
    tuning: boss.tuning,
    xpReward: boss.xpReward,
    isBoss: true,
    bossFightData: boss
  };
}
