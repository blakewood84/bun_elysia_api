import type { Elysia } from "elysia";
import type { PrismaClient } from "@prisma/client";
import { t } from "elysia";

/**
 * Retrieves a profile by the user's ID
 */
export const getProfileByUserId = ({
  app,
  prisma,
}: {
  app: Elysia<"/profile">;
  prisma: PrismaClient;
}) =>
  app.get(
    "/user/:id",
    async ({ params: { id } }) => {
      const profile = await prisma.profile.findUniqueOrThrow({
        where: { userId: Number(id) },
      });
      return profile;
    },
    {
      error({ set, error, code }) {
        console.log("CODE: ", code);
        console.log("ERROR: ", error);
        set.status = 500;
        return "Cannot find user!";
      },
    }
  );

/**
 * Updates a profile by a given profile ID
 */
export const updateProfileById = ({
  app,
  prisma,
}: {
  app: Elysia<"/profile">;
  prisma: PrismaClient;
}) =>
  app.put(
    "/update/:id",
    async ({ params: { id }, body }) => {
      const profile = await prisma.profile.update({
        where: {
          id: Number(id),
        },
        data: body,
      });
      return profile;
    },
    {
      body: t.Object({
        bio: t.String(),
      }),
      error({ code, error }) {
        console.log("CODE: ", code);
        console.log("ERROR: ", error);
        return "Unable to update profile!";
      },
    }
  );
