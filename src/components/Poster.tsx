import type { ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        {project.motif === 'shield' && (
          <g transform="translate(232 40)" fill="none" stroke={a} strokeOpacity="0.85">
            <path d="M58 0 L116 22 V78 C116 120 90 146 58 160 C26 146 0 120 0 78 V22 Z" strokeWidth="2" />
            <path d="M58 16 L102 33 V78 C102 111 82 132 58 144 C34 132 14 111 14 78 V33 Z" strokeWidth="1" strokeOpacity="0.4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="30" x2={i % 2 ? 72 : 86} y1={56 + i * 14} y2={56 + i * 14} strokeWidth="3" strokeLinecap="round" strokeOpacity={0.35 + i * 0.1} />
            ))}
            <path d="M40 124 l12 12 l26 -28" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {project.motif === 'flow' && (
          <g fill="none" stroke={a}>
            <rect x="200" y="56" width="150" height="94" rx="12" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="214" y="72" width="28" height="20" rx="4" strokeOpacity="0.7" />
            <line x1="214" x2="330" y1="124" y2="124" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="18 8" />
            <g transform="translate(176 196)" fontFamily="Inter" fontSize="10" fill={a} stroke="none" letterSpacing="2">
              <circle cx="16" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" />
              <path d="M34 16 h46" stroke={a} strokeWidth="2" />
              <circle cx="96" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.8" />
              <path d="M112 8 l38 -22 M112 24 l38 22" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="166" cy="-18" r="10" fill={a} fillOpacity="0.8" />
              <circle cx="166" cy="50" r="10" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.5" />
            </g>
          </g>
        )}
        {project.motif === 'tenants' && (
          <g fill="none" stroke={a}>
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={196 + c * 44}
                  y={50 + r * 44}
                  width="34"
                  height="34"
                  rx="7"
                  strokeWidth="1.6"
                  strokeOpacity={0.25 + ((r + c) % 3) * 0.25}
                  fill={(r + c) % 4 === 0 ? a : 'none'}
                  fillOpacity="0.25"
                />
              )),
            )}
            <path d="M188 200 h190" strokeWidth="2" strokeOpacity="0.7" />
            <path d="M188 214 h190" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M188 228 h190" strokeWidth="1" strokeOpacity="0.2" />
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** Compact project symbols used in the Engineering Highlights rail. */
export function ProjectHighlightIcon({ title, color }: { title: string; color: string }) {
  const common = { fill: 'none', stroke: color, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-90" aria-hidden>
      <circle cx="60" cy="60" r="47" stroke={color} strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="60" cy="60" r="37" stroke={color} strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 6" />
      {title === 'GridForge-AI' && (
        <g {...common} strokeWidth="2">
          <path d="M26 72h18l8-25 15 37 9-22h18" />
          <path d="M31 39h15M38 33v12M86 84h16M94 76v16" strokeOpacity="0.65" />
          <circle cx="52" cy="47" r="3" fill={color} />
          <circle cx="67" cy="84" r="3" fill={color} />
          <circle cx="76" cy="62" r="3" fill={color} />
        </g>
      )}
      {title === 'AetherQ' && (
        <g {...common} strokeWidth="2">
          <rect x="31" y="31" width="35" height="45" rx="4" />
          <path d="M39 42h19M39 50h14M39 58h18" strokeOpacity="0.65" />
          <circle cx="78" cy="65" r="14" />
          <path d="m88 75 9 9M66 44l10-8M66 52l12 1" strokeOpacity="0.7" />
          <circle cx="76" cy="36" r="3" fill={color} />
        </g>
      )}
      {title === 'Nexus' && (
        <g {...common} strokeWidth="2">
          <path d="M60 25 91 37v25c0 20-14 30-31 36-17-6-31-16-31-36V37Z" />
          <path d="M45 61h30M49 51h22M49 71h22" strokeOpacity="0.7" />
          <circle cx="45" cy="61" r="3" fill={color} />
          <circle cx="75" cy="61" r="3" fill={color} />
          <path d="M45 61 38 82M75 61l7 21" strokeOpacity="0.55" />
        </g>
      )}
      {title === 'MindineersOS' && (
        <g {...common} strokeWidth="2">
          <circle cx="60" cy="60" r="12" />
          <circle cx="31" cy="38" r="8" />
          <circle cx="89" cy="38" r="8" />
          <circle cx="31" cy="83" r="8" />
          <circle cx="89" cy="83" r="8" />
          <path d="m51 52-14-9M69 52l14-9M51 68l-14 9M69 68l14 9" />
          <path d="M57 60h6M60 57v6" strokeWidth="3" />
        </g>
      )}
      {title === 'CodeAmbers' && (
        <g {...common} strokeWidth="2">
          <rect x="27" y="34" width="66" height="48" rx="5" />
          <path d="M27 47h66M38 60l-8 8 8 8M53 76l9-16M70 60h13M70 68h9" strokeOpacity="0.75" />
          <circle cx="36" cy="41" r="2" fill={color} stroke="none" />
          <circle cx="44" cy="41" r="2" fill={color} stroke="none" />
        </g>
      )}
    </svg>
  );
}

/** Compact monogram for the portfolio. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 24 32" className="h-[1.1em] w-auto" aria-hidden>
        <path d="M5 26V6l14 20V6" fill="none" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.22em] text-mist">KARTIKAY</span>
    </span>
  );
}
