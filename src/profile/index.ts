import type { Elysia } from "elysia";

import type { PrismaClient } from "@prisma/client";
import { getProfileByUserId, updateProfileById } from "./plugins";

export const profile = ({
  prisma,
  app,
}: {
  prisma: PrismaClient;
  app: Elysia;
}) =>
  app.group("/profile", (app) =>
    app
      .get("/", () => "Nothing to see here! 😎")
      // "/profile/user/:id" - Get a profile by id
      .use(
        getProfileByUserId({
          prisma,
          app,
        })
      )
      // "profile/update/:id" - Update's a profile by id
      .use(
        updateProfileById({
          prisma,
          app,
        })
      )
  );
