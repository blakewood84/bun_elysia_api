import { Elysia } from "elysia";
import type { PrismaClient } from "@prisma/client";
import { getUserPlugin } from "./plugins";

export const profile = ({ prisma }: { prisma: PrismaClient }) =>
  new Elysia({ prefix: "/user", name: "user" }).use(
    getUserPlugin({ prisma, app: new Elysia() })
  );
