import { BossFight } from '../types';

export const bossFightsData: BossFight[] = [
  // ==========================================
  // LIVELLO 1 / E-RANK (I FONDAMENTI)
  // ==========================================
  {
    id: 'boss-come-as-you-are',
    title: 'Come As You Are (Canzone Intera)',
    artist: 'Nirvana (Kurt Cobain)',
    albumYear: 'Nevermind (1991)',
    rank: 'E-Rank',
    type: 'full_song',
    genre: 'Grunge / Alt-Rock',
    tempoBpm: 120,
    tuning: 'D Standard (D G C F A D) o Standard con Chorus',
    youtubeId: 'vabnZ9-ex7o',
    youtubeTitle: 'Nirvana - Come As You Are (Mr. Tabs Guitar Tab & Video Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Nirvana+Come+As+You+Are',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Nirvana+Come+As+You+Are',
    description: 'Impara l\'intera canzone: dal leggendario intro arpeggiato con chorus, alle strofe ipnotiche, ai ritornelli con power chords aperti e al solo melodico a ottave.',
    whyThisSong: 'Allena la costanza ritmica sulle corde basse, l\'uso del plettro alternato lento e il cambio pulito verso i power chords nel ritornello.',
    requiredSkills: ['Arpeggio corde basse (6ª e 5ª)', 'Pedal tone a corda libera', 'Power Chords A5 e B5', 'Assolo melodico con bending leggero'],
    xpReward: 350,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro & Strofa (Parte 1 - Corde 6 e 5)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 1 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 2 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Intro & Strofa (Parte 2 - Discesa sul Mi)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 1 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] }
        ]
      },
      {
        measureNumber: 3,
        timeSignature: '4/4',
        label: 'Solo Melodico (Corda Sol 3ª)',
        beats: [
          { duration: '1/4', notes: [{ string: 3, fret: 6 }] },
          { duration: '1/4', notes: [{ string: 3, fret: 9 }] },
          { duration: '1/4', notes: [{ string: 3, fret: 6 }] },
          { duration: '1/4', notes: [{ string: 3, fret: 9, technique: 'b' }] }
        ]
      }
    ]
  },
  {
    id: 'boss-smoke-on-the-water',
    title: 'Smoke on the Water (Canzone Intera)',
    artist: 'Deep Purple (Ritchie Blackmore)',
    albumYear: 'Machine Head (1972)',
    rank: 'E-Rank',
    type: 'full_song',
    genre: 'Classic Hard Rock',
    tempoBpm: 112,
    tuning: 'Standard E',
    youtubeId: 'kO-zT6Z42pA',
    youtubeTitle: 'Deep Purple - Smoke on the Water (Mr. Tabs Guitar Tab & Video Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Deep+Purple+Smoke+on+the+Water',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Deep+Purple+Smoke+on+the+Water',
    description: 'La canzone completa dei Deep Purple: il celebre intro a doppie corde (quarte), gli staccati funky della strofa, il ritornello con C5 e Ab5 e la struttura dell\'assolo.',
    whyThisSong: 'Insegna il senso del tempo, lo staccato e il muting tra un accordo e l\'altro.',
    requiredSkills: ['Bicordi su corde 4 e 3', 'Muting con palmo e dita', 'Power Chords C5 - G#5', 'Tempismo sincopato in levare'],
    xpReward: 350,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Riff Intro (Sol - Sib - Do)',
        beats: [
          { duration: '1/4', notes: [{ string: 4, fret: 0 }, { string: 3, fret: 0 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 3 }, { string: 3, fret: 3 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 5 }, { string: 3, fret: 5 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 0 }, { string: 3, fret: 0 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Riff Intro (Sol - Sib - Reb - Do)',
        beats: [
          { duration: '1/4', notes: [{ string: 4, fret: 3 }, { string: 3, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 6 }, { string: 3, fret: 6 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 5 }, { string: 3, fret: 5 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 0 }, { string: 3, fret: 0 }] }
        ]
      },
      {
        measureNumber: 3,
        timeSignature: '4/4',
        label: 'Ritornello (C5 -> Ab5 -> G5)',
        beats: [
          { duration: '1/2', notes: [{ string: 5, fret: 3 }, { string: 4, fret: 5 }] },
          { duration: '1/2', notes: [{ string: 6, fret: 4 }, { string: 5, fret: 6 }] }
        ]
      }
    ]
  },
  {
    id: 'boss-seven-nation-army',
    title: 'Seven Nation Army (Canzone Intera)',
    artist: 'The White Stripes (Jack White)',
    albumYear: 'Elephant (2003)',
    rank: 'E-Rank',
    type: 'full_song',
    genre: 'Garage Rock / Blues Rock',
    tempoBpm: 124,
    tuning: 'Standard E (o Open A)',
    youtubeId: '0J2QdDbelmY',
    youtubeTitle: 'The White Stripes - Seven Nation Army (Mr. Tabs Guitar Tab & Video Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+The+White+Stripes+Seven+Nation+Army',
    songsterrUrl: 'https://www.songsterr.com/?pattern=The+White+Stripes+Seven+Nation+Army',
    description: 'Impara l\'intero brano: il celebre tema monofonico su corda La/Mi, l\'esplosione del ritornello con power chords G5-A5 e il travolgente assolo distorto.',
    whyThisSong: 'Fondamentale per memorizzare le note sulla tastiera, sviluppare attacco deciso con il plettro e coordinare ritmo ed effetti.',
    requiredSkills: ['Plettrata alternata decisa', 'Spostamenti orizzontali sulla 5ª corda', 'Power Chords G5 e A5', 'Assolo con slide e bending'],
    xpReward: 350,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Tema Principale (Corda La / 5ª)',
        beats: [
          { duration: '1/4', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 5 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 3 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Risoluzione Tema (Corda La)',
        beats: [
          { duration: '1/2', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 3 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 2 }] }
        ]
      },
      {
        measureNumber: 3,
        timeSignature: '4/4',
        label: 'Ritornello Esplosivo (G5 -> A5)',
        beats: [
          { duration: '1/2', notes: [{ string: 6, fret: 3 }, { string: 5, fret: 5 }] },
          { duration: '1/2', notes: [{ string: 6, fret: 5 }, { string: 5, fret: 7 }] }
        ]
      }
    ]
  },

  // ==========================================
  // LIVELLO 2 / D-RANK (GROOVE & HEAVY RIFFING)
  // ==========================================
  {
    id: 'boss-back-in-black',
    title: 'Back in Black (Canzone Intera)',
    artist: 'AC/DC (Angus Young & Malcolm Young)',
    albumYear: 'Back in Black (1980)',
    rank: 'D-Rank',
    type: 'full_song',
    genre: 'Hard Rock Classico',
    tempoBpm: 92,
    tuning: 'Standard E',
    youtubeId: 'pAgnJDJN4VA',
    youtubeTitle: 'AC/DC - Back in Black (Mr. Tabs Guitar Tab & Video Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+AC+DC+Back+in+Black',
    songsterrUrl: 'https://www.songsterr.com/?pattern=AC+DC+Back+in+Black',
    description: 'Impara l\'intera canzone: gli iconici accordi E-D-A con stop percussivi, i celebri licks pentatonici di chiusura battuta, le strofe ritmiche di Malcolm e il bridge.',
    whyThisSong: 'Il massimo test per il timing ritmico, il controllo delle pause e l\'intenzione nel blues-rock.',
    requiredSkills: ['Accordi aperti E, D, A con muting netto', 'Pull-off pentatonici veloci', 'Bending di 1/4 di tono', 'Ritmica solida di Malcolm Young'],
    xpReward: 500,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Accordi Principali (E -> D -> A)',
        beats: [
          { duration: '1/4', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [] },
          { duration: '1/8', notes: [{ string: 3, fret: 2 }, { string: 2, fret: 3 }, { string: 1, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 2 }, { string: 2, fret: 3 }, { string: 1, fret: 2 }] },
          { duration: '1/8', notes: [] },
          { duration: '1/8', notes: [{ string: 4, fret: 2 }, { string: 3, fret: 2 }, { string: 2, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 2 }, { string: 3, fret: 2 }, { string: 2, fret: 2 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Lick Pentatonico di Risoluzione 1',
        beats: [
          { duration: '1/8', notes: [{ string: 1, fret: 3, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 1, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 3, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 2, technique: 'b' }] },
          { duration: '1/8', notes: [{ string: 3, fret: 0 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 0 }] }
        ]
      }
    ]
  },
  {
    id: 'boss-iron-man',
    title: 'Iron Man (Canzone Intera)',
    artist: 'Black Sabbath (Tony Iommi)',
    albumYear: 'Paranoid (1970)',
    rank: 'D-Rank',
    type: 'full_song',
    genre: 'Heavy Metal Primordiale',
    tempoBpm: 75,
    tuning: 'Standard E',
    youtubeId: '7Fw43_m_pSg',
    youtubeTitle: 'Black Sabbath - Iron Man (Mr. Tabs Guitar Tab & Video Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Black+Sabbath+Iron+Man',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Black+Sabbath+Iron+Man',
    description: 'Impara l\'intera canzone: il bending introduttivo dietro al capotasto, il riff portante in B5-D5-E5 con slide veloci, le strofe solenni e la variazione di tempo in 3/4.',
    whyThisSong: 'Allena la forza della mano sinistra nello scivolare con i power chords e padroneggiare i cambi di tempo.',
    requiredSkills: ['Power Chords con scivolate rapide', 'Bending iniziale', 'Cambi di tempo e groove 3/4', 'Plettrata potente e scandita'],
    xpReward: 500,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Main Riff Power Chords (B5 -> D5 -> E5)',
        beats: [
          { duration: '1/4', notes: [{ string: 6, fret: 7 }, { string: 5, fret: 9 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 5, technique: '/' }, { string: 4, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 5 }, { string: 4, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 7, technique: '/' }, { string: 4, fret: 9 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Slide Veloci (10 -> 9 -> 10 -> 9)',
        beats: [
          { duration: '1/8', notes: [{ string: 5, fret: 10, technique: '\\' }, { string: 4, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 9, technique: '/' }, { string: 4, fret: 11 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 10, technique: '\\' }, { string: 4, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 9 }, { string: 4, fret: 11 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 5 }, { string: 4, fret: 7 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 7 }, { string: 4, fret: 9 }] }
        ]
      }
    ]
  },
  {
    id: 'boss-enter-sandman',
    title: 'Enter Sandman (Canzone Intera)',
    artist: 'Metallica (Kirk Hammett & James Hetfield)',
    albumYear: 'Metallica / Black Album (1991)',
    rank: 'D-Rank',
    type: 'full_song',
    genre: 'Heavy Metal',
    tempoBpm: 123,
    tuning: 'Standard E',
    youtubeId: '1w7OgIMMRc4',
    youtubeTitle: 'Metallica - Enter Sandman (Mr. Tabs Guitar Tab & Video Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Metallica+Enter+Sandman',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Metallica+Enter+Sandman',
    description: 'Impara l\'intera canzone: arpeggio pulito con tritono (Mi-Sib), transizione nel riff pesante con wah e distorsione, strofe palm-mute e ritornello potente.',
    whyThisSong: 'Allena la dinamica clean/crunch, il palm muting compatto e la sincronizzazione della mano destra.',
    requiredSkills: ['Arpeggio con salto di corda', 'Palm Muting stretto con downpicking', 'Uso del tritono Bb (Blue note)', 'Power Chords pesanti F5 e F#5'],
    xpReward: 550,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Arpeggio Clean / Intro Tritono',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 6 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 5 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Main Heavy Riff Distorto',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] },
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 6 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 3 }] }
        ]
      }
    ]
  },

  // ==========================================
  // LIVELLO 3 / C-RANK (MELODIA & ASSOLI CLASSICI)
  // ==========================================
  {
    id: 'boss-comfortably-numb-solo1',
    title: 'Comfortably Numb (Primo Assolo Completo)',
    artist: 'Pink Floyd (David Gilmour)',
    albumYear: 'The Wall (1979)',
    rank: 'C-Rank',
    type: 'full_solo',
    genre: 'Progressive Rock / Blues Melodico',
    tempoBpm: 65,
    tuning: 'Standard E',
    youtubeId: 'o_l4Ab5FRwM',
    youtubeTitle: 'Pink Floyd - Comfortably Numb (Mr. Tabs Guitar Tab & Solo Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Pink+Floyd+Comfortably+Numb',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Pink+Floyd+Comfortably+Numb',
    description: 'Impara nota per nota il primo celebre assolo di David Gilmour in Re Maggiore: bending lenti ed espressivi di 1 tono e 1 tono e mezzo, vibrato ampio da manuale e note cantate.',
    whyThisSong: 'Il massimo punto di riferimento per l\'espressività della chitarra solista: intonazione perfetta dei bending e respiro delle frasi.',
    requiredSkills: ['Bending perfetti da 1 e 1.5 toni', 'Vibrato lento e controllato', 'Dinamica di tocco con plettro', 'Scala Re Maggiore e Si Minore Pentatonica'],
    xpReward: 650,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Frase 1: Bending 12° tasto Corda Sol (Re Maggiore)',
        beats: [
          { duration: '1/4', notes: [{ string: 3, fret: 12, technique: 'b' }] },
          { duration: '1/8', notes: [{ string: 3, fret: 12, technique: 'r' }] },
          { duration: '1/8', notes: [{ string: 3, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 12, technique: '~' }] },
          { duration: '1/4', notes: [{ string: 4, fret: 12 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Frase 2: Cantabile sui cantini (Corde Si e Mi)',
        beats: [
          { duration: '1/8', notes: [{ string: 3, fret: 11 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 2, fret: 12, technique: '~' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12, technique: 'b' }] },
          { duration: '1/4', notes: [{ string: 1, fret: 10, technique: '~' }] }
        ]
      },
      {
        measureNumber: 3,
        timeSignature: '4/4',
        label: 'Frase 3: Bending 15° tasto con vibrato in apice',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 15, technique: 'b' }] },
          { duration: '1/4', notes: [{ string: 1, fret: 12 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 15, technique: 'b' }] },
          { duration: '1/4', notes: [{ string: 1, fret: 15, technique: '~' }] }
        ]
      }
    ]
  },
  {
    id: 'boss-paranoid-solo',
    title: 'Paranoid (Assolo Completo)',
    artist: 'Black Sabbath (Tony Iommi)',
    albumYear: 'Paranoid (1970)',
    rank: 'C-Rank',
    type: 'full_solo',
    genre: 'Heavy Metal / Hard Rock',
    tempoBpm: 163,
    tuning: 'Standard E',
    youtubeId: 'yM9hI_1-q0c',
    youtubeTitle: 'Black Sabbath - Paranoid (Mr. Tabs Guitar Tab & Solo Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Black+Sabbath+Paranoid',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Black+Sabbath+Paranoid',
    description: 'Impara l\'assolo completo di Tony Iommi in Mi Minore Pentatonica al 12° tasto: trilli veloci, bending aggressivi e unisoni che hanno definito la chitarra metal.',
    whyThisSong: 'Allena la velocità della mano sinistra sui trilli e la resistenza su plettrate veloci a 163 BPM.',
    requiredSkills: ['Trilli rapidi (Hammer/Pull 12-15)', 'Bending al 14° tasto corda Sol', 'Doppie note (Double-stops)', 'Plettrata veloce in Mi Minore Pentatonica'],
    xpReward: 650,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Inizio Solo (Bending 14° tasto Sol + Double Stop)',
        beats: [
          { duration: '1/4', notes: [{ string: 3, fret: 14, technique: 'b' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 12 }] },
          { duration: '1/4', notes: [{ string: 2, fret: 15, technique: 'b' }] },
          { duration: '1/4', notes: [{ string: 2, fret: 15, technique: '~' }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Trillo Continuo Rapido (12-15 corda Si)',
        beats: [
          { duration: '1/8', notes: [{ string: 2, fret: 12, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15, technique: 'p' }] },
          { duration: '1/4', notes: [{ string: 3, fret: 14, technique: 'b' }] }
        ]
      }
    ]
  },
  {
    id: 'boss-wish-you-were-here',
    title: 'Wish You Were Here (Canzone Intera)',
    artist: 'Pink Floyd (David Gilmour)',
    albumYear: 'Wish You Were Here (1975)',
    rank: 'C-Rank',
    type: 'full_song',
    genre: 'Classic Acoustic Rock',
    tempoBpm: 60,
    tuning: 'Standard E (Chitarra Acustica 6/12 corde)',
    youtubeId: 'hKqgK0P_gEQ',
    youtubeTitle: 'Pink Floyd - Wish You Were Here (Mr. Tabs Guitar Tab & Acoustic Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Pink+Floyd+Wish+You+Were+Here',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Pink+Floyd+Wish+You+Were+Here',
    description: 'Impara l\'intera canzone: il leggendario intro acustico con bending su corda Sol, gli accordi G, C, D, Am suonati con dita 3 e 4 fisse sui cantini e la parte vocale.',
    whyThisSong: 'Insegna il fraseggio acustico pulito, la dinamica della plettrata e la combinazione di accordi e note melodiche singole.',
    requiredSkills: ['Accordi aperti G/Em7/Cadd9/D/Am', 'Bending acustico 2° tasto corda Sol', 'Plettrata alternata mista', 'Mantenimento dita 3 e 4 fisse sui tasti 3'],
    xpReward: 650,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro Melodico (G Corda 6 -> Corde 5 e 4)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 5, fret: 0, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 5, fret: 2 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 0 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 2, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 4, fret: 0 }] },
          { duration: '1/4', notes: [{ string: 5, fret: 2 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Accordo Em7 Strumming con dita 3 e 4 bloccate',
        beats: [
          { duration: '1/4', notes: [{ string: 6, fret: 0 }, { string: 5, fret: 2 }, { string: 4, fret: 2 }, { string: 3, fret: 0 }, { string: 2, fret: 3 }, { string: 1, fret: 3 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 0 }, { string: 5, fret: 2 }, { string: 4, fret: 2 }, { string: 3, fret: 0 }, { string: 2, fret: 3 }, { string: 1, fret: 3 }] },
          { duration: '1/2', notes: [{ string: 6, fret: 3 }, { string: 5, fret: 2 }, { string: 4, fret: 0 }, { string: 3, fret: 0 }, { string: 2, fret: 3 }, { string: 1, fret: 3 }] }
        ]
      }
    ]
  },

  // ==========================================
  // LIVELLO 4 / B-RANK (ESPRESSIVITÀ & ASSOLI HARD ROCK)
  // ==========================================
  {
    id: 'boss-sultans-of-swing-solo1',
    title: 'Sultans of Swing (Primo Assolo Completo)',
    artist: 'Dire Straits (Mark Knopfler)',
    albumYear: 'Dire Straits (1978)',
    rank: 'B-Rank',
    type: 'full_solo',
    genre: 'Roots Rock / Fingerstyle Solista',
    tempoBpm: 148,
    tuning: 'Standard E (Suonato Fingerstyle con Pollice e Indice)',
    youtubeId: 'hKqgK0P_gEQ',
    youtubeTitle: 'Dire Straits - Sultans of Swing (Mr. Tabs Guitar Tab & Solo Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Dire+Straits+Sultans+of+Swing',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Dire+Straits+Sultans+of+Swing',
    description: 'Impara l\'intero primo assolo di Mark Knopfler in Re Minore: arpeggi veloci di triade suonati con tocco fingerstyle, rake percussivi e bending blues.',
    whyThisSong: 'La bibbia della tecnica fingerstyle applicata alla chitarra elettrica solista e all\'arpeggio delle triadi (Dm, C, Bb, A).',
    requiredSkills: ['Fingerpicking solista (Pollice/Indice)', 'Triadi arpeggiate Dm, C, Bb', 'Rake percussivi', 'Pull-off rapidi a corda libera'],
    xpReward: 800,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Frase 1: Arpeggio Triade Dm al 10° tasto',
        beats: [
          { duration: '1/8', notes: [{ string: 3, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 13, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 1, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 3, fret: 10, technique: '~' }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Frase 2: Transizione Bb -> C con Bending',
        beats: [
          { duration: '1/8', notes: [{ string: 2, fret: 11 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 13, technique: 'b' }] },
          { duration: '1/8', notes: [{ string: 1, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 13, technique: 'b' }] },
          { duration: '1/4', notes: [{ string: 2, fret: 10, technique: '~' }] }
        ]
      }
    ]
  },
  {
    id: 'boss-hotel-california-solo',
    title: 'Hotel California (Assolo Finale Completo)',
    artist: 'Eagles (Don Felder & Joe Walsh)',
    albumYear: 'Hotel California (1976)',
    rank: 'B-Rank',
    type: 'full_solo',
    genre: 'Classic Rock / Armonia a 2 Chitarre',
    tempoBpm: 74,
    tuning: 'Standard E',
    youtubeId: 'hKqgK0P_gEQ',
    youtubeTitle: 'Eagles - Hotel California (Mr. Tabs Guitar Tab & Solo Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Eagles+Hotel+California',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Eagles+Hotel+California',
    description: 'Impara l\'assolo finale completo, votato tra i migliori di sempre: l\'intro melodico di Don Felder in Si Minore, le risposte blues di Joe Walsh e l\'epico duello finale armonizzato a terze.',
    whyThisSong: 'Allena la costruzione melodica su progressione armonica complessa (Bm - F#7 - A - E7 - G - D - Em - F#7).',
    requiredSkills: ['Bending precisi da 1 tono con vibrato', 'Arpeggi segui-accordo su progressione Bm', 'Licks blues ritmati', 'Duetto finale armonizzato'],
    xpReward: 850,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro Solo Felder (Bm -> F#7): Bending 9° tasto Sol',
        beats: [
          { duration: '1/8', notes: [{ string: 3, fret: 9, technique: 'b' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10, technique: 'b' }] },
          { duration: '1/4', notes: [{ string: 2, fret: 7, technique: '~' }] },
          { duration: '1/4', notes: [{ string: 3, fret: 9 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Frase Walsh (A -> E7): Bending 12° tasto con rilascio',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 12, technique: 'b' }] },
          { duration: '1/8', notes: [{ string: 1, fret: 10 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12, technique: 'r' }] },
          { duration: '1/4', notes: [{ string: 2, fret: 10 }] },
          { duration: '1/4', notes: [{ string: 3, fret: 9, technique: '~' }] }
        ]
      }
    ]
  },
  {
    id: 'boss-sweet-child-o-mine',
    title: 'Sweet Child O\' Mine (Canzone Intera)',
    artist: 'Guns N\' Roses (Slash)',
    albumYear: 'Appetite for Destruction (1987)',
    rank: 'B-Rank',
    type: 'full_song',
    genre: 'Hard Rock / Glam Rock',
    tempoBpm: 125,
    tuning: 'Eb Standard (Eb Ab Db Gb Bb Eb)',
    youtubeId: 'o_l4Ab5FRwM',
    youtubeTitle: 'Guns N\' Roses - Sweet Child O\' Mine (Mr. Tabs Guitar Tab & Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Guns+N+Roses+Sweet+Child+O+Mine',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Guns+N+Roses+Sweet+Child+O+Mine',
    description: 'Impara l\'intera canzone: l\'iconico pattern arpeggiato a corda incrociata (D, C, G), gli accordi energici delle strofe e il primo leggendario assolo col pickup al manico.',
    whyThisSong: 'Allena la precisione millimetrica della mano sinistra e la coordinazione tra dita 1, 3 e 4 sui salti di corda.',
    requiredSkills: ['String skipping a tempo veloce', 'Plettrata alternata continua', 'Accordi ritmici D, C, G5', 'Assolo espressivo con pickup al manico'],
    xpReward: 900,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro Riff D (Corde 4, 2, 3, 1)',
        beats: [
          { duration: '1/8', notes: [{ string: 4, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 14 }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Intro Riff C (Corde 4, 2, 3, 1)',
        beats: [
          { duration: '1/8', notes: [{ string: 4, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 14 }] }
        ]
      }
    ]
  },

  // ==========================================
  // LIVELLO 5 / A-RANK (ENDURANCE & SPEED SOLOS)
  // ==========================================
  {
    id: 'boss-master-of-puppets',
    title: 'Master of Puppets (Canzone Intera)',
    artist: 'Metallica (James Hetfield & Kirk Hammett)',
    albumYear: 'Master of Puppets (1986)',
    rank: 'A-Rank',
    type: 'full_song',
    genre: 'Thrash Metal',
    tempoBpm: 212,
    tuning: 'Standard E',
    youtubeId: 'fP_27V0uM48',
    youtubeTitle: 'Metallica - Master of Puppets (Mr. Tabs Guitar Tab & Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Metallica+Master+of+Puppets',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Metallica+Master+of+Puppets',
    description: 'Impara l\'intera maratona di 8 minuti del Thrash Metal: la discesa cromatica solo-downpicking a 212 BPM, le strofe in palm mute, il bridge in 5/8 e l\'interludio armonizzato.',
    whyThisSong: 'La prova definitiva di resistenza muscolare dell\'avambraccio e del polso per il downpicking puro.',
    requiredSkills: ['Downpicking a 212 BPM senza affaticamento', 'Discesa cromatica (7-6-5-0)', 'Tempi dispari 5/8 e 6/8', 'Interludio arpeggiato e armonizzato'],
    xpReward: 1200,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Intro Discesa Cromatica (Downpicking Puro)',
        beats: [
          { duration: '1/8', notes: [{ string: 5, fret: 7 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] },
          { duration: '1/8', notes: [{ string: 5, fret: 6 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] },
          { duration: '1/8', notes: [{ string: 5, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Discesa Veloce Finale (F5 -> E5)',
        beats: [
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] },
          { duration: '1/8', notes: [{ string: 6, fret: 0, technique: 'pm' }] },
          { duration: '1/8', notes: [{ string: 6, fret: 5 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 4 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 3 }] },
          { duration: '1/8', notes: [{ string: 6, fret: 2 }] },
          { duration: '1/4', notes: [{ string: 6, fret: 1 }, { string: 5, fret: 3 }] }
        ]
      }
    ]
  },
  {
    id: 'boss-crazy-train-solo',
    title: 'Crazy Train (Assolo Completo)',
    artist: 'Ozzy Osbourne (Randy Rhoads)',
    albumYear: 'Blizzard of Ozz (1980)',
    rank: 'A-Rank',
    type: 'full_solo',
    genre: 'Heavy Metal Neoclassico',
    tempoBpm: 138,
    tuning: 'Standard E',
    youtubeId: 'm7_z6b81jHQ',
    youtubeTitle: 'Ozzy Osbourne - Crazy Train (Mr. Tabs Guitar Tab & Solo Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Ozzy+Osbourne+Crazy+Train',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Ozzy+Osbourne+Crazy+Train',
    description: 'Impara l\'assolo completo di Randy Rhoads: la sequenza di tapping a due mani in Fa# Minore, le discese a plettrata alternata velocissima e i bending blues laceranti.',
    whyThisSong: 'Combina lo stile neoclassico, il tapping arpeggiato e l\'alternate picking serrato in una sola composizione.',
    requiredSkills: ['Two-Hand Tapping in Fa# Minore', 'Scala Fa# Minore Naturale a plettrata alternata', 'Trilli veloci e bending acuti al 17° tasto', 'Muting pulito delle corde non suonate'],
    xpReward: 1200,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Tapping Sequence (T14 p9 h10 su Corda Si)',
        beats: [
          { duration: '1/8', notes: [{ string: 2, fret: 14, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 9, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 14, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 9, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 10, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 14, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 9, technique: 'p' }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Tapping Shift (T14 p9 h12 -> T17)',
        beats: [
          { duration: '1/8', notes: [{ string: 2, fret: 14, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 9, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 17, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 9, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12, technique: 'h' }] },
          { duration: '1/4', notes: [{ string: 1, fret: 17, technique: 'b' }] }
        ]
      }
    ]
  },
  {
    id: 'boss-eruption-solo',
    title: 'Eruption (Assolo Completo)',
    artist: 'Van Halen (Eddie Van Halen)',
    albumYear: 'Van Halen (1978)',
    rank: 'A-Rank',
    type: 'full_solo',
    genre: 'Hard Rock Virtuoso',
    tempoBpm: 120,
    tuning: 'Eb Standard (Eb Ab Db Gb Bb Eb)',
    youtubeId: '3_9J5sB80g4',
    youtubeTitle: 'Van Halen - Eruption (Mr. Tabs Guitar Tab & Solo Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Van+Halen+Eruption',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Van+Halen+Eruption',
    description: 'Il brano che ha cambiato per sempre la chitarra elettrica: l\'intro blues-rock velocissimo, i tremolo picking e l\'iconica sezione di Tapping a triadi arpeggiate a due mani.',
    whyThisSong: 'Ha ridefinito il vocabolario solistico moderno introducendo il tapping polifonico a cascata.',
    requiredSkills: ['Two-Hand Tapping a 3 note (Tasto 12-13-17)', 'Tremolo Picking veloce su singola corda', 'Dive bombs con leva del vibrato', 'Sincronizzazione di entrambe le mani sulla tastiera'],
    xpReward: 1300,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Tapping Climax Triade (T13 p5 h8)',
        beats: [
          { duration: '1/8', notes: [{ string: 2, fret: 13, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 5, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 8, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 13, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 5, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 8, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 13, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 5, technique: 'p' }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Tapping Shift (T15 p6 h9)',
        beats: [
          { duration: '1/8', notes: [{ string: 2, fret: 15, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 6, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 9, technique: 'h' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15, technique: 't' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 6, technique: 'p' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 9, technique: 'h' }] },
          { duration: '1/4', notes: [{ string: 2, fret: 17, technique: 't' }] }
        ]
      }
    ]
  },

  // ==========================================
  // LIVELLO 6 / S-RANK (SHRED LEGEND & VIRTUOSO)
  // ==========================================
  {
    id: 'boss-tornado-of-souls-solo',
    title: 'Tornado of Souls (Assolo Completo)',
    artist: 'Megadeth (Marty Friedman)',
    albumYear: 'Rust in Peace (1990)',
    rank: 'S-Rank',
    type: 'full_solo',
    genre: 'Technical Thrash Metal / Neoclassical Shred',
    tempoBpm: 196,
    tuning: 'Standard E',
    youtubeId: 'oN3v5p69kX0',
    youtubeTitle: 'Megadeth - Tornado of Souls (Mr. Tabs Guitar Tab & Solo Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Megadeth+Tornado+of+Souls',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Megadeth+Tornado+of+Souls',
    description: 'Considerato unanimemente uno dei più grandi assoli metal di tutti i tempi: 2 minuti di pura maestria melodica con bending da 1.5 toni, sweep picking esotici e scale minori armoniche a 196 BPM.',
    whyThisSong: 'Il test supremo di tecnica, intonazione, bending e arpeggi avanzati.',
    requiredSkills: ['Bending da 1.5 e 2 toni con intonazione chirurgica', 'Sweep Picking su arpeggi a 3 e 4 corde', 'Scale esotiche (B Minore Armonica)', 'Plettrata alternata velocissima a 196 BPM'],
    xpReward: 2000,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Inizio Solo Friedman (Bending 17° tasto Si + Fraseggi Minori)',
        beats: [
          { duration: '1/4', notes: [{ string: 2, fret: 17, technique: 'b' }] },
          { duration: '1/8', notes: [{ string: 1, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 17, technique: 'r' }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 14 }] },
          { duration: '1/4', notes: [{ string: 3, fret: 16, technique: '~' }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Arpeggio Sweep Bm (14 -> 15 -> 14 -> 16)',
        beats: [
          { duration: '1/8', notes: [{ string: 1, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 16 }] },
          { duration: '1/8', notes: [{ string: 4, fret: 16 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 16 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 19, technique: 'b' }] }
        ]
      }
    ]
  },
  {
    id: 'boss-cliffs-of-dover-solo',
    title: 'Cliffs of Dover (Intro & Assolo Principale)',
    artist: 'Eric Johnson',
    albumYear: 'Ah Via Musicom (1990)',
    rank: 'S-Rank',
    type: 'full_solo',
    genre: 'Instrumental Rock Virtuoso',
    tempoBpm: 190,
    tuning: 'Standard E',
    youtubeId: '5Zg2s_w8t5s',
    youtubeTitle: 'Eric Johnson - Cliffs of Dover (Mr. Tabs Guitar Tab & Lesson)',
    mrTabsUrl: 'https://www.youtube.com/results?search_query=Mr+Tabs+Eric+Johnson+Cliffs+of+Dover',
    songsterrUrl: 'https://www.songsterr.com/?pattern=Eric+Johnson+Cliffs+of+Dover',
    description: 'Il capolavoro assoluto della chitarra fusion-rock: cascate pentatoniche fluide suonate con hybrid picking, salti di corda ampi e un tocco canoro simile a un violino.',
    whyThisSong: 'Allena la massima pulizia sonora, il controllo dei salti di corda e la fluidità estrema a tempo sostenuto.',
    requiredSkills: ['Hybrid Picking (Plettro + Dita medie)', 'Cascate di pentatonica a terzine e quartine', 'String Skipping estremo', 'Dinamica di tocco ed espressività'],
    xpReward: 2000,
    measures: [
      {
        measureNumber: 1,
        timeSignature: '4/4',
        label: 'Cascata Pentatonica Sol Maggiore (Intro Cascades)',
        beats: [
          { duration: '1/8', notes: [{ string: 1, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 15 }] },
          { duration: '1/8', notes: [{ string: 1, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 14 }] },
          { duration: '1/8', notes: [{ string: 3, fret: 12 }] },
          { duration: '1/4', notes: [{ string: 4, fret: 14, technique: '~' }] }
        ]
      },
      {
        measureNumber: 2,
        timeSignature: '4/4',
        label: 'Fraseggio Melodico Signature (G -> C -> D)',
        beats: [
          { duration: '1/8', notes: [{ string: 3, fret: 12 }] },
          { duration: '1/8', notes: [{ string: 2, fret: 13 }] },
          { duration: '1/4', notes: [{ string: 1, fret: 15, technique: '~' }] },
          { duration: '1/8', notes: [{ string: 1, fret: 17, technique: 'b' }] },
          { duration: '1/8', notes: [{ string: 1, fret: 15 }] },
          { duration: '1/4', notes: [{ string: 2, fret: 17, technique: '~' }] }
        ]
      }
    ]
  }
];
