import type { PrismaClient } from "@prisma/client";
import type { Elysia } from "elysia";

// Posts
// Get Posts belonging to a user
// Get All Posts
export const testimony = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia;
}) =>
  app.group("/testimony", (app) =>
    app
      .get("/", () => "Nothing to see here!")
      .get(
        "/post/:id",
        async ({ params: { id } }) => {
          const testimony = await prisma.testimony.findFirstOrThrow({
            where: { id: Number(id) },
          });
          return testimony;
        },
        {
          error() {
            return "Invalid testimony ID!";
          },
        }
      )
      .get("/all", () => {})
  );
