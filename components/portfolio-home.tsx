"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stackItems } from "@/components/portfolio-data";
import { CinematicHero } from "@/components/cinematic-hero";
import { DashboardPortal } from "@/components/dashboard-portal";
import { journeyDuration, projectReadingTimes } from "@/components/project-journey";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioHome() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.1,
        },
      );

      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((el) => {
        if (el.closest(".hero-section") || el.classList.contains("about-me-section")) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          },
        );

        const aboutLines = gsap.utils.toArray<HTMLElement>(".about-me-line");
        const aboutTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".about-me-section",
            start: "top 78%",
            end: "bottom 38%",
            scrub: 0.8,
          },
        });

        aboutTimeline.fromTo(
          aboutLines,
          { opacity: 0.16, y: 34 },
          { opacity: 1, y: 0, stagger: 0.22, ease: "none" },
        );
      });

      gsap.utils.toArray<HTMLElement>(".stack-node").forEach((node, index) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
            },
          },
        );
      });

    }, revealRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={revealRef} className="page-shell">
      <section className="hero-journey" aria-label="Selected projects product journey">
        <span id="work" className="work-journey-anchor" style={{ top: `calc((100% - 100svh) * ${projectReadingTimes.quantummed / journeyDuration})` }} aria-hidden="true" />
        <span id="project-quantummed" className="project-journey-anchor" style={{ top: `calc((100% - 100svh) * ${projectReadingTimes.quantummed / journeyDuration})` }} aria-hidden="true" />
        <span id="project-menoviq" className="project-journey-anchor" style={{ top: `calc((100% - 100svh) * ${projectReadingTimes.menoviq / journeyDuration})` }} aria-hidden="true" />
        <span id="project-nori" className="project-journey-anchor" style={{ top: `calc((100% - 100svh) * ${projectReadingTimes.nori / journeyDuration})` }} aria-hidden="true" />
        <span id="project-goddard" className="project-journey-anchor" style={{ top: `calc((100% - 100svh) * ${projectReadingTimes.goddard / journeyDuration})` }} aria-hidden="true" />
        <div className="hero-stage">
          <CinematicHero />
          <div className="hero-copy">
            <h1 className="hero-title" aria-label="Amanda Baker">
              <span className="hero-word">AMANDA</span>
              <span className="hero-word">BAKER</span>
            </h1>
            <p className="hero-subtitle">Software Engineer &amp; Product Builder</p>
            <p className="hero-statement">
              “I design and build digital products from architecture to interface.”
            </p>
          </div>
          <div className="hero-scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
          <nav className="mobile-project-screens" aria-label="Explore the project screens">
            <span>EXPLORE THE SCREENS</span>
            <div>
              <a href="#project-quantummed"><i />QuantumMed</a>
              <a href="#project-menoviq"><i />Menoviq</a>
              <a href="#project-nori"><i />Nori</a>
              <a href="#project-goddard"><i />Goddard</a>
            </div>
          </nav>
          <DashboardPortal project="quantummed" />
          <DashboardPortal project="menoviq" />
          <DashboardPortal project="nori" />
          <DashboardPortal project="goddard" />
        </div>
      </section>

      <section className="about-me-section" aria-labelledby="about-me-title">
        <div className="about-me-heading">
          <p className="eyebrow">A LITTLE ABOUT ME</p>
          <h2 id="about-me-title">Building at the edge of software and the physical world.</h2>
        </div>
        <div className="about-me-lines">
          <p className="about-me-line"><span>01</span>Georgia State graduate.</p>
          <p className="about-me-line"><span>02</span>Currently working at a health tech startup.</p>
          <p className="about-me-line"><span>03</span>Interested in embedded systems and robotics.</p>
        </div>
      </section>

      <section className="engineering-section reveal-block">
        <div className="section-header narrow">
          <p className="eyebrow">BEHIND THE INTERFACE</p>
        </div>

        <div className="stack-visual" aria-label="Product stack from interface to infrastructure">
          <div className="stack-node">PRODUCT</div>
          <div className="stack-node">INTERFACE</div>
          <div className="stack-node">API</div>
          <div className="stack-node">SERVICES</div>
          <div className="stack-node">DATABASE</div>
          <div className="stack-node">INFRASTRUCTURE</div>
        </div>

        <p className="section-quote">
          “I like understanding the entire product — from the interface someone touches to the systems running underneath it.”
        </p>
      </section>

      <section className="tech-section reveal-block">
        <div className="section-header narrow">
          <p className="eyebrow">TECHNOLOGIES I BUILD WITH</p>
        </div>

        <div className="ticker-wrap" aria-label="Technology stack marquee">
          <div className="ticker-track">
            {[...stackItems, ...stackItems].map((item, index) => (
              <span key={`${item}-${index}`} className="ticker-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section reveal-block">
        <div className="section-header narrow">
          <p className="eyebrow">ABOUT</p>
        </div>

        <h2 className="about-title">
          ENGINEER.<br />
          DESIGNER.<br />
          BUILDER.
        </h2>

        <div className="about-body">
          <p>
            I&apos;m a software engineer who enjoys working across the entire product — architecture, backend systems, frontend experiences, and product design.
          </p>
          <p>
            I turn complex ideas into products that feel simple to use, while still being robust enough to scale.
          </p>
        </div>

        <div className="inline-links">
          <span>Resume</span>
          <span>GitHub</span>
          <span>LinkedIn</span>
        </div>
      </section>

      <section className="contact-section reveal-block">
        <p className="eyebrow">CONTACT</p>
        <h2 className="contact-title">LET&apos;S BUILD<br />SOMETHING<br />INTERESTING.</h2>

        <div className="contact-links">
          <a href="mailto:abakerd3v@gmail.com">abakerd3v@gmail.com</a>
          <a href="https://www.linkedin.com/in/amanda-baker2" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/amandabaker24" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>
    </div>
  );
}
