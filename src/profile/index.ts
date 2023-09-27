import type { Elysia } from "elysia";
import { t } from "elysia";
import type { PrismaClient } from "@prisma/client";

export const profile = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia;
}) =>
  app.group("/profile", (app) =>
    app
      .get("/", () => "Nothing to see here!")
      .get(
        "/user/:id",
        async ({ params: { id } }) =>
          prisma.profile.findUniqueOrThrow({ where: { userId: Number(id) } }),
        {
          error({ code, error }) {
            console.log("CODE: ", code);
            console.log("ERROR: ", error);
            return "Cannot find user!";
          },
        }
      )
      .put(
        "/update/:id",
        async ({ params: { id }, body }) =>
          prisma.profile.update({
            where: {
              id: Number(id),
            },
            data: body,
          }),
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
      )
  );
