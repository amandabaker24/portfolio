import { ArrowIcon } from "@/components/arrow-icon";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CaseLabel, CaseNavigation, CaseNext } from "@/components/product-case-shared";
import { ProductExplorer } from "@/components/product-explorer";
import "@/components/product-case-studies.css";

export const metadata: Metadata = { title: "Menoviq — Amanda Baker", description: "Designing and engineering a website builder and multi-tenant CMS for restaurants." };

export default function MenoviqPage() {
  return (
    <article className="pc-case pc-menoviq">
      <header className="pc-hero">
        <div className="pc-breadcrumb"><Link href="/#project-menoviq">← Selected work</Link><span>02 / RESTAURANT TECHNOLOGY</span></div>
        <div className="pc-wordmark">Menoviq<span>PRODUCT DESIGN &amp; ENGINEERING</span></div>
        <div className="pc-hero-heading"><h1>A table.<br />A story.<br /><em>A place online.</em></h1><div className="pc-hero-intro"><span className="pc-eyebrow">BUILT FOR HOSPITALITY</span><p>A website builder that brings a restaurant’s character to the screen.</p><a href="#menoviq-experience">Step inside the product <span>↓</span></a></div></div>
        <div className="pc-meta"><div><span>MY ROLE</span><p>Product Engineer</p></div><div><span>THE PRODUCT</span><p>Website builder &amp; restaurant CMS</p></div><div><span>THE SCOPE</span><p>Design, frontend &amp; data modeling</p></div></div>
      </header>

      <figure className="mv-hero-visual"><div className="mv-visual-heading"><span className="pc-eyebrow">THE RESTAURANT, REIMAGINED ONLINE</span><span>CREATE → CURATE → PUBLISH</span></div><div className="pc-window"><div className="pc-window-bar" aria-hidden="true"><span>● ● ●</span><span>Menoviq / Website Builder</span><span><ArrowIcon /></span></div><Image src="/menoviq/website-builder.png" width={3022} height={1606} sizes="(max-width: 700px) 95vw, 1180px" alt="Menoviq restaurant website builder showing the Verdant Room website, section controls, and content editor" preload /></div><figcaption><span>A workspace for the people behind the restaurant.</span><span>MENOVIQ / WEBSITE BUILDER</span></figcaption></figure>
      <CaseNavigation prefix="menoviq" />

      <section className="pc-section" id="menoviq-overview"><CaseLabel>01 / THE IDEA</CaseLabel><div className="pc-split"><h2>Hospitality has a personality.<br /><em>The website should, too.</em></h2><div className="pc-prose"><p>A restaurant website is often the first encounter with the experience itself. The atmosphere, the food, the welcome: all of it needs a place online.</p><p>Menoviq pairs a flexible visual builder with the operational depth of a restaurant CMS, giving teams control over their content without losing the character of their brand.</p></div></div><div className="pc-three-up">{[["01", "Character, by design.", "Themes, media, and flexible sections make room for each restaurant’s own story."], ["02", "Made for the daily work.", "Menus, events, and reservations sit alongside the tools that keep a website current."], ["03", "Room to grow.", "A multi-tenant foundation supports distinct websites, content, and domains across properties."]].map(([n, title, text]) => <div key={n}><span className="pc-eyebrow">{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="pc-section" id="menoviq-experience"><CaseLabel>02 / THE EXPERIENCE</CaseLabel><div className="pc-section-heading"><h2>Behind the scenes.<br /><em>In front of guests.</em></h2><p>One product, two perspectives: a practical workspace for the team and a thoughtful storefront for the guest.</p></div><ProductExplorer product="menoviq" /><div className="mv-workflow">{[["Compose", "Choose sections and shape the page around the restaurant."], ["Curate", "Keep menus, imagery, and events connected to the story."], ["Publish", "Manage drafts, page versions, and the live website."]].map(([title, text], index) => <div key={title}><span>0{index + 1} /</span><h3>{title}</h3><p>{text}</p></div>)}</div><div className="pc-feature-list"><span className="pc-eyebrow">BUILT AROUND RESTAURANT LIFE</span><p>Menus · Reservations · Private dining · Events · Gift cards · Media · Analytics · SEO</p></div></section>

      <section className="pc-section" id="menoviq-system"><CaseLabel>03 / THE SYSTEM</CaseLabel><div className="pc-split"><h2>Many restaurants.<br /><em>One considered foundation.</em></h2><div className="pc-prose"><p>The architecture connects a shared editing experience to restaurant-specific content. Tenancy, publishing, and domains are part of the product model, alongside the pages guests see.</p></div></div><div className="pc-system"><div className="pc-system-top"><span className="pc-eyebrow">THE AUTHORING EXPERIENCE</span><h3>Website editor + restaurant CMS</h3><p>Next.js / React / TypeScript</p></div><div className="pc-system-branches">{[["Restaurant identity", "Tenants · Themes · Custom domains"], ["Content & operations", "Menus · Events · Media · Reservations"], ["Publishing", "Drafts · Version history · SEO"]].map(([title, text]) => <div key={title}><span aria-hidden="true">↓</span><h4>{title}</h4><p>{text}</p></div>)}</div><div className="pc-system-base"><span className="pc-eyebrow">DATA FOUNDATION</span><p>Prisma <span>/</span> PostgreSQL <span>/</span> Zod</p></div></div></section>

      <section className="pc-section pc-contribution" id="menoviq-contribution"><div><CaseLabel>04 / MY CONTRIBUTION</CaseLabel><h2>From the guest’s view<br /><em>to the operator’s workflow.</em></h2><p className="pc-muted">Product Engineer</p></div><div className="pc-role-list">{[["Product design", "Shaping the relationship between the editor, the restaurant’s content, and the guest experience."], ["Frontend & CMS experience", "Building interfaces for composing pages and managing the details of a restaurant website."], ["Data modeling & scalability", "Structuring content and tenant relationships to support multiple properties and their publishing needs."]].map(([title, text], index) => <div key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>

      <section className="pc-takeaway"><span className="pc-eyebrow">THE TAKEAWAY</span><h2>More character.<br /><em>More control.</em></h2><p>A platform for creating a differentiated restaurant storefront while keeping content, publishing, and day-to-day operations within reach.</p><Link href="/#project-menoviq">Back to selected work <ArrowIcon /></Link></section>
      <CaseNext href="/work/nori" number="03" title="Nori" description="A little inspiration. A more organized kitchen." />
    </article>
  );
}
