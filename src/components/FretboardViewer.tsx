import React from 'react';
import { soundEngine } from '../utils/audioEngine';

interface FretboardViewerProps {
  rootNote?: string;
  notesOnFretboard?: { fret: number; string: number; label: string; isRoot?: boolean }[];
  title?: string;
  className?: string;
}

const STRINGS = [
  { num: 1, name: 'e' },
  { num: 2, name: 'B' },
  { num: 3, name: 'G' },
  { num: 4, name: 'D' },
  { num: 5, name: 'A' },
  { num: 6, name: 'E' }
];

const INLAYS_SINGLE = [3, 5, 7, 9, 15, 17, 19, 21];
const INLAYS_DOUBLE = [12, 24];

export const FretboardViewer: React.FC<FretboardViewerProps> = ({
  notesOnFretboard = [],
  title,
  className = ''
}) => {
  const frets = Array.from({ length: 16 }, (_, i) => i); // 0 (open) to 15

  const handleNoteClick = (stringNum: number, fret: number) => {
    soundEngine.playGuitarNote(stringNum, fret);
  };

  return (
    <div className={`bg-[#0c0c0e] border border-zinc-800 rounded-xl p-4 overflow-x-auto ${className}`}>
      {title && (
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-800">
          <span className="text-xs font-bold text-red-400 font-mono tracking-wide uppercase">
            Mappa del Manico (Fretboard Visualizer): {title}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Tasti 0 (A Vuoto) a 15
          </span>
        </div>
      )}

      <div className="min-w-[700px] select-none">
        {/* Fret Number Header */}
        <div className="flex border-b border-zinc-800 pb-1">
          <div className="w-12 text-center text-[10px] font-mono font-bold text-zinc-500">Corda</div>
          {frets.map((fret) => (
            <div
              key={fret}
              className={`flex-1 text-center text-[11px] font-mono font-bold ${
                fret === 0
                  ? 'text-zinc-400'
                  : INLAYS_DOUBLE.includes(fret)
                  ? 'text-red-400'
                  : INLAYS_SINGLE.includes(fret)
                  ? 'text-zinc-300'
                  : 'text-zinc-600'
              }`}
            >
              {fret === 0 ? '0' : fret}
            </div>
          ))}
        </div>

        {/* Fretboard Strings Grid */}
        <div className="relative bg-[#09090b] border-y-2 border-zinc-800 py-1 my-1 shadow-inner">
          {STRINGS.map((str) => (
            <div key={str.num} className="relative flex items-center h-7 border-b border-zinc-800/40 last:border-b-0">
              {/* String Name Label */}
              <div className="w-12 text-center font-mono text-xs font-extrabold text-red-400 bg-[#0c0c0e] border-r border-zinc-800 z-10">
                {str.name}
              </div>

              {/* String Wire Line */}
              <div
                className={`absolute left-12 right-0 pointer-events-none ${
                  str.num === 6
                    ? 'h-[3px] bg-zinc-500'
                    : str.num === 5
                    ? 'h-[2.5px] bg-zinc-500'
                    : str.num === 4
                    ? 'h-[2px] bg-zinc-600'
                    : str.num === 3
                    ? 'h-[1.5px] bg-zinc-600'
                    : str.num === 2
                    ? 'h-[1.2px] bg-zinc-600'
                    : 'h-[1px] bg-zinc-600'
                }`}
              />

              {/* Fret Cells */}
              {frets.map((fret) => {
                const note = notesOnFretboard.find((n) => n.string === str.num && n.fret === fret);

                return (
                  <div
                    key={fret}
                    className={`flex-1 h-full flex items-center justify-center relative ${
                      fret === 0
                        ? 'border-r-4 border-red-600/60 bg-red-950/20'
                        : 'border-r border-zinc-800'
                    }`}
                  >
                    {note && (
                      <button
                        onClick={() => handleNoteClick(str.num, fret)}
                        className={`relative z-20 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shadow transition-transform active:scale-90 ${
                          note.isRoot
                            ? 'bg-red-600 text-white ring-2 ring-red-400 font-extrabold shadow-md shadow-red-950/50'
                            : 'bg-[#0c0c0e] text-red-300 border border-red-900/60 hover:bg-red-600 hover:text-white'
                        }`}
                        title={`Corda ${str.num}, Tasto ${fret}: ${note.label}`}
                      >
                        {note.label}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Inlay Dots on the neck */}
          <div className="absolute inset-0 pointer-events-none flex items-center left-12 right-0">
            {frets.map((fret) => {
              const isDouble = INLAYS_DOUBLE.includes(fret);
              const isSingle = INLAYS_SINGLE.includes(fret);

              return (
                <div key={fret} className="flex-1 flex flex-col items-center justify-center gap-4">
                  {isSingle && (
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow" />
                  )}
                  {isDouble && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-red-600/60 shadow" />
                      <div className="w-2 h-2 rounded-full bg-red-600/60 shadow" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
