import type { PrismaClient } from "@prisma/client";
import type { Elysia } from "elysia";
import { t } from "elysia";

/**
 * Retrieves a Testimony by an ID
 */
export const getTestimonyById = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia<"/testimony">;
}) =>
  app.get(
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
  );

export const getTestimoniesByUserId = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia<"/testimony">;
}) =>
  app.get(
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
  );

/**
 * Fetches all Testimonies, no pagination
 */
export const getAllTestimonies = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia<"/testimony">;
}) =>
  app.get(
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
  );

export const getLatestTestimonies = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia<"/testimony">;
}) =>
  app.get(
    "/latest",
    // Query by page number.
    async ({ query: { page = "0", take = "10" } }) => {
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
        take: Number(take),
      });
      return latest;
    },
    {
      error() {
        return "Error fetching latest testimonies!";
      },
    }
  );

export const createTestimony = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia<"/testimony">;
}) =>
  app.post(
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
  );
