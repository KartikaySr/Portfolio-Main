import { useMemo, useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { achievements, education, experience, profile, projects, skillCategories } from '../data/portfolio';
import './modified-mode.css';

type ModifiedModeProps = { onBack: () => void };

const palette = ['#ff8066', '#77c9b7', '#f3c969', '#b6a1e8', '#ef9fb0'];

export default function ModifiedMode({ onBack }: ModifiedModeProps) {
  const [activeProject, setActiveProject] = useState(projects[0]?.id ?? '');
  const [shuffle, setShuffle] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const active = useMemo(() => projects.find((project) => project.id === activeProject) ?? projects[0], [activeProject]);
  const stickerSkills = useMemo(
    () => skillCategories.flatMap((category) => category.skills).slice(0, 18).map((skill, index) => ({ ...skill, index: index + shuffle })),
    [shuffle],
  );

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const move = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      hero.style.setProperty('--mouse-x', `${x}`);
      hero.style.setProperty('--mouse-y', `${y}`);
    };
    hero.addEventListener('pointermove', move);
    return () => hero.removeEventListener('pointermove', move);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="modified-mode">
      <header className="modified-nav">
        <a href="#modified-top" className="modified-brand">
          <span>K</span>artikay<span>.</span>
        </a>
        <nav aria-label="Modified mode navigation">
          <a href="#modified-about">hello</a><a href="#modified-work">work</a><a href="#modified-life">journey</a><a href="#modified-contact">say hi</a>
        </nav>
        <button type="button" onClick={onBack}>change mode <span>↗</span></button>
      </header>

      <main id="modified-top">
        <section className="modified-hero" ref={heroRef}>
          <div className="modified-hero-doodles" aria-hidden><span>✳</span><i>curious<br />by default</i><b>↘</b></div>
          <div className="modified-hero-copy">
            <p className="modified-eyebrow">Modified mode · a warmer view</p>
            <h1>Hi, I&apos;m<br /><em>Kartikay!</em></h1>
            <p className="modified-hero-lede">I build useful things for curious people — from reliable backend systems to playful AI-powered products.</p>
            <div className="modified-hero-links"><a className="modified-pill" href="#modified-work">See my work <span>↓</span></a><a href={`mailto:${profile.email}`}>Let&apos;s talk <span>↗</span></a></div>
          </div>
          <div className="modified-hero-art">
            <div className="modified-sun" aria-hidden />
            <div className="modified-photo-frame"><img src={profile.portrait.src} alt={profile.portrait.alt} /><span>software<br />engineer · AI/ML</span><b className="modified-eye-dot" aria-hidden /></div>
            <div className="modified-sticker modified-sticker-hi">✌<small>nice to<br />meet you</small></div>
            <div className="modified-sticker modified-sticker-location">⌁ Jaipur, India</div>
          </div>
          <div className="modified-scroll">keep scrolling <span>↓</span></div>
        </section>

        <section className="modified-about" id="modified-about">
          <div className="modified-section-tag">01 / nice to meet you</div>
          <div className="modified-about-copy">
            <p className="modified-eyebrow">The short version</p>
            <h2>Part engineer,<br /><em>part storyteller.</em></h2>
            <p className="modified-body">{profile.intro} I care about the small moments that make a product feel easy to trust.</p>
            <div className="modified-about-facts"><div><strong>03+</strong><span>internships &amp; roles</span></div><div><strong>05</strong><span>systems in the lab</span></div><div><strong>∞</strong><span>things left to learn</span></div></div>
          </div>
          <div className="modified-note-card"><span>Note to self</span><strong>Make it clear.<br />Make it kind.<br />Make it work.</strong><i>— K</i></div>
        </section>

        <section className="modified-photo-stack">
          <div className="modified-section-tag">01.5 / the many tabs open</div>
          <div className="modified-stack-copy">
            <p className="modified-eyebrow">Same person, different context</p>
            <h2>Always<br /><em>learning.</em></h2>
            <p className="modified-body">There is more than one way to look at a builder. Pick a card and let the portrait change its mood.</p>
          </div>
          <div className="modified-stack">
            {[['builder', 'Making the system hold'], ['student', 'Asking better questions'], ['teammate', 'Making space for others']].map(([label, caption], index) => (
              <button
                type="button"
                key={label}
                className={`modified-stack-card stack-${index} ${activePhoto === index ? 'is-active' : ''}`}
                onClick={() => setActivePhoto(index)}
              >
                <img src={profile.portrait.src} alt={`${profile.fullName} — ${label}`} />
                <span>{label}</span><small>{caption}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="modified-work" id="modified-work">
          <div className="modified-work-head"><div><div className="modified-section-tag">02 / things I&apos;ve made</div><h2>Selected<br /><em>work.</em></h2></div><p>Click a project — the cards are curious too.</p></div>
          <div className="modified-work-grid">
            <div className="modified-project-tabs">
              {projects.map((project, index) => <button key={project.id} type="button" className={active?.id === project.id ? 'is-active' : ''} onClick={() => setActiveProject(project.id)}><span>0{index + 1}</span><strong>{project.title}</strong><i>↗</i></button>)}
            </div>
            {active && <article className="modified-project-card" style={{ '--project-color': active.palette.accent } as CSSProperties}>
              <div className="modified-project-top"><span>{active.year}</span><b>{active.motif}</b></div>
              <div className="modified-project-symbol">{active.title.slice(0, 1)}</div>
              <div className="modified-project-bottom"><span>{active.genre}</span><h3>{active.title}</h3><p>{active.logline}</p><div>{active.stack.slice(0, 4).map((tech) => <small key={tech}>{tech}</small>)}</div><aside>{active.github && <a href={active.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{active.liveDemo && <a href={active.liveDemo} target="_blank" rel="noreferrer">Live ↗</a>}</aside></div>
            </article>}
          </div>
        </section>

        <section className="modified-life" id="modified-life">
          <div className="modified-section-tag">03 / the journey</div>
          <div className="modified-life-head"><h2>A little<br /><em>backstory.</em></h2><p>The places, people, and questions that shaped how I build.</p></div>
          <div className="modified-timeline">{experience.map((item, index) => <article key={item.company}><span>0{index + 1}<br />{item.period}</span><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.points[0]}</p></div></article>)}<article><span>edu<br />2023—27</span><div><h3>{education[0].school}</h3><strong>{education[0].degree}</strong><p>{education[0].score} · {education[0].place}</p></div></article></div>
        </section>

        <section className="modified-milestones">
          <div className="modified-section-tag">03.5 / little wins</div>
          <div className="modified-milestone-head"><h2>Proof that<br /><em>the work travels.</em></h2><p>Small markers from the road so far.</p></div>
          <div className="modified-milestone-grid">
            {achievements.slice(0, 4).map((item, index) => (
              <article key={item.title}><span>0{index + 1}</span><strong>{item.title}</strong><p>{item.detail}</p></article>
            ))}
          </div>
        </section>

        <section className="modified-toolbox">
          <div className="modified-toolbox-head"><div><div className="modified-section-tag">04 / my toolbox</div><h2>Things I<br /><em>like using.</em></h2></div><button type="button" onClick={() => setShuffle((value) => value + 1)}>shuffle the stickers ↻</button></div>
          <div className="modified-stickers">{stickerSkills.map((skill, index) => <span key={skill.name} style={{ '--sticker-color': palette[index % palette.length], '--sticker-rotate': `${((index * 13) % 13) - 6}deg` } as CSSProperties}>{skill.name}</span>)}</div>
        </section>

        <section className="modified-contact" id="modified-contact">
          <div className="modified-contact-art"><div className="modified-contact-circle">✳</div><span>Have a good<br />idea?</span></div>
          <div><div className="modified-section-tag">05 / say hello</div><h2>Let&apos;s make<br /><em>something good.</em></h2><button className="modified-email" type="button" onClick={copyEmail}>{copied ? 'Copied!' : profile.email} <span>{copied ? '✓' : '↗'}</span></button><div className="modified-socials"><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.resumePdf} target="_blank" rel="noreferrer">Résumé</a></div></div>
        </section>
      </main>
      <footer className="modified-footer"><span>© {new Date().getFullYear()} {profile.fullName}</span><span>Modified mode / one more way to say hello</span><button type="button" onClick={onBack}>back to mode selection ↑</button></footer>
    </div>
  );
}
