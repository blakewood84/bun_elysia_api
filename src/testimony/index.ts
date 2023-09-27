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
      // Generic route
      .get("/", () => "Nothing to see here!")
      // Retrieve a testimony by id
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
      // Retrieve all testimonies of a given authorId
      .get(
        "/user/:id",
        async ({ params: { id } }) => {
          const testimonies = await prisma.testimony.findMany({
            where: { authorId: Number(id) },
          });
          return testimonies;
        },
        {
          error() {
            return "Error retrieving testimonies for user";
          },
        }
      )
      // Retrieve all testimonies
      .get(
        "/all",
        async () => {
          const testimonies = await prisma.testimony.findMany();
          return testimonies;
        },
        {
          error() {
            return "Error retrieving testimonies.";
          },
        }
      )
  );
