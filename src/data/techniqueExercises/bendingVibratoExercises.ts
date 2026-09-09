import { TechniqueExercise } from '../../types';

export const bendingVibratoExercises: TechniqueExercise[] = [
  // =========================================================================
  // BLOCCO 8: BENDING, VIBRATO & HARMONICS (ARMONICI)
  // Ordinati rigorosamente per Rank crescente: E-Rank -> D-Rank -> C-Rank -> B-Rank -> A-Rank
  // Esercizi focalizzati con video tutorial, intonazione, controllo del pitch, vibrato vocale e tecniche di armonici (naturali, pinch e tapped).
  // =========================================================================

  // -------------------------------------------------------------------------
  // 1. LIVELLO 1 (E-RANK) - BRANDON D'EON: MECCANICA FONDAMENTALE DEL BENDING
  // -------------------------------------------------------------------------
  {
    id: 'bending-01-brandon-deon-fundamentals',
    title: 'Meccanica Fondamentale del Bending di Intonazione',
    category: 'Bending, Vibrato & Harmonics',
    level: 1,
    difficultyRank: 'E-Rank',
    defaultBpm: 60,
    targetBpm: 90,
    description: 'Lezione fondamentale di Brandon D\'Eon incentrata sulla postura e sulla biomeccanica corretta per sollevare la corda senza sforzo. Spiega la rotazione dell\'avambraccio (movimento a maniglia/doorknob) con pollice saldamente ancorato sopra il manico e rinforzo del secondo dito a supporto del terzo per centrare il pitch esatto.',
    focusMuscles: 'Pronatore rotondo e supinatore dell\'avambraccio sinistro; flessori dell\'anulare e del medio per la trazione della corda.',
    biomechanicalFocus: 'Non flettere singolarmente le falangi delle dita: le dita rimangono arcuate e compatte mentre la rotazione impressa dall\'avambraccio spinge la corda verso l\'alto.',
    channelName: 'Brandon D\'Eon',
    youtubeId: 'PP5DFxLyQIM',
    videoUrl: 'https://www.youtube.com/watch?v=PP5DFxLyQIM',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 50,
    tips: [
      'Suona sempre la nota target prima di fare il bend per confrontarla a orecchio.',
      'Ancora il pollice sopra il bordo superiore del manico per avere la massima leva meccanica.',
      'Usa sempre il medio (2° dito) immediatamente dietro l\'anulare (3° dito) per raddoppiare la forza.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 2. LIVELLO 2 (D-RANK) - ONLINE GUITAR LESSONS UK: STRING BEND STUDY #1
  // -------------------------------------------------------------------------
  {
    id: 'bending-02-string-bend-study',
    title: 'Studio Sistematico del Bending su Singola Corda',
    category: 'Bending, Vibrato & Harmonics',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 70,
    targetBpm: 100,
    description: 'Esercizio metodico guidato con tablatura per sviluppare la precisione millimetrica dell\'intonazione sulle corde Sol (G) e Si (B). Concentrazione sul bending da 1 tono (full bend) e mezzo tono (half bend) con rilascio pulito (release bend) senza note fantasma o rumori spuri dalle corde adiacenti.',
    focusMuscles: 'Estensori e flessori del carpo; indice sinistro in funzione di muting costante delle corde basse.',
    biomechanicalFocus: 'L\'indice della mano sinistra deve rimanere disteso a contatto leggero con le corde inferiori per evitare che suonino quando la corda piegata viene rilasciata.',
    channelName: 'Online Guitar Lessons UK',
    youtubeId: 'cg3MkSP8C2Y',
    videoUrl: 'https://www.youtube.com/watch?v=cg3MkSP8C2Y',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 75,
    tips: [
      'Concentrati sull\'apice del bend: mantieni la nota stabile per almeno due battiti prima del release.',
      'Non permettere alle corde superiori di scivolare sotto i polpastrelli mentre sollevi.',
      'Pratica a metronomo sia a 70 BPM che a velocità moderata.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 3. LIVELLO 2 (D-RANK) - BRADLEY HALL: CONTROLLO DELL'INTONAZIONE E RELEASE
  // -------------------------------------------------------------------------
  {
    id: 'ex-bending-intonation',
    title: 'Controllo dell\'Intonazione e Release del Bending',
    category: 'Bending, Vibrato & Harmonics',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 75,
    targetBpm: 110,
    description: 'Drill mirato di Bradley Hall: routine di 2 minuti al giorno per perfezionare la memoria muscolare dell\'orecchio e delle dita. Consiste nel suonare la nota di destinazione naturale, eseguire il bend di 1 tono dal tasto inferiore e verificare istantaneamente la convergenza di fase senza oscillazioni stonate.',
    focusMuscles: 'Muscoli flessori profondi della mano sinistra; controllo dinamico della pressione contro la tastiera.',
    biomechanicalFocus: 'Sincronizzazione audio-motoria immediata: interrompere l\'ascesa della corda nell\'esatto millisecondo in cui la frequenza coincide con il tasto di riferimento.',
    channelName: 'Bradley Hall',
    youtubeId: '_5SN2qz1ly0',
    videoUrl: 'https://www.youtube.com/watch?v=_5SN2qz1ly0',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 80,
    tips: [
      'Se il bend risulta calante (flat), aumenta la rotazione del polso senza forzare le dita.',
      'Se risulta crescente (sharp), memorizza l\'ampiezza visiva dell\'escursione della corda.',
      'Ripeti ogni bend 5 volte consecutive con precisione al 100% prima di passare alla corda successiva.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 4. LIVELLO 3 (C-RANK) - SOUND MAUS: ARMONICI NATURALI CON TAB
  // -------------------------------------------------------------------------
  {
    id: 'bending-04-natural-harmonics-exercise',
    title: 'Esercizio Fondamentale di Armonici Naturali con Tab',
    category: 'Bending, Vibrato & Harmonics',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 65,
    targetBpm: 105,
    description: 'Esercizio analitico di Sound Maus con tablatura completa a schermo per padroneggiare la tecnica degli armonici naturali (Natural Harmonics) sui nodi dei tasti 12, 7 e 5. Spiega la corretta pressione minima del polpastrello e l\'istante di sollevamento per ottenere rintocchi limpidi e prolungati.',
    focusMuscles: 'Sensibilità tattile del polpastrello sinistro (indice e anulare); attacco percussivo e dinamico del plettro destro.',
    biomechanicalFocus: 'Il polpastrello sinistro sfiora la corda perpendicolarmente esattamente sopra la barretta di metallo del tasto (nodo acustico), sollevandosi istantaneamente appena il plettro rilascia l\'energia vibratoria.',
    channelName: 'Sound Maus',
    youtubeId: 'VHViIB8FhoA',
    videoUrl: 'https://www.youtube.com/watch?v=VHViIB8FhoA',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 100,
    tips: [
      'Non premere la corda contro il legno della tastiera: basta un contatto aereo leggerissimo.',
      'Plettra vicino al ponte (bridge pickup) per esaltare le armoniche acute più cristalline.',
      'Esegui la sequenza rispettando scrupolosamente le pause e la divisione ritmica indicata nella tab.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 5. LIVELLO 3 (C-RANK) - YOUR GUITAR ACADEMY: FRASEGGIO MELODICO E VIBRATO
  // -------------------------------------------------------------------------
  {
    id: 'ex-vibrato-mastery',
    title: 'Fraseggio Melodico con Bending e Vibrato Vocale',
    category: 'Bending, Vibrato & Harmonics',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 75,
    targetBpm: 115,
    description: 'Lick melodico ed espressivo di Your Guitar Academy con tablatura analitica. Integra bending vocale, pause cariche di intenzione espressiva e vibrato ampio e regolare che imita l\'inflessione di un cantante lirico o blues.',
    focusMuscles: 'Muscoli intrinseci della mano; rotazione ritmica del polso sinistro per la modulazione della frequenza.',
    biomechanicalFocus: 'Il vibrato deve avere velocità e ampiezza costanti: l\'oscillazione viene generata dalla flessione/estensione cadenzata dell\'articolazione del polso, mai dal nervosismo delle dita.',
    channelName: 'Your Guitar Academy',
    youtubeId: 'EiFNigbof94',
    videoUrl: 'https://www.youtube.com/watch?v=EiFNigbof94',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 110,
    tips: [
      'Inizia il vibrato solo dopo aver stabilizzato l\'intonazione della nota target.',
      'Sincronizza l\'oscillazione del vibrato con il tempo del metronomo (es. terzine o sedicesimi di oscillazione).',
      'Mantieni il palmo rilassato per evitare rigidità muscolare durante i passaggi lunghi.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 6. LIVELLO 4 (B-RANK) - LEVEL UP GUITAR TABS: HAMMER-ON, SLIDE, VIBRATO & BEND
  // -------------------------------------------------------------------------
  {
    id: 'bending-06-levelup-combo-phrasing',
    title: 'Fraseggio Combinato: Hammer-On, Slide, Vibrato e Bend',
    category: 'Bending, Vibrato & Harmonics',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 80,
    targetBpm: 125,
    description: 'Lick virtuosistico compatto di Level Up Guitar Tabs che combina le principali tecniche espressive in una singola frase fluida: hammer-on esplosivo, scivolata millimetrica con slide, vibrato cantabile prolungato e bend di precisione con attacco pulito.',
    focusMuscles: 'Coordinazione multidirezionale della mano sinistra: spostamento assiale lungo il manico unito alla rotazione per il bending.',
    biomechanicalFocus: 'Transizione senza attrito: lo scivolamento orizzontale dello slide converte istantaneamente il baricentro della mano nella posizione ad arco pronta a sostenere la leva del bending.',
    channelName: 'Level Up Guitar Tabs',
    youtubeId: '6-xkalz02SM',
    videoUrl: 'https://www.youtube.com/watch?v=6-xkalz02SM',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 130,
    tips: [
      'Non rallentare lo scivolamento dello slide per mantenere la dinamica della nota intatta.',
      'Presta attenzione al cambio di pressione tra la scivolata (leggera) e il bend (decisa).',
      'Segui con gli occhi la tab scorrevole nel video per anticipare le posizioni.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 7. LIVELLO 4 (B-RANK) - LEVEL UP GUITAR TABS: WORKOUT ARMONICI NATURALI
  // -------------------------------------------------------------------------
  {
    id: 'bending-07-levelup-natural-harmonics-speed',
    title: 'Sequenza Dinamica di Armonici Naturali su Più Corde',
    category: 'Bending, Vibrato & Harmonics',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 75,
    targetBpm: 120,
    description: 'Workout ritmico intensivo di Level Up Guitar Tabs dedicato agli armonici naturali concatenati attraverso diverse corde e posizioni nodali (12°, 7°, 5° e 4° tasto). Allena il controllo dinamico, la pulizia del rilascio e la rapidità di lettura delle tablature per sequenze eteree e polifoniche.',
    focusMuscles: 'Indice, medio e anulare della mano sinistra impiegati in rapida successione con tocco aereo simultaneo.',
    biomechanicalFocus: 'Spostamento rapido ed economico della mano sinistra lungo la tastiera mantenendo la linea delle dita perfettamente parallela alle barrette dei tasti metallici.',
    channelName: 'Level Up Guitar Tabs',
    youtubeId: 'YS5Ekv8vRLk',
    videoUrl: 'https://www.youtube.com/watch?v=YS5Ekv8vRLk',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 140,
    tips: [
      'Evita di colpire con troppa forza: gli armonici naturali rispondono meglio a un tocco secco e definito.',
      'Verifica che ogni corda non continui a risuonare quando non previsto usando il palmo destro.',
      'Sviluppa la memoria visiva dei nodi principali per non dover guardare continuamente la mano.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 8. LIVELLO 4 (B-RANK) - G & GUITAR: PINCH HARMONICS, PALM MUTE & TREMOLO
  // -------------------------------------------------------------------------
  {
    id: 'bending-08-gguitar-pinch-harmonics',
    title: 'Pinch Harmonics, Palm Mute e Tremolo Bar Phrasing',
    category: 'Bending, Vibrato & Harmonics',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 85,
    targetBpm: 130,
    description: 'Tutorial iconico con tablatura di G & Guitar che illustra la meccanica del pinch harmonic (armonico artificiale "stridente"): attacco stretto con la punta del plettro seguito dal contatto fulmineo del bordo del pollice, arricchito da palm muting percussivo e vibrato marcato per massimizzare il sustain.',
    focusMuscles: 'Eminenza tenar e flessore lungo del pollice destro; sincronia millimetrica tra punta del plettro e bordo cutaneo.',
    biomechanicalFocus: 'Pizzicare la corda con il plettro molto sporgente è un errore: lascia sporgere solo 1-2 mm di plettro in modo che la carne laterale del pollice sfiori istantaneamente la corda subito dopo l\'impatto.',
    channelName: 'G & Guitar',
    youtubeId: 'RMp2KFi4-NY',
    videoUrl: 'https://www.youtube.com/watch?v=RMp2KFi4-NY',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 150,
    tips: [
      'Sposta il punto di plettrata avanti e indietro tra i due pickup per trovare i nodi armonici più reattivi.',
      'Aggiungi immediatamente un vibrato energico con la mano sinistra per far "ruggire" l\'armonico.',
      'Usa un pickup al ponte con buon livello di gain per facilitare l\'innesco iniziale.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 9. LIVELLO 5 (A-RANK) - SIX STRING STUDIES: TAPPED HARMONICS
  // -------------------------------------------------------------------------
  {
    id: 'bending-09-sixstring-tapped-harmonics',
    title: 'Armonici Tappati (Tapped Harmonics) & Phrasing Virtuoso',
    category: 'Bending, Vibrato & Harmonics',
    level: 5,
    difficultyRank: 'A-Rank',
    defaultBpm: 70,
    targetBpm: 120,
    description: 'Masterclass avanzata di Six String Studies sugli armonici percossi (Tapped Harmonics alla Eddie Van Halen / Steve Vai). La mano sinistra diteggia note fisse o arpeggi mentre il dito indice (o medio) della mano destra percuote con precisione chirurgica il ferretto metallico esattamente 12 tasti più avanti, creando sequenze cristalline ad altissima velocità.',
    focusMuscles: 'Estensori e flessori dell\'indice della mano destra per il colpo percussivo rimbalzante (bouncing tap); stabilità del fretting sinistro.',
    biomechanicalFocus: 'L\'indice della mano destra deve colpire la barretta metallica e rimbalzare all\'istante come una pallina da ping-pong, lasciando la corda libera di vibrare sul nodo armonico.',
    channelName: 'Six String Studies',
    youtubeId: 'JDPny6KT25M',
    videoUrl: 'https://www.youtube.com/watch?v=JDPny6KT25M',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 180,
    tips: [
      'Il colpo deve avvenire esattamente sopra il ferretto metallico (+12 tasti rispetto alla nota tastata).',
      'Se il tap rimane a contatto anche solo un istante di troppo, smorzerà il suono invece di produrre l\'armonico.',
      'Sincronizza il movimento della mano destra con gli spostamenti melodici della mano sinistra.'
    ],
    measures: []
  }
];
