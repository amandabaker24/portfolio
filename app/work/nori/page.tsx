import { ArrowIcon } from "@/components/arrow-icon";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { noriScreens } from "@/components/project-journey";
import { CaseLabel, CaseNavigation, CaseNext } from "@/components/product-case-shared";
import { ProductExplorer } from "@/components/product-explorer";
import "@/components/product-case-studies.css";

export const metadata: Metadata = { title: "Nori — Amanda Baker", description: "A mobile cooking companion connecting recipes, meal plans, pantry tracking, and grocery lists." };

export default function NoriPage() {
  return (
    <article className="pc-case pc-nori">
      <header className="pc-hero">
        <div className="pc-breadcrumb"><Link href="/#project-nori">← Selected work</Link><span>03 / FOOD &amp; EVERYDAY LIFE</span></div>
        <div className="nr-hero-grid"><div><div className="pc-wordmark">nori<span>YOUR EVERYDAY COOKING COMPANION</span></div><h1>Good food.<br />Less <em>guesswork.</em></h1><p className="nr-hero-description">For the recipes you save,<br />the meals you plan,<br />and the cook you’re becoming.</p><a className="nr-hero-link" href="#nori-experience">Meet your kitchen companion <span>↓</span></a><div className="nr-ingredients"><span>Recipes</span><i>+</i><span>Planning</span><i>+</i><span>A little joy</span></div></div><figure className="nr-hero-phones"><div className="nr-orbit" aria-hidden="true" /><div className="pc-phone nr-phone-back"><Image src={noriScreens.mealPlan} width={558} height={1160} alt="Nori kitchen dashboard with today’s meal plan" sizes="(max-width: 700px) 35vw, 235px" /></div><div className="pc-phone nr-phone-front"><Image src={noriScreens.profile} width={520} height={1094} alt="Nori cook profile with Amanda Baker’s recipes and collections" sizes="(max-width: 700px) 42vw, 275px" preload /></div><figcaption>FROM “THAT LOOKS GOOD” TO “LET’S MAKE IT.”</figcaption></figure></div>
        <div className="pc-meta"><div><span>MY ROLE</span><p>Software Engineer</p></div><div><span>THE PRODUCT</span><p>Mobile cooking &amp; meal planning</p></div><div><span>THE STACK</span><p>React Native / Expo / Django</p></div></div>
      </header>
      <CaseNavigation prefix="nori" />

      <section className="pc-section" id="nori-overview"><CaseLabel>01 / THE IDEA</CaseLabel><div className="pc-split"><h2>Saving a recipe is easy.<br /><em>Getting dinner ready?</em></h2><div className="pc-prose"><p>The space between finding something delicious and actually cooking it is filled with small decisions. What’s in the pantry? What needs buying? What’s the plan for tonight?</p><p>Nori brings those moments together: recipe inspiration, personal cookbooks, meal planning, and kitchen organization in one mobile experience.</p></div></div><div className="nr-cooking-loop" aria-label="Cooking journey: discover, collect, plan, prepare">{[["Discover", "Find your next favorite."], ["Collect", "Make it part of your cookbook."], ["Plan", "Give it a place in your week."], ["Prepare", "Check the pantry. Make a list."]].map(([title, text], index) => <div key={title}><span className="nr-step">0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="pc-section" id="nori-experience"><CaseLabel>02 / THE EXPERIENCE</CaseLabel><div className="pc-section-heading"><h2>A home for your recipes.<br /><em>A rhythm for your kitchen.</em></h2><p>Personal enough to feel like your own cookbook. Practical enough to help with the everyday work of cooking.</p></div><ProductExplorer product="nori" /><div className="pc-three-up nr-feature-cards">{[["01", "Your own corner.", "Cook profiles, recipe sharing, and digital cookbooks put the person behind the food at the center."], ["02", "A plan for the day.", "Breakfast, lunch, and dinner have a place in a simple meal planning experience."], ["03", "The kitchen, connected.", "Pantry tracking and grocery lists bring ingredients into the same space as recipes and plans."]].map(([n, title, text]) => <div key={n}><span className="pc-eyebrow">{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="pc-section" id="nori-system"><CaseLabel>03 / THE SYSTEM</CaseLabel><div className="pc-split"><h2>Thoughtful on the surface.<br /><em>Connected underneath.</em></h2><div className="pc-prose"><p>A React Native app brings the kitchen experience to mobile, with Expo supporting the application workflow. Django REST APIs connect the interface to the recipes, collections, and planning data behind it.</p></div></div><div className="nr-system"><div><span className="pc-eyebrow">01 / MOBILE</span><h3>The cooking companion</h3><p>React Native · Expo</p></div><span className="nr-system-arrow" aria-hidden="true">→</span><div><span className="pc-eyebrow">02 / APPLICATION</span><h3>The connected kitchen</h3><p>Django · Python · REST APIs</p></div><span className="nr-system-arrow" aria-hidden="true">→</span><div><span className="pc-eyebrow">03 / DATA</span><h3>A place for every detail</h3><p>PostgreSQL</p></div></div><div className="pc-feature-list"><span className="pc-eyebrow">CONNECTED PRODUCT AREAS</span><p>Recipes · Cookbooks · Cook profiles · Meal plans · Pantry · Grocery lists</p></div></section>

      <section className="pc-section pc-contribution" id="nori-contribution"><div><CaseLabel>04 / MY CONTRIBUTION</CaseLabel><h2>Building for<br /><em>real kitchen life.</em></h2><p className="pc-muted">Software Engineer</p></div><div className="pc-role-list">{[["Mobile experience", "Bringing recipes, profiles, and everyday planning into a cohesive mobile interface."], ["Frontend engineering", "Building the React Native screens and interactions that connect the cooking journey."], ["Backend & API integration", "Connecting the application to Django services and the data supporting recipes and kitchen organization."]].map(([title, text], index) => <div key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>

      <section className="pc-takeaway"><span className="pc-eyebrow">THE TAKEAWAY</span><h2>Less “what’s for dinner?”<br /><em>More “let’s cook.”</em></h2><p>Nori brings recipe inspiration and everyday kitchen organization into one connected cooking experience, from the first saved recipe to the next meal.</p><Link href="/#project-nori">Back to selected work <ArrowIcon /></Link></section>
      <CaseNext href="/#project-goddard" number="04" title="Goddard" description="Coming soon — a robotic dog inspired by Jimmy Neutron." />
    </article>
  );
}
