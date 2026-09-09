import { TechniqueExercise } from '../../types';

export const warmUpExercises: TechniqueExercise[] = [
  // =========================================================================
  // BLOCCO 1: WARM-UP & FINGER INDEPENDENCE
  // Ordinati rigorosamente per Rank crescente: E-Rank -> D-Rank -> C-Rank -> B-Rank
  // Regola: SINGOLI ESERCIZI PURI, video integrali widescreen, zero shorts, zero Lethal Guitar Training.
  // Titoli semplici, tecnici e descrittivi dell'esercizio.
  // =========================================================================

  // -------------------------------------------------------------------------
  // 1. LIVELLO 1 (E-RANK) - BERNTH: SPIDER CROMATICO
  // -------------------------------------------------------------------------
  {
    id: 'ex-spider-warmup',
    title: 'Riscaldamento Cromatico Spider',
    category: 'Warm-Up & Finger Independence',
    level: 1,
    difficultyRank: 'E-Rank',
    defaultBpm: 50,
    targetBpm: 80,
    description: 'Esercizio spider fondamentale di BERNTH in formato orizzontale widescreen con tablatura a scorrimento sincronizzata e metronomo a schermo. Allena il pattern cromatico 1-2-3-4, i cambi corda verticali continui e l\'eliminazione della tensione muscolare pre-sessione.',
    focusMuscles: 'Muscoli flessori delle dita 1-2-3-4, riscaldamento sinoviale dei tendini dell\'avambraccio.',
    biomechanicalFocus: 'Le dita devono cadere perpendicolari sul tasto come martelletti, con il pollice rilassato al centro del retro del manico opposto al dito medio.',
    channelName: 'BERNTH',
    youtubeId: '96CVs9hB10Y',
    videoUrl: 'https://www.youtube.com/watch?v=96CVs9hB10Y',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 50,
    tips: [
      'Segui il metronomo e la tablatura direttamente sul video senza interrompere il flusso.',
      'Colpisci la corda perpendicolarmente con la punta del polpastrello a 90°.',
      'Mantieni le spalle e il trapezio bassi e rilassati, respirando con il diaframma.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 2. LIVELLO 2 (D-RANK) - BERNTH: INDIPENDENZA FALANGI
  // -------------------------------------------------------------------------
  {
    id: 'wu-02-bernth-10min-warmup',
    title: 'Indipendenza Falangi & Legato Continuo',
    category: 'Warm-Up & Finger Independence',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 60,
    targetBpm: 95,
    description: 'Esercizio di BERNTH in formato widescreen orizzontale con tablatura scorrevole a schermo. Allenamento progressivo e continuo strutturato su esercizi di indipendenza delle 4 dita, allungamenti progressivi e sincronizzazione delle due mani prima di sessioni impegnative.',
    focusMuscles: 'Flessori ed estensori dell\'avambraccio, muscoli lombricali del palmo della mano sinistra.',
    biomechanicalFocus: 'Mantieni l\'arco naturale della mano senza collassare le nocche; le dita inattive devono restare a pochi millimetri dalle corde evitando movimenti parassiti.',
    channelName: 'BERNTH',
    youtubeId: 'bMWm2ERA9Co',
    videoUrl: 'https://www.youtube.com/watch?v=bMWm2ERA9Co',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 80,
    tips: [
      'Non stringere il manico: la pressione deve essere appena sufficiente a produrre un suono limpido.',
      'Se avverti tensione all\'avambraccio, allenta momentaneamente la presa continuando il movimento ritmico.',
      'Fai attenzione a mantenere il polso dritto.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 3. LIVELLO 2 (D-RANK) - BRANDON D\'EON: INDIPENDENZA 3° E 4° DITO
  // -------------------------------------------------------------------------
  {
    id: 'wu-03-brandon-left-hand',
    title: 'Indipendenza Anulare e Mignolo',
    category: 'Warm-Up & Finger Independence',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 55,
    targetBpm: 90,
    description: 'Drill intensivo di isolamento biomeccanico di Brandon D\'Eon con tablatura chiara a schermo. Focalizzato sullo sblocco dell\'indipendenza tra tendine dell\'anulare e del mignolo per eliminare il fenomeno dei "flying fingers" (dita che si sollevano via dal manico).',
    focusMuscles: 'Isolamento neuromuscolare tra 3° e 4° dito, forza di tenuta del mignolo sul cantino.',
    biomechanicalFocus: 'Le dita che non suonano restano ancorate sulla corda o fluttuano rilassate a meno di 5 mm dalla tastiera, senza estendersi verso l\'alto o irrigidirsi.',
    channelName: 'Brandon D\'Eon',
    youtubeId: 'I44lc-ga918',
    videoUrl: 'https://www.youtube.com/watch?v=I44lc-ga918',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 90,
    tips: [
      'Plettra soltanto la prima nota e lascia che l\'articolazione delle dita generi il suono.',
      'Controlla costantemente che il mignolo non si allontani oltre 1 cm dalla corda.',
      'Procedi con movimenti lenti e iper-controllati.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 4. LIVELLO 3 (C-RANK) - JAMIE ROBINSON: STRETCHING DINAMICO
  // -------------------------------------------------------------------------
  {
    id: 'wu-04-jamie-robinson-advanced',
    title: 'Stretching Dinamico & Permutazioni',
    category: 'Warm-Up & Finger Independence',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 65,
    targetBpm: 110,
    description: 'Esercizio dinamico e musicale di Jamie Robinson in formato orizzontale widescreen con tablatura integrale e backing track. Esercizi di estensione e permutazione che collegano string skipping, passaggi cromatici veloci e stretching dinamico.',
    focusMuscles: 'Estensori del polso, coordinazione motoria fine, apertura della campata palmare.',
    biomechanicalFocus: 'Abbassare il pollice verso il retro inferiore del manico nei tasti bassi per facilitare l\'apertura a ventaglio naturale delle dita senza sforzare il tunnel carpale.',
    channelName: 'Jamie Robinson',
    youtubeId: 'yzAj5SzpOic',
    videoUrl: 'https://www.youtube.com/watch?v=yzAj5SzpOic',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 120,
    tips: [
      'Mantieni il ritmo in battere e levare sincronizzato con la traccia audio.',
      'Sfrutta l\'apertura naturale tra indice e medio per raggiungere i tasti distanti.',
      'Rilassa l\'avambraccio durante i cambi di corda ampi.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 5. LIVELLO 4 (B-RANK) - BERNTH: SINCRONIZZAZIONE A 4 DITA
  // -------------------------------------------------------------------------
  {
    id: 'wu-05-bernth-15min-workout',
    title: 'Sincronizzazione Coordinata a 4 Dita',
    category: 'Warm-Up & Finger Independence',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 75,
    targetBpm: 130,
    description: 'Esercizio avanzato di BERNTH con tablatura a scorrimento e metronomo sincronizzato. Lavoro approfondito su picking synchronization, permutazioni asimmetriche delle dita, string skipping progressivo e resistenza ritmica continua.',
    focusMuscles: 'Endurance dell\'avambraccio sinistro e destro, agilità neuromuscolare ad alto BPM.',
    biomechanicalFocus: 'Mantenere il relax totale delle spalle e del trapezio, espirando regolarmente a tempo.',
    channelName: 'BERNTH',
    youtubeId: '2n6qPXwKfvc',
    videoUrl: 'https://www.youtube.com/watch?v=2n6qPXwKfvc',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 160,
    tips: [
      'Segui la progressione di velocità interna al video fino a raggiungere il target di 130 BPM.',
      'Se sopraggiunge affaticamento, concentrati sul rilassamento della mano destra.',
      'Ottimo come riscaldamento intensivo pre-live o pre-registrazione.'
    ],
    measures: []
  }
];
