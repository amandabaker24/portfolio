"use client";

import Image from "next/image";
import { useState } from "react";
import { noriScreens } from "@/components/project-journey";

const experiences = {
  menoviq: [
    { label: "The workspace", title: "Every detail, in your hands.", text: "Build a page from focused sections, edit the content in context, and see how the restaurant’s story comes together before publishing.", src: "/menoviq/website-builder.png", width: 3022, height: 1606, alt: "Menoviq website builder with section library, Verdant Room preview, and content inspector" },
    { label: "The storefront", title: "A first impression worth making.", text: "Bring the restaurant’s atmosphere online. Give guests a clear way to explore the menu, make a reservation, or plan a private event.", src: "/menoviq/restaurant-preview.png", width: 738, height: 390, alt: "Verdant Room restaurant website with seasonal cuisine headline and reservation buttons" },
  ],
  nori: [
    { label: "Cook profile", title: "A little taste of you.", text: "A home for the recipes you make and the food you love. Cook profiles bring personal collections and shared recipes into one familiar place.", src: noriScreens.profile, width: 520, height: 1094, alt: "Nori profile for Amanda Baker with recipe collections, saved recipes, and cooking community" },
    { label: "Meal planner", title: "Inspiration meets a plan.", text: "See today’s meals, keep an eye on your pantry, and build your grocery list. A single kitchen dashboard connects the idea of cooking with the next step.", src: noriScreens.mealPlan, width: 558, height: 1160, alt: "Nori meal planner with breakfast, lunch, dinner, pantry, grocery list, and budget" },
  ],
};

export function ProductExplorer({ product }: { product: keyof typeof experiences }) {
  const [selected, setSelected] = useState(0);
  const screens = experiences[product];
  const screen = screens[selected];
  return (
    <div className={`pc-explorer pc-explorer-${product}`}>
      <div className="pc-explorer-copy">
        <div className="pc-switch" role="group" aria-label={`${product === "nori" ? "Nori" : "Menoviq"} product views`}>
          {screens.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} aria-controls={`${product}-preview`} onClick={() => setSelected(index)}>{item.label}</button>)}
        </div>
        <div aria-live="polite" aria-atomic="true"><span className="pc-eyebrow">0{selected + 1} / THE EXPERIENCE</span><h3>{screen.title}</h3><p>{screen.text}</p></div>
        <span className="pc-explorer-note">{product === "nori" ? "DESIGNED FOR THE WAY YOU COOK" : "FROM FIRST EDIT TO FIRST IMPRESSION"}</span>
      </div>
      <figure id={`${product}-preview`} className="pc-preview">
        <div className={product === "nori" ? "pc-phone" : "pc-window"}>
          {product === "menoviq" && <div className="pc-window-bar" aria-hidden="true"><span>● ● ●</span><span>Menoviq / {screen.label}</span><span>↗</span></div>}
          <Image key={screen.src} src={screen.src} width={screen.width} height={screen.height} alt={screen.alt} sizes={product === "nori" ? "(max-width: 700px) 70vw, 280px" : "(max-width: 700px) 90vw, 760px"} />
        </div>
        <figcaption>{screen.label} <span>0{selected + 1} / 02</span></figcaption>
      </figure>
    </div>
  );
}
