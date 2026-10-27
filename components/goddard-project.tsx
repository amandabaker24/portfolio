import { projects } from "@/components/portfolio-data";
import "./goddard-project.css";

export function GoddardProject({ embedded = false }: { embedded?: boolean }) {
  const project = projects.find((item) => item.slug === "goddard")!;
  return (
    <section id={embedded ? undefined : "project-goddard"} className={`goddard-project${embedded ? " goddard-embedded" : ""}`} aria-labelledby="title-goddard">
      <div className="goddard-topline"><span>{project.number} / {String(projects.length).padStart(2, "0")}</span><span>THE NEXT BUILD / ROBOTICS</span></div>
      <div className="goddard-layout">
        <div className="goddard-copy">
          <div className="goddard-terminal">
            <div className="goddard-terminal-bar">
              <span className="goddard-terminal-dots" aria-hidden="true"><i /><i /><i /></span>
              <span>goddard / project brief</span>
              <span className="goddard-terminal-status">Coming soon</span>
            </div>
            <div className="goddard-terminal-body" tabIndex={0} role="region" aria-label="Goddard project brief and learning objectives">
              <p className="goddard-command"><span aria-hidden="true">$</span> cat ./goddard.md</p>
              <h2 id="title-goddard">{project.title}<span aria-hidden="true">_</span></h2>
              <p className="goddard-terminal-intro">My goal is to build a robotic dog inspired by Goddard from Jimmy Neutron — and use it to learn how software can sense, decide, and move in the physical world.</p>
              <p className="goddard-terminal-heading"># What I want to learn</p>
              <dl className="goddard-learning-goals">
                {[
                  ["Robotics", "Study kinematics, gait planning, and balance to understand how a four-legged robot moves."],
                  ["Embedded systems", "Write firmware for microcontrollers, read sensors, and drive motors with predictable timing."],
                  ["Control & sensing", "Use sensor feedback to tune motion and coordinate the robot’s joints."],
                  ["Reinforcement learning", "Experiment with rewards and locomotion policies in simulation, then explore transferring learned behaviors to hardware."],
                ].map(([title, description], index) => <div key={title}><dt><span aria-hidden="true">0{index + 1}</span>{title}</dt><dd>{description}</dd></div>)}
              </dl>
              <p className="goddard-terminal-end"><span aria-hidden="true">$</span> learning by building<span className="goddard-terminal-cursor" aria-hidden="true" /></p>
            </div>
            <div className="goddard-terminal-footer"><span>PLANNED PROJECT / SOFTWARE + HARDWARE</span><span className="goddard-terminal-scroll">SCROLL TO READ</span></div>
          </div>
        </div>
        {!embedded && <div className="goddard-art">
          <div className="goddard-art-label"><span>G—04 / CONCEPT STUDY</span><span>NOT TO SCALE</span></div>
          <svg viewBox="0 0 600 440" role="img" aria-labelledby="goddard-art-title">
            <title id="goddard-art-title">Concept illustration of Goddard, a riveted steel robotic dog with circular eyes, folded ears, purple spring legs, brass fittings, and a pink tongue</title>
            <g fill="none" stroke="#8096b1" strokeWidth="1" opacity=".3">
              <path d="M45 355h510M85 72v310M515 72v310M45 100h510" strokeDasharray="4 7" />
              <circle cx="300" cy="229" r="145" strokeDasharray="2 8" /><path d="M40 229h520M300 55v340" strokeDasharray="3 10" />
            </g>
            <ellipse cx="305" cy="359" rx="183" ry="13" fill="#000" opacity=".25" />
            <defs><pattern id="goddard-eye-mesh" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#25323a" /><circle cx="2.5" cy="2.5" r="1.4" fill="#e0dfc7" /></pattern></defs>
            <g stroke="#9badb8" strokeWidth="2" strokeLinejoin="round">
              <path d="m386 239 49-34-19 43" fill="#4d3b5c" />
              <path d="m262 282-2 28m13-27-2 28m91-10-3 27m15-25-3 28" stroke="#cf9b35" strokeWidth="12" />
              <path d="M254 301c-18 4 20 9 3 13s18 10 0 14m97-13c-18 4 20 9 3 13s18 10 0 14" fill="none" stroke="#574365" strokeWidth="9" />
              <path d="m247 327 32 2 6 15-44-2Zm98 13 33 2 4 14-44-2Z" fill="#768b95" stroke="#d7a43c" strokeWidth="4" />
              <path d="m250 215 148 30-16 75-135-33Z" fill="#596f7c" />
              <path d="m250 215 32-25 143 30-27 25Z" fill="#8396a0" />
              <path d="m398 245 27-25-17 73-26 27Z" fill="#3c5260" />
              <path d="m253 239 140 30m-143-7 138 30m-92-65-7 69m55-59-12 69m-45-108-34 26m80-16-29 27" fill="none" stroke="#a2b2ba" strokeWidth="1.4" />
              <path d="m294 294-5 24m65-7-3 22" stroke="#d6a034" strokeWidth="15" />
              <path d="M286 315c-22 4 22 10 1 15s21 10 0 15m62-13c-22 4 22 10 1 15s21 10 0 15" fill="none" stroke="#574365" strokeWidth="11" />
              <path d="M270 352q14-23 31 1l3 9-38-1Zm62 16q15-23 32 1l3 9-39-1Z" fill="#81959e" stroke="#d7a43c" strokeWidth="5" />
              <path d="m270 361-1 7m13-7-1 8m13-7-1 7m40 8-1 8m14-7-1 8m13-8-1 8" stroke="#b3c0c4" strokeWidth="3" />
              <path d="m251 222-31-28" stroke="#d2a039" strokeWidth="24" />
              <path d="M241 214c-5-22-15 16-19-5s-15 15-18-7" fill="none" stroke="#574365" strokeWidth="12" />
              <path d="m149 115-30-58-29 5 5-19 37-2 37 64m59 16 28-55-18-12 14-8 31 24-35 71" fill="#758895" />
              <ellipse cx="198" cy="150" rx="62" ry="61" fill="#514988" stroke="#d9a13a" strokeWidth="5" />
              <path d="m195 91-18 96m58-84-22 84" stroke="#d9a13a" strokeWidth="7" />
              <ellipse cx="170" cy="198" rx="70" ry="62" fill="#6e8490" />
              <ellipse cx="165" cy="205" rx="59" ry="48" fill="#283943" />
              <path d="M114 187q41-40 98 2l-4 29-13-6-10 9-10-8-12 8-12-10-11 6-11-9-11 4Z" fill="#cc9b32" stroke="#d4ab5b" />
              <ellipse cx="147" cy="190" rx="8" ry="6" fill="#27343a" stroke="#b38231" /><ellipse cx="179" cy="196" rx="8" ry="6" fill="#27343a" stroke="#b38231" />
              <path d="M151 218q16 9 31 3-2 71-21 64-15-8-10-67Z" fill="#9d365d" stroke="#ba6384" /><path d="m166 229-2 40" stroke="#702744" strokeWidth="1" />
              {[150, 204].map((x, index) => <g key={x} transform={`translate(${x} ${150 + index * 6})`}><circle r="22" fill="#c79731" stroke="#e4bb5c" /><circle r="18" fill="url(#goddard-eye-mesh)" stroke="#b33b2c" strokeWidth="4" /></g>)}
              <path d="m220 96 10-39" stroke="#d8a03a" strokeWidth="4" /><path d="m219 69 17 6m-14-15 17 6" stroke="#d8a03a" strokeWidth="3" /><circle cx="231" cy="53" r="4" fill="#d8a03a" stroke="#f1c66d" />
            </g>
            <g fill="#aebdc5" stroke="#405662" strokeWidth=".8">{[[261,225],[282,230],[309,235],[338,242],[368,249],[386,253],[257,250],[281,255],[305,260],[333,268],[360,274],[383,280],[254,273],[279,279],[302,285],[329,293],[357,299],[378,306],[121,178],[111,199],[114,222],[130,241],[199,240],[221,220],[231,196],[214,177]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />)}</g>
            <g fill="none" stroke="#8ea7cb" strokeWidth="1" opacity=".65"><path d="M203 100V68h-70M399 241h68v38M308 358v35h-75" /><circle cx="203" cy="100" r="3" /><circle cx="399" cy="241" r="3" /></g>
            <g fill="#93a7c2" fontFamily="monospace" fontSize="9" letterSpacing="1"><text x="79" y="60">IMAGINATION</text><text x="439" y="295">MECHANICS</text><text x="157" y="398">A FUTURE COMPANION</text></g>
          </svg>
          <div className="goddard-art-footer"><span>INSPIRED BY JIMMY NEUTRON</span><span>CONCEPT / COMING SOON</span></div>
        </div>}
      </div>
    </section>
  );
}
