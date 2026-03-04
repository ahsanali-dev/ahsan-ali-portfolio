const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const experiences = await prisma.experience.findMany();
  console.log("Experiences in DB:", experiences.length);
  console.log(JSON.stringify(experiences, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
