import type { Elysia } from "elysia";
import { t } from "elysia";
import type { PrismaClient } from "@prisma/client";
import { getAllUsers, getUser } from "./plugins";

// Get User
// Create User
// Update User Name
// Get All Users

export const user = ({ prisma, app }: { prisma: PrismaClient; app: Elysia }) =>
  app.group("/user", (app) =>
    app.use(getUser({ prisma, app })).post(
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
    )
  );

export const users = ({ prisma, app }: { prisma: PrismaClient; app: Elysia }) =>
  app.use(getAllUsers({ prisma, app }));
