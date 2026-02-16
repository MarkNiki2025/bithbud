import { seedDatabase, logInfo, logError } from "@fernir2/saas-kit/server";

async function seed() {
    try {
        await seedDatabase();
        logInfo("Database seeded successfully");
        process.exit(0);
    } catch (err) {
        logError("Error seeding database", err);

        process.exit(1);
    }
}

seed();
