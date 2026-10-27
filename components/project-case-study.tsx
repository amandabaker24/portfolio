import Link from "next/link";
import Image from "next/image";

export type ProjectCase = {
  title: string;
  subtitle: string;
  intro: string;
  role: string;
  stack: string[];
  highlights: string[];
  architecture: string[];
  myRole: string[];
  outcome: string;
  screens?: { src: string; alt: string }[];
};

export function ProjectCaseStudy({ project }: { project: ProjectCase }) {
  return (
    <article className="case-study-shell">
      <header className="case-hero">
        <div className="case-meta">
          <p className="eyebrow">CASE STUDY</p>
          <h1>{project.title}</h1>
          <p className="case-subtitle">{project.subtitle}</p>
        </div>

        <div className="case-intro-card">
          <p className="case-role">{project.role}</p>
          <p>{project.intro}</p>
        </div>
      </header>

      <section className="case-scroll-story">
        <div className={project.screens ? "case-product-screens" : "story-device"}>
          {project.screens ? project.screens.map((screen) => (
            <Image key={screen.alt} src={screen.src} alt={screen.alt} width={520} height={1094} sizes="(max-width: 640px) 44vw, 24vw" />
          )) : <>
            <div className="story-screen screen-one" />
            <div className="story-screen screen-two" />
            <div className="story-screen screen-three" />
            <div className="story-screen screen-four" />
          </>}
        </div>
        <div className="story-copy"><div>{project.highlights.slice(0, 5).map((feature) => <span key={feature}>{feature}</span>)}</div></div>
      </section>

      <section className="case-section case-architecture">
        <div className="section-header narrow">
          <p className="eyebrow">THE SYSTEM BEHIND IT</p>
        </div>

        <div className="architecture-map" aria-label="Architecture overview">
          {project.architecture.map((system) => <div key={system} className="arch-block">{system}</div>)}
        </div>
      </section>

      <section className="case-section case-role">
        <div className="section-header narrow">
          <p className="eyebrow">MY ROLE</p>
        </div>

        <div className="role-grid">
          {project.myRole.map((role) => (
            <div key={role} className="role-node">
              {role}
            </div>
          ))}
        </div>
      </section>

      <section className="case-section case-detail">
        <div className="detail-stack">
          <div>
            <p className="eyebrow">TECH STACK</p>
            <ul>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">MAJOR PRODUCT AREAS</p>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="case-outcome">
        <p>{project.outcome}</p>
        <Link href="/" className="back-link">
          ← Back to portfolio
        </Link>
      </section>
    </article>
  );
}
