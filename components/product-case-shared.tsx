import { ArrowIcon } from "@/components/arrow-icon";
import Link from "next/link";

export function CaseNavigation({ prefix }: { prefix: string }) {
  return <nav className="pc-nav" aria-label="Case study sections">{[["overview", "The idea"], ["experience", "The experience"], ["system", "The system"], ["contribution", "My contribution"]].map(([id, label], index) => <a key={id} href={`#${prefix}-${id}`}><span>0{index + 1}</span>{label}</a>)}</nav>;
}

export function CaseLabel({ children }: { children: React.ReactNode }) {
  return <div className="pc-label"><span>{children}</span><i /></div>;
}

export function CaseNext({ href, number, title, description }: { href: string; number: string; title: string; description: string }) {
  return <Link className="pc-next" href={href}><div><span className="pc-eyebrow">NEXT PROJECT / {number}</span><h2>{title}</h2><p>{description}</p></div><span className="pc-next-arrow" aria-hidden="true"><ArrowIcon /></span></Link>;
}
