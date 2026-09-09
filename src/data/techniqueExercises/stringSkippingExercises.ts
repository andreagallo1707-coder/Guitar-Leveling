import { TechniqueExercise } from '../../types';

export const stringSkippingExercises: TechniqueExercise[] = [
  // =========================================================================
  // BLOCCO 6: STRING SKIPPING (SALTO DI CORDA)
  // Ordinati rigorosamente per Rank crescente: E-Rank -> D-Rank -> C-Rank -> B-Rank -> A-Rank
  // Regola: SINGOLI ESERCIZI PURI (mai video con più esercizi), zero shorts, zero lezioni parlate.
  // Titoli semplici, puliti e descrittivi dell'esercizio.
  // =========================================================================

  // -------------------------------------------------------------------------
  // 1. LIVELLO 1 (E-RANK) - ARIA NAZIRI: SALTO DI CORDA BASE IN OTTAVI
  // -------------------------------------------------------------------------
  {
    id: 'skipping-01-naziri-warmup',
    title: 'Salto di Corda su Ottavi & Precisione',
    category: 'String Skipping',
    level: 1,
    difficultyRank: 'E-Rank',
    defaultBpm: 60,
    targetBpm: 90,
    description: 'Esercizio fondamentale di riscaldamento e precisione di Aria Naziri con tablatura scorrevole continua a schermo. Allena il salto di corda tra corde non adiacenti (Mi basso e Re, La e Sol), impostando la mira del polso destro e l\'eliminazione degli urti sulle corde intermedie saltate.',
    focusMuscles: 'Controllo spaziale del polso destro, estensori delle dita della mano sinistra per il salto pulito.',
    biomechanicalFocus: 'Nel salto di corda, il plettro deve scavalcare la corda intermedia senza alzarsi eccessivamente: mantieni l\'escursione verticale contenuta entro 3-4 millimetri per preservare l\'economia di movimento.',
    channelName: 'Aria Naziri',
    youtubeId: '4kAn55aqo9M',
    videoUrl: 'https://www.youtube.com/watch?v=4kAn55aqo9M',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 60,
    tips: [
      'Ascolta attentamente che la corda saltata non emetta alcun suono percussivo o armonico.',
      'Sincronizza ogni pennata alternata rigorosa (Giù-Su) con il click metronomico.',
      'Tieni il polso destro morbido e allineato con l\'avambraccio.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 2. LIVELLO 2 (D-RANK) - NIKOLA GUGOSKI: PENTATONICA A SALTO DI CORDA
  // -------------------------------------------------------------------------
  {
    id: 'skipping-02-gugoski-pentatonic',
    title: 'Salto di Corda su Scala Pentatonica',
    category: 'String Skipping',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 65,
    targetBpm: 105,
    description: 'Play-along interattivo di Nikola Gugoski con tablatura completa a schermo. Applica il salto di corda alle forme pentatoniche creando ampi intervalli melodici aperti (ottave, quinte e settime). Favorisce la visualizzazione geometrica non lineare del manico e la scioltezza di plettrata.',
    focusMuscles: 'Muting con il palmo destro della corda saltata, estensione e indipendenza indice-anulare e indice-mignolo mano sinistra.',
    biomechanicalFocus: 'La mano sinistra usa l\'indice per coprire leggermente la corda saltata dal basso (fret-hand muting), garantendo silenzio assoluto anche a volumi e distorsioni elevate.',
    channelName: 'Nikola Gugoski',
    youtubeId: 'xJah6INySsU',
    videoUrl: 'https://www.youtube.com/watch?v=xJah6INySsU',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 90,
    tips: [
      'Presta attenzione agli intervalli ampi: mantieni l\'uguaglianza timbrica tra le due corde.',
      'Non staccare bruscamente la mano destra dal ponte, usa un tocco leggero per il muting.',
      'Aumenta la velocità progressivamente solo quando ogni nota è pulita.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 3. LIVELLO 3 (C-RANK) - RASMUS LAURBERG HANSEN: ARPEGGI TRIADICI
  // -------------------------------------------------------------------------
  {
    id: 'skipping-03-hansen-triads',
    title: 'Arpeggi Triadici a Salto di Corda',
    category: 'String Skipping',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 70,
    targetBpm: 115,
    description: 'Esercizio strutturato di Rasmus Laurberg Hansen con tablatura integrale a schermo dedicato agli arpeggi maggiori e minori suonati tramite salto di corda alternato (corda 5 e 3, corda 4 e 2). Questa tecnica conferisce un timbro limpido e separato rispetto allo sweep picking.',
    focusMuscles: 'Micro-scatto del carpo destro, coordinazione dito-tasto con ampi intervalli di terza e quinta.',
    biomechanicalFocus: 'Movimento di plettrata alternata compatto: l\'accento cade sulla prima nota di ogni triade per scandire la scansione metronomica.',
    channelName: 'Rasmus Laurberg Hansen',
    youtubeId: 'Gketaw3Ve1Q',
    videoUrl: 'https://www.youtube.com/watch?v=Gketaw3Ve1Q',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 125,
    tips: [
      'Confronta il suono ottenuto con lo sweep: qui le note devono avere un attacco percussivo identico.',
      'Segui il backing metronomico nel video.',
      'Rilassa la spalla destra per non irrigidire l\'articolazione del gomito.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 4. LIVELLO 4 (B-RANK) - SHUMU / PAUL GILBERT: ARPEGGI ESTESI CON LEGATO
  // -------------------------------------------------------------------------
  {
    id: 'skipping-04-shumu-paul-gilbert',
    title: 'Arpeggi Estesi in Stile Paul Gilbert',
    category: 'String Skipping',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 75,
    targetBpm: 130,
    description: 'Il celebre approccio agli arpeggi estesi reso iconico da Paul Gilbert (Mr. Big / Racer X), trascritto e suonato con tablatura continua a schermo da Shumu. Combina il salto di corda rapido tra corda 1ª e 3ª con hammer-on e pull-off veloci a 3 note, creando cascate di arpeggi ad altissima velocità senza sweep.',
    focusMuscles: 'Resistenza dei flessori sinistri per i pull-off veloci, precisione del salto del plettro sul cantino.',
    biomechanicalFocus: 'Coordinazione ibrida: plettrata sul salto di corda seguita da legato a 2-3 dita per corda. L\'avambraccio destro funge da perno compatto senza oscillazioni parassite.',
    channelName: 'Shumu',
    youtubeId: 'C_KyJChn_D0',
    videoUrl: 'https://www.youtube.com/watch?v=C_KyJChn_D0',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 160,
    tips: [
      'Assicurati che la prima nota martellata abbia lo stesso volume di quella plettrata.',
      'Durante il salto alla 1ª corda, non toccare la 2ª corda a vuoto.',
      'Respira regolarmente e sfrutta l\'inerzia elastica del legato per riposare il polso.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 5. LIVELLO 5 (A-RANK) - BERNTH: SALTO DI CORDA SHRED AD ALTA VELOCITÀ
  // -------------------------------------------------------------------------
  {
    id: 'skipping-05-bernth-shred',
    title: 'Salto di Corda Shred ad Alta Velocità',
    category: 'String Skipping',
    level: 5,
    difficultyRank: 'A-Rank',
    defaultBpm: 85,
    targetBpm: 160,
    description: 'Drill virtuosistico di BERNTH con tablatura a scorrimento sincronizzata a schermo, focalizzato su pattern di salto di corda a velocità shred estrema. Combina plettrata alternata ad alta frequenza, ampi intervalli polifonici e muting chirurgico con il palmo destro per azzerare le risonanze spurie delle corde saltate.',
    focusMuscles: 'Resistenza dinamica dei flessori ed estensori del polso destro, coordinazione neuromuscolare ad altissimo BPM.',
    biomechanicalFocus: 'A velocità elevate il salto di corda richiede un micro-movimento ellittico del polso con deviazione radiale-ulnare pura. Il braccio rimane compatto senza sobbalzi dell\'articolazione del gomito.',
    channelName: 'BERNTH',
    youtubeId: 'QGwMugiGTXk',
    videoUrl: 'https://www.youtube.com/watch?v=QGwMugiGTXk',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 250,
    tips: [
      'Costruisci la velocità gradualmente: non sacrificare mai la sincronizzazione della mano sinistra.',
      'Sfrutta il palmo della mano destra come barriera acustica fissa sulle corde inferiori.',
      'Mantieni le spalle basse e respira regolarmente durante i cambi di registro veloci.'
    ],
    measures: []
  }
];
