import type { PrismaClient } from "@prisma/client";
import type { Elysia } from "elysia";
import { t } from "elysia";

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
      .get(
        "/latest",
        // Query by page number.
        async ({ query: { page = 0 } }) => {
          // Every page will increment by 10. IE. page 1 = skip 10.
          const skipAmount = Number(page) * 10;
          const latest = await prisma.testimony.findMany({
            orderBy: {
              createdAt: "desc",
            },
            include: {
              author: true,
            },
            skip: skipAmount,
            take: 10,
          });
          return latest;
        },
        {
          error() {
            return "Error fetching latest testimonies!";
          },
        }
      )
      .post(
        "/create",
        async ({ body }) => {
          return prisma.testimony.create({
            data: {
              ...body,
            },
          });
        },
        {
          body: t.Object({
            title: t.String(),
            content: t.String(),
            published: t.Boolean(),
            authorId: t.Number(),
          }),
          error() {
            return "Error during create testimony request!";
          },
        }
      )
  );
