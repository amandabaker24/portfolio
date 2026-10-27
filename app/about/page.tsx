import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="content-page">
      <section className="editorial-shell">
        <p className="eyebrow">ABOUT</p>
        <h1 className="editorial-title">ENGINEER. DESIGNER. BUILDER.</h1>

        <div className="editorial-copy">
          <p>
            I&apos;m a software engineer who enjoys working across the entire product — architecture, backend systems, frontend experiences, and product design.
          </p>
          <p>
            I like turning complex ideas into products that feel simple to use. My work lives at the intersection of product thinking, engineering depth, and thoughtful interface design.
          </p>
        </div>

        <div className="editorial-rail">
          <div>
            <span>Product strategy</span>
            <span>Frontend systems</span>
            <span>Backend architecture</span>
          </div>
          <div>
            <span>Design direction</span>
            <span>System design</span>
            <span>Launch execution</span>
          </div>
        </div>

        <div className="editorial-actions">
          <Link href="/" className="back-link">
            ← Back home
          </Link>
          <a href="mailto:abakerd3v@gmail.com" className="primary-link">
            abakerd3v@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
