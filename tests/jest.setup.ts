// jest.setup.js
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

// Run Prisma migrations for the test database
execSync("yarn prisma migrate dev", {
  stdio: "inherit",
});

const prisma = new PrismaClient();

// Initialize a new Prisma client for testing

// Set up beforeAll hook to connect to the test database
beforeAll(async () => {
  await prisma.$connect();
});

// Set up afterAll hook to clean up the test environment after running tests
afterAll(async () => {
  await prisma.$disconnect();
});
