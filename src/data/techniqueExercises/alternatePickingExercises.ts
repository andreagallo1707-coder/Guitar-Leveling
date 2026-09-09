import { TechniqueExercise } from '../../types';

export const alternatePickingExercises: TechniqueExercise[] = [
  // =========================================================================
  // BLOCCO 2: ALTERNATE PICKING & SINCRONIZZAZIONE RIGOROSA
  // Ordinati rigorosamente per Rank crescente: E-Rank -> D-Rank -> C-Rank -> B-Rank -> A-Rank
  // Regola canale: Bernth, Jamie Robinson, Lethal Guitar Training.
  // Solo singoli esercizi puri/workout play-along diretti con tab a schermo, ZERO canzoni e ZERO compilation/lezioni parlate.
  // =========================================================================

  // 1. E-RANK
  {
    id: 'ap-01-lethal-finger-drill',
    title: 'Sincronizzazione & Plettrata Base in Ottavi',
    category: 'Alternate Picking',
    level: 1,
    difficultyRank: 'E-Rank',
    defaultBpm: 60,
    targetBpm: 90,
    description: 'Drill puro di tecnica a formato orizzontale di Lethal Guitar Training con tablatura scorrevole continua e incremento graduale da 60 a 120 BPM. Nessun discorso o introduzione: play-along diretto per impostare l\'angolo del plettro e la coordinazione millimetrica col pattern 5-8-6-8.',
    focusMuscles: 'Flessione del polso destro, coordinazione indice-medio-mignolo della mano sinistra.',
    biomechanicalFocus: 'Plettrata alternata rigorosa (Giù-Su-Giù-Su) con movimento che scaturisce dal solo polso. I polpastrelli devono cadere perpendicolari a martelletto a ridosso del ferretto.',
    channelName: 'Lethal Guitar Training',
    videoUrl: 'https://www.youtube.com/watch?v=97lN85GPsN4',
    youtubeId: '97lN85GPsN4',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 60,
    tips: [
      'Segui il click progressivo partendo dal tempo più comodo (60 BPM).',
      'Plettrata rigorosa Giù-Su-Giù-Su senza mai raddoppiare la direzione.',
      'Sincronizza l\'impatto del plettro all\'istante esatto di contatto del polpastrello.'
    ],
    measures: []
  },

  // 2. D-RANK
  {
    id: 'ap-02-lethal-16th-drill',
    title: 'Sincronizzazione & Plettrata in Sedicesimi',
    category: 'Alternate Picking',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 60,
    targetBpm: 96,
    description: 'Play-along orizzontale puro e diretto di Lethal Guitar Training focalizzato sul passaggio ai sedicesimi con il pattern (10-13-12-13). Tablatura scorrevole continua a schermo con rampa metronomica progressiva da 60 a 96 BPM: zero chiacchiere e un singolo esercizio focalizzato sulla scioltezza del polso e l\'indipendenza tra indice, medio e mignolo.',
    focusMuscles: 'Micro-articolazione del carpo destro, indipendenza indice-anulare-mignolo della mano sinistra.',
    biomechanicalFocus: 'Economia di movimento: l\'escursione della punta del plettro deve restare contenuta entro 2 millimetri oltre la corda, senza irrigidire l\'avambraccio.',
    channelName: 'Lethal Guitar Training',
    videoUrl: 'https://www.youtube.com/watch?v=q0fBD4U8QqU',
    youtubeId: 'q0fBD4U8QqU',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 90,
    tips: [
      'Mantieni l\'escursione della punta del plettro minima per non disperdere energia sui sedicesimi.',
      'Riduci al minimo il movimento dell\'avambraccio, isolando la flessione del polso.',
      'Suona ogni nota con lo stesso timbro e volume sonoro.'
    ],
    measures: []
  },

  // 3. C-RANK
  {
    id: 'ap-03-jamie-robinson-triads',
    title: 'Triadi su Corde Adiacenti in Plettrata Continua',
    category: 'Alternate Picking',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 75,
    targetBpm: 120,
    description: 'Esercizio breve e musicale con tablatura integrale a schermo di Jamie Robinson. Allena la plettrata alternata continua su inversioni di triade (1-5-3) su tre corde adiacenti (5ª, 4ª e 3ª corda): una nota per corda senza interruzioni del ciclo alternato Giù-Su, per una perfetta sincronizzazione nei cambi di corda contigui.',
    focusMuscles: 'Controllo del cambio corda a plettrata alternata (1 nota per corda su corde contigue), sincronizzazione tra scatto della mano sinistra e pennata.',
    biomechanicalFocus: 'Movimento del polso fluido e controllato nel passaggio continuo tra le tre corde contigue, evitando di colpire corde a vuoto o di scivolare nello sweep involontario.',
    channelName: 'Jamie Robinson',
    videoUrl: 'https://www.youtube.com/watch?v=EqGroaouYAM',
    youtubeId: 'EqGroaouYAM',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 120,
    tips: [
      'Ascolta attentamente la nitidezza di ciascuna delle 3 note di ogni triade.',
      'Non usare lo sweep: plettra rigorosamente alternato (Giù-Su-Giù-Su).',
      'Usa il metronomo a schermo per consolidare il passaggio tra le forme.'
    ],
    measures: []
  },

  // 4. B-RANK
  {
    id: 'ap-04-bernth-5min-sync',
    title: 'Sincronizzazione & Sestine ad Alta Frequenza',
    category: 'Alternate Picking',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 80,
    targetBpm: 135,
    description: 'Esercizio di Bernth con tablatura completa a schermo e metronomo integrato. Routine strutturata per sviluppare la sincronizzazione ad alta frequenza e l\'uguaglianza di attacco nelle sestine.',
    focusMuscles: 'Endurance dell\'articolazione del polso, flessori profondi delle dita.',
    biomechanicalFocus: 'Aumentando i BPM, riduci la profondità del plettro nella corda. Il plettro deve sfiorare la parte superiore del filo metallico per massimizzare la velocità.',
    channelName: 'Bernth',
    videoUrl: 'https://www.youtube.com/watch?v=vKlTVtoVM7k',
    youtubeId: 'vKlTVtoVM7k',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 160,
    tips: [
      'Segui il metronomo dall\'inizio alla fine insieme a Bernth.',
      'Scandisci bene gli accenti ritmici sul primo sedicesimo di ogni quarto.',
      'Rilascia le spalle e respira profondamente per evitare irrigidimenti.'
    ],
    measures: []
  },

  // 5. A-RANK
  {
    id: 'ap-05-bernth-endurance-speed',
    title: 'Endurance & Velocità Continua',
    category: 'Alternate Picking',
    level: 5,
    difficultyRank: 'A-Rank',
    defaultBpm: 90,
    targetBpm: 155,
    description: 'Esercizio ad alta velocità di Bernth con tablatura a schermo. Allenamento mirato sulla resistenza allo sforzo prolungato, l\'uniformità dinamica e la rapidità dei cambi di corda su sequenze veloci. Zero canzoni o cover: pura ginnastica tecnica per chitarra solista.',
    focusMuscles: 'Resistenza anaerobica dell\'estensore radiale del carpo, coordinazione neuromuscolare avanzata.',
    biomechanicalFocus: 'Pickslanting controllato nei cambi di corda per disimpegnare il plettro senza frizioni. Controllo millimetrico del palm muting per note definite e percussive.',
    channelName: 'Bernth',
    videoUrl: 'https://www.youtube.com/watch?v=KB55CcoOAlA',
    youtubeId: 'KB55CcoOAlA',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 200,
    tips: [
      'Esegui il workout completo di 5 minuti mantenendo il focus sulla scioltezza del polso.',
      'Non alzare il volume di plettrata per andare più veloce: l\'attacco deve restare leggero e chirurgico.',
      'Fermati immediatamente per 30 secondi se avverti indolenzimento acuto all\'avambraccio.'
    ],
    measures: []
  }
];

