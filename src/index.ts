import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { user, users } from "./user";
import { testimony } from "./testimony";

// Get Profile
// Update Profile
// Get All Profiles

export const prisma = new PrismaClient();

const app = new Elysia()
  .use((app: Elysia) => user({ prisma, app }))
  .use((app: Elysia) => users({ prisma, app }))
  .use((app: Elysia) => testimony({ prisma, app }))
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
