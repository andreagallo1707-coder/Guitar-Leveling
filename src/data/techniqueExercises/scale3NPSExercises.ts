import { TechniqueExercise } from '../../types';

export const scale3NPSExercises: TechniqueExercise[] = [
  // =========================================================================
  // BLOCCO 3: SCALE & 3NPS (THREE NOTES PER STRING)
  // Ordinati rigorosamente per Rank crescente: E-Rank -> D-Rank -> C-Rank -> B-Rank -> A-Rank
  // Canali selezionati: Lethal Training Academy & Bernth
  // Solo singoli esercizi puri e workout play-along diretti con tab a schermo, ZERO lezioni parlate.
  // =========================================================================

  // 1. E-RANK (Level 1)
  {
    id: 'scale-01-lethal-pentatonic-box1',
    title: 'Pentatonica Minore Box 1',
    category: 'Scale & 3NPS',
    level: 1,
    difficultyRank: 'E-Rank',
    defaultBpm: 40,
    targetBpm: 80,
    description: 'Esercizio di Lethal Training Academy sul Box 1 della Pentatonica Minore (Forma di Mi). Tablatura scorrevole continua a schermo e metronomo progressivo da 40 a 154 BPM per consolidare la geometria a 2 note per corda su tutte e 6 le corde.',
    focusMuscles: 'Flessori ed estensori della mano sinistra, indipendenza indice-anulare e indice-mignolo, sincronizzazione di plettrata alternata.',
    biomechanicalFocus: 'Impostazione della mano sinistra a martelletto: l\'indice funge da perno d\'ancoraggio al 5° tasto senza inclinarsi. Il pollice resta centrato sul retro del manico per consentire al mignolo di raggiungere l\'8° tasto sulle corde esterne senza contorsioni del polso.',
    channelName: 'Lethal Training Academy',
    videoUrl: 'https://www.youtube.com/watch?v=7_tS9YEQ3_Y',
    youtubeId: '7_tS9YEQ3_Y',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 60,
    tips: [
      'Usa rigorosamente la plettrata alternata (Giù-Su) sia in salita che in discesa.',
      'Mantieni l\'indice fermo vicino al 5° tasto quando suoni le note con l\'anulare o il mignolo.',
      'Ascolta la pulizia del passaggio tra le corde, evitando di far risuonare corde a vuoto involontariamente.'
    ],
    measures: []
  },

  // 2. D-RANK (Level 2)
  {
    id: 'scale-02-lethal-pentatonic-box2',
    title: 'Pentatonica Minore Box 2',
    category: 'Scale & 3NPS',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 50,
    targetBpm: 95,
    description: 'Esercizio sul Box 2 della Pentatonica Minore (Forma di Re). Allena il passaggio d\'ottava e l\'asimmetria geometrica della scala pentatonica (dita 1-3 sulle corde gravi e 1-4/2-4 sulle corde acute). Tablatura continua a schermo con rampa metronomica progressiva.',
    focusMuscles: 'Controllo dell\'apertura tra medio e mignolo (dita 2-4 sulla 2ª e 1ª corda), traslazione verticale del polso sinistro.',
    biomechanicalFocus: 'Adattamento dell\'arco delle dita: nel passaggio dal 3° al 2° dito tra le corde 3 e 2, mantieni il polso neutro ed evita di alzare il gomito.',
    channelName: 'Lethal Training Academy',
    videoUrl: 'https://www.youtube.com/watch?v=3YcxkycT9sU',
    youtubeId: '3YcxkycT9sU',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 85,
    tips: [
      'Presta attenzione al cambio di diteggiatura sulle corde 3ª e 2ª per non invertire le dita.',
      'Sincronizza ogni pennata con il click del metronomo nel video.',
      'Tieni le dita non attive rilassate a 2-3 millimetri dalla tastiera.'
    ],
    measures: []
  },

  // 3. C-RANK (Level 3)
  {
    id: 'scale-03-lethal-3nps-ionian',
    title: 'Scala Maggiore 3NPS Modo Ionico',
    category: 'Scale & 3NPS',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 60,
    targetBpm: 110,
    description: 'Drill sulla prima forma a 3 note per corda (3NPS): C Ionian (Modo Ionico). Il sistema 3NPS garantisce simmetria della mano destra (sempre 3 colpi per corda prima di cambiare corda), allungando progressivamente l\'estensione delle dita della mano sinistra (pattern 1-2-4 e 1-3-4).',
    focusMuscles: 'Estensione dell\'arco palmare sinistro, coordinazione ciclica della mano destra (inside/outside picking ogni 3 note).',
    biomechanicalFocus: 'Nei pattern 3NPS con dita 1-2-4 (un tasto vuoto tra dito 2 e 4), il pollice deve scendere leggermente verso il basso del manico per permettere al mignolo di estendersi senza forzare i tendini.',
    channelName: 'Lethal Training Academy',
    videoUrl: 'https://www.youtube.com/watch?v=n2qvqKZX8u0',
    youtubeId: 'n2qvqKZX8u0',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 115,
    tips: [
      'Poiché ogni corda ha 3 note, il cambio corda alterna continuamente direzione di pennata (Giù su una corda, Su sulla successiva).',
      'Non strappare il tempo: segui la rampa metronomica progressiva del video da 40 a 160 BPM.',
      'Articola le note con forza uniforme senza cali di volume sul mignolo.'
    ],
    measures: []
  },

  // 4. B-RANK (Level 4)
  {
    id: 'scale-04-lethal-3nps-dorian',
    title: 'Scala Modale 3NPS Modo Dorico',
    category: 'Scale & 3NPS',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 70,
    targetBpm: 130,
    description: 'Esercizio sul Modo Dorico a 3 note per corda (C Dorian, 3NPS). Introduce le geometrie con doppio intervallo di tono intero (dita 1-2-4 con estensione allargata) sulle corde centrali. Tablatura scorrevole sincronizzata con incremento di velocità da 40 a 160 BPM.',
    focusMuscles: 'Resistenza tendinea dei lombricali, estensione wide-stretch (tasti allargati) e indipendenza 2°-4° dito.',
    biomechanicalFocus: 'Durante l\'estensione su tasti allargati, non ruotare il polso verso la paletta; mantieni le nocche parallele al manico per distribuire la tensione in modo simmetrico.',
    channelName: 'Lethal Training Academy',
    videoUrl: 'https://www.youtube.com/watch?v=7UCXhfB4P24',
    youtubeId: '7UCXhfB4P24',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 145,
    tips: [
      'Fai attenzione alla 6ª maggiore caratteristica del modo dorico nel passaggio sulle corde acute.',
      'Mantieni il tocco del plettro leggero e compatto per non perdere sincronia agli alti BPM.',
      'Rilassa la spalla sinistra ogni volta che scendi sulle corde gravi.'
    ],
    measures: []
  },

  // 5. A-RANK (Level 5)
  {
    id: 'scale-05-bernth-daily-scale-workout',
    title: 'Shifting Orizzontale & Endurance Scale',
    category: 'Scale & 3NPS',
    level: 5,
    difficultyRank: 'A-Rank',
    defaultBpm: 80,
    targetBpm: 150,
    description: 'Esercizio guidato da Bernth per costruire velocità, shifting orizzontale istantaneo e precisione chirurgica sulle scale. Tablatura integrale a schermo e metronomo continuo: sessione intensiva che unisce cambi di posizione a scorrimento, sequenze a sestine e resistenza muscolare ad alte velocità.',
    focusMuscles: 'Resistenza anaerobica dell\'avambraccio destro e sinistro, velocità di traslazione dell\'indice durante i cambi di posizione (shifting).',
    biomechanicalFocus: 'Lo spostamento di posizione lungo il manico deve avvenire tramite il movimento fluido dell\'intero avambraccio, non allungando disperatamente le dita prima del salto. L\'indice deve guidare lo slide orizzontale in modo impercettibile.',
    channelName: 'BERNTH',
    videoUrl: 'https://www.youtube.com/watch?v=AzjxvnexBow',
    youtubeId: 'AzjxvnexBow',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 180,
    tips: [
      'Respira regolarmente per tutta la durata del workout di 5 minuti senza accumulare tensione nel trapezio.',
      'Nei cambi di posizione orizzontali, allenta istantaneamente la pressione del polpastrello per far scivolare la mano senza attrito.',
      'Se avverti indolenzimento acuto, fermati per 30 secondi prima di riprendere.'
    ],
    measures: []
  },

  // 6. D-RANK (Level 2) - ALAN IARUSSI: MINOR PENTATONIC WORKOUT
  {
    id: 'scale-06-iarussi-pentatonic-dm',
    title: 'Esercizio Sistematico su Pentatonica Minore (Dm)',
    category: 'Scale & 3NPS',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 60,
    targetBpm: 100,
    description: 'Esercizio metodico guidato con tablatura a schermo di Alan Iarussi incentrato sullo sviluppo della scioltezza e della fluidità sulla scala pentatonica minore in tonalità di Re minore (Dm). Allena la connessione orizzontale tra i box e l\'articolazione scandita con plettrata alternata.',
    focusMuscles: 'Flessori superficiali delle dita sinistra (indice, medio, anulare); coordinazione del polso destro per cambi corda precisi.',
    biomechanicalFocus: 'Assetto ad arco compatto: mantieni il polso sinistro rilassato e neutro senza farlo crollare verso la tastiera durante il passaggio tra corde gravi e acute.',
    channelName: 'Alan Iarussi',
    videoUrl: 'https://www.youtube.com/watch?v=AkJJFAw3kbM',
    youtubeId: 'AkJJFAw3kbM',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 80,
    tips: [
      'Sincronizza ogni nota con la tablatura a schermo evitando strappi o anticipi sul tempo.',
      'Cura l\'indipendenza tra anulare e mignolo sulle corde alte.',
      'Plettra con colpi stretti e vicini alle corde per ridurre l\'escursione della mano destra.'
    ],
    measures: []
  },

  // 7. C-RANK (Level 3) - ONLINE GUITAR LESSONS UK: D LYDIAN NEO-SOUL
  {
    id: 'scale-07-ogluk-lydian-neosoul',
    title: 'Fraseggio Neo-Soul in Modo Lidio (Re Lidio)',
    category: 'Scale & 3NPS',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 70,
    targetBpm: 110,
    description: 'Lick melodico ed espressivo di Online Guitar Lessons UK con tablatura completa a schermo. Esplora le sonorità brillanti e sospese del Modo Lidio (Re Lidio) caratterizzato dalla 4ª aumentata (Sol#), arricchito da tocchi morbidi neo-soul, slide precisi e accenti legati.',
    focusMuscles: 'Muscoli lombricali della mano sinistra; tocco controllato e sensibilità dinamica del plettro destro.',
    biomechanicalFocus: 'Nei passaggi con scivolata (slide), rilascia lievemente la pressione della corda prima dello scorrimento per preservare l\'integrità timbrica e atterrare sul semitono con precisione chirurgica.',
    channelName: 'Online Guitar Lessons UK',
    videoUrl: 'https://www.youtube.com/watch?v=EEtc1QrMyNU',
    youtubeId: 'EEtc1QrMyNU',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 105,
    tips: [
      'Presta attenzione all\'intonazione della quarta aumentata (nota caratteristica lidia) all\'interno del lick.',
      'Suona con tocco morbido per ricreare la tipica estetica calda del neo-soul.',
      'Memorizza i punti di appoggio delle dita prima di accelerare il fraseggio.'
    ],
    measures: []
  },

  // 8. C-RANK (Level 3) - MATT TEN: PHRYGIAN DOMINANT LICKS
  {
    id: 'scale-08-mattten-phrygian-dominant',
    title: 'Fraseggio in Frigio Dominante e Minore Armonica',
    category: 'Scale & 3NPS',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 75,
    targetBpm: 115,
    description: 'Lezione con tablatura di Matt Ten dedicata ai fraseggi modali sulla scala Frigia Dominante (quinto modo della scala Minore Armonica). Mette in risalto la sonorità esotica della terza maggiore combinata con la seconda minore, con salti di tono e mezzo caratteristici.',
    focusMuscles: 'Estensori delle dita sinistre per aperture d\'intervallo aumentato (1 tono e mezzo tra 2ª minore e 3ª maggiore).',
    biomechanicalFocus: 'Evita contorsioni della mano sinistra nel salto di tono e mezzo: posiziona il pollice leggermente più basso dietro il manico per dare libertà di apertura a indice e medio/anulare.',
    channelName: 'Matt Ten',
    videoUrl: 'https://www.youtube.com/watch?v=EHk3Uo8o_yU',
    youtubeId: 'EHk3Uo8o_yU',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 110,
    tips: [
      'Focalizza l\'orecchio sulla risoluzione tipica della scala Frigia Dominante sulla fondamentale.',
      'Mantieni puliti i legati per non perdere l\'articolazione delle note esotiche.',
      'Pratica a metronomo sia a tempo costante che a scaglioni di 5 BPM.'
    ],
    measures: []
  },

  // 9. C-RANK (Level 3) - GUITARLICKZ ETHAN LEE: D PHRYGIAN DOMINANT
  {
    id: 'scale-09-ethanlee-phrygian-dominant',
    title: 'Lick Melodico Esotico in Frigio Dominante (Re)',
    category: 'Scale & 3NPS',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 75,
    targetBpm: 120,
    description: 'Lick virtuosistico compatto con tab a schermo di Ethan Lee (GuitarLickz) basato sul Modo Frigio Dominante in tonalità di Re. Unisce cambi di posizione rapidi a un fraseggio ritmico denso, ideale per assoli metal, flamenco e neoclassici.',
    focusMuscles: 'Sincronizzazione tra lo scatto di plettrata e l\'articolazione delle dita 1, 2 e 4; coordinazione mano destra-sinistra.',
    biomechanicalFocus: 'Economia di movimento stretta della mano destra: il plettro deve rimanere a filo della corda senza compiere archi ampi durante i cambi veloci.',
    channelName: 'GuitarLickz Ethan Lee',
    videoUrl: 'https://www.youtube.com/watch?v=k2m7b9Xi_M4',
    youtubeId: 'k2m7b9Xi_M4',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 115,
    tips: [
      'Segui il fraseggio nella tab a schermo anticipando visivamente la posizione sulla tastiera.',
      'Articola con decisione le note per ottenere un attacco netto e percussivo.',
      'Sfrutta il palm muting leggero sulle note basse per dare risalto al lick.'
    ],
    measures: []
  },

  // 10. B-RANK (Level 4) - THE GUITAR POST: A LYDIAN SPEED SEQUENCING
  {
    id: 'scale-10-guitarpost-lydian-sequencing',
    title: 'Sequencing di Velocità su Scala Lidia 3NPS (La Lidio)',
    category: 'Scale & 3NPS',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 80,
    targetBpm: 130,
    description: 'Studio di velocità e sequencing geometrico a 3 note per corda (3NPS) in La Lidio di The Guitar Post. Sviluppa la regolarità della plettrata alternata ad alta frequenza e la sincronizzazione millimetrica delle permutazioni scalari a quartine e sestine.',
    focusMuscles: 'Flessori profondi e interossei dorsali per la velocità d\'articolazione; estensori del polso destro.',
    biomechanicalFocus: 'Cambi corda ad alta velocità: mantenere costante l\'angolo d\'inclinazione del plettro (edge picking) per minimizzare l\'attrito nel passaggio attraverso le corde.',
    channelName: 'The Guitar Post',
    videoUrl: 'https://www.youtube.com/watch?v=BarqflCXdS0',
    youtubeId: 'BarqflCXdS0',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 140,
    tips: [
      'Inizia a 80 BPM controllando che ogni singola nota sia ritmicamente identica alle altre.',
      'Evita tensioni al collo o alla spalla durante le sequenze ripetitive a ciclo continuo.',
      'Tieni le unghie della mano sinistra ben corte per consentire un attacco perpendicolare.'
    ],
    measures: []
  },

  // 11. B-RANK (Level 4) - BRANDON D'EON: HARD HARMONIC MINOR EXERCISE
  {
    id: 'scale-11-brandon-harmonic-minor',
    title: 'Workout Intensivo su Scala Minore Armonica',
    category: 'Scale & 3NPS',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 80,
    targetBpm: 135,
    description: 'Esercizio avanzato di Brandon D\'Eon incentrato sulla scala Minore Armonica. Richiede grande controllo dell\'intonazione, cambi corda ravvicinati con salti di semitono e tono e mezzo, sviluppando una forza dita impressionante e una plettrata definita e chirurgica.',
    focusMuscles: 'Estensori e abduttori delle dita sinistre; muscolo pronatore dell\'avambraccio destro.',
    biomechanicalFocus: 'Le geometrie asimmetriche della minore armonica tendono a disallineare il polso: mantieni l\'avambraccio flessibile per seguire il movimento della mano lungo il manico senza irrigidire il tendine carpale.',
    channelName: 'Brandon D\'Eon',
    videoUrl: 'https://www.youtube.com/watch?v=yIemC6spzEs',
    youtubeId: 'yIemC6spzEs',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 145,
    tips: [
      'Presta massima attenzione all\'apertura tra la 6ª minore e la 7ª maggiore.',
      'Usa un tocco secco e dinamico senza trascinare le dita sulle corde contigue.',
      'Aumenta la velocità di 5 BPM solo dopo aver completato l\'intero pattern 3 volte senza errori.'
    ],
    measures: []
  },

  // 12. B-RANK (Level 4) - ALVARO SEVERINO: MELODIC MINOR FUSION LICK
  {
    id: 'scale-12-alvaro-melodic-minor',
    title: 'Fraseggio Fusion su Scala Minore Melodica',
    category: 'Scale & 3NPS',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 75,
    targetBpm: 125,
    description: 'Lick fusion contemporaneo di Alvaro Severino con tablatura completa a schermo basato sulla scala Minore Melodica. Esplora intervalli moderni, salti d\'ottava e cambi di posizione fluidi tipici dell\'improvvisazione jazz-fusion e shred moderna.',
    focusMuscles: 'Coordinazione delle dita su schemi non simmetrici; indipendenza del mignolo sinistro nelle estensioni acute.',
    biomechanicalFocus: 'Transizione fluida tra plettrata e legati: calibrare il tocco in modo che le note suonate con hammer-on abbiano la stessa presenza timbrica delle note plettrate.',
    channelName: 'Alvaro Severino',
    videoUrl: 'https://www.youtube.com/watch?v=N-_xQmGY9cA',
    youtubeId: 'N-_xQmGY9cA',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 140,
    tips: [
      'Analizza i gradi della scala (6ª e 7ª maggiore) per interiorizzare il colore della minore melodica.',
      'Mantieni il tocco agile per eseguire le legature con naturalezza.',
      'Usa la tablatura per memorizzare la sequenza nota per nota prima di studiarla a velocità piena.'
    ],
    measures: []
  },

  // 13. A-RANK (Level 5) - JACK GARDINER: KILLER LYDIAN SHRED LICK
  {
    id: 'scale-13-jackgardiner-killer-lydian',
    title: 'Killer Lydian Shred Lick & Arpeggi Aperti',
    category: 'Scale & 3NPS',
    level: 5,
    difficultyRank: 'A-Rank',
    defaultBpm: 85,
    targetBpm: 145,
    description: 'Masterclass virtuosistica di Jack Gardiner su un lick lidio mozzafiato con tablatura analitica. Combina arpeggi moderni a intervalli aperti, salti di corda rapidi e plettrata ibrida/alternata ad altissima velocità, richiedendo un controllo assoluto della dinamica e delle tensioni corporee.',
    focusMuscles: 'Muscolatura intrinseca fine di entrambe le mani; massima coordinazione neuromuscolare per phrase runs a 16esimi e sestine ultra-veloci.',
    biomechanicalFocus: 'Rilassamento attivo: a velocità superiori a 130 BPM qualsiasi tensione muscolare superflua blocca la velocità. Il braccio destro deve rimanere soffice e il polso sinistro elastico.',
    channelName: 'Jack Gardiner',
    videoUrl: 'https://www.youtube.com/watch?v=NIq3YDCyJjw',
    youtubeId: 'NIq3YDCyJjw',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 180,
    tips: [
      'Suddividi il lick in 3 sezioni logiche e padroneggiale singolarmente prima di unirle.',
      'Poni estrema cura alla pulizia delle corde libere con il palmo destro per non generare interferenze.',
      'Studia a 80-90 BPM con metronomo a click sui quarti per interiorizzare il timing sofisticato.'
    ],
    measures: []
  }
];
