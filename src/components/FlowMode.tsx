import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { education, experience, profile, projects, skillCategories } from '../data/portfolio';
import ProjectDetailContent from './ProjectDetailContent';
import './flow-mode.css';

type FlowModeProps = {
  onBack: () => void;
};

const featuredProjects = projects.slice(0, 4);
const flowSkills = skillCategories.flatMap((category) => category.skills).slice(0, 16);

export default function FlowMode({ onBack }: FlowModeProps) {
  const [activeProject, setActiveProject] = useState(featuredProjects[0]?.id ?? '');
  const [tempo, setTempo] = useState<'calm' | 'pulse'>('calm');
  const selectedProject = useMemo(
    () => featuredProjects.find((project) => project.id === activeProject) ?? featuredProjects[0],
    [activeProject],
  );

  return (
    <div className={`flow-mode flow-tempo-${tempo}`}>
      <header className="flow-nav">
        <a className="flow-wordmark" href="#flow-top" aria-label="Kartikay Srivastava home">
          K<span>.</span>S
        </a>
        <nav className="flow-nav-links" aria-label="Flow mode navigation">
          <a href="#flow-about">About</a>
          <a href="#flow-work">Work</a>
          <a href="#flow-stack">Stack</a>
          <a href="#flow-contact">Contact</a>
        </nav>
        <button className="flow-mode-button" type="button" onClick={onBack}>
          <span aria-hidden>↗</span> Change view
        </button>
      </header>

      <main id="flow-top">
        <section className="flow-hero">
          <div className="flow-hero-ribbon flow-hero-ribbon-one" aria-hidden />
          <div className="flow-hero-ribbon flow-hero-ribbon-two" aria-hidden />
          <div className="flow-hero-copy">
            <p className="flow-eyebrow">Flow mode · portfolio 01</p>
            <h1>
              Building digital
              <br />
              <em>systems that move.</em>
            </h1>
            <p className="flow-lede">
              I&apos;m {profile.fullName}, a {profile.role.toLowerCase()} shaping thoughtful products,
              reliable backend systems, and applied AI experiences.
            </p>
            <div className="flow-hero-actions">
              <a className="flow-solid-button" href="#flow-work">
                Explore selected work <span aria-hidden>↓</span>
              </a>
              <a className="flow-text-link" href={`mailto:${profile.email}`}>
                Start a conversation <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
          <div className="flow-hero-visual">
            <div className="flow-orbit flow-orbit-one" />
            <div className="flow-orbit flow-orbit-two" />
            <div className="flow-portrait-wrap">
              <img src={profile.portrait.src} alt={profile.portrait.alt} />
            </div>
            <span className="flow-portrait-label">Kartikay<br />Srivastava</span>
            <span className="flow-vertical-label">Software engineer · AI / ML</span>
          </div>
        </section>
        <section className="flow-lab-strip">
          <span>Live system note</span>
          <strong>{tempo === 'calm' ? 'Thoughtful by default.' : 'Ship the spark.'}</strong>
          <button type="button" onClick={() => setTempo(tempo === 'calm' ? 'pulse' : 'calm')}>
            {tempo === 'calm' ? 'Turn up the tempo ↗' : 'Return to considered ↺'}
          </button>
        </section>
        <div className="flow-marquee" aria-label="Kartikay Srivastava — software engineer, AI and ML">
          <div className="flow-marquee-track">
            <span>Software engineer</span><i>✳</i><span>Applied AI</span><i>✳</i><span>Backend systems</span><i>✳</i><span>Product thinking</span><i>✳</i>
            <span>Software engineer</span><i>✳</i><span>Applied AI</span><i>✳</i><span>Backend systems</span><i>✳</i><span>Product thinking</span><i>✳</i>
          </div>
        </div>

        <section className="flow-intro" id="flow-about">
          <div className="flow-section-marker">01 / profile</div>
          <div className="flow-intro-content">
            <p className="flow-kicker">A practical kind of curiosity.</p>
            <h2>
              From a rough idea
              <br />
              to something <em>real.</em>
            </h2>
            <div className="flow-intro-grid">
              <p>{profile.intro}</p>
              <div className="flow-note">
                <span>Currently</span>
                <strong>Software Engineer Intern</strong>
                <small>Grids Apps LLC · Remote</small>
              </div>
            </div>
          </div>
        </section>

        <section className="flow-statement">
          <div className="flow-statement-art" aria-hidden>
            <img src="/flow-assets/about-bg.png" alt="" />
          </div>
          <p>
            Good software is a conversation between people, data, and the details nobody notices until
            they matter.
          </p>
        </section>

        <section className="flow-work" id="flow-work">
          <div className="flow-section-heading">
            <div>
              <div className="flow-section-marker">02 / selected work</div>
              <h2>Built with intent.</h2>
            </div>
            <p>Systems, experiments, and products shaped around a real problem.</p>
          </div>
          <div className="flow-project-layout">
            <div className="flow-project-list" role="list" aria-label="Selected projects">
              {featuredProjects.map((project, index) => (
                <button
                  className={`flow-project-row ${project.id === activeProject ? 'is-active' : ''}`}
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(project.id)}
                >
                  <span className="flow-project-index">0{index + 1}</span>
                  <span className="flow-project-name">{project.title}</span>
                  <span className="flow-project-genre">{project.genre}</span>
                  <span className="flow-project-arrow" aria-hidden>↗</span>
                </button>
              ))}
            </div>
            {selectedProject && (
              <motion.article
                className="flow-project-detail"
                key={selectedProject.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flow-project-art" style={{ '--flow-accent': selectedProject.palette.accent } as CSSProperties}>
                  <span>{selectedProject.motif}</span>
                  <strong>{selectedProject.year}</strong>
                </div>
                <div className="flow-project-detail-copy">
                  <div>
                    <p className="flow-kicker">{selectedProject.status} · {selectedProject.genre}</p>
                    <h3>{selectedProject.title}</h3>
                  </div>
                  <ProjectDetailContent project={selectedProject} />
                </div>
              </motion.article>
            )}
          </div>
          <div className="flow-project-metrics">
            <div><strong>05</strong><span>flagship builds</span></div>
            <div><strong>03</strong><span>internships &amp; roles</span></div>
            <div><strong>∞</strong><span>iterations ahead</span></div>
          </div>
        </section>

        <section className="flow-stack" id="flow-stack">
          <div className="flow-section-marker">03 / toolkit</div>
          <div className="flow-stack-heading">
            <h2>The tools<br /><em>behind the work.</em></h2>
            <p>Technologies are only useful when they help the product become clearer, faster, or more human.</p>
          </div>
          <div className="flow-skill-cloud">
            {flowSkills.map((skill, index) => (
              <span key={skill.name} className={index % 5 === 0 ? 'is-highlighted' : ''}>{skill.name}</span>
            ))}
          </div>
        </section>

        <section className="flow-timeline">
          <div className="flow-section-marker">04 / experience</div>
          <div className="flow-timeline-content">
            <h2>Where the<br /><em>flow led.</em></h2>
            {experience.map((item) => (
              <article className="flow-timeline-item" key={`${item.company}-${item.role}`}>
                <span>{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company} · {item.place}</p>
                  <p>{item.points[0]}</p>
                </div>
              </article>
            ))}
            <div className="flow-education">
              <span>{education[0].period}</span>
              <p><strong>{education[0].degree}</strong><br />{education[0].school} · {education[0].place}</p>
            </div>
          </div>
        </section>

        <section className="flow-principles">
          <div className="flow-section-marker">05 / working notes</div>
          <div className="flow-principles-grid">
            {['Make the invisible legible.', 'Prefer useful over impressive.', 'Leave the system better.'].map((principle, index) => (
              <article key={principle}>
                <span>0{index + 1}</span>
                <h3>{principle}</h3>
                <p>{['Architecture should help the next person understand the product.', 'The best interaction is the one that makes the next action obvious.', 'Every build is a chance to make the work more durable.'][index]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="flow-contact" id="flow-contact">
          <div className="flow-contact-art" aria-hidden>
            <img src="/flow-assets/solar-app.png" alt="" />
          </div>
          <div className="flow-contact-copy">
            <div className="flow-section-marker">05 / contact</div>
            <h2>Let&apos;s make<br /><em>something useful.</em></h2>
            <a className="flow-email" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden>↗</span></a>
            <div className="flow-socials">
              <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={profile.resumePdf} target="_blank" rel="noreferrer">Résumé</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="flow-footer">
        <span>© {new Date().getFullYear()} {profile.fullName}</span>
        <span>Flow mode / One of four ways to explore</span>
        <button type="button" onClick={onBack}>Back to mode selection ↑</button>
      </footer>
    </div>
  );
}
