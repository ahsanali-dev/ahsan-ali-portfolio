const { PrismaClient } = require("../lib/generated/client");
const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.findFirst();
  const testData = {
    userName: profile.userName,
    headline: profile.headline,
    about: profile.about,
    expYears: "Success!",
    projectsDone: "20+",
    happyClients: "10+",
  };

  try {
    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: testData,
    });
    console.log("Update successful:", updated.expYears);
  } catch (err) {
    console.error("Update failed:", err.message);
  }
}

main().finally(() => prisma.$disconnect());
