import { WorkoutRoutine } from '../types';

export const presetRoutines: WorkoutRoutine[] = [
  {
    id: 'routine-daily-warmup',
    name: 'Daily Warmup & Sincronizzazione (20 Min)',
    description: 'La routine essenziale per iniziare ogni sessione: riscaldamento cromatico 1-2-3-4 Spider, sincronizzazione della mano destra e plettrata alternata continua.',
    isPreset: true,
    exerciseIds: ['ex-spider-warmup', 'ap-01-lethal-finger-drill', 'ap-02-lethal-16th-drill'],
    estimatedMinutes: 20,
    targetRank: 'E-Rank',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'routine-downpicking-stamina',
    name: 'Plettrata Alternata & Endurance (25 Min)',
    description: 'Allenamento mirato alla resistenza del polso destro: plettrata serrata a ottavi e sedicesimi, triadi continue e sestine ad alta frequenza.',
    isPreset: true,
    exerciseIds: ['ap-03-jamie-robinson-triads', 'ap-04-bernth-5min-sync', 'ap-05-bernth-endurance-speed'],
    estimatedMinutes: 25,
    targetRank: 'D-Rank',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'routine-blues-rock-feel',
    name: 'Expressive Lead: Bending, Vibrato, Harmonics & Pentatoniche (25 Min)',
    description: 'Controllo dell\'intonazione del bending (1 tono, release bend), armonici naturali, vibrato vocale circolare, tapping e sequenze pentatoniche veloci.',
    isPreset: true,
    exerciseIds: ['ex-bending-intonation', 'ex-vibrato-mastery', 'scale-01-lethal-pentatonic-box1', 'tapping-01-shumu-triad'],
    estimatedMinutes: 25,
    targetRank: 'C-Rank',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'routine-shred-lead-mastery',
    name: 'Shredder Masterclass: Legato, 3NPS & Sweep Picking (35 Min)',
    description: 'Perfezionamento del legato fluido continuo a 3 note per corda, scale 3NPS ad alta velocità e sweep picking a 3 e 5 corde.',
    isPreset: true,
    exerciseIds: ['legato-05-robinson-10min-endurance', 'scale-03-lethal-3nps-ionian', 'ex-sweep-3strings-triad', 'ex-sweep-5strings-arpeggios'],
    estimatedMinutes: 35,
    targetRank: 'B-Rank',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'routine-virtuoso-elite',
    name: 'Virtuoso Elite: String Skipping, Neoclassical & Hybrid (30 Min)',
    description: 'Esercizi avanzati per chitarristi esperti: salti di corda alla Paul Gilbert, sweep neoclassico a 6 corde e fraseggio virtuoso modern fusion alla Martin Miller.',
    isPreset: true,
    exerciseIds: ['skipping-04-shumu-paul-gilbert', 'skipping-05-bernth-shred', 'ex-sweep-diminished-neoclassic', 'fusion-06-david-crimson-martin-miller'],
    estimatedMinutes: 30,
    targetRank: 'A-Rank',
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];
