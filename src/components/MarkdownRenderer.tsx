import React from 'react';
import Markdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Cleans mathematical LaTeX notation, stray dollar signs, backslashes and ensures clean formatting
function cleanMarkdownText(raw: string): string {
  if (!raw) return '';
  return raw
    // Convert LaTeX math display blocks $$...$$ to clean lines
    .replace(/\$\$\\text\{([^}]+)\}([^$]*)\$\$/g, '$1$2')
    .replace(/\$\$([^$]+)\$\$/g, '$1')
    // Remove inline math dollar signs $...$
    .replace(/\$\\text\{([^}]+)\}\$/g, '$1')
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\#/g, '#')
    .replace(/\$([^$]+)\$/g, '$1')
    // Clean remaining backslashes before special characters
    .replace(/\\([#*_`])/g, '$1')
    .trim();
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const sanitizedContent = cleanMarkdownText(content);

  return (
    <div className={`prose-dark space-y-3 leading-relaxed text-zinc-200 text-xs sm:text-sm ${className}`}>
      <Markdown
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-zinc-300">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-white tracking-wide">{children}</strong>,
          em: ({ children }) => <em className="italic text-red-300">{children}</em>,
          ul: ({ children }) => <ul className="my-2.5 pl-5 list-disc space-y-1.5 text-zinc-300">{children}</ul>,
          ol: ({ children }) => <ol className="my-2.5 pl-5 list-decimal space-y-1.5 text-zinc-300">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed pl-0.5">{children}</li>,
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-black text-red-400 mt-4 mb-2 tracking-wide uppercase border-b border-red-950/40 pb-1">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-red-400 mt-4 mb-2 tracking-wide">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-bold text-zinc-100 mt-3.5 mb-1.5 tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-semibold text-red-300 mt-3 mb-1 tracking-wide">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-xs font-semibold text-zinc-200 mt-2.5 mb-1">{children}</h5>
          ),
          code: ({ children }) => (
            <code className="bg-black/70 px-1.5 py-0.5 rounded font-mono text-[11px] sm:text-xs text-amber-300 border border-zinc-800">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-red-500 pl-3.5 my-2.5 py-0.5 text-zinc-300 bg-red-950/20 rounded-r-lg italic">
              {children}
            </blockquote>
          )
        }}
      >
        {sanitizedContent}
      </Markdown>
    </div>
  );
};
