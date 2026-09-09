import { TechniqueExercise } from '../../types';

export const tappingExercises: TechniqueExercise[] = [
  // =========================================================================
  // BLOCCO 7: TAPPING (A UNA E DUE MANI)
  // Ordinati rigorosamente per Rank crescente: E-Rank -> D-Rank -> C-Rank -> B-Rank -> A-Rank -> S-Rank
  // Regola: Esercizi focalizzati, tablatura a schermo e progressione didattica.
  // Titoli semplici, puliti e descrittivi dell'esercizio in italiano.
  // =========================================================================

  // -------------------------------------------------------------------------
  // 1. LIVELLO 1 (E-RANK) - SHUMU: TAPPING FONDAMENTALE SU TRIADE
  // -------------------------------------------------------------------------
  {
    id: 'tapping-01-shumu-triad',
    title: 'Tapping Fondamentale su Triade',
    category: 'Tapping',
    level: 1,
    difficultyRank: 'E-Rank',
    defaultBpm: 60,
    targetBpm: 100,
    description: 'Lick fondamentale di Shumu con tablatura analitica a schermo per impostare la corretta meccanica del tapping a una mano. Sequenza ciclica su arpeggio a tre note: tap percussivo della mano destra seguito da pull-off e hammer-on della mano sinistra, concentrandosi sull\'uniformità del volume e sul muting passivo delle corde adiacenti.',
    focusMuscles: 'Flessori delle dita della mano destra (indice o medio); muscoli lombricali della mano sinistra per l\'articolazione del legato.',
    biomechanicalFocus: 'Il polpastrello destro colpisce la corda esattamente al centro del tasto con un movimento percussivo compatto a martelletto, rilasciando con un micro-scatto verso il basso per innescare il pull-off.',
    channelName: 'Shumu',
    youtubeId: 'x3v7z83o-hI',
    videoUrl: 'https://www.youtube.com/watch?v=x3v7z83o-hI',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 60,
    tips: [
      'Mantieni il palmo della mano destra appoggiato morbidamente sulle corde gravi per silenziare le risonanze.',
      'Non usare una forza eccessiva nel tap: conta la velocità dello scatto percussivo, non la pressione.',
      'Sincronizza il rilascio con il metronomo per evitare terzine zoppicanti.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 2. LIVELLO 2 (D-RANK) - SHUMU: TAPPING PENTATONICO E PULL-OFF
  // -------------------------------------------------------------------------
  {
    id: 'tapping-02-shumu-pentatonic',
    title: 'Tapping Pentatonico & Pull-Off a Scatto',
    category: 'Tapping',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 70,
    targetBpm: 115,
    description: 'Esercizio con tablatura di Shumu focalizzato sull\'integrazione del tapping all\'interno di box pentatonici estesi. Sviluppa lo spostamento orizzontale della mano destra tra diversi registri, coordinando salti di posizione puliti e mantenendo la continuità timbrica tra il tocco percussivo destro e le articolazioni sinistre.',
    focusMuscles: 'Controllo fine del carpo destro nello spostamento laterale lungo la tastiera; flessore superficiale del mignolo sinistro.',
    biomechanicalFocus: 'Nello spostamento laterale lungo il manico, l\'avambraccio destro guida il posizionamento senza sobbalzi dell\'articolazione della spalla, mantenendo la mano destra parallela ai tasti metallici.',
    channelName: 'Shumu',
    youtubeId: '6oRBsFlFirQ',
    videoUrl: 'https://www.youtube.com/watch?v=6oRBsFlFirQ',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 90,
    tips: [
      'Assicurati che ogni nota suonata in tapping abbia lo stesso volume di quella eseguita in legato.',
      'Negli spostamenti tra i tasti, tieni d\'occhio il tasto target con una frazione di anticipo visivo.',
      'Tieni il pollice sinistro ben posizionato dietro il manico per garantire stabilità durante i pull-off.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 3. LIVELLO 3 (C-RANK) - BRANDON D'EON: TAPPING FUSION CON LEGATO E SLIDE
  // -------------------------------------------------------------------------
  {
    id: 'tapping-03-deon-greghowe',
    title: 'Tapping Fusion con Legato & Slide',
    category: 'Tapping',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 75,
    targetBpm: 130,
    description: 'Lick fusion ispirato allo stile virtuosistico di Greg Howe, spiegato e dimostrato con tablatura da Brandon D\'Eon. Combina hammer-on dal nulla (hammer-on from nowhere), tap percussivi con la mano destra seguiti da slide istantanei del dito che ha effettuato il tap verso tasti superiori, creando cascate di note fluide e moderne.',
    focusMuscles: 'Stabilizzazione del polso destro durante lo scivolamento (slide) sul tasto; coordinazione neuromuscolare bimanuale avanzata.',
    biomechanicalFocus: 'Dopo aver colpito il tasto, il dito destro mantiene una pressione costante e scivola lungo la corda verso il tasto d\'arrivo prima di effettuare il pull-off. La precisione millimetrica dell\'arresto sul tasto target evita stonature microtonali.',
    channelName: 'Brandon D\'Eon',
    youtubeId: 'eO7QNWZa9Eo',
    videoUrl: 'https://www.youtube.com/watch?v=eO7QNWZa9Eo',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 140,
    tips: [
      'Controlla con attenzione l\'intonazione dello slide eseguito con il dito destro.',
      'Sfrutta l\'indice sinistro come barriera muting per tutte le corde sottostanti.',
      'Pratica il movimento molto lentamente all\'inizio per coordinare tap e scivolata in un unico gesto continuo.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 4. LIVELLO 4 (B-RANK) - GUITAR JAM: TAPPING A SESTINE PULITO E VELOCE
  // -------------------------------------------------------------------------
  {
    id: 'tapping-04-guitarjam-fastclean',
    title: 'Tapping a Sestine Pulito & Veloce',
    category: 'Tapping',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 80,
    targetBpm: 140,
    description: 'Esercizio ritmico di precisione per sviluppare velocità e pulizia nel tapping su figurazione a sestine. Integra hammer-on decisi della mano sinistra, tap puntiforme con la mano destra e pulizia assoluta delle corde libere.',
    focusMuscles: 'Flessore profondo delle dita destre, resistenza del polso sinistro nel sostenere pattern ciclici ad alta frequenza.',
    biomechanicalFocus: 'Movimento d\'attacco a pistone perpendicolare: il dito della mano destra non devia lateralmente, garantendo costanza ritmica assoluta a velocità elevata.',
    channelName: 'Guitar Jam',
    youtubeId: '_zk3yhztOs8',
    videoUrl: 'https://www.youtube.com/watch?v=_zk3yhztOs8',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 190,
    tips: [
      'Concentrati sulla pulizia: ogni colpo di tap deve risultare secco e senza oscillazioni spurie.',
      'Non irrigidire le spalle durante le accelerazioni ritmiche.',
      'Sfrutta il polso destro morbidamente appoggiato vicino al ponte come fulcro di stabilità.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 5. LIVELLO 5 (A-RANK) - MATT TEN: RUN PENTATONICA VELOCE IN TAPPING (SEQ. 3)
  // -------------------------------------------------------------------------
  {
    id: 'tapping-05-mattten-pentatonicrun',
    title: 'Run Pentatonica Veloce in Tapping (Sequenza 3)',
    category: 'Tapping',
    level: 5,
    difficultyRank: 'A-Rank',
    defaultBpm: 85,
    targetBpm: 160,
    description: 'Lezione con tablatura analitica e dimostrazione ad alta velocità di Matt Ten. Sviluppa una rapida sequenza pentatonica estesa attraverso il manico tramite licks in tapping collegati, salti di posizione orizzontali e cambi di corda continui.',
    focusMuscles: 'Estensori della mano sinistra per ampi intervalli di legati; sincronismo bimanuale ad alta cadenza.',
    biomechanicalFocus: 'Coordinazione avanzata tra salti di corda e tap orizzontale. La mano destra viaggia parallelamente alla tastiera anticipando la posizione del capotasto mobile della mano sinistra.',
    channelName: 'Matt Ten',
    youtubeId: 'Ltrhu7LJNYg',
    videoUrl: 'https://www.youtube.com/watch?v=Ltrhu7LJNYg',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 250,
    tips: [
      'Segui attentamente la sequenza mostrata nella tablatura a schermo prima di aumentare la velocità.',
      'Mantieni uniforme la dinamica tra le note suonate con la mano sinistra e quelle tappate con la destra.',
      'Evita movimenti ampi della mano destra: mantieni il dito a pochi millimetri dalla corda.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 6. LIVELLO 6 (S-RANK) - BERNTH: WORKOUT INTENSIVO DI TAPPING A 5 MINUTI
  // -------------------------------------------------------------------------
  {
    id: 'tapping-06-bernth-5minworkout',
    title: 'Workout Intensivo di Tapping a 5 Minuti',
    category: 'Tapping',
    level: 6,
    difficultyRank: 'S-Rank',
    defaultBpm: 90,
    targetBpm: 175,
    description: 'Workout completo di livello Master/S-Rank da BERNTH con tablatura animata a scorrimento sincronizzato a schermo. Una sessione no-stop di 5 minuti che spinge l\'endurance, la pulizia del legato e la coordinazione bimanuale al massimo livello attraverso arpeggi, sequenze su più corde e cambi continui di registro.',
    focusMuscles: 'Resistenza ed endurance di tutti i flessori ed estensori di entrambe le mani; stabilizzazione del core e decontrazione delle spalle sotto sforzo prolungato.',
    biomechanicalFocus: 'Gestione dell\'acido lattico e dell\'affaticamento muscolare durante un\'esecuzione continua a velocità elevata. È fondamentale suonare con il minimo dispendio energetico possibile (micro-movimenti a martelletto ed economia di movimento bimanuale).',
    channelName: 'BERNTH',
    youtubeId: '0RPZaRl5e3A',
    videoUrl: 'https://www.youtube.com/watch?v=0RPZaRl5e3A',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 320,
    tips: [
      'Esercizio S-Rank di massima intensità: esegui una routine di stretching e riscaldamento prima di iniziare.',
      'Segui il metronomo e la tablatura di BERNTH senza mai fermarti per l\'intera durata dei 5 minuti.',
      'Se avverti tensione dolorosa, riduci la forza impressa sui tasti e respira profondamente a tempo.'
    ],
    measures: []
  }
];
