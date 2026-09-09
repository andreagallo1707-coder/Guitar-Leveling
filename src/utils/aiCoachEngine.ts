import { ApiSettings, DifficultyRank, LickPrize, TheoryModule, TheoryQuizQuestion, GraphicTabSystem, GraphicTabNote } from '../types';
import { theoryQuizzesByModuleId } from '../data/theoryQuizzes';
import { exercisesData } from '../data/exercisesData';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `REGOLA LINGUA ASSOLUTA:
Devi comunicare e rispondere TASSATIVAMENTE ed ESCLUSIVAMENTE in lingua ITALIANA.
È severamente vietato rispondere in inglese o in qualsiasi altra lingua diversa dall'italiano.

Sei l'assistente ufficiale e Coach di Guitar Leveling, un'accademia avanzata per chitarristi moderni.
La tua missione è guidare il chitarrista a migliorare tecnica, velocità, pulizia, timing, espressività e comprensione profonda della teoria musicale.

DIRETTIVA RIGIDA DI SISTEMA:
- Rispondi ESCLUSIVAMENTE a temi riguardanti:
  1. Chitarra elettrica ed acustica, ergonomia, impostazione delle mani, tocco e coordinazione.
  2. Tecniche chitarristiche (Alternate picking, Sweep picking, Legato & Hammer/Pull, Tapping, Bending, Vibrato & Harmonics, Downpicking, Palm Muting, Economy picking, String Skipping, Hybrid picking).
  3. Teoria musicale applicata alla chitarra (intervalli, triadi, arpeggi, scale pentatoniche, scale blues, scale maggiori e minori, modi gregoriani, armonia rock/metal, progressioni accordali, cadenze, ear training).
  4. Analisi, tablature, BPM di studio, consigli di pratica per gli esercizi e i Boss Fight di Guitar Leveling.
- Se l'utente ti pone domande non pertinenti (es. cucina, politica, programmazione generale, finanza), RIFIUTA cortesemente e fermamente, ricordando che sei esclusivamente il suo Guitar Coach.
- Usa uno stile incoraggiante, rigoroso, chiaro e pratico (stile maestro di chitarra rock/metal/fusion).
- Quando utile, inserisci spiegazioni sulla tastiera e diteggiature.
- LINEE GUIDA DI SCRITTURA E FORMATTAZIONE:
  1. Scrivi SEMPRE in italiano naturale, chiaro e professionale.
  2. Usa il grassetto con parsimonia solo per i concetti chiave, note, accordi o punti focali (es. **Diteggiatura:**). Non disseminare asterischi ovunque e non mettere in grassetto intere frasi.
  3. Per gli elenchi usa trattini ordinati (-) o numerazione (1., 2.), mai simboli strani o asterischi sfusi.`;

/**
 * Normalizes any user-provided Base URL into an OpenAI-compatible /chat/completions endpoint.
 * Supports OpenRouter, OmniRoute, Localhost (LM Studio, Ollama), Groq, DeepSeek, OpenAI, etc.
 */
export function buildChatEndpoint(rawBaseUrl?: string): string {
  let url = (rawBaseUrl || 'https://openrouter.ai').trim();
  url = url.replace(/\/+$/, ''); // remove trailing slashes

  // If the user already wrote the full completions path:
  if (url.endsWith('/chat/completions')) {
    return url;
  }

  // OpenRouter handling
  if (url.includes('openrouter.ai')) {
    if (url.endsWith('/api/v1')) return `${url}/chat/completions`;
    if (url.endsWith('/v1')) return `${url}/chat/completions`;
    return `${url}/api/v1/chat/completions`;
  }

  // If already ends with /v1
  if (url.endsWith('/v1')) {
    return `${url}/chat/completions`;
  }

  // If it already contains /v1/ inside
  if (url.includes('/v1/')) {
    return `${url}/chat/completions`;
  }

  // Standard fallback
  return `${url}/v1/chat/completions`;
}

/**
 * Universally calls any OpenAI-compatible AI provider (OpenRouter, OmniRoute, DeepSeek, Groq, local proxy, etc.)
 */
export async function callAiModel(
  messages: ChatMessage[],
  apiSettings: ApiSettings,
  customSystemPrompt?: string
): Promise<string> {
  const { baseUrl = 'https://openrouter.ai', apiKey, model, temperature = 0.7 } = apiSettings;

  // If no API key is provided, return intelligent offline coaching
  if (!apiKey || apiKey.trim() === '') {
    const lastUserMsg = messages.filter((m) => m.role === 'user').pop()?.content || '';
    if (customSystemPrompt && customSystemPrompt.includes('The Forge')) {
      return getOfflineForgeRoutineResponse(lastUserMsg);
    }
    return getOfflineCoachResponse(lastUserMsg);
  }

  const endpoint = buildChatEndpoint(baseUrl);
  const targetModel = model && model.trim() !== '' ? model.trim() : 'auto/best-free';

  const payloadMessages = [
    { role: 'system', content: customSystemPrompt || SYSTEM_PROMPT },
    ...messages.map((m) => ({ role: m.role, content: m.content }))
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey.trim()}`,
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://guitarleveling.app',
      'X-Title': 'Guitar Leveling'
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: targetModel,
        messages: payloadMessages,
        temperature
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      let errDetail = errText;
      try {
        const parsed = JSON.parse(errText);
        errDetail = parsed?.error?.message || parsed?.message || errText;
      } catch {
        // use raw text
      }
      throw new Error(`HTTP ${res.status} da ${endpoint}: ${errDetail || res.statusText}`);
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error('Risposta vuota ricevuta dal modello.');
    }
    return reply;
  } catch (error: any) {
    console.warn('AI call failed:', error);
    const lastUserMsg = messages.filter((m) => m.role === 'user').pop()?.content || '';
    const offlineBackup = getOfflineCoachResponse(lastUserMsg);

    const isAbort = error?.name === 'AbortError';
    const errMessage = isAbort
      ? 'Timeout della richiesta (il server ha impiegato oltre 25 secondi).'
      : error?.message || 'Errore di connessione con il provider IA.';

    return `⚠️ **[Nota del Sistema: ${errMessage}]**\n*Verifica Base URL, Model ID e Chiave API in Impostazioni.*\n\n${offlineBackup}`;
  }
}

/**
 * Streams tokens in real-time from any OpenAI-compatible provider (OpenRouter, Groq, NVIDIA Nemotron, etc.)
 * using Server-Sent Events (SSE) and ReadableStream.
 * Handles network fragmentation, keeps SSE buffer stable, and delivers fluid token delivery.
 */
export async function callAiModelStream(
  messages: ChatMessage[],
  apiSettings: ApiSettings,
  onChunk: (accumulatedText: string, delta: string) => void,
  signal?: AbortSignal,
  customSystemPrompt?: string,
  sourceMode: ExerciseSourceMode = 'catalog_only'
): Promise<string> {
  const { baseUrl = 'https://openrouter.ai', apiKey, model, temperature = 0.7 } = apiSettings;

  // If no API key is configured, fallback to offline coach
  if (!apiKey || apiKey.trim() === '') {
    const lastUserMsg = messages.filter((m) => m.role === 'user').pop()?.content || '';
    const offlineBackup = customSystemPrompt && customSystemPrompt.includes('The Forge')
      ? getOfflineForgeRoutineResponse(lastUserMsg, sourceMode)
      : getOfflineCoachResponse(lastUserMsg);
    onChunk(offlineBackup, offlineBackup);
    return offlineBackup;
  }

  const endpoint = buildChatEndpoint(baseUrl);
  const targetModel = model && model.trim() !== '' ? model.trim() : 'auto/best-free';

  const payloadMessages = [
    { role: 'system', content: customSystemPrompt || SYSTEM_PROMPT },
    ...messages.map((m) => ({ role: m.role, content: m.content }))
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for stream

    if (signal) {
      signal.addEventListener('abort', () => controller.abort());
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      Authorization: `Bearer ${apiKey.trim()}`,
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://guitarleveling.app',
      'X-Title': 'Guitar Leveling'
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: targetModel,
        messages: payloadMessages,
        temperature,
        stream: true
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      let errDetail = errText;
      try {
        const parsed = JSON.parse(errText);
        errDetail = parsed?.error?.message || parsed?.message || errText;
      } catch {
        // use raw text
      }
      throw new Error(`HTTP ${res.status} da ${endpoint}: ${errDetail || res.statusText}`);
    }

    // If body stream reader is not supported on this response, fallback to standard JSON
    if (!res.body) {
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || '';
      onChunk(reply, reply);
      return reply;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let accumulatedText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep partial line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;
        if (trimmed === 'data: [DONE]') continue;

        if (trimmed.startsWith('data: ')) {
          const jsonStr = trimmed.slice(6).trim();
          if (!jsonStr) continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (typeof delta === 'string' && delta.length > 0) {
              accumulatedText += delta;
              onChunk(accumulatedText, delta);
            }
          } catch {
            // Wait for more chunks to complete the JSON payload
          }
        }
      }
    }

    // Flush leftover buffer if any
    if (buffer.trim()) {
      const trimmed = buffer.trim();
      if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
        try {
          const parsed = JSON.parse(trimmed.slice(6).trim());
          const delta = parsed?.choices?.[0]?.delta?.content;
          if (typeof delta === 'string' && delta.length > 0) {
            accumulatedText += delta;
            onChunk(accumulatedText, delta);
          }
        } catch {
          // ignore
        }
      }
    }

    if (!accumulatedText.trim()) {
      throw new Error('Risposta vuota ricevuta durante lo streaming dal modello.');
    }

    return accumulatedText;
  } catch (error: any) {
    console.warn('AI stream failed:', error);
    const lastUserMsg = messages.filter((m) => m.role === 'user').pop()?.content || '';
    const offlineBackup = customSystemPrompt && customSystemPrompt.includes('The Forge')
      ? getOfflineForgeRoutineResponse(lastUserMsg, sourceMode)
      : getOfflineCoachResponse(lastUserMsg);

    const isAbort = error?.name === 'AbortError';
    const errMessage = isAbort
      ? 'Timeout della richiesta di streaming.'
      : error?.message || 'Errore di connessione con il provider IA.';

    const fallbackMsg = `⚠️ **[Nota del Sistema: ${errMessage}]**\n*Verifica Base URL, Model ID e Chiave API in Impostazioni.*\n\n${offlineBackup}`;
    onChunk(fallbackMsg, fallbackMsg);
    return fallbackMsg;
  }
}

export type ExerciseSourceMode = 'catalog_only';

// Structured summary of all 67 official exercises currently active in Guitar Leveling
const CATALOG_EXERCISES_SUMMARY = exercisesData
  .map(
    (e) =>
      `- ID: "${e.id}" | Titolo: "${e.title}" | Categoria: "${e.category}" | Rank: ${e.difficultyRank} | BPM Target: ${e.targetBpm}`
  )
  .join('\n');

export function getForgeRoutineSystemPrompt(_sourceMode: ExerciseSourceMode = 'catalog_only'): string {
  return `REGOLA SUPREMA ED INDEROGABILE:
1. COMUNICA TASSATIVAMENTE ED ESCLUSIVAMENTE IN LINGUA ITALIANA.
   È severamente vietato scrivere in inglese o in qualunque altra lingua straniera.
2. SEI IL MASTER GUITAR COACH & ROUTINE ARCHITECT DI "THE FORGE" PER L'APP GUITAR LEVELING.
   Il tuo compito specifico è formulare schede di allenamento pratiche, bilanciate ed energiche per il chitarrista.

FONTE RIGIDA ED ESCLUSIVA DEGLI ESERCIZI:
Devi selezionare gli esercizi TASSATIVAMENTE ED ESCLUSIVAMENTE dalla seguente lista ufficiale dei 67 esercizi attualmente attivi nel catalogo di Guitar Leveling (o da eventuali esercizi personali allegati dall'utente nel messaggio).
È TASSATIVAMENTE VIETATO:
- Proporre video o esercizi da YouTube o da Internet.
- Inventare titoli di esercizi non presenti nel catalogo.
- Creare schede con nomi fittizi.

LISTA UFFICIALE DEI 67 ESERCIZI DEL CATALOGO DELL'APP:
${CATALOG_EXERCISES_SUMMARY}

DIRETTIVE DI RISPOSTA E GENERAZIONE DELLA SCHEDA:
1. Brevità e lingua: Scrivi prima un commento tecnico conciso in italiano (massimo 2-3 frasi) spiegando la logica della sequenza e il focus biomeccanico (es. riscaldamento -> sincronizzazione -> velocità -> resistenza).
2. REGOLA TECNICA OBBLIGATORIA SUL BLOCCO SCHEDA:
   Alla fine del tuo messaggio, DEVI SEMPRE GENERARE IL BLOCCO \`\`\`forge-routine ... \`\`\` contenente il JSON della scheda.
   ATTENZIONE: NON limitarti MAI a scrivere un elenco a punti! Senza il blocco \`\`\`forge-routine con il JSON valido, l'interfaccia dell'app non può visualizzare la scheda grafica interattiva e il pulsante per salvarla in The Forge.
3. Se l'utente ha allegato uno o più esercizi personali, integrali nella sequenza con "isCustom": true.

FORMATO ESATTO DEL BLOCCO OBBLIGATORIO:
\`\`\`forge-routine
{
  "routineName": "Nome Chiaro ed Evocativo della Scheda in Italiano",
  "description": "Descrizione sintetica degli obiettivi e del focus biomeccanico in italiano",
  "estimatedMinutes": 25,
  "targetRank": "C-Rank",
  "source": "catalog_only",
  "exercises": [
    {
      "title": "Titolo Esatto da Catalogo",
      "category": "Alternate Picking",
      "difficultyRank": "C-Rank",
      "targetBpm": 120,
      "isCustom": false,
      "existingId": "id-esatto-dal-catalogo",
      "notes": "Consiglio tecnico sintetico su plettrata, rilassamento o timing"
    }
  ]
}
\`\`\`
Grazie a questo blocco, l'app mostra automaticamente la scheda grafica elegante con il pulsante per confermarla e aggiungerla istantaneamente a The Forge.`;
}

export const FORGE_ROUTINE_SYSTEM_PROMPT = getForgeRoutineSystemPrompt('catalog_only');

export interface ParsedForgeRoutineExercise {
  title: string;
  category: string;
  difficultyRank?: DifficultyRank;
  targetBpm?: number;
  existingId?: string;
  isCustom?: boolean;
  videoUrl?: string;
  notes?: string;
}

export interface ParsedForgeRoutine {
  routineName: string;
  description: string;
  estimatedMinutes: number;
  targetRank: DifficultyRank;
  source?: ExerciseSourceMode;
  exercises: ParsedForgeRoutineExercise[];
}

/**
 * Remove raw JSON code blocks from text so user never sees yellow/raw code strings in chat
 */
export function stripRoutineJsonBlock(text: string): string {
  if (!text) return '';
  return text
    // Strip completed code blocks
    .replace(/```(?:forge-routine|json|routine)?\s*[\s\S]*?```/gi, '')
    // Strip unclosed code block during streaming
    .replace(/```(?:forge-routine|json|routine)?\s*\{?[\s\S]*$/gi, '')
    .trim();
}

/**
 * Robust JSON & Text parser for Forge Workout Routines.
 * If the model formatted JSON: extracts and sanitizes it.
 * If the model wrote text listing exercises: extracts matching exercises from exercisesData as a fallback!
 */
export function parseForgeRoutineBlock(text: string): ParsedForgeRoutine | null {
  if (!text) return null;

  // 1. Try explicit forge-routine, json, or routine code fence
  const fenceMatch = text.match(/```(?:forge-routine|json|routine)?\s*([\s\S]*?)\s*```/i);
  const jsonCandidate = fenceMatch ? fenceMatch[1] : text;

  const firstBrace = jsonCandidate.indexOf('{');
  const lastBrace = jsonCandidate.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace > firstBrace) {
    let rawSlice = jsonCandidate.slice(firstBrace, lastBrace + 1);

    // Sanitize trailing commas before closing braces/brackets
    rawSlice = rawSlice.replace(/,(\s*[}\]])/g, '$1');

    try {
      const parsed = JSON.parse(rawSlice);
      if (parsed.routineName && Array.isArray(parsed.exercises) && parsed.exercises.length > 0) {
        return {
          routineName: String(parsed.routineName),
          description: String(parsed.description || 'Scheda personalizzata creata dal Coach IA.'),
          estimatedMinutes: Number(parsed.estimatedMinutes) || Math.max(15, parsed.exercises.length * 6),
          targetRank: (parsed.targetRank as DifficultyRank) || 'C-Rank',
          source: 'catalog_only',
          exercises: parsed.exercises.map((ex: any) => {
            // Re-match against catalog if existingId is missing
            const matchedEx = exercisesData.find(
              (catEx) =>
                catEx.id === ex.existingId ||
                catEx.title.toLowerCase() === (ex.title || '').toLowerCase()
            );
            return {
              title: ex.title || matchedEx?.title || 'Esercizio Tecnico',
              category: ex.category || matchedEx?.category || 'Alternate Picking',
              difficultyRank: (ex.difficultyRank || matchedEx?.difficultyRank || 'C-Rank') as DifficultyRank,
              targetBpm: Number(ex.targetBpm) || matchedEx?.targetBpm || 100,
              existingId: ex.existingId || matchedEx?.id,
              isCustom: !!ex.isCustom,
              videoUrl: ex.videoUrl || matchedEx?.videoUrl,
              notes: ex.notes || 'Consiglio del Coach Forge'
            };
          })
        };
      }
    } catch {
      // Continue to fallback
    }
  }

  // 2. FALLBACK PARSER: If the AI replied in text listing catalog exercises without code block
  // We scan the text to find any mentions of official exercises
  const matchedExercises: ParsedForgeRoutineExercise[] = [];
  const textLower = text.toLowerCase();

  for (const ex of exercisesData) {
    if (
      textLower.includes(ex.title.toLowerCase()) ||
      textLower.includes(ex.id.toLowerCase())
    ) {
      if (!matchedExercises.some((m) => m.existingId === ex.id)) {
        matchedExercises.push({
          title: ex.title,
          category: ex.category,
          difficultyRank: ex.difficultyRank,
          targetBpm: ex.targetBpm,
          existingId: ex.id,
          isCustom: false,
          videoUrl: ex.videoUrl,
          notes: ex.focusMuscles || 'Esercizio del catalogo ufficiale'
        });
      }
    }
  }

  if (matchedExercises.length >= 2) {
    // Generate a beautiful fallback routine
    return {
      routineName: 'Scheda Personalizzata Coach Forge',
      description: 'Routine strutturata dal Coach IA selezionando gli esercizi ideali dal catalogo ufficiale dell\'app.',
      estimatedMinutes: Math.max(15, matchedExercises.length * 6),
      targetRank: matchedExercises[0]?.difficultyRank || 'C-Rank',
      source: 'catalog_only',
      exercises: matchedExercises
    };
  }

  return null;
}

/**
 * Ask Coach AI specifically for building Forge Workout Routines with streaming
 */
export async function askForgeRoutineCoachStream(
  userPrompt: string,
  history: ChatMessage[],
  apiSettings: ApiSettings,
  onChunk: (accumulatedText: string, delta: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const fullConversation: ChatMessage[] = [
    ...history.slice(-6),
    { role: 'user', content: userPrompt }
  ];
  return await callAiModelStream(
    fullConversation,
    { ...apiSettings, temperature: 0.5 },
    onChunk,
    signal,
    getForgeRoutineSystemPrompt('catalog_only')
  );
}

/**
 * Ask Coach AI for feedback / guitar lessons with streaming
 */
export async function askGuitarCoachStream(
  userPrompt: string,
  history: ChatMessage[],
  apiSettings: ApiSettings,
  onChunk: (accumulatedText: string, delta: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const fullConversation: ChatMessage[] = [
    ...history.slice(-6),
    { role: 'user', content: userPrompt }
  ];
  return await callAiModelStream(fullConversation, apiSettings, onChunk, signal);
}

/**
 * Ask Coach AI for feedback / guitar lessons (non-streaming fallback)
 */
export async function askGuitarCoach(
  userPrompt: string,
  history: ChatMessage[],
  apiSettings: ApiSettings
): Promise<string> {
  const fullConversation: ChatMessage[] = [
    ...history.slice(-6),
    { role: 'user', content: userPrompt }
  ];
  return await callAiModel(fullConversation, apiSettings);
}

/**
 * Check if the AI provider has a valid API key configured
 */
export function isAiConfigured(apiSettings?: ApiSettings | null): boolean {
  if (!apiSettings) return false;
  return Boolean(apiSettings.apiKey && apiSettings.apiKey.trim().length > 0);
}

/**
 * Randomize options of a quiz question using Fisher-Yates shuffle
 * so the correct answer is never predictably A, but uniformly distributed among A, B, C, D.
 */
export function shuffleQuizOptions(quiz: TheoryQuizQuestion): TheoryQuizQuestion {
  const correctOptionText = quiz.options[quiz.correctIndex];
  const shuffled = [...quiz.options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const newIndex = shuffled.indexOf(correctOptionText);
  return {
    ...quiz,
    options: shuffled,
    correctIndex: newIndex >= 0 ? newIndex : 0
  };
}

/**
 * Determine recommended tablature systems count (1, 2, 3, or 4 lines of 4 measures each)
 * based on level or rank so beginner levels have compact, accessible scores.
 */
export function getRecommendedSystemsCount(rankOrLevel: DifficultyRank | number): number {
  if (typeof rankOrLevel === 'number') {
    if (rankOrLevel <= 1) return 1; // Level 1: 1 rigo (4 battute)
    if (rankOrLevel === 2) return 2; // Level 2: 2 righi (8 battute)
    if (rankOrLevel === 3) return 2; // Level 3: 2 righi (8 battute)
    if (rankOrLevel === 4) return 3; // Level 4: 3 righi (12 battute)
    return 4; // Level 5-6: 4 righi (16 battute)
  }
  switch (rankOrLevel) {
    case 'E-Rank':
      return 1; // 1 rigo (4 battute), perfetto per iniziare
    case 'D-Rank':
      return 2; // 2 righi (8 battute)
    case 'C-Rank':
      return 2; // 2 righi (8 battute)
    case 'B-Rank':
      return 3; // 3 righi (12 battute)
    case 'A-Rank':
      return 4; // 4 righi (16 battute)
    case 'S-Rank':
      return 4; // 4 righi (16 battute)
    default:
      return 2;
  }
}

/**
 * Generate customized AI explanation for a Theory Quiz mistake with real-time streaming
 */
export async function explainQuizMistakeStream(
  moduleTitle: string,
  question: string,
  wrongAnswer: string,
  correctAnswer: string,
  apiSettings: ApiSettings,
  onChunk: (accumulatedText: string, delta: string) => void,
  signal?: AbortSignal
): Promise<string> {
  if (!isAiConfigured(apiSettings)) {
    const msg = '⚠️ **[Configurazione IA Mancante]**\nInserisci la tua API Key nelle Impostazioni (icona ingranaggio) per ricevere spiegazioni personalizzate dal Coach IA.';
    onChunk(msg, msg);
    return msg;
  }

  const prompt = `Il chitarrista sta studiando il modulo di teoria "${moduleTitle}".
Ha risposto alla domanda del quiz:
"${question}"

Ha selezionato erroneamente l'opzione: "${wrongAnswer}".
La risposta corretta è invece: "${correctAnswer}".

Come Coach di Guitar Leveling:
1. Spiega in modo chiaro e sintetico (max 3-4 paragrafi) PERCHÉ la sua risposta è errata e PERCHÉ quella corretta è vera con riferimento al modulo "${moduleTitle}".
2. Fornisci un trucco mentale pratico o una regola della tastiera per non dimenticarlo più.
3. Concludi con una frase motivante.`;

  return await callAiModelStream([{ role: 'user', content: prompt }], apiSettings, onChunk, signal);
}

/**
 * Generate customized AI explanation for a Theory Quiz mistake (non-streaming fallback)
 */
export async function explainQuizMistake(
  moduleTitle: string,
  question: string,
  wrongAnswer: string,
  correctAnswer: string,
  apiSettings: ApiSettings
): Promise<string> {
  if (!isAiConfigured(apiSettings)) {
    return '⚠️ **[Configurazione IA Mancante]**\nInserisci la tua API Key nelle Impostazioni (icona ingranaggio) per ricevere spiegazioni personalizzate dal Coach IA.';
  }

  const prompt = `Il chitarrista sta studiando il modulo di teoria "${moduleTitle}".
Ha risposto alla domanda del quiz:
"${question}"

Ha selezionato erroneamente l'opzione: "${wrongAnswer}".
La risposta corretta è invece: "${correctAnswer}".

Come Coach di Guitar Leveling:
1. Spiega in modo chiaro e sintetico (max 3-4 paragrafi) PERCHÉ la sua risposta è errata e PERCHÉ quella corretta è vera con riferimento al modulo "${moduleTitle}".
2. Fornisci un trucco mentale pratico o una regola della tastiera per non dimenticarlo più.
3. Concludi con una frase motivante.`;

  return await callAiModel([{ role: 'user', content: prompt }], apiSettings);
}

/**
 * NotebookLM-style dynamic test generator for Theory Modules.
 * Calls the selected AI model to create 5 custom multiple-choice questions strictly focused on the lesson text.
 */
export async function generateTheoryQuizWithAi(
  module: TheoryModule,
  apiSettings: ApiSettings,
  refreshSeed?: number
): Promise<TheoryQuizQuestion[]> {
  if (!isAiConfigured(apiSettings)) {
    throw new Error(
      'CONFIG_REQUIRED: Configurazione IA non rilevata. Inserisci Base URL, Model ID e API Key nelle Impostazioni per generare e rigenerare test con l\'IA.'
    );
  }

  const formulaInfo = module.fretboardFormula
    ? `RIFERIMENTI TASTIERA & FORMULE DELLA LEZIONE:
- Nome Scala/Accordo: ${module.fretboardFormula.scaleOrChordName}
- Nota Tonica: ${module.fretboardFormula.rootNote}
- Formula Intervalli: ${module.fretboardFormula.intervals.join(', ')}
- Mappatura Note/Tasti: ${module.fretboardFormula.notesOnFretboard.map((n) => `Corda ${n.string} Tasto ${n.fret} = ${n.label}`).join('; ')}`
    : '';

  const prompt = `Sei un severo e rigoroso professore universitario di chitarra rock/metal e teoria applicata.
Il tuo compito è creare un test di verifica a risposta multipla su misura in stile NotebookLM (5 domande formative, stimolanti e non banali) basato ESCLUSIVAMENTE E RIGIDAMENTE sui contenuti didattici di QUESTO modulo:

========================================
MODULO DIDATTICO DA VERIFICARE:
TITOLO: ${module.title}
CATEGORIA: ${module.category} (Livello ${module.level})
SINTESI: ${module.shortSummary}

PUNTI CHIAVE INDISPENSABILI:
${module.keyTakeaways.map((k, i) => `${i + 1}. ${k}`).join('\n')}

${formulaInfo}

TESTO COMPLETO DELLA LEZIONE:
${module.fullContent}
========================================

DIRETTIVE RIGIDISSIME DI PERTINENZA (Zero tolleranza per domande fuori tema):
1. OGNI SINGOLA DOMANDA deve vertere UNICAMENTE sulle note, sui tasti, sulle regole degli intervalli, sulle tecniche di muting o sulle ragioni acustiche specificate nel testo di QUESTA lezione ("${module.title}").
2. È SEVERAMENTE VIETATO fare domande generiche o introdurre concetti spiegati in altri moduli (es. se la lezione è sui Power Chords, NON fare domande sui modi gregoriani o sweep picking; se la lezione è sull'accordatura, non fare domande su scale jazz o cadenze armoniche).
3. VARIETÀ E DISTINZIONE (Refresh ID: ${refreshSeed || Date.now()}): Formula 5 domande originali che mettano alla prova la comprensione attiva, variando gli aspetti esaminati (diteggiatura, formule, errori comuni da evitare citati nel testo).
4. DISTRIBUZIONE CASUALE DELLA RISPOSTA ESATTA: La risposta esatta NON deve essere sempre nella prima posizione! Distribuisci l'indice corretto in modo equilibrato tra 0, 1, 2 e 3 (corrispondenti a A, B, C, D).
5. Fornisci per ciascuna domanda esattamente 4 opzioni di risposta plausibili e pertinenti ("options"), l'indice corretto ("correctIndex", numero intero da 0 a 3) e una spiegazione chiarissima ("explanation") che citi il passaggio del modulo.

Rispondi ESCLUSIVAMENTE con un array JSON valido (senza markdown di contorno, senza commenti prima o dopo):
[
  {
    "id": "q1",
    "question": "Testo chiaro della domanda focalizzato su questo modulo...",
    "options": ["Opzione A", "Opzione B", "Opzione C", "Opzione D"],
    "correctIndex": 2,
    "explanation": "Spiegazione approfondita del perché questa risposta è esatta secondo la lezione."
  }
]`;

  const raw = await callAiModel([{ role: 'user', content: prompt }], apiSettings);
  const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();

  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error('Risposta dell\'IA non conforme al formato JSON. Clicca su "Rigenera Test IA" per riprovare.');
  }

  if (Array.isArray(parsed) && parsed.length >= 1) {
    let questions: TheoryQuizQuestion[] = parsed.slice(0, 5).map((item: any, idx: number) => ({
      id: `ai-q-${module.id}-${idx + 1}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      question: item.question || `Domanda di verifica ${idx + 1}`,
      options:
        Array.isArray(item.options) && item.options.length === 4
          ? item.options
          : ['Opzione 1', 'Opzione 2', 'Opzione 3', 'Opzione 4'],
      correctIndex:
        typeof item.correctIndex === 'number' && item.correctIndex >= 0 && item.correctIndex <= 3
          ? item.correctIndex
          : 0,
      explanation: item.explanation || 'Risposta esatta secondo la teoria musicale applicata alla chitarra.'
    }));

    // Guarantee AT LEAST 4 questions by supplementing from curated bank if needed
    if (questions.length < 4) {
      const fallbackBank = theoryQuizzesByModuleId[module.id] || [];
      for (const fallbackQ of fallbackBank) {
        if (questions.length >= 4) break;
        if (!questions.some((q) => q.question.toLowerCase() === fallbackQ.question.toLowerCase())) {
          questions.push({
            ...fallbackQ,
            id: `ai-q-supplement-${module.id}-${questions.length + 1}-${Date.now()}`
          });
        }
      }
    }

    // Programmatically shuffle all options so correct answer position is truly random
    return questions.slice(0, 5).map(shuffleQuizOptions);
  }

  throw new Error('L\'IA ha restituito un numero insufficiente di domande valide. Riprova la generazione.');
}

/**
 * Generate a complete, professional, vector lick/solo prize.
 * The number of systems (1, 2, 3, or 4 lines of 4 measures each) is calibrated
 * to the rank or module level so beginner exercises are compact and accessible!
 */
export async function generateLickPrize(
  achievementTitle: string,
  category: string,
  rank: DifficultyRank,
  bpmAchieved: number,
  apiSettings: ApiSettings,
  keyHint?: string,
  customSystemsCount?: number
): Promise<LickPrize> {
  const chosenKey =
    keyHint ||
    (category.includes('Blues')
      ? 'Mi Blues (E Blues)'
      : category.includes('Dorico')
      ? 'Re Dorico (D Dorian)'
      : 'La Minore (Am)');

  const systemsCount = customSystemsCount || getRecommendedSystemsCount(rank);
  const totalMeasures = systemsCount * 4;

  // Build the vector systems (1, 2, 3, or 4 systems x 4 measures)
  const graphicSystems = buildProfessionalGraphicSystems(category, rank, chosenKey, systemsCount);

  const fallbackPrize: LickPrize = {
    id: `lick-${Date.now()}`,
    title: `Assolo d'Élite: ${achievementTitle}`,
    category: category || 'Tecnica & Teoria',
    bpm: bpmAchieved,
    level: rank === 'S-Rank' ? 5 : rank === 'A-Rank' ? 4 : rank === 'B-Rank' ? 3 : 2,
    rank,
    key: chosenKey,
    tuning: 'Standard E (E A D G B E)',
    tabText: '', // Professional vector tab is rendered via graphicSystems!
    graphicSystems,
    explanation: `Fraseggio musicale articolato su ${systemsCount} ${
      systemsCount === 1 ? 'sistema' : 'sistemi'
    } (${totalMeasures} battute a larghezza piena) proporzionato al livello per consolidare l'argomento "${achievementTitle}". Esegui ogni battuta curando la dinamica, l'intonazione del bending e la precisione del timing a ${bpmAchieved} BPM.`,
    unlockedAt: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }),
    source: 'custom'
  };

  if (!isAiConfigured(apiSettings)) {
    return fallbackPrize;
  }

  try {
    const prompt = `Crea un Assolo / Lick Premio esclusivo per un chitarrista che ha conquistato il traguardo "${achievementTitle}" (Rank: ${rank}, BPM: ${bpmAchieved}, Argomento: ${category}).
La partitura si sviluppa su ${systemsCount} ${systemsCount === 1 ? 'sistema' : 'sistemi'} (${totalMeasures} battute).

Rispondi ESCLUSIVAMENTE con un oggetto JSON valido (senza markdown extra):
{
  "title": "Titolo suggestivo e maestoso dell'Assolo",
  "key": "Tonalità (es. La Minore / Am o Mi Dorico)",
  "explanation": "Spiegazione approfondita del fraseggio musicale (${totalMeasures} battute) e consigli pratici per eseguirlo a ${bpmAchieved} BPM"
}`;

    const raw = await callAiModel([{ role: 'user', content: prompt }], apiSettings);
    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      ...fallbackPrize,
      title: parsed.title || fallbackPrize.title,
      key: parsed.key || fallbackPrize.key,
      explanation: parsed.explanation || fallbackPrize.explanation
    };
  } catch {
    return fallbackPrize;
  }
}

/**
 * Builds custom systems (lines) with 4 measures each
 * filled with authentic, musical guitar notes tailored to the category & rank.
 * Number of systems (1 to 4) adapts directly to the module/exercise level.
 */
export function buildProfessionalGraphicSystems(
  category: string,
  rank: DifficultyRank,
  key: string,
  customSystemsCount?: number
): GraphicTabSystem[] {
  const isHeavy = category.toLowerCase().includes('metal') || category.toLowerCase().includes('drop');
  const isSweep = category.toLowerCase().includes('sweep');
  const isLegato = category.toLowerCase().includes('legato') || category.toLowerCase().includes('tapping');

  const count = customSystemsCount || getRecommendedSystemsCount(rank);
  const systems: GraphicTabSystem[] = [];
  let measureCount = 1;

  for (let s = 0; s < count; s++) {
    const measures = [];
    for (let m = 0; m < 4; m++) {
      const notes: GraphicTabNote[] = [];

      if (isSweep) {
        // Arpeggio sweep patterns across strings 1 to 5
        notes.push({ string: 5, fret: 12, timePosition: 0 });
        notes.push({ string: 4, fret: 14, timePosition: 1 });
        notes.push({ string: 3, fret: 14, timePosition: 2 });
        notes.push({ string: 2, fret: 13, timePosition: 3 });
        notes.push({ string: 1, fret: 12, timePosition: 4, technique: 'p' });
        notes.push({ string: 1, fret: 17, timePosition: 5 });
        notes.push({ string: 2, fret: 13, timePosition: 6 });
        notes.push({ string: 3, fret: 14, timePosition: 7 });
      } else if (isHeavy) {
        // Heavy rock / metal riffs with palm mute & power chords
        notes.push({ string: 6, fret: 0, timePosition: 0, technique: 'pm' });
        notes.push({ string: 6, fret: 0, timePosition: 1, technique: 'pm' });
        notes.push({ string: 5, fret: 7, timePosition: 2 });
        notes.push({ string: 6, fret: 0, timePosition: 3, technique: 'pm' });
        notes.push({ string: 5, fret: 8, timePosition: 4 });
        notes.push({ string: 5, fret: 7, timePosition: 5, technique: '~' });
        notes.push({ string: 6, fret: 0, timePosition: 6, technique: 'pm' });
        notes.push({ string: 6, fret: 3, timePosition: 7, technique: 'b' });
      } else if (isLegato) {
        // Fluid legato runs & hammer/pull
        const baseFret = 12 + ((s * 2 + m) % 4);
        notes.push({ string: 1, fret: baseFret, timePosition: 0, technique: 'h' });
        notes.push({ string: 1, fret: baseFret + 2, timePosition: 1, technique: 'p' });
        notes.push({ string: 1, fret: baseFret, timePosition: 2 });
        notes.push({ string: 2, fret: baseFret + 3, timePosition: 3, technique: 'p' });
        notes.push({ string: 2, fret: baseFret, timePosition: 4 });
        notes.push({ string: 3, fret: baseFret + 2, timePosition: 5, technique: '~' });
      } else {
        // Expressive Pentatonic / Dorian / Major lead soloing with bends & vibrato
        const offset = (s * 4 + m) % 5;
        if (m === 3) {
          // Sustained climax note with bend & vibrato at the end of the line
          notes.push({ string: 2, fret: 15, timePosition: 0, technique: 'b' });
          notes.push({ string: 1, fret: 12, timePosition: 1 });
          notes.push({ string: 1, fret: 15, timePosition: 2, technique: 'b' });
          notes.push({ string: 1, fret: 15, timePosition: 4, technique: '~' });
        } else {
          notes.push({ string: 3, fret: 12 + offset, timePosition: 0 });
          notes.push({ string: 3, fret: 14 + offset, timePosition: 1, technique: 'h' });
          notes.push({ string: 2, fret: 13 + offset, timePosition: 2 });
          notes.push({ string: 2, fret: 15 + offset, timePosition: 3, technique: 'p' });
          notes.push({ string: 2, fret: 13 + offset, timePosition: 4 });
          notes.push({ string: 1, fret: 12 + offset, timePosition: 5 });
          notes.push({ string: 1, fret: 15 + offset, timePosition: 6, technique: '~' });
        }
      }

      measures.push({
        measureNumber: measureCount++,
        timeSignature: '4/4',
        notes
      });
    }

    systems.push({
      systemIndex: s,
      measures
    });
  }

  return systems;
}

/**
 * Curated high-quality 5-question test for offline or zero-key mode
 */
function getCuratedFallbackQuizzes(module: TheoryModule): TheoryQuizQuestion[] {
  const cat = module.category;
  let questions: TheoryQuizQuestion[] = [];

  if (cat === 'Scale Pentatoniche & Blues') {
    questions = [
      {
        id: 'q1',
        question: 'Qual è la formula intervallare esatta della Scala Pentatonica Minore?',
        options: ['1, b3, 4, 5, b7', '1, 2, 3, 5, 6', '1, b3, b5, 5, b7', '1, 2, b3, 4, 5'],
        correctIndex: 0,
        explanation: 'La pentatonica minore è composta da Fondamentale (1), Terza Minore (b3), Quarta Giusta (4), Quinta Giusta (5) e Settima Minore (b7).'
      },
      {
        id: 'q2',
        question: 'Quale nota viene aggiunta alla pentatonica minore per ottenere la "Scala Blues"?',
        options: ['La Quarta Aumentata / Quinta Diminuita (b5)', 'La Seconda Maggiore (2)', 'La Sesta Maggiore (6)', 'La Terza Maggiore (3)'],
        correctIndex: 0,
        explanation: 'La Blue Note per eccellenza è la b5 (es. Mib nella scala di La blues), che crea la tipica tensione bluesy da risolvere sulla 4 o sulla 5.'
      },
      {
        id: 'q3',
        question: 'Nel celebre "Box 1" della pentatonica di La Minore al 5° tasto, su quale corda si trova la fondamentale al 5° tasto?',
        options: ['Sesta Corda (Mi basso)', 'Quinta Corda (La)', 'Quarta Corda (Re)', 'Seconda Corda (Si)'],
        correctIndex: 0,
        explanation: 'Il 5° tasto della 6ª corda è un LA, la fondamentale del Box 1.'
      },
      {
        id: 'q4',
        question: 'Cosa accade se suoni il Box 1 della pentatonica minore 3 tasti indietro verso il capotasto?',
        options: ['Ottieni la Pentatonica Maggiore della stessa tonalità', 'Cambi tonalità in Re Minore', 'Ottieni una scala diminuita', 'Si trasforma in una scala esatonale'],
        correctIndex: 0,
        explanation: 'Spostandosi indietro di 3 tasti (un tono e mezzo) si accede alla relativa pentatonica maggiore con le stesse identiche note.'
      },
      {
        id: 'q5',
        question: 'Perché i chitarristi blues/rock piegano (bending) spesso la 4ª giusta di mezzo tono?',
        options: ['Per toccare la Blue Note (b5) e poi rilasciarla', 'Perché è un errore di intonazione', 'Per suonare una nota stonata', 'Per accordare la corda'],
        correctIndex: 0,
        explanation: 'Il micro-bending dalla 4 verso la b5 è il marchio di fabbrica del fraseggio espressivo di Clapton, SRV e Hendrix.'
      }
    ];
  } else if (cat === 'Scale Maggiori, Minori & Modi') {
    questions = [
      {
        id: 'q1',
        question: 'Qual è la nota caratteristica che distingue il Modo Dorico dal Modo Eolio (minore naturale)?',
        options: ['La Sesta Maggiore (6)', 'La Sesta Minore (b6)', 'La Terza Maggiore (3)', 'La Quinta Diminuita (b5)'],
        correctIndex: 0,
        explanation: 'Il modo Dorico possiede la 6ª Maggiore (es. SI in Re Dorico), che conferisce il caratteristico sound luminoso/fusion alla sonorità minore.'
      },
      {
        id: 'q2',
        question: 'Su quale grado della scala Maggiore si costruisce il Modo Misolidio?',
        options: ['5° Grado (Dominante)', '2° Grado (Supertonica)', '4° Grado (Sottodominante)', '7° Grado (Sensibile)'],
        correctIndex: 0,
        explanation: 'Il modo Misolidio è il 5° modo della scala maggiore, ideale per accordi di settima dominante (es. G7 in Do maggiore).'
      },
      {
        id: 'q3',
        question: 'Qual è la formula intervallare del Modo Frigio?',
        options: ['1, b2, b3, 4, 5, b6, b7', '1, 2, b3, 4, 5, 6, b7', '1, 2, 3, #4, 5, 6, 7', '1, b2, 3, 4, 5, b6, 7'],
        correctIndex: 0,
        explanation: 'Il Frigio si distingue per la b2 (Seconda Minore), che dona l\'inconfondibile atmosfera spagnoleggiante e metal estremo.'
      },
      {
        id: 'q4',
        question: 'Qual è la nota caratteristica del Modo Lidio rispetto alla scala Maggiore naturale?',
        options: ['La Quarta Aumentata (#4 o Tritono)', 'La Sesta Minore (b6)', 'La Settima Minore (b7)', 'La Seconda Aumentata (#2)'],
        correctIndex: 0,
        explanation: 'La #4 (es. Fa# in Do Lidio) crea la tipica atmosfera sognante e cinematografica usata da Steve Vai e Joe Satriani.'
      },
      {
        id: 'q5',
        question: 'Qual è il modo costruito sul 7° grado della scala maggiore, noto per la sua instabilità e quinta diminuita?',
        options: ['Locrio', 'Eolio', 'Dorico', 'Ionico'],
        correctIndex: 0,
        explanation: 'Il modo Locrio possiede 1, b2, b3, 4, b5, b6, b7 con la b5 che lo rende intrinsecamente diminuito.'
      }
    ];
  } else {
    // Generic theory module fallback
    questions = [
      {
        id: 'q1',
        question: `Qual è il principio fondamentale spiegato nel modulo "${module.title}"?`,
        options: [
          module.keyTakeaways[0] || 'Comprendere gli intervalli e la posizione delle note sulla tastiera',
          'Suonare più velocemente senza badare al metronomo',
          'Evitare di studiare le scale e suonare a caso',
          'Accordare la chitarra un tono sopra lo standard'
        ],
        correctIndex: 0,
        explanation: 'Questo concetto costituisce la base fondamentale per padroneggiare la comprensione armonica e tecnica della chitarra.'
      },
      {
        id: 'q2',
        question: 'Qual è il vantaggio primario di visualizzare gli intervalli rispetto a memorizzare solo le diteggiature?',
        options: [
          'Permette di trasporre qualsiasi accordo o scala istantaneamente in ogni tonalità',
          'Rende le corde più morbide al tocco',
          'Elimina la necessità di cambiare le corde alla chitarra',
          'Serve solo per la chitarra classica'
        ],
        correctIndex: 0,
        explanation: 'Pensare per intervalli (1, b3, 5, b7) rende la mente del chitarrista libera da schemi rigidi su tutta la tastiera.'
      },
      {
        id: 'q3',
        question: 'A cosa corrisponde la distanza di 2 tasti sulla tastiera della chitarra?',
        options: ['Un Tono intero (Seconda Maggiore)', 'Un Semitono (Seconda Minore)', 'Una Terza Minore', 'Un\'ottava'],
        correctIndex: 0,
        explanation: 'Due tasti equivalgono a un tono intero (2 semitoni).'
      },
      {
        id: 'q4',
        question: 'Come deve essere affrontato lo studio dei fraseggi e delle formule teoriche?',
        options: [
          'A velocità moderata con metronomo, scandendo ogni nota con pulizia assoluta',
          'Subito al massimo dei BPM possibili',
          'Senza ascoltare l\'intonazione',
          'Solo a mente senza toccare lo strumento'
        ],
        correctIndex: 0,
        explanation: 'La memoria muscolare e la connessione orecchio-dita si consolidano solo attraverso la pratica lenta e consapevole.'
      },
      {
        id: 'q5',
        question: 'Qual è l\'effetto dell\'allenamento costante di teoria applicata sullo strumento?',
        options: [
          'Migliora improvvisazione, velocità di reazione e capacità di comporre assoli memorabili',
          'Rallenta la velocità delle dita',
          'Crea confusione mentale',
          'Serve solo per superare esami in conservatorio'
        ],
        correctIndex: 0,
        explanation: 'La teoria applicata alla tastiera trasforma il chitarrista da mero esecutore a musicista completo.'
      }
    ];
  }

  return questions.map(shuffleQuizOptions);
}

/**
 * Built-in intelligent fallback for offline or zero-key mode
 */
function getOfflineCoachResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('alternate') || q.includes('plettrata')) {
    return `🎸 **Coach Guitar Leveling - Masterclass Alternate Picking:**

1. **Movimento dal Polso, non dal Gomito:** Il polso deve compiere un micro-movimento rotatorio fluido, simile a girare una chiave in una serratura. Bloccare il gomito evita affaticamenti muscolari e tendiniti.
2. **Angolazione e Profondità del Plettro:** Inclina il plettro di circa 15°-20° rispetto alla corda (edge picking) per farlo scivolare senza impuntarsi. Immergi solo la punta (1-2 mm).
3. **Sincronizzazione Mano Dx / Sx:** Fai l'esercizio a 60 BPM con click sulle semicrome (4 note per battito). La velocità è un sottoprodotto della precisione millimetrica!`;
  }

  if (q.includes('sweep') || q.includes('arpeggi')) {
    return `⚡ **Coach Guitar Leveling - Guida allo Sweep Picking:**

1. **Il Movimento di Plettro Unico:** Non pensare a singole plettrate separate. Il plettro cade per gravità scivolando attraverso le corde (down-sweep) e risale fluido (up-sweep).
2. **Finger Rolling della Sinistra:** Quando attraversi più corde sullo stesso tasto con lo stesso dito (es. tasto 14 su Sol, Si, Cantino), non tenere premuta la sbarra! Fai "rullare" la falange staccando la pressione dalla corda precedente per non sovrapporre le note.
3. **Muting con il Palmo:** Il palmo destro segue a pochi millimetri il plettro per silenziare le corde già suonate.`;
  }

  if (q.includes('dorico') || q.includes('modi') || q.includes('eolio') || q.includes('scala')) {
    return `🎼 **Coach Guitar Leveling - Teoria dei Modi Musicali:**

- **Modo Dorico (ii grado della scala Maggiore):**
  - Formula: **1 - 2 - b3 - 4 - 5 - 6 - b7**
  - Nota Caratteristica: **La 6ª Maggiore!** È quella che toglie il sapore cupo dell'Eolio e dà il tipico sound Santana, Pink Floyd (*Another Brick in the Wall*) e fusion.
- **Modo Eolio (vi grado, Minore Naturale):**
  - Formula: **1 - 2 - b3 - 4 - 5 - b6 - b7**
  - Nota Caratteristica: La **b6 (Sesta Minore)**, che dà la classica drammaticità Metal e Rock ballad (Iron Maiden, Metallica).`;
  }

  if (q.includes('bending') || q.includes('vibrato')) {
    return `🔥 **Coach Guitar Leveling - Bending e Vibrato Perfetti:**

1. **Supporto Multidito:** Non fare mai un bending solo con il 3° dito! Usa il 1° e 2° dito posizionati sui tasti precedenti per spingere insieme.
2. **Rotazione dell'Avambraccio:** La spinta del bending viene dalla rotazione dell'avambraccio e del polso sinistro, non dalla sola forza delle dita.
3. **Controllo dell'Intonazione:** Suona prima la nota target (es. 2 tasti sopra), memorizzane il pitch con l'orecchio, poi fai il bending controllando che arrivi esattamente alla frequenza voluta senza calare.`;
  }

  return `🎸 **Coach Guitar Leveling al tuo servizio!**

Come tuo Guitar Coach, posso aiutarti su:
- Esercizi mirati per superare i blocchi di velocità (Alternate, Sweep, Tapping, Legato)
- Teoria applicata (Scale, Intervalli, Modi, Costruzione Accordi e Assoli)
- Postura, plettrata, palm muting e pulizia dell'esecuzione
- Consigli per battere i Boss di Guitar Leveling!

*(Tip: In **4. Impostazioni** puoi inserire liberamente qualsiasi Base URL, Model ID e Chiave API, es. OpenRouter o OmniRoute, per risposte e test generati in tempo reale).*`;
}

/**
 * Intelligent offline routine proposals for The Forge
 */
export function getOfflineForgeRoutineResponse(
  question: string,
  _sourceMode: ExerciseSourceMode = 'catalog_only'
): string {
  const q = question.toLowerCase();

  // 1. ALTERNATE PICKING & VELOCITÀ / SHRED
  if (q.includes('alternate') || q.includes('plettrata') || q.includes('shred') || q.includes('velocit')) {
    return `⚡ **Coach Forge - Proposta Scheda Alternate Picking & Velocità (Catalogo Ufficiale):**

Ho strutturato per te una sessione ad alta precisione di 25 minuti attinta dal catalogo ufficiale, mirata a sviluppare sincronizzazione bimanuale e superare i blocchi di velocità con il movimento compatto del polso.

1. **Riscaldamento Cromatico Spider**: Preparazione articolare e postura rilassata.
2. **Sincronizzazione & Plettrata Base in Ottavi**: Attacco costante e controllo ritmico metronomico.
3. **Triadi su Corde Adiacenti in Plettrata Continua**: Salto di corda e sincronizzazione.
4. **Shredding & Coordinazione ad Alta Velocità**: Plettrata alternata esplosiva in sedicesimi.

Premi il pulsante qui sotto per confermare e aggiungere questa scheda a The Forge!

\`\`\`forge-routine
{
  "routineName": "Precisione & Velocità Alternate Picking",
  "description": "Routine progressiva dal catalogo ufficiale dell'app focalizzata sul movimento compatto del polso e sulla sincronizzazione bimanuale.",
  "estimatedMinutes": 25,
  "targetRank": "B-Rank",
  "source": "catalog_only",
  "exercises": [
    {
      "title": "Riscaldamento Cromatico Spider",
      "category": "Warm-Up & Finger Independence",
      "difficultyRank": "E-Rank",
      "targetBpm": 80,
      "isCustom": false,
      "existingId": "ex-spider-warmup",
      "notes": "Plettrata alternata rigorosa giù-su e dita vicine ai tasti"
    },
    {
      "title": "Sincronizzazione & Plettrata Base in Ottavi",
      "category": "Alternate Picking",
      "difficultyRank": "E-Rank",
      "targetBpm": 60,
      "isCustom": false,
      "existingId": "ap-01-lethal-finger-drill",
      "notes": "Movimento rilassato del polso senza irrigidire avambraccio"
    },
    {
      "title": "Triadi su Corde Adiacenti in Plettrata Continua",
      "category": "Alternate Picking",
      "difficultyRank": "C-Rank",
      "targetBpm": 110,
      "isCustom": false,
      "existingId": "ap-03-lethal-triad-run",
      "notes": "Attraversamento corda pulito e sincronizzazione millimetrica"
    },
    {
      "title": "Shredding & Coordinazione ad Alta Velocità",
      "category": "Alternate Picking",
      "difficultyRank": "A-Rank",
      "targetBpm": 150,
      "isCustom": false,
      "existingId": "ap-05-lethal-shred-workout",
      "notes": "Massima rilassatezza muscolare anche ad alta velocità"
    }
  ]
}
\`\`\``;
  }

  // 3. SWEEP & ARPEGGI & ECONOMY
  if (q.includes('sweep') || q.includes('arpeggi') || q.includes('economy')) {
    return `⚡ **Coach Forge - Proposta Scheda Sweep Picking & Arpeggi (Catalogo Ufficiale):**

Ho strutturato una sessione mirata di 25 minuti basata sugli esercizi ufficiali del catalogo per perfezionare rake, finger roll e arpeggi a più corde.

1. **Mini-Sweep a 2 Corde & Rake Continuo**: Angolo d'attacco e rake pulito.
2. **Economy Picking Ascendente su Corde Contigue**: Rest-stroke verso le corde inferiori.
3. **Arpeggi a 3 Corde & Finger Roll**: Disgiunzione articolare falangea.
4. **Sweep a 5 Corde: Forme Maggiori & Minori**: Esecuzione estesa con palm mute destro.

\`\`\`forge-routine
{
  "routineName": "Sweep Picking & Arpeggi Masterclass",
  "description": "Routine progressiva dal catalogo ufficiale focalizzata su rake, finger roll e arpeggi estesi a 5 corde.",
  "estimatedMinutes": 25,
  "targetRank": "B-Rank",
  "source": "catalog_only",
  "exercises": [
    {
      "title": "Mini-Sweep a 2 Corde & Rake Continuo",
      "category": "Economy & Sweep Picking",
      "difficultyRank": "E-Rank",
      "targetBpm": 90,
      "isCustom": false,
      "existingId": "sweep-01-brooks-2string-drill",
      "notes": "Imposta l'angolo della plettrata continua e il rake pulito"
    },
    {
      "title": "Economy Picking Ascendente su Corde Contigue",
      "category": "Economy & Sweep Picking",
      "difficultyRank": "D-Rank",
      "targetBpm": 100,
      "isCustom": false,
      "existingId": "economy-01-brooks-ascending",
      "notes": "Attraversamento fluido con rest-stroke verso la corda inferiore"
    },
    {
      "title": "Arpeggi a 3 Corde & Finger Roll",
      "category": "Economy & Sweep Picking",
      "difficultyRank": "C-Rank",
      "targetBpm": 105,
      "isCustom": false,
      "existingId": "ex-sweep-3strings-triad",
      "notes": "Stacco falangea netto senza far suonare le note assieme"
    },
    {
      "title": "Sweep a 5 Corde: Forme Maggiori & Minori",
      "category": "Economy & Sweep Picking",
      "difficultyRank": "B-Rank",
      "targetBpm": 140,
      "isCustom": false,
      "existingId": "ex-sweep-5strings-arpeggios",
      "notes": "Palm mute rigoroso per pulizia assoluta sulla salita e discesa"
    }
  ]
}
\`\`\``;
  }

  // 4. LEGATO & HAMMER/PULL
  if (q.includes('legato') || q.includes('hammer') || q.includes('pull')) {
    return `🔥 **Coach Forge - Proposta Scheda Legato & Articolazione (Catalogo Ufficiale):**

Ecco una routine ad alta intensità per sciogliere la mano sinistra, sviluppare forza indipendente per anulare e mignolo e resistenza continua.

1. **Hammer-On a Due Dita**: Attacco perpendicolare a martelletto.
2. **Hammer-On & Indipendenza Mignolo**: Potenziamento del 4° dito.
3. **Hammer-On su Permutazioni Rapide**: Coordinazione su più corde.
4. **Trilli & Hammer-Pull Continui**: Resistenza continua ad alta velocità.

\`\`\`forge-routine
{
  "routineName": "Legato Fluido & Resistenza Falangi",
  "description": "Routine per sviluppare forza delle dita della mano sinistra, indipendenza di anulare e mignolo ed endurance su hammer-on e pull-off continui.",
  "estimatedMinutes": 25,
  "targetRank": "B-Rank",
  "source": "catalog_only",
  "exercises": [
    {
      "title": "Hammer-On a Due Dita",
      "category": "Legato & Hammer/Pull",
      "difficultyRank": "E-Rank",
      "targetBpm": 50,
      "isCustom": false,
      "existingId": "legato-01-lethal-hammerons-beg1",
      "notes": "Attacco percussivo e preciso a martelletto"
    },
    {
      "title": "Hammer-On & Indipendenza Mignolo",
      "category": "Legato & Hammer/Pull",
      "difficultyRank": "D-Rank",
      "targetBpm": 50,
      "isCustom": false,
      "existingId": "legato-02-lethal-hammerons-beg2",
      "notes": "Forza e precisione dell'articolazione del 4° dito"
    },
    {
      "title": "Hammer-On su Permutazioni Rapide",
      "category": "Legato & Hammer/Pull",
      "difficultyRank": "C-Rank",
      "targetBpm": 100,
      "isCustom": false,
      "existingId": "legato-03-lethal-hammerons-adv1",
      "notes": "Passaggi continui di corda senza cali di volume"
    },
    {
      "title": "Trilli & Hammer-Pull Continui",
      "category": "Legato & Hammer/Pull",
      "difficultyRank": "B-Rank",
      "targetBpm": 135,
      "isCustom": false,
      "existingId": "legato-04-bernth-10min-workout",
      "notes": "Resistenza continua per endurance muscolare pura"
    }
  ]
}
\`\`\``;
  }

  // 5. SCALE, 3NPS & MODI
  if (q.includes('scale') || q.includes('3nps') || q.includes('modi') || q.includes('pentatonic')) {
    return `🎸 **Coach Forge - Proposta Scheda Scale & 3NPS (Catalogo Ufficiale):**

Ho preparato una routine per memorizzare le geometrie scalari a 3 note per corda e sviluppare plettrata continua fluida lungo la tastiera.

1. **Pentatonica Minore Box 1**: Base di riferimento e sincronizzazione.
2. **Scala Maggiore 3NPS Modo Ionico**: Diteggiature simmetriche e plettrata rigorosa.
3. **Scala Modale 3NPS Modo Dorico**: Riconoscimento della 6ª maggiore e fluidità.
4. **Shifting Orizzontale & Endurance Scale**: Movimento orizzontale e cambi di posizione.

\`\`\`forge-routine
{
  "routineName": "Scale, Modi & Geometrie 3NPS",
  "description": "Routine completa di scale pentatoniche e a 3 note per corda con sincronizzazione metronomica e cambi di posizione orizzontali.",
  "estimatedMinutes": 25,
  "targetRank": "B-Rank",
  "source": "catalog_only",
  "exercises": [
    {
      "title": "Pentatonica Minore Box 1",
      "category": "Scale & 3NPS",
      "difficultyRank": "E-Rank",
      "targetBpm": 80,
      "isCustom": false,
      "existingId": "scale-01-lethal-pentatonic-box1",
      "notes": "Controllo dell'accentazione e sincronizzazione mani"
    },
    {
      "title": "Scala Maggiore 3NPS Modo Ionico",
      "category": "Scale & 3NPS",
      "difficultyRank": "C-Rank",
      "targetBpm": 110,
      "isCustom": false,
      "existingId": "scale-03-lethal-3nps-ionian",
      "notes": "Diteggiatura simmetrica 1-2-4 e 1-3-4 con plettrata alternata rigorosa"
    },
    {
      "title": "Scala Modale 3NPS Modo Dorico",
      "category": "Scale & 3NPS",
      "difficultyRank": "B-Rank",
      "targetBpm": 130,
      "isCustom": false,
      "existingId": "scale-04-lethal-3nps-dorian",
      "notes": "Accento sulla sesta maggiore caratteristica del modo dorico"
    },
    {
      "title": "Shifting Orizzontale & Endurance Scale",
      "category": "Scale & 3NPS",
      "difficultyRank": "A-Rank",
      "targetBpm": 150,
      "isCustom": false,
      "existingId": "scale-05-bernth-daily-scale-workout",
      "notes": "Spostamenti rapidi lungo la tastiera con minima tensione"
    }
  ]
}
\`\`\``;
  }

  // 6. WARMUP & INDIPENDENZA
  if (q.includes('warmup') || q.includes('riscaldamento') || q.includes('stretching') || q.includes('dita')) {
    return `🔥 **Coach Forge - Proposta Warm-Up & Indipendenza (Catalogo Ufficiale):**

Ecco un riscaldamento progressivo per preparare tendini e articolazioni e sbloccare l'indipendenza delle dita.

1. **Riscaldamento Cromatico Spider**: Posizionamento perpendicolare delle dita.
2. **Indipendenza Falangi & Legato Continuo**: Postura corretta del polso.
3. **Indipendenza Anulare e Mignolo**: Isolamento del 3° e 4° dito.
4. **Sincronizzazione Coordinata a 4 Dita**: Sincronizzazione metronomica a 4 dita.

\`\`\`forge-routine
{
  "routineName": "Warm-Up & Indipendenza Falangi",
  "description": "Riscaldamento cromatico progressivo e sviluppo dell'indipendenza delle dita della mano sinistra.",
  "estimatedMinutes": 20,
  "targetRank": "D-Rank",
  "source": "catalog_only",
  "exercises": [
    {
      "title": "Riscaldamento Cromatico Spider",
      "category": "Warm-Up & Finger Independence",
      "difficultyRank": "E-Rank",
      "targetBpm": 80,
      "isCustom": false,
      "existingId": "ex-spider-warmup",
      "notes": "Posiziona le dita perpendicolari a martelletto vicino al ferretto"
    },
    {
      "title": "Indipendenza Falangi & Legato Continuo",
      "category": "Warm-Up & Finger Independence",
      "difficultyRank": "D-Rank",
      "targetBpm": 95,
      "isCustom": false,
      "existingId": "wu-02-bernth-10min-warmup",
      "notes": "Evita oscillazioni del polso e mantieni le nocche parallele al manico"
    },
    {
      "title": "Indipendenza Anulare e Mignolo",
      "category": "Warm-Up & Finger Independence",
      "difficultyRank": "D-Rank",
      "targetBpm": 90,
      "isCustom": false,
      "existingId": "wu-03-brandon-left-hand",
      "notes": "Isola il movimento del 3° e 4° dito senza contrarre la mano"
    },
    {
      "title": "Sincronizzazione Coordinata a 4 Dita",
      "category": "Warm-Up & Finger Independence",
      "difficultyRank": "B-Rank",
      "targetBpm": 130,
      "isCustom": false,
      "existingId": "wu-05-bernth-15min-workout",
      "notes": "Fluidità totale su tutte e 6 le corde a tempo crescente"
    }
  ]
}
\`\`\``;
  }

  // 7. DEFAULT / ALTERNATE PICKING / GENERAL
  return `🎸 **Coach Forge - Scheda Ufficiale Catalogo:**

Ho strutturato una routine completa ed equilibrata di 25 minuti attinta dal catalogo ufficiale di Guitar Leveling per coordinazione, plettrata alternata e pulizia tecnica.

1. **Riscaldamento Cromatico Spider**: Postura e sincronizzazione metronomica.
2. **Sincronizzazione & Plettrata Base in Ottavi**: Plettrata alternata pulita dal polso.
3. **Pentatonica Minore Box 1**: Sincronizzazione cambi corda.
4. **Triadi su Corde Adiacenti in Plettrata Continua**: Precisione ritmica su forme triadiche.

Salva la scheda con il pulsante interattivo in basso per iniziare ad allenarti!

\`\`\`forge-routine
{
  "routineName": "Fondamentali & Velocità Guitar Leveling",
  "description": "Routine bilanciata dal catalogo ufficiale dell'app per riscaldamento, plettrata alternata e padronanza delle scale.",
  "estimatedMinutes": 25,
  "targetRank": "C-Rank",
  "source": "catalog_only",
  "exercises": [
    {
      "title": "Riscaldamento Cromatico Spider",
      "category": "Warm-Up & Finger Independence",
      "difficultyRank": "E-Rank",
      "targetBpm": 80,
      "isCustom": false,
      "existingId": "ex-spider-warmup",
      "notes": "Riscaldamento simmetrico a 4 dita"
    },
    {
      "title": "Sincronizzazione & Plettrata Base in Ottavi",
      "category": "Alternate Picking",
      "difficultyRank": "E-Rank",
      "targetBpm": 90,
      "isCustom": false,
      "existingId": "ap-01-lethal-finger-drill",
      "notes": "Plettrata alternata rigorosa dal polso"
    },
    {
      "title": "Pentatonica Minore Box 1",
      "category": "Scale & 3NPS",
      "difficultyRank": "E-Rank",
      "targetBpm": 80,
      "isCustom": false,
      "existingId": "scale-01-lethal-pentatonic-box1",
      "notes": "Articolazione pulita e ritmo costante"
    },
    {
      "title": "Triadi su Corde Adiacenti in Plettrata Continua",
      "category": "Alternate Picking",
      "difficultyRank": "C-Rank",
      "targetBpm": 120,
      "isCustom": false,
      "existingId": "ap-03-jamie-robinson-triads",
      "notes": "Precisione nei cambi di corda su forme triadiche"
    }
  ]
}
\`\`\``;
}
