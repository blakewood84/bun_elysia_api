import type { Elysia } from "elysia";
import { t } from "elysia";
import type { PrismaClient } from "@prisma/client";
import { createUser, getAllUsers, getUser } from "./plugins";

// Get User
// Create User
// Update User Name
// Get All Users

export const user = ({ prisma, app }: { prisma: PrismaClient; app: Elysia }) =>
  app.group("/user", (app) =>
    app
      // "/user/:id"
      .use(getUser({ prisma, app }))
      // "/user/create"
      .use(createUser({ prisma, app }))
  );

export const users = ({ prisma, app }: { prisma: PrismaClient; app: Elysia }) =>
  app.use(getAllUsers({ prisma, app }));
