import React, { useState } from 'react';
import { ApiSettings, HunterProfile, LickPrize } from '../types';
import { saveApiSettings, exportUserDataJson, importUserDataJson, resetAllUserData } from '../utils/storage';
import { callAiModel } from '../utils/aiCoachEngine';
import { generateRewardLickPdf } from '../utils/pdfGenerator';
import { soundEngine } from '../utils/audioEngine';
import {
  Key,
  Cpu,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Shield,
  FileText,
  Trash2,
  Sparkles,
  Zap,
  Music,
  ExternalLink,
  Globe,
  Sliders
} from 'lucide-react';

interface SettingsViewProps {
  apiSettings: ApiSettings;
  onUpdateApiSettings: (settings: ApiSettings) => void;
  hunterProfile: HunterProfile;
  onUpdateProfile: (profile: HunterProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  apiSettings,
  onUpdateApiSettings,
  hunterProfile,
  onUpdateProfile
}) => {
  const [currentSettings, setCurrentSettings] = useState<ApiSettings>(apiSettings);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testFeedback, setTestFeedback] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Handle Field Changes
  const handleFieldChange = (field: keyof ApiSettings, value: any) => {
    const updated: ApiSettings = {
      ...currentSettings,
      [field]: value
    };
    setCurrentSettings(updated);
    onUpdateApiSettings(updated);
    saveApiSettings(updated);
  };

  // Test API Connection
  const handleTestConnection = async () => {
    if (!currentSettings.apiKey.trim()) {
      setTestStatus('error');
      setTestFeedback('Inserisci prima la tua chiave API per effettuare il test.');
      return;
    }

    setTestStatus('testing');
    setTestFeedback('Invio richiesta di test al server configurato...');

    try {
      const response = await callAiModel(
        [{ role: 'user', content: 'Rispondi con un saluto energico da chitarrista rock in una sola riga.' }],
        currentSettings
      );

      setTestStatus('success');
      setTestFeedback(response);
      soundEngine.playSuccess();
    } catch (err: any) {
      setTestStatus('error');
      setTestFeedback(`Errore di connessione: ${err?.message || 'Verifica Base URL, Model ID e Chiave API.'}`);
    }
  };

  // Download All Data as JSON
  const handleExportData = () => {
    const jsonStr = exportUserDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GuitarLeveling_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import Data from JSON
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importUserDataJson(content);
      if (res.success) {
        setImportStatus('✅ Dati importati con successo! Ricarica per visualizzare le modifiche.');
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setImportStatus(`❌ ${res.message}`);
      }
    };
    reader.readAsText(file);
  };

  // Reset All Data
  const handleResetData = () => {
    if (window.confirm('Sei sicuro di voler resettare tutti i progressi? Questa azione cancellerà i record e i log locali.')) {
      resetAllUserData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#140b0d] to-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Key className="w-5 h-5 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                CENTRO DI CONTROLLO & IA
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-100 uppercase tracking-tight">
              IMPOSTAZIONI & ARCHIVIO PREMI
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              Configura liberamente qualsiasi Server IA compatibile (OpenRouter, OmniRoute, Localhost, ecc.), gestisci i salvataggi permanenti e accedi ai Lick Premio in PDF.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Memoria Permanente: <strong>Attiva (localStorage)</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: UNIVERSAL API SETTINGS */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-800/40">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-mono font-bold text-zinc-100">
                Impostazioni API Universali
              </h3>
              <p className="text-xs text-zinc-400">
                Collegamento libero a qualsiasi provider compatibile OpenAI (OpenRouter, OmniRoute, LM Studio, Ollama, ecc.). I dati sono salvati in locale nel tuo browser.
              </p>
            </div>
          </div>

          {currentSettings.apiKey ? (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> API Configurate
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-[11px]">
              Modalità Coach Offline
            </span>
          )}
        </div>

        <div className="space-y-4">
          {/* 1. Base URL Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-red-400" />
              Indirizzo Base del Server (Base URL):
            </label>
            <input
              type="text"
              value={currentSettings.baseUrl || ''}
              onChange={(e) => handleFieldChange('baseUrl', e.target.value)}
              placeholder="https://openrouter.ai"
              className="w-full bg-[#121215] border border-zinc-700 rounded-xl px-4 py-3 text-sm font-mono text-zinc-100 focus:outline-none focus:border-red-500 transition-colors"
            />
            <p className="text-[11px] text-zinc-500 font-mono">
              Valore predefinito: <span className="text-zinc-300">https://openrouter.ai</span>. Modificabile liberamente (es. endpoint locale OmniRoute o Ollama).
            </p>
          </div>

          {/* 2. Model ID Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-red-400" />
              Identificativo del Modello (Model ID):
            </label>
            <input
              type="text"
              value={currentSettings.model || ''}
              onChange={(e) => handleFieldChange('model', e.target.value)}
              placeholder="es. auto/best-free oppure meta-llama/llama-3.3-70b-instruct"
              className="w-full bg-[#121215] border border-zinc-700 rounded-xl px-4 py-3 text-sm font-mono text-zinc-100 focus:outline-none focus:border-red-500 transition-colors"
            />
            <p className="text-[11px] text-zinc-500 font-mono">
              Scrivi a mano il modello desiderato (se lasciato vuoto su OpenRouter verrà utilizzato automaticamente <span className="text-zinc-300">auto/best-free</span>).
            </p>
          </div>

          {/* 3. API Key Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-red-400" />
              Chiave API (API Key):
            </label>
            <div className="relative flex items-center">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={currentSettings.apiKey || ''}
                onChange={(e) => handleFieldChange('apiKey', e.target.value)}
                placeholder="Incolla qui la tua API Key (es. sk-or-v1-..., sk-..., ecc.)"
                className="w-full bg-[#121215] border border-zinc-700 rounded-xl pl-4 pr-24 py-3 text-sm font-mono text-zinc-100 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 px-2 py-1 text-xs font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-800 rounded-lg flex items-center gap-1"
              >
                {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showApiKey ? 'Nascondi' : 'Mostra'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* System Prompt Banner Note */}
        <div className="bg-[#140c0f] border border-red-900/40 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 space-y-1">
            <span className="font-mono font-bold text-red-300 block">
              DIRETTIVA DI SISTEMA RIGIDA ATTIVA:
            </span>
            <p className="leading-relaxed">
              "Sei l'assistente e Coach ufficiale di Guitar Leveling. Rispondi solo a temi di chitarra elettrica, tecnica ed ergonomia, teoria musicale, armonia rock/metal ed esercizi dell'app, rifiutando cortesemente ogni altro argomento non attinente."
            </p>
          </div>
        </div>

        {/* Test Connection Button & Result Box */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-950/40 transition-all disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              {testStatus === 'testing' ? 'TEST CONNESSIONE IN CORSO...' : 'TESTA CONNESSIONE API'}
            </button>

            {testStatus === 'success' && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Connessione riuscita! Il Coach è pronto.
              </span>
            )}
            {testStatus === 'error' && (
              <span className="text-xs font-mono text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> {testFeedback}
              </span>
            )}
          </div>

          {testStatus === 'success' && testFeedback && (
            <div className="bg-black/50 border border-emerald-900/60 rounded-xl p-3 text-xs font-mono text-emerald-300">
              💬 Risposta ricevuta: "{testFeedback}"
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: SCRIGNO PREMI & ARCHIVIO LICK PDF */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-800/40">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-mono font-bold text-zinc-100">
                Scrigno dei Premi & Lick in PDF
              </h3>
              <p className="text-xs text-zinc-400">
                Tutti i Lick e gli Assoli Premio conquistati al superamento dei moduli di teoria e dei Boss Fight.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 font-mono text-xs font-bold self-start sm:self-auto">
            {hunterProfile.savedPrizes?.length || 0} Lick Sbloccati
          </span>
        </div>

        {hunterProfile.savedPrizes && hunterProfile.savedPrizes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hunterProfile.savedPrizes.map((prize) => (
              <div
                key={prize.id}
                className="bg-[#121215] border border-zinc-800 hover:border-amber-700/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                      {prize.category} • {prize.bpm} BPM
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {prize.unlockedAt}
                    </span>
                  </div>

                  <h4 className="text-sm font-mono font-bold text-zinc-100">
                    {prize.title}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {prize.explanation}
                  </p>

                  <div className="bg-black/60 border border-zinc-800 rounded-lg p-2.5 font-mono text-[10px] text-amber-200 overflow-x-auto whitespace-pre">
                    {prize.tabText}
                  </div>
                </div>

                <button
                  onClick={() => {
                    generateRewardLickPdf(prize, hunterProfile);
                    soundEngine.playSuccess();
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.01]"
                >
                  <Download className="w-4 h-4" />
                  SCARICA LICK PREMIO IN PDF
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#141418] border border-dashed border-zinc-800 rounded-2xl p-8 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-zinc-600 mx-auto" />
            <h4 className="text-sm font-mono font-bold text-zinc-300">
              Nessun Lick Premio ancora riscattato
            </h4>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Completa i quiz nei moduli di Teoria o sconfiggi i Boss per generare e collezionare i tuoi Lick d'Élite in PDF!
            </p>
          </div>
        )}
      </div>

      {/* SECTION 3: BACKUP, EXPORT & DATA RESTORE */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-md">
        <div className="flex items-center gap-2.5 border-b border-zinc-800/80 pb-4">
          <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-mono font-bold text-zinc-100">
              Gestione Dati & Backup Profilo
            </h3>
            <p className="text-xs text-zinc-400">
              I tuoi progressi sono memorizzati nel browser. Puoi esportare un file JSON di backup per trasferirli su un altro computer o dispositivo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Export JSON Button */}
          <button
            onClick={handleExportData}
            className="p-4 rounded-xl bg-[#141418] hover:bg-zinc-800 border border-zinc-700 text-left space-y-2 transition-all group"
          >
            <Download className="w-5 h-5 text-zinc-300 group-hover:text-red-400" />
            <div>
              <div className="text-xs font-mono font-bold text-zinc-200">
                Esporta Backup Dati
              </div>
              <div className="text-[10px] text-zinc-500">
                Scarica un file .json con tutti i log, XP, PR e routine.
              </div>
            </div>
          </button>

          {/* Import JSON Button */}
          <label className="p-4 rounded-xl bg-[#141418] hover:bg-zinc-800 border border-zinc-700 text-left space-y-2 transition-all cursor-pointer group">
            <Upload className="w-5 h-5 text-zinc-300 group-hover:text-emerald-400" />
            <div>
              <div className="text-xs font-mono font-bold text-zinc-200">
                Importa Backup Dati
              </div>
              <div className="text-[10px] text-zinc-500">
                Carica un file .json salvato in precedenza.
              </div>
            </div>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          {/* Reset Data Button */}
          <button
            onClick={handleResetData}
            className="p-4 rounded-xl bg-[#180e0e] hover:bg-red-950/40 border border-red-900/60 text-left space-y-2 transition-all group"
          >
            <Trash2 className="w-5 h-5 text-red-500 group-hover:text-red-400" />
            <div>
              <div className="text-xs font-mono font-bold text-red-300">
                Ripristina Profilo
              </div>
              <div className="text-[10px] text-zinc-500">
                Azzera i dati locali e riparti dal Livello 1.
              </div>
            </div>
          </button>
        </div>

        {importStatus && (
          <div className="text-xs font-mono text-zinc-300 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            {importStatus}
          </div>
        )}
      </div>
    </div>
  );
};
