import React, { useState, useRef, useEffect } from 'react';
import { ApiSettings, HunterProfile } from '../types';
import { askGuitarCoachStream, ChatMessage, isAiConfigured } from '../utils/aiCoachEngine';
import { soundEngine } from '../utils/audioEngine';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  Bot,
  User,
  Zap,
  HelpCircle,
  Flame,
  CheckCircle2,
  Key,
  StopCircle
} from 'lucide-react';

interface CoachChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiSettings: ApiSettings;
  hunterProfile: HunterProfile;
  onOpenSettings: () => void;
}

const QUICK_QUESTIONS = [
  'Come aumento la velocità nell\'alternate picking senza irrigidire il braccio?',
  'Qual è la differenza pratica tra il modo Dorico ed Eolio negli assoli?',
  'Come memorizzo rapidamente le note su tutta la tastiera?',
  'Come posso pulire il rumore delle corde negli arpeggi sweep?',
  'Suggeriscimi una routine per arrivare a 160 BPM.'
];

export const CoachChatModal: React.FC<CoachChatModalProps> = ({
  isOpen,
  onClose,
  apiSettings,
  hunterProfile,
  onOpenSettings
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Ciao **${hunterProfile.name}**! Sono il tuo **Guitar Coach** personale di Guitar Leveling.\n\nChiedimi qualsiasi cosa su **tecnica** (alternate picking, sweep, legato, tapping), **teoria musicale** (scale, accordi, modi, intervalli) o su come superare i **Boss Fight** dell'Accademia!`
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Scroll to the bottom ONLY when modal opens or when user sends a new message.
  // During streaming, we deliberately DO NOT auto-scroll so the user can read steadily from the top!
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsStreaming(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    // Guardrail: Ensure AI is properly configured before sending to API
    if (!isAiConfigured(apiSettings)) {
      const userMsg: ChatMessage = { role: 'user', content: text };
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          role: 'assistant',
          content: `⚠️ **Configurazione IA richiesta**\n\nPer consentire al Coach IA di analizzare le tue domande ed elaborare risposte personalizzate in tempo reale, è necessario inserire una chiave API valida nella scheda **Impostazioni** (supporta OpenRouter, Groq, OpenAI o provider compatibili).\n\nClicca sul pulsante **"Configura Ora"** in alto per inserire la tua chiave.`
        }
      ]);
      setInputValue('');
      setTimeout(() => scrollToBottom('smooth'), 50);
      return;
    }

    const userMsg: ChatMessage = { role: 'user', content: text };
    const initialAssistantMsg: ChatMessage = { role: 'assistant', content: '' };
    
    // Append user message and prepare empty slot for incoming stream
    setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
    setInputValue('');
    setIsLoading(true);
    setIsStreaming(true);

    // Scroll down once immediately after sending so the user sees their query and the coach reply start
    setTimeout(() => scrollToBottom('smooth'), 50);

    const abortCtrl = new AbortController();
    abortControllerRef.current = abortCtrl;

    try {
      await askGuitarCoachStream(
        text,
        messages,
        apiSettings,
        (accumulatedText) => {
          // Update assistant's content in real-time.
          // Note: NO auto-scrolling here! The user stays at their current scroll position
          // and can read comfortably without jarring jumps.
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
              next[lastIdx] = { ...next[lastIdx], content: accumulatedText };
            }
            return next;
          });
        },
        abortCtrl.signal
      );
      soundEngine.playSuccess();
    } catch (e: any) {
      if (e?.name !== 'AbortError') {
        setMessages((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (lastIdx >= 0 && next[lastIdx].role === 'assistant' && !next[lastIdx].content) {
            next[lastIdx] = {
              role: 'assistant',
              content: `⚠️ Errore di connessione col Coach: ${e?.message || 'verifica la chiave in Impostazioni'}.`
            };
          }
          return next;
        });
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-3xl max-w-2xl w-full h-[85vh] max-h-[750px] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-950/40 via-[#140b0d] to-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 border border-red-500/40 flex items-center justify-center text-white shadow-lg shadow-red-950/50">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-zinc-100 uppercase tracking-wide">
                  COACH IA <span className="text-red-500">GUITAR LEVELING</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  STREAMING SSE
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Risposte in tempo reale su tecnica, teoria musicale e didattica chitarristica
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStreaming && (
              <button
                onClick={handleStopStream}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-xs hover:bg-zinc-700 transition-colors"
                title="Ferma lo streaming della risposta"
              >
                <StopCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Stop</span>
              </button>
            )}

            {!isAiConfigured(apiSettings) && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-950/70 border border-amber-700/80 text-amber-300 font-mono text-xs hover:bg-amber-900/60 transition-colors"
                title="Configura API Key per abilitare il Coach"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Configura IA</span>
              </button>
            )}

            <button
              onClick={() => {
                handleStopStream();
                onClose();
              }}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Configured Banner */}
        {!isAiConfigured(apiSettings) && (
          <div className="bg-amber-950/40 border-b border-amber-800/70 p-3 px-4 sm:px-6 flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-300">
              <Key className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Coach non configurato:</strong> inserisci una API Key in Impostazioni per ricevere risposte in tempo reale.
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold whitespace-nowrap text-[11px] transition-colors shrink-0"
            >
              Configura Ora
            </button>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => {
            const isLastMessage = idx === messages.length - 1;
            const isCurrentlyStreamingThis = isStreaming && isLastMessage && msg.role === 'assistant';

            return (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 border border-red-800/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white font-medium rounded-tr-none whitespace-pre-wrap'
                      : 'bg-[#151518] text-zinc-200 border border-zinc-800 rounded-tl-none font-sans'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    msg.content.trim().length === 0 && isCurrentlyStreamingThis ? (
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>Il Coach sta digitando in tempo reale...</span>
                      </div>
                    ) : (
                      <div className="relative">
                        <MarkdownRenderer content={msg.content} />
                        {isCurrentlyStreamingThis && (
                          <span className="inline-block w-2 h-4 bg-red-500 ml-1 animate-pulse align-middle" />
                        )}
                      </div>
                    )
                  ) : (
                    msg.content
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 border-t border-zinc-800/80 bg-[#09090b] flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-red-400" /> Domande Rapide:
          </span>
          {QUICK_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading || isStreaming}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors shrink-0 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0c0c0e] border-t border-zinc-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isStreaming
                  ? 'Il Coach sta rispondendo in diretta...'
                  : 'Chiedi al Coach su plettrata, teoria, accordi, BPM...'
              }
              disabled={isLoading || isStreaming}
              className="flex-1 bg-[#141418] border border-zinc-700 focus:border-red-500 rounded-2xl px-4 py-3 text-xs sm:text-sm font-sans text-zinc-100 placeholder:text-zinc-500 focus:outline-none transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || isStreaming || !inputValue.trim()}
              className="p-3 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white rounded-2xl shadow-lg shadow-red-950/40 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

