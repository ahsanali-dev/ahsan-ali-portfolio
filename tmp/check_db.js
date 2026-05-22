const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const exps = await prisma.experience.count();
  const projs = await prisma.project.count();
  const skills = await prisma.skill.count();
  console.log("Experiences:", exps, "Projects:", projs, "Skills:", skills);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
