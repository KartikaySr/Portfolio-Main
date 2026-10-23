import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { profile, projects, skillCategories } from '../data/portfolio';
import './three-d-mode.css';

type ThreeDModeProps = { onBack: () => void };

const portraits = [
  { className: 'three-d-photo-cyan', label: 'signal / 01' },
  { className: 'three-d-photo-amber', label: 'signal / 02' },
  { className: 'three-d-photo-violet', label: 'signal / 03' },
  { className: 'three-d-photo-mono', label: 'signal / 04' },
];

export default function ThreeDMode({ onBack }: ThreeDModeProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [activeSignal, setActiveSignal] = useState(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      scene.style.setProperty('--scene-x', `${x * 10}deg`);
      scene.style.setProperty('--scene-y', `${y * -8}deg`);
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <div className="three-d-mode">
      <header className="three-d-nav">
        <a href="#three-d-top" className="three-d-logo">K<span>/</span>S</a>
        <span className="three-d-nav-status"><i /> interactive portfolio / 03</span>
        <button type="button" onClick={onBack}>Change view <span>↗</span></button>
      </header>

      <main id="three-d-top">
        <section className="three-d-hero">
          <div className="three-d-grid" aria-hidden />
          <div className="three-d-copy">
            <p className="three-d-overline">Kartikay Srivastava · software engineer</p>
            <h1>Ideas<br /><span>in motion.</span></h1>
            <p className="three-d-description">
              A spatial index of the systems, experiments, and details I&apos;ve built across full-stack
              engineering and applied AI.
            </p>
            <a className="three-d-enter" href="#three-d-work">Enter the archive <span>↓</span></a>
          </div>
          <div className="three-d-stage" ref={sceneRef}>
            <div className="three-d-stage-shadow" aria-hidden />
            {portraits.map((portrait, index) => (
              <button
                className={`three-d-photo ${portrait.className} ${activeSignal === index ? 'is-selected' : ''}`}
                key={portrait.label}
                type="button"
                onClick={() => setActiveSignal(index)}
                aria-label={`Focus ${portrait.label}`}
              >
                <img src={profile.portrait.src} alt={`${profile.fullName}, ${portrait.label}`} />
                <span>{portrait.label}</span>
                <b>0{index + 1}</b>
              </button>
            ))}
            <div className="three-d-axis axis-x" aria-hidden />
            <div className="three-d-axis axis-y" aria-hidden />
            <div className="three-d-axis axis-z" aria-hidden />
            <div className="three-d-stage-label">Drag your point of view<br /><span>move your cursor</span></div>
            <div className="three-d-signal-readout">selected signal <b>0{activeSignal + 1}</b><br /><span>click a portrait to lock focus</span></div>
          </div>
          <div className="three-d-scroll-mark">Scroll to explore <span>↓</span></div>
        </section>

        <section className="three-d-manifest" id="three-d-work">
          <div className="three-d-section-number">01 / manifest</div>
          <div>
            <p className="three-d-overline">Selected coordinates</p>
            <h2>Work with<br /><span>weight.</span></h2>
            <p className="three-d-section-copy">
              I like making complex things feel considered. These projects are a few coordinates in that
              ongoing practice.
            </p>
          </div>
          <div className="three-d-projects">
            {projects.slice(0, 5).map((project, index) => (
              <a className="three-d-project" href={project.liveDemo ?? project.github ?? '#'} target="_blank" rel="noreferrer" key={project.id}>
                <span>0{index + 1}</span>
                <strong>{project.title}</strong>
                <small>{project.genre}</small>
                <i>↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="three-d-system">
          <div className="three-d-system-orb" aria-hidden />
          <div className="three-d-system-copy">
            <div className="three-d-section-number">02 / system</div>
            <h2>Different tools.<br /><span>Same intent.</span></h2>
            <p>Technology is a material. The point is what it lets people do next.</p>
          </div>
          <div className="three-d-tech-ring">
            {skillCategories.flatMap((category) => category.skills).slice(0, 12).map((skill, index) => (
              <span key={skill.name} style={{ '--tech-angle': `${index * 30}deg` } as CSSProperties}>{skill.name}</span>
            ))}
          </div>
        </section>

        <section className="three-d-lab">
          <div className="three-d-section-number">03 / field notes</div>
          <div className="three-d-lab-copy">
            <h2>How the<br /><span>pieces connect.</span></h2>
            <p>Every build has a human question at its centre. The code is the structure that lets the answer travel.</p>
          </div>
          <div className="three-d-lab-grid">
            {[
              ['01', 'Observe', 'Find the friction before reaching for a framework.'],
              ['02', 'Compose', 'Make the interface and the system agree.'],
              ['03', 'Release', 'Put the work in someone’s hands and learn from it.'],
            ].map(([number, title, copy]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </section>

        <section className="three-d-contact">
          <div className="three-d-contact-cube" aria-hidden>
            <div>{profile.firstName}</div><div>AI / ML</div><div>FULL STACK</div><div>JAIPUR</div>
          </div>
          <div>
            <div className="three-d-section-number">03 / transmission</div>
            <h2>Let&apos;s build<br /><span>the next thing.</span></h2>
            <a className="three-d-email" href={`mailto:${profile.email}`}>{profile.email} <b>↗</b></a>
            <div className="three-d-links">
              <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={profile.resumePdf} target="_blank" rel="noreferrer">Résumé</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="three-d-footer">
        <span>© {new Date().getFullYear()} {profile.fullName}</span>
        <button type="button" onClick={onBack}>Back to mode selection ↑</button>
      </footer>
    </div>
  );
}
