import { TheoryModule } from '../../types';

export const level3Modules: TheoryModule[] = [
  // ====================================================================
  // MODULO 14: LA SCALA PENTATONICA MINORE
  // ====================================================================
  {
    id: 'th-14',
    title: '14. La Scala Pentatonica Minore (Pattern 1 & Il Box Fondamentale)',
    category: 'Scale Pentatoniche & Blues',
    level: 3,
    readTimeMin: 7,
    shortSummary: 'La scala regina degli assoli rock e metal: 5 note magiche senza semitoni dissonanti.',
    fullContent: `### Il DNA del Lead Guitarist

La scala **Pentatonica Minore** è composta da sole 5 note:

**Formula Intervalli:** 1 - b3 - 4 - 5 - b7

Prendiamo ad esempio la **Pentatonica di La Minore (A Minor Pentatonic)**:
- **A (1 - Tonica):** 6ª corda, 5° tasto
- **C (b3 - Terza Minore):** 6ª corda, 8° tasto
- **D (4 - Quarta Giusta):** 5ª corda, 5° tasto
- **E (5 - Quinta Giusta):** 5ª corda, 7° tasto
- **G (b7 - Settima Minore):** 4ª corda, 5° tasto

### Perché Suona Così Bene su Tutto?
Nella scala pentatonica minore mancano il 2° e il 6° grado della scala naturale. Rimuovendo quei due gradi si **eliminano tutti i semitoni dissonanti**.
Questo significa che ogni nota che suoni all'interno del box è musicalmente sicura, non stona mai e scorre con naturalezza sia sopra accordi minori che sopra giri rock/blues maggiori!

### Il Pattern 1 (Il "Box 1"):
Il Box 1 si sviluppa tra il 5° e l'8° tasto per la tonalità di La Minore:
- Ha una simmetria perfetta: esattamente **2 note per corda**.
- Si suona usando preferibilmente l'**indice (5° tasto)** e l'**anulare/mignolo (7° e 8° tasto)**.
- È il pattern con cui hanno scritto i loro soli più leggendari Jimi Hendrix (*Voodoo Child*), Jimmy Page (*Stairway to Heaven*), Angus Young (*Highway to Hell*) e Slash (*Sweet Child O' Mine*).`,
    keyTakeaways: [
      'Formula: 1 - b3 - 4 - 5 - b7 (5 note, nessun semitono)',
      'Il Pattern 1 parte con l\'indice sulla tonica della 6ª corda (es. 5° tasto per La)',
      'È universale: funziona su progressioni rock, hard rock, blues e heavy metal',
      'Le note di piegatura (bending) classiche sono sul 7° tasto della 3ª corda e sull\'8° tasto della 2ª corda'
    ],
    fretboardFormula: {
      rootNote: 'A',
      scaleOrChordName: 'Pentatonica Minore di La (Pattern 1 - 5° Tasto)',
      intervals: ['1', 'b3', '4', '5', 'b7'],
      notesOnFretboard: [
        { fret: 5, string: 6, label: 'A (1)', isRoot: true },
        { fret: 8, string: 6, label: 'C (b3)' },
        { fret: 5, string: 5, label: 'D (4)' },
        { fret: 7, string: 5, label: 'E (5)' },
        { fret: 5, string: 4, label: 'G (b7)' },
        { fret: 7, string: 4, label: 'A (1)', isRoot: true },
        { fret: 5, string: 3, label: 'C (b3)' },
        { fret: 7, string: 3, label: 'D (4)' },
        { fret: 5, string: 2, label: 'E (5)' },
        { fret: 8, string: 2, label: 'G (b7)' },
        { fret: 5, string: 1, label: 'A (1)', isRoot: true },
        { fret: 8, string: 1, label: 'C (b3)' }
      ]
    },
    relatedExerciseIds: ['ex-picking-alt-spider-warmup', 'ex-legato-hammer-pull-basics'],
    xpReward: 240
  },

  // ====================================================================
  // MODULO 15: LA SCALA BLUES & LA BLUE NOTE (b5)
  // ====================================================================
  {
    id: 'th-15',
    title: '15. La Scala Blues & La Blue Note (b5)',
    category: 'Scale Pentatoniche & Blues',
    level: 3,
    readTimeMin: 7,
    shortSummary: 'Come trasformare la pentatonica minore in un grido blues graffiante aggiungendo la Quinta Diminuita.',
    fullContent: `### La Nota Proibita: La Blue Note

La **Scala Blues** è formata aggiungendo la **Quinta Diminuita (b5 / Tritono)** alla scala pentatonica minore:

**Formula Intervalli:** 1 - b3 - 4 - **b5** - 5 - b7

In tonalità di **La (A Blues)**:
**Note:** A - C - D - **Eb** - E - G

Sulla chitarra, la Blue Note cade in punti comodissimi:
- 5ª corda, 6° tasto (tra Re al 5° e Mi al 7°)
- 3ª corda, 8° tasto (tra Re al 7° e Mi al 9°)

### Come Usare la Blue Note:
- La nota **Eb** crea un'istantanea tensione drammatica e viscerale.
- **Regola di fraseggio:** Non soffermarti a lungo sulla Blue Note a tempo fermo: usala come **nota di passaggio (passing tone)**, scivolando (*slide*), legando (*hammer-on / pull-off*) o piegando la corda con un *micro-bend* di un quarto di tono verso la 5ª giusta (E) o la 4ª (D).`,
    keyTakeaways: [
      'Formula: 1 - b3 - 4 - b5 - 5 - b7',
      'La b5 (Mib in La) crea il caratteristico colore blues/hard-rock',
      'Funziona al massimo come nota di passaggio rapida tra la 4ª e la 5ª',
      'Il micro-bending sulla 4ª e sulla b5 è il marchio di fabbrica di Stevie Ray Vaughan e David Gilmour'
    ],
    fretboardFormula: {
      rootNote: 'A',
      scaleOrChordName: 'Scala Blues di La con Blue Note in evidenza',
      intervals: ['1', 'b3', '4', 'b5', '5', 'b7'],
      notesOnFretboard: [
        { fret: 5, string: 6, label: 'A (1)', isRoot: true },
        { fret: 8, string: 6, label: 'C (b3)' },
        { fret: 5, string: 5, label: 'D (4)' },
        { fret: 6, string: 5, label: 'Eb (b5)' },
        { fret: 7, string: 5, label: 'E (5)' },
        { fret: 5, string: 4, label: 'G (b7)' },
        { fret: 7, string: 4, label: 'A (1)', isRoot: true },
        { fret: 5, string: 3, label: 'C (b3)' },
        { fret: 7, string: 3, label: 'D (4)' },
        { fret: 8, string: 3, label: 'Eb (b5)' },
        { fret: 5, string: 2, label: 'E (5)' },
        { fret: 8, string: 2, label: 'G (b7)' },
        { fret: 5, string: 1, label: 'A (1)', isRoot: true },
        { fret: 8, string: 1, label: 'C (b3)' }
      ]
    },
    relatedExerciseIds: ['ex-legato-hammer-pull-basics', 'ex-picking-pedal-point-metal'],
    xpReward: 250
  },

  // ====================================================================
  // MODULO 16: LE 5 PROGRESSIONI ARMONICHE REGINE DEL POP/ROCK
  // ====================================================================
  {
    id: 'th-16',
    title: '16. Le 5 Progressioni Armoniche Regine del Pop/Rock',
    category: 'Armonia Rock & Progressioni',
    level: 4,
    readTimeMin: 9,
    shortSummary: 'I ruoli emotivi dei gradi, i 5 schemi storici e il metodo in 4 passi per decodificare qualsiasi brano a orecchio.',
    fullContent: `### Il Cuore Pulsante della Musica: Le Progressioni Armoniche

Una **progressione armonica** è una successione di accordi che si susseguono nel tempo, creando un percorso narrativo che l'orecchio segue con naturalezza.
È come un viaggio: si parte da una "casa" (la Tonica), si visitano altri luoghi (gli accordi di passaggio), si sperimenta tensione (la Dominante), e si torna finalmente a casa (risoluzione).

---

### I Gradi della Scala e i Loro Ruoli Emotivi:
- **I (Tonica):** La casa, stabilità e riposo assoluto.
- **ii (Sopratonica):** Accordo di preparazione dolce, leggermente instabile.
- **iii (Mediante):** Posto a metà strada, sfumatura meditativa e malinconica.
- **IV (Sottodominante):** Rappresenta il "viaggio lontano dal centro", aperto e luminoso.
- **V (Dominante):** Il fulcro della massima tensione dinamica: contiene la sensibile ed esige la risoluzione su I.
- **vi (Sopradominante):** Parente minore intimo della tonica; dolce, nostalgico e profondo.
- **vii° (Sensibile):** Massima instabilità acustica; vuole salire di semitono verso I.

---

### Le 5 Progressioni Più Famose della Storia:

#### 1. La Classica: I – IV – V – I
- *In Do:* **Do – Fa – Sol – Do**
- *Effetto:* Perfetto bilanciamento tra viaggio, tensione e liberazione.
- *Brani celebri:* *Twist and Shout* (Beatles), *La Bamba* (Ritchie Valens), *Wild Thing*.

#### 2. La Regina del Pop: I – V – vi – IV (La progressione dei 4 accordi)
- *In Do:* **Do – Sol – Lam – Fa**
- *Effetto:* Estremamente orecchiabile e universale, fonde la solarità dei maggiori con la commozione del minore relativo.
- *Brani celebri:* *Let It Be* (Beatles), *No Woman No Cry* (Bob Marley), *Someone Like You* (Adele), *With or Without You* (U2).

#### 3. Il Doo-Wop Anni '50: I – vi – IV – V
- *In Do:* **Do – Lam – Fa – Sol**
- *Effetto:* Nostalgico, vintage, romantico e ciclico.
- *Brani celebri:* *Stand By Me* (Ben E. King), *Earth Angel*, *Every Breath You Take* (The Police).

#### 4. La Rock 'n' Roll: I – V – IV – I
- *In Do:* **Do – Sol – Fa – Do**
- *Effetto:* Dondolio energico e liberatorio, elude la cadenza rigida della musica classica.
- *Brani celebri:* *Johnny B. Goode* (Chuck Berry), *Rock and Roll* (Led Zeppelin), *Brown Eyed Girl*.

#### 5. La Blues Strutturale: I – IV – I – V
- *In Do:* **Do – Fa – Do – Sol**
- *Effetto:* La radice del blues a 12 battute, carica di groove e anima.
- *Brani celebri:* *Sweet Home Chicago* (Robert Johnson), *The Thrill is Gone* (B.B. King).

---

### Il Metodo in 4 Passaggi per l'Analisi a Orecchio:
1. **Trovare la Tonica (La Casa):** Canta o fischietta la nota di riposo su cui il brano si chiuderebbe naturalmente. Se è un Do, la tonalità è Do Maggiore.
2. **Mappare l'Area di Gioco:** Scrivi i 7 accordi naturali di quella tonalità (Do, Rem, Mim, Fa, Sol, Lam, Si°).
3. **Decifrare le Sensazioni:** Ascolta ogni cambio. Se l'accordo è solare ed aperto è Maggiore (I, IV o V); se è nostalgico o intimo è Minore (ii, iii o vi).
4. **Associare al Modello:** Verifica quale dei 5 schemi classici descrive la sequenza ascoltata!`,
    keyTakeaways: [
      'La progressione crea un arco narrativo basato su partenza (I), viaggio (IV), tensione (V) e ritorno (I)',
      'La progressione I - V - vi - IV è la sequenza più utilizzata nella storia del pop e rock moderno',
      'I gradi I, IV e V sono Maggiori solari; i gradi ii, iii e vi sono Minori riflessivi',
      'Isolando la nota di riposo (Tonica) si può risalire all\'intera griglia armonica di un brano'
    ],
    relatedExerciseIds: ['ex-picking-alt-spider-warmup'],
    xpReward: 260
  },

  // ====================================================================
  // MODULO 17: CADENZE ARMONICHE & PROGRESSIONE II - V - I
  // ====================================================================
  {
    id: 'th-17',
    title: '17. Cadenze Armoniche, Progressioni II-V-I & Risoluzioni Jazz/Rock',
    category: 'Armonia Rock & Progressioni',
    level: 4,
    readTimeMin: 8,
    shortSummary: 'Comprendere come gli accordi si attraggono, le note guida (3ª e 7ª) e dominare le risoluzioni nei soli.',
    fullContent: `### Il Cerchio delle Quinte e la Cadenza Perfetta

Nella musica occidentale gli accordi si muovono seguendo forze di gravità acustica. La forza di attrazione più potente in assoluto è la **cadenza per quinte discendenti (o quarte ascendenti)**:
**V → I** (Dominante verso Tonica).

L'accordo di dominante (V) contiene al suo interno un **tritono tra la Terza e la Settima**, che genera una forte tensione cinetica:
- La **3ª della dominante** (la sensibile) vuole salire di un semitono verso la Tonica.
- La **7ª della dominante** vuole scendere di un semitono verso la Terza dell'accordo di arrivo.

---

### La Progressione II – V – I (Maggiore e Minore):
È la sequenza cardine del Jazz, del Neo-Soul e del Progressive Rock:
- **In Do Maggiore:**
  Dm7 (ii) → G7 (V) → Cmaj7 (I)
- **In La Minore (ii-V-i minore):**
  Bm7b5 (ii°) → E7b9 (V) → Am7 (i)

### Come Improvvisare su un II-V-I: Le Note Guida (Guide Tones)
Invece di suonare una sola scala su tutta la progressione, i chitarristi esperti collegano le **Note Guida (3ª e 7ª)** di ciascun accordo:
- Nel passaggio da **Dm7** (Fa e Do) a **G7** (Si e Fa), la 7ª di Dm7 (**Do**) scende di un solo semitono sulla 3ª di G7 (**Si**), mentre la nota Fa rimane ferma!
- Nel passaggio da **G7** (Si e Fa) a **Cmaj7** (Mi e Si), la 7ª di G7 (**Fa**) scende di un semitono sulla 3ª di Cmaj7 (**Mi**)!

Questo movimento a cascata per semitoni crea assoli melodici eleganti che "cavalcano i cambi d'accordo" come facevano Wes Montgomery e Joe Pass.`,
    keyTakeaways: [
      'II-V-I è la progressione regina dell\'armonia funzionale moderna',
      'La risoluzione V → I è guidata dal collasso del tritono (3ª sale, 7ª scende)',
      'Le Note Guida (3ª e 7ª) sono i punti d\'appoggio perfetti per creare assoli fluidi',
      'Nel ii-V-i minore si utilizzano quadriadi semidiminuite (m7b5) e dominanti con nona bemolle (7b9)'
    ],
    relatedExerciseIds: ['ex-sweep-5strings-arpeggios'],
    xpReward: 270
  },

  // ====================================================================
  // MODULO 18: MODO IONICO (1° GRADO) - LA SCALA MAGGIORE NATURALE
  // ====================================================================
  {
    id: 'th-18',
    title: '18. Modo Ionico (1° Grado): La Scala Maggiore Naturale & La Risoluzione Solare',
    category: 'Scale Maggiori, Minori & Modi',
    level: 4,
    readTimeMin: 8,
    shortSummary: 'La scala genitrice di tutta l\'armonia occidentale: formula, carattere trionfale e la gestione della 4ª giusta.',
    fullContent: `### Che Cos'è il Modo Ionico?
Il **Modo Ionico** è la scala maggiore standard per antonomasia. Nasce partendo dal **1° grado** di qualsiasi scala maggiore (ad esempio da Do a Do senza alterazioni: C - D - E - F - G - A - B).

È la scala di riferimento assoluto di tutta la musica occidentale: tutti gli altri 6 modi vengono analizzati e confrontati prendendo come metro di misura il modo Ionico.

---

### Formula degli Intervalli & Sequenza di Toni/Semitoni
- **Sequenza:** Tono - Tono - Semitono - Tono - Tono - Tono - Semitono (T - T - S - T - T - T - S)
- **Formula:** **1 - 2 - 3 - 4 - 5 - 6 - 7**
  - **1 (Tonica):** Centro gravitazionale di riposo
  - **2 (Seconda Maggiore):** 2 semitoni sopra la tonica
  - **3 (Terza Maggiore):** Definisce la natura solare e aperta
  - **4 (Quarta Giusta):** 5 semitoni sopra la tonica
  - **5 (Quinta Giusta):** Il pilastro di risonanza
  - **6 (Sesta Maggiore):** Dolce e luminosa
  - **7 (Settima Maggiore / Sensibile):** Dista un solo semitono dall'ottava, creando fortissima attrazione

---

### Il Colore Emotivo & La "Avoid Note" (La Quarta Giusta)
- **Atmosfera:** Brillante, pura, trionfale, fiduciosa, stabile e priva di ambiguità.
- **La Nota Critica (4ª Giusta - Fa in Do):**
  Nel modo Ionico, la **4ª Giusta** dista un semitono dalla 3ª Maggiore (Mi-Fa) e un tritono dalla 7ª Maggiore (Fa-Si). Se indugi a lungo sulla 4ª su un accordo Maj7, si crea un attrito aspro. 
  *Regola del chitarrista:* Usa la 4ª come **nota di passaggio melodico** (passing note) rapida, e fermati invece su 1, 3, 5 o 7 per far risplendere l'accordo.

---

### Accordi di Supporto (Backing Track) & Esempi Celebri
- **Accordi ideali:** Cmaj7, C, Cadd9, progressioni I - IV - V (Do - Fa - Sol).
- **Brani & Soli guida:** 
  - *Let It Be* (The Beatles)
  - *Cliffs of Dover* intro melodica (Eric Johnson)
  - *Always With Me, Always With You* sezioni maggiori (Joe Satriani)`,
    keyTakeaways: [
      'Formula Ionico: 1 - 2 - 3 - 4 - 5 - 6 - 7 (T-T-S-T-T-T-S)',
      'È il modo maggiore fondamentale da cui derivano per traslazione tutti gli altri',
      'La 7ª Maggiore (Sensibile) genera la massima attrazione verso la Tonica',
      'La 4ª Giusta è la nota più delicata: va suonata come passaggio e non prolungata sugli accordi Maj7'
    ],
    fretboardFormula: {
      rootNote: 'C',
      scaleOrChordName: 'Do Ionico (C Ionian - Scala Maggiore Pura)',
      intervals: ['1', '2', '3', '4', '5', '6', '7'],
      notesOnFretboard: [
        { fret: 8, string: 6, label: 'C (1)', isRoot: true },
        { fret: 10, string: 6, label: 'D (2)' },
        { fret: 12, string: 6, label: 'E (3)' },
        { fret: 8, string: 5, label: 'F (4 - Passaggio)' },
        { fret: 10, string: 5, label: 'G (5)' },
        { fret: 12, string: 5, label: 'A (6)' },
        { fret: 9, string: 4, label: 'B (7M)' },
        { fret: 10, string: 4, label: 'C (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-3nps-scale-runs', 'ex-legato-hammer-pull-basics'],
    xpReward: 280
  },

  // ====================================================================
  // MODULO 19: MODO DORICO (2° GRADO) - IL SUONO MINORE LUMINOSO
  // ====================================================================
  {
    id: 'th-18-dorian',
    title: '19. Modo Dorico (2° Grado): Il Suono Minore Luminoso del Jazz-Funk & Santana',
    category: 'Scale Maggiori, Minori & Modi',
    level: 4,
    readTimeMin: 9,
    shortSummary: 'La scala minore più elegante: la 6ª Maggiore toglie il buio della minore naturale creando un sound soul/rock inconfondibile.',
    fullContent: `### Che Cos'è il Modo Dorico?
Il **Modo Dorico** si costruisce partendo dal **2° grado** della scala maggiore (es. le note di Do Maggiore suonate da Re a Re: D - E - F - G - A - B - C - D).

È una scala minore, ma possiede una personalità completamente diversa dalla classica scala minore (Eolico): non è afflitta da tristezza o dramma, bensì trasmette un colore **sofisticato, energico, bluesy e luminoso**.

---

### Formula degli Intervalli & Nota Caratteristica
- **Formula:** **1 - 2 - b3 - 4 - 5 - 6 - b7**
- **La Nota Caratteristica è la Sesta Maggiore (6M):**
  - Nella scala minore naturale (Eolico), la sesta è *minore* (b6), conferendo quel suono cupo e tragico.
  - Nel Dorico, la sesta è **Maggiore (6M)** naturale! Quel singolo semitono più alto illumina l'intera scala come un raggio di sole in una stanza scura.
  - In Re Dorico: la nota caratteristica è **B (Si naturale)**, mentre in Re Minore naturale sarebbe Sib (Bb).

---

### La Progressione "Vamp Dorico" (i – IV)
Per far percepire chiaramente il suono Dorico all'ascoltatore, l'armonia di fondo deve far sentire la 6ª maggiore:
- **Progressione iconica:** **i - IV** (oppure im7 - IV7), ad esempio **Dm7 – G7** (o Dm - G).
- *Perché funziona?* Perché l'accordo di G (Sol Maggiore: Sol - Si - Re) contiene proprio la nota **Si (6M di Re)**!
- Se suonassi la minore naturale su Dm - G stonerebbe miseramente sul Si; il Dorico invece calza alla perfezione.

---

### Brani Iconici e Maestri del Modo Dorico
- **Carlos Santana:** *Oye Como Va*, *Evil Ways*, *Europa* (il fraseggio di Santana è al 90% Re Dorico e La Dorico).
- **David Gilmour / Pink Floyd:** *Another Brick in the Wall (Part 2)* (l'assolo su base Dm è interamente fondato sul Re Dorico).
- **Miles Davis:** *So What* (il capolavoro del jazz modale a due accordi: Dm7 ed Ebm7).
- **Daft Punk:** *Get Lucky* (groove funk contemporaneo su quadriadi doriche).`,
    keyTakeaways: [
      'Formula Dorico: 1 - 2 - b3 - 4 - 5 - 6 - b7 (costruito sul 2° grado della scala maggiore)',
      'La nota caratteristica è la Sesta Maggiore (6M), che rende la sonorità minore nobile e sofisticata',
      'La progressione armonica regina è il Vamp i - IV (es. Dm - G o Dm7 - G7)',
      'È la scala d\'elezione per funk, jazz-rock fusion, classic rock e blues moderno (Santana, Gilmour)'
    ],
    fretboardFormula: {
      rootNote: 'D',
      scaleOrChordName: 'Re Dorico con Sesta Maggiore B (Si) in risalto',
      intervals: ['1', '2', 'b3', '4', '5', '6', 'b7'],
      notesOnFretboard: [
        { fret: 10, string: 6, label: 'D (1)', isRoot: true },
        { fret: 12, string: 6, label: 'E (2)' },
        { fret: 13, string: 6, label: 'F (b3)' },
        { fret: 10, string: 5, label: 'G (4)' },
        { fret: 12, string: 5, label: 'A (5)' },
        { fret: 9, string: 4, label: 'B (6M - Caratteristica!)' },
        { fret: 10, string: 4, label: 'C (b7)' },
        { fret: 12, string: 4, label: 'D (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-3nps-scale-runs', 'ex-legato-hammer-pull-basics'],
    xpReward: 280
  },

  // ====================================================================
  // MODULO 20: MODO FRIGIO (3° GRADO) - IL SUONO METAL OSCURO
  // ====================================================================
  {
    id: 'th-18-phrygian',
    title: '20. Modo Frigio (3° Grado): Tensione Oscura della 2ª Minore & Riff Pesanti Metal',
    category: 'Scale Maggiori, Minori & Modi',
    level: 4,
    readTimeMin: 9,
    shortSummary: 'La scala minore più aggressiva e misteriosa: il segreto della b2 nei riff di Metallica, Slayer e Megadeth.',
    fullContent: `### Che Cos'è il Modo Frigio?
Il **Modo Frigio** nasce sul **3° grado** della scala maggiore (es. le note di Do Maggiore suonate da Mi a Mi: E - F - G - A - B - C - D - E).

È universalmente riconosciuto come il modo più oscuro, teso e minaccioso tra i 7 modi della scala maggiore.

---

### Formula degli Intervalli & La Seconda Minore (b2)
- **Formula:** **1 - b2 - b3 - 4 - 5 - b6 - b7**
- **La Nota Caratteristica è la Seconda Minore (b2):**
  - Dista **un solo semitono (1 tasto sulla chitarra)** dalla tonica!
  - In Mi Frigio: Tonica = **E (Mi)**, Seconda Minore = **F (Fa)** al 1° tasto.
  - Questo attrito millimetrico di semitono crea un'immediata carica claustrofobica, spietata e cupa.

---

### Il Dominatore del Thrash Metal e della Musica Flamenca
Perché tutti i grandi chitarristi metal adorano il Frigio?
Perché il riff metallaro per eccellenza si basa sul plettrare a corda vuota in palm muting la sesta corda (Mi) e martellare violentemente sul 1° tasto (Fa) e sul 3° tasto (Sol)!
- **La progressione tipica:** **i – bII** (es. accordo Em alternato a F, oppure i power chord **E5 – F5**).
- Questo semitono verso l'alto genera una scarica di tensione che non si trova in nessun'altra scala naturale.

---

### Brani & Riff Iconici in Modo Frigio
- **Metallica:** *Wherever I May Roam* (l'intro con sitar e il riff portante), *Master of Puppets* (i passaggi a semitoni cromatici), *Harvester of Sorrow*.
- **Slayer:** Praticamente l'intera discografia di Kerry King e Jeff Hanneman (*Raining Blood*, *South of Heaven*).
- **Megadeth:** *Symphony of Destruction* riff principale di Dave Mustaine.`,
    keyTakeaways: [
      'Formula Frigio: 1 - b2 - b3 - 4 - 5 - b6 - b7 (costruito sul 3° grado)',
      'Nota caratteristica assoluta: la Seconda Minore (b2), a solo 1 semitono dalla tonica',
      'Progressione cardine: i - bII (es. Em - F o power chords E5 - F5)',
      'Fondamento dei riff Thrash Metal, Heavy Metal moderno, Djent e sonorità flamenche spagnole'
    ],
    fretboardFormula: {
      rootNote: 'E',
      scaleOrChordName: 'Mi Frigio (E Phrygian - Attrito 1° Tasto)',
      intervals: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
      notesOnFretboard: [
        { fret: 0, string: 6, label: 'E (1)', isRoot: true },
        { fret: 1, string: 6, label: 'F (b2 - Caratteristica!)' },
        { fret: 3, string: 6, label: 'G (b3)' },
        { fret: 0, string: 5, label: 'A (4)' },
        { fret: 2, string: 5, label: 'B (5)' },
        { fret: 3, string: 5, label: 'C (b6)' },
        { fret: 0, string: 4, label: 'D (b7)' },
        { fret: 2, string: 4, label: 'E (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-pedal-point-metal', 'ex-picking-3nps-scale-runs'],
    xpReward: 280
  },

  // ====================================================================
  // MODULO 21: MODO LIDIO (4° GRADO) - L'ATMOSFERA SPAGIALE E MISTICA
  // ====================================================================
  {
    id: 'th-18-lydian',
    title: '21. Modo Lidio (4° Grado): L\'Atmosfera Spaziale di Steve Vai con la 4ª Aumentata (#4)',
    category: 'Scale Maggiori, Minori & Modi',
    level: 4,
    readTimeMin: 9,
    shortSummary: 'La scala maggiore più luminosa e surreale: il tritono sulla 4ª (#4) spalanca le porte del cinema sci-fi e dello shred virtuoso.',
    fullContent: `### Che Cos'è il Modo Lidio?
Il **Modo Lidio** si costruisce partendo dal **4° grado** della scala maggiore (es. le note di Do Maggiore suonate da Fa a Fa: F - G - A - B - C - D - E - F).

Mentre il modo Ionico è solare e concreto, il modo Lidio è **etereo, sognante, fluttuante e privo di gravità**. È il suono preferito dai compositori di Hollywood per le scene nello spazio profondo, e dei grandi eroi della chitarra virtuosa come Steve Vai e Joe Satriani.

---

### Formula degli Intervalli & Nota Caratteristica
- **Formula:** **1 - 2 - 3 - #4 - 5 - 6 - 7**
- **La Nota Caratteristica è la Quarta Aumentata (#4 / 11ª aumentata):**
  - Rispetto alla scala maggiore pura, la 4ª giusta viene alzata di un semitono.
  - In Do Lidio: la nota caratteristica è **F# (Fa diesis)** anziché Fa.
  - La distanza tra Tonica (Do) e #4 (Fa#) è esattamente di **3 Toni interi (Tritono)**! 
  - Questo intervallo, che altrove crea instabilità, qui galleggia meravigliosamente sopra la terza maggiore, creando una sensazione di sospensione mistica senza alcuna pesantezza.

---

### Accordi di Supporto & Progressioni Liddie
- **Accordi ideali:** **Maj7#11** (es. Cmaj7#11), **Maj9#11**, oppure accordi aperti con la #4 aggiunta.
- **Progressione Vamp Lidia:** **I – II** (entrambi accordi maggiori!), ad esempio **C – D/C** (Do Maggiore seguito da Re Maggiore con basso di Do).
- Il secondo accordo (Re: Re - Fa# - La) introduce trionfalmente il Fa# sopra il centro tonale di Do!

---

### Brani & Colonne Sonore Iconiche in Modo Lidio
- **Steve Vai:** *For the Love of God* (nei passaggi aerei), *Answers*, *Liberty*.
- **Joe Satriani:** *Flying in a Blue Dream* (l'emblema planetario del Lidio con drone in Do Lidio).
- **John Williams:** Il tema della bicicletta volante in *E.T.*, le scene di scoperta in *Jurassic Park*.
- **Danny Elfman:** Il celebre tema di apertura de *I Simpson* (Do - Mi - Fa# - La - Sol: le prime note gridano Lidio puro!).`,
    keyTakeaways: [
      'Formula Lidio: 1 - 2 - 3 - #4 - 5 - 6 - 7 (costruito sul 4° grado)',
      'Nota caratteristica: Quarta Aumentata (#4), a 3 toni (tritono) dalla tonica',
      'Accordo cardine: Maj7#11; progressione vamp per eccellenza: I - II (es. C - D/C)',
      'Suono etereo, sognante, sci-fi e fluttuante (Steve Vai, Joe Satriani, colonne sonore hollywoodiane)'
    ],
    fretboardFormula: {
      rootNote: 'C',
      scaleOrChordName: 'Do Lidio con Quarta Aumentata F# (Fa#) in risalto',
      intervals: ['1', '2', '3', '#4', '5', '6', '7'],
      notesOnFretboard: [
        { fret: 8, string: 6, label: 'C (1)', isRoot: true },
        { fret: 10, string: 6, label: 'D (2)' },
        { fret: 12, string: 6, label: 'E (3)' },
        { fret: 9, string: 5, label: 'F# (#4 - Spaziale!)' },
        { fret: 10, string: 5, label: 'G (5)' },
        { fret: 12, string: 5, label: 'A (6)' },
        { fret: 9, string: 4, label: 'B (7M)' },
        { fret: 10, string: 4, label: 'C (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-3nps-scale-runs', 'ex-legato-hammer-pull-basics'],
    xpReward: 280
  },

  // ====================================================================
  // MODULO 22: MODO MISOLIDIO (5° GRADO) - IL CUORE DEL CLASSIC ROCK
  // ====================================================================
  {
    id: 'th-18-mixolydian',
    title: '22. Modo Misolidio (5° Grado): Il Cuore del Classic Rock & Blues-Rock con la 7ª Minore (b7)',
    category: 'Scale Maggiori, Minori & Modi',
    level: 4,
    readTimeMin: 9,
    shortSummary: 'La scala degli accordi di Dominante: l\'incontro perfetto tra l\'energia del maggiore e l\'anima ribelle del blues.',
    fullContent: `### Che Cos'è il Modo Misolidio?
Il **Modo Misolidio** nasce partendo dal **5° grado** della scala maggiore (es. le note di Do Maggiore suonate da Sol a Sol: G - A - B - C - D - E - F - G).

È la scala maggiore più usata nella storia del **Rock, del Blues e del Southern Rock**. È la scala naturale che si sposa con gli accordi di Dominante 7 (G7, A7, D7, E7).

---

### Formula degli Intervalli & Nota Caratteristica
- **Formula:** **1 - 2 - 3 - 4 - 5 - 6 - b7**
- **La Nota Caratteristica è la Settima Minore (b7):**
  - È identica alla scala maggiore (Ionico), tranne per l'ultimo grado: la settima non è Maggiore ma **Minore (b7)**!
  - In Sol Misolidio: la settima è **F (Fa naturale)** invece di Fa# (F#).
  - *Perché fa la differenza?* Eliminando la sensibile che voleva salire a tutti i costi sulla tonica, la scala perde la rigidità "classica" e guadagna un groove rilassato, energico, caldo e bluesy.

---

### La Progressione Rock per Eccellenza: I – bVII – IV
Se c'è una sequenza che ha definito gli stadi rock degli anni '70 e '80, è la progressione misolidia:
- **Formula:** **I – bVII – IV** (ad esempio in La: **A – G – D**; oppure in Re: **D – C – G**).
- L'accordo di **Sol Maggiore (G)** all'interno della tonalità di La è possibile solo ed esclusivamente grazie al modo Misolidio (il Sol naturale è la b7 di La)!

---

### Capolavori Chitarristici in Modo Misolidio
- **Guns N' Roses:** *Sweet Child O' Mine* (l'iconico assolo conclusivo di Slash è suonato sul cambio accordi D - C - G in Re Misolidio!).
- **AC/DC:** *Highway to Hell*, *Back in Black* (il sound degli Young brothers è intriso di dominanti misolidie).
- **Lynyrd Skynyrd:** *Sweet Home Alabama* (D - C - G, la bibbia del Southern Rock).
- **Jimi Hendrix:** *Fire*, assoli su accordi di dominante.
- **The Allman Brothers Band:** *Jessica*, *Ramblin' Man*.`,
    keyTakeaways: [
      'Formula Misolidio: 1 - 2 - 3 - 4 - 5 - 6 - b7 (costruito sul 5° grado)',
      'Nota caratteristica: Settima Minore (b7) unita a Terza Maggiore (3)',
      'Scala naturale degli accordi di Dominante (es. G7, A7, D7, E7)',
      'Progressione immortale del Classic Rock: I - bVII - IV (es. A - G - D o D - C - G)'
    ],
    fretboardFormula: {
      rootNote: 'G',
      scaleOrChordName: 'Sol Misolidio con Settima Minore F (Fa naturale)',
      intervals: ['1', '2', '3', '4', '5', '6', 'b7'],
      notesOnFretboard: [
        { fret: 3, string: 6, label: 'G (1)', isRoot: true },
        { fret: 5, string: 6, label: 'A (2)' },
        { fret: 7, string: 6, label: 'B (3)' },
        { fret: 3, string: 5, label: 'C (4)' },
        { fret: 5, string: 5, label: 'D (5)' },
        { fret: 7, string: 5, label: 'E (6)' },
        { fret: 3, string: 4, label: 'F (b7 - Rock!)' },
        { fret: 5, string: 4, label: 'G (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-3nps-scale-runs', 'ex-legato-hammer-pull-basics'],
    xpReward: 280
  },

  // ====================================================================
  // MODULO 23: MODO EOLICO (6° GRADO) - LA SCALA MINORE NATURALE
  // ====================================================================
  {
    id: 'th-18-aeolian',
    title: '23. Modo Eolico (6° Grado): La Scala Minore Naturale, Malinconia Profonda ed Epica Heavy Metal',
    category: 'Scale Maggiori, Minori & Modi',
    level: 4,
    readTimeMin: 9,
    shortSummary: 'La scala minore naturale per definizione: il relativo minore del modo Ionico, lirismo e potenza epica da Gary Moore agli Iron Maiden.',
    fullContent: `### Che Cos'è il Modo Eolico?
Il **Modo Eolico** nasce partendo dal **6° grado** della scala maggiore (es. le note di Do Maggiore suonate da La a La: A - B - C - D - E - F - G - A).

È esattamente quella che chiamiamo **Scala Minore Naturale** (o Relativo Minore). Condivide con la scala maggiore di partenza tutte le note e l'armatura di chiave, ma la sua tonica è spostata sul 6° grado, ribaltando completamente il centro di gravità emotivo.

---

### Formula degli Intervalli & Nota Caratteristica
- **Formula:** **1 - 2 - b3 - 4 - 5 - b6 - b7**
- **La Nota Caratteristica è la Sesta Minore (b6):**
  - Mentre il Dorico aveva la 6ª Maggiore (luminosa), l'Eolico possiede la **Sesta Minore (b6)** (Fa naturale in La).
  - La sesta minore si trova a un solo semitono sopra la quinta giusta (E → F), creando un sospiro emotivo intimo, drammatico e toccante.
  - La combinazione di Terza Minore (b3), Sesta Minore (b6) e Settima Minore (b7) definisce il modello universale della malinconia musicale.

---

### La Progressione Epica Eolica: i – bVI – bVII
Questa è la celebre "Cavalcata Eolica", motore dell'Heavy Metal classico, delle ballate rock e delle colonne sonore fantasy:
- **Formula:** **i – bVI – bVII** (ad esempio in La Minore: **Am – F – G**; oppure in Mi Minore: **Em – C – D**).
- Questa sequenza genera un crescendo epico continuo: dall'introspezione della tonica minore (Am), all'apertura maestosa del sesto grado (F), fino alla carica propulsiva del settimo grado (G).

---

### Capolavori Guidati dal Modo Eolico
- **Iron Maiden:** *Hallowed Be Thy Name*, *Fear of the Dark*, *The Trooper* (la firma sonora delle doppie chitarre armonizzate in terze e seste eoliche).
- **Gary Moore:** *Still Got the Blues*, *Parisienne Walkways* (il sustain straziante piegato sulla b6 eolica).
- **Metallica:** *Fade to Black* (l'intro acustica e le armonie melodiche gemelle), *One*.
- **Ozzy Osbourne / Randy Rhoads:** *Crazy Train* (il celebre riff di strofa in Fa# Minore Eolico).`,
    keyTakeaways: [
      'Formula Eolico: 1 - 2 - b3 - 4 - 5 - b6 - b7 (costruito sul 6° grado)',
      'Coincide perfettamente con la Scala Minore Naturale (Relativo Minore)',
      'Nota caratteristica: Sesta Minore (b6), distante un semitono dalla 5ª giusta',
      'Progressione epica regina: i - bVI - bVII (es. Am - F - G), cardine dell\'Heavy Metal e del lirismo chitarristico'
    ],
    fretboardFormula: {
      rootNote: 'A',
      scaleOrChordName: 'La Eolico (A Aeolian - Scala Minore Naturale)',
      intervals: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
      notesOnFretboard: [
        { fret: 5, string: 6, label: 'A (1)', isRoot: true },
        { fret: 7, string: 6, label: 'B (2)' },
        { fret: 8, string: 6, label: 'C (b3)' },
        { fret: 5, string: 5, label: 'D (4)' },
        { fret: 7, string: 5, label: 'E (5)' },
        { fret: 8, string: 5, label: 'F (b6 - Drammatica!)' },
        { fret: 5, string: 4, label: 'G (b7)' },
        { fret: 7, string: 4, label: 'A (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-3nps-scale-runs', 'ex-legato-hammer-pull-basics'],
    xpReward: 280
  },

  // ====================================================================
  // MODULO 24: MODO LOCRIO (7° GRADO) - IL REGNO DEL TRITONO
  // ====================================================================
  {
    id: 'th-18-locrian',
    title: '24. Modo Locrio (7° Grado): Il Regno del Tritono, 5ª Diminuita (b5) & Dissonanza Estrema',
    category: 'Scale Maggiori, Minori & Modi',
    level: 5,
    readTimeMin: 9,
    shortSummary: 'L\'unico modo diminuito della scala maggiore: assenza della quinta giusta, instabilità perenne e violenza nel metal estremo.',
    fullContent: `### Che Cos'è il Modo Locrio?
Il **Modo Locrio** si costruisce partendo dal **7° grado** della scala maggiore (es. le note di Do Maggiore suonate da Si a Si: B - C - D - E - F - G - A - B).

È storicamente il modo più temuto, bistrattato ed etichettato come "inutilizzabile" nella musica pop tradizionale. Perché?
Perché è **l'unico modo della scala maggiore a non avere una Quinta Giusta**, ma una **Quinta Diminuita (b5 / Tritono)**!

---

### Formula degli Intervalli & Le Due Note Caratteristiche
- **Formula:** **1 - b2 - b3 - 4 - b5 - b6 - b7**
- **Note Caratteristiche:**
  1. **Quinta Diminuita (b5):** Si trova a 6 semitoni dalla tonica (il tritono del diavolo!). Senza la quinta giusta, la tonica non ha fondamenta stabili su cui poggiare: l'accordo collassa su se stesso.
  2. **Seconda Minore (b2):** Dista un solo semitono dalla tonica (come nel Frigio).
- In Si Locrio: **B - C (b2) - D - E - F (b5!) - G - A**. Tra Si ed F c'è esattamente il tritono naturale.

---

### L'Accordo di Impianto: La Quadriade Semidiminuita (m7b5)
- Non puoi suonare il Locrio su una normale triade minore (Bm)! Devi usare una **triade diminuita (Bdim)** o una **quadriade semidiminuita (Bm7b5)**:
  - Bm7b5: Si (1) - Re (b3) - Fa (b5) - La (b7).
- Nel jazz e nella fusion, il Locrio è la scala naturale da suonare sopra il **secondo grado (ii)** nelle progressioni **ii - V - i minore** (es. suonare Bm7b5 prima di E7alt e Am).

---

### Dove Esplode il Locrio? Nel Metal Estremo e nei Riff Angoscianti
Non si usa per comporre canzoni d'amore, ma è un'arma letale nel **Death Metal, Black Metal, Mathcore e Progressive**:
- **Rush:** *YYZ* (la celebre intro ritmica in 5/4 e le sezioni dissonanti usano pattern locri).
- **Metallica:** Alcuni passaggi cromatici spietati in *Enter Sandman* e *...And Justice for All*.
- **Gorguts / Meshuggah:** Riff basati sulla b5 e b2 per creare atmosfere aliene, apocalittiche e claustrofobiche.`,
    keyTakeaways: [
      'Formula Locrio: 1 - b2 - b3 - 4 - b5 - b6 - b7 (costruito sul 7° grado)',
      'Unico modo ad avere la Quinta Diminuita (b5 / Tritono) al posto della 5ª giusta',
      'Accordo di tonica obbligato: Triade Diminuita (dim) o Semidiminuita (m7b5)',
      'Impiegato nel Jazz/Fusion sui ii gradi minori (m7b5) e nel Metal Estremo/Progressive per dissonanze viscerali'
    ],
    fretboardFormula: {
      rootNote: 'B',
      scaleOrChordName: 'Si Locrio con Tritono b5 (Fa) e b2 (Do) in evidenza',
      intervals: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
      notesOnFretboard: [
        { fret: 7, string: 6, label: 'B (1)', isRoot: true },
        { fret: 8, string: 6, label: 'C (b2)' },
        { fret: 10, string: 6, label: 'D (b3)' },
        { fret: 7, string: 5, label: 'E (4)' },
        { fret: 8, string: 5, label: 'F (b5 - Tritono!)' },
        { fret: 10, string: 5, label: 'G (b6)' },
        { fret: 7, string: 4, label: 'A (b7)' },
        { fret: 9, string: 4, label: 'B (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-3nps-scale-runs', 'ex-sweep-diminished-neoclassic'],
    xpReward: 300
  },

  // ====================================================================
  // MODULO 25: IL MODO FRIGIO DOMINANTE & LE SONORITÀ ESOTICHE
  // ====================================================================
  {
    id: 'th-19',
    title: '25. Il Modo Frigio Dominante & Le Sonorità Esotiche nel Metal Neoclassico',
    category: 'Scale Maggiori, Minori & Modi',
    level: 5,
    readTimeMin: 9,
    shortSummary: 'Il 5° modo della Minore Armonica: il segreto dei fraseggi mediorientali e neoclassici di Marty Friedman e Malmsteen.',
    fullContent: `### Oltre i Modi della Scala Maggiore: Il Frigio Dominante
Dopo aver dominato i 7 modi della scala maggiore naturale, si apre il mondo affascinante dei modi derivati dalle scale minori. Il re incontrastato per i chitarristi metal e neoclassici è il **Modo Frigio Dominante** (noto anche come *Scala Spagnola Frigia* o *5° Modo della Minore Armonica*).

---

### Come Si Costruisce?
Prendi la scala **Minore Armonica di La** (A - B - C - D - E - F - G#) e suonala partendo dal suo **5° grado (Mi)**:
- **Note:** **E - F - G# - A - B - C - D**
- **Formula:** **1 - b2 - 3 - 4 - 5 - b6 - b7**

---

### Il Salto Esotico di Seconda Aumentata (b2 → 3)
Osserva attentamente la distanza tra il 2° e il 3° grado:
- **b2 = Fa (1° tasto)**
- **3 = Sol# (4° tasto)**
Tra Fa e Sol# c'è un salto di ben **3 semitoni (un tono e mezzo)**!
Questo salto melodico è la firma sonora universale delle melodie arabe, gitane e fiammeggianti che ha reso immortali i fraseggi di **Marty Friedman (Megadeth - Rust in Peace)** e **Yngwie Malmsteen**.

---

### Su Quale Accordo Funziona?
Essendo un modo Dominante (ha la 3ª maggiore e la 7ª minore), calza a pennello sull'accordo di **V grado (E o E7)** in una tonalità minore (es. Am), creando una tensione irresistibile prima della risoluzione!`,
    keyTakeaways: [
      'Formula Frigio Dominante: 1 - b2 - 3 - 4 - 5 - b6 - b7',
      'Nasce dal 5° grado della Scala Minore Armonica',
      'Contiene contemporaneamente la b2 e la 3ª maggiore (salto di 3 semitoni)',
      'Suono esotico mediorientale e neoclassico perfetto su accordi di dominante (E7 in Am)'
    ],
    fretboardFormula: {
      rootNote: 'E',
      scaleOrChordName: 'Mi Frigio Dominante con salto esotico F-G#',
      intervals: ['1', 'b2', '3', '4', '5', 'b6', 'b7'],
      notesOnFretboard: [
        { fret: 0, string: 6, label: 'E (1)', isRoot: true },
        { fret: 1, string: 6, label: 'F (b2)' },
        { fret: 4, string: 6, label: 'G# (3 - Esotica!)' },
        { fret: 0, string: 5, label: 'A (4)' },
        { fret: 2, string: 5, label: 'B (5)' },
        { fret: 3, string: 5, label: 'C (b6)' },
        { fret: 0, string: 4, label: 'D (b7)' },
        { fret: 2, string: 4, label: 'E (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-pedal-point-metal', 'ex-sweep-5strings-arpeggios'],
    xpReward: 300
  },

  // ====================================================================
  // MODULO 26: LA SCALA MINORE ARMONICA & IL SUONO NEOCLASSICO
  // ====================================================================
  {
    id: 'th-20',
    title: '26. La Scala Minore Armonica & Il Suono Neoclassico',
    category: 'Scale Maggiori, Minori & Modi',
    level: 5,
    readTimeMin: 8,
    shortSummary: 'Perché la scala minore naturale ha bisogno della Sensibile (7ª Maggiore) per risolvere con forza verso la tonica.',
    fullContent: `### Il Fascino Barocco della Minore Armonica

Nella scala **Minore Naturale (Eolico)**, la distanza tra la 7ª nota (b7) e la Tonica (8) è di un **Tono intero**. Questo toglie la forza di attrazione verso la tonica.

Per risolvere questo, i compositori classici hanno alzato la 7ª nota di un semitono, creando la **Sensibile (7ª Maggiore)**:

**Formula Intervalli:** 1 - 2 - b3 - 4 - 5 - b6 - **7**

In **La Minore Armonica (A Harmonic Minor)**:
**Note:** A - B - C - D - E - F - **G#**

#### L'Intervallo Caratteristico: 1 Tono e Mezzo tra F e G#
Il salto tra la 6ª minore (F) e la 7ª maggiore (G#) è di ben 3 semitoni. Questo salto crea quel drammatico suono barocco e fiammeggiante che ha definito lo stile di **Ritchie Blackmore, Randy Rhoads e Yngwie Malmsteen**!`,
    keyTakeaways: [
      'Formula: 1 - 2 - b3 - 4 - 5 - b6 - 7',
      'La 7ª maggiore (G# in La) genera l\'accordo di Dominante Maggiore (E / E7) che risolve su Am',
      'Il salto di 3 semitoni tra 6ª minore e 7ª maggiore genera il tipico colore neoclassico barocco',
      'Armonizzando la scala si ottiene la celebre quadriade diminuita sul VII grado (G#dim7)'
    ],
    fretboardFormula: {
      rootNote: 'A',
      scaleOrChordName: 'La Minore Armonica (Box 5° Tasto)',
      intervals: ['1', '2', 'b3', '4', '5', 'b6', '7'],
      notesOnFretboard: [
        { fret: 5, string: 6, label: 'A (1)', isRoot: true },
        { fret: 7, string: 6, label: 'B (2)' },
        { fret: 8, string: 6, label: 'C (b3)' },
        { fret: 5, string: 5, label: 'D (4)' },
        { fret: 7, string: 5, label: 'E (5)' },
        { fret: 8, string: 5, label: 'F (b6)' },
        { fret: 6, string: 4, label: 'G# (7M - Sensibile!)' },
        { fret: 7, string: 4, label: 'A (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-picking-3nps-scale-runs', 'ex-sweep-5strings-arpeggios'],
    xpReward: 300
  },

  // ====================================================================
  // MODULO 27: GEOMETRIA DEGLI ARPEGGI ESTESI PER SWEEP PICKING
  // ====================================================================
  {
    id: 'th-21',
    title: '27. Geometria degli Arpeggi Estesi per Sweep Picking',
    category: 'Fraseggio, Assoli & Virtuosismo',
    level: 5,
    readTimeMin: 9,
    shortSummary: 'Mappare forme a 3, 5 e 6 corde per sweep picking chirurgico: triadi, Maj7, Min7 e Tetradi Diminuite.',
    fullContent: `### La Meccanica dell'Arpeggio ad Alta Velocità

Lo **Sweep Picking** consiste nel far "spazzolare" il plettro attraverso le corde con un unico movimento fluido e continuo verso il basso o verso l'alto, mentre la mano sinistra preme una sola nota alla volta rilasciandola immediatamente (*Finger Rolling*).

#### Le 3 Geometrie Fondamentali:
1. **Sweep a 5 Corde - Forma Minore (Root sulla 5ª corda):**
   - Es. Am: A (12) → C (15) → E (14) → A (14) → C (13) → E (12) → A (17)
2. **Sweep a 5 Corde - Forma Maggiore (Root sulla 5ª corda):**
   - Es. C: C (15) → E (19) → G (17) → C (17) → E (17) → G (15) → C (20)
3. **L'Arpeggio Diminuito Simmetrico (Dim7):**
   - Composto esclusivamente da terze minori (3 tasti di distanza). La forma si ripete identica ogni 3 tasti (es. tasto 6, 9, 12, 15) su tutta la tastiera!`,
    keyTakeaways: [
      'Movimento del plettro unico e rilassato (non plettrare singolarmente)',
      'Rilascio immediato della pressione del dito sinistro (Finger Rolling) per evitare che le note suonino insieme',
      'Arpeggio Dim7: forma simmetrica che si sposta di 3 tasti all\'infinito',
      'Utilizzato da Marty Friedman, Jason Becker, Yngwie Malmsteen e Synyster Gates'
    ],
    fretboardFormula: {
      rootNote: 'A',
      scaleOrChordName: 'Arpeggio La Minore a 5 Corde (Sweep Picking)',
      intervals: ['1', 'b3', '5'],
      notesOnFretboard: [
        { fret: 12, string: 5, label: 'A (1)', isRoot: true },
        { fret: 15, string: 5, label: 'C (b3)' },
        { fret: 14, string: 4, label: 'E (5)' },
        { fret: 14, string: 3, label: 'A (1)', isRoot: true },
        { fret: 13, string: 2, label: 'C (b3)' },
        { fret: 12, string: 1, label: 'E (5)' },
        { fret: 17, string: 1, label: 'A (1)', isRoot: true }
      ]
    },
    relatedExerciseIds: ['ex-sweep-5strings-arpeggios', 'ex-sweep-diminished-neoclassic'],
    xpReward: 320
  }
];
