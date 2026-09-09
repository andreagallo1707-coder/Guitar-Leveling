import { TheoryModule } from '../../types';

export const level1Modules: TheoryModule[] = [
  // ====================================================================
  // MODULO 1: MAPPATURA DELLA TASTIERA
  // ====================================================================
  {
    id: 'th-1',
    title: '1. Mappatura della Tastiera, Corde & Note Fondamentali',
    category: 'Fondamenti & Tastiera',
    level: 1,
    readTimeMin: 6,
    shortSummary: 'Come orientarsi sulle 6 corde, memorizzare le ottave e trovare all\'istante qualsiasi nota sulla chitarra.',
    fullContent: `### Benvenuto in Guitar Leveling!

La chitarra elettrica può sembrare un labirinto di legno e metallo, ma nasconde una logica geometrica perfetta. Prima di suonare assoli o comporre brani, dobbiamo imparare a orientarci senza esitazione.

### L'Accordatura Standard (Dalla corda più spessa alla più sottile):
- **6ª Corda (Più spessa):** Mi basso (E)
- **5ª Corda:** La (A)
- **4ª Corda:** Re (D)
- **3ª Corda:** Sol (G)
- **2ª Corda:** Si (B)
- **1ª Corda (Più sottile / Cantino):** Mi cantino (e)

Un acronimo classico per memorizzarla facilmente in inglese: **E**ddie **A**te **D**ynamite, **G**ood **B**ye **E**ddie!

### La Formula del Semitono e del Tono sulla Tastiera
Sulla chitarra la fisica è visiva e immediata:
- **1 Semitono** = Distanza di **1 solo tasto** (tasto adiacente).
- **1 Tono** = Distanza di **2 tasti** (es. dal 3° al 5° tasto).

Nella scala naturale di 7 note (Do, Re, Mi, Fa, Sol, La, Si), quasi tutte le note distano un tono intero l'una dall'altra, con **due sole fondamentali eccezioni naturali**:
- Tra **Mi e Fa (E - F)** c'è solo **1 semitono** (1 solo tasto di distanza).
- Tra **Si e Do (B - C)** c'è solo **1 semitono** (1 solo tasto di distanza).

Tutte le altre coppie (Do-Re, Re-Mi, Fa-Sol, Sol-La, La-Si) distano **2 tasti (1 Tono intero)**.

### I Segreti delle Ottave (Il Trucco Geometrico)
Non serve memorizzare tutti i 24 tasti a memoria per ciascuna corda. Puoi usare la geometria delle ottave:
- **Dalla 6ª alla 4ª corda:** Muoviti **2 tasti in avanti e scendi di 2 corde** (es. 6ª corda 3° tasto = Sol → 4ª corda 5° tasto = Sol un'ottava sopra).
- **Dalla 5ª alla 3ª corda:** Stessa regola! **2 tasti in avanti e 2 corde verso il basso** (es. 5ª corda 3° tasto = Do → 3ª corda 5° tasto = Do).
- **Il 12° Tasto:** Divide la corda esattamente a metà: riproduce la stessa identica nota della corda a vuoto, esattamente un'ottava sopra!`,
    keyTakeaways: [
      'Accordatura standard: E - A - D - G - B - E (dalla 6ª alla 1ª corda)',
      '1 tasto = 1 semitono; 2 tasti = 1 tono intero',
      'Le uniche note naturali a distanza di 1 solo tasto sono Mi-Fa e Si-Do',
      'La regola delle ottave (+2 tasti, -2 corde) permette di raddoppiare all\'istante qualsiasi nota sul manico'
    ],
    fretboardFormula: {
      rootNote: 'E',
      scaleOrChordName: 'Ottave di Mi (E) sulle 6 Corde',
      intervals: ['1', '8ve'],
      notesOnFretboard: [
        { fret: 0, string: 6, label: 'E', isRoot: true },
        { fret: 2, string: 4, label: 'E', isRoot: true },
        { fret: 2, string: 1, label: 'E', isRoot: true },
        { fret: 7, string: 5, label: 'E', isRoot: true },
        { fret: 9, string: 3, label: 'E', isRoot: true },
        { fret: 12, string: 6, label: 'E', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-alt-spider-warmup', 'ex-picking-pedal-point-metal'],
    xpReward: 100
  },

  // ====================================================================
  // MODULO 2: LA SCALA CROMATICA & IL SISTEMA DEI 12 SEMITONI
  // ====================================================================
  {
    id: 'th-2',
    title: '2. La Scala Cromatica & il Sistema dei 12 Semitoni',
    category: 'Fondamenti & Tastiera',
    level: 1,
    readTimeMin: 6,
    shortSummary: 'I 12 gradini dell\'ottava, semitono diatonico vs cromatico e la matrice di tutti gli accordi e scale.',
    fullContent: `### Cos'è la Scala Cromatica?

La **Scala Cromatica** è la scala musicale più completa e inclusiva della musica occidentale: è composta da **12 suoni equidistanti** tra loro all'interno di un'ottava, ciascuno separato dall'altro esattamente da un intervallo di **un semitono** (1 tasto sulla chitarra).

Immagina una scala a chiocciola di 13 gradini (dal gradino 0 di partenza al gradino 12 che rappresenta l'ottava identica):

1. **Do (0)** - Punto di partenza
2. **Do# / Reb (+1 st)**
3. **Re (+1 st)**
4. **Re# / Mib (+1 st)**
5. **Mi (+1 st)**
6. **Fa (+1 st)** - Nota bene: nessun tasto intermedio tra Mi e Fa!
7. **Fa# / Solb (+1 st)**
8. **Sol (+1 st)**
9. **Sol# / Lab (+1 st)**
10. **La (+1 st)**
11. **La# / Sib (+1 st)**
12. **Si (+1 st)**
13. **Do superiore (+1 st)** - Ottava superiore (12 semitoni completati)

### Semitono Diatonico vs Semitono Cromatico
È una distinzione teorica fondamentale che ogni chitarrista preparato deve conoscere:
- **Semitono Diatonico:** Avviene tra due note con **nome diverso** (es. Mi e Fa, Si e Do, oppure Sol e Lab).
- **Semitono Cromatico:** Avviene tra due note che condividono lo **stesso nome di base**, dove una è alterata (es. Do e Do#, oppure Sol e Sol#).

Sulla tastiera della chitarra, a livello puramente acustico e fisico, entrambi corrispondono allo spostamento di **un solo tasto** (grazie al sistema del *Temperamento Equabile* moderno).

### Applicazione Pratica sulla Chitarra
Suonare cromaticamente sulla chitarra (ad esempio i famosi esercizi spider 1-2-3-4) allena l'indipendenza delle quattro dita della mano sinistra, ma dal punto di vista armonico la scala cromatica è la "tavolozza completa dei colori": qualsiasi scala (maggiore, minore, pentatonica, modi) o accordo esistente non è altro che una **selezione specifica estratta da questi 12 semitoni**.`,
    keyTakeaways: [
      'La scala cromatica racchiude tutti i 12 semitoni temperati dell\'ottava',
      'Ogni tasto del manico corrisponde esattamente a un intervallo di 1 semitono',
      'Semitono diatonico: tra note con nomi diversi (es. Mi-Fa, Si-Do)',
      'Semitono cromatico: tra la stessa nota naturale e la sua versione alterata (es. Do-Do#)'
    ],
    fretboardFormula: {
      rootNote: 'C',
      scaleOrChordName: 'Scala Cromatica da Do sulla 5ª corda',
      intervals: ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'],
      notesOnFretboard: [
        { fret: 3, string: 5, label: 'C', isRoot: true },
        { fret: 4, string: 5, label: 'C#' },
        { fret: 5, string: 5, label: 'D' },
        { fret: 6, string: 5, label: 'D#' },
        { fret: 7, string: 5, label: 'E' },
        { fret: 8, string: 5, label: 'F' },
        { fret: 9, string: 5, label: 'F#' },
        { fret: 10, string: 5, label: 'G' },
        { fret: 11, string: 5, label: 'G#' },
        { fret: 12, string: 5, label: 'A' },
        { fret: 13, string: 5, label: 'A#' },
        { fret: 14, string: 5, label: 'B' },
        { fret: 15, string: 5, label: 'C', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-alt-spider-warmup', 'ex-picking-3nps-scale-runs'],
    xpReward: 120
  },

  // ====================================================================
  // MODULO 3: L'ORDINE DEI DIESIS E DEI BEMOLLI
  // ====================================================================
  {
    id: 'th-3',
    title: '3. L\'Ordine dei Diesis e dei Bemolli (Come Ricavare le Scale Maggiori)',
    category: 'Scale Maggiori, Minori & Modi',
    level: 1,
    readTimeMin: 7,
    shortSummary: 'La sequenza geometrica delle alterazioni in chiave e i due trucchi flash per trovare le armature all\'istante.',
    fullContent: `### L'Ordine Fisso delle Alterazioni in Chiave

Le alterazioni non compaiono mai a caso sul pentagramma o nelle scale: seguono un ordine matematico rigoroso e speculare.

### L'Ordine dei DIESIS (#):
**Fa – Do – Sol – Re – La – Mi – Si**

Ogni diesis aggiunto in chiave segue questa precisa sequenza, partendo sempre da Fa#. Una frase mnemonica classica per fissarla all'istante nella memoria:
*"Fa Do Sol Re La Mi Si"* (imparala come una filastrocca ritmata).

### L'Ordine dei BEMOLLI (b):
**Si – Mi – La – Re – Sol – Do – Fa**

Nota la perfetta simmetria: l'ordine dei bemolli è **esattamente l'ordine inverso (speculare)** di quello dei diesis! Si parte da Sib e si procede a ritroso.

---

### Il Trucco per Ricavare Velocemente le Alterazioni

Non serve memorizzare tutte le scale a memoria. Bastano due trucchi mentali:

#### 1. Scale con i DIESIS: Il Metodo del Semitono Sotto
1. Prendi la nota fondamentale della scala desiderata.
2. **Scendi di 1 semitono diatonico**: quella nota è l'**ultimo diesis** della scala (quello più a destra in chiave).
3. Conta nell'ordine dei diesis (*Fa Do Sol Re La Mi Si*) fino a quella nota: il numero di passi corrisponde al numero totale di diesis!

*Esempio (Scala di Mi Maggiore):*
- Fondamentale = **Mi**.
- Scendo di un semitono → **Re#** (questo è l'ultimo diesis).
- Conto nell'ordine dei diesis: Fa#, Do#, Sol#, Re# → **4 posizioni**.
- Risultato immediato: la scala di Mi Maggiore ha **4 diesis (Fa#, Do#, Sol#, Re#)**!

---

#### 2. Scale con i BEMOLLI: Fa a Memoria + Conteggio del +1
- **Regola di base:** La scala di **Fa Maggiore** va ricordata a memoria: ha una sola alterazione, il **Sib**.
- **Per tutte le altre scale con bemolli (che partono con una nota col bemolle: Sib, Mib, Lab, Reb, Solb, Dob):**
  1. Conta nell'ordine dei bemolli (*Si Mi La Re Sol Do Fa*) partendo da Sib fino a raggiungere la fondamentale della scala.
  2. **Aggiungi poi un ulteriore bemolle (+1)**: quello sarà il numero totale di bemolli della scala!

*Esempio (Scala di Mib Maggiore):*
- Conto fino a Mi: Sib, Mib → sono 2 posizioni.
- Aggiungo il successivo (+1) → **Lab** (totale 3 bemolli).
- Risultato immediato: la scala di Mib Maggiore ha **3 bemolli (Sib, Mib, Lab)**!`,
    keyTakeaways: [
      'Ordine dei diesis: Fa - Do - Sol - Re - La - Mi - Si',
      'Ordine dei bemolli: Si - Mi - La - Re - Sol - Do - Fa (esatto opposto speculare)',
      'Scale con diesis: scendi di 1 semitono dalla tonica e conta nell\'ordine dei diesis',
      'Scale con bemolli: Fa maggiore ha solo Sib; per le altre conta fino alla tonica e aggiungi 1 bemolle'
    ],
    relatedExerciseIds: ['ex-picking-3nps-scale-runs'],
    xpReward: 130
  },

  // ====================================================================
  // MODULO 4: GLI INTERVALLI MUSICALI: IL VOCABOLARIO DELLE EMOZIONI
  // ====================================================================
  {
    id: 'th-4',
    title: '4. Gli Intervalli Musicali: Il Vocabolario delle Emozioni Sonore',
    category: 'Intervalli & Ear Training',
    level: 1,
    readTimeMin: 7,
    shortSummary: 'Distanza tra due note, regola aurea del conteggio numerico e la scala maggiore come metro di paragone.',
    fullContent: `### Cosa sono gli Intervalli?

Un **intervallo musicale** è la distanza che intercorre tra due suoni. Se suoni un Do e poi un Sol, l'orecchio percepisce un "salto" preciso: quella distanza fisica e acustica è l'intervallo.

Come i colori primari si mescolano per creare infinite sfumature su una tela, due note suonate insieme o in sequenza generano un'emozione specifica:
- **Do – Re:** Tensione, spinta, movimento.
- **Do – Mi:** Pienezza, calore, solarità.
- **Do – Do (8va):** Purezza assoluta, vuoto armonico, specchio perfetto.

Gli intervalli sono il vero **vocabolario fondamentale** della musica: ogni melodia, riff o accordo non è altro che una combinazione di intervalli.

---

### La Regola del Conteggio – Il Nome Numerico

Per dare un nome a un intervallo, la regola è semplicissima: **si contano i nomi delle note dalla prima all'ultima, includendo sia il punto di partenza che il punto di arrivo**.

*Esempio: Da Do a Sol*
1: Do | 2: Re | 3: Mi | 4: Fa | 5: Sol
→ Sono 5 nomi di note consecutive → L'intervallo è una **QUINTA**.

### Attenzione: I Diesis e i Bemolli NON cambiano il Numero!
Un Do e un Sol# contano sempre 5 lettere (Do, Re, Mi, Fa, Sol): rimane matematicamente una **Quinta**!
- Do – Sol = Quinta Giusta (7 semitoni, pura e stabile)
- Do – Sol# = Quinta Aumentata (8 semitoni, tesa e stridente)
- Do – Solb = Quinta Diminuita (6 semitoni / tritono, cupa e instabile)

**Regola Fondamentale:** Il numero dell'intervallo dipende **SOLO dai nomi delle note**. Diesis e bemolli ne modificano la qualità, ma mai il numero!

---

### La Scala Maggiore – Il Nostro Metro di Misura

La scala maggiore è il "righello" perfetto della musica occidentale, perché partendo dalla tonica genera esclusivamente intervalli **GIUSTI** o **MAGGIORI**:

- Grado 1 → 1: **Unisono Giusto**
- Grado 1 → 2: **Seconda Maggiore** (Tensione, passo naturale)
- Grado 1 → 3: **Terza Maggiore** (Gioia, apertura solare)
- Grado 1 → 4: **Quarta Giusta** (Apertura, solennità)
- Grado 1 → 5: **Quinta Giusta** (Potenza, stabilità granitica)
- Grado 1 → 6: **Sesta Maggiore** (Nostalgia, calore melodico)
- Grado 1 → 7: **Settima Maggiore** (Suspense, attesa protesa verso l'ottava)
- Grado 1 → 8: **Ottava Giusta** (Completezza, trasparenza pura)

**La Regola d'Oro da ricordare a memoria:**
- I gradi **1, 4, 5, 8** generano intervalli **GIUSTI**.
- I gradi **2, 3, 6, 7** generano intervalli **MAGGIORI**.`,
    keyTakeaways: [
      'L\'intervallo è la distanza tra due suoni (in semitoni e in nomi di grado)',
      'Il numero si ricava contando tutte le note comprese tra partenza e arrivo (incluse)',
      'Diesis e bemolli cambiano la qualità (maggiore, minore, ecc.), non il numero generico',
      'I gradi 1, 4, 5, 8 della scala maggiore sono Giusti; i gradi 2, 3, 6, 7 sono Maggiori'
    ],
    fretboardFormula: {
      rootNote: 'C',
      scaleOrChordName: 'Intervalli Diatonici da Do sulla tastiera',
      intervals: ['1', '2M', '3M', '4G', '5G', '6M', '7M', '8G'],
      notesOnFretboard: [
        { fret: 3, string: 5, label: '1 (C)', isRoot: true },
        { fret: 5, string: 5, label: '2M (D)' },
        { fret: 2, string: 4, label: '3M (E)' },
        { fret: 3, string: 4, label: '4G (F)' },
        { fret: 5, string: 4, label: '5G (G)' },
        { fret: 2, string: 3, label: '6M (A)' },
        { fret: 4, string: 3, label: '7M (B)' },
        { fret: 5, string: 3, label: '8G (C)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-alt-spider-warmup'],
    xpReward: 140
  },

  // ====================================================================
  // MODULO 5: COSTRUZIONE PRATICA DEGLI INTERVALLI
  // ====================================================================
  {
    id: 'th-5',
    title: '5. Costruzione Pratica degli Intervalli (Il Metodo in 3 Passaggi)',
    category: 'Intervalli & Ear Training',
    level: 2,
    readTimeMin: 8,
    shortSummary: 'Il protocollo meccanico infallibile per costruire qualsiasi intervallo partendo da zero e il motto mnemonico.',
    fullContent: `### Come si Costruisce un Intervallo Partendo da Zero?

Costruire un intervallo significa: data una qualsiasi nota di partenza, individuare con esattezza matematica la nota di arrivo che si trova a quella precisa distanza qualitativa.

Per farlo, usiamo sempre la scala maggiore della fondamentale come griglia di riferimento universale.

### Il Metodo in 3 Passaggi:
1. **Passaggio 1:** Scrivi mentalmente (o su carta) la scala maggiore della nota di partenza (la fondamentale).
2. **Passaggio 2:** Cerca il grado corrispondente al numero dell'intervallo desiderato (es. se cerchi una 3ª, prendi il 3° grado; se cerchi una 5ª, prendi il 5° grado). Questo ti fornisce la versione "standard" (Maggiore per 2, 3, 6, 7; Giusta per 4, 5, 8).
3. **Passaggio 3:** Modifica la nota di arrivo (se necessario) con le alterazioni per ottenere la qualità desiderata.

---

### La Tabella delle Trasformazioni:
- **Per gli intervalli MAGGIORI (2ª, 3ª, 6ª, 7ª):**
  - **Maggiore:** Lasci invariata la nota della scala maggiore.
  - **Minore:** Abbassi la nota di 1 semitono (aggiungi un bemolle $b$ o togli un diesis $\#$).
  - **Aumentato:** Alzi la nota di 1 semitono (aggiungi un diesis $\#$ o togli un bemolle $b$).
- **Per gli intervalli GIUSTI (4ª, 5ª, 8ª):**
  - **Giusto:** Lasci invariata la nota della scala maggiore.
  - **Diminuito:** Abbassi la nota di 1 semitono (aggiungi un bemolle o togli un diesis).
  - **Aumentato:** Alzi la nota di 1 semitono (aggiungi un diesis o togli un bemolle).

---

### Esempi Pratici Dettagliati:

#### Esempio A: Costruire una TERZA MINORE partendo da DO
1. Scala di Do Maggiore: Do, Re, Mi, Fa, Sol, La, Si.
2. 3° Grado = Mi (che è una Terza Maggiore).
3. Voglio una Terza Minore → Abbasso di 1 semitono: Mi diventa **Mib**.
- Risultato: **Do – Mib** è una Terza Minore!

#### Esempio B: Costruire una QUINTA DIMINUITA partendo da SOL
1. Scala di Sol Maggiore: Sol, La, Si, Do, Re, Mi, Fa#.
2. 5° Grado = Re (che è una Quinta Giusta).
3. Voglio una Quinta Diminuita → Abbasso di 1 semitono: Re diventa **Reb**.
- Risultato: **Sol – Reb** è una Quinta Diminuita (il Tritono)!

#### Esempio C: Costruire una SETTIMA MINORE partendo da LA
1. Scala di La Maggiore: La, Si, Do#, Re, Mi, Fa#, Sol#.
2. 7° Grado = Sol# (che è una Settima Maggiore).
3. Voglio una Settima Minore → Abbasso di 1 semitono: Sol# con il semitono in meno diventa **Sol naturale**.
- Risultato: **La – Sol** è una Settima Minore!

### Il Motto per non Sbagliare Mai:
*"Prima scrivo la scala, il grado vado a prendere,*
*Se è Giusto o Maggiore, lo lascio così com'è.*
*Se voglio un intervallo diverso e speciale,*
*Un semitono in su o in giù lo faccio diventare!"*`,
    keyTakeaways: [
      'Il punto di riferimento universale è sempre la scala maggiore della nota di partenza',
      'Un intervallo Maggiore abbassato di 1 semitono diventa Minore',
      'Un intervallo Giusto abbassato di 1 semitono diventa Diminuito (non minore!)',
      'Sia i Maggiori che i Giusti alzati di 1 semitono diventano Aumentati'
    ],
    relatedExerciseIds: ['ex-picking-pedal-point-metal'],
    xpReward: 150
  },

  // ====================================================================
  // MODULO 6: I RIVOLTI DEGLI INTERVALLI
  // ====================================================================
  {
    id: 'th-6',
    title: '6. I Rivolti degli Intervalli (Le Simmetrie Matematiche)',
    category: 'Intervalli & Ear Training',
    level: 2,
    readTimeMin: 7,
    shortSummary: 'Invertire le note: la regola del 9, le simmetrie acustiche e come risparmiare tempo nei calcoli armonici.',
    fullContent: `### Cos'è il Rivolto di un Intervallo?

Immagina due note come due persone che si tengono per mano. Se la nota che stava in basso (la più grave) sale un'ottava sopra, il loro rapporto si ribalta, ma la loro somma rimane legata all'ottava.

**Il rivolto si ottiene spostando la nota più grave un'ottava sopra, oppure spostando la nota più acuta un'ottava sotto.**

*Esempio Visivo:*
- Intervallo base: **Do (grave) → Mi (acuto)** = Terza Maggiore.
- Rivolto: Lasciamo fermo il Mi e portiamo il Do un'ottava sopra: **Mi (grave) → Do (acuto)** = Sesta Minore!

---

### Le 3 Regole d'Oro del Rivolto:

#### Regola 1: La Somma dei Numeri dà SEMPRE 9!
Il numero dell'intervallo di partenza sommato al numero dell'intervallo rivoltato è costantemente pari a 9:
- La **2ª** si ribalta in una **7ª** ($2 + 7 = 9$)
- La **3ª** si ribalta in una **6ª** ($3 + 6 = 9$)
- La **4ª** si ribalta in una **5ª** ($4 + 5 = 9$)
- La **5ª** si ribalta in una **4ª** ($5 + 4 = 9$)
- La **6ª** si ribalta in una **3ª** ($6 + 3 = 9$)
- La **7ª** si ribalta in una **2ª** ($7 + 2 = 9$)
- L'**Ottava (8ª)** si ribalta nell'**Unisono (1ª)** ($8 + 1 = 9$)

#### Regola 2: La Qualità si Trasforma in Modo Speculare
- **GIUSTO** rimane **GIUSTO** (Invarianza strutturale!)
- **MAGGIORE** diventa **MINORE** (e viceversa: Minore diventa Maggiore)
- **AUMENTATO** diventa **DIMINUITO** (e viceversa: Diminuito diventa Aumentato)

#### Regola 3: Perché si Chiamano "Intervalli Giusti"?
Gli intervalli di 1ª, 4ª, 5ª e 8ª sono detti *Giusti* (dal latino *iustus*, esatto, perfetto) perché:
1. Hanno una consonanza e stabilità fisica assoluta.
2. **Sono invarianti al rivolto**: se ribalti una Quarta Giusta (Do-Fa) ottieni una Quinta Giusta (Fa-Do). La qualità "Giusta" non cambia mai, a differenza dei Maggiori che decadono in Minori!

---

### Il Trucco del Risparmio di Tempo (Utilità Pratica)

Dover calcolare una **Settima Maggiore partendo da Reb** per via diretta richiederebbe di ricavare l'intera scala di Reb maggiore.
Grazie al rivolto è immediato:
- La Settima Maggiore si ribalta in una **Seconda Minore** ($7+2=9$, Maggiore → Minore).
- Una Seconda Minore (1 solo semitono) sotto Reb è la nota **Do**.
- Riportando il Do un'ottava sopra, otteniamo istantaneamente: **Reb – Do è una Settima Maggiore**!`,
    keyTakeaways: [
      'Il rivolto inverte le altezze delle due note (la grave va sopra o l\'acuta va sotto)',
      'La somma dei gradi numerici tra intervallo originale e rivolto fa sempre 9',
      'I Giusti restano Giusti; Maggiori e Minori si scambiano; Aumentati e Diminuiti si scambiano',
      'Calcolare il rivolto stretto (2ª o 3ª) è il modo più rapido per decifrare intervalli ampi (7ª o 6ª)'
    ],
    relatedExerciseIds: ['ex-picking-alt-spider-warmup'],
    xpReward: 160
  },

  // ====================================================================
  // MODULO 7: EAR TRAINING: IL METODO DELLE CANZONI
  // ====================================================================
  {
    id: 'th-7',
    title: '7. Ear Training: Il Metodo delle Canzoni e l\'Ascolto Attivo',
    category: 'Intervalli & Ear Training',
    level: 2,
    readTimeMin: 8,
    shortSummary: 'Riconoscere a orecchio tutti gli intervalli collegandoli a melodie famose e la guida pratica quotidiana.',
    fullContent: `### Perché Allenare l'Orecchio?

La teoria musicale è la mappa, ma l'orecchio è la bussola. Quando ascolti un brano alla radio o improvvisi su un palco con altri musicisti, non hai tempo di scrivere pentagrammi: devi **sentire** la distanza tra le note e riconoscerla all'istante.

Il metodo più veloce al mondo per interiorizzare gli intervalli è associarli all'incipit di brani famosi impressi nella memoria collettiva.

---

### La Mappa degli Intervalli ASCENDENTI (Dal grave all'acuto):
- **2ª Minore (1 st):** *Jaws (Lo Squalo)* di John Williams – Le celebri prime due note ossessive e minacciose.
- **2ª Maggiore (2 st):** *Happy Birthday (Tanti Auguri a Te)* – Il passo naturale tra le prime due note ("Tan-ti").
- **3ª Minore (3 st):** *Greensleeves* oppure *Summertime* di Gershwin – Dolce, malinconico e raccolto.
- **3ª Maggiore (4 st):** *Inno di Mameli* ("Fratelli...") o l'incipit di *Kumbaya* – Aperto, solare, gioioso.
- **4ª Giusta (5 st):** *Inno di Mameli* (tra la 1ª e la 3ª sillaba) o *We Wish You a Merry Christmas* – Eroico e solenne.
- **4ª Aumentata / Tritono (6 st):** *The Simpsons* (prime due note della sigla) o *Maria* di West Side Story – Strano, misterioso, dissonante.
- **5ª Giusta (7 st):** *Star Wars* (le prime due note del tema principale di John Williams) – Potente, trionfale, granitico.
- **6ª Maggiore (9 st):** *My Way* di Frank Sinatra ("And now...") o *Nessun Dorma* di Puccini – Ampio, nobile, struggente.
- **6ª Minore (8 st):** Tema di *Love Story* o *Il cielo in una stanza* di Gino Paoli – Romantico e nostalgico.
- **7ª Minore (10 st):** Sigla di *Star Trek* o *Somewhere* da West Side Story ("There's a place...") – Ampio e cinematografico.
- **7ª Maggiore (11 st):** *Over the Rainbow* (il salto tra la prima nota e la sillaba "where" anticipata) o *Take On Me* degli A-ha – Teso, sognante, proteso verso l'alto.
- **8ª Giusta (12 st):** *Somewhere Over the Rainbow* (il celebre salto di ottava pulita tra "Some-" e "-where") – Pura fusione delle frequenze.

---

### Intervalli DISCENDENTI Celebri:
- **2ª Minore discendente:** L'incipit dell'assolo di chitarra di *Stairway to Heaven* (Jimmy Page).
- **3ª Minore discendente:** L'incipit vocale di *Hey Jude* dei Beatles ("Hey... Jude").
- **5ª Giusta discendente:** La sigla originale dei *Flintstones*.

---

### Protocollo di Studio Quotidiano (10 Minuti al Giorno):
1. **Il Canto degli Intervalli (3 min):** Suona una fondamentale sulla chitarra e canta a voce spiegata prima la 3ª Maggiore, poi la 3ª Minore, sentendo la differenza fisica nelle corde vocali.
2. **Il Gioco del "Qual è?" (4 min):** Suona due note casuali a occhi chiusi, canticchia l'intervallo e cerca la melodia-guida associata.
3. **Ascolto Attivo su Spotify/Radio (3 min):** Durante una canzone qualsiasi, isola due note della voce principale e chiediti: *"Questo salto è un Star Wars (5ª) o un Inno di Mameli (4ª)?"*`,
    keyTakeaways: [
      'Associare ogni intervallo a una melodia famosa fissa la memoria uditiva per sempre',
      '2ª minore = Lo Squalo; 5ª giusta = Star Wars; 8ª = Somewhere Over the Rainbow',
      'Cantare le note attiva la memoria muscolare delle corde vocali, infallibile per l\'intonazione',
      'Bastano 10 minuti di ascolto attivo al giorno per sviluppare un orecchio relativo professionale'
    ],
    relatedExerciseIds: ['ex-picking-alt-spider-warmup', 'ex-picking-pedal-point-metal'],
    xpReward: 170
  }
];
