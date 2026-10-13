import { useRef, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { topPicks } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import { PosterBackdrop, ProjectHighlightIcon } from './Poster';
import { RailButtons } from './Rail';

export default function TopPicks() {
  const rail = useRef<HTMLDivElement>(null);
  return (
    <>
      <SectionHeading kicker="Selected work & recognition" title="Engineering Highlights" />
      <div className="group/rail relative">
        <div ref={rail} className="rail gutter flex snap-x snap-mandatory gap-2 overflow-x-auto py-6">
          {topPicks.map((pick, i) => (
            <motion.div
              key={pick.title}
              className="group relative flex h-[clamp(260px,32vw,310px)] shrink-0 snap-start items-end"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px -5% 0px 0px' }}
              transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.06, ease: EASE }}
            >
              <span
                aria-hidden
                className="text-outline -mr-[clamp(1.25rem,2.5vw,2rem)] select-none font-display leading-[0.78] transition duration-500 group-hover:[-webkit-text-stroke-color:var(--color-accent)]"
                style={{ fontSize: i === 9 ? 'clamp(8rem, 20vw, 14rem)' : 'clamp(9rem, 23vw, 17rem)', letterSpacing: i === 9 ? '-0.06em' : 0 }}
              >
                {i + 1}
              </span>
              <div className="relative z-10 h-[85%] w-[clamp(170px,20vw,220px)] overflow-hidden rounded-lg shadow-[-12px_0_30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition duration-500 group-hover:-translate-y-2 group-hover:ring-white/30">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <PosterBackdrop palette={pick.palette} />
                </div>
                {i < 5 && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-[42%] z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full p-1 shadow-[0_0_36px_var(--icon-glow)]"
                    style={{ '--icon-glow': `${pick.palette.accent}44`, background: `${pick.palette.from}99` } as CSSProperties}
                  >
                    <ProjectHighlightIcon title={pick.title} color={pick.palette.accent} />
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-between p-3.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-bone/70">{pick.label}</span>
                  <div className="relative z-[2] max-w-full">
                    <p className="break-words font-display text-[clamp(1.35rem,3vw,1.75rem)] leading-[0.92] tracking-wide text-bone">{pick.title}</p>
                    <p className="mt-1.5 max-w-[19ch] text-[11px] leading-snug text-mist">{pick.detail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <RailButtons rail={rail} />
      </div>
    </>
  );
}
