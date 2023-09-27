import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { user } from "./user";

// Get Profile
// Update Profile
// Get All Profiles

// Posts
// Get Posts belonging to a user
// Get All Posts

export const prisma = new PrismaClient();

const app = new Elysia().use((app: Elysia) => user({ prisma, app }));

app.listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
