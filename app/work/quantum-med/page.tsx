import { QuantumMedCaseStudy } from "@/components/quantummed-case-study";

const project = {
  title: "QUANTUMMED",
  subtitle: "A patient-first prescription and healthcare management platform.",
  intro:
    "QuantumMed was designed to make managing medication, care coordination, and pharmacy workflows feel calm and trustworthy for patients and providers alike.",
  role: "Full Stack Software Engineer",
  stack: [
    "React",
    "TypeScript",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Docker",
    "REST APIs",
    "Microservices",
  ],
  highlights: [
    "Medication management",
    "Prescription refills",
    "Pharmacy marketplace",
    "Family healthcare management",
    "Patient profiles",
    "Payment workflows",
    "Pharmacy integrations",
    "Health records",
    "Authentication",
    "Notifications",
  ],
  architecture: [
    "Frontend",
    "API Gateway",
    "Auth Service",
    "Medication Service",
    "Patient Service",
    "Orders Service",
    "Payments Service",
    "Pharmacy Service",
    "Family Service",
    "PostgreSQL",
    "Redis",
    "External Integrations",
  ],
  myRole: [
    "PRODUCT DESIGN",
    "FRONTEND",
    "BACKEND",
    "ARCHITECTURE",
    "INTEGRATIONS",
  ],
  outcome:
    "The product experience balanced operational complexity with patient clarity — giving people a simpler way to manage care while giving the systems behind it the reliability healthcare needs.",
};

export default function QuantumMedPage() {
  return (
    <QuantumMedCaseStudy project={project} />
  );
}
