import { BossFight } from '../types';

/**
 * Sezione Boss: Canzoni per il Fandom (Anime, Videogiochi, Cinema & Colonne Sonore)
 * Brani selezionati con video YouTube dedicati dai rispettivi canali e link tablature su Songsterr.
 */
export const fandomBossFightsData: BossFight[] = [
  // ==========================================
  // 1. SPIDER-MAN THE ANIMATED SERIES 1994 (C-Rank)
  // Channel: GUITARPLAYspb
  // ==========================================
  {
    id: 'boss-fandom-spiderman-1994',
    title: 'Spider-Man: The Animated Series Theme (1994)',
    artist: 'Joe Perry (Aerosmith) / Shuki Levy',
    albumYear: 'Spider-Man Animated Series (1994)',
    rank: 'C-Rank',
    type: 'full_song',
    genre: 'Hard Rock / Comic Soundtrack',
    category: 'fandom',
    fandomUniverse: 'Marvel Universe / Cartoons',
    tempoBpm: 138,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'kOJ-ytkLrjI',
    youtubeTitle: 'Spider-man - The Animated Series Theme | Guitar + Free tabs (GUITARPLAYspb)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Spider-man+The+Animated+Series+GUITARPLAYspb',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Spider-Man+Animated+Series+Theme',
    description: 'L\'iconico riff anni \'90 suonato originariamente da Joe Perry degli Aerosmith: distorsione tagliente con wah-wah, syncopated power chords e licks veloci in pentatonica di Mi minore.',
    whyThisSong: 'Allena il timing sincopato, l\'espressività del plettro con accenti rock aggressivi e il palm muting ritmico serrato sulle corde gravi.',
    requiredSkills: ['Palm muting incisivo in Mi minore', 'Groove sincopato hard rock', 'Bending di 1 tono su Sol', 'Lick pentatonici veloci con wah-wah'],
    xpReward: 500,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Main Theme Riff (Intro & Strofa)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Hook Melodico con Bending',
        beats: [
          { duration: '1/4', notes: [{ string: 4, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 9 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 8 }] },
          { duration: '1/4', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 12 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 2. CHA-LA HEAD-CHA-LA (C-Rank)
  // Channel: guitar cover with tabs & chords
  // ==========================================
  {
    id: 'boss-fandom-chala-head-chala',
    title: 'CHA-LA HEAD-CHA-LA (Dragon Ball Z OP 1)',
    artist: 'Hironobu Kageyama / Chiho Kiyooka',
    albumYear: 'Dragon Ball Z (1989)',
    rank: 'C-Rank',
    type: 'full_song',
    genre: 'J-Rock / Anime Anthem',
    category: 'fandom',
    fandomUniverse: 'Dragon Ball Universe',
    tempoBpm: 150,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'OFOymPSrGAs',
    youtubeTitle: 'Dragon Ball Z - CHA-LA HEAD-CHA-LA (guitar cover with tabs & chords)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Dragon+Ball+Z+CHA-LA+HEAD-CHA-LA+guitar+cover+with+tabs+and+chords',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Cha-La+Head-Cha-La',
    description: 'L\'inno generazionale che ha accompagnato le avventure di Goku e dei Guerrieri Z: ritmiche incalzanti a 150 BPM, arpeggi scintillanti e un assolo melodico ed eroico.',
    whyThisSong: 'Allena la tenuta ritmica in ottavi a tempo sostenuto, la chiarezza nei power chord aperti e la dinamica nei ritornelli epici.',
    requiredSkills: ['Power Chords aperti e staccati', 'Fraseggio melodico solare cantabile', 'Slide e Vibrato vocale', 'Ritmica in ottavi a 150 BPM'],
    xpReward: 520,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro Power Riff (Sol - Do - Re)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 3 }, { string: 5, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 3 }, { string: 5, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 3 }, { string: 4, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 3 }, { string: 4, fret: 5 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 5 }, { string: 4, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 3 }, { string: 5, fret: 5 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Melodia del Ritornello (Spikata)',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 8 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 8 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 10 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 3. SHINZOU WO SASAGEYO (B-Rank)
  // Channel: Luis Téllez Music
  // ==========================================
  {
    id: 'boss-fandom-shinzou-wo-sasageyo',
    title: 'Shinzou wo Sasageyo! (Attack on Titan OP 3)',
    artist: 'Linked Horizon (Revo)',
    albumYear: 'Attack on Titan Season 2 (2017)',
    rank: 'B-Rank',
    type: 'full_song',
    genre: 'Symphonic Metal / Anime OST',
    category: 'fandom',
    fandomUniverse: 'Attack on Titan (AoT)',
    tempoBpm: 160,
    tuning: 'E Standard o Drop D',
    youtubeId: 'atQgLCmXzs8',
    youtubeTitle: 'Shingeki No Kyojin Opening 3 - Shinzou Wo Sasageyo! (Luis Téllez Music)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Shinzou+Wo+Sasageyo+Luis+Tellez+Music',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Shinzou+wo+Sasageyo',
    description: 'La marcia monumentale del Corpo di Ricerca: cavalcate in terzine serrate a 160 BPM, riff sinfonici drammatici ed estensioni melodiche neoclassiche.',
    whyThisSong: 'Allena la resistenza fisica della mano destra sul metal gallop veloce, il sincronismo stretto e la transizione tra riff marziali e parti melodiche solistiche.',
    requiredSkills: ['Metal Gallop ritmico in terzine', 'Alternate picking preciso a 160 BPM', 'Cambi di tonalità e arpeggi neoclassici', 'Controllo dinamico d\'insieme'],
    xpReward: 650,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Marcia della Ricognizione (Metal Gallop)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 5 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Inno Ritornello (Sasageyo!)',
        beats: [
          { duration: '1/4', notes: [{ string: 5, fret: 7 }, { string: 4, fret: 9 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 3 }, { string: 4, fret: 5 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 5 }, { string: 4, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 0 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 4. BUTTER-FLY TRI VERSION (C-Rank)
  // Channel: guitar cover with tabs & chords
  // ==========================================
  {
    id: 'boss-fandom-butterfly-tri',
    title: 'Butter-Fly (~tri. Version~ / Digimon Adventure)',
    artist: 'Koji Wada',
    albumYear: 'Digimon Adventure tri. (2015)',
    rank: 'C-Rank',
    type: 'full_song',
    genre: 'Pop-Punk / J-Rock',
    category: 'fandom',
    fandomUniverse: 'Digimon Universe',
    tempoBpm: 165,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'M0puITrUCms',
    youtubeTitle: 'Digimon OP - Butter-Fly (guitar cover with tabs & chords)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Digimon+OP+Butter-Fly+guitar+cover+with+tabs+and+chords',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Butter-Fly+Digimon',
    description: 'Il brano manifesto del franchise Digimon: potente combinazione di riff punk-rock, ottave melodiche trascinanti alla Green Day e l\'assolo struggente ed energico di Koji Wada.',
    whyThisSong: 'Allena la velocità di strumming in ottavi a 165 BPM, il muting pulito della corda centrale sulle ottave e l\'attacco deciso con il plettro.',
    requiredSkills: ['Suono delle ottave con muting centrale', 'Ritmiche punk-rock a 165 BPM', 'Bending corale di 1 tono', 'Assolo melodico trascinante'],
    xpReward: 530,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro ad Ottave (Mi - Fa# - Sol# - La)',
        beats: [
          { duration: '1/4', notes: [{ string: 5, fret: 7 }, { string: 3, fret: 9 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 9 }, { string: 3, fret: 11 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 11 }, { string: 3, fret: 13 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 12 }, { string: 3, fret: 14 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Riff Strofa Power Chords',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 4 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 4 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 0 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 5. BRAVE HEART - DIGIMON (B-Rank)
  // Channel: Cleiton J. Alves
  // ==========================================
  {
    id: 'boss-fandom-brave-heart',
    title: 'Brave Heart (Digimon Evolution Theme)',
    artist: 'Ayumi Miyazaki / Michihiko Ohta',
    albumYear: 'Digimon Adventure (1999)',
    rank: 'B-Rank',
    type: 'full_song',
    genre: 'Power Metal / Anime OST',
    category: 'fandom',
    fandomUniverse: 'Digimon Universe',
    tempoBpm: 145,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'p4zafCpuuT8',
    youtubeTitle: 'Digimon TAB: Brave Heart Guitar Cover (Cleiton J. Alves)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Brave+Heart+Digimon+Cleiton+J+Alves',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Brave+Heart+Digimon',
    description: 'La colonna sonora leggendaria di ogni digievoluzione: celebre nel panorama chitarristico per un assolo memorabile ricco di arpeggi melodici, bending espressivi e tapping fluido.',
    whyThisSong: 'Un banco di prova eccellente per la musicalità solistica: combina precisione nei bending su tasti alti, fluidità melodica e cambi repentini di registro.',
    requiredSkills: ['Assolo solistico di 40 battute', 'Arpeggi melodici a salto di corda', 'Bending di 1 e 1.5 toni sul 17° e 19° tasto', 'Vibrato controllato'],
    xpReward: 680,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro Melodico Chitarra Lead',
        beats: [
          { duration: '1/4', notes: [{ string: 3, fret: 11 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 2, fret: 12 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 10 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Climax dell\'Evoluzione (Bending al 15°)',
        beats: [
          { duration: '1/4', notes: [{ string: 1, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 12 }] },
          { duration: '1/2', notes: [{ string: 2, fret: 15 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 6. VENTO AUREO / GIORNO'S THEME (B-Rank)
  // Channel: Anime Guitar Lessons
  // ==========================================
  {
    id: 'boss-fandom-vento-aureo',
    title: 'Il Vento D\'Oro / Giorno\'s Theme (JoJo Parte 5)',
    artist: 'Yugo Kanno',
    albumYear: 'JoJo\'s Bizarre Adventure: Golden Wind (2018)',
    rank: 'B-Rank',
    type: 'full_song',
    genre: 'Funk-Metal / Jazz-Fusion',
    category: 'fandom',
    fandomUniverse: 'JoJo\'s Bizarre Adventure',
    tempoBpm: 135,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'SRnPhdN6vS0',
    youtubeTitle: 'Giorno\'s Theme Guitar Cover - JoJo (Anime Guitar Lessons)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Giorno+Theme+Anime+Guitar+Lessons',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Il+Vento+Doro',
    description: 'Il celebre tema di Giorno Giovanna: dal riff funky percussivo con accordi di nona al celeberrimo breakdown solistico con bending rapidi, ghost notes e fraseggio virtuosistico.',
    whyThisSong: 'Allena la precisione ritmica chirurgica sulle sedicesimi, lo slap e il tocco percussivo sul ponte e i lick blues-rock aggressivi.',
    requiredSkills: ['Accordi 9th funk con ghost notes', 'Riff percussivo sincopato', 'Bending rapidi microtonali', 'Passaggi cromatici in discesa'],
    xpReward: 670,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Main Groove Riff (Ghost notes & Funk slap)',
        beats: [
          { duration: '1/16', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/16', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 5 }] },
          { duration: '1/16', notes: [{ string: 4, fret: 7 }] },
          { duration: '1/16', notes: [{ string: 3, fret: 6 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 7 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Breakdown Solistico (Il Vento D\'Oro Hook)',
        beats: [
          { duration: '1/8', notes: [{ string: 3, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 13 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 15 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 17 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 7. STAND PROUD (A-Rank)
  // Channel: Andrew Soto
  // ==========================================
  {
    id: 'boss-fandom-stand-proud',
    title: 'Stand Proud (JoJo Parte 3: Stardust Crusaders OP 1)',
    artist: 'Jin Hashimoto / Takatomo Nozawa',
    albumYear: 'JoJo\'s Bizarre Adventure: Stardust Crusaders (2014)',
    rank: 'A-Rank',
    type: 'full_song',
    genre: 'Heavy Metal / Speed Metal',
    category: 'fandom',
    fandomUniverse: 'JoJo\'s Bizarre Adventure',
    tempoBpm: 175,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'Scvj_ycyz8w',
    youtubeTitle: 'STAND PROUD | JoJo\'s Bizarre Adventure | GUITAR TABS (Andrew Soto)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=STAND+PROUD+Andrew+Soto+Guitar',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Stand+Proud+JoJo',
    description: 'Puro heavy metal ad altissima tensione: 175 BPM senza tregua, cavalcate a plettrata alternata velocissima, stacchi taglienti e un assolo shred virtuosistico con tapping a più dita.',
    whyThisSong: 'Allena la velocità di plettrata continua e la resistenza fisica della mano destra, unitamente alla sincronizzazione dita-tasto nei passaggi neoclassici veloci.',
    requiredSkills: ['Alternate picking serrato a 175 BPM', 'Assolo shred neoclassico', 'Palm muting ultra-stretto', 'Tapping veloce sul ritornello'],
    xpReward: 850,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro Speed Riff (Alternate Picking 175 BPM)',
        beats: [
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Strofa Ritmica Metal (Stand Proud!)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 2 }, { string: 4, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 3 }, { string: 4, fret: 5 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 8. DANCE WITH STEEL BALL RUN (B-Rank)
  // Channel: Anime Guitar Lessons
  // ==========================================
  {
    id: 'boss-fandom-dance-with-steel-ball-run',
    title: 'Dance with Steel Ball Run (JoJo Parte 7 Main Theme)',
    artist: 'Yugo Kanno',
    albumYear: 'JoJo\'s Bizarre Adventure: Steel Ball Run',
    rank: 'B-Rank',
    type: 'full_song',
    genre: 'Western Shred / Rock Strumentale',
    category: 'fandom',
    fandomUniverse: 'JoJo\'s Bizarre Adventure',
    tempoBpm: 140,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'GKXkchJNto4',
    youtubeTitle: 'Dance with STEEL BALL RUN - Main Theme - Guitar Cover (Anime Guitar Lessons)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Dance+with+STEEL+BALL+RUN+Anime+Guitar+Lessons',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Dance+with+Steel+Ball+Run',
    description: 'Un incontro magistrale tra atmosfere western polverose e chitarra shred moderna: bending ampi con rilasci drammatici, doppi stops, lick country-rock fusi con riff hard rock martellanti.',
    whyThisSong: 'Allena la sensibilità del bending microtonale, il tocco blues-western e la precisione nei ritmi a cavalcata con stacchi energici.',
    requiredSkills: ['Bending ampi con vibrato drammatico', 'Doppi stops e lick country-rock', 'Riff serrati in pedal tone', 'Sincopi e stacchi ritmici'],
    xpReward: 690,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Western Riff Ritmico (Corsa nel Deserto)',
        beats: [
          { duration: '1/8', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/16', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/16', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 4 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 2 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 5 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Tema Solistico Steel Ball Run',
        beats: [
          { duration: '1/4', notes: [{ string: 3, fret: 9 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 12 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 14 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 9. MEGALOVANIA (S-Rank)
  // Channel: Daisuke Kurosawa
  // ==========================================
  {
    id: 'boss-fandom-megalovania',
    title: 'Megalovania (Undertale Metal Guitar Cover)',
    artist: 'Toby Fox / Arr. Daisuke Kurosawa',
    albumYear: 'Undertale (2015) / Daisuke Kurosawa Cover',
    rank: 'S-Rank',
    type: 'full_song',
    genre: 'Extreme Shred / Progressive Metal',
    category: 'fandom',
    fandomUniverse: 'Undertale / Gaming',
    tempoBpm: 240,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'VxCsyX3CHMM',
    youtubeTitle: 'Megalovania - Undertale (Metal Guitar Cover) - Tab (Daisuke Kurosawa)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Megalovania+Metal+Guitar+Cover+Daisuke+Kurosawa',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Megalovania',
    description: 'La prova definitiva per la chitarra elettrica contemporanea: l\'arrangiamento metal di Daisuke Kurosawa del tema di Sans spinge la plettrata alternata a 240 BPM, arpeggi sweep a 5 corde su accordi diminuiti e string skipping implacabile.',
    whyThisSong: 'Rappresenta l\'apice della sincronizzazione meccanica dita-plettro e della resistenza fisica: non concede pause ed esige pulizia chirurgica.',
    requiredSkills: ['Alternate picking a 240 BPM (sedicesimi)', 'Sweep picking a 5 corde su arpeggi diminuiti', 'String skipping shred', 'Endurance fisica estrema senza pause'],
    xpReward: 1200,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Iconic Theme Hook (Shred Picking 240 BPM)',
        beats: [
          { duration: '1/16', notes: [{ string: 4, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 4, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 9 }] },
          { duration: '1/16', notes: [{ string: 3, fret: 8 }] },
          { duration: '1/16', notes: [{ string: 3, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 5 }] },
          { duration: '1/16', notes: [{ string: 4, fret: 7 }] },
          { duration: '1/16', notes: [{ string: 3, fret: 5 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Sweep Arpeggio Climax (Daisuke Solo)',
        beats: [
          { duration: '1/16', notes: [{ string: 5, fret: 12 }] },
          { duration: '1/16', notes: [{ string: 4, fret: 14 }] },
          { duration: '1/16', notes: [{ string: 3, fret: 14 }] },
          { duration: '1/16', notes: [{ string: 2, fret: 13 }] },
          { duration: '1/16', notes: [{ string: 1, fret: 12 }] },
          { duration: '1/16', notes: [{ string: 1, fret: 17 }] },
          { duration: '1/16', notes: [{ string: 1, fret: 12 }] },
          { duration: '1/16', notes: [{ string: 2, fret: 13 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 19 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 10. HARUKA MIRAI (B-Rank)
  // Channel: Anime Guitar Lessons
  // ==========================================
  {
    id: 'boss-fandom-haruka-mirai',
    title: 'Haruka Mirai (Black Clover OP 1)',
    artist: 'Kankaku Piero',
    albumYear: 'Black Clover (2017)',
    rank: 'B-Rank',
    type: 'full_song',
    genre: 'Modern J-Rock / Alt-Metal',
    category: 'fandom',
    fandomUniverse: 'Black Clover Universe',
    tempoBpm: 195,
    tuning: 'Drop D (D A D G B E)',
    youtubeId: 'jcw-ULXXj7I',
    youtubeTitle: 'Black Clover OP1 - Haruka Mirai - Guitar Lesson with TABS (Anime Guitar Lessons)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Haruka+Mirai+Anime+Guitar+Lessons',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Haruka+Mirai',
    description: 'La travolgente prima sigla di Asta e Yuno in Black Clover: riff in Drop D a 195 BPM, ritmiche taglienti con accordi aperti moderni e un ritornello esplosivo.',
    whyThisSong: 'Allena la velocità di cambio posizione sulla tastiera in Drop D, la coordinazione negli stacchi ritmici veloci e la precisione nel plettro a tempo elevatissimo.',
    requiredSkills: ['Accordi in Drop D a un dito', 'Ritmica serrata a 195 BPM', 'Cambi di dinamica strofa/ritornello', 'Assolo melodico in ottave'],
    xpReward: 660,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Drop D Intro Riff (195 BPM)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0 }, { string: 5, fret: 0 }, { string: 4, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }, { string: 5, fret: 0 }, { string: 4, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 8 }, { string: 5, fret: 8 }, { string: 4, fret: 8 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 7 }, { string: 5, fret: 7 }, { string: 4, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 5 }, { string: 5, fret: 5 }, { string: 4, fret: 5 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 3 }, { string: 5, fret: 3 }, { string: 4, fret: 3 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Melodia del Ritornello (Haruka Mirai)',
        beats: [
          { duration: '1/4', notes: [{ string: 3, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 9 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 2, fret: 8 }] },
          { duration: '1/4', notes: [{ string: 2, fret: 10 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 11. WE ARE! (C-Rank)
  // Channel: guitar cover with tabs & chords
  // ==========================================
  {
    id: 'boss-fandom-we-are',
    title: 'We Are! / ウィーアー! (One Piece OP 1)',
    artist: 'Hiroshi Kitadani / Kohei Tanaka',
    albumYear: 'One Piece (1999)',
    rank: 'C-Rank',
    type: 'full_song',
    genre: 'J-Pop / Ska-Rock',
    category: 'fandom',
    fandomUniverse: 'One Piece Universe',
    tempoBpm: 168,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'Ac8IiDvM8jY',
    youtubeTitle: 'One Piece OP - ウィーアー! (guitar cover with tabs & chords)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=We+Are+One+Piece+guitar+cover+with+tabs+and+chords',
    songsterrUrl: 'https://www.songsterr.com/?pattern=We+Are+One+Piece',
    description: 'Il celeberrimo inno di Luffy e della ciurma di Cappello di Paglia: progressione solare e trionfante, stacchi ska in levare, arpeggi vivaci e un assolo squillante e spensierato.',
    whyThisSong: 'Allena la precisione ritmica sui colpi in levare (upstroke), l\'agilità nei cambi di accordi barré e la scioltezza melodica sulla scala maggiore.',
    requiredSkills: ['Staccati in levare (Ska upstroke)', 'Accordi con barré veloci', 'Scala maggiore per fraseggi melodici', 'Dinamica solare e brillante'],
    xpReward: 510,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Ska Staccato Upstrokes (Do - Sol - Lam - Fa)',
        beats: [
          { duration: '1/8', notes: [{ string: 5, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 2 }, { string: 3, fret: 0 }, { string: 2, fret: 1 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 0 }, { string: 3, fret: 0 }, { string: 2, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 2 }, { string: 3, fret: 2 }, { string: 2, fret: 1 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 1 }, { string: 5, fret: 3 }, { string: 4, fret: 3 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Tema del Ritornello (One Piece!)',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 1 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 0 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 1 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 3 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 12. LUPIN THE THIRD THEME (B-Rank)
  // Channel: guitar cover with tabs & chords
  // ==========================================
  {
    id: 'boss-fandom-lupin-third',
    title: 'Lupin the Third Theme (Lupin III)',
    artist: 'Yuji Ohno',
    albumYear: 'Lupin III (1978/1980)',
    rank: 'B-Rank',
    type: 'full_song',
    genre: 'Jazz-Funk / Big Band Fusion',
    category: 'fandom',
    fandomUniverse: 'Lupin III Universe',
    tempoBpm: 132,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'Lkir3dVdV9o',
    youtubeTitle: 'Lupin the Third Theme (guitar cover with tabs & chords)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Lupin+the+Third+Theme+guitar+cover+with+tabs+and+chords',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Lupin+The+Third+Theme',
    description: 'Il capolavoro funk-jazz di Yuji Ohno: riff di basso/chitarra contagioso, accordi sofisticati di nona e tredicesima, e fraseggi bebop e blues eseguiti con swing irresistibile.',
    whyThisSong: 'Allena la cultura armonica jazz-fusion, il senso ritmico dello swing suonato con la chitarra rock e l\'articolazione delle note staccate.',
    requiredSkills: ['Accordi complessi di 9th e 13th', 'Fraseggio swingato su tempo rock', 'Arpeggi diminuiti di collegamento', 'Bending jazzistici controllati'],
    xpReward: 670,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Main Groove Riff (Do minore funk)',
        beats: [
          { duration: '1/8', notes: [{ string: 5, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 1 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 3 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 1 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Tema Solistico di Sax/Tromba su Chitarra',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 8 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 9 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 11 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 8 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 11 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 13. DAN DAN KOKORO HIKARETEKU (D-Rank)
  // Channel: guitar cover with tabs & chords
  // ==========================================
  {
    id: 'boss-fandom-dan-dan',
    title: 'Dan Dan Kokoro Hikareteku (Dragon Ball GT OP)',
    artist: 'Field of View / Izumi Sakai (ZARD)',
    albumYear: 'Dragon Ball GT (1996)',
    rank: 'D-Rank',
    type: 'full_song',
    genre: 'J-Pop / Melodic Rock',
    category: 'fandom',
    fandomUniverse: 'Dragon Ball Universe',
    tempoBpm: 130,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'TAlrJO8q8r4',
    youtubeTitle: 'Dragon Ball GT - Dan Dan Kokoro Hikareteku (guitar cover with tabs & chords)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Dragon+Ball+GT+Dan+Dan+Kokoro+Hikareteku+guitar+cover+with+tabs+and+chords',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Dan+Dan+Kokoro+Hikareteku',
    description: 'La melodia più dolce e nostalgica del franchise Dragon Ball: arpeggi puliti in tonalità di Do maggiore / La minore, accordi aperti risonanti e una linea melodica calda e cantabile.',
    whyThisSong: 'Perfetta per chitarristi di livello D-Rank: allena i cambi fluidi tra accordi aperti, il tocco uniforme nel plettrare le singole note e l\'espressività melodica con slide morbidi.',
    requiredSkills: ['Accordi aperti e primo barré (Fa)', 'Arpeggio pulito in quarti e ottavi', 'Melodia cantabile con slide', 'Cambi di tempo rilassati'],
    xpReward: 420,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro Arpeggiata Dolce (Do - Sol/Si - Lam)',
        beats: [
          { duration: '1/8', notes: [{ string: 5, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 1 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 0 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Melodia Principale Vocale su Chitarra',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 1 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 0 }] },
          { duration: '1/2', notes: [{ string: 2, fret: 1 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 14. PIRATI DEI CARAIBI (C-Rank)
  // Channel: guitar cover with tabs & chords
  // ==========================================
  {
    id: 'boss-fandom-pirati-dei-caraibi',
    title: 'He\'s a Pirate (Pirati dei Caraibi: La Maledizione della Prima Luna)',
    artist: 'Hans Zimmer & Klaus Badelt',
    albumYear: 'Pirates of the Caribbean (2003)',
    rank: 'C-Rank',
    type: 'full_song',
    genre: 'Cinema Soundtrack / Epic Rock',
    category: 'fandom',
    fandomUniverse: 'Cinema & Colonne Sonore',
    tempoBpm: 142,
    tuning: 'E Standard o Drop D',
    youtubeId: 'l5Uu3QOuS78',
    youtubeTitle: 'Pirates of the Caribbean Theme (guitar cover with tabs & chords)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Pirates+of+the+Caribbean+Theme+guitar+cover+with+tabs+and+chords',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Hes+a+Pirate',
    description: 'Il tema cinematografico più celebre e travolgente del 21° secolo: tempo composto in 6/8 e 12/8, plettrata continua su terzine e passaggi melodici epici che attraversano tutta la tastiera.',
    whyThisSong: 'Allena la sensibilità ritmica per i tempi composti in terzine, la velocità della plettrata alternata continua e i salti tra corde adiacenti senza sporcare le note.',
    requiredSkills: ['Ritmo in 12/8 e 6/8 con terzine', 'Plettrata alternata continua su tema veloce', 'Salti di corda dal Re al Cantino', 'Dinamica espressiva (piano-forte)'],
    xpReward: 540,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '6/8',
        label: 'Main Pirate Theme (Terzine 142 BPM)',
        beats: [
          { duration: '1/8', notes: [{ string: 4, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 3 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '6/8',
        label: 'Climax Epico (Jack Sparrow Riff)',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 1 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 3 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 15. NARUTO THEME - THE RAISING FIGHTING SPIRIT (B-Rank)
  // Channel: guitar cover with tabs & chords
  // ==========================================
  {
    id: 'boss-fandom-naruto-fighting-spirit',
    title: 'The Raising Fighting Spirit (Naruto Battle Theme)',
    artist: 'Toshio Masuda',
    albumYear: 'Naruto Original Soundtrack 1 (2003)',
    rank: 'B-Rank',
    type: 'full_song',
    genre: 'Folk-Metal / Anime Battle OST',
    category: 'fandom',
    fandomUniverse: 'Naruto Universe',
    tempoBpm: 140,
    tuning: 'E Standard (E A D G B E)',
    youtubeId: 'KOWI8XVf7nE',
    youtubeTitle: 'Naruto Theme - The Raising Fighting Spirit (guitar cover with tabs & chords)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Naruto+Theme+The+Raising+Fighting+Spirit+guitar+cover+with+tabs+and+chords',
    songsterrUrl: 'https://www.songsterr.com/?pattern=The+Raising+Fighting+Spirit',
    description: 'Il brano da battaglia più famoso di Naruto che unisce chitarra hard rock e sonorità tradizionali nipponiche: scala pentatonica minore giapponese, bending aggressivi e ritmo travolgente.',
    whyThisSong: 'Introduce le scale modali orientali (Insen e Hirajoshi), allena l\'attacco percussivo sul plettro e la velocità nei bending rapidi di mezzo tono e un tono.',
    requiredSkills: ['Scale orientali / Pentatonica minore giapponese', 'Bending rapidi e vibrato stretto', 'Ritmica martellante in power chords', 'Passaggi veloci in terzine'],
    xpReward: 670,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Shamisen Guitar Riff (Scala Orientale)',
        beats: [
          { duration: '1/8', notes: [{ string: 3, fret: 9 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 8 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 3, fret: 9 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Power Riff di Sottofondo (Kage Bunshin!)',
        beats: [
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 9 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 0 }] }
        ]
      }
    ]
  },

  // ==========================================
  // 16. FINAL FANTASY VII REMAKE - LET THE BATTLE BEGIN (A-Rank)
  // Channel: Video Game Guitar
  // ==========================================
  {
    id: 'boss-fandom-ff7-let-the-battles-begin',
    title: 'Let The Battles Begin! (Final Fantasy VII Remake)',
    artist: 'Nobuo Uematsu / Masashi Hamauzu',
    albumYear: 'Final Fantasy VII Remake (2020)',
    rank: 'A-Rank',
    type: 'full_song',
    genre: 'Progressive Metal / JRPG Battle Theme',
    category: 'fandom',
    fandomUniverse: 'Final Fantasy / Gaming',
    tempoBpm: 160,
    tuning: 'Drop D (D A D G B E)',
    youtubeId: 'TcnK6Ilv3TM',
    youtubeTitle: 'Final Fantasy VII Remake - Let The Battles Begin cover (with TABS) (Video Game Guitar)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Final+Fantasy+VII+Remake+Let+The+Battles+Begin+Video+Game+Guitar',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Let+the+Battles+Begin+Final+Fantasy',
    description: 'La leggendaria battle theme di Cloud Strife e dell\'Avalanche riarrangiata in progressive metal monumentale: tempi composti, riff poliritmici in Drop D, fraseggi solistici neoclassici e tapping a due mani.',
    whyThisSong: 'Allena la gestione dei cambi di metro nel rock progressivo, la sincronizzazione ad alta velocità a 160 BPM e la precisione nel fraseggio solistico su passaggi non convenzionali.',
    requiredSkills: ['Riffing progressivo in Drop D', 'Tapping a due mani sul bridge', 'Sweep arpeggi su accordi minori', 'Precisione assoluta a 160 BPM'],
    xpReward: 880,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Prog Metal Battle Riff (Drop D 160 BPM)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0 }, { string: 5, fret: 0 }, { string: 4, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/16', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 5 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 5 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 3 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Tema Eroico della Vittoria (Nobuo Uematsu)',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 12 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 15 }] }
        ]
      }
    ]
  }
];
