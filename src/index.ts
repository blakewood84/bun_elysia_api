import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { user } from "./user";
import { testimony } from "./testimony";
import { profile } from "./profile";

export const prisma = new PrismaClient();

const app = new Elysia()
  .use((app: Elysia) => user({ prisma, app }))
  .use((app: Elysia) => testimony({ prisma, app }))
  .use((app: Elysia) => profile({ prisma, app }))
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
