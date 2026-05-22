const { PrismaClient } = require("../lib/generated/client");
const mysql = require("mysql2/promise");
require("dotenv").config();

const prisma = new PrismaClient();

async function main() {
  const oldDbUrl = process.env.OLD_DATABASE_URL;
  if (!oldDbUrl) {
    console.error("Error: Please define 'OLD_DATABASE_URL' in your .env file pointing to your current MySQL database.");
    console.log("Example: OLD_DATABASE_URL=\"mysql://avnadmin:...\"");
    process.exit(1);
  }

  console.log("Connecting to the old MySQL database...");
  const connection = await mysql.createConnection(oldDbUrl);
  console.log("Connected successfully!");

  const tables = ["Admin", "Profile", "Project", "Experience", "Skill", "Message"];

  for (const table of tables) {
    console.log(`\nMigrating table: ${table}...`);
    
    // Read from MySQL
    const [rows] = await connection.execute(`SELECT * FROM \`${table}\``);
    console.log(`Found ${rows.length} rows in MySQL table '${table}'.`);

    if (rows.length === 0) {
      console.log(`Skipping migration for empty table '${table}'.`);
      continue;
    }

    // Write to PostgreSQL using Prisma
    let successCount = 0;
    for (const row of rows) {
      // In MySQL, tinyint(1) (Boolean) fields are returned as 1 or 0.
      // Convert to actual boolean for PostgreSQL/Prisma compatibility.
      if (table === "Experience" && row.isCurrent !== undefined) {
        row.isCurrent = Boolean(row.isCurrent);
      }

      // Ensure dates are parsed properly if they are strings
      if (row.createdAt && typeof row.createdAt === "string") {
        row.createdAt = new Date(row.createdAt);
      }
      if (row.updatedAt && typeof row.updatedAt === "string") {
        row.updatedAt = new Date(row.updatedAt);
      }

      try {
        await prisma[table.toLowerCase()].upsert({
          where: { id: row.id },
          update: row,
          create: row,
        });
        successCount++;
      } catch (err) {
        console.error(`Failed to migrate row with ID ${row.id} in ${table}:`, err.message);
      }
    }
    console.log(`Successfully migrated ${successCount}/${rows.length} rows for table '${table}'.`);
  }

  await connection.end();
  console.log("\nData migration successfully completed!");
}

main()
  .catch((err) => {
    console.error("Migration failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
