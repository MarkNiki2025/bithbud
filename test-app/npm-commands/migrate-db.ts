import { migrateDatabase, logInfo, logError } from "@fernir2/saas-kit/server";

async function migrate() {
    try {
        await migrateDatabase();
        logInfo("Database migrations executed successfully");
        process.exit(0);
    } catch (err) {
        logError("Error running migrations", err);

        process.exit(1);
    }
}

migrate();
