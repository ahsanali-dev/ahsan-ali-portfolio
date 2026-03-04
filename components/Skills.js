import { prisma } from "@/lib/prisma";
import SkillsClient from "./SkillsClient";

const fallbackSkills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "Redux",
      "Bootstrap",
    ],
  },
  {
    category: "Backend & DB",
    items: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "Appwrite",
    ],
  },
  {
    category: "Design & Tools",
    items: ["Unity", "3D Creation", "Figma", "Git", "Vercel", "Postman"],
  },
];

async function getSkills() {
  try {
    const skills = await prisma.skill.findMany();
    if (skills.length === 0) return fallbackSkills;
    // Group by category
    const grouped = skills.reduce((acc, s) => {
      const key = s.category;
      if (!acc[key]) acc[key] = { category: key, items: [] };
      acc[key].items.push(s.name);
      return acc;
    }, {});
    return Object.values(grouped);
  } catch {
    return fallbackSkills;
  }
}

export default async function Skills() {
  const skills = await getSkills();
  return <SkillsClient skills={skills} />;
}
