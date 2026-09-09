import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audioEngine';
import { Play, Pause, Volume2, VolumeX, Plus, Minus, Activity, Music2, ChevronUp, ChevronDown } from 'lucide-react';

interface MetronomeBarProps {
  initialBpm?: number;
  onBpmChange?: (bpm: number) => void;
  className?: string;
  isFloating?: boolean;
}

export const MetronomeBar: React.FC<MetronomeBarProps> = ({
  initialBpm = 100,
  onBpmChange,
  className = '',
  isFloating = false
}) => {
  const [bpm, setBpm] = useState<number>(initialBpm);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState<number>(4);
  const [subdivision, setSubdivision] = useState<'quarter' | 'eighth' | 'sixteenth' | 'triplet'>('quarter');
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const tapTimesRef = useRef<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external initialBpm
  useEffect(() => {
    if (initialBpm && initialBpm !== bpm) {
      setBpm(initialBpm);
    }
  }, [initialBpm]);

  // Metronome tick loop
  useEffect(() => {
    if (!isPlaying) {
      setCurrentBeat(0);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const subFactor = subdivision === 'sixteenth' ? 4 : subdivision === 'triplet' ? 3 : subdivision === 'eighth' ? 2 : 1;
    const intervalMs = (60000 / bpm) / subFactor;

    let subIndex = 0;

    timerRef.current = setInterval(() => {
      const isBeatStart = subIndex % subFactor === 0;
      const beatNum = Math.floor(subIndex / subFactor) % beatsPerMeasure;

      if (isBeatStart) {
        const isAccent = beatNum === 0;
        soundEngine.playClick(isAccent, false);
        setCurrentBeat(beatNum + 1);
      } else {
        soundEngine.playClick(false, true);
      }

      subIndex = (subIndex + 1) % (beatsPerMeasure * subFactor);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, beatsPerMeasure, subdivision]);

  const handleBpmChange = (newBpm: number) => {
    const clamped = Math.max(30, Math.min(300, newBpm));
    setBpm(clamped);
    if (onBpmChange) onBpmChange(clamped);
  };

  const handleTapTempo = () => {
    const now = performance.now();
    const taps = tapTimesRef.current;
    taps.push(now);

    // Keep only last 5 taps
    if (taps.length > 5) taps.shift();

    if (taps.length >= 2) {
      // If time between last tap was > 2.5s, reset
      if (now - taps[taps.length - 2] > 2500) {
        tapTimesRef.current = [now];
        return;
      }

      const intervals: number[] = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      handleBpmChange(calculatedBpm);
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  return (
    <div
      className={`bg-[#0c0c0e] border border-zinc-800 rounded-2xl shadow-2xl transition-all ${
        isFloating ? 'fixed bottom-20 right-4 left-4 sm:left-auto sm:w-96 z-40' : ''
      } ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#09090b] rounded-t-2xl border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-zinc-600'}`} />
          <span className="text-xs font-bold font-mono text-zinc-200 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-red-500" />
            METRONOMO DI PRECISIONE
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMute}
            className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={isMuted ? 'Riattiva Audio' : 'Muta Metronomo'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
          {isFloating && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-zinc-400 hover:text-zinc-200"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Large BPM Display & Beat LEDs */}
          <div className="flex items-center justify-between bg-[#09090b] p-3.5 rounded-xl border border-zinc-800">
            <div>
              <div className="text-3xl font-black font-mono text-red-500 tracking-tight flex items-baseline gap-1">
                {bpm} <span className="text-xs font-normal text-zinc-400">BPM</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                {bpm < 60
                  ? 'Largo / Lento'
                  : bpm < 90
                  ? 'Andante / Riffing'
                  : bpm < 130
                  ? 'Moderato / Rock'
                  : bpm < 170
                  ? 'Allegro / Heavy Metal'
                  : 'Presto / Shred Soloing'}
              </div>
            </div>

            {/* Beat Indicators */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: beatsPerMeasure }).map((_, idx) => {
                const beatNumber = idx + 1;
                const isActive = isPlaying && currentBeat === beatNumber;
                const isAccent = idx === 0;

                return (
                  <div
                    key={idx}
                    className={`w-4 h-8 rounded-md transition-all duration-75 flex items-center justify-center font-mono text-[9px] font-bold ${
                      isActive
                        ? isAccent
                          ? 'bg-red-600 text-white scale-110 shadow-lg shadow-red-950/60'
                          : 'bg-red-900 text-red-200 scale-105 border border-red-700'
                        : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                    }`}
                  >
                    {beatNumber}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick BPM Increment / Slider Controls */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBpmChange(bpm - 5)}
                className="px-2.5 py-1 rounded-lg bg-[#09090b] border border-zinc-800 text-zinc-300 hover:text-red-400 font-mono text-xs font-bold active:scale-95"
              >
                -5
              </button>
              <button
                onClick={() => handleBpmChange(bpm - 1)}
                className="p-1 rounded-lg bg-[#09090b] border border-zinc-800 text-zinc-300 hover:text-red-400 active:scale-95"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <input
                type="range"
                min="40"
                max="260"
                value={bpm}
                onChange={(e) => handleBpmChange(Number(e.target.value))}
                className="flex-1 accent-red-600 cursor-pointer h-2 bg-zinc-900 rounded-lg"
              />

              <button
                onClick={() => handleBpmChange(bpm + 1)}
                className="p-1 rounded-lg bg-[#09090b] border border-zinc-800 text-zinc-300 hover:text-red-400 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleBpmChange(bpm + 5)}
                className="px-2.5 py-1 rounded-lg bg-[#09090b] border border-zinc-800 text-zinc-300 hover:text-red-400 font-mono text-xs font-bold active:scale-95"
              >
                +5
              </button>
            </div>
          </div>

          {/* Action Row: Start/Stop + Tap Tempo + Subdivision */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold font-mono text-xs transition-all active:scale-95 ${
                isPlaying
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? 'FERMA METRONOMO' : 'AVVIA METRONOMO'}
            </button>

            <button
              onClick={handleTapTempo}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#09090b] border border-zinc-800 hover:border-red-600/50 text-red-400 font-mono text-xs font-bold active:scale-90 transition-all"
            >
              <Music2 className="w-3.5 h-3.5" />
              TAP TEMPO
            </button>
          </div>

          {/* Subdivisions & Time Sig Options */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-800/80 text-[11px] font-mono">
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 text-[10px]">Divisione:</span>
              <button
                onClick={() => setSubdivision('quarter')}
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  subdivision === 'quarter' ? 'bg-red-950/40 text-red-300 border border-red-900/50 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1/4
              </button>
              <button
                onClick={() => setSubdivision('eighth')}
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  subdivision === 'eighth' ? 'bg-red-950/40 text-red-300 border border-red-900/50 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1/8
              </button>
              <button
                onClick={() => setSubdivision('sixteenth')}
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  subdivision === 'sixteenth' ? 'bg-red-950/40 text-red-300 border border-red-900/50 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1/16
              </button>
              <button
                onClick={() => setSubdivision('triplet')}
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  subdivision === 'triplet' ? 'bg-red-950/40 text-red-300 border border-red-900/50 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                3-lets
              </button>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-zinc-500 text-[10px]">Metro:</span>
              {[3, 4, 6].map((m) => (
                <button
                  key={m}
                  onClick={() => setBeatsPerMeasure(m)}
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    beatsPerMeasure === m ? 'bg-zinc-800 text-red-400 font-bold border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {m}/4
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
