"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const cursor = document.getElementById("cursor-follower");
    if (!cursor) {
      return;
    }

    const move = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const pressed = () => cursor.classList.add("is-pressed");
    const released = () => cursor.classList.remove("is-pressed");
    const hide = () => cursor.classList.add("is-hidden");
    const show = () => cursor.classList.remove("is-hidden");

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", pressed);
    window.addEventListener("pointerup", released);
    window.addEventListener("pointerleave", hide);
    window.addEventListener("pointerenter", show);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pressed);
      window.removeEventListener("pointerup", released);
      window.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerenter", show);
    };
  }, []);

  return (
    <div className="site-shell">
      <div id="cursor-follower" className="cursor-follower" aria-hidden="true" />
      <header className={`nav-shell ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="brand-mark" aria-label="Amanda Baker home">
            AMANDA BAKER
          </Link>

          <nav aria-label="Main navigation" className="main-nav">
            <Link href="/#work" className="nav-link">
              WORK
            </Link>
            <Link href="/about" className="nav-link">
              ABOUT
            </Link>
            <a href="mailto:abakerd3v@gmail.com" className="nav-link">
              CONTACT
            </a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer-shell">
        <div className="footer-inner">
          <span>AMANDA BAKER</span>
          <div className="footer-links">
            <a href="mailto:abakerd3v@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/amanda-baker2" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/amandabaker24" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
