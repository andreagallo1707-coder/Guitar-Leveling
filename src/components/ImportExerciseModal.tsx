import React, { useState, useRef } from 'react';
import { TechniqueExercise, DifficultyRank, TechniqueCategory } from '../types';
import { extractYoutubeId } from '../utils/storage';
import {
  X,
  Upload,
  Video,
  FileText,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Link,
  Trash2,
  Sparkles,
  Music,
  ExternalLink
} from 'lucide-react';

interface ImportExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExercise: (exercise: TechniqueExercise) => void;
  initialCategory?: string;
  initialRank?: DifficultyRank;
}

const TECHNIQUE_CATEGORIES: TechniqueCategory[] = [
  'Warm-Up & Finger Independence',
  'Alternate Picking',
  'Scale & 3NPS',
  'Legato & Hammer/Pull',
  'Economy & Sweep Picking',
  'String Skipping',
  'Tapping',
  'Bending, Vibrato & Harmonics',
  'Modern Fusion & Hybrid Picking'
];

const DIFFICULTY_RANKS: DifficultyRank[] = [
  'E-Rank',
  'D-Rank',
  'C-Rank',
  'B-Rank',
  'A-Rank',
  'S-Rank'
];

const rankToLevel = (rank: DifficultyRank): number => {
  switch (rank) {
    case 'E-Rank': return 1;
    case 'D-Rank': return 2;
    case 'C-Rank': return 3;
    case 'B-Rank': return 4;
    case 'A-Rank': return 5;
    case 'S-Rank': return 6;
    default: return 1;
  }
};

export const ImportExerciseModal: React.FC<ImportExerciseModalProps> = ({
  isOpen,
  onClose,
  onSaveExercise,
  initialCategory,
  initialRank
}) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>(
    initialCategory && initialCategory !== 'all'
      ? initialCategory
      : 'Warm-Up & Finger Independence'
  );
  const [difficultyRank, setDifficultyRank] = useState<DifficultyRank>(
    initialRank || 'B-Rank'
  );
  const [defaultBpm, setDefaultBpm] = useState<number>(80);
  const [targetBpm, setTargetBpm] = useState<number>(120);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const [biomechanicalFocus, setBiomechanicalFocus] = useState<string>('');

  // Tab file & text states
  const [tabFileName, setTabFileName] = useState<string>('');
  const [tabFileData, setTabFileData] = useState<string>('');
  const [tabFileType, setTabFileType] = useState<'image' | 'pdf' | 'text' | 'file' | undefined>(undefined);
  const [tabText, setTabText] = useState<string>('');
  const [showTabTextarea, setShowTabTextarea] = useState<boolean>(false);

  // Drag & drop state
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const detectedYtId = extractYoutubeId(videoUrl);

  const handleProcessFile = (file: File) => {
    setErrorMessage(null);
    setTabFileName(file.name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setTabFileData(reader.result as string);
        setTabFileType('image');
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      const reader = new FileReader();
      reader.onload = () => {
        setTabFileData(reader.result as string);
        setTabFileType('pdf');
      };
      reader.readAsDataURL(file);
    } else if (
      file.type.startsWith('text/') ||
      file.name.toLowerCase().endsWith('.txt') ||
      file.name.toLowerCase().endsWith('.tab')
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const textContent = reader.result as string;
        setTabText(textContent);
        setTabFileData(textContent);
        setTabFileType('text');
      };
      reader.readAsText(file);
    } else {
      // General file fallback
      const reader = new FileReader();
      reader.onload = () => {
        setTabFileData(reader.result as string);
        setTabFileType('file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleRemoveFile = () => {
    setTabFileName('');
    setTabFileData('');
    setTabFileType(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Il nome dell\'esercizio è obbligatorio per poterlo salvare.');
      return;
    }

    const newExercise: TechniqueExercise = {
      id: `custom-ex-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      category: category as any,
      level: rankToLevel(difficultyRank),
      difficultyRank: difficultyRank,
      defaultBpm: Number(defaultBpm) || 80,
      targetBpm: Number(targetBpm) || 120,
      description: biomechanicalFocus.trim() || 'Esercizio personalizzato importato dall\'utente.',
      focusMuscles: 'Esercizio importato',
      biomechanicalFocus: biomechanicalFocus.trim() || undefined,
      channelName: channelName.trim() || (detectedYtId ? 'Video Tutorial' : undefined),
      videoUrl: videoUrl.trim() || undefined,
      youtubeId: detectedYtId || undefined,
      tabFileName: tabFileName || undefined,
      tabFileData: tabFileData || undefined,
      tabFileType: tabFileType || undefined,
      tabText: tabText.trim() || undefined,
      tips: [
        'Pratica sempre a metronomo partendo da BPM bassi.',
        'Assicurati che ogni singola nota sia nitida e pulita prima di accelerare.'
      ],
      measures: [],
      tuning: 'Standard E (E A D G B E)',
      xpReward: 30,
      isCustom: true
    };

    onSaveExercise(newExercise);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-[#09090b] border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-800/80 text-red-400 flex items-center justify-center shadow-inner">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
                Importa Esercizio Personalizzato
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/70 text-red-400 border border-red-900/50">
                  THE FORGE
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Inserisci il nome e allega facoltativamente tablatura o video tutorial.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/80 text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Nome Esercizio (OBBLIGATORIO) */}
            <div>
              <label className="block text-xs font-mono font-bold text-zinc-200 mb-1.5">
                NOME DELL'ESERCIZIO <span className="text-red-500">* (Obbligatorio)</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="es. Lick Tapping Shawn Lane, Sweep su 5 Corde La Minore, etc."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-red-600 outline-none transition-colors ring-0 focus:ring-1 focus:ring-red-600/50"
              />
            </div>

            {/* Categoria Tecnica e Rank Difficoltà */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-300 mb-1.5">
                  CATEGORIA / TECNICA
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-red-600 outline-none"
                >
                  {TECHNIQUE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Altro / Personalizzato">Altro / Esercizio Personale</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-300 mb-1.5">
                  DIFFICOLTÀ (RANK)
                </label>
                <select
                  value={difficultyRank}
                  onChange={(e) => setDifficultyRank(e.target.value as DifficultyRank)}
                  className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-red-600 outline-none"
                >
                  {DIFFICULTY_RANKS.map((rk) => (
                    <option key={rk} value={rk}>
                      {rk}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* BPM Config */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-300 mb-1.5">
                  BPM BASE DI PARTENZA
                </label>
                <input
                  type="number"
                  min="40"
                  max="350"
                  value={defaultBpm}
                  onChange={(e) => setDefaultBpm(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-300 mb-1.5">
                  BPM TARGET OBIETTIVO
                </label>
                <input
                  type="number"
                  min="40"
                  max="400"
                  value={targetBpm}
                  onChange={(e) => setTargetBpm(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-red-600 outline-none"
                />
              </div>
            </div>

            {/* SEZIONE: VIDEO TUTORIAL (OPZIONALE) */}
            <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                  <Video className="w-4 h-4" />
                  VIDEO TUTORIAL (OPZIONALE)
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  YouTube o link video
                </span>
              </div>

              <div>
                <input
                  type="url"
                  placeholder="Incolla link (es. https://www.youtube.com/watch?v=... o https://youtu.be/...)"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0c0c0e] border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-red-600 outline-none placeholder:text-zinc-600"
                />
              </div>

              {detectedYtId ? (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Video YouTube valido rilevato (ID: {detectedYtId})</span>
                </div>
              ) : videoUrl.trim() ? (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-950/30 border border-blue-800/60 text-blue-300 text-xs font-mono">
                  <Link className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>Link video registrato come tutorial esterno</span>
                </div>
              ) : null}

              <div>
                <input
                  type="text"
                  placeholder="Nome Canale / Autore del tutorial (opzionale)"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0c0c0e] border border-zinc-800 text-xs font-mono text-zinc-300 focus:border-red-600 outline-none placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* SEZIONE: FILE TABLATURA (OPZIONALE - DRAG & DROP + CLICK) */}
            <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  FILE TABLATURA (OPZIONALE)
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  PNG, JPG, PDF, TXT
                </span>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf,.txt,.tab,.gp"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Drag & Drop zone */}
              {!tabFileName ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                    isDraggingFile
                      ? 'border-red-500 bg-red-950/20 text-red-300'
                      : 'border-zinc-800 hover:border-red-900/60 bg-[#0c0c0e]/80 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-400">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold block text-zinc-200">
                      Trascina qui il file della tablatura
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      oppure <strong className="text-red-400 underline">clicca per selezionarlo</strong> dal computer
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600">
                    Formati supportati: Immagini (PNG, JPG), Documenti PDF, o Testo (TXT, TAB)
                  </span>
                </div>
              ) : (
                /* Uploaded file preview card */
                <div className="p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-red-950/50 border border-red-900/60 text-red-400 flex items-center justify-center flex-shrink-0">
                      {tabFileType === 'image' ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : tabFileType === 'pdf' ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <Music className="w-4 h-4" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-mono font-bold text-zinc-200 truncate">
                        {tabFileName}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {tabFileType === 'image' && 'Immagine Tablatura'}
                        {tabFileType === 'pdf' && 'Documento PDF Tablatura'}
                        {tabFileType === 'text' && 'Testo Tablatura ASCII'}
                        {tabFileType === 'file' && 'File Allegato'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-colors"
                    title="Rimuovi file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Image preview thumbnail if available */}
              {tabFileType === 'image' && tabFileData && (
                <div className="rounded-xl overflow-hidden border border-zinc-800 max-h-40 bg-black/40 flex justify-center p-1">
                  <img
                    src={tabFileData}
                    alt="Anteprima Tablatura"
                    className="max-h-36 w-auto object-contain rounded-lg"
                  />
                </div>
              )}

              {/* Toggle ASCII Tab text area */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowTabTextarea(!showTabTextarea)}
                  className="text-[11px] font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>{showTabTextarea ? '▲ Nascondi' : '▼ Oppure scrivi / incolla tablatura in formato testo'}</span>
                </button>

                {showTabTextarea && (
                  <textarea
                    rows={4}
                    value={tabText}
                    onChange={(e) => setTabText(e.target.value)}
                    placeholder="e|-----------------------------|&#10;B|-----------------------------|&#10;G|--14p12-11h12h14-------------|..."
                    className="w-full mt-2 p-2.5 rounded-xl bg-[#0c0c0e] border border-zinc-800 text-xs font-mono text-red-200 focus:border-red-600 outline-none leading-relaxed"
                  />
                )}
              </div>
            </div>

            {/* Note & Focus Biomeccanico (Opzionale) */}
            <div>
              <label className="block text-xs font-mono font-bold text-zinc-300 mb-1.5">
                NOTE TECNICHE / FOCUS BIOMECCANICO (OPZIONALE)
              </label>
              <input
                type="text"
                placeholder="es. Movimento dal polso, muting del palmo, rilassamento delle spalle..."
                value={biomechanicalFocus}
                onChange={(e) => setBiomechanicalFocus(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-red-600 outline-none placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-[#09090b] border-t border-zinc-800 flex items-center justify-between flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs font-bold transition-colors"
            >
              Annulla
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-950/50 active:scale-95 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              SALVA ED AGGIUNGI ALLA SCHEDA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
