import React, { useState, useEffect } from 'react';
import { TabMeasure, TabNote } from '../types';
import { soundEngine } from '../utils/audioEngine';
import {
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  FileText,
  ExternalLink,
  Download,
  BookOpen,
  Music,
  ChevronLeft,
  ChevronRight,
  Layers,
  Eye
} from 'lucide-react';

interface PdfMetadata {
  name: string;
  totalPages: number;
  title: string;
}

const PDF_METADATA_MAP: Record<string, PdfMetadata> = {
  '/pdfs/linking-shapes.pdf': {
    name: 'linking-shapes',
    totalPages: 3,
    title: 'Linking Shapes'
  },
  '/pdfs/variation-01-triplets.pdf': {
    name: 'variation-01-triplets',
    totalPages: 6,
    title: 'Variation 01 - Triplets'
  },
  '/pdfs/variation-02-doubling-notes.pdf': {
    name: 'variation-02-doubling-notes',
    totalPages: 6,
    title: 'Variation 02 - Doubling Notes'
  },
  '/pdfs/arpeggio-01-adjacent-strings.pdf': {
    name: 'arpeggio-01-adjacent-strings',
    totalPages: 3,
    title: 'Arpeggio 01 - Adjacent Strings'
  },
  '/pdfs/hybrid-picking.pdf': {
    name: 'hybrid-picking',
    totalPages: 8,
    title: 'Hybrid Pentatonics'
  },
  '/pdfs/walking-arpeggio.pdf': {
    name: 'walking-arpeggio',
    totalPages: 4,
    title: 'Walking Arpeggio'
  }
};

interface TabViewerProps {
  exerciseId?: string;
  exerciseTitle?: string;
  pdfUrl?: string;
  pdfStartPage?: number;
  measures?: TabMeasure[];
  tuning?: string;
  tempoBpm?: number;
  interactivePlayback?: boolean;
  className?: string;
}

const STRINGS_META = [
  { num: 1, name: 'e', note: 'Mi cantino (1ª)' },
  { num: 2, name: 'B', note: 'Si (2ª)' },
  { num: 3, name: 'G', note: 'Sol (3ª)' },
  { num: 4, name: 'D', note: 'Re (4ª)' },
  { num: 5, name: 'A', note: 'La (5ª)' },
  { num: 6, name: 'E', note: 'Mi basso (6ª)' }
];

export const TabViewer: React.FC<TabViewerProps> = ({
  exerciseTitle = 'Esercizio',
  pdfUrl,
  measures = [],
  tuning = 'Standard E (E A D G B E)',
  tempoBpm = 100,
  interactivePlayback = true,
  className = ''
}) => {
  const hasMeasures = measures && measures.length > 0;
  const hasPdf = Boolean(pdfUrl);

  // If exercise has PDF, default to viewing the PDF; if only measures, show interactive tab
  const [activeTabMode, setActiveTabMode] = useState<'pdf' | 'tab'>(() => {
    return hasPdf ? 'pdf' : 'tab';
  });

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState<number>(-1);

  const pdfInfo = pdfUrl ? PDF_METADATA_MAP[pdfUrl] : undefined;
  const [currentPdfPage, setCurrentPdfPage] = useState<number>(1);
  const [showAllPdfPages, setShowAllPdfPages] = useState<boolean>(false);
  const [pdfZoomLevel, setPdfZoomLevel] = useState<number>(1);

  // Reset page when pdfUrl changes
  useEffect(() => {
    setCurrentPdfPage(1);
    setPdfZoomLevel(1);
    setShowAllPdfPages(false);
  }, [pdfUrl]);

  // Keep active mode in sync if props change
  useEffect(() => {
    if (hasPdf) {
      setActiveTabMode('pdf');
    } else {
      setActiveTabMode('tab');
    }
  }, [hasPdf, pdfUrl]);

  // Flatten beats to support sequential playhead for interactive tab
  const allBeats = React.useMemo(() => {
    if (!hasMeasures) return [];
    const list: {
      measureIndex: number;
      beatIndex: number;
      measureNumber: number;
      notes: TabNote[];
      palmMutted?: boolean;
    }[] = [];
    measures.forEach((m, mIdx) => {
      m.beats.forEach((b, bIdx) => {
        list.push({
          measureIndex: mIdx,
          beatIndex: bIdx,
          measureNumber: m.measureNumber,
          notes: b.notes,
          palmMutted: b.palmMutted
        });
      });
    });
    return list;
  }, [measures, hasMeasures]);

  // Audio Playback loop for interactive tab
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && allBeats.length > 0) {
      const intervalMs = Math.max(70, Math.round(60000 / (tempoBpm * 2)));
      timer = setInterval(() => {
        setCurrentBeatIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= allBeats.length) {
            setIsPlaying(false);
            return -1;
          }
          const currentBeat = allBeats[nextIndex];
          if (currentBeat?.notes) {
            currentBeat.notes.forEach((n) => {
              soundEngine.playGuitarNote(n.string, n.fret);
            });
          }
          return nextIndex;
        });
      }, intervalMs);
    } else {
      setCurrentBeatIndex(-1);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, allBeats, tempoBpm]);

  const togglePlayback = () => {
    if (!isPlaying && allBeats.length > 0) {
      const firstBeat = allBeats[0];
      if (firstBeat?.notes) {
        firstBeat.notes.forEach((n) => soundEngine.playGuitarNote(n.string, n.fret));
      }
      setCurrentBeatIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentBeatIndex(-1);
    }
  };

  return (
    <div
      className={`flex flex-col bg-[#0d0d11] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl ${className}`}
    >
      {/* Top Header & Mode Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-5 py-2.5 bg-[#121216] border-b border-zinc-800 text-xs">
        {/* Left: Title & Mode Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 font-mono text-zinc-300 font-bold">
            <FileText className="w-4 h-4 text-red-400" />
            <span className="text-zinc-100">{exerciseTitle}</span>
          </div>

          {/* Mode switch if both PDF and interactive measures exist */}
          {hasPdf && hasMeasures && (
            <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-700/80 p-0.5 ml-2">
              <button
                type="button"
                onClick={() => setActiveTabMode('pdf')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  activeTabMode === 'pdf'
                    ? 'bg-red-700 text-white shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Spartito PDF Ufficiale
              </button>
              <button
                type="button"
                onClick={() => setActiveTabMode('tab')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  activeTabMode === 'tab'
                    ? 'bg-red-700 text-white shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                Tab Interattiva
              </button>
            </div>
          )}

          {hasPdf && !hasMeasures && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-800/40">
              File Originale JamTrackCentral — Copertina Compresa
            </span>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Controls for PDF Mode */}
          {activeTabMode === 'pdf' && pdfUrl && (
            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 transition-colors shadow-sm"
                title="Visualizza file originale a schermo intero"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                Apri PDF Originale
              </a>
              <a
                href={pdfUrl}
                download
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 transition-colors shadow-sm"
                title="Scarica il file PDF originale sul tuo dispositivo"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                Scarica
              </a>
            </div>
          )}

          {/* Controls for Tab Mode */}
          {activeTabMode === 'tab' && (
            <>
              {interactivePlayback && hasMeasures && (
                <button
                  type="button"
                  onClick={togglePlayback}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-sm ${
                    isPlaying
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-red-700 hover:bg-red-600 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> Play Tab
                    </>
                  )}
                </button>
              )}

              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                  title="Riduci zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1 text-zinc-400">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                  title="Aumenta zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          <div className="hidden sm:flex items-center text-[11px] font-mono text-zinc-400 pl-2 border-l border-zinc-800">
            <span>{tuning}</span>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      {activeTabMode === 'pdf' && pdfUrl ? (
        /* NATIVE A4 HIGH-RES DOCUMENT VIEWER (Zero iframe blocking, 100% Chrome compatible) */
        <div className="w-full flex flex-col bg-[#141417]">
          {/* Document Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#101013] border-b border-zinc-800/80 text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                File Originale JTC (Copertina Inclusa)
              </span>
              {pdfInfo && (
                <span className="px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-300 text-[10px] border border-zinc-700/60 font-mono">
                  {pdfInfo.totalPages} Pagine A4
                </span>
              )}
            </div>

            {/* Pagination & View Controls */}
            {pdfInfo && (
              <div className="flex items-center gap-2 flex-wrap">
                {/* Page Navigation */}
                {!showAllPdfPages && (
                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                    <button
                      type="button"
                      disabled={currentPdfPage <= 1}
                      onClick={() => setCurrentPdfPage((p) => Math.max(1, p - 1))}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-100 disabled:opacity-30 disabled:hover:text-zinc-400 hover:bg-zinc-800 transition-colors"
                      title="Pagina precedente"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono px-2 text-zinc-200 font-bold">
                      Pag. {currentPdfPage} / {pdfInfo.totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={currentPdfPage >= pdfInfo.totalPages}
                      onClick={() => setCurrentPdfPage((p) => Math.min(pdfInfo.totalPages, p + 1))}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-100 disabled:opacity-30 disabled:hover:text-zinc-400 hover:bg-zinc-800 transition-colors"
                      title="Pagina successiva"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* View Mode Toggle: Single Page vs All Pages Continuous Scroll */}
                <button
                  type="button"
                  onClick={() => setShowAllPdfPages((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                    showAllPdfPages
                      ? 'bg-emerald-950/70 border-emerald-600/70 text-emerald-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                  title={showAllPdfPages ? 'Torna a vista pagina singola' : 'Visualizza tutte le pagine una sotto l\'altra'}
                >
                  <Layers className="w-3 h-3" />
                  <span className="hidden sm:inline">
                    {showAllPdfPages ? 'Vista Singola' : 'Tutte le Pagine (Scroll)'}
                  </span>
                </button>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setPdfZoomLevel((z) => Math.max(0.6, z - 0.15))}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                    title="Riduci zoom PDF"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono px-1.5 text-zinc-300 font-semibold">
                    {Math.round(pdfZoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setPdfZoomLevel((z) => Math.min(1.8, z + 0.15))}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                    title="Aumenta zoom PDF"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Page Jumping Pills */}
          {pdfInfo && !showAllPdfPages && pdfInfo.totalPages > 1 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d10] border-b border-zinc-800/60 overflow-x-auto">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-1 flex-shrink-0">
                Vai a:
              </span>
              {Array.from({ length: pdfInfo.totalPages }, (_, i) => i + 1).map((pageNum) => {
                let label = `Pag. ${pageNum}`;
                if (pageNum === 1) label = '1: Copertina';
                else if (pageNum === 2) label = '2: Info JTC';
                else if (pageNum === 3) label = '3: Spartito & TAB';
                else label = `${pageNum}: TAB cont.`;

                const isCurrent = currentPdfPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPdfPage(pageNum)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono flex-shrink-0 transition-all ${
                      isCurrent
                        ? 'bg-red-700 text-white font-bold shadow-xs'
                        : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* PDF Page Display Canvas */}
          <div className="w-full min-h-[520px] max-h-[820px] overflow-auto p-4 sm:p-6 flex flex-col items-center bg-[#18181c] select-none">
            {pdfInfo ? (
              showAllPdfPages ? (
                /* Continuous scroll list of all pages */
                <div className="flex flex-col gap-8 items-center w-full">
                  {Array.from({ length: pdfInfo.totalPages }, (_, idx) => idx + 1).map((page) => (
                    <div
                      key={page}
                      className="flex flex-col items-center w-full max-w-full"
                      style={{
                        width: `${Math.round(820 * pdfZoomLevel)}px`
                      }}
                    >
                      <div className="w-full flex items-center justify-between pb-1.5 text-[11px] font-mono text-zinc-400">
                        <span className="font-bold text-zinc-300">
                          {page === 1
                            ? 'Pagina 1 — Copertina Ufficiale JTC'
                            : page === 2
                            ? 'Pagina 2 — Scheda Release JamTrackCentral'
                            : `Pagina ${page} — Spartito & Tablatura PowerTab`}
                        </span>
                        <span>Pag. {page} / {pdfInfo.totalPages}</span>
                      </div>
                      <div className="w-full bg-white rounded-md shadow-2xl overflow-hidden border border-zinc-700/60 transition-all">
                        <img
                          src={`/pdfs/pages/${pdfInfo.name}-page-${page}.png`}
                          alt={`${exerciseTitle} - Pagina ${page}`}
                          className="w-full h-auto block"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Single Page View */
                <div
                  className="flex flex-col items-center transition-all w-full"
                  style={{
                    width: `${Math.round(820 * pdfZoomLevel)}px`,
                    maxWidth: '100%'
                  }}
                >
                  <div className="w-full bg-white rounded-md shadow-2xl overflow-hidden border border-zinc-700/60">
                    <img
                      src={`/pdfs/pages/${pdfInfo.name}-page-${currentPdfPage}.png`}
                      alt={`${exerciseTitle} - Pagina ${currentPdfPage}`}
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )
            ) : (
              /* Fallback if PDF not found in manifest */
              <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400">
                <FileText className="w-12 h-12 text-zinc-600 mb-3" />
                <p className="text-sm font-medium text-zinc-300 mb-2">
                  Documento PDF Originale JamTrackCentral
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apri PDF in Nuova Scheda
                  </a>
                  <a
                    href={pdfUrl}
                    download
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold"
                  >
                    <Download className="w-4 h-4" />
                    Scarica PDF
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Bottom helper footer */}
          <div className="px-4 py-2 bg-[#101013] border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Formato Originale A4 JamTrackCentral — Standard Notation + Tablature</span>
            <div className="flex items-center gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Apri PDF originale (.pdf)
              </a>
              <a
                href={pdfUrl}
                download
                className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Scarica (.pdf)
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE TABLATURE SCORE SHEET */
        <div className="overflow-x-auto p-4 sm:p-6 bg-[#09090b] select-none">
          {hasMeasures ? (
            <div
              className="inline-flex min-w-full flex-col gap-6"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
            >
              {measures.map((measure, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-[#0c0c0e] border border-zinc-800/80 rounded-xl p-3 sm:p-4 shadow-sm"
                >
                  {/* Measure Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#09090b] text-red-400 font-mono text-[11px] font-bold border border-red-900/40">
                        BATTUTA {measure.measureNumber}
                      </span>
                      {measure.timeSignature && (
                        <span className="text-xs font-mono text-zinc-400 font-bold">
                          Tempo: {measure.timeSignature}
                        </span>
                      )}
                      {measure.label && (
                        <span className="text-xs text-zinc-300 font-medium italic">
                          — {measure.label}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">
                      Clicca un tasto per ascoltare la nota
                    </span>
                  </div>

                  {/* 6-String Guitar Tablature Grid */}
                  <div className="relative flex items-stretch">
                    {/* Left String Headings */}
                    <div className="flex flex-col justify-between py-1 pr-3 border-r-2 border-red-600/40 text-right z-10 select-none bg-[#09090b] rounded-l">
                      {STRINGS_META.map((s) => (
                        <div
                          key={s.num}
                          className="h-8 flex items-center justify-end font-mono text-xs font-extrabold text-zinc-300"
                          title={s.note}
                        >
                          <span className="w-5 text-center text-red-400/90">{s.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tab Columns / Beats Area */}
                    <div className="relative flex-1 flex items-stretch divide-x divide-zinc-800/40 min-w-[260px] sm:min-w-[340px]">
                      {/* Horizontal String Lines Background */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-1 z-0">
                        {[1, 2, 3, 4, 5, 6].map((strNum) => (
                          <div key={strNum} className="h-8 flex items-center w-full">
                            <div
                              className={`w-full ${
                                strNum === 6
                                  ? 'h-[2.5px] bg-zinc-600'
                                  : strNum === 5
                                  ? 'h-[2px] bg-zinc-600/90'
                                  : strNum === 4
                                  ? 'h-[1.75px] bg-zinc-600/80'
                                  : strNum === 3
                                  ? 'h-[1.5px] bg-zinc-700'
                                  : strNum === 2
                                  ? 'h-[1.25px] bg-zinc-700'
                                  : 'h-[1px] bg-zinc-700'
                              }`}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Beats in this measure */}
                      {measure.beats.map((beat, bIdx) => {
                        let globalBeatIndex = 0;
                        for (let i = 0; i < mIdx; i++) {
                          globalBeatIndex += measures[i].beats.length;
                        }
                        globalBeatIndex += bIdx;
                        const isCurrentPlaying = isPlaying && currentBeatIndex === globalBeatIndex;

                        return (
                          <div
                            key={bIdx}
                            className={`flex-1 flex flex-col justify-between py-1 relative transition-colors duration-75 ${
                              isCurrentPlaying ? 'bg-red-950/40 ring-1 ring-red-500' : ''
                            }`}
                          >
                            {/* Palm Mute indication */}
                            {beat.palmMutted && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-amber-400 select-none">
                                P.M.
                              </div>
                            )}

                            {/* Render strings 1 to 6 */}
                            {[1, 2, 3, 4, 5, 6].map((strNum) => {
                              const noteOnString = beat.notes.find((n) => n.string === strNum);

                              return (
                                <div
                                  key={strNum}
                                  className="h-8 flex items-center justify-center relative z-10"
                                >
                                  {noteOnString !== undefined && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        soundEngine.playGuitarNote(
                                          noteOnString.string,
                                          noteOnString.fret
                                        )
                                      }
                                      className={`min-w-[22px] h-[22px] px-1 rounded flex items-center justify-center font-mono font-extrabold text-xs shadow transition-all ${
                                        isCurrentPlaying
                                          ? 'bg-red-500 text-white scale-125 ring-2 ring-white z-20'
                                          : 'bg-[#18181b] text-zinc-100 hover:bg-red-900 hover:text-white border border-zinc-700'
                                      }`}
                                    >
                                      {noteOnString.fret}
                                      {noteOnString.technique && (
                                        <span className="text-[9px] ml-0.5 text-amber-400">
                                          {noteOnString.technique}
                                        </span>
                                      )}
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs">
              Nessuna tablatura interattiva disponibile per questo esercizio.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
