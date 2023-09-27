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
    "/userId/:id",
    async ({ params: { id } }) =>
      prisma.user.findFirstOrThrow({
        where: { id: Number(id) },
      }),
    {
      error() {
        return "Error fetching user by id";
      },
      response: t.Nullable(
        t.Object({
          id: t.Number(),
          email: t.String(),
          name: t.Nullable(t.String()),
        })
      ),
    }
  );

/**
 * Endpoint - "/user/create"
 *
 * Creates a new user.
 */
export const createUser = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia<"/user">;
}) =>
  app.post(
    "/create",
    ({ body }) =>
      prisma.user.create({
        data: body,
      }),
    {
      body: t.Object({
        email: t.String(),
        name: t.String(),
      }),
      error({ code, error }) {
        console.log("CODE: ", code);
        console.log("ERROR: ", error);
        return "Error creating user!";
      },
    }
  );

// Add Paginated Results
export const getAllUsers = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia<"/user">;
}) =>
  app.get(
    "/all",
    async () =>
      prisma.user.findMany({
        include: {
          posts: true,
        },
      }),
    {
      error() {
        return "Error fetching all users";
      },
    }
  );
