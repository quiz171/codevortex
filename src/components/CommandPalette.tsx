import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Compass,
  FolderGit2,
  Home,
  Layers,
  Mail,
  Search,
  Sparkles,
  Terminal,
  User,
  Wrench,
  X,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenTerminal: () => void;
}

interface CommandAction {
  id: string;
  label: string;
  group: 'Navigation' | 'Actions' | 'Projects';
  keywords: string;
  shortcut?: string;
  icon: 'home' | 'user' | 'sparkles' | 'wrench' | 'folder' | 'layers' | 'mail' | 'terminal' | 'compass';
  run: () => void;
}

function ActionIcon({ icon }: { icon: CommandAction['icon'] }) {
  const cls = 'h-4 w-4 text-slate-400 shrink-0';
  switch (icon) {
    case 'home':
      return <Home className={cls} aria-hidden="true" />;
    case 'user':
      return <User className={cls} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={cls} aria-hidden="true" />;
    case 'wrench':
      return <Wrench className={cls} aria-hidden="true" />;
    case 'folder':
      return <FolderGit2 className={cls} aria-hidden="true" />;
    case 'layers':
      return <Layers className={cls} aria-hidden="true" />;
    case 'mail':
      return <Mail className={cls} aria-hidden="true" />;
    case 'terminal':
      return <Terminal className="h-4 w-4 text-cyan-400 shrink-0" aria-hidden="true" />;
    case 'compass':
      return <Compass className={cls} aria-hidden="true" />;
  }
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onOpenTerminal,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actions = useMemo<CommandAction[]>(() => {
    const navActions: CommandAction[] = [
      {
        id: 'nav-home',
        label: 'Home',
        group: 'Navigation',
        keywords: 'top hero start codevortex',
        icon: 'home',
        run: () => onNavigate('home'),
      },
      {
        id: 'nav-about',
        label: 'About',
        group: 'Navigation',
        keywords: 'nelson wazini biography profile',
        icon: 'user',
        run: () => onNavigate('about'),
      },
      {
        id: 'nav-beyond',
        label: 'Beyond The Code',
        group: 'Navigation',
        keywords: 'personality interests basketball gaming software engineering',
        icon: 'sparkles',
        run: () => onNavigate('beyond-the-code'),
      },
      {
        id: 'nav-skills',
        label: 'Skills',
        group: 'Navigation',
        keywords: 'tech arsenal python javascript java dart c++ c# html css ai',
        icon: 'wrench',
        run: () => onNavigate('skills'),
      },
      {
        id: 'nav-projects',
        label: 'Projects',
        group: 'Navigation',
        keywords: 'work portfolio edumind voxi corevortex lecture reminder it query',
        icon: 'folder',
        run: () => onNavigate('projects'),
      },
      {
        id: 'nav-services',
        label: 'Services',
        group: 'Navigation',
        keywords: 'what i can build website software application ai database ui ux',
        icon: 'layers',
        run: () => onNavigate('services'),
      },
      {
        id: 'nav-journey',
        label: 'Development Journey',
        group: 'Navigation',
        keywords: 'timeline milestones learning',
        icon: 'compass',
        run: () => onNavigate('journey'),
      },
      {
        id: 'nav-contact',
        label: 'Contact',
        group: 'Navigation',
        keywords: 'message email social github linkedin hire collaborate',
        icon: 'mail',
        run: () => onNavigate('contact'),
      },
    ];

    const quickActions: CommandAction[] = [
      {
        id: 'action-terminal',
        label: 'Explore Terminal',
        group: 'Actions',
        keywords: 'cli shell bash command line whoami help',
        shortcut: 'CLI',
        icon: 'terminal',
        run: () => onOpenTerminal(),
      },
    ];

    const projectActions: CommandAction[] = PROJECTS.map((project) => ({
      id: `project-${project.id}`,
      label: `Project: ${project.name}`,
      group: 'Projects',
      keywords: `${project.name} ${project.technologies.join(' ')} ${project.shortDescription}`,
      icon: 'folder',
      run: () => onNavigate('projects'),
    }));

    return [...navActions, ...quickActions, ...projectActions];
  }, [onNavigate, onOpenTerminal]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[selectedIndex];
      if (target) {
        onClose();
        target.run();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-[75] flex items-start justify-center bg-black/75 backdrop-blur-sm px-4 pt-[12vh]"
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0A0B12] shadow-2xl shadow-black/80"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 text-cyan-400 shrink-0" aria-hidden="true" />
              <label htmlFor="command-palette-search" className="sr-only">
                Search sections and actions
              </label>
              <input
                ref={inputRef}
                id="command-palette-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, project, or open terminal..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Results */}
            <div role="listbox" aria-label="Available destinations" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-slate-400">
                  No matching destinations for &ldquo;{query}&rdquo;.
                </p>
              ) : (
                filtered.map((item, idx) => {
                  const selected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      role="option"
                      aria-selected={selected}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        onClose();
                        item.run();
                      }}
                      className={`flex min-h-[42px] w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                        selected
                          ? 'bg-gradient-to-r from-violet-600/20 to-cyan-600/20 text-white'
                          : 'text-slate-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <ActionIcon icon={item.icon} />
                        <span className="truncate font-medium">{item.label}</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 shrink-0">
                        {item.shortcut ?? item.group}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Keyboard Hint Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#07080D] px-4 py-2.5 text-[11px] text-slate-500">
              <span>Navigate with ↑ ↓ · Enter to open</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
