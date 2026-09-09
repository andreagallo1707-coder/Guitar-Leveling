import { TheoryQuizQuestion } from '../../types';

export const level2Quizzes: Record<string, TheoryQuizQuestion[]> = {
  // MODULO 8
  'th-8': [
    {
      id: 'q-th8-1',
      question: 'Quali sono gli intervalli che compongono la formula essenziale di un Power Chord (siglato "5")?',
      options: [
        'Tonica (1) e Quinta Giusta (5)',
        'Tonica (1), Terza Maggiore (3) e Quinta (5)',
        'Tonica (1) e Terza Minore (b3)',
        'Tonica (1), Quarta Giusta (4) e Settima (7)'
      ],
      correctIndex: 0,
      explanation: 'Un Power Chord è un bicordo formato unicamente da Tonica (1) e Quinta Giusta (5), talvolta arricchito dall\'ottava.'
    },
    {
      id: 'q-th8-2',
      question: 'Perché l\'assenza della Terza rende il Power Chord ideale per la distorsione heavy metal?',
      options: [
        'Perché evita le frequenze di intermodulazione dissonanti generate dalle terze a gain elevato',
        'Perché la terza rende l\'accordo troppo acuto',
        'Perché i pickup per chitarra elettrica non possono catturare le terze',
        'Perché rende obbligatoria l\'accordatura Drop D'
      ],
      correctIndex: 0,
      explanation: 'La distorsione moltiplica le armoniche: senza la terza, l\'intervallo puro di quinta produce un suono massiccio, nitido e privo di impastamenti fangosi.'
    },
    {
      id: 'q-th8-3',
      question: 'Un Power Chord (es. C5) è di natura maggiore o minore?',
      options: [
        'È neutro: privo di terza, può rimpiazzare indifferentemente accordi maggiori o minori',
        'È rigorosamente maggiore',
        'È rigorosamente minore',
        'È sempre diminuito'
      ],
      correctIndex: 0,
      explanation: 'Essendo privo di terza (l\'intervallo che definisce la modalità), il power chord è neutro e funziona sia su armonie maggiori che minori.'
    },
    {
      id: 'q-th8-4',
      question: 'Come devono essere gestite le corde non suonate quando si esegue un power chord con la mano sinistra?',
      options: [
        'Vanno stoppate (mute) con il polpastrello inclinato dell\'indice per evitare rumori',
        'Vanno lasciate vibrare liberamente a vuoto',
        'Vanno premute con il pollice',
        'Non fa alcuna differenza sul timbro distorto'
      ],
      correctIndex: 0,
      explanation: 'Il muting con la parte inferiore dell\'indice è vitale per impedire che le corde adiacenti risuonino per simpatia con la distorsione.'
    }
  ],

  // MODULO 9
  'th-9': [
    {
      id: 'q-th9-1',
      question: 'Da quali intervalli è composta invariabilmente una triade musicale elementare?',
      options: [
        'Fondamentale (1ª), Terza (3ª) e Quinta (5ª)',
        'Fondamentale, Quarta e Settima',
        'Tre note qualsiasi a distanza casuale',
        'Solo toni interi'
      ],
      correctIndex: 0,
      explanation: 'La triade classica è formata da tre note sovrapposte per intervalli di terza: 1ª, 3ª e 5ª.'
    },
    {
      id: 'q-th9-2',
      question: 'Quali sono le 4 famiglie di triadi codificate nella musica occidentale?',
      options: [
        'Maggiore, Minore, Aumentata, Diminuita',
        'Maggiore, Minore, Sospesa, Neutra',
        'Giusta, Alterata, Diminuita, Eolica',
        'Diatonica, Cromatica, Modale, Tonale'
      ],
      correctIndex: 0,
      explanation: 'Le 4 combinazioni possibili tra terza (maggiore/minore) e quinta (giusta/aumentata/diminuita) generano: Maggiore, Minore, Aumentata e Diminuita.'
    },
    {
      id: 'q-th9-3',
      question: 'Qual è la formula strutturale esatta di una Triade DIMINUITA (es. Do dim)?',
      options: [
        'Fondamentale + 3ª Minore + 5ª Diminuita (Do – Mib – Solb)',
        'Fondamentale + 3ª Maggiore + 5ª Diminuita',
        'Fondamentale + 3ª Minore + 5ª Giusta',
        'Fondamentale + 4ª Giusta + 5ª Diminuita'
      ],
      correctIndex: 0,
      explanation: 'La triade diminuita unisce una terza minore a una quinta diminuita (tritono dalla fondamentale), conferendole il suo colore claustrofobico e teso.'
    },
    {
      id: 'q-th9-4',
      question: 'Quale intervallo all\'interno della triade è il responsabile primario del carattere "solare" o "malinconico"?',
      options: [
        'L\'intervallo di Terza (Maggiore = solare, Minore = malinconico)',
        'L\'intervallo di Quinta',
        'L\'ottava superiore',
        'L\'unisono'
      ],
      correctIndex: 0,
      explanation: 'La Terza è l\'intervallo modale per eccellenza: definisce istantaneamente il colore emotivo aperto/solare (terza maggiore) o intimo/malinconico (terza minore).'
    }
  ],

  // MODULO 10
  'th-10': [
    {
      id: 'q-th10-1',
      question: 'Quando una triade si trova nel suo "Primo Rivolto" (detto anche accordo di sesta)?',
      options: [
        'Quando la Terza dell\'accordo è la nota più grave posizionata al basso',
        'Quando la Quinta dell\'accordo sta al basso',
        'Quando la Fondamentale sta al basso',
        'Quando viene suonata con il plettro al contrario'
      ],
      correctIndex: 0,
      explanation: 'Nel primo rivolto (notazione 6) la Terza si trova al basso; la fondamentale dista una sesta da essa.'
    },
    {
      id: 'q-th10-2',
      question: 'Quale nota sta al basso in un accordo in "Secondo Rivolto" (notazione 6/4)?',
      options: [
        'La Quinta dell\'accordo (es. Sol nel caso della triade di Do Maggiore)',
        'La Terza dell\'accordo',
        'La Fondamentale',
        'La Settima'
      ],
      correctIndex: 0,
      explanation: 'Nel secondo rivolto (6/4 o sesta e quarta) la Quinta dell\'accordo è posta al basso, generando una forte sensazione di sospensione.'
    },
    {
      id: 'q-th10-3',
      question: 'Perché la triade Do – Mi – La può essere interpretata in due modi differenti?',
      options: [
        'Può essere vista sia come La minore in 1° rivolto (Lam/Do) che come Do Maggiore con 6ª aggiunta (C6 senza 5ª)',
        'Perché contiene un semitono nascosto',
        'Perché è un accordo illegale nell\'armonia classica',
        'Perché dipende dalla scala pentatonica'
      ],
      correctIndex: 0,
      explanation: 'A seconda della risoluzione armonica nel brano, Do-Mi-La funge o da primo rivolto di Lam (La-Do-Mi) o da voicing sintetico di C6 (Do-Mi-[Sol]-La).'
    },
    {
      id: 'q-th10-4',
      question: 'Qual è il vantaggio tecnico primario nell\'utilizzare i rivolti delle triadi sulle prime 3 corde della chitarra?',
      options: [
        'Permette di collegare gli accordi con micro-spostamenti di 1-2 tasti, eliminando salti bruschi lungo il manico',
        'Rende la chitarra più veloce del basso',
        'Aumenta il volume di uscita dei pickup',
        'Elimina la necessità di accordare lo strumento'
      ],
      correctIndex: 0,
      explanation: 'I rivolti consentono la vera conduzione delle voci (voice leading): le note si muovono per toni e semitoni restando comodamente nella stessa area della tastiera.'
    }
  ],

  // MODULO 11
  'th-11': [
    {
      id: 'q-th11-1',
      question: 'Qual è la formula qualitativa fissa dei 7 gradi nell\'armonizzazione della scala maggiore in triadi?',
      options: [
        'I Magg, ii min, iii min, IV Magg, V Magg, vi min, vii° dim',
        'I Magg, II Magg, III Magg, IV min, V min, VI min, VII dim',
        'Tutti e 7 i gradi sono sempre Maggiori',
        'I min, ii min, iii Magg, IV Magg, V dim, vi Magg, vii min'
      ],
      correctIndex: 0,
      explanation: 'La successione universale immutabile è: Maggiore, Minore, Minore, Maggiore, Maggiore, Minore, Diminuita.'
    },
    {
      id: 'q-th11-2',
      question: 'Quali sono i 3 accordi MAGGIORI cardine generati dall\'armonizzazione della scala maggiore?',
      options: [
        'I gradi I (Tonica), IV (Sottodominante) e V (Dominante)',
        'I gradi ii, iii e vi',
        'I gradi I, ii e iii',
        'I gradi IV, V e vi'
      ],
      correctIndex: 0,
      explanation: 'I gradi I, IV e V sono sempre triadi maggiori e costituiscono le fondamenta della musica pop, rock e blues.'
    },
    {
      id: 'q-th11-3',
      question: 'Quale grado della scala maggiore genera l\'unico accordo DIMINUITO?',
      options: [
        'Il VII grado (Sensibile, es. Si diminuito in Do Maggiore)',
        'Il II grado',
        'Il III grado',
        'Il VI grado'
      ],
      correctIndex: 0,
      explanation: 'Il VII grado naturale della scala maggiore (la Sensibile) genera l\'unica triade diminuita a causa del tritono tra fondamentale e quinta.'
    },
    {
      id: 'q-th11-4',
      question: 'Nella musica moderna e pop, come viene regolarmente surrogato l\'accordo di VII grado diminuito?',
      options: [
        'Con l\'accordo di V grado in primo rivolto (es. Sol/Si al posto di Si dim in Do Maggiore)',
        'Con l\'accordo di I grado in stato fondamentale',
        'Con un power chord al 12° tasto',
        'Non viene mai sostituito'
      ],
      correctIndex: 0,
      explanation: 'Il V grado in 1° rivolto (Sol/Si) mantiene il Si al basso verso il Do ma sostituisce il tritono aspro con la stabilità solare della dominante.'
    }
  ],

  // MODULO 12
  'th-12': [
    {
      id: 'q-th12-1',
      question: 'Qual è la differenza fondamentale tra una triade e una quadriade?',
      options: [
        'La quadriade aggiunge una quarta voce sovrapposta per terza: la Settima (1-3-5-7)',
        'La quadriade si suona sempre su 4 manici diversi',
        'La quadriade raddoppia solo la fondamentale',
        'La quadriade ha solo note alterate'
      ],
      correctIndex: 0,
      explanation: 'La quadriade (accordo a 4 voci) nasce sovrapponendo un\'ulteriore terza alla triade di base, ottenendo l\'intervallo di settima.'
    },
    {
      id: 'q-th12-2',
      question: 'Qual è la formula strutturale della "Settima di Dominante" (siglata semplicemente con il numero 7, es. G7)?',
      options: [
        'Triade Maggiore + Settima Minore (1 - 3 - 5 - b7)',
        'Triade Maggiore + Settima Maggiore (1 - 3 - 5 - 7)',
        'Triade Minore + Settima Minore (1 - b3 - 5 - b7)',
        'Triade Diminuita + Settima Minore (1 - b3 - b5 - b7)'
      ],
      correctIndex: 0,
      explanation: 'La Settima di Dominante unisce una triade maggiore solare con una settima minore, creando il tritono interno tra la 3ª e la b7 che genera tensione.'
    },
    {
      id: 'q-th12-3',
      question: 'Quali sono i tipi di quadriadi che si formano sui gradi I e IV della scala maggiore?',
      options: [
        'Settima Maggiore (Maj7, es. Cmaj7 e Fmaj7 in Do)',
        'Settima di Dominante (7)',
        'Settima Minore (m7)',
        'Settima Diminuita (dim7)'
      ],
      correctIndex: 0,
      explanation: 'Sui gradi I e IV si formano quadriadi con Settima Maggiore naturale (Maj7), dal timbro nostalgico e sognante.'
    },
    {
      id: 'q-th12-4',
      question: 'Cosa indica la notazione "Slash Chord" G7/B?',
      options: [
        'L\'accordo di Sol7 eseguito nel suo primo rivolto, con la nota Si al basso',
        'Due accordi da suonare contemporaneamente su due chitarre',
        'Un accordo di Si bemolle con il Sol stoppato',
        'Una divisione ritmica in battere'
      ],
      correctIndex: 0,
      explanation: 'Negli slash chords (accordo/basso), la lettera prima della barra è l\'accordo e quella dopo è la specifica nota da posizionare al basso (G7 con Si al basso = 1° rivolto).'
    }
  ],

  // MODULO 13
  'th-13': [
    {
      id: 'q-th13-1',
      question: 'Da dove deriva il celebre acronimo del sistema "CAGED"?',
      options: [
        'Dalle 5 forme degli accordi aperti fondamentali: C (Do), A (La), G (Sol), E (Mi), D (Re)',
        'Dai cognomi di cinque storici chitarristi jazz',
        'Da un metodo per accordare la chitarra con il capotasto',
        'Dalle scale pentatoniche minori senza la terza'
      ],
      correctIndex: 0,
      explanation: 'Il sistema prende il nome dalle 5 posizioni aperte base (C, A, G, E, D) che si concatenano geometricamente lungo la tastiera.'
    },
    {
      id: 'q-th13-2',
      question: 'In che ordine geometrico si susseguono le forme CAGED salendo verso i tasti più acuti del manico?',
      options: [
        'Sempre in sequenza circolare: C → A → G → E → D → C...',
        'In ordine alfabetico: A → B → C → D → E',
        'In ordine casuale dipendente dal numero dei tasti',
        'In ordine inverso da D a C'
      ],
      correctIndex: 0,
      explanation: 'La catena è geometricamente circolare e invariabile: dopo la forma C segue sempre la A, poi la G, la E, la D e si riparte dalla C.'
    },
    {
      id: 'q-th13-3',
      question: 'Quale forma del sistema CAGED corrisponde al classico accordo con barré rock con fondamentale sulla 6ª corda?',
      options: [
        'La Forma E (derivata dalla posizione aperta di Mi)',
        'La Forma C',
        'La Forma D',
        'La Forma A'
      ],
      correctIndex: 0,
      explanation: 'Il barré standard sulla 6ª corda non è altro che la forma aperta di Mi Maggiore (E) spostata in avanti con l\'indice che funge da capotasto.'
    },
    {
      id: 'q-th13-4',
      question: 'Come aiuta il sistema CAGED un chitarrista solista durante l\'improvvisazione?',
      options: [
        'Collega ogni forma di accordo al relativo box di pentatonica e alle note dell\'arpeggio su cui atterrare',
        'Insegna a suonare solo accordi aperti senza toccare i tasti alti',
        'Permette di suonare scale veloci senza guardare il manico',
        'Elimina la necessità di conoscere i nomi delle note'
      ],
      correctIndex: 0,
      explanation: 'Il CAGED permette al solista di "vedere" l\'accordo sottostante sotto le dita, offrendo target notes perfette per ogni cambio armonico.'
    }
  ]
};
