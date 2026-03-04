import { prisma } from "@/lib/prisma";
import ExperienceClient from "./ExperienceClient";

const fallbackExperiences = [
  {
    id: 1,
    company: "N/A",
    role: "N/A",
    period: "N/A",
    achievements: "N/A",
    logo: null,
  },
];

async function getExperience() {
  try {
    const data = await prisma.experience.findMany({
      orderBy: { createdAt: "desc" },
    });
    return data.length > 0 ? data : fallbackExperiences;
  } catch {
    return fallbackExperiences;
  }
}

export default async function Experience() {
  const experiences = await getExperience();
  return <ExperienceClient experiences={experiences} />;
}
