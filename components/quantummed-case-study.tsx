import Image from "next/image";
import Link from "next/link";
import type { ProjectCase } from "@/components/project-case-study";
import { QuantumMedExperience } from "@/components/quantummed-experience";
import "./quantummed-case-study.css";

const contributions: Record<string, string> = {
  "PRODUCT DESIGN": "Translating complex care workflows into clear journeys, useful information, and a consistent interface.",
  FRONTEND: "Building the patient experience in React and TypeScript, from the dashboard to the details of daily care.",
  BACKEND: "Developing the services and APIs that connect patient accounts, medications, orders, and payments.",
  ARCHITECTURE: "Structuring the platform around focused services and shared infrastructure.",
  INTEGRATIONS: "Connecting pharmacy and care workflows with the systems behind the interface.",
};

export function QuantumMedCaseStudy({ project }: { project: ProjectCase }) {
  return (
    <article className="qm-case">
      <header className="qm-hero">
        <div className="qm-breadcrumb"><Link href="/#project-quantummed">← Selected work</Link><span><i /> HEALTH TECHNOLOGY / 01</span></div>
        <div className="qm-project-name"><span className="qm-monogram" aria-hidden="true">Q<span>+</span></span><span>QuantumMed</span><span className="qm-case-label">DESIGN &amp; ENGINEERING CASE STUDY</span></div>
        <div className="qm-hero-heading"><h1>Care, made<br /><em>clear.</em></h1><div className="qm-hero-intro"><p>A patient-first prescription and healthcare management platform.</p><span>Connecting the small moments of everyday care with the systems that make them possible.</span><a href="#qm-experience">Explore the product <span>↓</span></a></div></div>
        <div className="qm-meta"><div><span>MY ROLE</span><p>{project.role}</p></div><div><span>FOCUS</span><p>Product design → full stack engineering</p></div><div><span>PLATFORM</span><p>Patients, pharmacies &amp; care teams</p></div></div>
      </header>

      <figure className="qm-hero-visual" aria-label="QuantumMed dashboard and health calendar">
        <div className="qm-visual-glow" aria-hidden="true" />
        <div className="qm-hero-dashboard qm-screen-frame"><div className="qm-browser-bar"><span aria-hidden="true"><i /><i /><i /></span><p>QuantumMed / Patient dashboard</p><span aria-hidden="true">↗</span></div><Image src="/quantummed/dashboard-hq.png" width={2936} height={1588} sizes="(max-width: 800px) 95vw, 1100px" alt="QuantumMed dashboard with medication schedules and care activity" preload /></div>
        <div className="qm-hero-calendar qm-screen-frame"><div className="qm-browser-bar"><span aria-hidden="true"><i /><i /><i /></span><p>Health Calendar</p><span aria-hidden="true">↗</span></div><Image src="/quantummed/health-calendar-hq.png" width={2940} height={1596} sizes="(max-width: 640px) 60vw, 480px" alt="QuantumMed Health Calendar showing a patient’s care schedule" /></div>
        <figcaption><span>ONE CONNECTED VIEW OF CARE</span><span>INTERFACE → INFRASTRUCTURE</span></figcaption>
      </figure>

      <nav className="qm-section-nav" aria-label="Case study sections"><a href="#qm-overview">01 <span>Overview</span></a><a href="#qm-experience">02 <span>The experience</span></a><a href="#qm-system">03 <span>The system</span></a><a href="#qm-contribution">04 <span>My contribution</span></a></nav>

      <section id="qm-overview" className="qm-section qm-overview">
        <div className="qm-section-label"><span>01 / THE CHALLENGE</span><i /></div>
        <div className="qm-overview-body"><h2>Healthcare is complex.<br />Using it shouldn’t be.</h2><div className="qm-body-columns"><p>{project.intro}</p><p>The challenge was to bring those moving parts into a cohesive product: a clear place to understand medications, stay on top of care, and manage the workflows around it.</p></div></div>
        <div className="qm-principles"><div><span>01</span><h3>Clarity for patients.</h3><p>A useful overview of what matters now and what comes next.</p></div><div><span>02</span><h3>Continuity of care.</h3><p>Medications, records, and care activity connected across the experience.</p></div><div><span>03</span><h3>Depth behind the scenes.</h3><p>Focused services supporting the complexity of pharmacy and care workflows.</p></div></div>
      </section>

      <section id="qm-experience" className="qm-section">
        <div className="qm-section-label"><span>02 / THE EXPERIENCE</span><i /></div>
        <div className="qm-section-heading"><h2>The everyday,<br /><em>made easier.</em></h2><p>A dashboard that makes care understandable, a calendar that keeps it organized, and the details close at hand.</p></div>
        <QuantumMedExperience />
        <div className="qm-product-areas"><span>CONNECTED WORKFLOWS</span><div>{project.highlights.map((feature) => <span key={feature}>{feature}</span>)}</div></div>
      </section>

      <section id="qm-system" className="qm-section">
        <div className="qm-section-label"><span>03 / UNDER THE SURFACE</span><i /></div>
        <div className="qm-section-heading"><h2>A clear interface.<br /><em>A connected system.</em></h2><p>Working across the product meant thinking beyond individual screens to the services, data, and integrations supporting them.</p></div>
        <div className="qm-architecture" aria-label="System flow: React interface to API gateway, domain services, and shared data infrastructure">
          <div className="qm-architecture-entry"><span className="qm-diagram-label">EXPERIENCE LAYER</span><strong>Patient interface</strong><p>React / TypeScript</p></div>
          <span className="qm-flow-arrow" aria-hidden="true">→</span>
          <div className="qm-architecture-gateway"><span className="qm-diagram-label">CONNECTION LAYER</span><strong>API Gateway</strong><p>NestJS / REST APIs</p></div>
          <span className="qm-flow-arrow" aria-hidden="true">→</span>
          <div className="qm-service-group"><span className="qm-diagram-label">DOMAIN SERVICES</span><div>{project.architecture.filter((name) => name.endsWith("Service")).map((name) => <span key={name}><i />{name.replace(" Service", "")}</span>)}</div></div>
          <div className="qm-data-layer"><span>SHARED INFRASTRUCTURE</span><div><strong>PostgreSQL <small>Persistent data</small></strong><strong>Redis <small>Cache &amp; coordination</small></strong><strong>External integrations <small>Connected pharmacy &amp; care systems</small></strong></div></div>
        </div>
        <div className="qm-tech-groups">{[
          { title: "INTERFACE", items: ["React", "TypeScript"] },
          { title: "APPLICATION", items: ["NestJS", "Node.js", "REST APIs", "Microservices"] },
          { title: "DATA & DELIVERY", items: ["PostgreSQL", "Redis", "AWS", "Docker"] },
        ].map((group) => <div key={group.title}><span>{group.title}</span><p>{group.items.filter((item) => project.stack.includes(item)).join(" / ")}</p></div>)}</div>
      </section>

      <section id="qm-contribution" className="qm-section qm-contribution"><div><div className="qm-section-label"><span>04 / MY CONTRIBUTION</span></div><h2>From the first<br />interaction to<br /><em>the systems beneath.</em></h2><p>Full Stack Software Engineer</p></div><div className="qm-contribution-list">{project.myRole.map((role, index) => <div key={role}><span>0{index + 1}</span><div><h3>{role.charAt(0) + role.slice(1).toLowerCase()}</h3><p>{contributions[role]}</p></div><span aria-hidden="true">↗</span></div>)}</div></section>

      <section className="qm-outcome"><div className="qm-section-label"><span>THE TAKEAWAY</span></div><h2>Less friction.<br /><em>More room for care.</em></h2><p>{project.outcome}</p><Link href="/#project-quantummed">Back to selected work <span>↗</span></Link></section>

      <Link href="/work/menoviq" className="qm-next-project"><div><span>UP NEXT / 02</span><h2>Menoviq <span>↗</span></h2><p>A website builder made for restaurants.</p></div><div className="qm-next-image"><Image src="/menoviq/website-builder.png" width={3022} height={1606} sizes="(max-width: 640px) 90vw, 440px" alt="Menoviq website builder preview" /></div></Link>
    </article>
  );
}
