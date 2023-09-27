import type { Elysia } from "elysia";
import type { PrismaClient } from "@prisma/client";
import { getUserPlugin } from "./plugins";

export const user = ({ prisma, app }: { prisma: PrismaClient; app: Elysia }) =>
  app.group("/user", (app) => app.use(getUserPlugin({ prisma, app })));
