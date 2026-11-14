import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Maximize2, Minimize2, Terminal, X } from 'lucide-react';
import {
  BRAND_PROFILE,
  PROJECTS,
  SERVICES,
  SKILLS,
} from '../data/portfolio';

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface TerminalEntry {
  id: number;
  command?: string;
  lines: string[];
  action?: { label: string; sectionId: string };
}

const AVAILABLE_COMMANDS = [
  'help',
  'whoami',
  'about',
  'skills',
  'projects',
  'services',
  'contact',
  'clear',
] as const;

export function DeveloperTerminal({ isOpen, onClose, onNavigate }: DeveloperTerminalProps) {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 1,
      lines: [
        `CODEVORTEX Interactive Shell — ${BRAND_PROFILE.fullName}`,
        'Type "help" to list available commands, or click a quick command below.',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [expanded, setExpanded] = useState(false);

  // Typewriter reveal state for latest entry
  const [typingEntryId, setTypingEntryId] = useState<number | null>(null);
  const [visibleCharCount, setVisibleCharCount] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const nextIdRef = useRef(2);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, visibleCharCount]);

  useEffect(() => {
    if (typingEntryId === null) return;
    const target = entries.find((e) => e.id === typingEntryId);
    if (!target) {
      setTypingEntryId(null);
      return;
    }
    const fullLength = target.lines.join('\n').length;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || visibleCharCount >= fullLength) {
      setVisibleCharCount(fullLength);
      setTypingEntryId(null);
      return;
    }

    const timeout = window.setTimeout(() => {
      setVisibleCharCount((prev) => Math.min(fullLength, prev + 8));
    }, 14);
    return () => window.clearTimeout(timeout);
  }, [typingEntryId, visibleCharCount, entries]);

  const buildCommandOutput = (
    rawCmd: string
  ): { lines: string[]; action?: { label: string; sectionId: string } } => {
    const cmd = rawCmd.trim().toLowerCase();

    switch (cmd) {
      case 'help':
        return {
          lines: [
            'Available commands:',
            '  whoami    — Developer identity & background',
            '  about     — Engineering mindset & personal interests',
            '  skills    — Programming languages, web & core focus',
            '  projects  — Featured software & AI builds',
            '  services  — Capabilities & collaboration areas',
            '  contact   — Reach out or start a project',
            '  clear     — Clear terminal output',
          ],
        };

      case 'whoami':
        return {
          lines: [
            `Name:     ${BRAND_PROFILE.fullName}`,
            `Alias:    ${BRAND_PROFILE.brandName}`,
            'Role:     Software Engineer & AI Builder',
            'Focus:    Innovative software, AI tools & digital experiences',
            'Off-duty: Basketball & Gaming',
          ],
          action: { label: 'Jump to About', sectionId: 'about' },
        };

      case 'about':
        return {
          lines: [
            `${BRAND_PROFILE.fullName} (popularly known as ${BRAND_PROFILE.brandName})`,
            'Passionate about turning complex ideas into clean, functional software.',
            'Drawn to artificial intelligence, structured problem-solving, and continuous',
            'learning—balanced off the keyboard with basketball and gaming.',
          ],
          action: { label: 'Open Beyond The Code', sectionId: 'beyond-the-code' },
        };

      case 'skills': {
        const langs = SKILLS.filter((s) => s.category === 'Programming Languages')
          .map((s) => s.name)
          .join(', ');
        const web = SKILLS.filter((s) => s.category === 'Web Development')
          .map((s) => s.name)
          .join(', ');
        const other = SKILLS.filter((s) => s.category === 'Other Interests')
          .map((s) => s.name)
          .join(', ');
        return {
          lines: [
            `Programming Languages: ${langs}`,
            `Web Development:       ${web}`,
            `Other Interests:       ${other}`,
          ],
          action: { label: 'View Tech Arsenal', sectionId: 'skills' },
        };
      }

      case 'projects':
        return {
          lines: [
            'Featured Projects:',
            ...PROJECTS.map((p, i) => `  0${i + 1}. ${p.name} [${p.stage}] — ${p.shortDescription}`),
          ],
          action: { label: 'Open Project Spotlight', sectionId: 'projects' },
        };

      case 'services':
        return {
          lines: [
            'What I Can Build:',
            ...SERVICES.map((s) => `  ${s.number}. ${s.title}`),
          ],
          action: { label: 'Explore Services', sectionId: 'services' },
        };

      case 'contact':
        return {
          lines: [
            `Email: ${BRAND_PROFILE.email}`,
            'Have an idea, project, or collaboration in mind?',
            'Send an email or use the Contact section form directly.',
          ],
          action: { label: 'Go to Contact Form', sectionId: 'contact' },
        };

      default:
        return {
          lines: [
            `Command not found: "${rawCmd}".`,
            'Type "help" to see all supported commands.',
          ],
        };
    }
  };

  const executeCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();
    setHistory((prev) => [trimmed, ...prev.slice(0, 29)]);
    setHistoryIndex(-1);
    setInputValue('');

    if (normalized === 'clear') {
      setEntries([]);
      setTypingEntryId(null);
      return;
    }

    const { lines, action } = buildCommandOutput(trimmed);
    const id = nextIdRef.current++;
    setEntries((prev) => [...prev, { id, command: trimmed, lines, action }]);
    setVisibleCharCount(0);
    setTypingEntryId(id);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeCommand(inputValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = Math.min(history.length - 1, historyIndex + 1);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInputValue('');
      } else {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = inputValue.trim().toLowerCase();
      if (!partial) return;
      const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(partial));
      if (match) setInputValue(match);
    }
  };

  const renderEntryLines = (entry: TerminalEntry) => {
    const fullText = entry.lines.join('\n');
    const displayText =
      entry.id === typingEntryId ? fullText.slice(0, visibleCharCount) : fullText;
    return displayText;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="CODEVORTEX Interactive Developer Terminal"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#07080E] shadow-2xl shadow-black/80 transition-all duration-200 ${
              expanded ? 'h-[88vh] w-full max-w-5xl' : 'h-[72vh] max-h-[600px] w-full max-w-3xl'
            }`}
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#0B0C14] px-4 py-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Terminal className="h-4 w-4 text-cyan-400 shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm font-medium text-slate-200 truncate">
                  nelson@codevortex — interactive-shell
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-label={expanded ? 'Restore terminal size' : 'Maximize terminal'}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {expanded ? (
                    <Minimize2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close terminal"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Quick Command Strip */}
            <div className="flex items-center gap-2 overflow-x-auto border-b border-white/[0.06] bg-[#090A11] px-4 py-2">
              <span className="font-mono text-[11px] text-slate-500 whitespace-nowrap shrink-0">
                Quick run:
              </span>
              {AVAILABLE_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => {
                    executeCommand(cmd);
                    inputRef.current?.focus();
                  }}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Output Stream */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="flex-1 overflow-y-auto p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed space-y-4 cursor-text"
            >
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-1.5">
                  {entry.command && (
                    <div className="flex items-center gap-2 text-slate-200">
                      <span className="text-violet-400 shrink-0">nelson@codevortex</span>
                      <span className="text-slate-500 shrink-0">:~$</span>
                      <span className="text-cyan-300">{entry.command}</span>
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap break-words text-slate-300 font-mono">
                    {renderEntryLines(entry)}
                  </pre>
                  {entry.action && entry.id !== typingEntryId && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate(entry.action!.sectionId);
                      }}
                      className="mt-1 inline-flex items-center gap-1.5 text-xs font-sans font-medium text-cyan-300 hover:text-white transition-colors"
                    >
                      <span>{entry.action.label}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Command Input Prompt */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-[#090A11] px-4 py-3 font-mono text-xs sm:text-sm"
            >
              <label htmlFor="terminal-command-input" className="sr-only">
                Terminal command
              </label>
              <span className="text-violet-400 shrink-0">nelson@codevortex</span>
              <span className="text-slate-500 shrink-0">:~$</span>
              <input
                ref={inputRef}
                id="terminal-command-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type a command (e.g. "help", "whoami")...'
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
