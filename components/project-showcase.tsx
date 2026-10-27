"use client";

import { ArrowIcon } from "@/components/arrow-icon";
import Image from "next/image";
import "./project-showcase.css";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type ProjectData } from "@/components/portfolio-data";
import { journeyDuration, projectReadingTimes, noriScreens } from "@/components/project-journey";

function BrowserBar({ name }: { name: string }) {
  return <div className="product-browser-bar"><span className="browser-dots"><i /><i /><i /></span><span>{name}</span><span><ArrowIcon /></span></div>;
}

function QuantumPreview() {
  return (
    <div className="product-composition quantum-composition">
      <div className="product-window quantum-main">
        <BrowserBar name="QuantumMed / Patient dashboard" />
        <Image src="/quantummed/dashboard-hq.png" width={2936} height={1588} sizes="(max-aspect-ratio: 16/9) 190vh, 100vw" alt="QuantumMed patient dashboard with medication schedule, adherence tracking, and health calendar" />
      </div>
      <div className="product-window quantum-detail">
        <BrowserBar name="QuantumMed / Health Calendar" />
        <Image src="/quantummed/health-calendar-hq.png" width={2940} height={1596} sizes="(max-width: 640px) 42vw, 28vw" alt="QuantumMed Health Calendar showing appointments, medication schedules, and health tasks" />
      </div>
      <div className="product-orbit-label"><i /> CONNECTING PEOPLE &amp; CARE</div>
    </div>
  );
}

function MenoviqPreview() {
  return (
    <div className="product-composition menoviq-composition">
      <div className="product-window menoviq-main">
        <BrowserBar name="Menoviq / Website Builder" />
        <Image src="/menoviq/website-builder.png" width={3022} height={1606} sizes="(max-aspect-ratio: 16/9) 190vh, 100vw" alt="Menoviq Website Builder showing the section library, Verdant Room website preview, and customization inspector" />
      </div>
      <div className="product-window menoviq-detail">
        <BrowserBar name="Verdant Room / Live preview" />
        <Image src="/menoviq/restaurant-preview.png" width={738} height={390} sizes="(max-width: 640px) 40vw, 25vw" alt="Verdant Room restaurant website designed in Menoviq" />
      </div>
      <div className="product-orbit-label"><i /> ONE PLATFORM. EVERY RESTAURANT.</div>
    </div>
  );
}

function NoriPreview() {
  return (
    <div className="product-composition nori-composition">
      <div className="product-window nori-main">
        <BrowserBar name="Nori / Cook profile" />
        <Image src={noriScreens.profile} width={520} height={1094} sizes="(max-aspect-ratio: 1/2) 100vw, 100vh" alt="Nori cooking community profile" />
      </div>
      <div className="product-window nori-detail">
        <BrowserBar name="Nori / Meal planning" />
        <Image src={noriScreens.mealPlan} width={558} height={1160} sizes="(max-width: 640px) 40vw, 22vw" alt="Nori meal planning and kitchen organization" />
      </div>
      <div className="product-orbit-label"><i /> COOK. PLAN. SHARE.</div>
    </div>
  );
}

export function ProjectStage({ project, embedded = false }: { project: ProjectData; embedded?: boolean }) {
  const articleRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedded) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.timeline({ scrollTrigger: { trigger: articleRef.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 } })
          .fromTo(".product-depth", { y: 90, scale: 0.88, rotationY: -7 }, { y: -25, scale: 1.04, rotationY: 2, ease: "none" }, 0)
          .fromTo(".showcase-ambient", { xPercent: -16, opacity: 0.4 }, { xPercent: 12, opacity: 0.85, ease: "none" }, 0)
          .fromTo(".showcase-copy", { y: 28 }, { y: 0, ease: "none" }, 0);
      }, articleRef);
      return () => context.revert();
    });
    return () => media.revert();
  }, [embedded]);

  function moveLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    stage.style.setProperty("--light-x", `${x * 100}%`);
    stage.style.setProperty("--light-y", `${y * 100}%`);
    stage.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
    stage.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
  }

  function resetLight() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--light-x", "60%");
    stage.style.setProperty("--light-y", "38%");
    stage.style.setProperty("--tilt-y", "0deg");
    stage.style.setProperty("--tilt-x", "0deg");
  }

  const href = project.slug === "quantummed" ? "/work/quantum-med" : `/work/${project.slug}`;
  return (
    <article ref={articleRef} id={embedded ? undefined : `project-${project.slug}`} className={`showcase-project showcase-${project.slug}${embedded ? " showcase-embedded" : ""}`} style={{ "--project-glow": project.slug === "quantummed" ? "80, 128, 222" : project.slug === "nori" ? "184, 130, 62" : "64, 139, 117" } as CSSProperties} aria-labelledby={`title-${project.slug}`}>
      <div ref={stageRef} className="showcase-stage" onPointerMove={moveLight} onPointerLeave={resetLight}>
        <div className="showcase-ambient" aria-hidden="true" />
        <div className="showcase-floor" aria-hidden="true" />
        <div className="showcase-topline"><span>{project.number} <i>/ {String(projects.length).padStart(2, "0")}</i></span><span className="showcase-category">{project.platform}</span></div>
        <nav className="showcase-navigation" aria-label={`${project.title} project navigation`}>
          {projects.map((item) => <a key={item.slug} href={`#project-${item.slug}`} onClick={embedded ? (event) => {
            event.preventDefault();
            const journey = document.querySelector<HTMLElement>(".hero-journey");
            if (!journey) return;
            const progress = projectReadingTimes[item.slug] / journeyDuration;
            const top = journey.getBoundingClientRect().top + window.scrollY + (journey.offsetHeight - window.innerHeight) * progress;
            window.history.replaceState(null, "", `#project-${item.slug}`);
            window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
          } : undefined} aria-label={`View ${item.title}`} aria-current={project.slug === item.slug ? "true" : undefined}><span>{item.number}</span><i /></a>)}
        </nav>
        <div className="product-depth"><div className="product-tilt">{project.slug === "quantummed" ? <QuantumPreview /> : project.slug === "menoviq" ? <MenoviqPreview /> : <NoriPreview />}</div></div>
        <div className="showcase-shade" aria-hidden="true" />
        <div className="showcase-copy">
          <p className="showcase-role">{project.role}</p>
          <h2 id={`title-${project.slug}`} className="showcase-title"><Link href={href}>{project.title}</Link></h2>
          <div className="showcase-bottom"><div><p className="showcase-description">{project.subtitle}</p><Link href={href} className="showcase-cta">Explore project <span><ArrowIcon /></span></Link></div><div className="showcase-stack"><span>BUILT WITH</span><p>{project.stack.slice(0, 3).join(" / ")}</p></div></div>
        </div>
        <div className="showcase-footnote"><span>SELECTED WORK — AMANDA BAKER</span><span>DESIGN → ENGINEERING</span></div>
      </div>
    </article>
  );
}

export function ProjectShowcase() {
  return <div className="project-showcase">{projects.map((project) => <ProjectStage key={project.slug} project={project} />)}</div>;
}
