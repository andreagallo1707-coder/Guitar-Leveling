import { TheoryQuizQuestion } from '../../types';

export const level1Quizzes: Record<string, TheoryQuizQuestion[]> = {
  // MODULO 1
  'th-1': [
    {
      id: 'q-th1-1',
      question: 'Qual è l\'esatta accordatura standard delle 6 corde dalla più spessa (6ª) alla più sottile (1ª)?',
      options: [
        'E - A - D - G - B - E',
        'E - B - G - D - A - E',
        'D - A - D - G - B - E',
        'E - A - D - F# - B - E'
      ],
      correctIndex: 0,
      explanation: 'L\'accordatura standard per chitarra è Mi, La, Re, Sol, Si, Mi (in notazione anglosassone: E - A - D - G - B - E).'
    },
    {
      id: 'q-th1-2',
      question: 'Tra quali coppie di note naturali consecutive c\'è una distanza di solo 1 SEMITONO (1 solo tasto sulla chitarra)?',
      options: [
        'Tra C-D e tra F-G',
        'Tra E-F (Mi-Fa) e tra B-C (Si-Do)',
        'Tra A-B e tra D-E',
        'Tra G-A e tra E-F'
      ],
      correctIndex: 1,
      explanation: 'Nella scala naturale, solo le coppie Mi-Fa (E-F) e Si-Do (B-C) distano un semitono naturale (nessun tasto intermedio).'
    },
    {
      id: 'q-th1-3',
      question: 'Per trovare la stessa nota un\'ottava sopra partendo dalla 6ª corda, quale movimento geometrico si applica sul manico?',
      options: [
        'Avanzare di 2 tasti e scendere di 2 corde (verso la 4ª corda)',
        'Avanzare di 3 tasti sulla stessa corda',
        'Retrocedere di 1 tasto e scendere di 1 corda',
        'Avanzare di 5 tasti e salire di 1 corda'
      ],
      correctIndex: 0,
      explanation: 'La forma geometrica dell\'ottava standard tra 6ª e 4ª corda (e tra 5ª e 3ª corda) è: +2 tasti in avanti e -2 corde verso il basso.'
    },
    {
      id: 'q-th1-4',
      question: 'Quale nota si trova esattamente al 12° tasto di qualsiasi corda sulla chitarra?',
      options: [
        'La stessa identica nota della corda a vuoto, esattamente un\'ottava sopra (rapporto di frequenza 2:1)',
        'Sempre la nota Do (C) a prescindere dalla corda',
        'La quinta giusta della corda a vuoto',
        'Una nota dissonante a frequenza casuale'
      ],
      correctIndex: 0,
      explanation: 'Il 12° tasto divide la corda vibrante esattamente a metà fisica, producendo la medesima nota della corda a vuoto un\'ottava superiore.'
    }
  ],

  // MODULO 2
  'th-2': [
    {
      id: 'q-th2-1',
      question: 'Da quanti suoni e semitoni è composta la scala cromatica all\'interno di un\'ottava completa?',
      options: [
        '12 suoni equidistanti separati ciascuno da un semitono',
        '7 suoni naturali e 2 suoni alterati',
        '8 toni interi consecutivi',
        '10 semitoni diatonici'
      ],
      correctIndex: 0,
      explanation: 'La scala cromatica è composta da 12 note equidistanti, ciascuna separata dalla successiva da un semitono esatto.'
    },
    {
      id: 'q-th2-2',
      question: 'Qual è la differenza fondamentale tra semitono diatonico e semitono cromatico?',
      options: [
        'Il semitono diatonico avviene tra note con nome diverso (es. Mi-Fa), quello cromatico tra la stessa nota con e senza alterazione (es. Do-Do#)',
        'Il semitono diatonico vale 2 tasti sulla chitarra, quello cromatico 1 tasto',
        'Il semitono cromatico esiste solo nei brani classici',
        'Non c\'è alcuna differenza di definizione teorica'
      ],
      correctIndex: 0,
      explanation: 'Il semitono diatonico lega due note dal nome diverso (es. Si-Do, Sol-Lab), mentre il cromatico riguarda lo stesso nome di base alterato (es. Sol-Sol#).'
    },
    {
      id: 'q-th2-3',
      question: 'Sulla tastiera della chitarra, a quanti tasti di distanza fisica corrisponde un semitono?',
      options: [
        'Esattamente 1 tasto (tasto immediatamente adiacente)',
        '2 tasti',
        '3 tasti',
        'Dipende se la corda è liscia o avvolta'
      ],
      correctIndex: 0,
      explanation: 'Nel sistema temperato equabile della chitarra, ogni tasto di tastiera è un semitono esatto.'
    },
    {
      id: 'q-th2-4',
      question: 'Perché la scala cromatica è definita la "tavolozza madre" della musica occidentale?',
      options: [
        'Perché contiene tutte le 12 altezze dell\'ottava, da cui vengono estratte tutte le scale, modi e accordi',
        'Perché si può suonare solo con accordatura aperta',
        'Perché è stata inventata nel periodo barocco per violino',
        'Perché contiene solo note maggiori'
      ],
      correctIndex: 0,
      explanation: 'Qualsiasi scala maggiore, minore, pentatonica o accordo non è altro che un sottoinsieme ricavato dai 12 semitoni della scala cromatica.'
    }
  ],

  // MODULO 3
  'th-3': [
    {
      id: 'q-th3-1',
      question: 'Qual è l\'esatto ordine fisso di comparsa dei DIESIS (#) in chiave?',
      options: [
        'Fa – Do – Sol – Re – La – Mi – Si',
        'Si – Mi – La – Re – Sol – Do – Fa',
        'Do – Re – Mi – Fa – Sol – La – Si',
        'Fa – Sib – Mib – Lab – Reb – Solb – Dob'
      ],
      correctIndex: 0,
      explanation: 'L\'ordine fisso dei diesis è: Fa, Do, Sol, Re, La, Mi, Si.'
    },
    {
      id: 'q-th3-2',
      question: 'Qual è la relazione tra l\'ordine dei diesis e quello dei bemolli (b)?',
      options: [
        'L\'ordine dei bemolli (Si Mi La Re Sol Do Fa) è esattamente lo speculare inverso dell\'ordine dei diesis',
        'Hanno lo stesso identico ordine di comparsa',
        'I bemolli avanzano per terze, i diesis per seconde',
        'Non esiste alcuna corrispondenza geometrica'
      ],
      correctIndex: 0,
      explanation: 'I bemolli procedono nell\'ordine esattamente inverso rispetto ai diesis: Si - Mi - La - Re - Sol - Do - Fa.'
    },
    {
      id: 'q-th3-3',
      question: 'Applicando il "metodo del semitono sotto", quanti e quali diesis possiede la scala di Mi Maggiore?',
      options: [
        '4 diesis (Fa#, Do#, Sol#, Re#)',
        '2 diesis (Fa#, Do#)',
        '5 diesis (Fa#, Do#, Sol#, Re#, La#)',
        '3 diesis (Fa#, Do#, Sol#)'
      ],
      correctIndex: 0,
      explanation: 'Un semitono sotto Mi c\'è Re#; contando nell\'ordine dei diesis fino a Re# si percorrono 4 posizioni: Fa#, Do#, Sol#, Re#.'
    },
    {
      id: 'q-th3-4',
      question: 'Quanti bemolli ha la scala di Mib Maggiore secondo la regola del conteggio +1?',
      options: [
        '3 bemolli (Sib, Mib, Lab)',
        '2 bemolli (Sib, Mib)',
        '4 bemolli (Sib, Mib, Lab, Reb)',
        '1 solo bemolle (Sib)'
      ],
      correctIndex: 0,
      explanation: 'Contando nell\'ordine dei bemolli fino a Mi si hanno Sib e Mib (2 bemolli); aggiungendone uno successivo (+1) si arriva a Lab (totale 3 bemolli: Sib, Mib, Lab).'
    }
  ],

  // MODULO 4
  'th-4': [
    {
      id: 'q-th4-1',
      question: 'Come si determina il "nome numerico" di un intervallo musicale?',
      options: [
        'Contando tutti i nomi delle note dalla prima all\'ultima, includendo sia partenza che arrivo',
        'Contando esclusivamente i semitoni con il righello',
        'Moltiplicando i tasti della chitarra per due',
        'Contando solo le note alterate intermedie'
      ],
      correctIndex: 0,
      explanation: 'Il nome numerico (seconda, terza, quinta...) si ricava contando i nomi delle note da quella di partenza a quella di arrivo, entrambe comprese.'
    },
    {
      id: 'q-th4-2',
      question: 'Se passiamo da Do a Sol (Quinta Giusta) e poi alziamo il Sol a Sol# (Do – Sol#), il nome numerico dell\'intervallo cambia?',
      options: [
        'No: conta sempre 5 lettere (Do, Re, Mi, Fa, Sol), quindi resta una Quinta (ma diventa Aumentata)',
        'Sì, diventa automaticamente una Sesta',
        'Diventa un\'ottava',
        'Dipende se la corda è a vuoto o premuta'
      ],
      correctIndex: 0,
      explanation: 'Il numero dell\'intervallo dipende unicamente dai nomi delle note (Do-Sol = 5). Le alterazioni modificano solo la qualità (Giusta, Aumentata, ecc.).'
    },
    {
      id: 'q-th4-3',
      question: 'Quali gradi della scala maggiore generano esclusivamente intervalli GIUSTI?',
      options: [
        'I gradi 1, 4, 5 e 8',
        'I gradi 2, 3, 6 e 7',
        'I gradi 1, 3 e 5',
        'Tutti i 7 gradi senza eccezione'
      ],
      correctIndex: 0,
      explanation: 'La regola d\'oro stabilisce che i gradi 1 (Unisono), 4 (Quarta), 5 (Quinta) e 8 (Ottava) sono GIUSTI.'
    },
    {
      id: 'q-th4-4',
      question: 'Quali gradi della scala maggiore generano invece intervalli MAGGIORI?',
      options: [
        'I gradi 2, 3, 6 e 7',
        'I gradi 1, 4, 5 e 8',
        'Solo i gradi dispari 3, 5 e 7',
        'Nessuno, sono tutti giusti'
      ],
      correctIndex: 0,
      explanation: 'Nella scala maggiore, i gradi 2 (Seconda), 3 (Terza), 6 (Sesta) e 7 (Settima) generano intervalli MAGGIORI.'
    }
  ],

  // MODULO 5
  'th-5': [
    {
      id: 'q-th5-1',
      question: 'Cosa accade a un intervallo MAGGIORE (es. una Terza o una Settima) se abbassiamo la nota di arrivo di un semitono?',
      options: [
        'Diventa un intervallo MINORE',
        'Diventa un intervallo Diminuito',
        'Diventa un intervallo Giusto',
        'Resta invariato'
      ],
      correctIndex: 0,
      explanation: 'Gli intervalli della famiglia dei Maggiori (2ª, 3ª, 6ª, 7ª), se abbassati di un semitono, diventano MINORI.'
    },
    {
      id: 'q-th5-2',
      question: 'Cosa accade invece a un intervallo GIUSTO (es. una Quarta o una Quinta) se abbassiamo la nota di arrivo di un semitono?',
      options: [
        'Diventa un intervallo DIMINUITO (non esiste la "quinta minore"!)',
        'Diventa un intervallo Minore',
        'Diventa un intervallo Aumentato',
        'Diventa un intervallo Maggiore'
      ],
      correctIndex: 0,
      explanation: 'Gli intervalli Giusti (1ª, 4ª, 5ª, 8ª) non hanno qualità maggiore o minore: se abbassati di un semitono diventano DIMINUITI.'
    },
    {
      id: 'q-th5-3',
      question: 'Qual è l\'esatta Terza Minore partendo dalla nota FA?',
      options: [
        'Lab (Fa - Lab)',
        'La naturale (Fa - La)',
        'Sol# (Fa - Sol#)',
        'Sib (Fa - Sib)'
      ],
      correctIndex: 0,
      explanation: 'La Terza Maggiore di Fa è La; abbassando di un semitono per ottenere la qualità minore si ottiene Lab.'
    },
    {
      id: 'q-th5-4',
      question: 'Se alziamo di un semitono un intervallo sia esso Maggiore che Giusto, quale qualità otteniamo?',
      options: [
        'Aumentato in entrambi i casi',
        'Diminuito',
        'Superiore',
        'Minore'
      ],
      correctIndex: 0,
      explanation: 'Sia gli intervalli Maggiori che quelli Giusti, se alzati di un semitono, diventano AUMENTATI.'
    }
  ],

  // MODULO 6
  'th-6': [
    {
      id: 'q-th6-1',
      question: 'Qual è la regola aurea della somma numerica nel rivolto di qualsiasi intervallo?',
      options: [
        'La somma dell\'intervallo originario e del suo rivolto è SEMPRE uguale a 9',
        'La somma è sempre uguale a 8',
        'La somma è sempre uguale a 12 semitoni',
        'La somma raddoppia il valore di partenza'
      ],
      correctIndex: 0,
      explanation: 'Nel rivolto la somma matematica dei gradi fa sempre 9 (2+7=9, 3+6=9, 4+5=9, ecc.).'
    },
    {
      id: 'q-th6-2',
      question: 'Come si trasforma la qualità di un intervallo MAGGIORE quando viene rivoltato?',
      options: [
        'Diventa MINORE (e un Minore diventa Maggiore)',
        'Resta Maggiore',
        'Diventa Giusto',
        'Diventa Diminuito'
      ],
      correctIndex: 0,
      explanation: 'Nel rivolto la polarità si inverte: il Maggiore diventa Minore, e il Minore diventa Maggiore.'
    },
    {
      id: 'q-th6-3',
      question: 'Cosa accade alla qualità di un intervallo GIUSTO (es. Quarta o Quinta) quando viene rivoltato?',
      options: [
        'Resta rigorosamente GIUSTO (es. la 4ª Giusta diventa 5ª Giusta)',
        'Diventa Maggiore',
        'Diventa Minore',
        'Diventa Aumentato'
      ],
      correctIndex: 0,
      explanation: 'Gli intervalli Giusti mantengono la loro qualità: il rivolto di una Quarta Giusta è una Quinta Giusta, e viceversa.'
    },
    {
      id: 'q-th6-4',
      question: 'Qual è il rivolto esatto di una Terza Minore?',
      options: [
        'Una Sesta Maggiore (3 + 6 = 9, Minore → Maggiore)',
        'Una Sesta Minore',
        'Una Quinta Giusta',
        'Una Settima Maggiore'
      ],
      correctIndex: 0,
      explanation: 'Applicando le due regole: 3 + 6 = 9 (Sesta) e Minore si inverte in Maggiore → Sesta Maggiore.'
    }
  ],

  // MODULO 7
  'th-7': [
    {
      id: 'q-th7-1',
      question: 'A quale celebre brano/tema cinematografico è universalmente associata la Seconda Minore ascendente?',
      options: [
        '"Jaws" (Lo Squalo di John Williams) per le prime due note di tensione ravvicinata',
        '"Star Wars" tema principale',
        '"Happy Birthday"',
        '"My Way"'
      ],
      correctIndex: 0,
      explanation: 'Le celebri prime due note ossessive e claustrofobiche de Lo Squalo sono l\'emblema sonoro della Seconda Minore (1 semitono).'
    },
    {
      id: 'q-th7-2',
      question: 'A quale tema cinematografico corrisponde l\'intervallo potente e solenne di QUINTA GIUSTA ascendente?',
      options: [
        'Il tema principale di "Star Wars"',
        'La sigla dei "Simpsons"',
        'La melodia di "Greensleeves"',
        '"Yesterday" dei Beatles'
      ],
      correctIndex: 0,
      explanation: 'Le prime due note marziali del tema di Star Wars saltano esattamente da fondamentale a Quinta Giusta.'
    },
    {
      id: 'q-th7-3',
      question: 'A quale intervallo corrisponde la sigla iniziale de "I Simpson" o la canzone "Maria" di West Side Story?',
      options: [
        'Alla Quarta Aumentata (Tritono / Quinta Diminuita)',
        'Alla Terza Maggiore',
        'All\'Ottava Giusta',
        'Alla Seconda Maggiore'
      ],
      correctIndex: 0,
      explanation: 'L\'attacco "The Simp-sons" è il classico esempio moderno di Tritono / Quarta Aumentata (6 semitoni).'
    },
    {
      id: 'q-th7-4',
      question: 'Quale trucco mentale permette di decifrare facilmente un intervallo composto come la Nona (9ª)?',
      options: [
        'Pensarlo come una Seconda + un\'Ottava di distanza',
        'Moltiplicare per due la frequenza della tonica',
        'Considerarlo sempre una quinta raddoppiata',
        'Sottrarre 3 semitoni'
      ],
      correctIndex: 0,
      explanation: 'Gli intervalli composti si riducono all\'ottava base: una 9ª suona come una 2ª sollevata di un\'ottava, una 11ª come una 4ª, una 13ª come una 6ª.'
    }
  ]
};
