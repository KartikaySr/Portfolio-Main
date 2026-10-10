import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';

type Command = {
  id: string;
  label: string;
  category: string;
  keywords: string;
  action: () => void;
};

const sections = [
  { id: 'top', label: 'Home', keywords: 'hero start top' },
  { id: 'story', label: 'Résumé', keywords: 'cv resume download career' },
  { id: 'originals', label: 'Projects', keywords: 'work case studies portfolio' },
  { id: 'moments', label: 'Recognition & certifications', keywords: 'awards credentials certificates' },
  { id: 'skills', label: 'Skills', keywords: 'technology stack tools' },
  { id: 'about', label: 'Profile', keywords: 'about me education' },
  { id: 'journey', label: 'Experience', keywords: 'internships work timeline' },
  { id: 'picks', label: 'Highlights', keywords: 'selected work featured' },
  { id: 'contact', label: 'Contact', keywords: 'email linkedin get in touch' },
] as const;

export default function CommandPalette({
  onNavigate,
  onOpenProject,
  onOpenResume,
}: {
  onNavigate: (target: string) => void;
  onOpenProject: (project: Project) => void;
  onOpenResume: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  useScrollLock(open);

  const commands = useMemo<Command[]>(() => {
    const sectionCommands: Command[] = sections.map((section) => ({
      id: `section-${section.id}`,
      label: section.label,
      category: 'Go to section',
      keywords: section.keywords,
      action: () => {
        setOpen(false);
        onNavigate(section.id);
      },
    }));
    const projectCommands: Command[] = projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      category: 'Open project',
      keywords: `${project.genre} ${project.status} ${project.stack.join(' ')}`,
      action: () => {
        setOpen(false);
        onOpenProject(project);
      },
    }));
    return [
      ...sectionCommands,
      ...projectCommands,
      {
        id: 'open-resume',
        label: 'Open résumé viewer',
        category: 'Quick action',
        keywords: 'cv pdf resume view',
        action: () => {
          setOpen(false);
          onOpenResume();
        },
      },
    ];
  }, [onNavigate, onOpenProject, onOpenResume]);

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return commands;
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.category} ${command.keywords}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (!open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActive((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0)));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActive((value) => Math.max(value - 1, 0));
      } else if (event.key === 'Enter' && filtered[active]) {
        event.preventDefault();
        filtered[active].action();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, filtered, open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActive(0);
      return;
    }
    window.requestAnimationFrame(() => input.current?.focus());
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-command-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Open quick navigation command palette"
        className="fixed bottom-5 left-5 z-[125] flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-[#111114]/90 px-4 text-xs font-semibold text-mist shadow-xl backdrop-blur-xl transition hover:border-accent/50 hover:text-bone sm:bottom-7 sm:left-7"
      >
        <span>Quick jump</span>
        <kbd className="rounded-md border border-white/15 bg-white/[0.06] px-2 py-1 font-mono text-[10px] text-bone">⌘ K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[160] flex items-start justify-center bg-black/65 px-4 pt-[min(18vh,150px)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="Quick navigation"
              className="glass w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#111114]/95 shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.18 }}
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-5">
                <span aria-hidden className="text-lg text-accent">⌕</span>
                <label className="sr-only" htmlFor="command-search">Search sections and projects</label>
                <input
                  ref={input}
                  id="command-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Jump to a section or project…"
                  className="h-14 min-w-0 flex-1 bg-transparent text-sm text-bone outline-none placeholder:text-smoke"
                />
                <kbd className="rounded border border-white/15 px-2 py-1 font-mono text-[10px] text-smoke">ESC</kbd>
              </div>
              <div ref={list} className="max-h-[min(56vh,460px)] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-mist">No matching section or project.</p>
                ) : (
                  filtered.map((command, index) => (
                    <button
                      key={command.id}
                      type="button"
                      data-command-index={index}
                      onMouseEnter={() => setActive(index)}
                      onClick={command.action}
                      className={`flex min-h-12 w-full items-center justify-between gap-4 rounded-xl px-4 py-2 text-left transition ${index === active ? 'bg-accent/10 text-bone ring-1 ring-accent/25' : 'text-mist hover:bg-white/[0.05] hover:text-bone'}`}
                    >
                      <span className="truncate text-sm font-medium">{command.label}</span>
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-smoke">{command.category}</span>
                    </button>
                  ))
                )}
              </div>
              <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-smoke">
                <span>Sections · projects · résumé</span>
                <span>↑ ↓ Navigate · ↵ Open</span>
              </footer>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
