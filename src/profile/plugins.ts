import type { Elysia } from "elysia";
import type { PrismaClient } from "@prisma/client";

export const getUserPlugin = ({
  app,
  prisma,
}: {
  app: Elysia;
  prisma: PrismaClient;
}) =>
  app.get("/:id", async ({ params: { id }, set }) => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: { id: Number(id) },
      });
      return user;
    } catch (error) {
      set.status = 403;
      return "User does not exist!";
    }
  });
