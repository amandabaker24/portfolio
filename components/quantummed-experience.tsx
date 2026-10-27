"use client";

import Image from "next/image";
import { useState } from "react";

const views = [
  { id: "dashboard", title: "Care dashboard", image: "/quantummed/dashboard-hq.png", width: 2936, height: 1588, caption: "The essentials, at a glance.", description: "Medication schedules, adherence, alerts, and upcoming care in one patient dashboard.", alt: "QuantumMed patient dashboard showing the next medication dose, adherence, alerts, and health calendar" },
  { id: "calendar", title: "Health calendar", image: "/quantummed/health-calendar-hq.png", width: 2940, height: 1596, caption: "A clearer picture of what’s next.", description: "Appointments, medications, and health tasks organized around the patient’s day.", alt: "QuantumMed Health Calendar with medication schedules, appointments, and health tasks" },
  { id: "records", title: "Health summary", image: "/quantummed/health-summary-hq.png", width: 2940, height: 1666, caption: "Health information, brought together.", description: "A connected view of health records, medications, and care information.", alt: "QuantumMed Health Summary with connected records, current medications, and a health log" },
];

export function QuantumMedExperience() {
  const [active, setActive] = useState(0);
  const view = views[active];

  return (
    <div className="qm-experience">
      <div className="qm-view-tabs" role="tablist" aria-label="Explore QuantumMed screens">
        {views.map((item, index) => (
          <button key={item.id} id={`qm-tab-${item.id}`} type="button" role="tab" aria-selected={active === index} aria-controls="qm-screen-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
            let next = active;
            if (event.key === "ArrowRight") next = (active + 1) % views.length;
            else if (event.key === "ArrowLeft") next = (active + views.length - 1) % views.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = views.length - 1;
            else return;
            event.preventDefault();
            setActive(next);
            document.getElementById(`qm-tab-${views[next].id}`)?.focus();
          }}><span>0{index + 1}</span>{item.title}<i aria-hidden="true">↗</i></button>
        ))}
      </div>
      <div id="qm-screen-panel" role="tabpanel" aria-labelledby={`qm-tab-${view.id}`} tabIndex={0}>
        <div className="qm-screen-frame">
          <div className="qm-browser-bar"><span aria-hidden="true"><i /><i /><i /></span><p>QuantumMed / {view.title}</p><span aria-hidden="true">↗</span></div>
          <div className="qm-screen-image"><Image key={view.id} src={view.image} width={view.width} height={view.height} sizes="(max-width: 800px) 95vw, 1150px" alt={view.alt} /></div>
        </div>
        <div className="qm-screen-caption"><h3>{view.caption}</h3><p>{view.description}</p></div>
      </div>
    </div>
  );
}
