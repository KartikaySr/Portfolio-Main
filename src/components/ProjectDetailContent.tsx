import type { Project } from '../data/portfolio';

export default function ProjectDetailContent({ project }: { project: Project }) {
  return (
    <div className="project-detail-content">
      <p className="project-detail-logline">{project.logline}</p>

      <div className="project-detail-section project-detail-stack">
        <h4>Technology</h4>
        <div className="project-detail-tags">
          {project.stack.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>

      {project.metrics.length > 0 && (
        <div className="project-detail-section project-detail-metrics">
          <h4>Evidence</h4>
          <div className="project-detail-metric-grid">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="project-detail-section">
        <h4>Contribution</h4>
        <ul className="project-detail-list">
          {project.build.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      <div className="project-detail-section">
        <h4>Capabilities</h4>
        <ul className="project-detail-list">
          {project.features.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      {project.architecture && (
        <div className="project-detail-section">
          <h4>Architecture</h4>
          <dl className="project-detail-architecture">
            {project.architecture.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="project-detail-links">
        {project.github && <a href={project.github} target="_blank" rel="noreferrer">Source on GitHub ↗</a>}
        {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noreferrer">Open live demo ↗</a>}
      </div>
    </div>
  );
}
