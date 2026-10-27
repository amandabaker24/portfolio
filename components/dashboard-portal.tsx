import { ProjectStage } from "@/components/project-showcase";
import { projects } from "@/components/portfolio-data";
import "./dashboard-portal.css";

export function DashboardPortal({ project }: { project: "quantummed" | "menoviq" | "nori" }) {
  const content = projects.find((item) => item.slug === project)!;
  return (
    <div className={`dashboard-portal dashboard-portal-${project}`}>
      <ProjectStage project={content} embedded />
    </div>
  );
}
