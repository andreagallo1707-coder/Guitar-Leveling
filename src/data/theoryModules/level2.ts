import { TheoryModule } from '../../types';

export const level2Modules: TheoryModule[] = [
  // ====================================================================
  // MODULO 8: I POWER CHORDS & IL SUONO ROCK/METAL
  // ====================================================================
  {
    id: 'th-8',
    title: '8. I Power Chords & Il Suono Rock/Metal',
    category: 'Armonia Rock & Progressioni',
    level: 2,
    readTimeMin: 6,
    shortSummary: 'Perché i Power Chord suonano così potenti con la distorsione e come spostarli agilmente su tutta la tastiera.',
    fullContent: `### Il Mattone Fondamentale dell'Heavy Metal e del Rock

Il **Power Chord** (siglato comunemente con il numero **5**, ad esempio **E5, A5, C5, D5**) è l'accordo più utilizzato nella storia della chitarra elettrica. Da Jimi Hendrix e Jimmy Page fino ai Metallica, Iron Maiden e Nirvana, ha plasmato il suono della musica moderna.

### La Formula del Power Chord
A differenza degli accordi tradizionali a tre note (triadi), il power chord è composto da sole **due note distinte**:
- **Tonica (1):** La nota di base che dà il nome all'accordo (es. Mi, La, Do).
- **Quinta Giusta (5):** L'intervallo a 7 semitoni di distanza.
- *(Opzionale)* **Ottava (8ve):** La tonica duplicata un'ottava sopra per dare più spessore e sustain.

### Perché non hanno la Terza?
Negli accordi acustici la terza (Maggiore o Minore) definisce se l'armonia è allegra o triste. Ma quando applichi l'high-gain (distorsione metal), le terze generano **frequenze di intermodulazione dissonanti** che impastano e sporcano il suono nelle frequenze basse.
Eliminando la terza, il power chord rimane **neutro, solido e potentissimo**, consentendo alla distorsione di cantare con definizione chirurgica.

### Diteggiatura e Forma Standard:
- **Tonica sulla 6ª corda (es. 5° tasto = La/A):**
  - 6ª corda: 5° tasto con l'indice (A - Tonica)
  - 5ª corda: 7° tasto con l'anulare (E - Quinta)
  - 4ª corda: 7° tasto con il mignolo (A - Ottava)
- **Corde non suonate:** Tutte le altre corde (3ª, 2ª, 1ª) vanno categoricamente stoppate con il polpastrello inclinato dell'indice per evitare ronzii!`,
    keyTakeaways: [
      'Formula essenziale: Tonica (1) + Quinta Giusta (5)',
      'Accordo neutro: privo di terza, può sostituire sia accordi maggiori che minori',
      'La forma a due o tre dita si sposta identica lungo tutta la 6ª e la 5ª corda',
      'Il muting delle corde inutilizzate con la mano sinistra è fondamentale per evitare rumori di fondo'
    ],
    fretboardFormula: {
      rootNote: 'A',
      scaleOrChordName: 'Power Chord A5 (5ª posizione)',
      intervals: ['1', '5', '8ve'],
      notesOnFretboard: [
        { fret: 5, string: 6, label: 'A (1)', isRoot: true },
        { fret: 7, string: 5, label: 'E (5)' },
        { fret: 7, string: 4, label: 'A (8ve)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-alt-spider-warmup'],
    xpReward: 180
  },

  // ====================================================================
  // MODULO 9: LE TRIADI: L'ARCHITETTURA DEGLI ACCORDI A TRE VOCI
  // ====================================================================
  {
    id: 'th-9',
    title: '9. Le Triadi: L\'Architettura degli Accordi a Tre Voci',
    category: 'Triadi, Quadriadi & Rivolti',
    level: 2,
    readTimeMin: 8,
    shortSummary: 'Costruzione, le 4 famiglie di triadi (Maggiore, Minore, Aumentata, Diminuita) e i loro profili emotivi.',
    fullContent: `### Cosa sono le Triadi?

Mentre gli intervalli studiano la distanza tra due suoni singoli, la **triade** è l'accordo primario della musica occidentale: è formata da **tre note sovrapposte per intervalli di terza**.

In pratica, si sceglie una nota iniziale (la fondamentale), si salta una nota della scala per prendere la **terza**, e si salta un'altra nota per prendere la **quinta**.

**Struttura Invariabile: Fondamentale + Terza + Quinta**

---

### Le 4 Famiglie di Triadi (e le loro Emozioni):

#### 1. Triade MAGGIORE
- **Formula:** Fondamentale + 3ª Maggiore + 5ª Giusta
- **Modello in Do:** Do – Mi – Sol
- **Profilo Emotivo:** Luminoso, aperto, perfettamente stabile e sereno (evoca luce, gioia, primavera).

#### 2. Triade MINORE
- **Formula:** Fondamentale + 3ª Minore + 5ª Giusta
- **Modello in Do:** Do – Mib – Sol
- **Profilo Emotivo:** Malinconico, intimo, raccolto (evoca tramonto, riflessione, nostalgia).

#### 3. Triade AUMENTATA
- **Formula:** Fondamentale + 3ª Maggiore + 5ª Aumentata
- **Modello in Do:** Do – Mi – Sol#
- **Profilo Emotivo:** Teso, sospeso, onirico, fluttuante (evoca mistero, scene di sogno o magia).

#### 4. Triade DIMINUITA
- **Formula:** Fondamentale + 3ª Minore + 5ª Diminuita
- **Modello in Do:** Do – Mib – Solb
- **Profilo Emotivo:** Cupissimo, claustrofobico, saturo di tensione (il caratteristico suono del pericolo e della suspense cinematografica).

---

### Come Costruire Qualsiasi Triade (Metodo in 3 Passaggi):
1. **Passaggio 1:** Scrivi la scala maggiore della nota fondamentale (es. per una triade di Sol: Sol, La, Si, Do, Re, Mi, Fa#).
2. **Passaggio 2:** Estrai il 1°, 3° e 5° grado: ottieni immediatamente la **Triade Maggiore** di base (Sol – Si – Re).
3. **Passaggio 3:** Applica le alterazioni correttive per ottenere le altre qualità:
   - **Per la Minore:** Abbassa la 3ª di 1 semitono (Si diventa Sib → Sol – Sib – Re).
   - **Per l'Aumentata:** Alza la 5ª di 1 semitono (Re diventa Re# → Sol – Si – Re#).
   - **Per la Diminuita:** Abbassa sia la 3ª che la 5ª di 1 semitono (Sol – Sib – Reb).`,
    keyTakeaways: [
      'Una triade è formata da 3 note: Fondamentale (1) + Terza (3) + Quinta (5)',
      'Esistono 4 tipi: Maggiore, Minore, Aumentata e Diminuita',
      'La terza definisce il carattere solare o malinconico dell\'accordo',
      'La quinta ne stabilisce la stabilità (quinta giusta) o la tensione eccentrica (aumentata/diminuita)'
    ],
    fretboardFormula: {
      rootNote: 'C',
      scaleOrChordName: 'Triade Do Maggiore sulle corde 3-2-1',
      intervals: ['1', '3', '5'],
      notesOnFretboard: [
        { fret: 5, string: 3, label: 'C (1)', isRoot: true },
        { fret: 5, string: 2, label: 'E (3)' },
        { fret: 3, string: 1, label: 'G (5)' }
      ]
    },
    relatedExerciseIds: ['ex-picking-alt-spider-warmup'],
    xpReward: 190
  },

  // ====================================================================
  // MODULO 10: I RIVOLTI DELLE TRIADI & CONDUZIONE DELLE VOCI
  // ====================================================================
  {
    id: 'th-10',
    title: '10. I Rivolti delle Triadi & Conduzione delle Voci',
    category: 'Triadi, Quadriadi & Rivolti',
    level: 3,
    readTimeMin: 8,
    shortSummary: 'Stato fondamentale, 1° e 2° rivolto, eliminare i salti goffi sulla chitarra e connettere le voci.',
    fullContent: `### Cos'è il Rivolto di una Triade?

Finora abbiamo considerato gli accordi nella loro forma base, con la nota fondamentale posizionata al basso (la nota più grave).
Nella musica reale, per evitare salti goffi di mano e collegare armonicamente le melodie, **le note dell'accordo vengono rimescolate mettendo al basso la terza o la quinta**.

Questo processo genera i **rivolti**:

1. **Stato Fondamentale (5/3):** La **Fondamentale** sta al basso (dà stabilità granitica e chiusura definitiva).
   - Esempio in Do: **Do (basso) – Mi – Sol**
2. **Primo Rivolto (Accordo di Sesta - 6):** La **Terza** sta al basso (suono aperto, dinamico e leggero).
   - Esempio in Do: **Mi (basso) – Sol – Do** (Intervallo caratteristico: tra Mi e Do c'è una Sesta!).
3. **Secondo Rivolto (Accordo di Sesta e Quarta - 6/4):** La **Quinta** sta al basso (suono instabile, sospeso, chiede una risoluzione).
   - Esempio in Do: **Sol (basso) – Do – Mi** (Intervalli sopra il basso: una Quarta Do e una Sesta Mi).

---

### Tabella Completa dei Rivolti (Modello di Do):
- **Do Maggiore:** Fond: Do-Mi-Sol | 1° Riv: Mi-Sol-Do | 2° Riv: Sol-Do-Mi
- **Do Minore:** Fond: Do-Mib-Sol | 1° Riv: Mib-Sol-Do | 2° Riv: Sol-Do-Mib
- **Do Aumentato:** Fond: Do-Mi-Sol# | 1° Riv: Mi-Sol#-Do | 2° Riv: Sol#-Do-Mi
- **Do Diminuito:** Fond: Do-Mib-Solb | 1° Riv: Mib-Solb-Do | 2° Riv: Solb-Do-Mib

---

### Lo Strano Caso di "Do – Mi – La": Chi è Davvero?
Considera le note **Do – Mi – La**. Esistono due interpretazioni analitiche dipendenti dal contesto del brano:
1. **La minore in primo rivolto (Lam/Do):** La triade naturale La-Do-Mi ribaltata mettendo il Do al basso. Ha un colore morbido e malinconico.
2. **Do Maggiore con sesta aggiunta (C6):** La triade Do-Mi-Sol con l'aggiunta della sesta (La) e l'omissione della quinta.

*Come si risolve il dubbio?* Il contesto armonico è sovrano: se il brano sta risolvendo verso Mi7 o gira attorno a La, è un **Lam in primo rivolto**. Se invece gravita attorno alla dominante Sol7 o chiude su Do, è un **Do con sesta**!

### Perché i Rivolti sono l'Arma Segreta del Chitarrista?
Sulla chitarra, suonare una progressione (ad es. Do - Fa - Sol - Do) in stato fondamentale richiede ampi salti di braccio lungo la tastiera.
Usando i rivolti sulle prime tre corde (Sol, Si, Mi cantino), puoi suonare gli stessi accordi **restando nello spazio di 2-3 tasti**, muovendo le singole dita solo di un semitono o di un tono. Questa è la vera *Voice Leading* (conduzione delle voci) dei professionisti!`,
    keyTakeaways: [
      'Stato fondamentale = fondamentale al basso; 1° rivolto = terza al basso; 2° rivolto = quinta al basso',
      'Notazione: nessuno (fondamentale), 6 (primo rivolto), 6/4 (secondo rivolto)',
      'I rivolti trasformano la pesantezza degli accordi in un flusso melodico fluido',
      'Consentono di accompagnare e suonare assoli su accordi rimanendo nella stessa posizione della tastiera'
    ],
    fretboardFormula: {
      rootNote: 'C',
      scaleOrChordName: 'I 3 Stati della Triade di Do sulle corde 3-2-1',
      intervals: ['1', '3', '5'],
      notesOnFretboard: [
        { fret: 5, string: 3, label: 'C (Fond)', isRoot: true },
        { fret: 5, string: 2, label: 'E' },
        { fret: 3, string: 1, label: 'G' },
        { fret: 9, string: 3, label: 'E (1° Riv)' },
        { fret: 8, string: 2, label: 'G' },
        { fret: 8, string: 1, label: 'C', isRoot: true },
        { fret: 12, string: 3, label: 'G (2° Riv)' },
        { fret: 13, string: 2, label: 'C', isRoot: true },
        { fret: 12, string: 1, label: 'E' }
      ]
    },
    relatedExerciseIds: ['ex-picking-pedal-point-metal'],
    xpReward: 200
  },

  // ====================================================================
  // MODULO 11: L'ARMONIZZAZIONE DELLA SCALA MAGGIORE IN TRIADI
  // ====================================================================
  {
    id: 'th-11',
    title: '11. L\'Armonizzazione della Scala Maggiore in Triadi',
    category: 'Triadi, Quadriadi & Rivolti',
    level: 3,
    readTimeMin: 8,
    shortSummary: 'I 7 accordi naturali di una tonalità, la formula assiomatica immutabile e la sostituzione del VII grado.',
    fullContent: `### Cos'è l'Armonizzazione di una Scala?

Armonizzare una scala significa **costruire una triade su ciascuno dei suoi 7 gradi**, utilizzando esclusivamente le note che appartengono a quella specifica tonalità.
Prendi ogni nota come fondamentale al basso e sovrapponi la sua terza e la sua quinta diatoniche.

Il risultato è straordinario: si ottengono **7 accordi naturali**, che rappresentano la "famiglia armonica" di quella tonalità.

---

### La Formula Assiomatica Universale:
A prescindere dalla nota di partenza (Do, Sol, Re, Mib, ecc.), la natura dei 7 gradi è **assolutamente identica e immutabile per tutte le scale maggiori**:

| Grado | Nome del Grado | Tipo di Triade | Esempio in DO | Esempio in SOL |
| :--- | :--- | :--- | :--- | :--- |
| **I** | Tonica | **Maggiore** | DO | SOL |
| **ii** | Sopratonica | **Minore** | REm | LAm |
| **iii** | Mediante | **Minore** | MIm | SIm |
| **IV** | Sottodominante | **Maggiore** | FA | DO |
| **V** | Dominante | **Maggiore** | SOL | RE |
| **vi** | Sopradominante | **Minore** | LAm | MIm |
| **vii°** | Sensibile | **Diminuita** | SI° | FA#° |

### La Regola Mnemonica Infallibile:
*"Maggiore – Minore – Minore – Maggiore – Maggiore – Minore – Diminuita"*
- Gradi **I, IV, V** sono sempre **MAGGIORI**.
- Gradi **ii, iii, vi** sono sempre **MINORI**.
- Il grado **vii°** è l'unico **DIMINUITO**.

---

### Il Caso Particolare del VII Grado (L'Accordo Diminuito nel Pop)
Il VII grado genera un accordo diminuito (es. Si diminuito in Do: Si – Re – Fa) contenente il tritono (Si-Fa). A causa della sua forte instabilità acustica, nella musica moderna e pop non viene quasi mai usato allo stato puro.

**La Soluzione Operativa: La sostituzione con il V grado in primo rivolto!**
- VII grado (Si dim): **Si – Re – Fa**
- V grado in primo rivolto (Sol/Si): **Si – Re – Sol**

Le due strutture condividono due note su tre (Si e Re). Sostituire il VII° con il V in primo rivolto preserva la linea melodica del basso intatta (che continua a muoversi verso il Do) ma addolcisce la tensione aspra del tritono, garantendo una conduzione perfetta!`,
    keyTakeaways: [
      'Armonizzare = generare le triadi su ciascun grado usando solo le note della tonalità',
      'Struttura fissa universale: I Magg, II min, III min, IV Magg, V Magg, VI min, VII dim',
      'I pilastri cardine del rock e del pop poggiano sui gradi I, IV, V e VI',
      'Nel pop il VII grado diminuito viene quasi sempre surrogato dal V grado in primo rivolto (es. Sol/Si)'
    ],
    relatedExerciseIds: ['ex-picking-3nps-scale-runs'],
    xpReward: 210
  },

  // ====================================================================
  // MODULO 12: LE QUADRIADI: ACCORDI DI SETTIMA
  // ====================================================================
  {
    id: 'th-12',
    title: '12. Le Quadriadi: Accordi di Settima & Armonizzazione a Quattro Voci',
    category: 'Triadi, Quadriadi & Rivolti',
    level: 3,
    readTimeMin: 9,
    shortSummary: 'I 5 tipi di quadriadi (Maj7, 7, m7, m7b5, dim7), armonizzazione a 4 voci e i rivolti con Slash Chords.',
    fullContent: `### Dalle Triadi alle Quadriadi: Aggiungere la Quarta Voce

Se le triadi erano come i colori primari di un pittore, le **quadriadi** (dette anche **accordi di settima**) permettono di mescolarli per ottenere sfumature tridimensionali ricche, sofisticate e piene di profondità.

Una quadriade si ottiene prendendo una triade (1ª + 3ª + 5ª) e sovrapponendo un'ulteriore terza, ottenendo la **Settima (7ª)**.

**Formula Base: Fondamentale + Terza + Quinta + Settima**

---

### I 5 Tipi di Quadriadi Fondamentali:

1. **Settima Maggiore (Maj7 / 7M):**
   - *Formula:* 1ª + 3ª Magg + 5ª Giusta + 7ª Magg (es. Cmaj7 = Do – Mi – Sol – Si)
   - *Profilo Emotivo:* Dolce, sognante, nostalgico, jazzistico, "da colonna sonora".
2. **Settima di Dominante (7):**
   - *Formula:* 1ª + 3ª Magg + 5ª Giusta + 7ª Minore (es. G7 = Sol – Si – Re – Fa)
   - *Profilo Emotivo:* Teso, graffiante, intriso di sapore blues; genera il tritono tra 3ª e 7ª che spinge con forza alla risoluzione.
3. **Settima Minore (m7):**
   - *Formula:* 1ª + 3ª Min + 5ª Giusta + 7ª Minore (es. Am7 = La – Do – Mi – Sol)
   - *Profilo Emotivo:* Caldo, notturno, soffice, riflessivo (la base del funk, soul e jazz).
4. **Settima Semidiminuita (m7b5 / ø7):**
   - *Formula:* 1ª + 3ª Min + 5ª Diminuita + 7ª Minore (es. Bm7b5 = Si – Re – Fa – La)
   - *Profilo Emotivo:* Cupo, misterioso, drammatico; è il perno fondamentale delle cadenze minori nel jazz e metal progressive.
5. **Settima Diminuita (dim7 / °7):**
   - *Formula:* 1ª + 3ª Min + 5ª Diminuita + 7ª Diminuita (es. Cdim7 = Do – Mib – Solb – Sibb)
   - *Profilo Emotivo:* Tensione claustrofobica assoluta, instabilità horror simmetrica (composta solo da intervalli di 3 semitoni).

---

### L'Armonizzazione a 4 Voci della Scala Maggiore:
Sovrapponendo le settime diatoniche sui 7 gradi della scala di Do Maggiore:
- **I Grado:** **Cmaj7** (Settima Maggiore)
- **ii Grado:** **Dm7** (Settima Minore)
- **iii Grado:** **Em7** (Settima Minore)
- **IV Grado:** **Fmaj7** (Settima Maggiore)
- **V Grado:** **G7** (Settima di Dominante!)
- **vi Grado:** **Am7** (Settima Minore)
- **vii° Grado:** **Bm7b5** (Settima Semidiminuita)

### I Rivolti delle Quadriadi e gli Slash Chords:
Avendo 4 note, ogni quadriade ha 4 disposizioni:
- **Stato Fondamentale:** Fondamentale al basso (G7)
- **1° Rivolto:** 3ª al basso → **G7/B** (Sol7 con Si al basso)
- **2° Rivolto:** 5ª al basso → **G7/D** (Sol7 con Re al basso)
- **3° Rivolto:** 7ª al basso → **G7/F** (Sol7 con Fa al basso)

Nel rock e nel pop, usare un accordo come **G7/B** permette di collegare fluidamente una progressione da Do a Do/Si e La minore senza salti bruschi di basso!`,
    keyTakeaways: [
      'Quadriade = Triade (1-3-5) + Settima (7)',
      'I 5 pilastri: Maj7 (sognante), 7 di Dominante (blues/tensione), m7 (caldo), m7b5 (semidiminuito), dim7 (horror)',
      'Gradi della scala maggiore: Imaj7, IIm7, IIIm7, IVmaj7, V7, VIm7, VIIm7b5',
      'I rivolti di settima (es. G7/B) creano linee di basso discendenti raffinate (Slash Chords)'
    ],
    fretboardFormula: {
      rootNote: 'C',
      scaleOrChordName: 'Quadriade Cmaj7 (Posizione Drop 2)',
      intervals: ['1', '3', '5', '7'],
      notesOnFretboard: [
        { fret: 3, string: 5, label: 'C (1)', isRoot: true },
        { fret: 5, string: 4, label: 'G (5)' },
        { fret: 4, string: 3, label: 'B (7)' },
        { fret: 5, string: 2, label: 'E (3)' }
      ]
    },
    relatedExerciseIds: ['ex-sweep-5strings-arpeggios'],
    xpReward: 220
  },

  // ====================================================================
  // MODULO 13: IL SISTEMA CAGED: CONNETTERE L'INTERO MANICO
  // ====================================================================
  {
    id: 'th-13',
    title: '13. Il Sistema CAGED: Connettere l\'Intero Manico',
    category: 'Fondamenti & Tastiera',
    level: 3,
    readTimeMin: 8,
    shortSummary: 'Come 5 semplici forme di accordi aperti ti permettono di mappare qualsiasi accordo o scala lungo tutto il manico.',
    fullContent: `### Il Codice Segreto della Chitarra

Il sistema **CAGED** prende il nome dai 5 accordi aperti fondamentali che tutti impariamo all'inizio: **C (Do), A (La), G (Sol), E (Mi), D (Re)**.

La tastiera della chitarra è circolare e si ripete sempre in questa sequenza ordinata:
**C → A → G → E → D → C ...**

Questo significa che qualsiasi accordo (maggiore, minore o di settima) può essere suonato in **5 forme geometriche differenti** muovendosi verso i tasti acuti della chitarra.

### Come Usare il CAGED per Suonare lo Stesso Accordo Ovunque:
Se vuoi suonare l'accordo di **Do Maggiore (C)** lungo tutto il manico:
1. **Forma C:** Al capotasto (posizione aperta standard).
2. **Forma A:** Barré al 3° tasto (tonica su 5ª corda, 3° tasto).
3. **Forma G:** Barré al 5° tasto (tonica su 6ª corda, 8° tasto).
4. **Forma E:** Barré all'8° tasto (tonica su 6ª corda, 8° tasto - il classico barré rock!).
5. **Forma D:** Al 10° tasto (tonica su 4ª corda, 10° tasto).

Superato il 12° tasto, il ciclo ricomincia esattamente dalla forma C un'ottava sopra!

### Dagli Accordi ai Soli: Il Potere del CAGED
Il CAGED non serve solo per la chitarra ritmica:
- Sotto ogni forma del CAGED c'è una **scatola (box) della scala pentatonica**.
- Sotto ogni forma ci sono le **note bersaglio (target notes / triadi)** su cui atterrare durante un assolo per far suonare le frasi musicali e perfettamente connesse con l'armonia.`,
    keyTakeaways: [
      'I 5 accordi aperti C-A-G-E-D formano una catena geometrica continua lungo il manico',
      'La sequenza è circolare e si ripete sempre nello stesso ordine: C → A → G → E → D → C',
      'Ogni forma di accordo racchiude al suo interno la relativa forma della pentatonica e della scala maggiore',
      'Permette di trovare all\'istante arpeggi e voicing dello stesso accordo in qualsiasi registro'
    ],
    fretboardFormula: {
      rootNote: 'C',
      scaleOrChordName: 'Do Maggiore nelle Forme E e A (CAGED)',
      intervals: ['1', '3', '5'],
      notesOnFretboard: [
        { fret: 3, string: 5, label: 'C (Root A-shape)', isRoot: true },
        { fret: 5, string: 4, label: 'G' },
        { fret: 5, string: 3, label: 'C', isRoot: true },
        { fret: 5, string: 2, label: 'E' },
        { fret: 8, string: 6, label: 'C (Root E-shape)', isRoot: true },
        { fret: 10, string: 5, label: 'G' },
        { fret: 10, string: 4, label: 'C', isRoot: true },
        { fret: 9, string: 3, label: 'E' },
        { fret: 8, string: 2, label: 'G' },
        { fret: 8, string: 1, label: 'C', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-alt-spider-warmup', 'ex-sweep-5strings-arpeggios'],
    xpReward: 230
  }
];
