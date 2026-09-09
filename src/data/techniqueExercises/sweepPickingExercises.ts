import { TechniqueExercise } from '../../types';

export const sweepPickingExercises: TechniqueExercise[] = [
  // =========================================================================
  // BLOCCO 5: ECONOMY & SWEEP PICKING
  // Ordinati rigorosamente per Rank crescente: E-Rank -> D-Rank -> C-Rank -> B-Rank -> A-Rank
  // Regola: SINGOLI ESERCIZI PURI (mai video con più esercizi), zero shorts, zero lezioni parlate.
  // Titoli semplici, puliti e descrittivi dell'esercizio.
  // =========================================================================

  // -------------------------------------------------------------------------
  // 1. LIVELLO 1 (E-RANK) - CHRIS BROOKS: 2-STRING SWEEP DRILL
  // -------------------------------------------------------------------------
  {
    id: 'sweep-01-brooks-2string-drill',
    title: 'Mini-Sweep a 2 Corde & Rake Continuo',
    category: 'Economy & Sweep Picking',
    level: 1,
    difficultyRank: 'E-Rank',
    defaultBpm: 50,
    targetBpm: 90,
    description: 'Esercizio singolo e interattivo di Chris Brooks focalizzato sulla pura meccanica dello sweep su 2 corde contigue. Tablatura integrale a schermo e metronomo progressivo. Imposta l\'angolo di attacco a 45° (pick slanting), il movimento a spazzolata fluida e la coordinazione millimetrica tra passaggio del plettro e rilascio del polpastrello.',
    focusMuscles: 'Articolazione del polso destro per la caduta controllata su 2 corde; sincronizzazione dell\'indice e dell\'anulare sinistro.',
    biomechanicalFocus: 'Il plettro non deve rimbalzare tra una corda e l\'altra: scivola da una corda all\'altra con un unico gesto fluido a caduta per gravità. Il dito precedente rilascia la pressione per evitare che le note suonino assieme.',
    channelName: 'Chris Brooks',
    youtubeId: '-0khhdt_9eI',
    videoUrl: 'https://www.youtube.com/watch?v=-0khhdt_9eI',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 90,
    tips: [
      'Inizia a velocità moderata: assicurati che il plettro cada sulla seconda corda senza esitazioni.',
      'Non staccare il dito dalla corda precedente fino all\'impatto della seconda nota.',
      'Mantieni il polso morbido senza irrigidire l\'avambraccio.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 2. LIVELLO 2 (D-RANK) - CHRIS BROOKS: ECONOMY PICKING ASCENDENTE
  // -------------------------------------------------------------------------
  {
    id: 'economy-01-brooks-ascending',
    title: 'Economy Picking Ascendente su Corde Contigue',
    category: 'Economy & Sweep Picking',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 60,
    targetBpm: 100,
    description: 'Drill play-along guidato di Chris Brooks per padroneggiare la meccanica dell\'economy picking in salita (corde gravi verso corde acute). Allena il passaggio continuo con pennata in giù che attraversa la corda successiva con movimento continuo tipo rest-stroke (down-up-down -> down sulla corda successiva), ottimizzando l\'efficienza del movimento.',
    focusMuscles: 'Flessione del polso destro, pick slanting verso il basso (downward pickslanting) per consentire la scivolata naturale sulla corda successiva.',
    biomechanicalFocus: 'Dopo l\'ultima nota suonata in giù sulla corda, il plettro non deve risalire per ripartire: scivola d\'inerzia sulla corda sottostante atterrando con un secondo colpo in giù senza interruzioni.',
    channelName: 'Chris Brooks',
    youtubeId: '4_zycp_N2qk',
    videoUrl: 'https://www.youtube.com/watch?v=4_zycp_N2qk',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 110,
    tips: [
      'Segui il metronomo progressivo e la tablatura di Chris Brooks.',
      'Non irrigidire la mano destra: il cambio corda in giù deve risultare privo di frizione.',
      'Controlla che le due note consecutive in giù abbiano lo stesso volume e lo stesso attacco percussivo.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 3. LIVELLO 2 (D-RANK) - CHRIS BROOKS: ECONOMY PICKING DISCENDENTE
  // -------------------------------------------------------------------------
  {
    id: 'economy-02-brooks-descending',
    title: 'Economy Picking Discendente & Rest-Stroke',
    category: 'Economy & Sweep Picking',
    level: 2,
    difficultyRank: 'D-Rank',
    defaultBpm: 60,
    targetBpm: 105,
    description: 'Sessione di pratica interattiva con tablatura di Chris Brooks dedicata alla metà più complessa dell\'economy picking: la discesa (corde acute verso corde gravi). Allena il cambio corda con spazzolata ascendente (up-stroke continuo) e l\'ancoraggio temporaneo sulla corda superiore per la massima precisione ritmica.',
    focusMuscles: 'Estensori del polso destro, upward pickslanting per disimpegnare il plettro verso l\'alto durante la traversata delle corde.',
    biomechanicalFocus: 'Il colpo in su (up-stroke) attraversa la corda acuta e prosegue direttamente verso la corda superiore, appoggiandosi morbidamente senza sobbalzi dell\'avambraccio.',
    channelName: 'Chris Brooks',
    youtubeId: 'XmLdVg_jezc',
    videoUrl: 'https://www.youtube.com/watch?v=XmLdVg_jezc',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 120,
    tips: [
      'Presta attenzione al cambio corda in salita (up-stroke continuativo).',
      'Mantieni il tocco compatto e contenuto entro 2 mm dalla corda.',
      'Rilassa il pollice destro per non bloccare l\'articolazione della mano.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 4. LIVELLO 3 (C-RANK) - BERNTH: ARPEGGI A 3 CORDE & FINGER ROLL
  // -------------------------------------------------------------------------
  {
    id: 'ex-sweep-3strings-triad',
    title: 'Arpeggi a 3 Corde & Finger Roll',
    category: 'Economy & Sweep Picking',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 60,
    targetBpm: 105,
    description: 'Esercizio play-along di BERNTH con tablatura integrale a scorrimento sincronizzato a schermo. Focalizzato sugli arpeggi a 3 corde (Sol, Si, Mi cantino) in forma maggiore, minore e diminuita. Studio meticoloso del finger rolling con l\'indice o l\'anulare per silenziare le note contigue ed evitare qualsiasi sovrapposizione polifonica.',
    focusMuscles: 'Articolazione della prima e seconda falange per il rolling delle dita; muting con il palmo della mano destra sulle corde gravi.',
    biomechanicalFocus: 'Le note dell\'arpeggio devono suonare strettamente staccate (una per volta): ogni polpastrello deve rilasciare la pressione millisecondi dopo l\'impatto del plettro.',
    channelName: 'BERNTH',
    youtubeId: 'MjpgRsT9IsY',
    videoUrl: 'https://www.youtube.com/watch?v=MjpgRsT9IsY',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 130,
    tips: [
      'Esegui la sequenza senza interrompere il flusso ritmico.',
      'Presta la massima attenzione al rolling: non piegare il polso, ammorbidisci solo la falange.',
      'Mantieni il palmo destro leggermente appoggiato sulle corde Re, La e Mi basso per scongiurare risonanze simpatiche.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 5. LIVELLO 3 (C-RANK) - BERNTH: SWEEP A 4 CORDE
  // -------------------------------------------------------------------------
  {
    id: 'ex-sweep-03-bernth-intermediate',
    title: 'Sweep a 4 Corde & Transizioni Orizzontali',
    category: 'Economy & Sweep Picking',
    level: 3,
    difficultyRank: 'C-Rank',
    defaultBpm: 70,
    targetBpm: 125,
    description: 'Esercizio di BERNTH con tablatura scorrevole continua a schermo. Allena l\'estensione dello sweep a 4 corde (Re, Sol, Si, Mi) con spostamenti rapidi di posizione lungo la tastiera. Ottimizza il momento critico del turnaround (inversione della plettrata sul cantino) e la pulizia timbrica uniforme tra fase discendente e ascendente.',
    focusMuscles: 'Flessori dell\'avambraccio per il movimento ampio del plettro; coordinazione rapida del cambio posizione della mano sinistra.',
    biomechanicalFocus: 'Al vertice dell\'arpeggio sul cantino, il plettro deve compiere un micro-movimento circolare per invertire la corsa da down-sweep a up-sweep senza perdere il tempo metrico.',
    channelName: 'BERNTH',
    youtubeId: 'lE1MzSTx-Qk',
    videoUrl: 'https://www.youtube.com/watch?v=lE1MzSTx-Qk',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 160,
    tips: [
      'Controlla che il volume del plettro sia identico sulla 4ª corda come sul cantino.',
      'Sincronizza lo spostamento della mano sinistra lungo il manico esattamente sul battere del metronomo.',
      'Non irrigidire la presa sul plettro: una presa rilassata favorisce il galleggiamento sopra le corde.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 6. LIVELLO 4 (B-RANK) - JAMIE ROBINSON: SWEEP A 5 CORDE
  // -------------------------------------------------------------------------
  {
    id: 'ex-sweep-5strings-arpeggios',
    title: 'Sweep a 5 Corde: Forme Maggiori & Minori',
    category: 'Economy & Sweep Picking',
    level: 4,
    difficultyRank: 'B-Rank',
    defaultBpm: 75,
    targetBpm: 140,
    description: 'Esercizio di Jamie Robinson con tablatura integrale a schermo sullo sweep picking a 5 corde (dalla 5ª corda La fino al cantino). Studio delle forme maggiori e minori estese, sincronizzazione dell\'hammer-on e pull-off sulla corda più alta e recupero continuo in spazzolata ascendente senza perdita di dinamica.',
    focusMuscles: 'Muscoli interossei palmari, estensori del polso destro, mignolo della mano sinistra per il pull-off ad alta velocità sul cantino.',
    biomechanicalFocus: 'La spazzolata a 5 corde richiede una traslazione omogenea dell\'intero avambraccio destro: non muovere solo le dita o solo il polso, mantieni l\'avambraccio compatto e rilassato.',
    channelName: 'Jamie Robinson',
    youtubeId: 'bZWHiSK7JDw',
    videoUrl: 'https://www.youtube.com/watch?v=bZWHiSK7JDw',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 200,
    tips: [
      'Il pull-off sul cantino deve avere lo stesso timbro percussivo e volume delle note spazzolate.',
      'Evita di "accelerare" a metà arpeggio: la caduta deve essere rigorosamente metronomica.',
      'Ripeti ogni ciclo mantenendo le spalle basse e la respirazione profonda.'
    ],
    measures: []
  },

  // -------------------------------------------------------------------------
  // 7. LIVELLO 5 (A-RANK) - JAMIE ROBINSON: SWEEP A 6 CORDE & DIMINUITI
  // -------------------------------------------------------------------------
  {
    id: 'ex-sweep-diminished-neoclassic',
    title: 'Sweep a 6 Corde & Arpeggi Diminuiti Neoclassici',
    category: 'Economy & Sweep Picking',
    level: 5,
    difficultyRank: 'A-Rank',
    defaultBpm: 80,
    targetBpm: 160,
    description: 'Esercizio virtuosistico avanzato di Jamie Robinson in formato widescreen orizzontale con tablatura completa a scorrimento continuo. Copre arpeggi estesi a 6 corde e sequenze neoclassiche di 7ª diminuita collegate lungo tutta la tastiera in stile Yngwie Malmsteen, Jason Becker e Michael Romeo. Massima richiesta di precisione di muting palmare combinato.',
    focusMuscles: 'Endurance massimale dell\'avambraccio, velocità pura e coordinazione bilaterale millimetrica ad altissimo BPM.',
    biomechanicalFocus: 'Nei passaggi a 6 corde, il palmo destro si sposta parallelamente alle corde fungendo da barriera acustica continua (palm-muting dinamico) per impedire l\'innesco di armonici indesiderati.',
    channelName: 'Jamie Robinson',
    youtubeId: '6V24m17WEv0',
    videoUrl: 'https://www.youtube.com/watch?v=6V24m17WEv0',
    tuning: 'Standard E (E A D G B E)',
    xpReward: 250,
    tips: [
      'Non forzare la velocità prima di aver raggiunto una pulizia cristallina.',
      'Sfrutta la simmetria geometrica degli arpeggi diminuiti a intervalli di terza minore (3 tasti).',
      'Registrati e riascolta attentamente per verificare che ogni singola nota sia udibile in modo distinto.'
    ],
    measures: []
  }
];
