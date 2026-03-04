import { motion } from "framer-motion";
import { prisma } from "@/lib/prisma";
import { ExternalLink, Github as GithubIcon, ImageIcon } from "lucide-react";
import ProjectsClient from "./ProjectsClient";

// Fallback data agar database empty ho
const fallbackProjects = [
  {
    id: 1,
    title: "N/A",
    techStack: "N/A",
    thumbnail: "",
    description: "N/A",
    githubLink: "#",
    liveLink: "#",
  },
];

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export default async function Projects() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
