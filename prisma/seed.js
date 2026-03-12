const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Admin Credentials
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "Admin@1234", // In production, use hasehd passwords!
    },
  });
  console.log("Admin created:", admin.username);

  // 2. Create Initial Profile Detail
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userName: "admin",
      headline: "Admin",
      about: "Admin",
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      displayEmail: "example@gmail.com",
    },
  });
  console.log("Profile created:", profile.userName);

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
