import { TheoryQuizQuestion } from '../../types';

export const level3Quizzes: Record<string, TheoryQuizQuestion[]> = {
  // MODULO 14
  'th-14': [
    {
      id: 'q-th14-1',
      question: 'Qual è la formula degli intervalli della scala Pentatonica Minore?',
      options: [
        '1 - b3 - 4 - 5 - b7',
        '1 - 2 - 3 - 5 - 6',
        '1 - b3 - b5 - 5 - 7',
        '1 - 3 - 4 - 5 - 7'
      ],
      correctIndex: 0,
      explanation: 'La pentatonica minore è formata da: Tonica (1), Terza Minore (b3), Quarta Giusta (4), Quinta Giusta (5) e Settima Minore (b7).'
    },
    {
      id: 'q-th14-2',
      question: 'Quali note della scala minore naturale vengono eliminate per ottenere la pentatonica minore?',
      options: [
        'Il 2° grado e il 6° grado (eliminando così tutti i semitoni dissonanti)',
        'Il 3° e il 5° grado',
        'Solo la tonica',
        'La quarta e la settima'
      ],
      correctIndex: 0,
      explanation: 'Togliendo la seconda maggiore (2) e la sesta minore (b6), si eliminano i semitoni di tensione, rendendo la scala estremamente sicura su qualsiasi progressione.'
    },
    {
      id: 'q-th14-3',
      question: 'Quante note per corda presenta la geometria standard del "Box 1" della pentatonica minore?',
      options: [
        'Esattamente 2 note per corda',
        '3 note per corda',
        '1 nota per corda',
        '4 note per corda'
      ],
      correctIndex: 0,
      explanation: 'Tutti i 5 box della scala pentatonica sulla chitarra hanno una caratteristica simmetria a esattamente 2 note per corda.'
    },
    {
      id: 'q-th14-4',
      question: 'In tonalità di La Minore (A Minor), a quale tasto della 6ª corda si posiziona l\'indice per eseguire il Box 1?',
      options: [
        'Al 5° tasto (nota La / A)',
        'Al 3° tasto',
        'Al 7° tasto',
        'Al 12° tasto'
      ],
      correctIndex: 0,
      explanation: 'La nota La sulla 6ª corda si trova al 5° tasto, punto di partenza del Box 1 della pentatonica minore.'
    }
  ],

  // MODULO 15
  'th-15': [
    {
      id: 'q-th15-1',
      question: 'Quale nota e intervallo viene aggiunto alla pentatonica minore per ottenere la "Scala Blues"?',
      options: [
        'La Quinta Diminuita (b5 / Tritono)',
        'La Seconda Minore',
        'La Terza Maggiore',
        'La Sesta Maggiore'
      ],
      correctIndex: 0,
      explanation: 'La Scala Blues nasce aggiungendo la Quinta Diminuita (b5, detta "Blue Note") tra la 4ª e la 5ª giusta.'
    },
    {
      id: 'q-th15-2',
      question: 'In tonalità di La Blues (A Blues), qual è la nota esatta che funge da Blue Note?',
      options: [
        'Eb (Mi bemolle)',
        'C# (Do diesis)',
        'Bb (Si bemolle)',
        'F# (Fa diesis)'
      ],
      correctIndex: 0,
      explanation: 'In tonalità di La, la quinta giusta è Mi: la quinta diminuita (b5) è la nota Mi bemolle (Eb).'
    },
    {
      id: 'q-th15-3',
      question: 'Qual è il modo più efficace e musicale di impiegare la Blue Note negli assoli?',
      options: [
        'Come nota di passaggio (passing tone) rapida che scivola o si lega verso la 5ª o la 4ª',
        'Tenendola ferma a lungo sulla nota finale dell\'assolo',
        'Suonandola solo con palm muting sul battere',
        'Evitando qualsiasi bending su di essa'
      ],
      correctIndex: 0,
      explanation: 'Essendo un tritono dissonante, la Blue Note sprigiona la sua magia quando usata come gradino di passaggio rapido verso la consonanza della 5ª o della 4ª.'
    },
    {
      id: 'q-th15-4',
      question: 'Quale tecnica di espressione su chitarra imita l\'inflessione vocale blues tra la 4ª e la Blue Note?',
      options: [
        'Il micro-bending di un quarto di tono',
        'Lo sweep picking a 6 corde',
        'Il tapping a 8 dita',
        'La plettrata alternata staccata'
      ],
      correctIndex: 0,
      explanation: 'Il micro-bend di 1/4 di tono piega leggermente la corda tra la 4ª e la b5, simulando il lamento della voce umana blues.'
    }
  ],

  // MODULO 16
  'th-16': [
    {
      id: 'q-th16-1',
      question: 'Quale progressione è definita la "Regina del Pop" per il suo utilizzo in migliaia di successi mondiali?',
      options: [
        'I – V – vi – IV (es. Do – Sol – Lam – Fa)',
        'I – ii – iii – IV',
        'vi – vii° – I – ii',
        'I – IV – I – IV'
      ],
      correctIndex: 0,
      explanation: 'La progressione I - V - vi - IV (Let It Be, No Woman No Cry, With or Without You) è la più usata nella storia della musica moderna.'
    },
    {
      id: 'q-th16-2',
      question: 'Qual è la formula della progressione "Doo-Wop" tipica dei classici anni \'50 come "Stand By Me"?',
      options: [
        'I – vi – IV – V (es. Do – Lam – Fa – Sol)',
        'I – IV – V – I',
        'I – V – IV – I',
        'ii – V – I – vi'
      ],
      correctIndex: 0,
      explanation: 'Il giro Doo-Wop collega Tonica (I), Minore Relativo (vi), Sottodominante (IV) e Dominante (V).'
    },
    {
      id: 'q-th16-3',
      question: 'Quale ruolo emotivo e dinamico riveste l\'accordo di V grado (Dominante) in una progressione?',
      options: [
        'Rappresenta il massimo punto di tensione cinetica che spinge a risolvere sulla Tonica (I)',
        'Rappresenta il punto di assoluto riposo',
        'È un accordo neutrale senza direzione',
        'È sempre un accordo minore'
      ],
      correctIndex: 0,
      explanation: 'Il V grado contiene la sensibile e crea la spinta propulsiva primaria verso la distensione della tonica.'
    },
    {
      id: 'q-th16-4',
      question: 'Nel metodo in 4 passaggi per analizzare le canzoni a orecchio, qual è il primo elemento assoluto da individuare?',
      options: [
        'La Tonica (la nota "casa" di riposo e chiusura del pezzo)',
        'Il tipo di plettro usato dal chitarrista',
        'Il volume della cassa',
        'La marca dell\'amplificatore'
      ],
      correctIndex: 0,
      explanation: 'Individuare la Tonica (la nota di riposo fondamentale) definisce la chiave del brano e permette di tracciare tutti gli altri gradi.'
    }
  ],

  // MODULO 17
  'th-17': [
    {
      id: 'q-th17-1',
      question: 'Perché la progressione II – V – I è così potente e naturale per l\'orecchio umano?',
      options: [
        'Perché si muove lungo il ciclo delle quinte discendenti (o quarte ascendenti)',
        'Perché usa solo tasti a vuoto sulla chitarra',
        'Perché è l\'unica progressione senza accordi minori',
        'Perché non richiede di essere accordati'
      ],
      correctIndex: 0,
      explanation: 'La concatenazione ii → V → I sfrutta la più forte forza gravitazionale dell\'armonia tonale: il movimento per quarte ascendenti/quinte discendenti.'
    },
    {
      id: 'q-th17-2',
      question: 'Cosa sono le "Note Guida" (Guide Tones) negli accordi di una progressione II-V-I?',
      options: [
        'Le Terze e le Settime di ciascun accordo, che si muovono melodicamente per semitoni discendenti',
        'Le note suonate con la corda a vuoto',
        'Esclusivamente le note fondamentali duplicate',
        'I bending al 12° tasto'
      ],
      correctIndex: 0,
      explanation: 'Le terze e le settime definiscono la qualità dell\'accordo e creano linee melodiche collegate da micro-spostamenti di semitono (es. 7ª del Dm7 scende alla 3ª del G7).'
    },
    {
      id: 'q-th17-3',
      question: 'In tonalità di Do Maggiore, quali sono gli accordi a quadriadi che compongono la progressione II – V – I?',
      options: [
        'Dm7 → G7 → Cmaj7',
        'Em7 → A7 → Dmaj7',
        'Cmaj7 → Fmaj7 → G7',
        'Am7 → D7 → Gmaj7'
      ],
      correctIndex: 0,
      explanation: 'In Do Maggiore il ii è Re minore settima (Dm7), il V è Sol settima dominante (G7) e il I è Do settima maggiore (Cmaj7).'
    },
    {
      id: 'q-th17-4',
      question: 'Quale tipo di quadriade si utilizza tipicamente sul secondo grado in una progressione ii – V – i in tonalità MINORE?',
      options: [
        'Una quadriade semidiminuita (m7b5, es. Bm7b5)',
        'Una quadriade Maj7',
        'Una quadriade di dominante pura',
        'Un power chord a vuoto'
      ],
      correctIndex: 0,
      explanation: 'Nel ii-V-i minore (es. in La minore), il secondo grado naturale è il Si semidiminuito (Bm7b5).'
    }
  ],

  // ====================================================================
  // MODULO 18: MODO IONICO
  // ====================================================================
  'th-18': [
    {
      id: 'q-th18-1',
      question: 'Da quale grado della scala maggiore madre si sviluppa il Modo Ionico?',
      options: [
        'Dal 1° Grado (è la scala maggiore naturale pura: 1 - 2 - 3 - 4 - 5 - 6 - 7)',
        'Dal 4° Grado',
        'Dal 6° Grado',
        'Dal 7° Grado'
      ],
      correctIndex: 0,
      explanation: 'Il modo Ionico nasce sul 1° grado ed è la scala di riferimento assoluto di tutta la teoria musicale occidentale.'
    },
    {
      id: 'q-th18-2',
      question: 'Qual è la sequenza corretta di toni e semitoni della scala Ionica?',
      options: [
        'Tono - Tono - Semitono - Tono - Tono - Tono - Semitono (T - T - S - T - T - T - S)',
        'Tono - Semitono - Tono - Tono - Semitono - Tono - Tono',
        'Semitono - Tono - Tono - Tono - Semitono - Tono - Tono',
        'Tono - Tono - Tono - Semitono - Tono - Tono - Semitono'
      ],
      correctIndex: 0,
      explanation: 'La formula T-T-S-T-T-T-S colloca i semitoni naturali tra il 3°-4° grado e tra il 7°-8° grado.'
    },
    {
      id: 'q-th18-3',
      question: 'Per quale motivo la Quarta Giusta (4) è considerata una "Avoid Note" (da maneggiare con cura) nel modo Ionico?',
      options: [
        'Perché dista solo un semitono dalla Terza Maggiore (es. Mi-Fa in Do), creando un attrito aspro se prolungata su un accordo Maj7',
        'Perché non esiste sulla chitarra',
        'Perché trasforma l\'accordo in minore',
        'Perché rompe le corde'
      ],
      correctIndex: 0,
      explanation: 'La 4ª giusta crea una nona minore con la 3ª maggiore; va quindi usata brillantemente come nota di passaggio melodico veloce.'
    },
    {
      id: 'q-th18-4',
      question: 'Quale intervallo del modo Ionico funge da "Sensibile", attirando con forza l\'orecchio verso la Tonica?',
      options: [
        'La Settima Maggiore (7M), distante un solo semitono dall\'ottava',
        'La Seconda Maggiore',
        'La Quarta Giusta',
        'La Quinta Diminuita'
      ],
      correctIndex: 0,
      explanation: 'La 7ª maggiore (Sensibile) dista un semitono dalla tonica e genera la naturale tendenza psicologica alla risoluzione solare.'
    }
  ],

  // ====================================================================
  // MODULO 19: MODO DORICO
  // ====================================================================
  'th-18-dorian': [
    {
      id: 'q-th18-dorian-1',
      question: 'Qual è la formula intervallare del Modo Dorico (costruito sul 2° grado)?',
      options: [
        '1 - 2 - b3 - 4 - 5 - 6 - b7',
        '1 - b2 - b3 - 4 - 5 - b6 - b7',
        '1 - 2 - 3 - 4 - 5 - 6 - 7',
        '1 - 2 - b3 - 4 - 5 - b6 - b7'
      ],
      correctIndex: 0,
      explanation: 'Il Dorico è una scala minore (ha b3 e b7) ma presenta la Sesta Maggiore (6M).'
    },
    {
      id: 'q-th18-dorian-2',
      question: 'Qual è la nota caratteristica che rende il Modo Dorico luminoso ed elegante rispetto alla cupa minore naturale?',
      options: [
        'La Sesta Maggiore (6M, es. la nota Si in Re Dorico)',
        'La Seconda Minore',
        'La Quarta Aumentata',
        'La Quinta Diminuita'
      ],
      correctIndex: 0,
      explanation: 'La Sesta Maggiore naturale solleva la scala dalla drammaticità della minore naturale, infondendo un sapore sofisticato e jazz-rock.'
    },
    {
      id: 'q-th18-dorian-3',
      question: 'Quale celebre progressione a due accordi ("Vamp Dorico") è usata in Oye Como Va di Santana e Another Brick in the Wall dei Pink Floyd?',
      options: [
        'i - IV (oppure im7 - IV7, es. Dm7 – G7 o Dm – G)',
        'I - V - vi - IV',
        'i - bVI - bVII',
        'i - bII'
      ],
      correctIndex: 0,
      explanation: 'L\'accordo IV è maggiore (G contiene la nota Si, 6M di Re), evidenziando all\'istante il colore dorico inconfondibile.'
    },
    {
      id: 'q-th18-dorian-4',
      question: 'Su quali tipi di accordi trova la sua massima espressione improvvisativa il Modo Dorico?',
      options: [
        'Accordi m7, m6, m9 (ad es. Dm7, Dm6, Dm9)',
        'Accordi Maj7#11',
        'Power chord a vuoto suonati a caso',
        'Accordi aumentati simmetrici'
      ],
      correctIndex: 0,
      explanation: 'Essendo un modo minore naturale con la 6ª maggiore, il Dorico è perfetto per suonare sopra accordi m7, m6 e m9.'
    }
  ],

  // ====================================================================
  // MODULO 20: MODO FRIGIO
  // ====================================================================
  'th-18-phrygian': [
    {
      id: 'q-th18-phrygian-1',
      question: 'Su quale grado della scala maggiore madre si sviluppa il Modo Frigio?',
      options: [
        'Sul 3° Grado (es. da Mi a Mi usando i tasti bianchi di Do Maggiore)',
        'Sul 1° Grado',
        'Sul 5° Grado',
        'Sul 7° Grado'
      ],
      correctIndex: 0,
      explanation: 'Il Frigio nasce sul 3° grado ed è la scala minore più aggressiva della famiglia diatonica.'
    },
    {
      id: 'q-th18-phrygian-2',
      question: 'Qual è l\'intervallo caratteristico che conferisce al modo Frigio la sua oscurità claustrofobica amata nel Thrash Metal?',
      options: [
        'La Seconda Minore (b2), distante solo un semitono (1 tasto) dalla tonica',
        'La Terza Maggiore',
        'La Sesta Maggiore',
        'La Settima Maggiore'
      ],
      correctIndex: 0,
      explanation: 'La tensione tagliente tra la tonica a vuoto (es. Mi) e il primo tasto (Fa, b2) è la radice dei riff più pesanti del metal.'
    },
    {
      id: 'q-th18-phrygian-3',
      question: 'Quale progressione di accordi o power chord esalta al massimo la tensione del modo Frigio?',
      options: [
        'i - bII (es. Em - F o power chords E5 - F5)',
        'I - IV - V',
        'i - IV',
        'I - II'
      ],
      correctIndex: 0,
      explanation: 'La cadenza semitonale da Em a F (o E5 a F5) è il timbro inconfondibile di band come Metallica e Slayer.'
    },
    {
      id: 'q-th18-phrygian-4',
      question: 'Quale celebre intro e riff dei Metallica è un manifesto scolastico del Modo Frigio?',
      options: [
        'Wherever I May Roam (con sitar e riff portante a semitoni su Mi)',
        'Nothing Else Matters (intro in arpeggio naturale)',
        'Sweet Child O Mine',
        'Cliffs of Dover'
      ],
      correctIndex: 0,
      explanation: 'Wherever I May Roam sfrutta l\'intervallo Mi - Fa (1 - b2) per creare un\'atmosfera minacciosa e mediorientale.'
    }
  ],

  // ====================================================================
  // MODULO 21: MODO LIDIO
  // ====================================================================
  'th-18-lydian': [
    {
      id: 'q-th18-lydian-1',
      question: 'Qual è la formula intervallare del Modo Lidio (costruito sul 4° grado)?',
      options: [
        '1 - 2 - 3 - #4 - 5 - 6 - 7',
        '1 - 2 - 3 - 4 - 5 - 6 - 7',
        '1 - 2 - b3 - 4 - 5 - 6 - b7',
        '1 - b2 - b3 - 4 - b5 - b6 - b7'
      ],
      correctIndex: 0,
      explanation: 'Il Lidio è una scala maggiore in cui la 4ª nota è alzata di un semitono: Quarta Aumentata (#4).'
    },
    {
      id: 'q-th18-lydian-2',
      question: 'A quale distanza esatta dalla tonica si trova la Quarta Aumentata (#4) caratteristica del Lidio?',
      options: [
        'A 3 Toni interi (6 semitoni - il Tritono)',
        'A 1 semitono',
        'A 2 toni',
        'A 5 toni'
      ],
      correctIndex: 0,
      explanation: 'La #4 dista esattamente 3 toni dalla tonica: sopra la terza maggiore crea una sensazione aerea e fluttuante.'
    },
    {
      id: 'q-th18-lydian-3',
      question: 'Quale accordo a quattro o cinque voci è perfetto come base per un assolo in modo Lidio?',
      options: [
        'Maj7#11 (oppure Maj9#11, es. Cmaj7#11)',
        'm7b5',
        'Accordo minore di settima con nona bemolle',
        'Accordo diminuito puro'
      ],
      correctIndex: 0,
      explanation: 'L\'accordo Maj7#11 accoglie la #4 senza conflitti armonici, dando il tipico sound alla Steve Vai.'
    },
    {
      id: 'q-th18-lydian-4',
      question: 'Quale leggendario brano di Joe Satriani è costruito interamente su un ipnotico pedale in modo Lidio?',
      options: [
        'Flying in a Blue Dream',
        'Always with Me, Always with You',
        'Satch Boogie',
        'Surfing with the Alien'
      ],
      correctIndex: 0,
      explanation: 'Flying in a Blue Dream è una delle massime dimostrazioni del modo Lidio nella storia della chitarra elettrica.'
    }
  ],

  // ====================================================================
  // MODULO 22: MODO MISOLIDIO
  // ====================================================================
  'th-18-mixolydian': [
    {
      id: 'q-th18-mixolydian-1',
      question: 'Cosa differenzia il Modo Misolidio (5° grado) dalla scala maggiore pura (Ionico)?',
      options: [
        'Possiede la Settima Minore (b7) al posto della settima maggiore sensibile',
        'Possiede la Terza Minore',
        'Possiede la Quinta Diminuita',
        'Non ha la tonica'
      ],
      correctIndex: 0,
      explanation: 'Formula: 1 - 2 - 3 - 4 - 5 - 6 - b7. La b7 toglie l\'effetto classico e infonde un calore rilassato e rock/blues.'
    },
    {
      id: 'q-th18-mixolydian-2',
      question: 'Su quale tipologia di accordi il Modo Misolidio rappresenta la scelta armonica naturale e spontanea?',
      options: [
        'Sugli accordi di Dominante 7 (G7, A7, D7, E7)',
        'Sugli accordi Maj7',
        'Sugli accordi semidiminuiti m7b5',
        'Sugli accordi minori senza quinta'
      ],
      correctIndex: 0,
      explanation: 'Contenendo la 3ª maggiore e la 7ª minore, è la scala ideale che si modella sugli accordi di dominante.'
    },
    {
      id: 'q-th18-mixolydian-3',
      question: 'Quale iconica progressione del Classic Rock si basa interamente sul modo Misolidio?',
      options: [
        'I – bVII – IV (ad es. A – G – D o D – C – G, come in Sweet Home Alabama)',
        'i – iv – v',
        'i – bII',
        'I – II'
      ],
      correctIndex: 0,
      explanation: 'La presenza dell\'accordo bVII (Sol in tonalità di La) è la firma armonica del classic rock misolidio.'
    },
    {
      id: 'q-th18-mixolydian-4',
      question: 'In quale celebre assolo Slash dei Guns N\' Roses suona sul cambio accordi D – C – G in Re Misolidio?',
      options: [
        'Nel finale di Sweet Child O\' Mine',
        'In November Rain',
        'In Welcome to the Jungle',
        'In Don\'t Cry'
      ],
      correctIndex: 0,
      explanation: 'L\'assolo conclusivo esplode sulla progressione D - C - G sfruttando a pieno le note del Re Misolidio.'
    }
  ],

  // ====================================================================
  // MODULO 23: MODO EOLICO
  // ====================================================================
  'th-18-aeolian': [
    {
      id: 'q-th18-aeolian-1',
      question: 'Con quale scala fondamentale coincide esattamente il Modo Eolico (6° grado)?',
      options: [
        'Con la Scala Minore Naturale (Relativo Minore)',
        'Con la Scala Blues',
        'Con la Scala Pentatonica Maggiore',
        'Con la Scala Cromatica'
      ],
      correctIndex: 0,
      explanation: 'Il modo Eolico è la scala minore naturale: 1 - 2 - b3 - 4 - 5 - b6 - b7, relativa minore della scala maggiore genitrice.'
    },
    {
      id: 'q-th18-aeolian-2',
      question: 'Qual è la nota caratteristica che distingue l\'Eolico dal modo Dorico?',
      options: [
        'La Sesta Minore (b6), che dista un semitono dalla 5ª e trasmette profonda malinconia',
        'La Seconda Aumentata',
        'La Terza Maggiore',
        'La Settima Diminuita'
      ],
      correctIndex: 0,
      explanation: 'La presenza della b6 genera il colore drammatico e lirico della minore naturale, mentre il Dorico possiede la 6M.'
    },
    {
      id: 'q-th18-aeolian-3',
      question: 'Quale progressione è conosciuta come la classica "Cavalcata Eolica" dell\'Heavy Metal e delle ballate epiche?',
      options: [
        'i – bVI – bVII (ad es. Am – F – G o Em – C – D)',
        'I – IV – V',
        'i – IV',
        'I – bVII – IV'
      ],
      correctIndex: 0,
      explanation: 'Am - F - G è la progressione epica per eccellenza, usata dagli Iron Maiden a Gary Moore a migliaia di brani rock.'
    },
    {
      id: 'q-th18-aeolian-4',
      question: 'Quale leggendario chitarrista blues-rock ha reso straziante il lirismo della sesta minore eolica in brani come Still Got the Blues?',
      options: [
        'Gary Moore',
        'Chuck Berry',
        'B.B. King',
        'Angus Young'
      ],
      correctIndex: 0,
      explanation: 'Gary Moore era un maestro assoluto nel sostenere la b6 eolica facendola cantare con bending profondi e vibrato aggressivo.'
    }
  ],

  // ====================================================================
  // MODULO 24: MODO LOCRIO
  // ====================================================================
  'th-18-locrian': [
    {
      id: 'q-th18-locrian-1',
      question: 'Qual è la caratteristica unica che distingue il Modo Locrio (7° grado) da tutti gli altri 6 modi della scala maggiore?',
      options: [
        'È l\'unico modo a non avere la Quinta Giusta: possiede una Quinta Diminuita (b5 / Tritono)',
        'Non ha la tonica',
        'Ha 8 note invece di 7',
        'È l\'unico modo ad avere la terza maggiore'
      ],
      correctIndex: 0,
      explanation: 'Il Locrio è privo della 5ª giusta; con 1 - b2 - b3 - 4 - b5 - b6 - b7 è un modo diminuito, instabile per natura.'
    },
    {
      id: 'q-th18-locrian-2',
      question: 'Quale accordo a quattro voci è obbligatorio utilizzare per rappresentare la tonica del Modo Locrio?',
      options: [
        'La Quadriade Semidiminuita (m7b5, es. Bm7b5)',
        'Una quadriade Maj7',
        'Un accordo di Dominante 7 puro',
        'Un Power Chord a due note con quinta giusta'
      ],
      correctIndex: 0,
      explanation: 'Avendo 1, b3, b5 e b7, l\'accordo fondamentale del Locrio è la quadriade semidiminuita (m7b5).'
    },
    {
      id: 'q-th18-locrian-3',
      question: 'In quale contesto armonico del Jazz e della Fusion il Modo Locrio trova la sua applicazione classica più comune?',
      options: [
        'Sul secondo grado (ii) nelle progressioni ii – V – i in tonalità MINORE (es. Bm7b5 → E7alt → Am)',
        'Nel Blues a 12 battute maggiore',
        'Nel pop da classifica radiofonica',
        'Negli inni nazionali'
      ],
      correctIndex: 0,
      explanation: 'Nel jazz, il ii grado minore è un accordo m7b5 e la scala d\'impianto naturale è proprio il modo Locrio.'
    },
    {
      id: 'q-th18-locrian-4',
      question: 'In quali generi del Metal moderno il modo Locrio viene sfruttato per il suo sound alienante, apocalittico e dissonante?',
      options: [
        'Death Metal, Black Metal, Progressive e Djent (es. passaggi di Rush, Meshuggah, Gorguts)',
        'Hair Metal anni \'80',
        'Country Rock',
        'Surf Rock'
      ],
      correctIndex: 0,
      explanation: 'La compresenza di b5 e b2 rende il Locrio lo strumento sonoro ideale per riff spietati, claustrofobici e senza speranza.'
    }
  ],

  // MODULO 19
  'th-19': [
    {
      id: 'q-th19-1',
      question: 'Qual è l\'intervallo caratteristico che conferisce al modo FRIGIO la sua oscurità usata nel Thrash Metal (Metallica, Slayer)?',
      options: [
        'La Seconda Minore (b2), distante solo un semitono dalla tonica',
        'La Terza Maggiore',
        'La Sesta Maggiore',
        'La Settima Maggiore'
      ],
      correctIndex: 0,
      explanation: 'La presenza del semitono immediato tra la tonica e il secondo grado (b2) genera la caratteristica tensione tagliente del metal pesante.'
    },
    {
      id: 'q-th19-2',
      question: 'Da quale scala madre deriva il modo "Frigio Dominante"?',
      options: [
        'Dal 5° grado della Scala Minore Armonica',
        'Dalla Scala Pentatonica Maggiore',
        'Dalla Scala Blues diatonica',
        'Dalla Scala Cromatica inversa'
      ],
      correctIndex: 0,
      explanation: 'Il Frigio Dominante è il 5° modo della scala minore armonica, caratterizzato da 1 - b2 - 3 - 4 - 5 - b6 - b7.'
    },
    {
      id: 'q-th19-3',
      question: 'Quale combinazione di note conferisce al Frigio Dominante il suo inconfondibile sapore esotico ed orientale?',
      options: [
        'La compresenza della Seconda Minore (b2) e della Terza Maggiore (3), separate da un tono e mezzo',
        'L\'assenza della quinta',
        'L\'uso esclusivo di note naturali',
        'L\'assenza della tonica'
      ],
      correctIndex: 0,
      explanation: 'Il salto di seconda aumentata (3 semitoni) tra la b2 e la 3 maggiore genera il celebre timbro mediorientale amato da Marty Friedman e Yngwie Malmsteen.'
    },
    {
      id: 'q-th19-4',
      question: 'Su quale accordo di una tonalità minore si innesta alla perfezione il Frigio Dominante?',
      options: [
        'Sull\'accordo di Dominante (V grado maggiore, es. E o E7 in La minore)',
        'Sull\'accordo di primo grado minore a vuoto',
        'Sull\'accordo di sottodominante minore',
        'Su un accordo diminuito isolato'
      ],
      correctIndex: 0,
      explanation: 'Essendo il 5° modo della minore armonica, è la scala perfetta per suonare sull\'accordo di dominante (E7) che risolve su Am.'
    }
  ],

  // MODULO 20
  'th-20': [
    {
      id: 'q-th20-1',
      question: 'Per quale motivo storico i compositori hanno creato la Scala Minore Armonica alterando la minore naturale?',
      options: [
        'Per alzare il 7° grado di un semitono, creando la "Sensibile" che attira l\'orecchio verso la tonica',
        'Perché la minore naturale aveva troppe corde',
        'Per eliminare la terza minore',
        'Per poter suonare senza distorsione'
      ],
      correctIndex: 0,
      explanation: 'Nella minore naturale la settima dista un tono intero dalla tonica; alzandola a settima maggiore (sensibile) si ottiene una risoluzione energica.'
    },
    {
      id: 'q-th20-2',
      question: 'In La Minore Armonica (A Harmonic Minor), qual è l\'unica nota alterata rispetto a La Minore Naturale?',
      options: [
        'G# (Sol diesis - la settima maggiore)',
        'F# (Fa diesis)',
        'C# (Do diesis)',
        'Eb (Mi bemolle)'
      ],
      correctIndex: 0,
      explanation: 'La scala contiene: A - B - C - D - E - F - G#. La nota Sol viene alzata a Sol# (la sensibile).'
    },
    {
      id: 'q-th20-3',
      question: 'Qual è la distanza tra la 6ª minore (Fa) e la 7ª maggiore (Sol#) in La minore armonica?',
      options: [
        '3 semitoni (un Tono e Mezzo / Seconda Aumentata)',
        '1 semitono',
        '2 toni interi',
        'Una quinta giusta'
      ],
      correctIndex: 0,
      explanation: 'Tra Fa e Sol# c\'è un salto di 3 semitoni che definisce il caratteristico suono barocco/neoclassico di Ritchie Blackmore e Randy Rhoads.'
    },
    {
      id: 'q-th20-4',
      question: 'Quale quadriade simmetrica celebre si forma sul 7° grado della scala minore armonica?',
      options: [
        'La Quadriade Diminuita (dim7, es. G#dim7)',
        'Una quadriade Maj7',
        'Una quadriade Minore 7',
        'Un Power chord con nona aggiunta'
      ],
      correctIndex: 0,
      explanation: 'Sul 7° grado della minore armonica nasce l\'accordo diminuito a 4 voci (1-b3-b5-bb7), fondamentale negli arpeggi neoclassici.'
    }
  ],

  // MODULO 21
  'th-21': [
    {
      id: 'q-th21-1',
      question: 'In cosa consiste la meccanica fondamentale della mano destra nella tecnica dello "Sweep Picking"?',
      options: [
        'In un unico movimento continuo e controllato del plettro che "spazzola" le corde consecutive verso il basso o verso l\'alto',
        'In plettrata alternata ad altissima velocità su una sola corda',
        'Nel pizzicare le corde con le unghie senza plettro',
        'Nel picchiettare la tastiera con il bordo del plettro'
      ],
      correctIndex: 0,
      explanation: 'Lo sweep consiste in una spazzolata continua verso il basso (down-sweep) o verso l\'alto (up-sweep) senza interrompere la traiettoria.'
    },
    {
      id: 'q-th21-2',
      question: 'Quale movimento della mano sinistra ("Finger Rolling") è indispensabile affinché l\'arpeggio non si trasformi in un accordo impastato?',
      options: [
        'Rilasciare la pressione del dito subito dopo aver suonato la nota, stoppando la corda precedente mentre si preme la successiva',
        'Tenere tutte le dita schiacciate insieme sui tasti',
        'Suonare solo con il mignolo',
        'Stoppare con il palmo della mano destra l\'intero manico'
      ],
      correctIndex: 0,
      explanation: 'Ogni nota deve suonare singolarmente: il rilascio immediato della pressione evita che le note risuonino simultaneamente generando fango armonico.'
    },
    {
      id: 'q-th21-3',
      question: 'Qual è la caratteristica geometrica straordinaria dell\'Arpeggio Diminuito di Settima (Dim7) sulla tastiera?',
      options: [
        'È una forma simmetrica composta solo da terze minori che si ripete identica ogni 3 tasti lungo tutto il manico',
        'Si può suonare solo al 1° tasto',
        'Non contiene note della scala',
        'Cambia forma su ogni singola corda'
      ],
      correctIndex: 0,
      explanation: 'Poiché ogni nota dista 3 semitoni (terza minore), traslando la diteggiatura di 3 tasti in avanti si ottiene lo stesso arpeggio con le note invertite.'
    },
    {
      id: 'q-th21-4',
      question: 'Quale celebre chitarrista ha portato lo sweep picking neoclassico all\'attenzione mondiale negli anni \'80?',
      options: [
        'Yngwie Malmsteen',
        'B.B. King',
        'Keith Richards',
        'Kurt Cobain'
      ],
      correctIndex: 0,
      explanation: 'Yngwie Malmsteen ha rivoluzionato la chitarra rock fondendo lo sweep picking di arpeggi minori e diminuiti con l\'estetica classica di Paganini e Bach.'
    }
  ]
};
