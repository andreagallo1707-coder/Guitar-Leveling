import { TheoryQuizQuestion } from '../../types';

export const level4Quizzes: Record<string, TheoryQuizQuestion[]> = {
  // MODULO 22
  'th-22': [
    {
      id: 'q-th22-1',
      question: 'Quali sono i 7 elementi fondamentali dell\'analisi strutturale di un brano musicale?',
      options: [
        'Struttura, Tonalità, Armonia, Melodia, Ritmo, Basso, Arrangiamento',
        'Volume, Chitarra, Plettro, Voce, Testo, Microfono, Cavi',
        'Intro, Outro, Assolo, Bridge, Strofa, Ritornello, Coda',
        'BPM, EQ, Riverbero, Delay, Distorsione, Flanger, Chorus'
      ],
      correctIndex: 0,
      explanation: 'I 7 elementi universali consentono di radiografare sia l\'aspetto compositivo (tonalità, armonia, melodia, basso) che la forma e la produzione.'
    },
    {
      id: 'q-th22-2',
      question: 'In cosa consiste il "Metodo del Fischio" per individuare la tonalità di una canzone a orecchio?',
      options: [
        'Nell\'intonare o fischiare una nota fissa continua che suoni in armonia su tutti gli accordi del brano (quella nota è la Tonica)',
        'Nel fischiare il ritmo della batteria prima dell\'intro',
        'Nel contare i fischi del pubblico nei concerti live',
        'Nel testare la risposta in frequenza dei tweeter'
      ],
      correctIndex: 0,
      explanation: 'La Tonica (la "casa" armonica) ha la proprietà acustica di poter risuonare dolcemente sopra quasi tutti i gradi della tonalità senza stonare.'
    },
    {
      id: 'q-th22-3',
      question: 'Come si differenzia solitamente il profilo melodico della Strofa rispetto a quello del Ritornello?',
      options: [
        'La strofa procede per gradi congiunti e note gravi; il ritornello esplode con salti ampi verso il registro acuto',
        'La strofa è sempre urlata e il ritornello è sussurrato',
        'Non c\'è alcuna differenza di registro o andamento',
        'La strofa usa solo il falsetto e il ritornello solo note basse'
      ],
      correctIndex: 0,
      explanation: 'Per ragioni narrative ed emotive, le strofe sono piane e conversazionali, mentre i ritornelli impiegano salti espressivi per catturare l\'attenzione.'
    },
    {
      id: 'q-th22-4',
      question: 'Quale progressione e struttura armonica caratterizza il capolavoro "Johnny B. Goode" di Chuck Berry?',
      options: [
        'Un Blues in 12 battute (I – IV – I – V) a tempo rapido (140 BPM) ricco di double-stops di chitarra',
        'Un valzer lento a tempo 3/4',
        'Una progressione jazzistica II-V-I con accordi semidiminuiti',
        'Una ballad modale frigia senza batteria'
      ],
      correctIndex: 0,
      explanation: 'Johnny B. Goode è l\'archetipo del Rock \'n\' Roll fondato sulla struttura a 12 misure del blues tradizionale in chiave energica.'
    }
  ],

  // MODULO 23
  'th-23': [
    {
      id: 'q-th23-1',
      question: 'Nel modello geometrico della struttura standard pop-rock a 64 battute, quante battute dura tipicamente il Ritornello (Chorus)?',
      options: [
        '8 battute (o 16 con ripetizione)',
        '2 battute sole',
        '33 battute dispari',
        '1 battuta'
      ],
      correctIndex: 0,
      explanation: 'La simmetria formale della musica pop e rock si basa su frasi quadrate da 8 battute (suddivise in 4+4).'
    },
    {
      id: 'q-th23-2',
      question: 'Quali sono le 4 tecniche maestre per comporre una linea melodica vocale o di chitarra?',
      options: [
        'Gradi congiunti (linearità), Salti espressivi, Call & Response (domanda/risposta), Profili arpeggiati',
        'Plettrata alternata, Palm muting, Tapping, Bending',
        'Quattro note a caso ripetute all\'infinito',
        'Solo note cromatiche discendenti'
      ],
      correctIndex: 0,
      explanation: 'Queste 4 tecniche guidano la melodia alternando prevedibilità rassicurante (gradi congiunti e arpeggi) a slanci drammatici (salti e dialogo).'
    },
    {
      id: 'q-th23-3',
      question: 'Cosa prevede la regola delle "Scatole Cinesi" nell\'arrangiamento e produzione di un brano?',
      options: [
        'Non svelare tutti gli strumenti all\'inizio: partire spogli e aggiungere strati sonori progressivi nei ritornelli successivi',
        'Suonare con la chitarra dentro una cassa acustica chiusa',
        'Usare solo strumenti tradizionali cinesi',
        'Eliminare il basso da tutto il brano'
      ],
      correctIndex: 0,
      explanation: 'L\'arrangiamento moderno funziona per accumulo e respiro: la stratificazione graduale mantiene viva la curiosità dell\'ascoltatore fino al climax finale.'
    },
    {
      id: 'q-th23-4',
      question: 'Cosa afferma la legge sul diritto d\'autore riguardo alle "Progressioni Armoniche" (giri di accordi)?',
      options: [
        'I giri di accordi NON sono coperti da copyright: si può usare qualsiasi progressione celebre creando una propria melodia e testo originali',
        'È vietato usare progressioni già scritte da altri compositori',
        'Bisogna pagare una tassa speciale per usare la progressione I-V-vi-IV',
        'I giri di accordi appartengono solo al primo compositore che li ha registrati nel 1800'
      ],
      correctIndex: 0,
      explanation: 'Le sequenze di accordi sono di pubblico dominio: il copyright tutela unicamente la melodia originale, il testo letterario e la registrazione fonografica.'
    }
  ]
};
