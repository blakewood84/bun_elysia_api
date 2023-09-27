import type { Elysia } from "elysia";
import { t } from "elysia";
import type { PrismaClient } from "@prisma/client";

export const getUser = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia<"/user">;
}) =>
  app.get(
    "/:id",
    async ({ params: { id }, set }) => {
      try {
        const user = await prisma.user.findFirstOrThrow({
          where: { id: Number(id) },
        });
        return user;
      } catch (error) {
        set.status = 403;
        return null;
      }
    },
    {
      response: t.Nullable(
        t.Object({
          id: t.Number(),
          email: t.String(),
          name: t.Nullable(t.String()),
        })
      ),
    }
  );

// Add Paginated Results
export const getAllUsers = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia;
}) =>
  app.get("/users", async () => {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    return users;
  });
