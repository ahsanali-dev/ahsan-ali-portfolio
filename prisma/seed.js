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
      password: "Ahsan@1234", // In production, use hasehd passwords!
    },
  });
  console.log("Admin created:", admin.username);

  // 2. Create Initial Profile Detail
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userName: "Ahsan Ali",
      headline: "Frontend Developer & React/Next.js Expert",
      about:
        "I turn vision into reality with code. Specilaizing in building high-performance web applications using React, Next.js, and modern CSS.",
      githubUrl: "https://github.com/ahsanali-dev",
      linkedinUrl: "https://linkedin.com/in/ahsan-dev",
      twitterUrl: "",
      displayEmail: "ahsan.dev98@gmail.com",
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
